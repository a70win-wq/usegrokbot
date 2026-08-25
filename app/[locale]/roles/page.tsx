import { JsonLd } from "@/components/JsonLd";
import { OfficialView } from "@/components/OfficialView";
import {
  OFFICIAL_DOCS_URL,
  OFFICIAL_SOURCE_URL,
  officialUseCases,
} from "@/data/official-use-cases";
import { messages } from "@/lib/i18n/messages";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export default async function OfficialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = messages[locale].officialPage;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.body,
          url: absoluteUrl("/roles", urlLocale),
          numberOfItems: officialUseCases.length,
          isBasedOn: [OFFICIAL_SOURCE_URL, OFFICIAL_DOCS_URL],
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <OfficialView />
    </>
  );
}
