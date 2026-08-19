"use client";

import { useMemo, useState } from "react";
import { DiscoverCard } from "@/components/DiscoverCard";
import {
  discoverCategorySlugs,
  filterDiscoverStories,
  outcomeSlugs,
  type DiscoverCategorySlug,
  type DiscoverTab,
  type OutcomeSlug,
} from "@/data/discover";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

const tabs: DiscoverTab[] = ["trending", "latest", "official", "community"];

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
  official: "discover.tabOfficial",
  community: "discover.tabCommunity",
};

export function DiscoverFeed({ query = "" }: { query?: string }) {
  const { t } = useI18n();
  const [tab, setTab] = useState<DiscoverTab>("trending");
  const [category, setCategory] = useState<DiscoverCategorySlug | "all">("all");
  const [outcome, setOutcome] = useState<OutcomeSlug | "all">("all");

  const stories = useMemo(
    () => filterDiscoverStories({ query, tab, category, outcome }),
    [query, tab, category, outcome],
  );

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1 [mask-image:linear-gradient(90deg,#000_92%,transparent)]">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            aria-pressed={tab === item}
            className={cn(
              "inline-flex h-9 shrink-0 items-center rounded-full border px-3.5 text-[13px] transition",
              tab === item
                ? "border-ink bg-ink text-inverse"
                : "border-line text-mute hover:border-line-strong hover:text-ink",
            )}
          >
            {item === "trending" ? "🔥 " : item === "latest" ? "🆕 " : item === "official" ? "✅ " : "🧪 "}
            {t(tabKeys[item])}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
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

      <div className="mt-3">
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
      </div>

      <p className="mt-6 text-[13px] text-faint">{t("discover.count", { n: stories.length })}</p>
      {tab === "community" ? (
        <p className="mt-1 text-[12px] text-faint">{t("discover.communityNote")}</p>
      ) : null}

      {stories.length === 0 ? (
        <div className="mt-8 rounded-[16px] border border-line bg-elevated px-5 py-10 text-center">
          <p className="text-sm text-ink">{t("discover.empty")}</p>
          <p className="mt-2 text-[13px] text-mute">{t("discover.emptyHint")}</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <DiscoverCard key={story.slug} story={story} />
          ))}
        </div>
      )}
    </div>
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
        active ? "border-ink text-ink" : "border-line text-mute hover:border-line-strong hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
