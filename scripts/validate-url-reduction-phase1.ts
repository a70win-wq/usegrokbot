import assert from "node:assert/strict";
import { apps } from "../data/apps";
import {
  FEATURED_COMMUNITY_LIMIT,
  communityProfileUrl,
  featuredCommunityIdentities,
} from "../data/community";
import {
  discoverStories,
  filterDiscoverStories,
  shouldIndexDiscoverStory,
} from "../data/discover";
import { templates } from "../data/templates";
import { topics } from "../data/topics";
import { verifiedUseCases } from "../data/verified-use-cases";
import { appResultsPath, topicResultsPath } from "../lib/search";

const retained = discoverStories.filter(shouldIndexDiscoverStory);
const externalOnly = discoverStories.filter((story) => !shouldIndexDiscoverStory(story));

assert.equal(discoverStories.length, 1_804, "Discover inventory changed; review the URL plan again");
assert.equal(retained.length, 88, "The retained Discover set must stay at the reviewed 88 stories");
assert.equal(externalOnly.length, 1_716, "Every non-retained Discover story must use its source URL");
assert.equal(templates.length, 209, "All reviewed Templates must stay available");
assert.equal(verifiedUseCases.length, 28, "All verified Use Cases must stay available");

for (const story of externalOnly) {
  const source = new URL(story.xPostUrl ?? story.sourceUrl);
  assert.ok(source.protocol === "https:" || source.protocol === "http:", `${story.slug} needs a public source URL`);
}

for (const topic of topics) {
  assert.ok(
    filterDiscoverStories({ category: topic.slug }).length > 0,
    `${topic.slug} needs homepage filter results`,
  );
  assert.equal(topicResultsPath(topic.slug), `/?topic=${topic.slug}`);
}

for (const app of apps) {
  assert.ok(filterDiscoverStories({ app: app.slug }).length > 0, `${app.slug} needs homepage filter results`);
  assert.equal(appResultsPath(app.slug), `/?app=${app.slug}`);
}

const featured = featuredCommunityIdentities();
assert.equal(featured.length, FEATURED_COMMUNITY_LIMIT);
assert.equal(new Set(featured.map((person) => person.handle)).size, featured.length);
for (const person of featured) {
  const profile = new URL(communityProfileUrl(person.handle));
  assert.equal(profile.hostname, "x.com");
  assert.equal(profile.pathname, `/${person.handle}`);
}

console.log(
  `Validated phase 1: ${retained.length} retained Discover stories, ${externalOnly.length} source links, ${featured.length} featured community profiles, ${templates.length} Templates, and ${verifiedUseCases.length} Use Cases.`,
);
