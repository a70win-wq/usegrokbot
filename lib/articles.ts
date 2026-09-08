import { chineseTutorialArticles } from "@/data/chinese-tutorial-articles";
import {
  articleExternalUrl,
  discoverStories,
  resolvedXArticleUrl,
  xArticleIdFromUrl,
  type DiscoverStory,
} from "@/data/discover";
import {
  storyContentLanguage,
  type ArticleContentLanguage,
} from "@/lib/article-language";
import type { Locale } from "@/lib/i18n/types";
import { tweetIdFromUrl } from "@/lib/ingest/x-url";
import {
  articleRankingStories,
  articleStoriesByViews,
  latestArticleStories,
  learnFeedStories,
  rankArticleStories,
  topArticleStoriesByViews,
  type RankedStory,
} from "@/lib/x-metrics";

export type { ArticleContentLanguage, DiscoverStory, Locale, RankedStory };

export {
  articleExternalUrl,
  articleStoriesByViews,
  latestArticleStories,
  learnFeedStories,
  storyContentLanguage,
  topArticleStoriesByViews,
};

/** All article-ranking records, including the dedicated Chinese tutorials. */
export function articleLibraryStories() {
  return articleRankingStories();
}

export function englishArticlesByViews(limit?: number) {
  const english = articleLibraryStories().filter(
    (story) => storyContentLanguage(story) === "en",
  );
  const ranked = rankArticleStories(english, { by: "views" });
  return typeof limit === "number" ? ranked.slice(0, limit) : ranked;
}

function isChineseTeachingXArticle(story: DiscoverStory) {
  if (!resolvedXArticleUrl(story)) return false;
  const language = storyContentLanguage(story);
  return language === "zh-Hans" || language === "zh-Hant";
}

function teachingArticleKeys(story: DiscoverStory) {
  const keys = [`slug:${story.slug}`];
  const articleId = xArticleIdFromUrl(resolvedXArticleUrl(story));
  const tweetId = tweetIdFromUrl(story.xPostUrl ?? story.sourceUrl ?? "");
  if (articleId) keys.push(`article:${articleId}`);
  if (tweetId) keys.push(`tweet:${tweetId}`);
  return keys;
}

/**
 * Chinese tutorial ranking is curated `chineseTutorialArticles` ∪ Discover
 * stories that are real Chinese X Articles (`resolvedXArticleUrl` plus
 * zh-Hans/zh-Hant). Curated wins on article id / tweet id / slug so
 * localized titles stay preferred. True X Articles such as Chris FAQ or
 * JuneDangg therefore appear even when ingest only published them to Discover.
 * `format: "article"` alone is not enough — many Discover rows are long posts,
 * not X Articles.
 */
export function chineseTeachingArticleStories() {
  const seen = new Set<string>();
  const stories: DiscoverStory[] = [];

  const consider = (story: DiscoverStory) => {
    const keys = teachingArticleKeys(story);
    if (keys.some((key) => seen.has(key))) return;
    keys.forEach((key) => seen.add(key));
    stories.push(story);
  };

  for (const story of chineseTutorialArticles) consider(story);
  for (const story of discoverStories) {
    if (!isChineseTeachingXArticle(story)) continue;
    consider(story);
  }
  return stories;
}

export function chineseTeachingArticlesByViews(limit?: number) {
  const ranked = rankArticleStories(chineseTeachingArticleStories(), { by: "views" });
  return typeof limit === "number" ? ranked.slice(0, limit) : ranked;
}

/** Stable X ids for Chris FAQ. Slugs differ between Discover and curated. */
export const PINNED_CHINESE_FAQ_TWEET_ID = "2096982246913888554";
export const PINNED_CHINESE_FAQ_ARTICLE_ID = "2095747836654796800";

export function isPinnedChineseTeachingStory(story: DiscoverStory) {
  const tweetId = tweetIdFromUrl(story.xPostUrl ?? story.sourceUrl ?? "");
  if (tweetId === PINNED_CHINESE_FAQ_TWEET_ID) return true;

  const articleId =
    xArticleIdFromUrl(resolvedXArticleUrl(story)) ??
    xArticleIdFromUrl(story.articleUrl) ??
    xArticleIdFromUrl(story.sourceUrl) ??
    xArticleIdFromUrl(story.xPostUrl);
  if (articleId === PINNED_CHINESE_FAQ_ARTICLE_ID) return true;

  return (
    story.slug === "chris62771610-grok-bot-faq-7" ||
    story.slug === "zh-tutorial-chris-faq-7"
  );
}

/**
 * Split the Chinese tutorial ranking so Chris FAQ can sit in a Pinned
 * block. The numbered list then starts at the highest-views remaining story.
 */
export function splitChineseTeachingArticles(
  items: RankedStory[] = chineseTeachingArticlesByViews(),
) {
  const pinned = items.find((item) => isPinnedChineseTeachingStory(item.story));
  const ranked = items.filter((item) => !isPinnedChineseTeachingStory(item.story));
  return { pinned, ranked };
}

export function japaneseArticlesByViews(limit?: number) {
  const japanese = articleLibraryStories().filter(
    (story) => storyContentLanguage(story) === "ja",
  );
  const ranked = rankArticleStories(japanese, { by: "views" });
  return typeof limit === "number" ? ranked.slice(0, limit) : ranked;
}
