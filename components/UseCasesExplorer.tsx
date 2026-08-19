"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { apps } from "@/data/apps";
import { categories } from "@/data/categories";
import type { AppSlug, CategorySlug, Difficulty, Schedule, UseCase } from "@/data/types";
import { cn } from "@/lib/cn";
import { localizeCategory, localizeUseCase, useI18n } from "@/lib/i18n";
import { filterUseCases, type SortKey } from "@/lib/search";
import { SearchBar } from "./SearchBar";
import { UseCaseCard } from "./UseCaseCard";

const difficulties: Difficulty[] = ["easy", "medium", "advanced"];
const schedules: Schedule[] = ["one-time", "daily", "weekly", "always-on"];
const sortKeys: SortKey[] = ["popular", "newest", "az"];

type ExplorerProps = {
  items: UseCase[];
  initialQuery?: string;
  initialOfficial?: boolean;
  lockedCategory?: CategorySlug;
  lockedApp?: AppSlug;
};

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function UseCasesExplorer({
  items,
  initialQuery = "",
  initialOfficial = false,
  lockedCategory,
  lockedApp,
}: ExplorerProps) {
  const { locale, t, list } = useI18n();
  const suggestions = list("searchSuggestions");
  const [query, setQuery] = useState(initialQuery);
  const [officialOnly, setOfficialOnly] = useState(initialOfficial);
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>(
    lockedCategory ? [lockedCategory] : [],
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [selectedSchedules, setSelectedSchedules] = useState<Schedule[]>([]);
  const [selectedApps, setSelectedApps] = useState<AppSlug[]>(lockedApp ? [lockedApp] : []);
  const [sort, setSort] = useState<SortKey>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const localizedItems = useMemo(
    () => items.map((item) => localizeUseCase(item, locale)),
    [items, locale],
  );

  const results = useMemo(
    () =>
      filterUseCases(
        localizedItems,
        {
          query,
          categories: selectedCategories,
          difficulties: selectedDifficulties,
          schedules: selectedSchedules,
          apps: selectedApps,
          officialOnly,
          sort,
          locale,
        },
        items,
      ),
    [
      localizedItems,
      items,
      query,
      selectedApps,
      selectedCategories,
      selectedDifficulties,
      selectedSchedules,
      officialOnly,
      sort,
      locale,
    ],
  );

  const activeCount =
    selectedDifficulties.length +
    selectedSchedules.length +
    (lockedCategory ? 0 : selectedCategories.length) +
    (lockedApp ? 0 : selectedApps.length) +
    Number(officialOnly);

  function clear() {
    if (!lockedCategory) setSelectedCategories([]);
    if (!lockedApp) setSelectedApps([]);
    setSelectedDifficulties([]);
    setSelectedSchedules([]);
    setOfficialOnly(false);
  }

  const filters = (
    <div className="space-y-6">
      {!lockedCategory ? (
        <FilterGroup label={t("filters.category")}>
          {categories.map((category) => (
            <Chip
              key={category.slug}
              active={selectedCategories.includes(category.slug)}
              onClick={() => setSelectedCategories((current) => toggleValue(current, category.slug))}
            >
              {localizeCategory(category, locale).name}
            </Chip>
          ))}
        </FilterGroup>
      ) : null}
      <FilterGroup label={t("filters.difficulty")}>
        {difficulties.map((item) => (
          <Chip
            key={item}
            active={selectedDifficulties.includes(item)}
            onClick={() => setSelectedDifficulties((current) => toggleValue(current, item))}
          >
            {t(`difficulty.${item}`)}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label={t("filters.schedule")}>
        {schedules.map((item) => (
          <Chip
            key={item}
            active={selectedSchedules.includes(item)}
            onClick={() => setSelectedSchedules((current) => toggleValue(current, item))}
          >
            {t(`schedule.${item}`)}
          </Chip>
        ))}
      </FilterGroup>
      {!lockedApp ? (
        <FilterGroup label={t("filters.apps")}>
          {apps.map((app) => (
            <Chip
              key={app.slug}
              active={selectedApps.includes(app.slug)}
              onClick={() => setSelectedApps((current) => toggleValue(current, app.slug))}
            >
              {app.name}
            </Chip>
          ))}
        </FilterGroup>
      ) : null}
      {activeCount > 0 ? (
        <button type="button" onClick={clear} className="text-[13px] text-mute hover:text-ink">
          {t("filters.clear")}
        </button>
      ) : null}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="min-w-0 w-full xl:flex-1">
          <SearchBar variant="inline" initialQuery={query} onQueryChange={setQuery} />
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {sortKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={cn(
                "h-9 whitespace-nowrap rounded-full border px-3.5 text-[13px] transition",
                sort === key ? "border-accent bg-accent-soft text-accent" : "border-line text-mute hover:text-ink",
              )}
            >
              {t(`sort.${key}`)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOfficialOnly((value) => !value)}
            className={cn(
              "h-9 whitespace-nowrap rounded-full border px-3.5 text-[13px] transition",
              officialOnly ? "border-ok/40 bg-ok/10 text-ok" : "border-line text-mute hover:text-ink",
            )}
          >
            {t("trust.official")}
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-3 text-[13px] text-mute lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="size-3.5" />
            {t("filters.title")}
            {activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">{filters}</aside>
        <div>
          <p className="mb-4 text-[13px] text-faint">
            {results.length === 1
              ? t("count.useCaseOne", { n: results.length })
              : t("count.useCases", { n: results.length })}
          </p>
          {results.length === 0 ? (
            <div className="rounded-[16px] border border-line bg-card px-6 py-14 text-center">
              <p className="text-ink">{t("search.empty")}</p>
              <p className="mt-2 text-sm text-mute">{t("search.emptyHint")}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {suggestions.slice(0, 4).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="h-8 rounded-full border border-line px-3 text-[12px] text-mute hover:border-line-strong hover:text-ink"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((item) => (
                <UseCaseCard key={item.slug} useCase={item} highlightApp={lockedApp} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label={t("filters.close")}
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[20px] border border-line bg-elevated px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-ink">{t("filters.title")}</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label={t("filters.close")}>
                <X className="size-5 text-mute" />
              </button>
            </div>
            {filters}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="accent-gradient mt-6 h-12 w-full rounded-[12px] text-sm font-medium text-inverse"
            >
              {t("filters.showResults", { n: results.length })}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-medium tracking-wide text-faint uppercase">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-full border px-3 text-[12px] transition",
        active ? "border-accent bg-accent-soft text-accent" : "border-line text-mute hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
