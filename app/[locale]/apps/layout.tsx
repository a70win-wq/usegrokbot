import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/apps",
    title: "pages.appsTitle",
    description: "pages.appsBody",
  });
}

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
