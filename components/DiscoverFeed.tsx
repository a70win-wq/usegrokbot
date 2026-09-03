"use client";

import { useMemo, useState } from "react";
import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { DiscoverCard } from "@/components/DiscoverCard";
import {
  discoverTabs,
  filterDiscoverStories,
  outcomeSlugs,
  type DiscoverTab,
  type OutcomeSlug,
} from "@/data/discover";
import { topicMessageKey, topicSlugs, type TopicSlug } from "@/data/topics";
import type { AppSlug } from "@/data/types";
import { cn } from "@/lib/cn";
import { localizeDiscoverStory, useI18n } from "@/lib/i18n";
import { learnFeedStories } from "@/lib/x-metrics";

const mobileTabs: DiscoverTab[] = ["latest", "featured", "learn"];

const outcomeKeys: Record<OutcomeSlug, string> = {
  "make-money": "discover.outcomeMakeMoney",
  "grow-business": "discover.outcomeGrowBusiness",
  "save-time": "discover.outcomeSaveTime",
  research: "discover.outcomeResearch",
  "create-content": "discover.outcomeCreateContent",
  "automate-work": "discover.outcomeAutomateWork",
  "build-software": "discover.outcomeBuildSoftware",
};

const tabKeys: Record<(typeof discoverTabs)[number], string> = {
  latest: "discover.tabLatest",
  featured: "discover.tabFeatured",
  learn: "discover.tabLearn",
};

const tabIcons: Record<(typeof discoverTabs)[number], string> = {
  latest: "🆕",
  featured: "♥",
  learn: "📘",
};

const PAGE_SIZE = 12;

export type DiscoverFilterState = {
  tab: DiscoverTab;
  setTab: (tab: DiscoverTab) => void;
  category: TopicSlug | "all";
  setCategory: (category: TopicSlug | "all") => void;
  outcome: OutcomeSlug | "all";
  setOutcome: (outcome: OutcomeSlug | "all") => void;
};

export function useDiscoverFilterState(initialTab: DiscoverTab = "latest"): DiscoverFilterState {
  const [tab, setTab] = useState<DiscoverTab>(initialTab);
  const [category, setCategory] = useState<TopicSlug | "all">("all");
  const [outcome, setOutcome] = useState<OutcomeSlug | "all">("all");
  return { tab, setTab, category, setCategory, outcome, setOutcome };
}

