import { writeFileSync } from "node:fs";
import {
  discoverStories,
  discoverStoryDestination,
  shouldIndexDiscoverStory,
} from "../data/discover";

const OUTPUT_PATH = "data/discover/retired-redirects.json";

const redirects = Object.fromEntries(
  discoverStories
    .filter((story) => !shouldIndexDiscoverStory(story))
    .map((story) => [story.slug, discoverStoryDestination(story)] as const)
    .sort(([left], [right]) => left.localeCompare(right)),
);

for (const [slug, destination] of Object.entries(redirects)) {
  const url = new URL(destination);
  if (!/^https?:$/.test(url.protocol)) {
    throw new Error(`Retired Discover URL must be external: ${slug}`);
  }
}

writeFileSync(OUTPUT_PATH, `${JSON.stringify(redirects, null, 2)}\n`);
console.log(`Wrote ${Object.keys(redirects).length} retired Discover redirects.`);
