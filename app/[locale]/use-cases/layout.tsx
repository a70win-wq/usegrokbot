import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/use-cases",
    title: "useCases.title",
    description: "useCases.body",
  });
}

export default function UseCasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
