import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/roles",
    title: "officialPage.title",
    description: "officialPage.body",
  });
}

export default function OfficialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
