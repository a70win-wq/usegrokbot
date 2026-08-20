import { notFound, redirect } from "next/navigation";
import { getDiscoverStory } from "@/data/discover";

export default async function DiscoverStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getDiscoverStory(slug);
  if (!story) notFound();
  redirect(story.xPostUrl ?? story.sourceUrl);
}
