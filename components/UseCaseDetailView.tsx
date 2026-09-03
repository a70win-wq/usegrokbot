"use client";

import { AppNamePills } from "@/components/AppPills";
import { BotFace, botColorFor } from "@/components/BotFace";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoverCard } from "@/components/DiscoverCard";
import { LocaleLink } from "@/components/LocaleLink";
import { PromptBox } from "@/components/PromptBox";
import { getDiscoverStory } from "@/data/discover";
import { officialUseCases } from "@/data/official-use-cases";
import { rankLabel, scenarios, type Scenario } from "@/data/scenarios";
import { topicMessageKey } from "@/data/topics";
import { localizeOfficial, localizeScenario, useI18n } from "@/lib/i18n";
import { topicResultsPath } from "@/lib/search";

export function UseCaseDetailView({ scenario }: { scenario: Scenario }) {
  const { locale, t } = useI18n();
  const item = localizeScenario(scenario, locale);
  const stories = scenario.exampleSlugs
    .map((slug) => getDiscoverStory(slug))
    .filter((story) => story != null);
  const roles = scenario.officialRoles
    .map((slug) => officialUseCases.find((entry) => entry.slug === slug))
    .filter((role) => role != null)
    .map((role) => localizeOfficial(role, locale));
  const start = scenarios.findIndex((entry) => entry.slug === scenario.slug);
  const others = Array.from({ length: 4 }, (_, index) =>
    localizeScenario(scenarios[(start + 1 + index) % scenarios.length], locale),
  );

  return (
    <article className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs
        items={[
          { href: "/use-cases", label: t("nav.useCases") },
          { label: item.title },
        ]}
      />

      <div className="mt-8 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-mono text-[13px] tabular-nums tracking-wide text-faint">
            {rankLabel(scenario.rank)} / {rankLabel(scenarios.length)}
          </p>
          <h1 className="mt-3 max-w-[16ch] text-[clamp(32px,6vw,56px)] leading-[1.05] font-medium tracking-[-0.035em] text-ink">
            {item.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-8 text-mute">{item.oneLiner}</p>
          <div className="mt-5">
            <AppNamePills apps={scenario.apps} />
          </div>
        </div>
        <BotFace size={52} color={botColorFor(scenario.slug)} className="mt-1 hidden shrink-0 lg:block" />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] lg:items-start">
        <div>
          <section>
            <h2 className="text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
              {t("detail.what")}
            </h2>
            <p className="mt-3 text-[16px] leading-8 text-ink">{item.does}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
              {t("detail.who")}
            </h2>
            <p className="mt-3 text-[16px] leading-8 text-ink">{item.who}</p>
          </section>

          <section className="mt-10">
            <PromptBox prompt={item.startWith} title={t("useCases.promptTitle")} />
            <p className="mt-3 text-[12px] leading-5 text-faint">{t("useCases.promptHint")}</p>
          </section>

          {roles.length ? (
            <section className="mt-12">
              <h2 className="text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
                {t("useCases.roles")}
              </h2>
              <ul className="mt-4 space-y-3">
                {roles.map((role) => (
                  <li key={role.slug}>
                    <LocaleLink
                      href={`/roles#${role.slug}`}
                      className="text-[15px] font-medium text-ink hover:text-accent"
                    >
                      {role.title}
                    </LocaleLink>
                    <p className="mt-1 text-[13px] leading-6 text-mute">{role.role}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-12">
            <LocaleLink href={topicResultsPath(scenario.topic)} className="text-[15px] text-mute hover:text-ink">
              {t("useCases.moreIn", { name: t(topicMessageKey(scenario.topic)) })} →
            </LocaleLink>
          </p>
        </div>

        <div className="min-w-0">
          {stories.length ? (
            <section>
              <h2 className="text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
                {t("useCases.examples")}
              </h2>
              <p className="mt-2 text-[13px] text-mute">{t("useCases.examplesBody")}</p>
              <div className="mt-5 grid gap-5">
                {stories.map((story) => (
                  <DiscoverCard key={story.slug} story={story} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>

      {others.length ? (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("useCases.also")}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((entry) => (
              <li key={entry.slug}>
                <LocaleLink href={`/use-cases/${entry.slug}`} className="group flex items-baseline gap-3">
                  <span className="w-6 shrink-0 font-mono text-[12px] tabular-nums text-faint">
                    {rankLabel(entry.rank)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium text-ink group-hover:text-accent">
                      {entry.title}
                    </span>
                    <span className="mt-1 block text-[13px] leading-5 text-mute">{entry.oneLiner}</span>
                  </span>
                </LocaleLink>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <LocaleLink href="/use-cases" className="text-sm text-mute hover:text-ink">
              {t("useCases.viewAll", { n: scenarios.length })} →
            </LocaleLink>
          </p>
        </section>
      ) : null}
    </article>
  );
}
