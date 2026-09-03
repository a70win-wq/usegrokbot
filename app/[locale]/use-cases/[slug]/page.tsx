import { notFound } from "next/navigation";
import { BotTeamDetailView } from "@/components/BotTeamDetailView";
import { JsonLd } from "@/components/JsonLd";
import { UseCaseDetailView } from "@/components/UseCaseDetailView";
import { VerifiedUseCaseDetailView } from "@/components/VerifiedUseCaseDetailView";
import { botTeams, getBotTeam } from "@/data/bot-teams";
import { getScenario, scenarios } from "@/data/scenarios";
import { getVerifiedUseCase, verifiedUseCases } from "@/data/verified-use-cases";
import {
  localizeBotTeam,
  localizeScenario,
  localizeVerifiedUseCase,
  verifiedUseCasesPageCopy,
} from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getVerifiedUseCasePrompt } from "@/lib/verified-use-case-sources";

export function generateStaticParams() {
  return [...new Set([...verifiedUseCases, ...botTeams, ...scenarios].map((item) => item.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const verified = getVerifiedUseCase(slug);
  if (verified) {
    const { urlLocale, locale } = localeFromParams(raw);
    const item = localizeVerifiedUseCase(verified, locale);
    const copy = verifiedUseCasesPageCopy(locale);
    return pageMeta({
      title: item.title,
      description: `${item.title}. ${verified.evidence === "prompt" ? copy.promptIncluded : copy.setupShared}.`,
      path: `/use-cases/${verified.slug}`,
      urlLocale,
    });
  }
  const team = getBotTeam(slug);
  if (team) {
    const { urlLocale, locale } = localeFromParams(raw);
    const item = localizeBotTeam(team, locale);
    return pageMeta({
      title: item.title,
      description: item.summary,
      path: `/use-cases/${team.slug}`,
      urlLocale,
    });
  }
  const scenario = getScenario(slug);
  if (!scenario) return {};
  const { urlLocale, locale } = localeFromParams(raw);
  const item = localizeScenario(scenario, locale);
  return pageMeta({
    title: item.title,
    description: item.oneLiner,
    path: `/use-cases/${scenario.slug}`,
    urlLocale,
  });
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const verified = getVerifiedUseCase(slug);
  if (verified) {
    const { urlLocale, locale } = localeFromParams(raw);
    const item = localizeVerifiedUseCase(verified, locale);
    const prompt = getVerifiedUseCasePrompt(verified.primarySourceSlug);
    const url = absoluteUrl(`/use-cases/${verified.slug}`, urlLocale);
    const steps = prompt
      ? [{ name: item.title, text: prompt }]
      : item.setupSteps.map((text, index) => ({ name: `${index + 1}`, text }));

    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: item.title,
            url,
            publisher: { "@type": "Organization", name: site.name, url: site.url },
            step: steps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.name,
              text: step.text,
            })),
          }}
        />
        <VerifiedUseCaseDetailView item={verified} locale={locale} />
      </>
    );
  }
  const team = getBotTeam(slug);
  if (team) {
    const { urlLocale, locale } = localeFromParams(raw);
    const item = localizeBotTeam(team, locale);
    const url = absoluteUrl(`/use-cases/${team.slug}`, urlLocale);
    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: item.title,
            description: item.summary,
            url,
            publisher: { "@type": "Organization", name: site.name, url: site.url },
            step: item.roles.map((role, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: role.name,
              text: `${role.action} ${role.handoff}`,
            })),
          }}
        />
        <BotTeamDetailView team={team} />
      </>
    );
  }
  const scenario = getScenario(slug);
  if (!scenario) notFound();
  const { urlLocale, locale } = localeFromParams(raw);
  const item = localizeScenario(scenario, locale);
  const url = absoluteUrl(`/use-cases/${scenario.slug}`, urlLocale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: item.title,
          description: item.oneLiner,
          url,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          step: {
            "@type": "HowToStep",
            name: item.title,
            text: item.startWith,
          },
        }}
      />
      <UseCaseDetailView scenario={scenario} />
    </>
  );
}
