"use client";

import { ArticleRow } from "@/components/ArticleRow";
import { useI18n } from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/types";
import type { RankedStory } from "@/lib/x-metrics";

const SECTION_COPY: Record<Locale, { top: string; latest: string }> = {
  en: {
    top: "Top 20 Articles",
    latest: "Latest 10 Articles",
  },
  "zh-Hant": {
    top: "瀏覽量最高的 20 篇文章",
    latest: "最新 10 篇文章",
  },
  "zh-Hans": {
    top: "浏览量最高的 20 篇文章",
    latest: "最新 10 篇文章",
  },
};

export function ArticlesView({
  top,
  latest,
}: {
  top: RankedStory[];
  latest: RankedStory[];
}) {
  const { locale, t } = useI18n();
  const copy = SECTION_COPY[locale] ?? SECTION_COPY.en;

  return (
    <div className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.articlesTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("pages.articlesBody")}</p>

      <section className="mt-12">
        <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">{copy.top}</h2>
        <p className="mt-2 text-[13px] text-faint">{t("count.articles", { n: top.length })}</p>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {top.map((item, index) => (
            <ArticleRow
              key={`top-${item.story.slug}`}
              item={item}
              locale={locale}
              viewsLabel={t("pages.rankingsViews")}
              rank={index + 1}
            />
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">{copy.latest}</h2>
        <p className="mt-2 text-[13px] text-faint">{t("count.articles", { n: latest.length })}</p>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {latest.map((item) => (
            <ArticleRow
              key={`latest-${item.story.slug}`}
              item={item}
              locale={locale}
              viewsLabel={t("pages.rankingsViews")}
            />
          ))}
        </ol>
      </section>
    </div>
  );
}
