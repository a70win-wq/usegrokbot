import { UseCasesPageView } from "@/components/UseCasesPageView";
import { useCases } from "@/data/use-cases";
import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/use-cases",
    title: "pages.useCasesTitle",
    description: "pages.useCasesBody",
    vars: { n: useCases.length },
  });
}

export default async function UseCasesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status } = await searchParams;
  return <UseCasesPageView initialQuery={q} initialOfficial={status === "official"} />;
}
