"use client";

import { useMemo, useState } from "react";
import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { DiscoverCard } from "@/components/DiscoverCard";
import { LocaleLink } from "@/components/LocaleLink";
import { NamedIcon } from "@/components/icons";
import { appsBySlug, popularIntegrationSlugs } from "@/data/apps";
import {
  discoverCategorySlugs,
  discoverTabs,
  filterDiscoverStories,
  outcomeSlugs,
  type DiscoverCategorySlug,
  type DiscoverTab,
  type OutcomeSlug,
} from "@/data/discover";
import type { AppSlug } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

const mobileTabs: DiscoverTab[] = ["trending", "latest", "official"];

const categoryKeys: Record<DiscoverCategorySlug, string> = {
  sales: "discover.catSales",
  marketing: "discover.catMarketing",
  research: "discover.catResearch",
  content: "discover.catContent",
  coding: "discover.catCoding",
  operations: "discover.catOperations",
  personal: "discover.catPersonal",
};

const outcomeKeys: Record<OutcomeSlug, string> = {
  "make-money": "discover.outcomeMakeMoney",
  "grow-business": "discover.outcomeGrowBusiness",
  "save-time": "discover.outcomeSaveTime",
  research: "discover.outcomeResearch",
  "create-content": "discover.outcomeCreateContent",
  "automate-work": "discover.outcomeAutomateWork",
  "build-software": "discover.outcomeBuildSoftware",
};

const tabKeys: Record<DiscoverTab, string> = {
  trending: "discover.tabTrending",
  latest: "discover.tabLatest",
  featured: "discover.tabFeatured",
  official: "discover.tabOfficial",
  tested: "discover.tabTested",
  community: "discover.tabCommunity",
};

const tabIcons: Record<DiscoverTab, string> = {
  trending: "🔥",
  latest: "🆕",
  featured: "⭐",
  official: "✅",
  tested: "🧪",
  community: "👥",
};

const PAGE_SIZE = 12;

export type DiscoverFilterState = {
  tab: DiscoverTab;
  setTab: (tab: DiscoverTab) => void;
  category: DiscoverCategorySlug | "all";
  setCategory: (category: DiscoverCategorySlug | "all") => void;
  outcome: OutcomeSlug | "all";
  setOutcome: (outcome: OutcomeSlug | "all") => void;
  app: AppSlug | "all";
  setApp: (app: AppSlug | "all") => void;
};

export function useDiscoverFilterState(initialTab: DiscoverTab = "trending"): DiscoverFilterState {
  const [tab, setTab] = useState<DiscoverTab>(initialTab);
  const [category, setCategory] = useState<DiscoverCategorySlug | "all">("all");
  const [outcome, setOutcome] = useState<OutcomeSlug | "all">("all");
  const [app, setApp] = useState<AppSlug | "all">("all");
  return { tab, setTab, category, setCategory, outcome, setOutcome, app, setApp };
}

