import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/CategoryDetailView";
import { categories, categoriesBySlug } from "@/data/categories";
import { getUseCasesByCategory } from "@/data/use-cases";
import { localizeCategory } from "@/lib/i18n";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta, translateMeta } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const { locale, urlLocale } = localeFromParams(raw);
  const category = categoriesBySlug[slug as keyof typeof categoriesBySlug];
  if (!category) return {};
  const item = localizeCategory(category, locale);
  return pageMeta({
    title: translateMeta(urlLocale, "pages.categoryHeading", { name: item.name }),
    description: item.description,
    path: `/categories/${category.slug}`,
    urlLocale,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const category = categoriesBySlug[slug as keyof typeof categoriesBySlug];
  if (!category) notFound();
  return <CategoryDetailView category={category} items={getUseCasesByCategory(category.slug)} />;
}
