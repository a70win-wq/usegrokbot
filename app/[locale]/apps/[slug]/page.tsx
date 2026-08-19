import { notFound } from "next/navigation";
import { AppDetailView } from "@/components/AppDetailView";
import { apps, appsBySlug } from "@/data/apps";
import { getUseCasesByApp } from "@/data/use-cases";
import { localizeApp } from "@/lib/i18n";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta, translateMeta } from "@/lib/seo";

export function generateStaticParams() {
  return apps.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const { locale, urlLocale } = localeFromParams(raw);
  const app = appsBySlug[slug as keyof typeof appsBySlug];
  if (!app) return {};
  const item = localizeApp(app, locale);
  return pageMeta({
    title: translateMeta(urlLocale, "pages.appHeading", { name: item.name }),
    description: item.description,
    path: `/apps/${app.slug}`,
    urlLocale,
  });
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const app = appsBySlug[slug as keyof typeof appsBySlug];
  if (!app) notFound();
  return <AppDetailView app={app} items={getUseCasesByApp(app.slug)} />;
}
