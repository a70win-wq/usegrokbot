import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/learn",
    title: "pages.learnTitle",
    description: "pages.learnBody",
  });
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
