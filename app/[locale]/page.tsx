import { HomeView } from "@/components/HomeView";
import { JsonLd } from "@/components/JsonLd";
import { discoverStories } from "@/data/discover";
import { getGithubStars } from "@/lib/github";
import { messages } from "@/lib/i18n/messages";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { messageMeta, translateMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    ...messageMeta(locale, {
      path: "/",
      title: "home.metaTitle",
      description: "home.metaDescription",
    }),
    title: { absolute: `${site.name} — ${translateMeta(locale, "home.metaTitle")}` },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const stars = await getGithubStars();
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const url = absoluteUrl("/", urlLocale);
  const copy = messages[locale].home;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url,
          description: copy.metaDescription,
          potentialAction: {
            "@type": "SearchAction",
            target: `${url}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.metaDescription,
          url,
          numberOfItems: discoverStories.length,
        }}
      />
      <HomeView stars={stars} />
    </>
  );
}
