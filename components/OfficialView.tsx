"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BotFace, botColorFor } from "@/components/BotFace";
import { CopyButton } from "@/components/CopyButton";
import {
  OFFICIAL_DOCS_URL,
  OFFICIAL_SOURCE_URL,
  officialCategories,
  officialGuideCount,
  officialUseCases,
  type OfficialCategory,
  type OfficialUseCase,
} from "@/data/official-use-cases";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

const categoryKeys: Record<OfficialCategory, string> = {
  general: "officialPage.catGeneral",
  sales: "officialPage.catSales",
  marketing: "officialPage.catMarketing",
  "customer-success": "officialPage.catCustomerSuccess",
  recruiting: "officialPage.catRecruiting",
  "operations-finance": "officialPage.catOps",
  product: "officialPage.catProduct",
  engineering: "officialPage.catEngineering",
  life: "officialPage.catLife",
};

export function OfficialView() {
  const { t } = useI18n();
  const [category, setCategory] = useState<OfficialCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(officialUseCases[0]?.slug ?? "");

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return officialUseCases.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!needle) return true;
      const haystack = [
        item.title,
        item.role,
        item.guide?.owns,
        item.guide?.connect,
        item.guide?.startWith,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [category, query]);

  const selected: OfficialUseCase | undefined =
    items.find((item) => item.slug === selectedSlug) ?? items[0];

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && officialUseCases.some((item) => item.slug === hash)) {
      setSelectedSlug(hash);
    }
  }, []);

  useEffect(() => {
    if (!selected) return;
    if (selected.slug !== selectedSlug) setSelectedSlug(selected.slug);
  }, [selected, selectedSlug]);

  function pick(slug: string) {
    setSelectedSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
    window.requestAnimationFrame(() => {
      document.getElementById("official-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 md:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[20px] font-medium tracking-tight text-ink">{t("officialPage.title")}</h1>
          <p className="mt-1 max-w-[36rem] text-[13px] leading-6 text-mute">{t("officialPage.body")}</p>
          <p className="mt-2 text-[13px] text-faint">
            {t("officialPage.count", { n: officialUseCases.length })}
            {" · "}
            {t("officialPage.countGuide", { n: officialGuideCount })}
          </p>
        </div>
        <label className="relative block w-full max-w-sm">
          <span className="sr-only">{t("officialPage.search")}</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-faint" strokeWidth={1.75} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("officialPage.search")}
            className="h-10 w-full rounded-[10px] border border-line bg-elevated pr-3 pl-9 text-[13px] text-ink outline-none placeholder:text-faint focus:border-accent"
          />
        </label>
      </div>

      {/* Wrap filters. Never overflow-x-auto for catalogs or chip rows. */}
      <div className="mt-5 flex flex-wrap gap-x-1 gap-y-1.5">
        <FilterChip active={category === "all"} label={t("officialPage.catAll")} onClick={() => setCategory("all")} />
        {officialCategories.map((item) => (
          <FilterChip
            key={item}
            active={category === item}
            label={t(categoryKeys[item])}
            onClick={() => setCategory(item)}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-10 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:flex lg:h-[calc(100vh-12rem)] lg:flex-col">
          <nav
            className="prompt-scroll min-h-0 flex-1 overflow-y-auto"
            aria-label={t("officialPage.title")}
          >
            {items.length === 0 ? (
              <p className="py-6 text-[13px] text-mute">{t("officialPage.empty")}</p>
            ) : (
              <ul>
                {items.map((item) => {
                  const active = item.slug === selected?.slug;
                  return (
                    <li key={item.slug}>
                      <button
                        type="button"
                        onClick={() => pick(item.slug)}
                        aria-current={active ? "true" : undefined}
                        aria-label={
                          item.guide ? `${item.title}. ${t("officialPage.hasTask")}` : undefined
                        }
                        className={cn(
                          "-mx-2 flex w-[calc(100%+1rem)] items-baseline justify-between gap-3 rounded-[8px] px-2 py-2 text-left text-[14px] transition",
                          active ? "bg-elevated text-ink" : "text-mute hover:text-ink",
                        )}
                      >
                        <span className="flex min-w-0 items-baseline gap-2">
                          {item.guide ? (
                            <span
                              className={cn(
                                "mt-1 size-1.5 shrink-0 rounded-full",
                                active ? "bg-accent" : "bg-faint",
                              )}
                              title={t("officialPage.hasTask")}
                              aria-hidden
                            />
                          ) : (
                            <span className="size-1.5 shrink-0" aria-hidden />
                          )}
                          <span className={cn("min-w-0 truncate", active && "font-medium")}>{item.title}</span>
                        </span>
                        <span className="hidden shrink-0 font-mono text-[10px] tracking-wide text-faint uppercase lg:inline">
                          {t(categoryKeys[item.category])}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </aside>

        {selected ? <OfficialDetail key={selected.slug} selected={selected} /> : null}
      </div>
    </div>
  );
}

function OfficialDetail({ selected }: { selected: OfficialUseCase }) {
  const { t } = useI18n();
  const guide = selected.guide;

  return (
    <article id="official-detail" className="min-h-[24rem] scroll-mt-28 lg:min-h-[calc(100vh-8.5rem)]">
      <div className="flex items-start justify-between gap-6">
        <h2 className="max-w-[14ch] text-[clamp(32px,6vw,56px)] leading-[1.05] font-medium tracking-[-0.035em] text-ink">
          {selected.title}
        </h2>
        <BotFace size={52} color={botColorFor(selected.slug)} className="mt-1 hidden shrink-0 lg:block" />
      </div>
      <p className="mt-3 text-[13px] text-mute">
        {t(categoryKeys[selected.category])} · {t("officialPage.badge")}
        {guide ? ` · ${t("officialPage.hasTask")}` : ""}
      </p>

      <section className="mt-10 max-w-[38rem]">
        <p className="text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
          {t("officialPage.roleTitle")}
        </p>
        <p className="mt-3 text-[17px] leading-8 text-ink md:text-[18px] md:leading-8">{selected.role}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <CopyButton
            text={selected.role}
            label={t("officialPage.copyRole")}
            variant={guide ? "ghost" : "solid"}
          />
        </div>
        <p className="mt-2 text-[12px] text-faint">{t("officialPage.roleHint")}</p>
      </section>

      {guide ? (
        <>
          <section className="mt-12 max-w-[38rem]">
            <p className="text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
              {t("officialPage.scopeTitle")}
            </p>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-[12px] text-faint">{t("officialPage.owns")}</dt>
                <dd className="mt-0.5 text-[14px] leading-6 text-ink">{guide.owns}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-faint">{t("officialPage.connect")}</dt>
                <dd className="mt-0.5 text-[14px] leading-6 text-ink">{guide.connect}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-12 max-w-[38rem]">
            <p className="text-[11px] font-medium tracking-[0.08em] text-faint uppercase">
              {t("officialPage.taskTitle")}
            </p>
            <blockquote className="mt-4 border-l-2 border-line pl-4 text-[16px] leading-8 text-ink">
              {guide.startWith}
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CopyButton text={guide.startWith} label={t("officialPage.copyTask")} variant="solid" />
              <a
                href={OFFICIAL_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-mute underline decoration-line underline-offset-[5px] hover:text-ink"
              >
                {t("officialPage.docs")} ↗
              </a>
            </div>
            <p className="mt-2 text-[12px] text-faint">{t("officialPage.taskHint")}</p>
          </section>
        </>
      ) : null}

      <p className="mt-12 max-w-[38rem] text-[13px] leading-6 text-faint">
        <a
          href={OFFICIAL_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-line underline-offset-[5px] hover:text-ink"
        >
          {t("officialPage.source")} ↗
        </a>
      </p>
    </article>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-7 shrink-0 items-center rounded-full px-2.5 text-[12px] transition",
        active ? "bg-ink text-inverse" : "text-mute hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
