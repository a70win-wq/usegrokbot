"use client";

import { ArticleRow } from "@/components/ArticleRow";
import { useI18n } from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/types";
import type { RankedStory } from "@/lib/x-metrics";

const SECTION_COPY: Record<
  Locale,
  { chinese: string; english: string; latest: string }
> = {
  en: {
    chinese: "Chinese Tutorial Articles",
    english: "Top 20 English Articles",
    latest: "Latest 10 Articles",
  },
  "zh-Hant": {
    chinese: "中文教學文章排行",
    english: "英文文章排行",
    latest: "最新 10 篇文章",
  },
  "zh-Hans": {
    chinese: "中文教程文章排行",
    english: "英文文章排行",
    latest: "最新 10 篇文章",
  },
};

export function ArticlesView({
  chineseTutorials,
  english,
  latest,
}: {
  chineseTutorials: RankedStory[];
  english: RankedStory[];
  latest: RankedStory[];
}) {
  const { locale, t } = useI18n();
  const copy = SECTION_COPY[locale] ?? SECTION_COPY.en;
  const rankedSections =
    locale === "en"
      ? [
          { key: "english", title: copy.english, items: english },
          { key: "chinese", title: copy.chinese, items: chineseTutorials },
        ]
      : [
          { key: "chinese", title: copy.chinese, items: chineseTutorials },
          { key: "english", title: copy.english, items: english },
        ];

  return (
    <div className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.articlesTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("pages.articlesBody")}</p>

      {rankedSections.map((section, sectionIndex) => (
        <section className={sectionIndex === 0 ? "mt-12" : "mt-14"} key={section.key}>
          <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">
            {section.title}
          </h2>
          <p className="mt-2 text-[13px] text-faint">
            {t("count.articles", { n: section.items.length })}
          </p>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {section.items.map((item, index) => (
              <ArticleRow
                key={`${section.key}-${item.story.slug}`}
                item={item}
                locale={locale}
                viewsLabel={t("pages.rankingsViews")}
                rank={index + 1}
              />
            ))}
          </ol>
        </section>
      ))}

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
