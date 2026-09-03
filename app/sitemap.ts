import type { MetadataRoute } from "next";
import { discoverStories, shouldIndexDiscoverStory } from "@/data/discover";
import { scenarios } from "@/data/scenarios";
import { templateIdentitySlugs } from "@/data/template-identities";
import { topics } from "@/data/topics";
import { verifiedUseCases } from "@/data/verified-use-cases";
import { LAST_REVIEWED } from "@/data/verification";
import { URL_LOCALES, absoluteUrl, languageAlternates } from "@/lib/i18n/paths";

function entries(
  path: string,
  extras: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">,
  lastModified?: Date,
): MetadataRoute.Sitemap {
  return URL_LOCALES.map((urlLocale) => ({
    url: absoluteUrl(path, urlLocale),
    ...(lastModified ? { lastModified } : {}),
    alternates: { languages: languageAlternates(path) },
    ...extras,
  }));
}

function day(iso: string) {
  return new Date(`${iso}T00:00:00Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestStory = discoverStories.reduce(
    (latest, item) => (item.publishedAt > latest ? item.publishedAt : latest),
    discoverStories[0]?.publishedAt ?? LAST_REVIEWED,
  );

  return [
    ...entries("/", { changeFrequency: "daily", priority: 1 }, day(latestStory)),
    ...entries("/use-cases", { changeFrequency: "weekly", priority: 0.85 }, day(latestStory)),
    ...entries("/templates", { changeFrequency: "daily", priority: 0.8 }, day(latestStory)),
    ...entries("/templates/teams", { changeFrequency: "daily", priority: 0.76 }, day(latestStory)),
    ...entries("/templates/all", { changeFrequency: "daily", priority: 0.72 }, day(latestStory)),
    ...templateIdentitySlugs.flatMap((identity) =>
      entries("/templates/" + identity, { changeFrequency: "weekly", priority: 0.7 }, day(latestStory)),
    ),
    ...verifiedUseCases.flatMap((item) =>
      entries(`/use-cases/${item.slug}`, { changeFrequency: "weekly", priority: 0.8 }, day(latestStory)),
    ),
    ...scenarios.flatMap((item) =>
      entries(`/use-cases/${item.slug}`, { changeFrequency: "weekly", priority: 0.75 }, day(latestStory)),
    ),
    ...entries("/roles", { changeFrequency: "weekly", priority: 0.8 }, day(latestStory)),
    ...entries("/categories", { changeFrequency: "weekly", priority: 0.8 }, day(latestStory)),
    ...entries("/articles", { changeFrequency: "daily", priority: 0.7 }, day(latestStory)),
    ...discoverStories.filter(shouldIndexDiscoverStory).flatMap((story) =>
      entries(`/discover/${story.slug}`, { changeFrequency: "monthly", priority: 0.6 }, day(story.publishedAt)),
    ),
    ...topics.flatMap((item) =>
      entries(`/categories/${item.slug}`, { changeFrequency: "weekly", priority: 0.7 }, day(latestStory)),
    ),
    ...entries("/submit", { changeFrequency: "monthly", priority: 0.4 }, day(LAST_REVIEWED)),
  ];
}
