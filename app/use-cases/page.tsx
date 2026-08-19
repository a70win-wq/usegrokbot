import { UseCasesPageView } from "@/components/UseCasesPageView";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Grok Bot use cases",
  description:
    "Browse ready-made Grok Bot workflows, prompts and automations. Filter by job, app, difficulty or schedule.",
  path: "/use-cases",
});

export default async function UseCasesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return <UseCasesPageView initialQuery={q} />;
}
