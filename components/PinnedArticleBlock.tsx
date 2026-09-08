import { ArticleRow } from "@/components/ArticleRow";
import type { Locale } from "@/lib/i18n/types";
import type { RankedStory } from "@/lib/x-metrics";

export function PinnedArticleBlock({
  item,
  locale,
  viewsLabel,
  label,
  presentation = "default",
  headingId,
}: {
  item: RankedStory;
  locale: Locale;
  viewsLabel: string;
  label: string;
  presentation?: "default" | "homepage";
  headingId?: string;
}) {
  return (
    <section
      data-pinned-article
      aria-labelledby={headingId}
      className={presentation === "homepage" ? "mt-3" : "mt-6"}
    >
      <h3
        id={headingId}
        className="ui-label inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-[15px] font-medium text-accent"
      >
        {label}
      </h3>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        <ArticleRow
          item={item}
          locale={locale}
          viewsLabel={viewsLabel}
          badge={label}
          presentation={presentation}
        />
      </ul>
    </section>
  );
}
