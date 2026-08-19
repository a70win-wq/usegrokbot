"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { learnArticles } from "@/data/learn";
import { localizeLearnArticle, useI18n } from "@/lib/i18n";

export default function LearnIndexPage() {
  const { locale, t } = useI18n();

  return (
    <div className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{t("pages.learnTitle")}</h1>
      <p className="mt-3 text-base text-mute">{t("pages.learnBody")}</p>
      <div className="mt-10 space-y-4">
        {learnArticles.map((article) => {
          const item = localizeLearnArticle(article, locale);
          return (
            <LocaleLink
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="block rounded-[14px] border border-line bg-card p-5 transition hover:border-line-strong hover:bg-card-hover"
            >
              <div className="text-[12px] text-faint">{item.kicker}</div>
              <h2 className="mt-2 text-lg font-medium text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mute">{item.description}</p>
            </LocaleLink>
          );
        })}
      </div>
    </div>
  );
}
