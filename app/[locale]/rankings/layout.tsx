import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/rankings",
    title: "pages.rankingsTitle",
    description: "pages.rankingsBody",
  });
}

export default function RankingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
