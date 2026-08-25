import { HowWeBuiltView } from "@/components/HowWeBuiltView";
import { JsonLd } from "@/components/JsonLd";
import { messages } from "@/lib/i18n/messages";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export default async function HowWeBuiltPage({ params }: { params: Promise<{ locale: string }> }) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = messages[locale].pages;
  const url = absoluteUrl("/how-we-built", urlLocale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: copy.builtTitle,
          description: copy.builtBody,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          url,
        }}
      />
      <HowWeBuiltView />
    </>
  );
}
