import { JsonLd } from "@/components/JsonLd";
import { TemplatesIdentityIndex } from "@/components/TemplatesIdentityIndex";
import {
  getTemplateIdentity,
  localizeText,
  templateCountForIdentity,
  templateIdentitySlugs,
  templateIdentityUiCopy,
} from "@/data/template-identities";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export default async function TemplatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = templateIdentityUiCopy[locale];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.intro,
          url: absoluteUrl("/templates", urlLocale),
          numberOfItems: templateIdentitySlugs.length,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: templateIdentitySlugs.map((slug, index) => {
              const identity = getTemplateIdentity(slug);
              if (!identity) return null;
              return {
                "@type": "ListItem",
                position: index + 1,
                name: localizeText(identity.name, locale),
                url: absoluteUrl("/templates/" + slug, urlLocale),
                description: localizeText(identity.description, locale),
                numberOfItems: templateCountForIdentity(slug),
              };
            }).filter(Boolean),
          },
        }}
      />
      <TemplatesIdentityIndex locale={locale} urlLocale={urlLocale} />
    </>
  );
}
