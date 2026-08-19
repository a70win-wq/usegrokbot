import { DiscoverIndexView } from "@/components/DiscoverIndexView";
import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/discover",
    title: "discover.title",
    description: "discover.body",
  });
}

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <DiscoverIndexView initialQuery={q ?? ""} />;
}
