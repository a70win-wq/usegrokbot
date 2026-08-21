import type { MetadataRoute } from "next";
import { discoverStories } from "@/data/discover";
import { topics } from "@/data/topics";
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
    ...entries("/categories", { changeFrequency: "weekly", priority: 0.8 }, day(latestStory)),
    ...entries("/rankings", { changeFrequency: "daily", priority: 0.7 }, day(latestStory)),
    ...entries("/articles", { changeFrequency: "daily", priority: 0.7 }, day(latestStory)),
    ...entries("/how-we-built", { changeFrequency: "monthly", priority: 0.5 }, day(LAST_REVIEWED)),
    ...topics.flatMap((item) =>
      entries(`/categories/${item.slug}`, { changeFrequency: "weekly", priority: 0.7 }, day(latestStory)),
    ),
    ...entries("/submit", { changeFrequency: "monthly", priority: 0.4 }, day(LAST_REVIEWED)),
  ];
}
