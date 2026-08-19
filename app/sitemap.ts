import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";
import { categories } from "@/data/categories";
import { discoverStories } from "@/data/discover";
import { learnArticles } from "@/data/learn";
import { useCases } from "@/data/use-cases";
import { LAST_REVIEWED, verificationFor } from "@/data/verification";
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
  const reviewed = day(LAST_REVIEWED);
  const latestStory = discoverStories.reduce(
    (latest, item) => (item.publishedAt > latest ? item.publishedAt : latest),
    discoverStories[0]?.publishedAt ?? LAST_REVIEWED,
  );

  return [
    ...entries("/", { changeFrequency: "weekly", priority: 1 }, day(latestStory)),
    ...entries("/discover", { changeFrequency: "weekly", priority: 0.9 }, day(latestStory)),
    ...discoverStories.flatMap((item) =>
      entries(`/discover/${item.slug}`, { changeFrequency: "weekly", priority: 0.8 }, day(item.publishedAt)),
    ),
    ...entries("/use-cases", { changeFrequency: "weekly", priority: 0.8 }, reviewed),
    ...entries("/categories", { changeFrequency: "weekly", priority: 0.8 }, reviewed),
    ...entries("/integrations", { changeFrequency: "weekly", priority: 0.8 }, reviewed),
    ...entries("/prompts", { changeFrequency: "weekly", priority: 0.8 }, reviewed),
    ...entries("/learn", { changeFrequency: "weekly", priority: 0.8 }, reviewed),
    ...entries("/submit", { changeFrequency: "monthly", priority: 0.5 }, reviewed),
    ...useCases.flatMap((item) =>
      entries(
        `/use-cases/${item.slug}`,
        { changeFrequency: "weekly", priority: 0.7 },
        day(verificationFor(item.slug).lastVerified),
      ),
    ),
    ...categories.flatMap((item) =>
      entries(`/categories/${item.slug}`, { changeFrequency: "weekly", priority: 0.6 }, reviewed),
    ),
    ...apps.flatMap((item) =>
      entries(`/integrations/${item.slug}`, { changeFrequency: "weekly", priority: 0.7 }, reviewed),
    ),
    ...learnArticles.flatMap((item) =>
      entries(
        `/learn/${item.slug}`,
        { changeFrequency: "monthly", priority: 0.6 },
        item.verifiedAt ? day(item.verifiedAt) : undefined,
      ),
    ),
  ];
}
