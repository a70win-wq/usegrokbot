"use client";

import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { communityProfileUrl, type CommunityIdentity } from "@/data/community";
import { useI18n } from "@/lib/i18n";

export type GitHubContributor = {
  login: string;
  contributions: number;
  htmlUrl: string;
};

export function CommunityView({
  identities,
  contributors,
}: {
  identities: CommunityIdentity[];
  contributors: GitHubContributor[];
}) {
  const { locale } = useI18n();
  const copy = communityCopy(locale);

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
      <div className="max-w-[760px]">
        <h1 className="text-[clamp(30px,5vw,48px)] font-medium tracking-tight text-ink">{copy.title}</h1>
        <p className="mt-4 text-[16px] leading-7 text-mute">{copy.body}</p>
        <LocaleLink
          href="/submit"
          className="accent-gradient mt-6 inline-flex h-11 items-center rounded-[10px] px-5 text-[15px] font-medium text-inverse"
        >
          {copy.submit} →
        </LocaleLink>
      </div>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[24px] font-medium tracking-tight text-ink">{copy.builders}</h2>
            <p className="mt-2 text-[15px] text-mute">{copy.buildersBody}</p>
          </div>
          <a
            href="https://github.com/a70win-wq/usegrokbot/graphs/contributors"
            target="_blank"
            rel="noreferrer"
            className="hidden text-[13px] text-mute hover:text-ink sm:inline"
          >
            {copy.github} ↗
          </a>
        </div>

        {contributors.length ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {contributors.map((person) => (
              <a
                key={person.login}
                href={person.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-4 transition hover:border-line-strong"
              >
                <BlobatarAvatar name={`github:${person.login}`} size={56} expression="smug" />
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-ink">@{person.login}</p>
                  <p className="mt-1 text-[12px] text-faint">
                    {person.contributions} {copy.contributions}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-line bg-elevated px-5 py-6 text-[15px] text-mute">
            {copy.buildersFallback}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-[24px] font-medium tracking-tight text-ink">{copy.zoo}</h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-mute">{copy.zooBody}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {identities.map((person) => (
            <a
              key={person.handle}
              href={communityProfileUrl(person.handle)}
              target="_blank"
              rel="noopener noreferrer"
              data-community-handle={person.handle}
              className="group flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-card px-4 py-4 transition hover:border-line-strong"
            >
              <BlobatarAvatar name={person.handle} size={56} expression="happy" />
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-medium text-ink">{person.name}</span>
                <span className="mt-0.5 block truncate text-[12px] text-faint">@{person.handle}</span>
                <span className="mt-1 block text-[12px] text-mute">
                  {person.count} {person.count === 1 ? copy.case : copy.cases}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function communityCopy(locale: string) {
  if (locale === "zh-Hant") {
    return {
      title: "UseGrokBot 社群",
      body: "認識分享真實 Grok Bot 案例的人，以及幫助改善 UseGrokBot 的開源 Contributor。這裡只顯示精選名單，方便快速查看。",
      submit: "加入你的 Grok Bot",
      builders: "Community Builders",
      buildersBody: "幫助改善 UseGrokBot 的開源 Contributor。",
      github: "在 GitHub 查看",
      contributions: "次 contributions",
      buildersFallback: "Contributor 資料暫時未載入，但 GitHub repo 仍然可以正常瀏覽。",
      zoo: "精選分享者",
      zooBody: "按已分享的公開案例數量精選。每張卡片會直接開啟作者的 X 個人頁。",
      case: "個案例",
      cases: "個案例",
    };
  }
  if (locale === "zh-Hans") {
    return {
      title: "UseGrokBot 社区",
      body: "认识分享真实 Grok Bot 案例的人，以及帮助改善 UseGrokBot 的开源 Contributor。这里仅显示精选名单，方便快速查看。",
      submit: "加入你的 Grok Bot",
      builders: "Community Builders",
      buildersBody: "帮助改善 UseGrokBot 的开源 Contributor。",
      github: "在 GitHub 查看",
      contributions: "次 contributions",
      buildersFallback: "Contributor 数据暂时未载入，但 GitHub repo 仍然可以正常浏览。",
      zoo: "精选分享者",
      zooBody: "按已分享的公开案例数量精选。每张卡片会直接打开作者的 X 个人页。",
      case: "个案例",
      cases: "个案例",
    };
  }
  return {
    title: "UseGrokBot Community",
    body: "Meet the people behind real Grok Bot examples and the open-source builders improving UseGrokBot. This page keeps the list short and useful.",
    submit: "Add your Grok Bot",
    builders: "Community Builders",
    buildersBody: "Open-source contributors helping the project grow.",
    github: "View on GitHub",
    contributions: "contributions",
    buildersFallback: "Contributor data is temporarily unavailable, but the GitHub repository is still public.",
    zoo: "Featured sharers",
    zooBody: "Selected by the number of public examples shared. Each card opens the author's X profile.",
    case: "case",
    cases: "cases",
  };
}
