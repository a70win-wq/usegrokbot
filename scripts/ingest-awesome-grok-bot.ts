import { readFile, writeFile } from "node:fs/promises";
import { discoverStories, type DiscoverStory } from "../data/discover";
import { publishStory } from "../lib/ingest/publish";
import { assertStorySafe } from "../lib/ingest/validate";
import { site } from "../lib/site";

const FEED_PATH = "data/source-feeds/awesome-grok-bot-field-cases.json";
const MAX_PER_RUN = Math.max(1, Number(process.env.SOURCE_INGEST_LIMIT ?? "6"));
const MAX_ATTEMPTS = Math.max(1, Number(process.env.SOURCE_INGEST_MAX_ATTEMPTS ?? "3"));
const RETRYABLE = new Set([
  "source_unreadable",
  "extract_failed",
  "publish_failed",
  "publish_not_configured",
  "site_extract_failed",
  "rate_limited",
  "unexpected_error",
]);

type IngestState = {
  status: "pending" | "retry" | "published" | "queued" | "skipped" | "source-only";
  attempts: number;
  code?: string;
  reason?: string;
};

type SourceCase = {
  id: string;
  title: string;
  url: string;
  sourceSummary: string;
  sourceType: string;
  sourceStatus: "candidate" | "already-ingested";
  ingest: IngestState;
};

type Feed = {
  schemaVersion: number;
  source: Record<string, unknown>;
  stats: Record<string, number>;
  cases: SourceCase[];
};

type ExtractResponse = {
  status: "published" | "queued" | "extracted" | "skipped";
  story?: DiscoverStory;
  confidence?: number;
  code?: string;
  reason?: string;
};

async function save(feed: Feed) {
  await writeFile(FEED_PATH, `${JSON.stringify(feed, null, 2)}\n`, "utf8");
}

function shouldProcess(item: SourceCase) {
  if (item.sourceType !== "x" || item.sourceStatus !== "candidate") return false;
  if (!["pending", "retry"].includes(item.ingest.status)) return false;
  return (item.ingest.attempts ?? 0) < MAX_ATTEMPTS;
}

function markSkipped(code: string, reason: string, attempts: number): IngestState {
  const retry = RETRYABLE.has(code) && attempts < MAX_ATTEMPTS;
  return {
    status: retry ? "retry" : "skipped",
    attempts,
    code,
    reason,
  };
}

async function extractViaLiveSite(item: SourceCase): Promise<DiscoverStory> {
  const response = await fetch(`${site.url}/api/ingest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-ingest-mode": "extract",
      "User-Agent": "UseGrokBot-awesome-source-ingest",
    },
    body: JSON.stringify({
      xUrl: item.url,
      phase: "extract",
      notes: `Discovered via RongleCat/awesome-grok-bot Field Cases. Source-index summary: ${item.sourceSummary}`,
    }),
  });

  let data: ExtractResponse;
  try {
    data = (await response.json()) as ExtractResponse;
  } catch {
    throw new Error(`site_extract_failed:${response.status}:invalid_json`);
  }

  if (data.status === "extracted" && data.story) return data.story;

  const code = data.code || (response.status === 429 ? "rate_limited" : "site_extract_failed");
  const reason = data.reason || `Live extraction returned ${response.status}`;
  throw new Error(`${code}:${reason}`);
}

function parseFailure(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error);
  const separator = raw.indexOf(":");
  if (separator <= 0) return { code: "unexpected_error", reason: raw };
  return {
    code: raw.slice(0, separator),
    reason: raw.slice(separator + 1),
  };
}

async function main() {
  const feed = JSON.parse(await readFile(FEED_PATH, "utf8")) as Feed;
  const queue = feed.cases.filter(shouldProcess).slice(0, MAX_PER_RUN);

  if (!queue.length) {
    console.log("No new X Field Cases to ingest.");
    return;
  }

  console.log(`Auto-ingesting ${queue.length} X Field Cases from awesome-grok-bot via ${site.url}.`);

  for (const candidate of queue) {
    const item = feed.cases.find((entry) => entry.url === candidate.url)!;
    const attempts = (item.ingest.attempts ?? 0) + 1;
    console.log(`\n[${attempts}/${MAX_ATTEMPTS}] ${item.title}\n${item.url}`);

    try {
      const story = await extractViaLiveSite(item);
      assertStorySafe(
        story,
        discoverStories.filter((existing) => existing.slug !== story.slug),
      );

      const published = await publishStory(story);
      if (published.merged) {
        item.ingest = { status: "published", attempts, reason: published.prUrl };
        console.log(`published: ${story.slug}`);
      } else {
        item.ingest = { status: "queued", attempts, reason: published.prUrl };
        console.log(`queued: ${published.prUrl}`);
      }
    } catch (error) {
      const failure = parseFailure(error);
      item.ingest = markSkipped(failure.code, failure.reason, attempts);
      console.error(`${item.ingest.status}: ${failure.code} — ${failure.reason}`);
    }

    await save(feed);
  }

  const states = feed.cases.reduce<Record<string, number>>((acc, item) => {
    acc[item.ingest.status] = (acc[item.ingest.status] ?? 0) + 1;
    return acc;
  }, {});
  console.log("\nSource-feed ingest states:", states);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
