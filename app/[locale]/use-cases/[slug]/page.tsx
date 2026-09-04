import { notFound, permanentRedirect } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { VerifiedUseCaseDetailView } from "@/components/VerifiedUseCaseDetailView";
import { getBotTeam } from "@/data/bot-teams";
import { getScenario } from "@/data/scenarios";
import { getVerifiedUseCase, verifiedUseCases } from "@/data/verified-use-cases";
import {
  localizeVerifiedUseCase,
  verifiedUseCasesPageCopy,
} from "@/lib/i18n";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getVerifiedUseCasePrompt } from "@/lib/verified-use-case-sources";

export function generateStaticParams() {
  return verifiedUseCases.map((item) => ({ slug: item.slug }));
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
  return {};
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
  const { urlLocale } = localeFromParams(raw);
  if (getBotTeam(slug)) permanentRedirect(`/${urlLocale}/templates/teams`);
  if (getScenario(slug)) permanentRedirect(`/${urlLocale}/use-cases`);
  notFound();
}
