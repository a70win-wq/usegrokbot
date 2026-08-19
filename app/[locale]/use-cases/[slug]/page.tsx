import { notFound } from "next/navigation";
import { UseCaseDetailView } from "@/components/UseCaseDetailView";
import { getRelatedUseCases, getUseCase, useCases } from "@/data/use-cases";
import { localizeUseCase } from "@/lib/i18n";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return useCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const { locale, urlLocale } = localeFromParams(raw);
  const useCase = getUseCase(slug);
  if (!useCase) return {};
  const item = localizeUseCase(useCase, locale);
  const description = `${item.shortDescription.charAt(0).toLowerCase()}${item.shortDescription.slice(1)}`;
  return pageMeta({
    title: `${item.title} Grok Bot Workflow`,
    description: `Use Grok Bot to ${description} Copy the prompt and get started.`,
    path: `/use-cases/${useCase.slug}`,
    urlLocale,
  });
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  return <UseCaseDetailView useCase={useCase} related={getRelatedUseCases(useCase, 4)} />;
}
