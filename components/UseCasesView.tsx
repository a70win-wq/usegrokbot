"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BotTeamList } from "@/components/BotTeamList";
import {
  botTeamCategories,
  botTeams,
  verifiedBotTeamPostCount,
  type BotTeamCategorySlug,
} from "@/data/bot-teams";
import { discoverStories } from "@/data/discover";
import { cn } from "@/lib/cn";
import { botTeamsPageCopy, localizeBotTeamCategory, useI18n } from "@/lib/i18n";

type TeamFilter = "all" | "featured" | BotTeamCategorySlug;

export function UseCasesView() {
  const { locale } = useI18n();
  const copy = botTeamsPageCopy(locale);
  const [filter, setFilter] = useState<TeamFilter>("all");
  const filteredTeams = filter === "all"
    ? botTeams
    : filter === "featured"
      ? botTeams.filter((team) => team.featured)
      : botTeams.filter((team) => team.category === filter);
  const selectedCategory = botTeamCategories.find((category) => category.slug === filter);
  const selectedCategoryCopy = selectedCategory
    ? localizeBotTeamCategory(selectedCategory, locale)
    : undefined;
  const filters: readonly { id: TeamFilter; label: string }[] = [
    { id: "featured", label: copy.featuredFilter },
    { id: "all", label: copy.allFilter },
    ...botTeamCategories.map((category) => ({
      id: category.slug,
      label: localizeBotTeamCategory(category, locale).title,
    })),
  ];

  return (
    <div data-bot-teams-page className="mx-auto max-w-[1080px] px-5 py-12 md:px-8 md:py-20">
      <section className="max-w-[800px]">
        <h1 className="text-[clamp(38px,7vw,68px)] leading-[0.98] font-medium tracking-[-0.045em] text-ink">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-[760px] font-mono text-[12px] leading-6 tracking-wide text-faint">
          {copy.count(
            botTeams.length,
            botTeamCategories.length,
            verifiedBotTeamPostCount,
            discoverStories.length,
          )}
        </p>
      </section>

      <section className="mt-9 border-y border-line py-5" aria-labelledby="bot-team-filters-title">
        <h2 id="bot-team-filters-title" className="sr-only">{copy.filterLabel}</h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label={copy.filterLabel}>
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "spring-press inline-flex min-h-11 items-center rounded-full border px-4 text-[13px] transition",
                  active
                    ? "border-ink bg-ink text-inverse"
                    : "border-line text-mute hover:border-line-strong hover:text-ink",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="bot-team-list-title" aria-live="polite">
        <h2
          id="bot-team-list-title"
          className={selectedCategoryCopy ? "text-[28px] font-medium tracking-[-0.025em] text-ink" : "sr-only"}
        >
          {selectedCategoryCopy?.title ?? copy.chooseTitle}
        </h2>

        <div className={selectedCategoryCopy ? "mt-7" : undefined}>
          <BotTeamList key={filter} items={filteredTeams} />
        </div>
      </section>

      <p className="mt-16 border-t border-line pt-7">
        <a
          href="https://docs.x.ai/grok-bot/bots"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-accent hover:text-ink"
        >
          {copy.guideLink}
          <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.75} />
        </a>
      </p>
    </div>
  );
}
