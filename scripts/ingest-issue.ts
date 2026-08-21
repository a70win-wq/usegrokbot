import { writeFileSync } from "node:fs";
import { ingestUseCase } from "../lib/ingest/pipeline";
import { publishStory } from "../lib/ingest/publish";
import { assertStorySafe } from "../lib/ingest/validate";
import { collectXUrls, isIngestIssueTitle, tweetIdFromUrl } from "../lib/ingest/x-url";
import { discoverStories, type DiscoverStory } from "../data/discover";
import { site } from "../lib/site";

type Row = {
  url: string;
  status: string;
  code?: string;
  detail?: string;
};

function readIssue() {
  const title = process.env.ISSUE_TITLE ?? "";
  const body = process.env.ISSUE_BODY ?? "";
  const urls = collectXUrls(
    [title, body, process.env.INGEST_URL ?? "", process.env.INGEST_URLS ?? ""].join("\n"),
  );
  const jsonMatch = body.match(/```json\s*([\s\S]*?)```/);
  const story = jsonMatch ? (JSON.parse(jsonMatch[1]) as DiscoverStory) : null;
  const prompt = pickSection(body, "Prompt");
  const notes = pickSection(body, "Notes");
  const elonLikedIds = new Set(
    collectXUrls(pickSection(body, "Elon liked") ?? "").map((url) => tweetIdFromUrl(url)).filter(Boolean),
  );
  return { urls, story, prompt, notes, elonLikedIds };
}

function pickSection(body: string, heading: string) {
  const match = body.match(new RegExp(`## ${heading}\\n([\\s\\S]*?)(?:\\n## |$)`));
  const value = match?.[1]?.trim();
  if (!value || value === "Not provided") return undefined;
  return value;
}

async function extractViaSite(xUrl: string, prompt?: string, notes?: string) {
  const response = await fetch(`${site.url}/api/ingest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-ingest-mode": "extract",
    },
    body: JSON.stringify({ xUrl, prompt, notes, phase: "extract" }),
  });
  const data = (await response.json()) as { status: string; story?: DiscoverStory; reason?: string };
  if (data.status !== "extracted" || !data.story) {
    throw new Error(data.reason || "extract_via_site_failed");
  }
  return data.story;
}

async function ingestUrl(xUrl: string, prompt?: string, notes?: string): Promise<Row> {
  const result = await ingestUseCase({ xUrl, prompt, notes });
  if (result.status === "published" || result.status === "queued") {
    return { url: xUrl, status: result.status, detail: result.prUrl };
  }
  if (result.status === "extracted") {
    assertStorySafe(
      result.story,
      discoverStories.filter((item) => item.slug !== result.story.slug),
    );
    const published = await publishStory(result.story);
    return {
      url: xUrl,
      status: published.merged ? "published" : "queued",
      detail: published.prUrl,
    };
  }
  if (result.status === "skipped" && result.code === "extract_failed") {
    const story = await extractViaSite(xUrl, prompt, notes);
    assertStorySafe(
      story,
      discoverStories.filter((item) => item.slug !== story.slug),
    );
    const published = await publishStory(story);
    return {
      url: xUrl,
      status: published.merged ? "published" : "queued",
      detail: published.prUrl,
    };
  }
  return { url: xUrl, status: "skipped", code: result.code, detail: result.reason };
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
}

async function main() {
  const title = process.env.ISSUE_TITLE ?? "";
  if (!isIngestIssueTitle(title) && !process.env.INGEST_URL && !process.env.INGEST_URLS) {
    console.log("skip: not an ingest issue");
    return;
  }

  const issue = readIssue();
  const seen = new Set(
    discoverStories.flatMap((item) =>
      [item.xPostUrl, item.sourceUrl].map((url) => tweetIdFromUrl(url ?? "")).filter(Boolean),
    ),
  );
  const rows: Row[] = [];

  if (issue.story?.slug && issue.urls.length === 0) {
    assertStorySafe(
      issue.story,
      discoverStories.filter((item) => item.slug !== issue.story!.slug),
    );
    const published = await publishStory(issue.story);
    rows.push({
      url: issue.story.xPostUrl ?? issue.story.sourceUrl,
      status: published.merged ? "published" : "queued",
      detail: published.prUrl,
    });
    writeSummary(rows);
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
      const notes = liked
        ? [issue.notes, "Elon liked this post."].filter(Boolean).join("\n")
        : issue.notes;
      const row = await ingestUrl(xUrl, issue.prompt, notes);
      rows.push(row);
      if ((row.status === "published" || row.status === "queued") && id) seen.add(id);
    } catch (error) {
      rows.push({
        url: xUrl,
        status: "skipped",
        code: "error",
        detail: error instanceof Error ? error.message : "ingest_failed",
      });
    }
  }

  writeSummary(rows);
  const usable = rows.filter(
    (row) => row.status === "published" || row.status === "queued" || row.code === "duplicate",
  );
  if (usable.length === 0) throw new Error("All URLs failed ingest.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
