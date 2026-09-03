import { JsonLd } from "@/components/JsonLd";
import { TemplatesTeamIndex } from "@/components/TemplatesTeamIndex";
import { catalogEntry, getTemplateStory, teamTemplates, templateCopy } from "@/data/templates";
import { templateHubUiCopy } from "@/data/template-types";
import { localizeDiscoverStory, localizeTemplateCopy } from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const { urlLocale, locale } = localeFromParams(raw);
  const copy = templateHubUiCopy[locale];
  return pageMeta({
    title: copy.teamTitle,
    description: copy.teamIntro,
    path: "/templates/teams",
    urlLocale,
  });
}

export default async function TeamTemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = templateHubUiCopy[locale];
  const items = teamTemplates();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.teamTitle,
          description: copy.teamIntro,
          url: absoluteUrl("/templates/teams", urlLocale),
          numberOfItems: items.length,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => {
              const story = getTemplateStory(item);
              const localized = story ? localizeDiscoverStory(story, locale) : undefined;
              const english = templateCopy(
                item,
                localized ?? { title: item.authorName, headline: "", body: "" },
              );
              const display = localizeTemplateCopy(item.id, locale, {
                title: english.title,
                oneLiner: english.oneLiner,
                body: catalogEntry(item.id)?.body,
              });
              return {
                "@type": "ListItem",
                position: index + 1,
                name: display.title,
                url: item.templateUrl,
                description: display.oneLiner,
              };
            }),
          },
        }}
      />
      <TemplatesTeamIndex locale={locale} urlLocale={urlLocale} />
    </>
  );
}
