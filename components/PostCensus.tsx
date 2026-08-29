"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

export function CensusNumber({
  total,
  className,
  accessible = false,
}: {
  total: number;
  className?: string;
  accessible?: boolean;
}) {
  const { locale } = useI18n();
  const [value, setValue] = useState(total);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let observer: MutationObserver | undefined;

    const run = (instant = false) => {
      if (
        media.matches ||
        instant ||
        /Googlebot|bingbot|Applebot|Slurp|DuckDuckBot/i.test(window.navigator.userAgent)
      ) {
        setValue(total);
        setDone(true);
        return;
      }

      setDone(false);
      setValue(0);
      const start = performance.now();
      const duration = 1600;

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 5);
        setValue(Math.round(total * eased));
        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
          return;
        }
        setDone(true);
      };

      frame = window.requestAnimationFrame(tick);
    };

    const bootReady = () => {
      const boot = document.documentElement.getAttribute("data-boot");
      return window.__ugbBootDone || boot !== "1";
    };

    if (bootReady()) {
      run(document.documentElement.getAttribute("data-boot") === "skip");
    } else {
      observer = new MutationObserver(() => {
        if (bootReady()) {
          observer?.disconnect();
          run();
        }
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-boot"] });
    }

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [total]);

  const format = (n: number) => new Intl.NumberFormat(locale === "en" ? "en-US" : locale).format(n);

  return (
    <span
      aria-hidden={accessible ? undefined : true}
      className={cn(
        "post-census-number inline-block font-medium tracking-tight text-accent tabular-nums",
        done && "post-census-number-done",
        className,
      )}
    >
      {format(value)}
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
