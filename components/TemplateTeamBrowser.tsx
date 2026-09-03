"use client";

import { useState } from "react";
import { TemplateList } from "@/components/TemplateList";
import type { BotTemplate } from "@/data/templates";
import {
  interpolateTemplateHubCopy,
  templateHubUiCopy,
  type TemplateTeamMode,
} from "@/data/template-types";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/types";

export function TemplateTeamBrowser({
  builders,
  orchestrators,
  locale,
}: {
  builders: readonly BotTemplate[];
  orchestrators: readonly BotTemplate[];
  locale: Locale;
}) {
  const copy = templateHubUiCopy[locale];
  const [mode, setMode] = useState<TemplateTeamMode>("builder");
  const items = mode === "builder" ? builders : orchestrators;
  const resultCount = interpolateTemplateHubCopy(copy.categoryCount, { n: items.length });
  const resultTitle = mode === "builder" ? copy.builderListTitle : copy.orchestratorListTitle;

  return (
    <>
      <section className="py-10 md:py-12">
        <fieldset className="min-w-0">
          <legend className="mb-4 text-xl font-medium tracking-tight text-ink">
            {copy.categoryLabel}
          </legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CategoryRadio
              checked={mode === "builder"}
              value="builder"
              title={copy.builderTitle}
              body={copy.builderBody}
              count={builders.length}
              countLabel={copy.categoryCount}
              onChange={setMode}
            />
            <CategoryRadio
              checked={mode === "orchestrator"}
              value="orchestrator"
              title={copy.orchestratorTitle}
              body={copy.orchestratorBody}
              count={orchestrators.length}
              countLabel={copy.categoryCount}
              onChange={setMode}
            />
          </div>
        </fieldset>
      </section>

      <section id="team-template-results" aria-labelledby="team-template-list">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="team-template-list" className="text-2xl font-medium tracking-tight text-ink">
            {resultTitle}
          </h2>
          <p className="font-mono text-xs text-faint" aria-live="polite">
            {resultCount}
          </p>
        </div>
        <TemplateList items={items} variant="team" pager={false} heading="h3" />
      </section>
    </>
  );
}

function CategoryRadio({
  checked,
  value,
  title,
  body,
  count,
  countLabel,
  onChange,
}: {
  checked: boolean;
  value: TemplateTeamMode;
  title: string;
  body: string;
  count: number;
  countLabel: string;
  onChange: (mode: TemplateTeamMode) => void;
}) {
  return (
    <label className="block min-w-0 cursor-pointer">
      <input
        type="radio"
        name="team-template-mode"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        aria-controls="team-template-results"
        className="peer sr-only"
      />
      <span
        className={cn(
          "block min-h-[132px] rounded-2xl border p-5 text-left transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent md:p-6",
          checked
            ? "border-accent bg-accent-soft"
            : "border-line bg-elevated hover:border-line-strong",
        )}
      >
        <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="text-lg font-medium tracking-tight text-ink">{title}</span>
          <span className={cn("font-mono text-xs", checked ? "text-accent" : "text-faint")}>
            {interpolateTemplateHubCopy(countLabel, { n: count })}
          </span>
        </span>
        <span className="mt-2 block text-sm leading-6 text-mute">{body}</span>
      </span>
    </label>
  );
}
