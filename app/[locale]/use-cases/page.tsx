import { JsonLd } from "@/components/JsonLd";
import { UseCasesView } from "@/components/UseCasesView";
import { scenarios } from "@/data/scenarios";
import { localizeScenario, messages } from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export default async function UseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = messages[locale].useCases;
  const items = scenarios.map((item) => localizeScenario(item, locale));
  const description = copy.allBody.replace("{n}", String(scenarios.length));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.allTitle,
          description,
          url: absoluteUrl("/use-cases", urlLocale),
          numberOfItems: scenarios.length,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: absoluteUrl(`/use-cases/${item.slug}`, urlLocale),
              description: item.oneLiner,
            })),
          },
        }}
      />
      <UseCasesView />
    </>
  );
}
