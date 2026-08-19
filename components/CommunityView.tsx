"use client";

import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { useI18n } from "@/lib/i18n";

export type CommunityIdentity = {
  name: string;
  handle?: string;
  count: number;
  latest: string;
};

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
        <p className="mt-4 text-base leading-7 text-mute">{copy.body}</p>
        <LocaleLink
          href="/submit"
          className="accent-gradient mt-6 inline-flex h-11 items-center rounded-[10px] px-5 text-sm font-medium text-inverse"
        >
          {copy.submit} →
        </LocaleLink>
      </div>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[24px] font-medium tracking-tight text-ink">{copy.builders}</h2>
            <p className="mt-2 text-sm text-mute">{copy.buildersBody}</p>
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
                  <p className="truncate text-sm font-medium text-ink">@{person.login}</p>
                  <p className="mt-1 text-[12px] text-faint">
                    {person.contributions} {copy.contributions}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-line bg-elevated px-5 py-6 text-sm text-mute">
            {copy.buildersFallback}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-[24px] font-medium tracking-tight text-ink">{copy.zoo}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">{copy.zooBody}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {identities.map((person) => {
            const body = (
              <>
                <BlobatarAvatar name={person.handle ?? person.name} size={56} expression="happy" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{person.name}</p>
                  <p className="mt-0.5 truncate text-[12px] text-faint">
                    {person.handle ? `@${person.handle}` : copy.sourceOnly}
                  </p>
                  <p className="mt-1 text-[12px] text-mute">
                    {person.count} {person.count === 1 ? copy.case : copy.cases}
                  </p>
                </div>
              </>
            );

            return person.handle ? (
              <LocaleLink
                key={person.handle}
                href={`/community/${encodeURIComponent(person.handle.toLowerCase())}`}
                className="group flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-4 transition hover:border-line-strong"
              >
                {body}
              </LocaleLink>
            ) : (
              <div
                key={`${person.name}-${person.latest}`}
                className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-4"
              >
                {body}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function communityCopy(locale: string) {
  if (locale === "zh-hk") {
    return {
      title: "UseGrokBot 社群",
      body: "睇下邊啲人分享緊真實 Grok Bot 案例，同埋邊啲開源 Contributor 幫緊 UseGrokBot 成長。每個公開 handle 都有一隻固定 Blob 身份。",
      submit: "加入你嘅 Grok Bot",
      builders: "Community Builders",
      buildersBody: "幫手改善 UseGrokBot 嘅開源 Contributor。",
      github: "喺 GitHub 睇",
      contributions: "次 contributions",
      buildersFallback: "Contributor 資料暫時未載入，但 GitHub repo 仍然可以正常瀏覽。",
      zoo: "Blob 動物園",
      zooBody: "同一個 handle 永遠生成同一隻 Blob。呢啲係社群身份，唔係真人頭像。",
      case: "個案例",
      cases: "個案例",
      sourceOnly: "公開來源作者",
    };
  }
  if (locale === "zh-cn") {
    return {
      title: "UseGrokBot 社区",
      body: "看看谁在分享真实 Grok Bot 案例，以及哪些开源 Contributor 正在帮助 UseGrokBot 成长。每个公开 handle 都有一只固定 Blob 身份。",
      submit: "加入你的 Grok Bot",
      builders: "Community Builders",
      buildersBody: "帮助改善 UseGrokBot 的开源 Contributor。",
      github: "在 GitHub 查看",
      contributions: "次 contributions",
      buildersFallback: "Contributor 数据暂时未载入，但 GitHub repo 仍然可以正常浏览。",
      zoo: "Blob 动物园",
      zooBody: "同一个 handle 永远生成同一只 Blob。这些是社区身份，不是真人头像。",
      case: "个案例",
      cases: "个案例",
      sourceOnly: "公开来源作者",
    };
  }
  return {
    title: "UseGrokBot Community",
    body: "Meet the people behind real Grok Bot examples — plus the open-source builders improving UseGrokBot. Every public handle also gets one stable community Blob.",
    submit: "Add your Grok Bot",
    builders: "Community Builders",
    buildersBody: "Open-source contributors helping the project grow.",
    github: "View on GitHub",
    contributions: "contributions",
    buildersFallback: "Contributor data is temporarily unavailable, but the GitHub repository is still public.",
    zoo: "The Blob Zoo",
    zooBody: "The same handle always generates the same Blob. These are community identities, not replacements for real author photos.",
    case: "case",
    cases: "cases",
    sourceOnly: "public source author",
  };
}
