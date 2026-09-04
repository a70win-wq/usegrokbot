"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

type CounterEntry = {
  shell: HTMLSpanElement;
  fallback: HTMLSpanElement;
  value: HTMLSpanElement;
  total: number;
  format: (value: number) => string;
  completionPop: boolean;
  started: boolean;
  startedAt: number;
  duration: number;
  lastValue: number;
};

const counters = new Map<HTMLSpanElement, CounterEntry>();
const activeCounters = new Map<HTMLSpanElement, CounterEntry>();
const crawlerPattern = /Googlebot|bingbot|Applebot|Slurp|DuckDuckBot/i;

let counterFrame: number | null = null;
let viewportObserver: IntersectionObserver | null = null;
let reducedMotionQuery: MediaQueryList | null = null;
let bootReadyPromise: Promise<void> | null = null;
let bootReadyObserver: MutationObserver | null = null;

function isBootReady() {
  return (
    window.__ugbBootDone ||
    document.documentElement.getAttribute("data-boot") !== "1"
  );
}

function waitForBoot() {
  if (isBootReady()) return Promise.resolve();
  if (bootReadyPromise) return bootReadyPromise;

  bootReadyPromise = new Promise((resolve) => {
    bootReadyObserver = new MutationObserver(() => {
      if (!isBootReady()) return;
      bootReadyObserver?.disconnect();
      bootReadyObserver = null;
      resolve();
    });
    bootReadyObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-boot"],
    });
  });

  return bootReadyPromise;
}

function counterDuration(total: number) {
  return Math.min(1600, Math.max(800, 700 + total * 10));
}

function finishCounter(entry: CounterEntry, animateCompletion: boolean) {
  activeCounters.delete(entry.shell);
  viewportObserver?.unobserve(entry.shell);
  entry.value.textContent = entry.format(entry.total);
  entry.shell.dataset.countUpState = "done";

  if (animateCompletion && entry.completionPop) {
    entry.shell.classList.add("post-census-number-done");
  }
}

function renderCounters(now: number) {
  counterFrame = null;

  for (const entry of activeCounters.values()) {
    const progress = Math.min(1, (now - entry.startedAt) / entry.duration);
    const eased = 1 - Math.pow(1 - progress, 5);
    const nextValue = Math.round(entry.total * eased);

    if (nextValue !== entry.lastValue) {
      entry.lastValue = nextValue;
      entry.value.textContent = entry.format(nextValue);
    }

    if (progress >= 1) finishCounter(entry, true);
  }

  if (activeCounters.size > 0) {
    counterFrame = window.requestAnimationFrame(renderCounters);
  }
}

function scheduleCounters() {
  if (counterFrame === null && activeCounters.size > 0) {
    counterFrame = window.requestAnimationFrame(renderCounters);
  }
}

function startCounter(entry: CounterEntry) {
  if (entry.started || !counters.has(entry.shell)) return;
  entry.started = true;
  viewportObserver?.unobserve(entry.shell);

  if (
    entry.total <= 0 ||
    reducedMotionQuery?.matches ||
    crawlerPattern.test(window.navigator.userAgent)
  ) {
    finishCounter(entry, false);
    return;
  }

  entry.fallback.style.visibility = "hidden";
  entry.value.hidden = false;
  entry.startedAt = performance.now();
  entry.lastValue = 0;
  entry.value.textContent = entry.format(0);
  entry.shell.dataset.countUpState = "running";
  activeCounters.set(entry.shell, entry);
  scheduleCounters();
}

