import { HomeView } from "@/components/HomeView";
import { messageMeta, translateMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    ...messageMeta(locale, {
      path: "/",
      title: "home.title",
      description: "home.subtitle",
    }),
    title: { absolute: `${site.name} — ${translateMeta(locale, "home.title")}` },
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <HomeView initialQuery={q ?? ""} />;
}
