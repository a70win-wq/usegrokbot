import { searchDiscoverStories } from "@/data/discover";
import type { AppSlug, CategorySlug, Difficulty, Schedule, UseCase } from "@/data/types";
import { isOfficial } from "@/data/verification";
import type { Locale } from "@/lib/i18n/types";

export { searchDiscoverStories };

export type SortKey = "popular" | "newest" | "az";

export type UseCaseFilters = {
  query?: string;
  categories?: CategorySlug[];
  difficulties?: Difficulty[];
  schedules?: Schedule[];
  apps?: AppSlug[];
  officialOnly?: boolean;
  sort?: SortKey;
  locale?: Locale;
};

function haystack(useCase: UseCase, original?: UseCase) {
  const parts = [
    useCase.title,
    useCase.shortDescription,
    useCase.description,
    useCase.problem,
    useCase.category,
    useCase.schedule,
    useCase.difficulty,
    ...useCase.tags,
    ...useCase.apps,
    ...(useCase.alsoUses ?? []),
  ];
  if (original && original !== useCase) {
    parts.push(original.title, original.shortDescription, original.description, original.problem);
  }
  return parts.join(" ").toLowerCase();
}

export function searchUseCases(list: UseCase[], query: string, originals?: UseCase[]) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const words = q.split(/\s+/).filter(Boolean);
  const bySlug = new Map((originals ?? []).map((item) => [item.slug, item]));

  return list.filter((useCase) => {
    const hay = haystack(useCase, bySlug.get(useCase.slug));
    return words.every((word) => hay.includes(word));
  });
}

export function filterUseCases(list: UseCase[], filters: UseCaseFilters, originals?: UseCase[]) {
  let next = list;

  if (filters.query) next = searchUseCases(next, filters.query, originals);
  if (filters.categories?.length) {
    next = next.filter((item) => filters.categories!.includes(item.category));
  }
  if (filters.difficulties?.length) {
    next = next.filter((item) => filters.difficulties!.includes(item.difficulty));
  }
  if (filters.schedules?.length) {
    next = next.filter((item) => filters.schedules!.includes(item.schedule));
  }
  if (filters.apps?.length) {
    next = next.filter((item) => item.apps.some((app) => filters.apps!.includes(app)));
  }
  if (filters.officialOnly) {
    next = next.filter(isOfficial);
  }

  return sortUseCases(next, filters.sort ?? "popular", filters.locale ?? "en");
}

export function sortUseCases(list: UseCase[], sort: SortKey, locale: Locale = "en") {
  const copy = [...list];
  const localeTag = locale === "en" ? "en" : locale;
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    case "az":
      return copy.sort((a, b) => a.title.localeCompare(b.title, localeTag));
    default:
      return copy.sort((a, b) => Number(b.popular) - Number(a.popular) || b.copies - a.copies);
  }
}
