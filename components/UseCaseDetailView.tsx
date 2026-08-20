"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyButton } from "@/components/CopyButton";
import { CustomizePrompt } from "@/components/CustomizePrompt";
import { ExampleOutput } from "@/components/ExampleOutput";
import { JsonLd } from "@/components/JsonLd";
import { PromptBox } from "@/components/PromptBox";
import { SaveButton } from "@/components/SaveButton";
import { UseCaseCard } from "@/components/UseCaseCard";
import { WorkflowSteps } from "@/components/WorkflowSteps";
import { WorkflowIntegrationMap } from "@/components/WorkflowIntegrationMap";
import { AppPills } from "@/components/AppPills";
import { CapabilityRow } from "@/components/CapabilityRow";
import { StatusBadge } from "@/components/StatusBadge";
import { getDiscoverStoryForUseCase } from "@/data/discover";
import type { UseCase } from "@/data/types";
import { formatVerifiedDate, verificationFor } from "@/data/verification";
import { categoryFor, localizeUseCase, useI18n } from "@/lib/i18n";

export function UseCaseDetailView({
  useCase,
  related,
}: {
  useCase: UseCase;
  related: UseCase[];
}) {
  const { locale, t, absoluteHref } = useI18n();
  const item = localizeUseCase(useCase, locale);
  const category = categoryFor(useCase.category, locale);
  const setupMins = useCase.setupTime.replace(" min", "");
  const trust = verificationFor(useCase.slug);
  const localeTag = locale === "en" ? "en" : locale;
  const inspired = getDiscoverStoryForUseCase(useCase.slug);

  return (
    <article className="mx-auto max-w-[800px] px-5 py-10 md:px-8 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${useCase.title} Grok Bot Workflow`,
          description: useCase.description,
          mainEntityOfPage: absoluteHref(`/use-cases/${useCase.slug}`),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Use Cases", item: absoluteHref("/use-cases") },
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: absoluteHref(`/categories/${category.slug}`),
            },
            { "@type": "ListItem", position: 3, name: item.title },
          ],
        }}
      />

      <Breadcrumbs
        items={[
          { href: "/use-cases", label: t("nav.useCases") },
          { href: `/categories/${category.slug}`, label: category.name },
          { label: item.title },
        ]}
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <StatusBadge status={trust.status} label={t(`trust.${trust.status}`)} />
        <span className="text-[12px] text-faint">
          {t("trust.verified", { date: formatVerifiedDate(trust.lastVerified, localeTag) })}
        </span>
      </div>

      <h1 className="mt-4 text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{item.title}</h1>
      <p className="mt-4 text-lg leading-8 text-mute">{item.description}</p>

      <div className="mt-6 flex flex-wrap gap-2 text-[12px] text-mute">
        {[
          t(`difficulty.${useCase.difficulty}`),
          t("meta.setup", { n: setupMins }),
          t(`schedule.${useCase.schedule}`),
        ].map((chip) => (
          <span key={chip} className="rounded-full border border-line px-2.5 py-1">
            {chip}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <p className="mb-1.5 text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
          {t("detail.integrations")}
        </p>
        <AppPills useCase={useCase} />
        <WorkflowIntegrationMap useCase={useCase} label={t("detail.integrations")} />
      </div>
      {inspired ? (
        <p className="mt-4 text-[13px] text-mute">
          {inspired.handle
            ? t("detail.inspiredByHandle", { handle: inspired.handle })
            : t("detail.inspiredByName", { name: inspired.authorName })}
        </p>
      ) : null}
      <div className="mt-4">
        <CapabilityRow
          useCase={useCase}
          labels={{
            browser: t("trust.needsBrowser"),
            login: t("trust.login"),
            loginYes: t("trust.loginYes"),
            loginMaybe: t("trust.loginMaybe"),
            loginNo: t("trust.loginNo"),
            routine: t("trust.routine"),
            approval: t("trust.approval"),
            approvalRecommended: t("trust.approvalRecommended"),
            approvalOptional: t("trust.approvalOptional"),
          }}
        />
      </div>
      {trust.source ? (
        <p className="mt-4 text-[13px] text-mute">
          {t("trust.source")}{" "}
          <a href={trust.source.url} className="text-accent" target="_blank" rel="noreferrer">
            {trust.source.label}
          </a>
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <CopyButton text={useCase.prompt} variant="solid" />
        <SaveButton slug={useCase.slug} title={item.title} withLabel className="h-11 px-3" />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-ink">{t("detail.what")}</h2>
        <div className="mt-6">
          <WorkflowSteps steps={item.steps} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-ink">{t("detail.who")}</h2>
        <ul className="mt-5 divide-y divide-line">
          {item.targetUsers.map((user) => (
            <li key={user} className="py-3 text-[15px] leading-6 text-ink first:pt-0 last:pb-0">
              {user}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-ink">{t("detail.copyPrompt")}</h2>
        <div className="mt-6">
          <PromptBox prompt={useCase.prompt} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-ink">{t("detail.yours")}</h2>
        <p className="mt-3 text-sm text-mute">{t("detail.yoursBody")}</p>
        <div className="mt-6">
          <CustomizePrompt useCase={useCase} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-ink">{t("detail.output")}</h2>
        <div className="mt-6">
          <ExampleOutput example={item.exampleOutput} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-ink">{t("detail.related")}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {related.map((relatedItem) => (
            <UseCaseCard key={relatedItem.slug} useCase={relatedItem} />
          ))}
        </div>
        <p className="mt-8 text-sm text-faint">
          {t("detail.moreIn", { name: category.name })}{" "}
          <LocaleLink href={`/categories/${category.slug}`} className="text-accent">
            {t("detail.seeList")}
          </LocaleLink>
          .
        </p>
      </section>
    </article>
  );
}
