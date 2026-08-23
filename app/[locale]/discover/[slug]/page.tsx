import { notFound } from "next/navigation";
import { DiscoverDetailView } from "@/components/DiscoverDetailView";
import { appsBySlug } from "@/data/apps";
import {
  discoverStories,
  getDiscoverStory,
  getRelatedDiscoverStories,
} from "@/data/discover";
import { localizeDiscoverStory, type Locale } from "@/lib/i18n";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return discoverStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const story = getDiscoverStory(slug);
  if (!story) return {};

  const { urlLocale, locale } = localeFromParams(raw);
  const item = localizeDiscoverStory(story, locale);
  const copy = metadataCopy(locale, item.title, item.headline);

  return pageMeta({
    title: copy.title,
    description: copy.description,
    path: `/discover/${story.slug}`,
    urlLocale,
  });
}

export default async function DiscoverStoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const story = getDiscoverStory(slug);
  if (!story) notFound();
  return (
    <DiscoverDetailView
      story={story}
      more={getRelatedDiscoverStories(story, 3)}
      appNames={story.apps.map((app) => appsBySlug[app].name)}
    />
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
