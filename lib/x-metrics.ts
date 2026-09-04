import metrics from "@/data/discover/x-metrics.json";
import {
  articleStories,
  discoverStories,
  resolvedXArticleUrl,
  xArticleIdFromUrl,
  type DiscoverStory,
} from "@/data/discover";
import { chineseTutorialArticles } from "@/data/chinese-tutorial-articles";
import { storyContentLanguage, type ArticleContentLanguage } from "@/lib/article-language";
import { locales, type Locale } from "@/lib/i18n/types";
import { tweetIdFromUrl } from "@/lib/ingest/x-url";

export type XMetric = {
  views: number;
  likes?: number;
  checkedAt: string;
};

export type XMetricsFile = {
  updatedAt: string;
  posts: Record<string, XMetric>;
};

const data = metrics as XMetricsFile;

export function storyTweetId(story: DiscoverStory) {
  return tweetIdFromUrl(story.xPostUrl ?? story.sourceUrl ?? "");
}

export function metricForStory(story: DiscoverStory): XMetric | undefined {
  const id = storyTweetId(story);
  return id ? data.posts[id] : undefined;
}

export function metricForPostUrl(url?: string): XMetric | undefined {
  if (!url) return undefined;
  const id = tweetIdFromUrl(url);
  return id ? data.posts[id] : undefined;
}

export function formatViewCount(views: number, locale: string) {
  if (locale === "zh-Hant") {
    if (views >= 10000) return `${trimNumber(views / 10000)} 萬`;
    return views.toLocaleString("zh-Hant");
  }
  if (locale === "zh-Hans") {
    if (views >= 10000) return `${trimNumber(views / 10000)} 万`;
    return views.toLocaleString("zh-CN");
  }
  if (locale === "ja") {
    if (views >= 10000) return `${trimNumber(views / 10000)}万`;
    return views.toLocaleString("ja-JP");
  }
  if (views >= 1_000_000) return `${trimNumber(views / 1_000_000)}M`;
  if (views >= 1000) return `${trimNumber(views / 1000)}K`;
  return views.toLocaleString("en-US");
}

function trimNumber(value: number) {
  return value >= 100 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, "");
}

export function storiesByXViews() {
  return discoverStories
    .map((story) => ({ story, views: metricForStory(story)?.views ?? 0, checkedAt: metricForStory(story)?.checkedAt }))
    .filter((item) => item.views > 0)
    .sort((a, b) => b.views - a.views);
}

export type RankedStory = {
  story: DiscoverStory;
  views: number;
  checkedAt?: string;
};

function rankedStory(story: DiscoverStory): RankedStory {
  const metric = metricForStory(story);
  return { story, views: metric?.views ?? 0, checkedAt: metric?.checkedAt };
}

function languagePriority(language: ArticleContentLanguage, locale?: Locale) {
  if (!locale) return 0;
  const isChinese = language === "zh-Hant" || language === "zh-Hans";
  if (locale === "en") {
    if (language === "en") return 0;
    if (isChinese) return 1;
    if (language === "ja") return 2;
    return 3;
  }
  if (locale === "ja") {
    if (language === "ja") return 0;
    if (language === "en") return 1;
    if (isChinese) return 2;
    return 3;
  }
  if (isChinese) return 0;
  if (language === "en") return 1;
  if (language === "ja") return 2;
  return 3;
}

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function parseArticleListArgs(
  limitOrLocale?: number | Locale,
  localeOrLimit?: number | Locale,
  defaultLimit?: number,
) {
  if (isLocale(limitOrLocale)) {
    return {
      locale: limitOrLocale,
      limit: typeof localeOrLimit === "number" ? localeOrLimit : defaultLimit,
    };
  }
  if (typeof limitOrLocale === "number") {
    return {
      limit: limitOrLocale,
      locale: isLocale(localeOrLimit) ? localeOrLimit : undefined,
    };
  }
  return {
    locale: isLocale(localeOrLimit) ? localeOrLimit : undefined,
    limit: defaultLimit,
  };
}

function compareRankedStories(
  a: RankedStory,
  b: RankedStory,
  locale: Locale | undefined,
  by: "views" | "date",
) {
  const language =
    languagePriority(storyContentLanguage(a.story), locale) -
    languagePriority(storyContentLanguage(b.story), locale);
  if (language !== 0) return language;
  if (by === "date") {
    const date = b.story.publishedAt.localeCompare(a.story.publishedAt);
    if (date !== 0) return date;
    if (a.views !== b.views) return b.views - a.views;
    return a.story.slug.localeCompare(b.story.slug);
  }
  if (a.views !== b.views) return b.views - a.views;
  const date = b.story.publishedAt.localeCompare(a.story.publishedAt);
  if (date !== 0) return date;
  return a.story.slug.localeCompare(b.story.slug);
}

export function rankArticleStories(
  stories: DiscoverStory[],
  options: { locale?: Locale; by?: "views" | "date" } = {},
): RankedStory[] {
  const by = options.by ?? "views";
  return stories.map(rankedStory).sort((a, b) => compareRankedStories(a, b, options.locale, by));
}

export function articleRankingStories() {
  const seen = new Set<string>();
  const stories: DiscoverStory[] = [];
  for (const story of [...chineseTutorialArticles, ...articleStories()]) {
    const keys = [`slug:${story.slug}`];
    const articleId = xArticleIdFromUrl(resolvedXArticleUrl(story));
    const tweetId = storyTweetId(story);
    if (articleId) keys.push(`article:${articleId}`);
    if (tweetId) keys.push(`tweet:${tweetId}`);
    if (keys.some((key) => seen.has(key))) continue;
    keys.forEach((key) => seen.add(key));
    stories.push(story);
  }
  return stories;
}

function storiesForLocaleRanking(locale?: Locale) {
  return locale ? articleRankingStories() : articleStories();
}

export function articleStoriesByViews(locale?: Locale) {
  return rankArticleStories(storiesForLocaleRanking(locale), { locale, by: "views" });
}

export function topArticleStoriesByViews(limitOrLocale?: number | Locale, localeOrLimit?: number | Locale) {
  const { limit, locale } = parseArticleListArgs(limitOrLocale, localeOrLimit, 20);
  return articleStoriesByViews(locale).slice(0, limit ?? 20);
}

export function latestArticleStories(limitOrLocale?: number | Locale, localeOrLimit?: number | Locale) {
  const { limit, locale } = parseArticleListArgs(limitOrLocale, localeOrLimit, 10);
  return rankArticleStories(storiesForLocaleRanking(locale), { locale, by: "date" }).slice(0, limit ?? 10);
}

export function learnFeedStories(limitOrLocale?: number | Locale, localeOrLimit?: number | Locale) {
  const { limit, locale } = parseArticleListArgs(limitOrLocale, localeOrLimit, 5);
  return articleStoriesByViews(locale)
    .slice(0, limit ?? 5)
    .map((item) => item.story);
}
