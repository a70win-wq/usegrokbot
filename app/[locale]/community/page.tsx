import type { Metadata } from "next";
import { CommunityView, type CommunityIdentity, type GitHubContributor } from "@/components/CommunityView";
import { discoverStories } from "@/data/discover";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "zh-hk" ? "社群" : locale === "zh-cn" ? "社区" : "Community";
  const description =
    locale === "zh-hk"
      ? "認識分享 Grok Bot 真實案例嘅社群，同埋幫手改善 UseGrokBot 嘅開源 Contributor。"
      : locale === "zh-cn"
        ? "认识分享 Grok Bot 真实案例的社区，以及帮助改善 UseGrokBot 的开源 Contributor。"
        : "Meet the community sharing real Grok Bot examples and the open-source contributors improving UseGrokBot.";
  return { title: `${title} | ${site.name}`, description };
}

export default async function CommunityPage() {
  const [contributors] = await Promise.all([getContributors()]);
  return <CommunityView identities={communityIdentities()} contributors={contributors} />;
}

function communityIdentities(): CommunityIdentity[] {
  const grouped = new Map<string, CommunityIdentity>();

  for (const story of discoverStories) {
    if (story.source !== "community") continue;
    const key = (story.handle ?? story.authorName).trim().toLowerCase();
    if (!key) continue;
    const current = grouped.get(key);
    if (!current) {
      grouped.set(key, {
        name: story.authorName,
        handle: story.handle,
        count: 1,
        latest: story.publishedAt,
      });
      continue;
    }
    current.count += 1;
    if (story.publishedAt > current.latest) current.latest = story.publishedAt;
    if (!current.handle && story.handle) current.handle = story.handle;
  }

  return [...grouped.values()].sort((a, b) => b.count - a.count || b.latest.localeCompare(a.latest));
}

async function getContributors(): Promise<GitHubContributor[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${site.githubRepo}/contributors?per_page=24`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "UseGrokBot-community-page",
      },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const rows = (await response.json()) as Array<{
      login?: string;
      contributions?: number;
      html_url?: string;
      type?: string;
    }>;
    return rows
      .filter(
        (item) =>
          item.type === "User" &&
          item.login &&
          item.html_url &&
          !item.login.toLowerCase().includes("[bot]") &&
          !item.login.toLowerCase().endsWith("-bot"),
      )
      .slice(0, 16)
      .map((item) => ({
        login: item.login!,
        contributions: item.contributions ?? 0,
        htmlUrl: item.html_url!,
      }));
  } catch {
    return [];
  }
}
