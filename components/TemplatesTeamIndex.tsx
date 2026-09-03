import { TemplateTeamBrowser } from "@/components/TemplateTeamBrowser";
import { TemplatesModeNav } from "@/components/TemplatesModeNav";
import { teamTemplates } from "@/data/templates";
import { interpolateTemplateHubCopy, templateHubUiCopy } from "@/data/template-types";
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
  const allItems = teamTemplates();
  const builders = teamTemplates("builder");
  const orchestrators = teamTemplates("orchestrator");
  const countLabel = interpolateTemplateHubCopy(copy.teamCount, { n: allItems.length });

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

      <TemplateTeamBrowser builders={builders} orchestrators={orchestrators} locale={locale} />

      <p className="mt-10 border-t border-line pt-6 text-sm leading-6 text-mute">
        {copy.evidenceNote}
      </p>
    </div>
  );
}
