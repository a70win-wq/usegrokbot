"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import type {
  VerifiedUseCaseCategorySlug,
  VerifiedUseCaseEvidence,
  VerifiedUseCaseStructure,
} from "@/data/verified-use-cases";
import { cn } from "@/lib/cn";
import { useI18n, verifiedUseCasesPageCopy } from "@/lib/i18n";

export type VerifiedUseCaseCard = {
  slug: string;
  rank: number;
  title: string;
  category: VerifiedUseCaseCategorySlug;
  evidence: VerifiedUseCaseEvidence;
  structure: VerifiedUseCaseStructure;
  authorName: string;
  handle?: string;
};

type FilterValue<T extends string> = "all" | T;

export function UseCasesView({
  items,
  reviewedPostCount,
}: {
  items: readonly VerifiedUseCaseCard[];
  reviewedPostCount: number;
}) {
  const { locale } = useI18n();
  const copy = verifiedUseCasesPageCopy(locale);
  const [category, setCategory] = useState<FilterValue<VerifiedUseCaseCategorySlug>>("all");
  const [evidence, setEvidence] = useState<FilterValue<VerifiedUseCaseEvidence>>("all");
  const [structure, setStructure] = useState<FilterValue<VerifiedUseCaseStructure>>("all");

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (category === "all" || item.category === category) &&
          (evidence === "all" || item.evidence === evidence) &&
          (structure === "all" || item.structure === structure),
      ),
    [category, evidence, items, structure],
  );

  return (
    <div data-use-cases-page className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-20">
      <header className="max-w-[760px]">
        <h1 className="text-[clamp(42px,7vw,72px)] leading-[0.96] font-medium tracking-[-0.05em] text-ink">
          {copy.title}
        </h1>
        <p className="mt-5 text-[16px] leading-7 text-mute">{copy.subtitle(reviewedPostCount)}</p>
      </header>

      <section className="mt-10 grid gap-5 border-y border-line py-5 lg:grid-cols-[minmax(14rem,1fr)_auto_auto] lg:items-end">
        <label className="grid gap-2 text-[13px] font-medium tracking-[0.06em] text-mute uppercase">
          {copy.categoryLabel}
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as FilterValue<VerifiedUseCaseCategorySlug>)}
            className="min-h-11 w-full rounded-xl border border-line bg-card px-3 text-[16px] font-normal tracking-normal text-ink normal-case focus:border-line-strong"
          >
            <option value="all">{copy.allCategories}</option>
            {copy.categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <FilterGroup
          label={copy.evidenceLabel}
          value={evidence}
          options={[
            { value: "all", label: copy.allEvidence },
            { value: "prompt", label: copy.promptIncluded },
            { value: "setup", label: copy.setupShared },
          ]}
          onChange={(value) => setEvidence(value as FilterValue<VerifiedUseCaseEvidence>)}
        />

        <FilterGroup
          label={copy.structureLabel}
          value={structure}
          options={[
            { value: "all", label: copy.allStructures },
            { value: "single", label: copy.singleBot },
            { value: "team", label: copy.botTeam },
          ]}
          onChange={(value) => setStructure(value as FilterValue<VerifiedUseCaseStructure>)}
        />
      </section>

      <section className="mt-10" aria-label={copy.resultsLabel}>
        <p aria-live="polite" className="font-mono text-[16px] font-medium tracking-[0.03em] text-mute">
          {copy.showing(filteredItems.length)}
        </p>

        {filteredItems.length > 0 ? (
          <ol className="mt-4 grid gap-x-10 md:grid-cols-2">
            {filteredItems.map((item) => (
              <li key={item.slug} className="border-t border-line">
                <LocaleLink
                  href={`/use-cases/${item.slug}`}
                  className="group grid min-h-40 grid-cols-[2rem_minmax(0,1fr)_auto] gap-3 py-6 focus-visible:outline-offset-4"
                >
                  <span className="pt-0.5 font-mono text-[16px] font-medium tracking-[0.04em] text-mute">
                    {String(item.rank).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[19px] leading-7 font-medium tracking-[-0.02em] text-ink group-hover:text-accent">
                      {item.title}
                    </span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      <Badge tone={item.evidence === "prompt" ? "accent" : "neutral"}>
                        {item.evidence === "prompt" ? copy.promptIncluded : copy.setupShared}
                      </Badge>
                      <Badge tone="neutral">
                        {item.structure === "team" ? copy.botTeam : copy.singleBot}
                      </Badge>
                    </span>
                    <span className="mt-5 flex min-w-0 items-center gap-2.5">
                      <AuthorAvatar name={item.authorName} handle={item.handle} size={40} />
                      <span className="min-w-0">
                        <span className="block truncate text-[15px] font-medium text-ink">{item.authorName}</span>
                        {item.handle ? <span className="block truncate text-[13px] text-mute">@{item.handle}</span> : null}
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-4 text-faint transition-colors group-hover:text-accent"
                    strokeWidth={1.75}
                  />
                </LocaleLink>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-4 border-y border-line py-12 text-center">
            <p className="text-[15px] text-mute">{copy.empty}</p>
            <button
              type="button"
              data-clear-use-case-filters
              onClick={() => {
                setCategory("all");
                setEvidence("all");
                setStructure("all");
              }}
              className="mt-4 min-h-11 text-[15px] font-medium text-accent hover:text-ink"
            >
              {copy.clearFilters}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-[13px] font-medium tracking-[0.06em] text-mute uppercase">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              data-filter-value={option.value}
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-3.5 text-[15px] font-medium transition-colors",
                active
                  ? "border-ink bg-ink text-inverse"
                  : "border-line bg-card text-mute hover:border-line-strong hover:text-ink",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "accent" | "neutral" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium tracking-[0.04em]",
        tone === "accent" ? "bg-accent-soft text-accent" : "border border-line text-mute",
      )}
    >
      {children}
    </span>
  );
}
