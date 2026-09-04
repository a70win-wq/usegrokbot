import { chineseTutorialArticles } from "@/data/chinese-tutorial-articles";
import { articleExternalUrl, type DiscoverStory } from "@/data/discover";
import {
  storyContentLanguage,
  type ArticleContentLanguage,
} from "@/lib/article-language";
import type { Locale } from "@/lib/i18n/types";
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

export function chineseTeachingArticleStories() {
  return [...chineseTutorialArticles];
}

export function chineseTeachingArticlesByViews(limit?: number) {
  const ranked = rankArticleStories(chineseTeachingArticleStories(), { by: "views" });
  return typeof limit === "number" ? ranked.slice(0, limit) : ranked;
}

export function japaneseArticlesByViews(limit?: number) {
  const japanese = articleLibraryStories().filter(
    (story) => storyContentLanguage(story) === "ja",
  );
  const ranked = rankArticleStories(japanese, { by: "views" });
  return typeof limit === "number" ? ranked.slice(0, limit) : ranked;
}
