import { notFound } from "next/navigation";
import { UseCaseDetailView } from "@/components/UseCaseDetailView";
import { getRelatedUseCases, getUseCase, useCases } from "@/data/use-cases";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return useCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return {};
  return pageMeta({
    title: `${useCase.title} Grok Bot Workflow`,
    description: `Use Grok Bot to ${useCase.shortDescription.charAt(0).toLowerCase()}${useCase.shortDescription.slice(1)} Copy the prompt and get started.`,
    path: `/use-cases/${useCase.slug}`,
  });
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  return <UseCaseDetailView useCase={useCase} related={getRelatedUseCases(useCase, 4)} />;
}
