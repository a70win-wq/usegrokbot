"use client";

import { ArrowRight } from "lucide-react";
import { BotTeamList } from "@/components/BotTeamList";
import { botTeams } from "@/data/bot-teams";
import { botTeamsPageCopy, useI18n } from "@/lib/i18n";

export function UseCasesView() {
  const { locale } = useI18n();
  const copy = botTeamsPageCopy(locale);

  return (
    <div data-bot-teams-page className="mx-auto max-w-[1080px] px-5 py-12 md:px-8 md:py-20">
      <section className="max-w-[780px]">
        <p className="text-[11px] font-medium tracking-[0.15em] text-accent uppercase">{copy.eyebrow}</p>
        <h1 className="mt-4 text-[clamp(38px,7vw,68px)] leading-[0.98] font-medium tracking-[-0.045em] text-ink">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-[680px] text-[17px] leading-8 text-mute sm:text-[19px]">{copy.body}</p>
        <p className="mt-4 font-mono text-[12px] tracking-wide text-faint">{copy.count}</p>
      </section>

      <section
        className="mt-12 grid overflow-hidden rounded-2xl border border-line bg-card md:grid-cols-2"
        aria-label={`${copy.oneBotTitle}. ${copy.teamTitle}`}
      >
        <div className="p-5 sm:p-6">
          <p className="text-[15px] font-medium text-ink">{copy.oneBotTitle}</p>
          <p className="mt-1.5 text-[13px] leading-6 text-mute">{copy.oneBotBody}</p>
        </div>
        <div className="border-t border-line bg-accent-soft p-5 md:border-t-0 md:border-l sm:p-6">
          <p className="text-[15px] font-medium text-ink">{copy.teamTitle}</p>
          <p className="mt-1.5 text-[13px] leading-6 text-mute">{copy.teamBody}</p>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="bot-team-list-title">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 id="bot-team-list-title" className="text-[28px] font-medium tracking-[-0.025em] text-ink">
              {copy.chooseTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-[14px] leading-6 text-mute">{copy.chooseBody}</p>
          </div>
          <span className="shrink-0 font-mono text-[11px] tracking-wide text-faint">
            01 → {String(botTeams.length).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-8">
          <BotTeamList />
        </div>
      </section>

      <section className="mt-20 border-t border-line pt-12" aria-labelledby="team-size-guide-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="text-[11px] font-medium tracking-[0.15em] text-accent uppercase">{copy.guideEyebrow}</p>
            <h2 id="team-size-guide-title" className="mt-3 max-w-[18ch] text-[28px] leading-tight font-medium tracking-[-0.025em] text-ink">
              {copy.guideTitle}
            </h2>
            <p className="mt-3 max-w-lg text-[14px] leading-6 text-mute">{copy.guideBody}</p>
            <a
              href="https://docs.x.ai/grok-bot/bots"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-accent hover:text-ink"
            >
              {copy.guideLink}
              <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.75} />
            </a>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {copy.guideSteps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-5">
                <span className="font-mono text-[12px] text-accent">0{index + 1}</span>
                <div>
                  <h3 className="text-[15px] font-medium text-ink">{step.title}</h3>
                  <p className="mt-1 text-[13px] leading-6 text-mute">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
