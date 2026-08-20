import { notFound } from "next/navigation";
import { IntegrationDetailView } from "@/components/IntegrationDetailView";
import { apps, appsBySlug } from "@/data/apps";
import { getDiscoverStoriesByApp } from "@/data/discover";
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
    title: translateMeta(urlLocale, "pages.integrationHeading", { name: item.name }),
    description: translateMeta(urlLocale, "pages.integrationBody", { name: item.name }),
    path: `/integrations/${app.slug}`,
    urlLocale,
  });
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const app = appsBySlug[slug as keyof typeof appsBySlug];
  if (!app) notFound();
  return <IntegrationDetailView app={app} stories={getDiscoverStoriesByApp(app.slug)} />;
}
