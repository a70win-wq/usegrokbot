import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IdentityMascot } from "@/components/IdentityMascot";
import { TemplatesModeNav } from "@/components/TemplatesModeNav";
import {
  identityClusters,
  interpolateIdentityCopy,
  localizeText,
  moreTemplateIdentities,
  templateCountForIdentity,
  templateIdentitiesForCluster,
  templateIdentityUiCopy,
} from "@/data/template-identities";
import { withLocale, type UrlLocale } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/types";

export function TemplatesIdentityIndex({
  locale,
  urlLocale,
}: {
  locale: Locale;
  urlLocale: UrlLocale;
}) {
  const copy = templateIdentityUiCopy[locale];

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16" data-template-identity-index>
      <TemplatesModeNav active="role" locale={locale} urlLocale={urlLocale} />

      <div className="border-b border-line pb-8 pt-10 md:pt-12">
        <div>
          <h1 className="text-[clamp(32px,5vw,48px)] font-medium tracking-[-0.035em] text-ink">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-mute">{copy.intro}</p>
        </div>
      </div>

      <div className="space-y-16 pt-12 md:space-y-20 md:pt-16">
        {identityClusters.map((cluster) => {
          const identities = templateIdentitiesForCluster(cluster.slug);
          const headingId = "identity-cluster-" + cluster.slug;
          return (
            <section key={cluster.slug} aria-labelledby={headingId}>
              <div className="max-w-2xl">
                <h2 id={headingId} className="text-2xl font-medium tracking-tight text-ink">
                  {localizeText(cluster.name, locale)}
                </h2>
                <p className="mt-2 text-sm leading-6 text-mute">
                  {localizeText(cluster.description, locale)}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {identities.map((identity) => {
                  const count = templateCountForIdentity(identity.slug);
                  return (
                    <Link
                      key={identity.slug}
                      href={withLocale("/templates/" + identity.slug, urlLocale)}
                      className="group spring-lift flex min-h-[156px] min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      data-template-identity={identity.slug}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[18px] font-medium tracking-tight text-ink">
                          {localizeText(identity.name, locale)}
                        </h3>
                        <IdentityMascot slug={identity.slug} paper="var(--card)" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-mute">
                        {localizeText(identity.description, locale)}
                      </p>
                      <span className="mt-auto flex items-end justify-between gap-3 pt-5">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                          {copy.openIdentity}
                          <ArrowRight
                            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                        <span className="shrink-0 font-mono text-xs tabular-nums text-faint">
                          {interpolateIdentityCopy(copy.templateCount, { n: count })}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section aria-labelledby="more-identities">
          <div className="max-w-3xl">
            <h2 id="more-identities" className="text-2xl font-medium tracking-tight text-ink">
              {copy.moreTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-mute">{copy.moreBody}</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {moreTemplateIdentities().map((identity) => {
              const count = templateCountForIdentity(identity.slug);
              return (
                <Link
                  key={identity.slug}
                  href={withLocale("/templates/" + identity.slug, urlLocale)}
                  className="group flex min-h-[76px] items-center gap-3 rounded-[12px] border border-line px-4 py-3 text-sm text-ink hover:border-line-strong hover:bg-card"
                  data-template-identity={identity.slug}
                >
                  <IdentityMascot slug={identity.slug} size={36} paper="var(--canvas)" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium">
                      {localizeText(identity.name, locale)}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-faint">
                      {interpolateIdentityCopy(copy.templateCount, { n: count })}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-3.5 shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <aside className="rounded-2xl border border-line bg-elevated p-6 md:p-8" aria-labelledby="identity-rationale">
          <h2 id="identity-rationale" className="text-xl font-medium tracking-tight text-ink">
            {copy.whyTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-mute">{copy.whyBody}</p>
        </aside>
      </div>
    </div>
  );
}
