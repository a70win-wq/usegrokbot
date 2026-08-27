import type { DiscoverStory } from "@/data/discover";
import { metricForStory } from "@/lib/x-metrics";

export const sortFields = ["views", "date"] as const;
export type SortField = (typeof sortFields)[number];
export type SortDir = "asc" | "desc";
export type StorySort = { field: SortField; dir: SortDir };

export const defaultStorySort: StorySort = { field: "views", dir: "desc" };

export function defaultDirFor(field: SortField): SortDir {
  return field === "views" ? "desc" : "asc";
}

export function flipDir(dir: SortDir): SortDir {
  return dir === "asc" ? "desc" : "asc";
}

export function sortDiscoverStories(stories: DiscoverStory[], sort: StorySort): DiscoverStory[] {
  const sign = sort.dir === "asc" ? 1 : -1;
  return [...stories].sort((a, b) => {
    if (sort.field === "views") {
      const views = (metricForStory(a)?.views ?? 0) - (metricForStory(b)?.views ?? 0);
      if (views !== 0) return views * sign;
      return b.publishedAt.localeCompare(a.publishedAt);
    }
    const date = a.publishedAt.localeCompare(b.publishedAt);
    if (date !== 0) return date * sign;
    return a.slug.localeCompare(b.slug);
  });
}

export function sortDirKey(field: SortField, dir: SortDir) {
  if (field === "views") return dir === "desc" ? "sort.viewsDesc" : "sort.viewsAsc";
  return dir === "asc" ? "sort.dateAsc" : "sort.dateDesc";
}