function ensureViewportObserver() {
  if (viewportObserver || !("IntersectionObserver" in window)) {
    return viewportObserver;
  }

  viewportObserver = new IntersectionObserver(
    (entries) => {
      for (const observed of entries) {
        if (!observed.isIntersecting) continue;
        const entry = counters.get(observed.target as HTMLSpanElement);
        if (entry) startCounter(entry);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
  );

  return viewportObserver;
}

function onReducedMotionChange(event: MediaQueryListEvent) {
  if (!event.matches) return;
  for (const entry of counters.values()) finishCounter(entry, false);
}

function ensureReducedMotionQuery() {
  if (reducedMotionQuery) return reducedMotionQuery;
  reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotionQuery.addEventListener("change", onReducedMotionChange);
  return reducedMotionQuery;
}

function teardownCounterEngine() {
  viewportObserver?.disconnect();
  viewportObserver = null;
  reducedMotionQuery?.removeEventListener("change", onReducedMotionChange);
  reducedMotionQuery = null;
  activeCounters.clear();
  if (counterFrame !== null) window.cancelAnimationFrame(counterFrame);
  counterFrame = null;
  bootReadyObserver?.disconnect();
  bootReadyObserver = null;
  bootReadyPromise = null;
}

function registerCounter(entry: CounterEntry) {
  counters.set(entry.shell, entry);
  entry.shell.classList.remove("post-census-number-done");
  entry.shell.dataset.countUpState = "waiting";
  entry.fallback.style.removeProperty("visibility");
  entry.value.hidden = true;
  ensureReducedMotionQuery();

  if (
    reducedMotionQuery?.matches ||
    crawlerPattern.test(window.navigator.userAgent)
  ) {
    startCounter(entry);
  } else {
    void waitForBoot().then(() => {
      if (!counters.has(entry.shell)) return;
      const observer = ensureViewportObserver();
      if (observer) observer.observe(entry.shell);
      else startCounter(entry);
    });
  }

  return () => {
    viewportObserver?.unobserve(entry.shell);
    activeCounters.delete(entry.shell);
    counters.delete(entry.shell);
    if (counters.size === 0) teardownCounterEngine();
  };
}

export function CensusNumber({
  total,
  className,
  accessible = false,
  emphasis = "accent",
  completionPop = true,
}: {
  total: number;
  className?: string;
  accessible?: boolean;
  emphasis?: "accent" | "inherit";
  completionPop?: boolean;
}) {
  const { locale } = useI18n();
  const shellRef = useRef<HTMLSpanElement>(null);
  const fallbackRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const formatter = useMemo(
    () => new Intl.NumberFormat(locale === "en" ? "en-US" : locale),
    [locale],
  );
  const formattedTotal = formatter.format(total);

  useEffect(() => {
    const shell = shellRef.current;
    const fallback = fallbackRef.current;
    const value = valueRef.current;
    if (!shell || !fallback || !value) return;

    return registerCounter({
      shell,
      fallback,
      value,
      total,
      format: (number) => formatter.format(number),
      completionPop,
      started: false,
      startedAt: 0,
      duration: counterDuration(total),
      lastValue: -1,
    });
  }, [completionPop, formatter, total]);

  return (
    <>
      {accessible ? <span className="sr-only">{formattedTotal}</span> : null}
      <span
        ref={shellRef}
        aria-hidden="true"
        data-count-up=""
        data-count-up-state="idle"
        data-count-up-total={total}
        className={cn(
          "inline-grid font-medium tracking-tight tabular-nums",
          emphasis === "accent" && "post-census-number text-accent",
          className,
        )}
      >
        <span ref={fallbackRef} className="col-start-1 row-start-1">
          {formattedTotal}
        </span>
        <span
          ref={valueRef}
          hidden
          className="col-start-1 row-start-1 justify-self-end"
        >
          0
        </span>
      </span>
    </>
  );
}

export function AnimatedCountLabel({
  total,
  template,
  className,
}: {
  total: number;
  template: string;
  className?: string;
}) {
  const { locale } = useI18n();
  const formatter = useMemo(
    () => new Intl.NumberFormat(locale === "en" ? "en-US" : locale),
    [locale],
  );
  const markerIndex = template.indexOf("{n}");
  const formattedTotal = formatter.format(total);

  if (markerIndex < 0) return <span className={className}>{template}</span>;

  const before = template.slice(0, markerIndex);
  const after = template.slice(markerIndex + 3);

  return (
    <span className={className}>
      <span className="sr-only">{before + formattedTotal + after}</span>
      <span aria-hidden="true">
        {before}
        <CensusNumber
          total={total}
          emphasis="inherit"
          completionPop={false}
          className="text-[1em] leading-none"
        />
        {after}
      </span>
    </span>
  );
}

export function PostCensus({ total }: { total: number }) {
  const { locale, t } = useI18n();
  const formattedTotal = new Intl.NumberFormat(locale === "en" ? "en-US" : locale).format(total);

  return (
    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px] text-mute sm:text-[16px]">
      <span className="sr-only">
        {formattedTotal} {t("home.censusPosts")}
      </span>
      <CensusNumber total={total} className="text-[clamp(40px,8vw,64px)] leading-none" />
      <span aria-hidden="true" className="pb-1.5">
        {t("home.censusPosts")}
        <span className="text-faint"> · {t("home.censusRefresh")}</span>
      </span>
    </p>
  );
}
