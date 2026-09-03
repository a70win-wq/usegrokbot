import assert from "node:assert/strict";
import { searchDiscoverStories } from "../data/discover";
import { localizeDiscoverStory } from "../lib/i18n/discover";
import {
  appResultsPath,
  homeDiscoverPath,
  searchResultsPath,
  topicResultsPath,
  withSearchQuery,
} from "../lib/search";

assert.equal(searchResultsPath(" podcast summarizer "), "/?q=podcast+summarizer");
assert.equal(searchResultsPath("   "), "/");
assert.equal(withSearchQuery("/en", "?tab=latest", "podcast"), "/en?tab=latest&q=podcast");
assert.equal(withSearchQuery("/zh-hk", "?tab=latest&q=old", "  "), "/zh-hk?tab=latest");
assert.equal(topicResultsPath("email"), "/?topic=email");
assert.equal(appResultsPath("google-calendar"), "/?app=google-calendar");
assert.equal(
  homeDiscoverPath({ query: " weekly brief ", topic: "research", app: "notion" }),
  "/?q=weekly+brief&topic=research&app=notion",
);

const podcastResults = searchDiscoverStories("podcast", 3);
assert.ok(podcastResults.length > 0, "expected podcast search to return a known result");
assert.ok(podcastResults.length <= 3, "expected search result limit to be respected");
assert.ok(
  searchDiscoverStories("GPU", 6).some((story) => story.slug === "vic305-grok-bot-just-made-me-919-on-ebay"),
  "expected body text to make the eBay GPU story searchable",
);
assert.ok(
  searchDiscoverStories("競爭對手研究", 6, {
    locale: "zh-Hant",
    localize: (story) => localizeDiscoverStory(story, "zh-Hant"),
  }).length > 0,
  "expected the Traditional Chinese search suggestion to return localized results",
);
assert.ok(
  searchDiscoverStories("销售线索", 6, {
    locale: "zh-Hans",
    localize: (story) => localizeDiscoverStory(story, "zh-Hans"),
  }).length > 0,
  "expected the Simplified Chinese search suggestion to return localized results",
);
assert.deepEqual(searchDiscoverStories("no-such-grok-bot-result-8d6f4f"), []);

console.log("Validated search query URLs and catalog results.");
