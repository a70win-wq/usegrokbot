import type { MetadataRoute } from "next";
import { discoverStories, shouldIndexDiscoverStory } from "@/data/discover";
import { templateIdentitySlugs } from "@/data/template-identities";
import { verifiedUseCases } from "@/data/verified-use-cases";
import { URL_LOCALES, absoluteUrl, languageAlternates } from "@/lib/i18n/paths";

function entries(
  path: string,
  extras: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">,
): MetadataRoute.Sitemap {
  return URL_LOCALES.map((urlLocale) => ({
    url: absoluteUrl(path, urlLocale),
    alternates: { languages: languageAlternates(path) },
    ...extras,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Source-post dates are not page modification dates. Omit lastmod until
  // editorial updates are tracked per page instead of reporting false freshness.
  return [
    ...entries("/", { changeFrequency: "daily", priority: 1 }),
    ...entries("/use-cases", { changeFrequency: "weekly", priority: 0.85 }),
    ...entries("/templates", { changeFrequency: "daily", priority: 0.8 }),
    ...entries("/templates/teams", { changeFrequency: "daily", priority: 0.76 }),
    ...entries("/templates/all", { changeFrequency: "daily", priority: 0.72 }),
    ...templateIdentitySlugs.flatMap((identity) =>
      entries("/templates/" + identity, { changeFrequency: "weekly", priority: 0.7 }),
    ),
    ...verifiedUseCases.flatMap((item) =>
      entries(`/use-cases/${item.slug}`, { changeFrequency: "weekly", priority: 0.8 }),
    ),
    ...entries("/roles", { changeFrequency: "weekly", priority: 0.8 }),
    ...entries("/community", { changeFrequency: "weekly", priority: 0.8 }),
    ...entries("/articles", { changeFrequency: "weekly", priority: 0.75 }),
    ...entries("/articles/x", { changeFrequency: "daily", priority: 0.7 }),
    ...discoverStories.filter(shouldIndexDiscoverStory).flatMap((story) =>
      entries(`/discover/${story.slug}`, { changeFrequency: "monthly", priority: 0.6 }),
    ),
    ...entries("/submit", { changeFrequency: "monthly", priority: 0.4 }),
  ];
}
