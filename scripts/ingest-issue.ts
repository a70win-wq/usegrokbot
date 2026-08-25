import { readFileSync, writeFileSync } from "node:fs";
import { ingestUseCase } from "../lib/ingest/pipeline";
import { assertStorySafe } from "../lib/ingest/validate";
import { collectXUrls, INGEST_URL_LIMIT, isIngestIssueTitle, tweetIdFromUrl } from "../lib/ingest/x-url";
import { discoverStories, type DiscoverStory } from "../data/discover";
import { site } from "../lib/site";

const INGESTED_PATH = "data/discover/ingested.json";
const MAX_URLS = INGEST_URL_LIMIT;

type Row = {
  url: string;
  status: string;
  code?: string;
  detail?: string;
};

type GitHubIssue = {
  number: number;
  title: string;
  body?: string | null;
  pull_request?: unknown;
};

function readIngested() {
  return JSON.parse(readFileSync(INGESTED_PATH, "utf8")) as DiscoverStory[];
}

function writeIngested(stories: DiscoverStory[]) {
  writeFileSync(INGESTED_PATH, `${JSON.stringify(stories, null, 2)}\n`);
}

function pickSection(body: string, heading: string) {
  const match = body.match(new RegExp(`## ${heading}\\n([\\s\\S]*?)(?:\\n## |$)`));
  const value = match?.[1]?.trim();
  if (!value || value === "Not provided") return undefined;
  return value;
}

function parseIssue(title: string, body: string) {
  const urls = collectXUrls([title, body, process.env.INGEST_URL ?? "", process.env.INGEST_URLS ?? ""].join("\n"), MAX_URLS);
  const jsonMatch = body.match(/```json\s*([\s\S]*?)```/);
  const story = jsonMatch ? (JSON.parse(jsonMatch[1]) as DiscoverStory) : null;
  const prompt = pickSection(body, "Prompt");
  const notes = pickSection(body, "Notes");
  const elonLikedIds = new Set(
    collectXUrls(pickSection(body, "Elon liked") ?? "", MAX_URLS)
      .map((url) => tweetIdFromUrl(url))
      .filter((id): id is string => Boolean(id)),
  );
  return { urls, story, prompt, notes, elonLikedIds };
}

async function githubApi<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("missing_github_token");
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "usegrokbot.com",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`github_${response.status}:${body.slice(0, 240)}`);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

async function loadOpenedIssue() {
  const number = process.env.ISSUE_NUMBER;
  if (number && process.env.GITHUB_TOKEN) {
    const [owner, name] = site.githubRepo.split("/");
    const issue = await githubApi<GitHubIssue>(`/repos/${owner}/${name}/issues/${number}`);
    return { title: issue.title, body: issue.body ?? "" };
  }
  return {
    title: process.env.ISSUE_TITLE ?? "",
    body: process.env.ISSUE_BODY ?? "",
  };
}

async function listOpenIngestIssues() {
  const [owner, name] = site.githubRepo.split("/");
  const issues: GitHubIssue[] = [];
  for (let page = 1; page <= 10; page += 1) {
    const batch = await githubApi<GitHubIssue[]>(
      `/repos/${owner}/${name}/issues?state=open&per_page=100&page=${page}`,
    );
    issues.push(...batch.filter((issue) => isIngestIssueTitle(issue.title) && !issue.pull_request));
    if (batch.length < 100) break;
  }
  return issues;
}

async function closeProcessedIssues(issues: GitHubIssue[], body: string) {
  const [owner, name] = site.githubRepo.split("/");
  for (const issue of issues) {
    try {
      await githubApi(`/repos/${owner}/${name}/issues/${issue.number}/comments`, {
        method: "POST",
        body: JSON.stringify({ body }),
      });
      await githubApi(`/repos/${owner}/${name}/issues/${issue.number}`, {
        method: "PATCH",
        body: JSON.stringify({ state: "closed", state_reason: "completed" }),
      });
    } catch (error) {
      console.warn(`Could not close issue #${issue.number}:`, error);
    }
  }
}

function writeSummary(rows: Row[]) {
  const lines = [
    rows.length ? "Ingest finished." : "No X URLs found.",
    "",
    ...rows.map((row) => {
      const extra = [row.code, row.detail].filter(Boolean).join(" — ");
      return `- ${row.status}: ${row.url}${extra ? ` (${extra})` : ""}`;
    }),
  ];
  const text = `${lines.join("\n")}\n`;
  writeFileSync("ingest-results.md", text);
  console.log(text);
  return text;
}

