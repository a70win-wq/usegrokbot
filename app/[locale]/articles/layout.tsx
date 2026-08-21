import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/articles",
    title: "pages.articlesTitle",
    description: "pages.articlesBody",
  });
}

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
