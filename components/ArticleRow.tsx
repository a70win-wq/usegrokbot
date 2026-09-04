import { AuthorAvatar } from "@/components/AuthorAvatar";
import { articleExternalUrl } from "@/lib/articles";
import { formatCardDate } from "@/lib/format";
import { localizeDiscoverStory } from "@/lib/i18n/discover";
import type { Locale } from "@/lib/i18n/types";
import { formatViewCount, type RankedStory } from "@/lib/x-metrics";

export function ArticleRow({
  item,
  locale,
  viewsLabel,
  rank,
}: {
  item: RankedStory;
  locale: Locale;
  viewsLabel: string;
  rank?: number;
}) {
  const story = localizeDiscoverStory(item.story, locale);
  const href = articleExternalUrl(item.story);

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex items-start gap-4 py-4 transition hover:bg-card-hover md:gap-5"
      >
        {rank != null ? (
          <span className="w-8 shrink-0 pt-1 text-right text-[16px] font-medium tabular-nums text-faint">
            {rank}
          </span>
        ) : null}
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
          <p className="mt-0.5 text-[12px] text-faint">{viewsLabel}</p>
        </div>
      </a>
    </li>
  );
}
