import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { TemplateIdentityDetailView } from "@/components/TemplateIdentityDetailView";
import {
  getTemplateIdentity,
  isTemplateIdentitySlug,
  localizeText,
  templateIdentitySlugs,
  templatesForIdentity,
} from "@/data/template-identities";
import { catalogEntry, getTemplateStory, templateCopy } from "@/data/templates";
import { localizeDiscoverStory, localizeTemplateCopy } from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return templateIdentitySlugs.map((identity) => ({ identity }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; identity: string }>;
}) {
  const { locale: raw, identity: slug } = await params;
  const identity = getTemplateIdentity(slug);
  if (!identity) return {};
  const { urlLocale, locale } = localeFromParams(raw);
  return pageMeta({
    title: localizeText(identity.name, locale),
    description: localizeText(identity.description, locale),
    path: "/templates/" + identity.slug,
    urlLocale,
  });
}

export default async function TemplateIdentityPage({
  params,
}: {
  params: Promise<{ locale: string; identity: string }>;
}) {
  const { locale: raw, identity: slug } = await params;
  if (!isTemplateIdentitySlug(slug)) notFound();

  const identity = getTemplateIdentity(slug);
  if (!identity) notFound();

  const { urlLocale, locale } = localeFromParams(raw);
  const name = localizeText(identity.name, locale);
  const description = localizeText(identity.description, locale);
  const items = templatesForIdentity(slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name,
          description,
          url: absoluteUrl("/templates/" + slug, urlLocale),
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
      <TemplateIdentityDetailView slug={slug} locale={locale} urlLocale={urlLocale} />
    </>
  );
}
