import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { DiscoverCard } from "@/components/DiscoverCard";
import { discoverStories } from "@/data/discover";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const decoded = decodeURIComponent(handle).toLowerCase();
  const story = discoverStories.find((item) => item.handle?.toLowerCase() === decoded);
  if (!story) return { title: `Community | ${site.name}` };
  return {
    title: `${story.authorName} (@${story.handle}) | ${site.name}`,
    description: `Public Grok Bot examples shared by ${story.authorName}, curated by UseGrokBot with links to the original source.`,
  };
}

export default async function CommunityProfilePage({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>;
}) {
  const { locale, handle } = await params;
  const decoded = decodeURIComponent(handle).toLowerCase();
  const stories = discoverStories
    .filter((item) => item.handle?.toLowerCase() === decoded)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  if (!stories.length) notFound();

  const first = stories[0];
  const actualHandle = first.handle!;
  const copy = profileCopy(locale, stories.length);

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <BlobatarAvatar name={actualHandle} size={88} expression="love" />
        <div className="min-w-0">
          <p className="text-[12px] font-medium tracking-[0.08em] text-faint uppercase">{copy.identity}</p>
          <h1 className="mt-1 text-[clamp(28px,5vw,44px)] font-medium tracking-tight text-ink">{first.authorName}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mute">
            <span>@{actualHandle}</span>
            <span>{copy.count}</span>
            <a
              href={`https://x.com/${encodeURIComponent(actualHandle)}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              {copy.xProfile} ↗
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-6 text-mute">{copy.body}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stories.map((story) => (
          <DiscoverCard key={story.slug} story={story} />
        ))}
      </div>
    </div>
  );
}

function profileCopy(locale: string, count: number) {
  if (locale === "zh-hk") {
    return {
      identity: "Community Blob Identity",
      count: `${count} 個公開案例`,
      xProfile: "X Profile",
      body: "這個頁面集合該作者在 UseGrokBot 出現過的公開 Grok Bot 案例。Blob 只是社群身份；每個案例仍然保留原始來源和作者 attribution。",
    };
  }
  if (locale === "zh-cn") {
    return {
      identity: "Community Blob Identity",
      count: `${count} 个公开案例`,
      xProfile: "X Profile",
      body: "这个页面集合该作者在 UseGrokBot 出现过的公开 Grok Bot 案例。Blob 只是社区身份；每个案例仍然保留原始来源和作者 attribution。",
    };
  }
  return {
    identity: "Community Blob Identity",
    count: `${count} public ${count === 1 ? "case" : "cases"}`,
    xProfile: "X profile",
    body: "This page groups the public Grok Bot examples attributed to this author on UseGrokBot. The Blob is only a community identity; every case still keeps its original source and attribution.",
  };
}
