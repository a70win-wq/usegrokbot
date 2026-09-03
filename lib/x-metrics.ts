import metrics from "@/data/discover/x-metrics.json";
import { articleStories, discoverStories, type DiscoverStory } from "@/data/discover";
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

export function articleStoriesByViews() {
  return articleStories()
    .map(rankedStory)
    .sort((a, b) => {
      if (a.views !== b.views) return b.views - a.views;
      const date = b.story.publishedAt.localeCompare(a.story.publishedAt);
      if (date !== 0) return date;
      return a.story.slug.localeCompare(b.story.slug);
    });
}

export function topArticleStoriesByViews(limit = 20) {
  return articleStoriesByViews().slice(0, limit);
}

export function latestArticleStories(limit = 10) {
  return articleStories()
    .map(rankedStory)
    .sort((a, b) => {
      const date = b.story.publishedAt.localeCompare(a.story.publishedAt);
      if (date !== 0) return date;
      if (a.views !== b.views) return b.views - a.views;
      return a.story.slug.localeCompare(b.story.slug);
    })
    .slice(0, limit);
}

export function learnFeedStories(limit = 5) {
  return articleStoriesByViews()
    .slice(0, limit)
    .map((item) => item.story);
}
