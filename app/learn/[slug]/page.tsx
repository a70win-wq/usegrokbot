import { notFound } from "next/navigation";
import { LearnArticleView } from "@/components/LearnArticleView";
import { getLearnArticle, learnArticles } from "@/data/learn";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return learnArticles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) return {};
  return pageMeta({
    title: article.title,
    description: article.description,
    path: `/learn/${article.slug}`,
  });
}

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) notFound();
  return <LearnArticleView article={article} />;
}
