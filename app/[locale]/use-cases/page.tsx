import { JsonLd } from "@/components/JsonLd";
import { UseCasesView } from "@/components/UseCasesView";
import { botTeams } from "@/data/bot-teams";
import { botTeamsPageCopy, localizeBotTeam } from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export default async function UseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = botTeamsPageCopy(locale);
  const items = botTeams.map((item) => localizeBotTeam(item, locale));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.body,
          url: absoluteUrl("/use-cases", urlLocale),
          numberOfItems: botTeams.length,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: absoluteUrl(`/use-cases/${item.slug}`, urlLocale),
              description: item.summary,
            })),
          },
        }}
      />
      <UseCasesView />
    </>
  );
}
