import metrics from "@/data/discover/x-metrics.json";
import { discoverStories, type DiscoverStory } from "@/data/discover";
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
