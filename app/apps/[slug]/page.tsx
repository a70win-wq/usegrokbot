import { notFound } from "next/navigation";
import { AppDetailView } from "@/components/AppDetailView";
import { apps, appsBySlug } from "@/data/apps";
import { getUseCasesByApp } from "@/data/use-cases";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return apps.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = appsBySlug[slug as keyof typeof appsBySlug];
  if (!app) return {};
  return pageMeta({
    title: `Best Grok Bot workflows for ${app.name}`,
    description: `Ready-made Grok Bot prompts and workflows that work with ${app.name}. ${app.description}`,
    path: `/apps/${app.slug}`,
  });
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = appsBySlug[slug as keyof typeof appsBySlug];
  if (!app) notFound();
  return <AppDetailView app={app} items={getUseCasesByApp(app.slug)} />;
}
