import { site } from "@/lib/site";
import type { DiscoverStory } from "@/data/discover";

const FILE_PATH = "data/discover/ingested.json";

type GitHubFile = {
  sha: string;
  content: string;
};

function token() {
  return process.env.INGEST_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
}

function repo() {
  const [owner, name] = site.githubRepo.split("/");
  return { owner, name, full: site.githubRepo };
}

async function gh<T>(path: string, init?: RequestInit): Promise<T> {
  const auth = token();
  if (!auth) throw new Error("missing_github_token");
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${auth}`,
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

export function canPublish() {
  return Boolean(token());
}

async function readIngested(ref: string): Promise<{ sha?: string; stories: DiscoverStory[] }> {
  const { owner, name } = repo();
  try {
    const file = await gh<GitHubFile>(
      `/repos/${owner}/${name}/contents/${FILE_PATH}?ref=${encodeURIComponent(ref)}`,
    );
    const parsed = JSON.parse(Buffer.from(file.content, "base64").toString("utf8"));
    return { sha: file.sha, stories: Array.isArray(parsed) ? (parsed as DiscoverStory[]) : [] };
  } catch (error) {
    if (error instanceof Error && error.message.includes("github_404")) return { stories: [] };
    throw error;
  }
}

export async function publishStory(story: DiscoverStory): Promise<{ prUrl: string; merged: boolean }> {
  const { owner, name } = repo();
  const branch = `ingest/${story.slug}`.slice(0, 100);
  const main = await gh<{ object: { sha: string } }>(`/repos/${owner}/${name}/git/ref/heads/main`);
  await gh(`/repos/${owner}/${name}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: main.object.sha }),
  });

  const current = await readIngested(branch);
  if (current.stories.some((item) => item.slug === story.slug || item.xPostUrl === story.xPostUrl)) {
    throw new Error("duplicate");
  }
  const next = [...current.stories, story];
  await gh(`/repos/${owner}/${name}/contents/${FILE_PATH}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `Ingest ${story.slug} from @${story.handle ?? "x"}`,
      content: Buffer.from(`${JSON.stringify(next, null, 2)}\n`, "utf8").toString("base64"),
      branch,
      ...(current.sha ? { sha: current.sha } : {}),
    }),
  });

  const pull = await gh<{ html_url: string; number: number }>(`/repos/${owner}/${name}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title: `Ingest: ${story.title}`,
      head: branch,
      base: "main",
      body: [
        "Machine-ingested community example. No human approval.",
        "",
        `- Source: ${story.xPostUrl}`,
        `- Author: ${story.authorName}${story.handle ? ` @${story.handle}` : ""}`,
        `- Outcome: ${story.result ?? story.output}`,
      ].join("\n"),
    }),
  });

  try {
    await gh(`/repos/${owner}/${name}/issues/${pull.number}/labels`, {
      method: "POST",
      body: JSON.stringify(["ingest"]),
    });
  } catch {
    // label may not exist yet
  }

  try {
    await gh(`/repos/${owner}/${name}/pulls/${pull.number}/merge`, {
      method: "PUT",
      body: JSON.stringify({ merge_method: "squash" }),
    });
    return { prUrl: pull.html_url, merged: true };
  } catch {
    return { prUrl: pull.html_url, merged: false };
  }
}

export async function queueIngestIssue(urls: string[]) {
  const { owner, name } = repo();
  const unique = [...new Set(urls)].slice(0, 15);
  if (unique.length === 0) throw new Error("no_urls");
  const issue = await gh<{ html_url: string; number: number }>(`/repos/${owner}/${name}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title: "Ingest posts:",
      labels: ["use-case"],
      body: ["Queued by the UseGrokBot ingest API.", "", "## X post URLs", "", ...unique].join("\n"),
    }),
  });
  return { issueUrl: issue.html_url, count: unique.length };
}

export async function fileIngestError(input: { url: string; code: string; reason: string }) {
  if (process.env.INGEST_ERROR_ISSUES !== "1") return;
  if (!canPublish()) return;
  const { owner, name } = repo();
  await gh(`/repos/${owner}/${name}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title: `Ingest failed: ${input.url}`,
      labels: ["error-queue"],
      body: [`Code: \`${input.code}\``, "", input.reason, "", input.url].join("\n"),
    }),
  });
}
