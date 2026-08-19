import { notFound } from "next/navigation";
import { LearnArticleView } from "@/components/LearnArticleView";
import { getLearnArticle, learnArticles } from "@/data/learn";
import { localizeLearnArticle } from "@/lib/i18n";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return learnArticles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const { locale, urlLocale } = localeFromParams(raw);
  const article = getLearnArticle(slug);
  if (!article) return {};
  const item = localizeLearnArticle(article, locale);
  return pageMeta({
    title: item.title,
    description: item.description,
    path: `/learn/${article.slug}`,
    urlLocale,
  });
}

export default async function LearnArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) notFound();
  return <LearnArticleView article={article} />;
}
