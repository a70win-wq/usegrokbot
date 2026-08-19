import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/integrations",
    title: "pages.integrationsTitle",
    description: "pages.integrationsBody",
  });
}

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
