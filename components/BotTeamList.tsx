"use client";

import { AuthorAvatar } from "@/components/AuthorAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { botTeamCategories, botTeams, type BotTeam } from "@/data/bot-teams";
import { getDiscoverStory } from "@/data/discover";
import {
  botTeamsPageCopy,
  localizeBotTeam,
  localizeBotTeamCategory,
  localizeDiscoverStory,
  useI18n,
} from "@/lib/i18n";
import { formatViewCount, metricForStory } from "@/lib/x-metrics";

export function BotTeamList({ items = botTeams }: { items?: readonly BotTeam[] }) {
  const { locale, t } = useI18n();
  const labels = botTeamsPageCopy(locale);

  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((team) => {
        const item = localizeBotTeam(team, locale);
        const category = botTeamCategories.find((candidate) => candidate.slug === team.category);
        const categoryTitle = category ? localizeBotTeamCategory(category, locale).title : team.category;
        const source = getDiscoverStory(team.exampleSlugs[0]);
        const localizedSource = source ? localizeDiscoverStory(source, locale) : undefined;
        const views = source ? metricForStory(source)?.views : undefined;
        const visibleRoles = item.roles.slice(0, 4);
        const hiddenRoleCount = Math.max(0, item.roles.length - visibleRoles.length);

        return (
          <li key={team.slug}>
            <LocaleLink
              href={`/use-cases/${team.slug}`}
              className="spring-lift group flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong focus-visible:outline-offset-4"
              aria-label={`${labels.open}: ${item.title}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-medium tracking-[0.12em] text-accent uppercase">
                  {categoryTitle}
                </span>
                <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-faint">
                  {String(team.rank).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-4 text-[20px] leading-tight font-medium tracking-[-0.025em] text-ink group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-mute">{item.outcome}</p>

              <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-medium tracking-[0.08em] uppercase">
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                  {labels.evidence(team.exampleSlugs.length)}
                </span>
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <p className="text-[10px] font-medium tracking-[0.12em] text-faint uppercase">
                  {labels.bots(team.botCount)}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-ink">
                  {visibleRoles.map((role, roleIndex) => (
                    <span key={role.id}>
                      {roleIndex > 0 ? <span className="mx-1.5 text-faint">→</span> : null}
                      {role.name}
                    </span>
                  ))}
                  {hiddenRoleCount > 0 ? <span className="ml-1.5 text-faint">+{hiddenRoleCount}</span> : null}
                </p>
              </div>

              <div className="mt-auto pt-5">
                {source && localizedSource ? (
                  <div className="flex min-w-0 items-center justify-between gap-3 border-t border-line pt-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <AuthorAvatar name={localizedSource.authorName} handle={source.handle} size={40} />
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-medium text-ink">{localizedSource.authorName}</p>
                        {source.handle ? <p className="truncate text-[11px] text-faint">@{source.handle}</p> : null}
                      </div>
                    </div>
                    {views != null && views > 0 ? (
                      <div className="shrink-0 text-right">
                        <p className="text-[14px] font-medium tabular-nums text-ink">{formatViewCount(views, locale)}</p>
                        <p className="text-[10px] text-faint">{t("pages.rankingsViews")}</p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </LocaleLink>
          </li>
        );
      })}
    </ol>
  );
}
