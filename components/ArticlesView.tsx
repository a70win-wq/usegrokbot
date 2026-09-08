"use client";

import { ArticleRow } from "@/components/ArticleRow";
import { PinnedArticleBlock } from "@/components/PinnedArticleBlock";
import { splitChineseTeachingArticles } from "@/lib/articles";
import { useI18n } from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/types";
import type { RankedStory } from "@/lib/x-metrics";
import { readingUiCopy } from "@/lib/i18n/reading-ui";

const SECTION_COPY: Record<
  Locale,
  { chinese: string; english: string; japanese: string; latest: string }
> = {
  en: {
    chinese: "Chinese Tutorial Articles",
    english: "Top 20 English Articles",
    japanese: "Japanese Articles",
    latest: "Latest 10 Articles",
  },
  "zh-Hant": {
    chinese: "中文教學文章",
    english: "英文文章前 20 篇",
    japanese: "日文文章",
    latest: "最新 10 篇文章",
  },
  "zh-Hans": {
    chinese: "中文教程文章",
    english: "英文文章前 20 篇",
    japanese: "日文文章",
    latest: "最新 10 篇文章",
  },
  ja: {
    chinese: "中国語のチュートリアル記事",
    english: "英語記事の上位 20 件",
    japanese: "日本語記事",
    latest: "最新の 10 記事",
  },
};

export function ArticlesView({
  chineseTutorials,
  english,
  japanese,
  latest,
}: {
  chineseTutorials: RankedStory[];
  english: RankedStory[];
  japanese: RankedStory[];
  latest: RankedStory[];
}) {
  const { locale, t } = useI18n();
  const copy = SECTION_COPY[locale] ?? SECTION_COPY.en;
  const japaneseSection = { key: "japanese", title: copy.japanese, items: japanese };
  const englishSection = { key: "english", title: copy.english, items: english };
  const chineseSection = { key: "chinese", title: copy.chinese, items: chineseTutorials };
  const rankedSections =
    locale === "ja"
      ? [
          ...(japanese.length > 0 ? [japaneseSection] : []),
          englishSection,
          chineseSection,
        ]
      : locale === "en"
        ? [englishSection, chineseSection]
        : [chineseSection, englishSection];

  return (
    <div className="mx-auto max-w-[860px] px-5 py-8 md:px-8 md:py-12">
      <h1 className="ui-page-title">
        {t("pages.articlesTitle")}
      </h1>
      <p className="ui-page-intro mt-3">{t("pages.articlesBody")}</p>

      <nav aria-label={readingUiCopy[locale].articleSections} className="mt-6 flex flex-wrap gap-2">
        {[...rankedSections, { key: "latest", title: copy.latest }].map((section) => (
          <a key={section.key} href={`#articles-${section.key}`} className="ui-button-secondary">
            {section.title}
          </a>
        ))}
      </nav>

      {rankedSections.map((section, sectionIndex) => {
        const chinese =
          section.key === "chinese" ? splitChineseTeachingArticles(section.items) : null;
        const rankedItems = chinese?.ranked ?? section.items;
        const pinnedItem = chinese?.pinned;

        return (
          <section id={`articles-${section.key}`} className={sectionIndex === 0 ? "mt-8 md:mt-10" : "mt-12"} key={section.key}>
            <h2 className="ui-section-title">
              {section.title}
            </h2>
            <p className="ui-count mt-2 font-medium text-mute">
              {t("count.articles", { n: section.items.length })}
            </p>
            {pinnedItem ? (
              <PinnedArticleBlock
                item={pinnedItem}
                locale={locale}
                viewsLabel={t("pages.rankingsViews")}
                label={t("pages.articlesPinned")}
                headingId="articles-chinese-pinned"
              />
            ) : null}
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {rankedItems.map((item, index) => (
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
        );
      })}

      <section id="articles-latest" className="mt-12">
        <h2 className="ui-section-title">{copy.latest}</h2>
        <p className="ui-count mt-2 font-medium text-mute">{t("count.articles", { n: latest.length })}</p>
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
