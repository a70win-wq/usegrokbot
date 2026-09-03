import { JsonLd } from "@/components/JsonLd";
import { UseCasesView } from "@/components/UseCasesView";
import { discoverStories, getDiscoverStory } from "@/data/discover";
import { verifiedUseCases } from "@/data/verified-use-cases";
import { localizeVerifiedUseCase, verifiedUseCasesPageCopy } from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export default async function UseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = verifiedUseCasesPageCopy(locale);
  const items = verifiedUseCases.map((item) => {
    const localized = localizeVerifiedUseCase(item, locale);
    const source = getDiscoverStory(item.primarySourceSlug);
    if (!source) throw new Error(`Missing Use Case source: ${item.primarySourceSlug}`);
    return {
      slug: item.slug,
      rank: item.rank,
      title: localized.title,
      category: item.category,
      evidence: item.evidence,
      structure: item.structure,
      authorName: source.authorName,
      handle: source.handle,
    };
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.subtitle(discoverStories.length),
          url: absoluteUrl("/use-cases", urlLocale),
          numberOfItems: verifiedUseCases.length,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: absoluteUrl(`/use-cases/${item.slug}`, urlLocale),
            })),
          },
        }}
      />
      <UseCasesView items={items} reviewedPostCount={discoverStories.length} />
    </>
  );
}