async function ingestUrl(
  xUrl: string,
  extras: { prompt?: string; notes?: string },
  catalog: DiscoverStory[],
): Promise<{ row: Row; story?: DiscoverStory }> {
  const result = await ingestUseCase({
    xUrl,
    prompt: extras.prompt,
    notes: extras.notes,
    phase: "extract",
    catalog,
  });
  if (result.status === "extracted") {
    assertStorySafe(
      result.story,
      catalog.filter((item) => item.slug !== result.story.slug),
    );
    return {
      row: { url: xUrl, status: "published", detail: result.story.slug },
      story: result.story,
    };
  }
  if (result.status === "skipped") {
    return { row: { url: xUrl, status: "skipped", code: result.code, detail: result.reason } };
  }
  return { row: { url: xUrl, status: result.status, detail: result.prUrl } };
}

async function main() {
  const eventName = process.env.GITHUB_EVENT_NAME ?? "";
  const { title, body } = await loadOpenedIssue();
  const directUrls = collectXUrls([process.env.INGEST_URL ?? "", process.env.INGEST_URLS ?? ""].join("\n"), MAX_URLS);

  let issue = parseIssue(title, body);
  let drained: GitHubIssue[] = [];

  if (issue.urls.length === 0 && !issue.story && (eventName === "schedule" || (eventName === "workflow_dispatch" && directUrls.length === 0))) {
    drained = await listOpenIngestIssues();
    const combined = drained.map((item) => item.body ?? "").join("\n");
    const elon = drained.flatMap((item) => collectXUrls(pickSection(item.body ?? "", "Elon liked") ?? "", MAX_URLS));
    issue = {
      urls: collectXUrls(combined, MAX_URLS),
      story: null,
      prompt: undefined,
      notes: drained.map((item) => pickSection(item.body ?? "", "Notes")).filter(Boolean).join("\n") || undefined,
      elonLikedIds: new Set(elon.map((url) => tweetIdFromUrl(url)).filter((id): id is string => Boolean(id))),
    };
    console.log(`Draining ${drained.length} open ingest issues (${issue.urls.length} URLs).`);
  }

  if (!isIngestIssueTitle(title) && !issue.urls.length && !issue.story && !directUrls.length && !drained.length) {
    console.log("skip: not an ingest issue");
    return;
  }

  const working = [...discoverStories];
  const ingested = readIngested();
  const seen = new Set(
    working.flatMap((item) =>
      [item.xPostUrl, item.sourceUrl].map((url) => tweetIdFromUrl(url ?? "")).filter((id): id is string => Boolean(id)),
    ),
  );
  const rows: Row[] = [];

  if (issue.story?.slug && issue.urls.length === 0) {
    assertStorySafe(
      issue.story,
      working.filter((item) => item.slug !== issue.story!.slug),
    );
    ingested.push(issue.story);
    working.push(issue.story);
    writeIngested(ingested);
    rows.push({
      url: issue.story.xPostUrl ?? issue.story.sourceUrl,
      status: "published",
      detail: issue.story.slug,
    });
    const summary = writeSummary(rows);
    if (drained.length) await closeProcessedIssues(drained, summary);
    return;
  }

  if (issue.urls.length === 0) throw new Error("No X URL or story JSON on this issue.");

  for (const xUrl of issue.urls) {
    const id = tweetIdFromUrl(xUrl);
    if (id && seen.has(id)) {
      rows.push({ url: xUrl, status: "skipped", code: "duplicate", detail: "Already on UseGrokBot." });
      continue;
    }
    try {
      const liked = Boolean(id && issue.elonLikedIds.has(id));
      const notes = liked ? [issue.notes, "Elon liked this post."].filter(Boolean).join("\n") : issue.notes;
      const { row, story } = await ingestUrl(xUrl, { prompt: issue.prompt, notes }, working);
      rows.push(row);
      if (story) {
        ingested.push(story);
        working.push(story);
        writeIngested(ingested);
        if (id) seen.add(id);
      }
      await new Promise((resolve) => setTimeout(resolve, 150));
    } catch (error) {
      rows.push({
        url: xUrl,
        status: "skipped",
        code: "error",
        detail: error instanceof Error ? error.message : "ingest_failed",
      });
    }
  }

  const summary = writeSummary(rows);
  if (drained.length) await closeProcessedIssues(drained, summary);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
