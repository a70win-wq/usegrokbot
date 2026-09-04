import { notFound, permanentRedirect } from "next/navigation";
import { DiscoverDetailView } from "@/components/DiscoverDetailView";
import { JsonLd } from "@/components/JsonLd";
import {
  discoverStories,
  discoverStoryDestination,
  getDiscoverStory,
  getRelatedDiscoverStories,
  shouldIndexDiscoverStory,
} from "@/data/discover";
import { LAST_REVIEWED } from "@/data/verification";
import { localizeDiscoverStory, messages, type Locale } from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return discoverStories.filter(shouldIndexDiscoverStory).map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const story = getDiscoverStory(slug);
  if (!story || !shouldIndexDiscoverStory(story)) return {};

  const { urlLocale, locale } = localeFromParams(raw);
  const item = localizeDiscoverStory(story, locale);
  const copy = metadataCopy(locale, item.title, item.headline);

  return pageMeta({
    title: copy.title,
    description: copy.description,
    path: `/discover/${story.slug}`,
    urlLocale,
    index: shouldIndexDiscoverStory(story),
    follow: true,
  });
}

export default async function DiscoverStoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const story = getDiscoverStory(slug);
  if (!story) notFound();
  if (!shouldIndexDiscoverStory(story)) {
    permanentRedirect(discoverStoryDestination(story));
  }
  const { urlLocale, locale } = localeFromParams(raw);
  const item = localizeDiscoverStory(story, locale);
  const pageUrl = absoluteUrl(`/discover/${story.slug}`, urlLocale);
  const sourceAuthorType =
    story.handle === "xai" || story.handle === "bot" || story.authorName === "xAI" || story.authorName === "Jellypod"
      ? "Organization"
      : "Person";
  const source = {
    "@type": "CreativeWork",
    name: story.sourceLabel,
    url: story.sourceUrl,
    author: {
      "@type": sourceAuthorType,
      name: story.authorName,
      ...(story.handle ? { url: `https://x.com/${story.handle}` } : {}),
    },
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: item.title,
          description: item.headline,
          datePublished: story.publishedAt,
          dateModified: LAST_REVIEWED,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          isBasedOn: source,
          citation: source,
          mainEntityOfPage: pageUrl,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: messages[locale].nav.discover, item: absoluteUrl("/", urlLocale) },
            { "@type": "ListItem", position: 2, name: item.title },
          ],
        }}
      />
      <DiscoverDetailView story={story} more={getRelatedDiscoverStories(story, 3)} />
    </>
  );
}

function metadataCopy(locale: Locale, title: string, headline: string) {
  if (locale === "zh-Hant") {
    return {
      title: `${title}：把案例變成提示詞`,
      description: `看懂這個真實的 Grok Bot 案例，再複製一份可直接設定新 Bot、含試跑與核准規則的提示詞。${headline}`,
    };
  }

  if (locale === "zh-Hans") {
    return {
      title: `${title}：把案例变成提示词`,
      description: `看懂这个真实的 Grok Bot 案例，再复制一份可直接设置新 Bot、含试跑与核准规则的提示词。${headline}`,
    };
  }

  return {
    title: `${title}: Case to prompt`,
    description: `Understand this real Grok Bot case, then copy a paste-ready setup prompt with a dry run and approval rules. ${headline}`,
  };
}
