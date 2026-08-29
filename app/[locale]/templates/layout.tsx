import { templates } from "@/data/templates";
import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/templates",
    title: "templates.allTitle",
    description: "templates.allBody",
    vars: { n: templates.length },
  });
}

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
