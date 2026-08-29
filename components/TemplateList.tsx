"use client";

import { useLayoutEffect, useState } from "react";
import { ExpandablePost } from "@/components/ExpandablePost";
import {
  catalogEntry,
  getTemplateStory,
  rankLabel,
  templates,
  templateCopy,
  type BotTemplate,
} from "@/data/templates";
import { cn } from "@/lib/cn";
import { localizeDiscoverStory, localizeTemplateCopy, useI18n } from "@/lib/i18n";
import { useTapFeedback } from "@/lib/tap-feedback";
import { formatViewCount, metricForPostUrl, metricForStory } from "@/lib/x-metrics";

const MORE_STEP = 12;

function firstScreenCount() {
  if (typeof window === "undefined") return 12;
  if (window.matchMedia("(min-width: 1280px)").matches) return 12;
  if (window.matchMedia("(min-width: 1024px)").matches) return 9;
  if (window.matchMedia("(min-width: 768px)").matches) return 6;
  return 12;
}

export function TemplateList({
  items = templates,
  pager = true,
  heading: Heading = "h2",
}: {
  items?: readonly BotTemplate[];
  pager?: boolean;
  heading?: "h2" | "h3";
}) {
  const { locale, t } = useI18n();
  const [visible, setVisible] = useState(pager ? 12 : items.length);

  useLayoutEffect(() => {
    if (!pager) {
      setVisible(items.length);
      return;
    }
    setVisible((current) => Math.min(Math.max(current, firstScreenCount()), items.length));
  }, [items.length, pager]);

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <>
    <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5">
      {shown.map((item) => {
        const story = getTemplateStory(item);
        const localized = story ? localizeDiscoverStory(story, locale) : undefined;
        const english = templateCopy(item, localized ?? { title: item.authorName, headline: "", body: "" });
        const catalog = catalogEntry(item.id);
        const copy = localizeTemplateCopy(item.id, locale, {
          title: english.title,
          oneLiner: english.oneLiner,
          body: catalog?.body,
        });
        const views =
          (story ? metricForStory(story)?.views ?? 0 : 0) ||
          (metricForPostUrl(item.xPostUrl)?.views ?? 0);
        const postText = (
          locale === "en"
            ? localized?.body || catalog?.body || copy.oneLiner
            : copy.body || localized?.body || copy.oneLiner
        ).trim();
        const xPostUrl = item.xPostUrl ?? story?.xPostUrl ?? story?.sourceUrl;

        return (
          <li key={item.id}>
            <article className="spring-lift flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[20px] tabular-nums tracking-tight text-faint">
                    {rankLabel(item.rank)}
                  </span>
                  {xPostUrl ? <XPostButton href={xPostUrl} label={t("discover.viewOriginalX")} /> : null}
                </div>
                <p className="shrink-0 text-right">
                  <span className="text-[18px] font-medium tabular-nums tracking-tight text-ink">
                    {views > 0 ? formatViewCount(views, locale) : "—"}
                  </span>{" "}
                  <span className="text-[11px] text-faint">{t("pages.rankingsViews")}</span>
                </p>
              </div>

              <Heading className="mt-4 text-[18px] font-medium tracking-tight text-ink">{copy.title}</Heading>
              <ExpandablePost text={postText} lines={3} className="mt-1.5" />

              <div className="mt-auto pt-5">
                <a
                  href={item.templateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="accent-gradient spring-press inline-flex h-11 w-full items-center justify-center rounded-[10px] px-5 text-base font-medium"
                >
                  {t("templates.open")}
                </a>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
    {pager && hasMore ? (
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3" data-catalog-pager>
        <PagerButton
          onClick={() => setVisible((count) => Math.min(count + MORE_STEP, items.length))}
        >
          {t("templates.showMore")}
        </PagerButton>
        <PagerButton onClick={() => setVisible(items.length)}>
          {t("templates.showAll")}
        </PagerButton>
      </div>
    ) : null}
    </>
  );
}

function PagerButton({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  const tap = useTapFeedback();
  return (
    <button
      type="button"
      onClick={() => {
        tap.trigger();
        onClick();
      }}
      onAnimationEnd={tap.onAnimationEnd}
      className={cn(
        "spring-press inline-flex h-11 min-w-[8.5rem] items-center justify-center rounded-[10px] border border-line px-5 text-sm text-ink hover:border-line-strong",
        tap.className,
      )}
    >
      {children}
    </button>
  );
}

function XPostButton({ href, label }: { href: string; label: string }) {
  const tap = useTapFeedback();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      onClick={tap.trigger}
      onAnimationEnd={tap.onAnimationEnd}
      className={cn(
        "spring-press inline-flex size-8 items-center justify-center rounded-[10px] border border-line text-ink transition hover:border-line-strong hover:bg-accent-soft hover:text-accent",
        tap.className,
      )}
    >
      <XLogo />
    </a>
  );
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
