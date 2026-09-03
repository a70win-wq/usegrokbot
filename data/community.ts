import { discoverStories } from "@/data/discover";

export const FEATURED_COMMUNITY_LIMIT = 24;

export type CommunityIdentity = {
  name: string;
  handle: string;
  count: number;
  latest: string;
};

export function featuredCommunityIdentities(
  limit = FEATURED_COMMUNITY_LIMIT,
): CommunityIdentity[] {
  const grouped = new Map<string, CommunityIdentity>();

  for (const story of discoverStories) {
    if (story.source !== "community" || !story.handle) continue;
    const handle = story.handle.trim().replace(/^@/, "").toLowerCase();
    if (!handle) continue;

    const current = grouped.get(handle);
    if (!current) {
      grouped.set(handle, {
        name: story.authorName,
        handle,
        count: 1,
        latest: story.publishedAt,
      });
      continue;
    }

    current.count += 1;
    if (story.publishedAt > current.latest) current.latest = story.publishedAt;
  }

  return [...grouped.values()]
    .sort(
      (a, b) =>
        b.count - a.count ||
        b.latest.localeCompare(a.latest) ||
        a.handle.localeCompare(b.handle),
    )
    .slice(0, Math.max(0, limit));
}

export function communityProfileUrl(handle: string) {
  const normalized = handle.trim().replace(/^@/, "").toLowerCase();
  return `https://x.com/${encodeURIComponent(normalized)}`;
}