export function DiscoverFilters({
  tab,
  setTab,
  category,
  setCategory,
  outcome,
  setOutcome,
  showOutcomes = true,
}: DiscoverFilterState & { showOutcomes?: boolean }) {
  const { t } = useI18n();
  const [moreOpen, setMoreOpen] = useState(false);
  const extraActive = category !== "all" || outcome !== "all";
  const showMore = moreOpen || extraActive;

  return (
    <div>
      <div className="flex flex-wrap gap-2 pb-1">
        {discoverTabs.map((item) => (
          <TabChip
            key={item}
            className={!mobileTabs.includes(item) ? "hidden md:inline-flex" : undefined}
            active={tab === item}
            label={`${tabIcons[item]} ${t(tabKeys[item])}`}
            onClick={() => setTab(item)}
          />
        ))}
        {showOutcomes ? (
          <button
            type="button"
            onClick={() => setMoreOpen((value) => !value)}
            aria-expanded={showMore}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full border px-3.5 text-[13px] transition md:hidden",
              showMore || extraActive
                ? "border-accent text-ink"
                : "border-line text-mute hover:border-line-strong hover:text-ink",
            )}
          >
            {t("discover.filters")}
          </button>
        ) : null}
      </div>
      {tab === "latest" ? (
        <p className="mt-2 text-[12px] text-faint">{t("discover.tabLatestHint")}</p>
      ) : null}
      {tab === "featured" ? (
        <p className="mt-2 text-[12px] text-faint">{t("discover.tabFeaturedHint")}</p>
      ) : null}
      {tab === "learn" ? (
        <p className="mt-2 text-[12px] text-faint">{t("discover.tabLearnHint")}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip active={category === "all"} onClick={() => setCategory("all")} label={t("discover.catAll")} />
        {topicSlugs.map((item) => (
          <Chip
            key={item}
            active={category === item}
            onClick={() => setCategory(item)}
            label={t(topicMessageKey(item))}
          />
        ))}
      </div>

      {showOutcomes ? (
        <div className={cn("mt-3", showMore ? "block" : "hidden md:block")}>
          <p className="text-[12px] text-faint">{t("discover.byOutcome")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip active={outcome === "all"} onClick={() => setOutcome("all")} label={t("discover.catAll")} />
            {outcomeSlugs.map((item) => (
              <Chip
                key={item}
                active={outcome === item}
                onClick={() => setOutcome(item)}
                label={t(outcomeKeys[item])}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function DiscoverFeed({
  query = "",
  initialTab = "latest",
  showIntro = false,
  hideFilters = false,
  showOutcomes = true,
  filterState,
  categoryFilter,
  appFilter = "all",
}: {
  query?: string;
  initialTab?: DiscoverTab;
  showIntro?: boolean;
  hideFilters?: boolean;
  showOutcomes?: boolean;
  filterState?: DiscoverFilterState;
  categoryFilter?: TopicSlug | "all";
  appFilter?: AppSlug | "all";
}) {
  const { locale, t } = useI18n();
  const internal = useDiscoverFilterState(initialTab);
  const filters = filterState ?? internal;
  const { tab, category: selectedCategory, outcome } = filters;
  const category = categoryFilter ?? selectedCategory;
  const resetKey = `${query}\0${tab}\0${category}\0${outcome}\0${appFilter}`;
  const [page, setPage] = useState({ key: resetKey, count: PAGE_SIZE });
  const visible = page.key === resetKey ? page.count : PAGE_SIZE;

  const stories = useMemo(() => {
    const searchOptions = {
      locale,
      localize: (story: Parameters<typeof localizeDiscoverStory>[0]) => localizeDiscoverStory(story, locale),
    };
    if (tab === "learn") {
      const ranked = learnFeedStories(5);
      const allowed = new Set(
        filterDiscoverStories(
          { query, tab: "latest", category, outcome, app: appFilter },
          searchOptions,
        ).map((item) => item.slug),
      );
      return ranked.filter((item) => allowed.has(item.slug));
    }
    return filterDiscoverStories(
      { query, tab, category, outcome, app: appFilter },
      searchOptions,
    );
  }, [query, tab, category, outcome, appFilter, locale]);

  const shown = stories.slice(0, visible);

  return (
    <div>
      {showIntro ? (
        <div className="mb-6">
          <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">
            {t(
              tab === "featured"
                ? "discover.feedTitleFeatured"
                : tab === "learn"
                  ? "discover.feedTitleLearn"
                  : "discover.feedTitle",
            )}
          </h2>
        </div>
      ) : null}

      {hideFilters ? null : <DiscoverFilters {...filters} showOutcomes={showOutcomes} />}

      {showIntro ? null : (
        <p className="mt-6 text-[13px] text-faint">{t("discover.count", { n: stories.length })}</p>
      )}

      {stories.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-elevated px-5 py-10 text-center">
          <BlobatarAvatar
            name={`empty:${query || tab}:${category}:${outcome}:${appFilter}`}
            size={72}
            expression="thinking"
            className="mx-auto mb-4"
          />
          <p className="text-sm text-ink">
            {t(tab === "featured" ? "discover.emptyElonLiked" : "discover.empty")}
          </p>
          <p className="mt-2 text-[13px] text-mute">
            {t(tab === "featured" ? "discover.emptyElonLikedHint" : "discover.emptyHint")}
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((story) => (
              <DiscoverCard key={story.slug} story={story} />
            ))}
          </div>
          {visible < stories.length ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setPage({ key: resetKey, count: visible + PAGE_SIZE })}
                className="inline-flex h-11 items-center rounded-[10px] border border-line px-5 text-sm text-ink hover:border-line-strong"
              >
                {t("discover.loadMore")}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function TabChip({
  active,
  label,
  onClick,
  className,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-11 shrink-0 items-center rounded-full border px-3.5 text-[13px] transition md:h-9",
        active
          ? "border-accent bg-accent text-white"
          : "border-line text-mute hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      {label}
    </button>
  );
}

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 shrink-0 items-center rounded-full border px-3 text-[13px] transition",
        active ? "border-accent text-ink" : "border-line text-mute hover:border-line-strong hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