export function DiscoverFilters({
  tab,
  setTab,
  category,
  setCategory,
  outcome,
  setOutcome,
  app,
  setApp,
  showOutcomes = true,
}: DiscoverFilterState & { showOutcomes?: boolean }) {
  const { t } = useI18n();
  const [moreOpen, setMoreOpen] = useState(false);
  const extraActive =
    tab === "community" ||
    tab === "tested" ||
    tab === "featured" ||
    category !== "all" ||
    outcome !== "all" ||
    app !== "all";
  const showMore = moreOpen || extraActive;

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1 [mask-image:linear-gradient(90deg,#000_92%,transparent)]">
        {discoverTabs.map((item) => (
          <TabChip
            key={item}
            className={!mobileTabs.includes(item) ? "hidden md:inline-flex" : undefined}
            active={tab === item}
            label={`${tabIcons[item]} ${t(tabKeys[item])}`}
            onClick={() => setTab(item)}
          />
        ))}
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
      </div>
      {tab === "trending" ? (
        <p className="mt-2 text-[12px] text-faint">{t("discover.tabTrendingHint")}</p>
      ) : null}
      {tab === "tested" ? (
        <p className="mt-2 text-[12px] text-faint">{t("discover.tabTestedHint")}</p>
      ) : null}
      {tab === "featured" ? (
        <p className="mt-2 text-[12px] text-faint">{t("discover.tabFeaturedHint")}</p>
      ) : null}

      <div className="mt-4 hidden gap-2 overflow-x-auto pb-1 md:flex">
        <Chip active={category === "all"} onClick={() => setCategory("all")} label={t("discover.catAll")} />
        {discoverCategorySlugs.map((item) => (
          <Chip
            key={item}
            active={category === item}
            onClick={() => setCategory(item)}
            label={t(categoryKeys[item])}
          />
        ))}
      </div>

      <div className="mt-3 hidden gap-2 overflow-x-auto pb-1 md:flex">
        <Chip active={app === "all"} onClick={() => setApp("all")} label={t("discover.catAll")} />
        {popularIntegrationSlugs.map((item) => (
          <IntegrationChip key={item} slug={item} active={app === item} onClick={() => setApp(item)} />
        ))}
        <LocaleLink
          href="/integrations"
          className="inline-flex h-8 shrink-0 items-center rounded-full border border-line px-3 text-[13px] text-mute hover:border-line-strong hover:text-ink"
        >
          {t("discover.moreIntegrations")}
        </LocaleLink>
      </div>

      <div className={cn("mt-3", showMore ? "block" : "hidden", showOutcomes ? "md:block" : "md:hidden")}>
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          <p className="sr-only">{t("discover.byTrust")}</p>
          <TabChip
            active={tab === "featured"}
            label={`${tabIcons.featured} ${t(tabKeys.featured)}`}
            onClick={() => setTab("featured")}
          />
          <TabChip
            active={tab === "community"}
            label={`${tabIcons.community} ${t(tabKeys.community)}`}
            onClick={() => setTab("community")}
          />
          <TabChip
            active={tab === "tested"}
            label={`${tabIcons.tested} ${t(tabKeys.tested)}`}
            onClick={() => setTab("tested")}
          />
          <Chip active={category === "all"} onClick={() => setCategory("all")} label={t("discover.catAll")} />
          {discoverCategorySlugs.map((item) => (
            <Chip
              key={item}
              active={category === item}
              onClick={() => setCategory(item)}
              label={t(categoryKeys[item])}
            />
          ))}
        </div>
        <p className="mb-2 text-[12px] text-faint md:hidden">{t("discover.integrations")}</p>
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          <Chip active={app === "all"} onClick={() => setApp("all")} label={t("discover.catAll")} />
          {popularIntegrationSlugs.map((item) => (
            <IntegrationChip key={item} slug={item} active={app === item} onClick={() => setApp(item)} />
          ))}
        </div>
        {showOutcomes ? (
          <>
            <p className="text-[12px] text-faint">{t("discover.byOutcome")}</p>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
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
          </>
        ) : null}
      </div>
    </div>
  );
}

export function DiscoverFeed({
  query = "",
  initialTab = "trending",
  showIntro = false,
  hideFilters = false,
  showOutcomes = true,
  filterState,
}: {
  query?: string;
  initialTab?: DiscoverTab;
  showIntro?: boolean;
  hideFilters?: boolean;
  showOutcomes?: boolean;
  filterState?: DiscoverFilterState;
}) {
  const { t } = useI18n();
  const internal = useDiscoverFilterState(initialTab);
  const filters = filterState ?? internal;
  const { tab, category, outcome, app } = filters;
  const resetKey = `${query}\0${tab}\0${category}\0${outcome}\0${app}`;
  const [page, setPage] = useState({ key: resetKey, count: PAGE_SIZE });
  const visible = page.key === resetKey ? page.count : PAGE_SIZE;

  const stories = useMemo(
    () => filterDiscoverStories({ query, tab, category, outcome, app }),
    [query, tab, category, outcome, app],
  );

  const shown = stories.slice(0, visible);

  return (
    <div>
      {showIntro ? (
        <div className="mb-6">
          <h2 className="text-[24px] font-medium tracking-tight text-ink md:text-[28px]">
            {t("discover.feedTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-mute">{t("discover.feedBody")}</p>
        </div>
      ) : null}

      {hideFilters ? null : <DiscoverFilters {...filters} showOutcomes={showOutcomes} />}

      <p className="mt-6 text-[13px] text-faint">{t("discover.count", { n: stories.length })}</p>
      {tab === "community" ? (
        <p className="mt-1 text-[12px] text-faint">{t("discover.communityNote")}</p>
      ) : null}

      {stories.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-elevated px-5 py-10 text-center">
          <BlobatarAvatar
            name={`empty:${query || tab}:${category}:${outcome}:${app}`}
            size={72}
            expression="thinking"
            className="mx-auto mb-4"
          />
          <p className="text-sm text-ink">
            {tab === "tested" ? t("discover.testedEmpty") : t("discover.empty")}
          </p>
          <p className="mt-2 text-[13px] text-mute">
            {tab === "tested" ? t("discover.testedEmptyHint") : t("discover.emptyHint")}
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

function IntegrationChip({
  slug,
  active,
  onClick,
}: {
  slug: AppSlug;
  active: boolean;
  onClick: () => void;
}) {
  const app = appsBySlug[slug];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] transition md:h-8",
        active ? "border-accent text-ink" : "border-line text-mute hover:border-line-strong hover:text-ink",
      )}
    >
      <NamedIcon name={app.icon} className="size-3.5" />
      {app.name}
    </button>
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
        "inline-flex h-11 shrink-0 items-center rounded-full border px-3 text-[13px] transition md:h-8",
        active ? "border-accent text-ink" : "border-line text-mute hover:border-line-strong hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
