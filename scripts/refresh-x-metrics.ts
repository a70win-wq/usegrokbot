import { readFile, writeFile } from "node:fs/promises";
import { discoverStories } from "../data/discover";
import { tweetIdFromUrl } from "../lib/ingest/x-url";
import type { XMetricsFile } from "../lib/x-metrics";

const OUT = "data/discover/x-metrics.json";
const PAUSE_MS = 250;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function viewsFor(id: string) {
  const response = await fetch(`https://api.fxtwitter.com/status/${id}`, {
    headers: { "User-Agent": "usegrokbot.com" },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as {
    tweet?: { views?: number; likes?: number };
  };
  const views = data.tweet?.views;
  if (typeof views !== "number" || views < 0) return null;
  return { views, likes: data.tweet?.likes };
}

async function loadExistingPosts() {
  try {
    const parsed = JSON.parse(await readFile(OUT, "utf8")) as XMetricsFile;
    if (parsed?.posts && typeof parsed.posts === "object") return parsed;
  } catch {
    // first run or unreadable snapshot
  }
  return { updatedAt: new Date().toISOString().slice(0, 10), posts: {} } satisfies XMetricsFile;
}

async function main() {
  const ids = [
    ...new Set(
      discoverStories
        .map((story) => tweetIdFromUrl(story.xPostUrl ?? story.sourceUrl ?? ""))
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  const existing = await loadExistingPosts();
  const today = new Date().toISOString().slice(0, 10);
  const file: XMetricsFile = {
    updatedAt: existing.updatedAt,
    posts: {},
  };

  let refreshed = 0;
  for (const [index, id] of ids.entries()) {
    const metric = await viewsFor(id);
    if (metric) {
      file.posts[id] = { ...metric, checkedAt: today };
      refreshed += 1;
      console.log(`${index + 1}/${ids.length} ${id} ${metric.views}`);
    } else if (existing.posts[id]) {
      file.posts[id] = existing.posts[id];
      console.log(`${index + 1}/${ids.length} ${id} skipped (kept previous)`);
    } else {
      console.log(`${index + 1}/${ids.length} ${id} skipped`);
    }
    if (index < ids.length - 1) await sleep(PAUSE_MS);
  }

  if (refreshed > 0) file.updatedAt = today;

  await writeFile(OUT, `${JSON.stringify(file, null, 2)}\n`);
  console.log(`wrote ${Object.keys(file.posts).length} view counts to ${OUT} (${refreshed} refreshed)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
