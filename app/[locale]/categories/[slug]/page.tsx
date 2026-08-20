import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/CategoryDetailView";
import { storiesForTopic } from "@/data/discover";
import { isTopicSlug, topicDescription, topicMessageKey, topics, topicsBySlug } from "@/data/topics";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta, translateMeta } from "@/lib/seo";

export function generateStaticParams() {
  return topics.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const { urlLocale, locale } = localeFromParams(raw);
  if (!isTopicSlug(slug)) return {};
  const topic = topicsBySlug[slug];
  const name = translateMeta(urlLocale, topicMessageKey(slug));
  return pageMeta({
    title: translateMeta(urlLocale, "pages.categoryHeading", { name }),
    description: topicDescription(topic, locale),
    path: `/categories/${topic.slug}`,
    urlLocale,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  if (!isTopicSlug(slug)) notFound();
  return <CategoryDetailView topic={topicsBySlug[slug]} stories={storiesForTopic(slug)} />;
}
