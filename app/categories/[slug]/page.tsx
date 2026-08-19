import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/CategoryDetailView";
import { categories, categoriesBySlug } from "@/data/categories";
import { getUseCasesByCategory } from "@/data/use-cases";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoriesBySlug[slug as keyof typeof categoriesBySlug];
  if (!category) return {};
  return pageMeta({
    title: `Grok Bot workflows for ${category.name.toLowerCase()}`,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoriesBySlug[slug as keyof typeof categoriesBySlug];
  if (!category) notFound();
  return <CategoryDetailView category={category} items={getUseCasesByCategory(category.slug)} />;
}
