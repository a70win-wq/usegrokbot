import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { absoluteUrl, parseUrlLocale } from "@/lib/i18n/paths";
import { translateMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export function HowWeBuiltView({ locale }: { locale: string }) {
  const t = (key: string) => translateMeta(locale, key);
  const steps = [t("pages.builtLoop1"), t("pages.builtLoop2"), t("pages.builtLoop3")];
  const url = absoluteUrl("/how-we-built", parseUrlLocale(locale));

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

      <section className="mt-10">
        <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("pages.builtBotTitle")}</h2>
        <p className="mt-3 text-[15px] leading-7 text-mute">{t("pages.builtBotBody")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("pages.builtHumanTitle")}</h2>
        <p className="mt-3 text-[15px] leading-7 text-mute">{t("pages.builtHumanBody")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("pages.builtLoopTitle")}</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-[15px] leading-7 text-mute">
              <span className="mt-0.5 w-6 shrink-0 text-right font-medium tabular-nums text-faint">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-[20px] font-medium tracking-tight text-ink">{t("pages.builtElonTitle")}</h2>
        <p className="mt-3 text-[15px] leading-7 text-mute">{t("pages.builtElonBody")}</p>
      </section>

      <p className="mt-10 rounded-2xl border border-line bg-elevated px-5 py-4 text-[14px] leading-6 text-mute">
        {t("pages.builtNote")}
      </p>

      <p className="mt-8">
        <LocaleLink href="/" className="text-sm text-ink hover:underline">
          {t("nav.discover")} →
        </LocaleLink>
      </p>
    </article>
  );
}
