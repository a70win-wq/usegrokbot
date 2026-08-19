import { readFile, writeFile } from "node:fs/promises";
import { ingestUseCase } from "../lib/ingest/pipeline";

const FEED_PATH = "data/source-feeds/awesome-grok-bot-field-cases.json";
const MAX_PER_RUN = Math.max(1, Number(process.env.SOURCE_INGEST_LIMIT ?? "12"));
const MAX_ATTEMPTS = Math.max(1, Number(process.env.SOURCE_INGEST_MAX_ATTEMPTS ?? "3"));
const RETRYABLE = new Set(["source_unreadable", "extract_failed", "publish_failed", "publish_not_configured", "unexpected_error"]);

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

async function save(feed: Feed) {
  await writeFile(FEED_PATH, `${JSON.stringify(feed, null, 2)}\n`, "utf8");
}

function shouldProcess(item: SourceCase) {
  if (item.sourceType !== "x" || item.sourceStatus !== "candidate") return false;
  if (!["pending", "retry"].includes(item.ingest.status)) return false;
  return (item.ingest.attempts ?? 0) < MAX_ATTEMPTS;
}

function markSkipped(item: SourceCase, code: string, reason: string, attempts: number): IngestState {
  const retry = RETRYABLE.has(code) && attempts < MAX_ATTEMPTS;
  return {
    status: retry ? "retry" : "skipped",
    attempts,
    code,
    reason,
  };
}

async function main() {
  const feed = JSON.parse(await readFile(FEED_PATH, "utf8")) as Feed;
  const queue = feed.cases.filter(shouldProcess).slice(0, MAX_PER_RUN);

  if (!queue.length) {
    console.log("No new X Field Cases to ingest.");
    return;
  }

  console.log(`Auto-ingesting ${queue.length} X Field Cases from awesome-grok-bot.`);

  for (const candidate of queue) {
    const item = feed.cases.find((entry) => entry.url === candidate.url)!;
    const attempts = (item.ingest.attempts ?? 0) + 1;
    console.log(`\n[${attempts}/${MAX_ATTEMPTS}] ${item.title}\n${item.url}`);

    try {
      const result = await ingestUseCase({
        xUrl: item.url,
        notes: `Discovered via RongleCat/awesome-grok-bot Field Cases. Source-index summary: ${item.sourceSummary}`,
      });

      if (result.status === "published") {
        item.ingest = { status: "published", attempts };
        console.log(`published: ${result.slug}`);
      } else if (result.status === "queued") {
        item.ingest = { status: "queued", attempts, reason: result.prUrl };
        console.log(`queued: ${result.prUrl}`);
      } else if (result.status === "extracted") {
        item.ingest = markSkipped(
          item,
          "publish_not_configured",
          "Case extracted successfully but no GitHub publishing token was available.",
          attempts,
        );
        console.log("extracted but not published");
      } else {
        item.ingest = markSkipped(item, result.code, result.reason, attempts);
        console.log(`${item.ingest.status}: ${result.code} — ${result.reason}`);
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      item.ingest = markSkipped(item, "unexpected_error", reason, attempts);
      console.error(`unexpected error: ${reason}`);
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
