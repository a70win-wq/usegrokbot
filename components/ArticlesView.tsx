"use client";

import { AuthorAvatar } from "@/components/AuthorAvatar";
import { articleStoriesByViews, formatViewCount } from "@/lib/x-metrics";
import { formatCardDate } from "@/lib/format";
import { localizeDiscoverStory, useI18n } from "@/lib/i18n";

export function ArticlesView() {
  const { locale, t } = useI18n();
  const articles = articleStoriesByViews();

  return (
    <div className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.articlesTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("pages.articlesBody")}</p>
      <p className="mt-3 text-[13px] text-faint">{t("count.articles", { n: articles.length })}</p>

      <ol className="mt-10 divide-y divide-line border-y border-line">
        {articles.map((item) => {
          const story = localizeDiscoverStory(item.story, locale);
          const href = item.story.xPostUrl ?? item.story.sourceUrl;
          return (
            <li key={item.story.slug}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 py-4 transition hover:bg-card-hover md:gap-5"
              >
                <AuthorAvatar name={story.authorName} handle={item.story.handle} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">
                    {story.authorName}
                    {item.story.handle ? (
                      <span className="ml-1 font-normal text-mute">@{item.story.handle}</span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-[15px] leading-snug text-ink">{story.title}</p>
                  <p className="mt-1 text-[12px] text-faint">{formatCardDate(item.story.publishedAt, locale)}</p>
                </div>
                <div className="shrink-0 pt-1 text-right">
                  <p className="text-[18px] font-medium tabular-nums tracking-tight text-ink">
                    {item.views > 0 ? formatViewCount(item.views, locale) : "—"}
                  </p>
                  <p className="mt-0.5 text-[11px] text-faint">{t("pages.rankingsViews")}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
