import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/saved",
    title: "pages.savedTitle",
    description: "pages.savedBody",
    index: false,
  });
}

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
