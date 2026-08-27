"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import {
  defaultDirFor,
  defaultStorySort,
  flipDir,
  sortDirKey,
  type SortDir,
  type SortField,
  type StorySort,
} from "@/lib/sort-stories";

const fields: SortField[] = ["views", "date"];

export function StorySortMenu({
  value = defaultStorySort,
  onChange,
}: {
  value?: StorySort;
  onChange: (next: StorySort) => void;
}) {
  const { t } = useI18n();
  const [dirs, setDirs] = useState<Record<SortField, SortDir>>({
    views: defaultDirFor("views"),
    date: defaultDirFor("date"),
  });

  function dirFor(field: SortField): SortDir {
    return value.field === field ? value.dir : dirs[field];
  }

  function selectField(field: SortField) {
    onChange({ field, dir: dirFor(field) });
  }

  function toggleDir(field: SortField) {
    const dir = flipDir(dirFor(field));
    setDirs((prev) => ({ ...prev, [field]: dir }));
    onChange({ field, dir });
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2" role="group" aria-label={t("sort.label")}>
      {fields.map((field) => {
        const active = value.field === field;
        const dir = dirFor(field);
        const fieldKey = field === "views" ? "sort.byViews" : "sort.byDate";
        const dirLabel = t(sortDirKey(field, dir));
        return (
          <div key={field} className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              aria-pressed={active}
              onClick={() => selectField(field)}
              className={cn(
                "spring-press inline-flex h-9 items-center rounded-[10px] border px-3 text-[13px] transition",
                active
                  ? "border-ink bg-ink text-inverse"
                  : "border-line text-mute hover:border-line-strong hover:text-ink",
              )}
            >
              {t(fieldKey)}
            </button>
            <button
              type="button"
              onClick={() => toggleDir(field)}
              aria-label={`${t(fieldKey)} · ${dirLabel}`}
              title={dirLabel}
              className={cn(
                "spring-press inline-flex h-9 items-center gap-1.5 rounded-[10px] border px-2.5 text-[12px] transition",
                active
                  ? "border-line-strong bg-elevated text-ink"
                  : "border-line text-mute hover:border-line-strong hover:text-ink",
              )}
            >
              <span className="flex flex-col leading-none" aria-hidden>
                <ChevronUp
                  className={cn("size-3", dir === "asc" ? "text-current" : "opacity-25")}
                  strokeWidth={2.25}
                />
                <ChevronDown
                  className={cn("-mt-0.5 size-3", dir === "desc" ? "text-current" : "opacity-25")}
                  strokeWidth={2.25}
                />
              </span>
              <span>{dirLabel}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
