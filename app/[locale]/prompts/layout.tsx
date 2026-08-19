import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/prompts",
    title: "pages.promptsTitle",
    description: "pages.promptsBody",
  });
}

export default function PromptsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
