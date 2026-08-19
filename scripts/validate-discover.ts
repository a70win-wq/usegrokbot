import { discoverStories } from "../data/discover";
import ingested from "../data/discover/ingested.json";
import { assertStorySafe } from "../lib/ingest/validate";
import { tweetIdFromUrl } from "../lib/ingest/x-url";
import type { DiscoverStory } from "../data/discover";

const ingestedStories = ingested as DiscoverStory[];
const slugs = new Set<string>();
const tweets = new Set<string>();

for (const story of discoverStories) {
  if (slugs.has(story.slug)) throw new Error(`Duplicate slug: ${story.slug}`);
  slugs.add(story.slug);
  const tweet = tweetIdFromUrl(story.xPostUrl ?? "") ?? tweetIdFromUrl(story.sourceUrl);
  if (tweet) {
    if (tweets.has(tweet) && story.xPostUrl) {
      // Official pages may share one article URL. Only fail on repeated tweet IDs from X permalinks.
    }
    if (story.xPostUrl && tweetIdFromUrl(story.xPostUrl)) {
      const id = tweetIdFromUrl(story.xPostUrl)!;
      if (tweets.has(`x:${id}`)) throw new Error(`Duplicate X post: ${story.xPostUrl}`);
      tweets.add(`x:${id}`);
    }
  }
  if (!story.result && !story.output) throw new Error(`${story.slug} needs result or output`);
}

for (const story of ingestedStories) {
  assertStorySafe(
    story,
    discoverStories.filter((item) => item.slug !== story.slug),
  );
}

console.log(`ok ${discoverStories.length} stories (${ingestedStories.length} ingested)`);
