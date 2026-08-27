import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { UseCaseDetailView } from "@/components/UseCaseDetailView";
import { getScenario, scenarios } from "@/data/scenarios";
import { localizeScenario } from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return scenarios.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const scenario = getScenario(slug);
  if (!scenario) return {};
  const { urlLocale, locale } = localeFromParams(raw);
  const item = localizeScenario(scenario, locale);
  return pageMeta({
    title: item.title,
    description: item.oneLiner,
    path: `/use-cases/${scenario.slug}`,
    urlLocale,
  });
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const scenario = getScenario(slug);
  if (!scenario) notFound();
  const { urlLocale, locale } = localeFromParams(raw);
  const item = localizeScenario(scenario, locale);
  const url = absoluteUrl(`/use-cases/${scenario.slug}`, urlLocale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: item.title,
          description: item.oneLiner,
          url,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          step: {
            "@type": "HowToStep",
            name: item.title,
            text: item.startWith,
          },
        }}
      />
      <UseCaseDetailView scenario={scenario} />
    </>
  );
}
