"use client";

import { ArrowRight } from "lucide-react";
import { BotFace, teamBotColor } from "@/components/BotFace";
import { LocaleLink } from "@/components/LocaleLink";
import { botTeams, type BotTeam } from "@/data/bot-teams";
import { botTeamsPageCopy, localizeBotTeam, useI18n } from "@/lib/i18n";

export function BotTeamList({ items = botTeams }: { items?: readonly BotTeam[] }) {
  const { locale } = useI18n();
  const labels = botTeamsPageCopy(locale);

  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {items.map((team, index) => {
        const item = localizeBotTeam(team, locale);
        const featured = index === 0;

        return (
          <li key={team.slug} className={featured ? "md:col-span-2" : undefined}>
            <LocaleLink
              href={`/use-cases/${team.slug}`}
              className="spring-lift group flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong focus-visible:outline-offset-4 sm:p-6"
              aria-label={`${labels.open}: ${item.title}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] tracking-[0.14em] text-faint">
                  {String(team.rank).padStart(2, "0")}
                </span>
                <span className="text-[12px] text-faint">
                  {labels.evidence(team.exampleSlugs.length)}
                </span>
              </div>

              <div className={featured ? "mt-5 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12" : "mt-5"}>
                <div className="min-w-0">
                  <h2 className="text-[22px] leading-tight font-medium tracking-[-0.025em] text-ink group-hover:text-accent sm:text-[24px]">
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[15px] leading-6 text-mute">{item.summary}</p>
                </div>

                <div className={featured ? "mt-5 flex -space-x-2 md:mt-0" : "mt-5 flex -space-x-2"} aria-hidden>
                  {item.roles.slice(0, 5).map((role, roleIndex) => (
                    <span
                      key={role.id}
                      className="grid size-10 place-items-center rounded-full border-2 border-card bg-elevated"
                    >
                      <BotFace size={28} color={teamBotColor(roleIndex)} paper="var(--elevated)" />
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <p className="text-[10px] font-medium tracking-[0.12em] text-faint uppercase">
                  {labels.bots(item.roles.length)}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-ink">
                  {item.roles.map((role, roleIndex) => (
                    <span key={role.id}>
                      {roleIndex > 0 ? <span className="mx-1.5 text-faint">→</span> : null}
                      {role.name}
                    </span>
                  ))}
                </p>
              </div>

              <span className="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-[13px] font-medium text-accent">
                {labels.open}
                <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </span>
            </LocaleLink>
          </li>
        );
      })}
    </ol>
  );
}
