"use client";

import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";
import { BotFace, teamBotColor } from "@/components/BotFace";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoverCard } from "@/components/DiscoverCard";
import { LocaleLink } from "@/components/LocaleLink";
import { PromptBox } from "@/components/PromptBox";
import { botTeams, type BotTeam } from "@/data/bot-teams";
import { getDiscoverStory } from "@/data/discover";
import { catalogEntry } from "@/data/templates";
import {
  botTeamsPageCopy,
  localizeBotTeam,
  localizeTemplateCopy,
  useI18n,
} from "@/lib/i18n";

export function BotTeamDetailView({ team }: { team: BotTeam }) {
  const { locale, t } = useI18n();
  const labels = botTeamsPageCopy(locale);
  const item = localizeBotTeam(team, locale);
  const stories = team.exampleSlugs
    .map((slug) => getDiscoverStory(slug))
    .filter((story) => story != null);
  const templates = team.templateIds
    .map((id) => catalogEntry(id))
    .filter((entry) => entry != null)
    .map((entry) => ({
      ...entry,
      copy: localizeTemplateCopy(entry.id, locale, entry),
    }));
  const start = botTeams.findIndex((candidate) => candidate.slug === team.slug);
  const others = Array.from({ length: 3 }, (_, index) =>
    botTeams[(start + index + 1) % botTeams.length],
  );

  return (
    <article data-bot-teams-page className="mx-auto max-w-[1080px] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs
        items={[
          { href: "/use-cases", label: t("nav.useCases") },
          { label: item.title },
        ]}
      />

      <header className="mt-8 border-b border-line pb-10 md:pb-12">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] font-medium tracking-[0.15em] text-accent uppercase">
            {labels.teamEyebrow} {String(team.rank).padStart(2, "0")}
          </p>
          <p className="font-mono text-[11px] text-faint">{labels.evidence(stories.length)}</p>
        </div>
        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h1 className="max-w-[16ch] text-[clamp(38px,7vw,68px)] leading-[0.98] font-medium tracking-[-0.045em] text-ink">
              {item.title}
            </h1>
            <p className="mt-5 max-w-[680px] text-[17px] leading-8 text-mute">{item.summary}</p>
          </div>
          <div className="flex -space-x-3" aria-hidden>
            {item.roles.map((role, roleIndex) => (
              <span
                key={role.id}
                className="grid size-12 place-items-center rounded-full border-[3px] border-canvas bg-elevated sm:size-14"
              >
                <BotFace
                  size={36}
                  color={teamBotColor(roleIndex)}
                  paper="var(--elevated)"
                />
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2" aria-label={labels.outcomeLabel}>
        <div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
          <p className="text-[10px] font-medium tracking-[0.13em] text-faint uppercase">{labels.outcomeLabel}</p>
          <p className="mt-3 text-[17px] leading-7 text-ink">{item.outcome}</p>
        </div>
        <div className="rounded-2xl border border-line bg-elevated p-5 sm:p-6">
          <p className="text-[10px] font-medium tracking-[0.13em] text-faint uppercase">{labels.audienceLabel}</p>
          <p className="mt-3 text-[15px] leading-7 text-mute">{item.audience}</p>
        </div>
      </section>

      <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-start">
        <section aria-labelledby="team-workflow-title">
          <h2 id="team-workflow-title" className="text-[28px] font-medium tracking-[-0.025em] text-ink">
            {labels.workflowTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-mute">{labels.workflowBody}</p>

          <ol className="mt-8">
            {item.roles.map((role, index) => {
              const isLast = index === item.roles.length - 1;
              return (
                <li key={role.id} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0">
                  {!isLast ? (
                    <span aria-hidden className="absolute top-11 bottom-0 left-6 w-px bg-line" />
                  ) : null}
                  <span className="relative z-10 grid size-12 place-items-center rounded-full border border-line bg-card">
                    <BotFace
                      size={30}
                      color={teamBotColor(index)}
                      paper="var(--card)"
                    />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-mono text-[10px] tracking-[0.12em] text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-[18px] font-medium tracking-tight text-ink">{role.name}</h3>
                    <p className="mt-1.5 text-[14px] leading-6 text-mute">{role.action}</p>
                    <p className="mt-3 flex items-start gap-2 text-[13px] leading-6 text-ink">
                      {isLast ? (
                        <ArrowRight aria-hidden className="mt-1.5 size-3.5 shrink-0 text-accent" strokeWidth={1.75} />
                      ) : (
                        <ArrowDown aria-hidden className="mt-1.5 size-3.5 shrink-0 text-accent" strokeWidth={1.75} />
                      )}
                      <span>
                        <span className="font-medium text-accent">{labels.handoffLabel}: </span>
                        {role.handoff}
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className="rounded-2xl border border-line bg-card p-5 lg:sticky lg:top-20 sm:p-6">
          <h2 className="text-[20px] font-medium tracking-tight text-ink">{labels.setupTitle}</h2>
          <p className="mt-2 text-[13px] leading-6 text-mute">{labels.setupBody}</p>
          <div className="mt-5">
            <PromptBox prompt={item.setupPrompt} title={labels.setupTitle} />
          </div>
        </aside>
      </div>

      {templates.length ? (
        <section className="mt-20 border-t border-line pt-12" aria-labelledby="team-templates-title">
          <div className="max-w-2xl">
            <h2 id="team-templates-title" className="text-[28px] font-medium tracking-[-0.025em] text-ink">
              {labels.templatesTitle}
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-mute">{labels.templatesBody}</p>
          </div>
          <ul className="mt-7 grid gap-3 md:grid-cols-2">
            {templates.map((template) => (
              <li key={template.id}>
                <a
                  href={template.templateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-28 items-start justify-between gap-4 rounded-2xl border border-line bg-card p-5 hover:border-line-strong"
                >
                  <span className="min-w-0">
                    <span className="block text-[16px] font-medium text-ink group-hover:text-accent">
                      {template.copy.title}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-5 text-mute">
                      {template.copy.oneLiner}
                    </span>
                  </span>
                  <ExternalLink aria-hidden className="mt-1 size-3.5 shrink-0 text-faint group-hover:text-accent" strokeWidth={1.75} />
                  <span className="sr-only">{labels.templateOpen}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {stories.length ? (
        <section className="mt-20 border-t border-line pt-12" aria-labelledby="team-evidence-title">
          <div className="max-w-2xl">
            <h2 id="team-evidence-title" className="text-[28px] font-medium tracking-[-0.025em] text-ink">
              {labels.examplesTitle}
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-mute">{labels.examplesBody}</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {stories.map((story) => (
              <DiscoverCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-20 border-t border-line pt-12" aria-labelledby="other-teams-title">
        <h2 id="other-teams-title" className="text-[22px] font-medium tracking-tight text-ink">
          {labels.otherTitle}
        </h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {others.map((other) => {
            const otherItem = localizeBotTeam(other, locale);
            return (
              <li key={other.slug}>
                <LocaleLink
                  href={`/use-cases/${other.slug}`}
                  className="group flex min-h-16 items-center justify-between gap-4 py-3"
                >
                  <span>
                    <span className="font-mono text-[11px] text-faint">{String(other.rank).padStart(2, "0")}</span>
                    <span className="ml-4 text-[15px] font-medium text-ink group-hover:text-accent">{otherItem.title}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-3.5 shrink-0 text-faint group-hover:text-accent" strokeWidth={1.75} />
                </LocaleLink>
              </li>
            );
          })}
        </ul>
        <p className="mt-5">
          <LocaleLink href="/use-cases" className="inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-accent hover:text-ink">
            {labels.allTeams}
            <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.75} />
          </LocaleLink>
        </p>
      </section>
    </article>
  );
}
