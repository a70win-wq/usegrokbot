"use client";

import { AppPills } from "@/components/AppPills";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CapabilityRow } from "@/components/CapabilityRow";
import { CopyButton } from "@/components/CopyButton";
import { ExampleOutput } from "@/components/ExampleOutput";
import { GetGrokBot } from "@/components/GetGrokBot";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { PromptBox } from "@/components/PromptBox";
import { SaveButton } from "@/components/SaveButton";
import { StatusBadge } from "@/components/StatusBadge";
import { UseCaseCard } from "@/components/UseCaseCard";
import { WorkflowIntegrationMap } from "@/components/WorkflowIntegrationMap";
import { WorkflowSteps } from "@/components/WorkflowSteps";
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
  const quick = promptFirstCopy(locale);

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

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.11em] text-accent uppercase">{quick.kicker}</p>
            <p className="mt-1 text-[15px] font-medium text-ink">{quick.lead}</p>
          </div>
          <span className="hidden shrink-0 text-[12px] text-faint sm:inline">{quick.noSetup}</span>
        </div>

        <PromptBox prompt={useCase.prompt} />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <CopyButton text={useCase.prompt} label={quick.copy} variant="solid" />
          <GetGrokBot variant="quiet" className="h-11 px-3" />
          <SaveButton slug={useCase.slug} title={item.title} withLabel className="h-11 px-3" />
        </div>
        <p className="mt-3 text-[12px] text-faint">{quick.afterCopy}</p>
      </section>

      <section className="mt-14 border-t border-line pt-12">
        <p className="text-[11px] font-medium tracking-[0.11em] text-faint uppercase">{quick.explainKicker}</p>
        <h2 className="mt-2 text-2xl font-medium tracking-tight text-ink">{quick.explainTitle}</h2>
        <p className="mt-4 text-[17px] leading-7 text-mute">{item.description}</p>

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

        <div className="mt-6">
          <p className="mb-1.5 text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
            {t("detail.integrations")}
          </p>
          <AppPills useCase={useCase} />
          <WorkflowIntegrationMap useCase={useCase} label={t("detail.integrations")} />
        </div>

        {inspired ? (
          <p className="mt-5 text-[13px] text-mute">
            {inspired.handle
              ? t("detail.inspiredByHandle", { handle: inspired.handle })
              : t("detail.inspiredByName", { name: inspired.authorName })}
          </p>
        ) : null}

        <div className="mt-5">
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
          <p className="mt-5 text-[13px] text-mute">
            {t("trust.source")}{" "}
            <a href={trust.source.url} className="text-accent" target="_blank" rel="noreferrer">
              {trust.source.label}
            </a>
          </p>
        ) : null}
      </section>

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

function promptFirstCopy(locale: string) {
  if (locale === "zh-Hant") {
    return {
      kicker: "即拎即用",
      lead: "Copy 呢段提示詞，貼落 Grok Bot 就可以開始。",
      noSetup: "唔使填資料 · 唔使先設定",
      copy: "Copy 提示詞",
      afterCopy: "Copy → 貼去 Grok Bot → 用。想了解原理，再向下睇。",
      explainKicker: "想知先睇",
      explainTitle: "呢段提示詞會幫你做啲乜？",
    };
  }
  if (locale === "zh-Hans") {
    return {
      kicker: "复制即用",
      lead: "复制这段提示词，粘贴到 Grok Bot 就可以开始。",
      noSetup: "不用填资料 · 不用先设置",
      copy: "复制提示词",
      afterCopy: "复制 → 粘贴到 Grok Bot → 使用。想了解原理，再往下看。",
      explainKicker: "想了解再看",
      explainTitle: "这段提示词会帮你做什么？",
    };
  }
  return {
    kicker: "COPY & RUN",
    lead: "Copy this prompt, paste it into Grok Bot, and go.",
    noSetup: "No form · No setup first",
    copy: "Copy prompt",
    afterCopy: "Copy → paste into Grok Bot → use it. Read on only if you want the explanation.",
    explainKicker: "OPTIONAL EXPLANATION",
    explainTitle: "What will this prompt do for you?",
  };
}
