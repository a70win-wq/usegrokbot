"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import type { LearnArticle } from "@/data/learn";
import { LAST_REVIEWED, formatVerifiedDate } from "@/data/verification";
import { localizeLearnArticle, useI18n } from "@/lib/i18n";

export function LearnArticleView({ article }: { article: LearnArticle }) {
  const { locale, t, absoluteHref } = useI18n();
  const item = localizeLearnArticle(article, locale);

  return (
    <article className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          mainEntityOfPage: absoluteHref(`/learn/${article.slug}`),
        }}
      />
      <Breadcrumbs items={[{ href: "/learn", label: t("nav.learn") }, { label: item.title }]} />
      <p className="mt-6 text-[12px] font-medium tracking-wide text-faint uppercase">{item.kicker}</p>
      <h1 className="mt-2 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{item.title}</h1>
      <div className="mt-8 space-y-5">
        {item.blocks.map((block, index) => {
          if (block.type === "h2") {
            return (
              <h2 key={index} className="pt-4 text-xl font-medium text-ink">
                {block.text}
              </h2>
            );
          }
          if (block.type === "p") {
            return (
              <p key={index} className="text-[16px] leading-[1.7] text-mute">
                {block.text}
              </p>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={index} className="list-disc space-y-2 pl-5 text-[16px] leading-7 text-mute">
                {block.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            );
          }
          return (
            <ol key={index} className="list-decimal space-y-2 pl-5 text-[16px] leading-7 text-mute">
              {block.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          );
        })}
      </div>
      <footer className="mt-12 border-t border-line pt-6 text-[13px] leading-6 text-faint">
        <p>
          {t("trust.verified", {
            date: formatVerifiedDate(article.verifiedAt ?? LAST_REVIEWED, locale === "en" ? "en" : locale),
          })}
        </p>
        {article.sources?.length ? (
          <p className="mt-2">
            {t("trust.source")}{" "}
            {article.sources.map((source, index) => (
              <span key={source.url}>
                {index > 0 ? ", " : ""}
                <a href={source.url} className="text-accent" target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </span>
            ))}
          </p>
        ) : null}
      </footer>
    </article>
  );
}
