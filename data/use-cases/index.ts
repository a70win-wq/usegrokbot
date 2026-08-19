import type { UseCase } from "../types";
import { contentUseCases } from "./content";
import { marketingUseCases } from "./marketing";
import { operationsUseCases } from "./operations";
import { researchUseCases } from "./research";
import { restUseCases } from "./rest";
import { salesUseCases } from "./sales";
import { supportHrUseCases } from "./support-hr";

export const useCases: UseCase[] = [
  ...salesUseCases,
  ...marketingUseCases,
  ...contentUseCases,
  ...researchUseCases,
  ...operationsUseCases,
  ...supportHrUseCases,
  ...restUseCases,
];

const bySlug = new Map(useCases.map((useCase) => [useCase.slug, useCase]));

export function getUseCase(slug: string) {
  return bySlug.get(slug);
}

export function getUseCasesByCategory(category: UseCase["category"]) {
  return useCases.filter((useCase) => useCase.category === category);
}

export function getUseCasesByApp(app: UseCase["apps"][number]) {
  return useCases.filter((useCase) => useCase.apps.includes(app));
}

export function getPopularUseCases(limit = 9) {
  return [...useCases]
    .filter((useCase) => useCase.popular)
    .sort((a, b) => b.copies - a.copies)
    .slice(0, limit);
}

export function getNewUseCases(limit = 6) {
  return [...useCases]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedUseCases(useCase: UseCase, limit = 4) {
  const related = useCase.related
    .map((slug) => bySlug.get(slug))
    .filter((item): item is UseCase => Boolean(item));

  if (related.length >= limit) return related.slice(0, limit);

  const extras = useCases.filter(
    (item) =>
      item.slug !== useCase.slug &&
      item.category === useCase.category &&
      !related.some((rel) => rel.slug === item.slug),
  );

  return [...related, ...extras].slice(0, limit);
}

export function assertUniqueSlugs() {
  if (bySlug.size !== useCases.length) {
    throw new Error("Duplicate use-case slugs");
  }
}
