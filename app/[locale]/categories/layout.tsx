import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/categories",
    title: "pages.categoriesTitle",
    description: "pages.categoriesBody",
  });
}

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
