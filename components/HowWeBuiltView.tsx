"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyButton } from "@/components/CopyButton";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { howWeBuiltPrompt } from "@/data/how-we-built-prompt";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function HowWeBuiltView() {
  const { t, absoluteHref } = useI18n();
  const url = absoluteHref("/how-we-built");

  return (
    <article className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: t("pages.builtTitle"),
          description: t("pages.builtBody"),
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          url,
        }}
      />

      <Breadcrumbs items={[{ href: "/", label: t("nav.discover") }, { label: t("nav.built") }]} />

      <h1 className="mt-6 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.builtTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("pages.builtBody")}</p>

      <div className="mt-6">
        <CopyButton text={howWeBuiltPrompt} label={t("pages.builtCopy")} variant="solid" />
      </div>

      <pre className="mt-8 overflow-x-auto rounded-2xl border border-line bg-elevated px-5 py-5 text-[13px] leading-6 whitespace-pre-wrap text-ink">
        {howWeBuiltPrompt}
      </pre>

      <p className="mt-8">
        <LocaleLink href="/" className="text-sm text-ink hover:underline">
          {t("nav.discover")} →
        </LocaleLink>
      </p>
    </article>
  );
}
