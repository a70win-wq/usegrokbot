import { JsonLd } from "@/components/JsonLd";
import { TemplatesView } from "@/components/TemplatesView";
import { catalogEntry, getTemplateStory, templateCopy, templates } from "@/data/templates";
import { templateIdentityUiCopy } from "@/data/template-identities";
import { localizeDiscoverStory, localizeTemplateCopy, messages } from "@/lib/i18n";
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
  const copy = messages[locale].templates;
  return pageMeta({
    title: copy.allTitle,
    description: copy.allBody.replace("{n}", String(templates.length)),
    path: "/templates/all",
    urlLocale,
  });
}

export default async function AllTemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = messages[locale].templates;
  const description = copy.allBody.replace("{n}", String(templates.length));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.allTitle,
          description,
          url: absoluteUrl("/templates/all", urlLocale),
          numberOfItems: templates.length,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: templates.map((item, index) => {
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
      <TemplatesView showIdentityBrowse browseLabel={templateIdentityUiCopy[locale].back} />
    </>
  );
}
