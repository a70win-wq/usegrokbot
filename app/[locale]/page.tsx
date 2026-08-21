import { HomeView } from "@/components/HomeView";
import { getGithubStars } from "@/lib/github";
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
  const stars = await getGithubStars();
  return <HomeView initialQuery={q ?? ""} stars={stars} />;
}
