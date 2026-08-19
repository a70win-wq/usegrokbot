import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";
import { categories } from "@/data/categories";
import { learnArticles } from "@/data/learn";
import { useCases } from "@/data/use-cases";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/use-cases", "/categories", "/apps", "/prompts", "/learn", "/submit"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  return [
    ...staticRoutes,
    ...useCases.map((item) => ({
      url: `${site.url}/use-cases/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...categories.map((item) => ({
      url: `${site.url}/categories/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...apps.map((item) => ({
      url: `${site.url}/apps/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...learnArticles.map((item) => ({
      url: `${site.url}/learn/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
