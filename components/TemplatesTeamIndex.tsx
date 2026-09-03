import { TemplateList } from "@/components/TemplateList";
import { TemplatesModeNav } from "@/components/TemplatesModeNav";
import { teamTemplates } from "@/data/templates";
import {
  interpolateTemplateHubCopy,
  templateHubUiCopy,
} from "@/data/template-types";
import type { UrlLocale } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/types";

export function TemplatesTeamIndex({
  locale,
  urlLocale,
}: {
  locale: Locale;
  urlLocale: UrlLocale;
}) {
  const copy = templateHubUiCopy[locale];
  const items = teamTemplates();
  const countLabel = interpolateTemplateHubCopy(copy.teamCount, { n: items.length });

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16" data-template-team-index>
      <TemplatesModeNav active="teams" locale={locale} urlLocale={urlLocale} />

      <header className="border-b border-line pb-8 pt-10 md:pt-12">
        <p className="font-mono text-xs text-faint">{countLabel}</p>
        <h1 className="mt-3 text-[clamp(32px,5vw,48px)] font-medium tracking-[-0.035em] text-ink">
          {copy.teamTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-mute">{copy.teamIntro}</p>
      </header>

      <section className="py-10 md:py-12" aria-labelledby="team-template-types">
        <h2 id="team-template-types" className="sr-only">
          {copy.teamListTitle}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-elevated p-5 md:p-6">
            <p className="text-lg font-medium tracking-tight text-ink">{copy.builderTitle}</p>
            <p className="mt-2 text-sm leading-6 text-mute">{copy.builderBody}</p>
          </div>
          <div className="rounded-2xl border border-line bg-elevated p-5 md:p-6">
            <p className="text-lg font-medium tracking-tight text-ink">
              {copy.orchestratorTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-mute">{copy.orchestratorBody}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-template-list">
        <h2 id="team-template-list" className="mb-6 text-2xl font-medium tracking-tight text-ink">
          {copy.teamListTitle}
        </h2>
        <TemplateList items={items} variant="team" pager={false} />
      </section>

      <p className="mt-10 border-t border-line pt-6 text-sm leading-6 text-mute">
        {copy.evidenceNote}
      </p>
    </div>
  );
}
