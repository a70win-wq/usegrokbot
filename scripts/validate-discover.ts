import { discoverStories } from "../data/discover";
import ingested from "../data/discover/ingested.json";
import japaneseCopy from "../data/discover/ja.json";
import { retainedDiscoverSlugs } from "../data/retained-discover";
import { assertStorySafe } from "../lib/ingest/validate";
import { tweetIdFromUrl } from "../lib/ingest/x-url";
import type { DiscoverStory } from "../data/discover";

const ingestedStories = ingested as DiscoverStory[];
const japaneseStories = japaneseCopy as Record<
  string,
  { title?: string; headline?: string; whatTheyDid?: string; body?: string; quote?: string }
>;
const slugs = new Set<string>();
const tweets = new Set<string>();

const japaneseSlugs = Object.keys(japaneseStories);
if (japaneseSlugs.length !== retainedDiscoverSlugs.length) {
  throw new Error(
    `Japanese Discover copy has ${japaneseSlugs.length} stories, expected ${retainedDiscoverSlugs.length}`,
  );
}

for (const slug of retainedDiscoverSlugs) {
  const copy = japaneseStories[slug];
  if (!copy?.title?.trim() || !copy.headline?.trim() || !copy.whatTheyDid?.trim()) {
    throw new Error(`Japanese Discover summary is missing ${slug}`);
  }
  if (copy.body || copy.quote) {
    throw new Error(`Japanese Discover copy must preserve the original source text for ${slug}`);
  }
}

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
