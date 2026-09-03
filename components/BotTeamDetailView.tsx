"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { BotFace, teamBotColor } from "@/components/BotFace";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocaleLink } from "@/components/LocaleLink";
import { PromptBox } from "@/components/PromptBox";
import { botTeams, type BotTeam } from "@/data/bot-teams";
import { getDiscoverStory } from "@/data/discover";
import { catalogEntry } from "@/data/templates";
import {
  botTeamsPageCopy,
  localizeBotTeam,
  localizeDiscoverStory,
  localizeTemplateCopy,
  useI18n,
} from "@/lib/i18n";
import { formatCardDate } from "@/lib/format";
import { openExternalUrl } from "@/lib/open-external";
import { formatViewCount, metricForStory } from "@/lib/x-metrics";

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
  const sameCategory = botTeams.filter(
    (candidate) => candidate.category === team.category && candidate.slug !== team.slug,
  );
  const others = sameCategory.slice(0, 3);
  const visibleBotCount = Math.min(team.botCount, 6);
  const hiddenBotCount = Math.max(0, team.botCount - visibleBotCount);

  return (
    <article data-bot-teams-page className="mx-auto max-w-[1080px] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs
        items={[
          { href: "/use-cases", label: t("nav.useCases") },
          { label: item.title },
        ]}
      />

      <header className="mt-8 border-b border-line pb-10 md:pb-12">
        <div className="flex justify-end">
          <p className="font-mono text-[11px] text-faint">
            {labels.bots(team.botCount)}
            <span aria-hidden> · </span>
            {labels.evidence(stories.length)}
            {team.evidenceType === "official-example" ? (
              <><span aria-hidden> · </span>{labels.officialExample}</>
            ) : null}
          </p>
        </div>
        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h1 className="max-w-[16ch] text-[clamp(38px,7vw,68px)] leading-[0.98] font-medium tracking-[-0.045em] text-ink">
              {item.title}
            </h1>
            <p className="mt-5 max-w-[680px] text-[17px] leading-8 text-mute">{item.outcome}</p>
          </div>
          <div className="lg:text-right">
            <div className="flex -space-x-3 lg:justify-end" aria-hidden>
              {Array.from({ length: visibleBotCount }, (_, roleIndex) => (
                <span
                  key={roleIndex}
                  className="grid size-12 place-items-center rounded-full border-[3px] border-canvas bg-elevated sm:size-14"
                >
                  <BotFace
                    size={36}
                    color={teamBotColor(roleIndex)}
                    paper="var(--elevated)"
                  />
                </span>
              ))}
              {hiddenBotCount > 0 ? (
                <span className="relative z-10 grid size-12 place-items-center rounded-full border-[3px] border-canvas bg-ink text-[12px] font-medium text-inverse sm:size-14">
                  +{hiddenBotCount}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-start">
        <section aria-labelledby="team-workflow-title">
          <h2 id="team-workflow-title" className="text-[28px] font-medium tracking-[-0.025em] text-ink">
            {labels.workflowTitle}
          </h2>

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
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className="rounded-2xl border border-line bg-card p-5 lg:sticky lg:top-20 sm:p-6">
          <h2 className="text-[20px] font-medium tracking-tight text-ink">{labels.setupTitle}</h2>
          <div className="mt-5">
            <PromptBox prompt={item.setupPrompt} />
          </div>
        </aside>
      </div>

      {templates.length ? (
        <section className="mt-20 border-t border-line pt-12" aria-labelledby="team-templates-title">
          <div className="max-w-2xl">
            <h2 id="team-templates-title" className="text-[28px] font-medium tracking-[-0.025em] text-ink">
              {labels.templatesTitle}
            </h2>
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
          </div>
          <ul className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => {
              const source = localizeDiscoverStory(story, locale);
              const href = story.xPostUrl ?? story.sourceUrl;
              const views = metricForStory(story)?.views;
              const linkLabel = story.xPostUrl ? t("discover.viewOnX") : t("discover.viewOriginal");
              return (
                <li key={story.slug}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => openExternalUrl(href, event)}
                    aria-label={`${linkLabel}: ${source.authorName}`}
                    className="group flex h-full min-h-28 items-center justify-between gap-3 rounded-2xl border border-line bg-card p-4 hover:border-line-strong"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <AuthorAvatar name={source.authorName} handle={story.handle} size={40} />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-ink group-hover:text-accent">
                          {source.authorName}
                        </span>
                        {story.handle ? <span className="block truncate text-[11px] text-faint">@{story.handle}</span> : null}
                        <span className="mt-1 block text-[11px] text-faint">{formatCardDate(story.publishedAt, locale)}</span>
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      {views != null && views > 0 ? (
                        <>
                          <span className="block text-[13px] font-medium tabular-nums text-ink">
                            {formatViewCount(views, locale)}
                          </span>
                          <span className="mt-0.5 block text-[10px] text-faint">{t("pages.rankingsViews")}</span>
                        </>
                      ) : null}
                      <ExternalLink aria-hidden className="mt-2 ml-auto size-3.5 text-faint group-hover:text-accent" strokeWidth={1.75} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
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
                  className="group flex min-h-20 items-center justify-between gap-4 py-3"
                >
                  <span className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-3">
                    <span className="pt-0.5 font-mono text-[11px] text-faint">
                      {String(other.rank).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium text-ink group-hover:text-accent">
                        {otherItem.title}
                      </span>
                    </span>
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
