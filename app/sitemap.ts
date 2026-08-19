import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";
import { categories } from "@/data/categories";
import { discoverStories } from "@/data/discover";
import { learnArticles } from "@/data/learn";
import { useCases } from "@/data/use-cases";
import { URL_LOCALES, absoluteUrl, languageAlternates } from "@/lib/i18n/paths";

function entries(
  path: string,
  extras: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">,
  now: Date,
): MetadataRoute.Sitemap {
  return URL_LOCALES.map((urlLocale) => ({
    url: absoluteUrl(path, urlLocale),
    lastModified: now,
    alternates: { languages: languageAlternates(path) },
    ...extras,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...entries("/", { changeFrequency: "weekly", priority: 1 }, now),
    ...entries("/discover", { changeFrequency: "weekly", priority: 0.9 }, now),
    ...discoverStories.flatMap((item) =>
      entries(`/discover/${item.slug}`, { changeFrequency: "weekly", priority: 0.8 }, now),
    ),
    ...entries("/use-cases", { changeFrequency: "weekly", priority: 0.8 }, now),
    ...entries("/categories", { changeFrequency: "weekly", priority: 0.8 }, now),
    ...entries("/apps", { changeFrequency: "weekly", priority: 0.8 }, now),
    ...entries("/prompts", { changeFrequency: "weekly", priority: 0.8 }, now),
    ...entries("/learn", { changeFrequency: "weekly", priority: 0.8 }, now),
    ...entries("/submit", { changeFrequency: "monthly", priority: 0.5 }, now),
    ...useCases.flatMap((item) =>
      entries(`/use-cases/${item.slug}`, { changeFrequency: "weekly", priority: 0.7 }, now),
    ),
    ...categories.flatMap((item) =>
      entries(`/categories/${item.slug}`, { changeFrequency: "weekly", priority: 0.6 }, now),
    ),
    ...apps.flatMap((item) =>
      entries(`/apps/${item.slug}`, { changeFrequency: "monthly", priority: 0.6 }, now),
    ),
    ...learnArticles.flatMap((item) =>
      entries(`/learn/${item.slug}`, { changeFrequency: "monthly", priority: 0.6 }, now),
    ),
  ];
}
