import { notFound } from "next/navigation";
import { DiscoverDetailView } from "@/components/DiscoverDetailView";
import { discoverStories, getDiscoverStory } from "@/data/discover";
import { localizeDiscoverStory } from "@/lib/i18n";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return discoverStories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const { locale, urlLocale } = localeFromParams(raw);
  const story = getDiscoverStory(slug);
  if (!story) return {};
  const item = localizeDiscoverStory(story, locale);
  return pageMeta({
    title: `${item.title} — ${item.authorName}`,
    description: item.headline,
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
  return <DiscoverDetailView story={story} />;
}
