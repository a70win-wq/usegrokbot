"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

export function PostCensus({ total }: { total: number }) {
  const { locale, t } = useI18n();
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let observer: MutationObserver | undefined;

    const run = () => {
      if (media.matches) {
        setValue(total);
        setDone(true);
        return;
      }

      setValue(0);
      setDone(false);
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

    if (window.__ugbBootDone || !document.documentElement.dataset.boot) {
      run();
    } else {
      observer = new MutationObserver(() => {
        if (!document.documentElement.dataset.boot) {
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

  const formatted = new Intl.NumberFormat(locale === "en" ? "en-US" : locale).format(value);

  return (
    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px] text-mute sm:text-[16px]">
      <span
        className={cn(
          "post-census-number inline-block font-medium tracking-tight text-accent tabular-nums",
          "text-[clamp(40px,8vw,64px)] leading-none",
          done && "post-census-number-done",
        )}
      >
        {formatted}
      </span>
      <span className="pb-1.5">
        {t("home.censusPosts")}
        <span className="text-faint"> · {t("home.censusRefresh")}</span>
      </span>
    </p>
  );
}
