import { AuthorAvatar } from "@/components/AuthorAvatar";
import { articleExternalUrl } from "@/lib/articles";
import { formatCardDate, formatStoryDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { localizeDiscoverStory } from "@/lib/i18n/discover";
import type { Locale } from "@/lib/i18n/types";
import { formatViewCount, type RankedStory } from "@/lib/x-metrics";

export function ArticleRow({
  item,
  locale,
  viewsLabel,
  rank,
  badge,
  compact = false,
  presentation = "default",
}: {
  item: RankedStory;
  locale: Locale;
  viewsLabel: string;
  rank?: number;
  badge?: string;
  compact?: boolean;
  presentation?: "default" | "homepage";
}) {
  const story = localizeDiscoverStory(item.story, locale);
  const href = articleExternalUrl(item.story);
  const showHandle = item.story.handle && (
    !compact || story.authorName.replace(/^@/, "").toLowerCase() !== item.story.handle.toLowerCase()
  );
  const lead = badge ? (
    <span className="ui-label inline-flex shrink-0 items-center rounded-full bg-accent-soft px-2.5 py-1 text-accent">
      {badge}
    </span>
  ) : rank != null ? (
    <span className="ui-count w-6 shrink-0 pt-1 text-right font-medium text-mute sm:w-8">
      {rank}
    </span>
  ) : null;
  const hasLead = lead != null;

  if (presentation === "homepage") {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-3 py-4 transition-colors hover:bg-card-hover sm:gap-4 md:gap-5"
        >
          {lead}
          <AuthorAvatar name={story.authorName} handle={item.story.handle} size={40} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] leading-normal font-medium text-ink">
              {story.authorName}
              {item.story.handle ? (
                <span className="ml-1 font-normal text-mute">@{item.story.handle}</span>
              ) : null}
            </p>
            <p className="mt-1 text-[15px] leading-snug text-ink wrap-anywhere">{story.title}</p>
            <time dateTime={item.story.publishedAt} className="mt-1 block text-[12px] leading-normal text-mute">
              {formatCardDate(item.story.publishedAt, locale)}
            </time>
          </div>
          <div className="shrink-0 pt-1 text-right">
            <p className="text-[18px] leading-normal font-medium tracking-tight text-ink tabular-nums">
              {item.views > 0 ? formatViewCount(item.views, locale) : "—"}
            </p>
            <p className="mt-0.5 text-[12px] leading-normal text-mute">{viewsLabel}</p>
          </div>
        </a>
      </li>
    );
  }

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "grid items-start gap-x-3 gap-y-2 transition-colors hover:bg-card-hover sm:flex sm:gap-4 md:gap-5",
          badge
            ? "grid-cols-[auto_minmax(0,1fr)]"
            : "grid-cols-[1.5rem_minmax(0,1fr)]",
          compact ? "py-3" : "py-5",
        )}
      >
        {lead ? <span className="col-start-1 row-start-1">{lead}</span> : null}
        <span className="hidden shrink-0 sm:block">
          <AuthorAvatar name={story.authorName} handle={item.story.handle} size={40} />
        </span>
        <div className={cn("row-start-1 min-w-0 flex-1", hasLead ? "col-start-2" : "col-span-2")}>
          <p className="ui-card-title text-ink">{story.title}</p>
          <div className={cn(compact && "mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5")}>
            <p className={cn("ui-meta min-w-0 wrap-anywhere text-mute", !compact && "mt-2")}>
              {story.authorName}
              {showHandle ? (
                <span className="ml-1 font-normal text-mute">@{item.story.handle}</span>
              ) : null}
            </p>
            <time dateTime={item.story.publishedAt} className={cn("ui-meta block text-mute", !compact && "mt-2")}>
              {compact
                ? formatStoryDate(item.story.publishedAt, locale)
                : formatCardDate(item.story.publishedAt, locale)}
            </time>
          </div>
        </div>
        <div className={cn("row-start-2 flex shrink-0 items-baseline gap-1.5 sm:block sm:pt-1 sm:text-right", hasLead ? "col-start-2" : "col-span-2")}>
          <p className="ui-count font-medium text-ink">
            {item.views > 0 ? formatViewCount(item.views, locale) : "—"}
          </p>
          <p className="ui-meta text-mute sm:mt-0.5">{viewsLabel}</p>
        </div>
      </a>
    </li>
  );
}
