"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { useTapFeedback } from "@/lib/tap-feedback";

export function ExpandablePost({
  text,
  original,
  lines = 6,
  className,
}: {
  text: string;
  original?: string;
  lines?: number;
  className?: string;
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(`calc(${lines} * 1lh)`);
  const tap = useTapFeedback();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      if (!open) setOverflows(el.scrollHeight > el.clientHeight + 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, open, lines]);

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    tap.trigger();
    const el = ref.current;
    if (!el) {
      setOpen((current) => !current);
      return;
    }
    if (open) {
      setMaxHeight(`${el.scrollHeight}px`);
      requestAnimationFrame(() => setMaxHeight(`calc(${lines} * 1lh)`));
      setOpen(false);
      return;
    }
    setMaxHeight(`${el.scrollHeight}px`);
    setOpen(true);
  }

  return (
    <div className={className}>
      <p
        ref={ref}
        className="expand-copy min-w-0 text-[15px] leading-6 wrap-break-word whitespace-pre-wrap text-ink"
        style={{ maxHeight }}
      >
        {text}
      </p>
      {overflows ? (
        <button
          type="button"
          className={cn(
            "spring-press pointer-events-auto relative z-10 mt-1 inline-flex items-center gap-0.5 rounded-lg px-1.5 py-1 text-[15px] font-medium text-accent hover:bg-accent-soft",
            tap.className,
          )}
          aria-expanded={open}
          onClick={toggle}
          onAnimationEnd={tap.onAnimationEnd}
        >
          {open ? t("discover.showLess") : t("discover.showMore")}
          <ChevronDown
            className={cn("size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]", open && "rotate-180")}
            strokeWidth={2}
          />
        </button>
      ) : null}
      {original && original !== text ? (
        <p className="mt-2 text-[13px] leading-6 text-faint whitespace-pre-wrap">
          {t("discover.quoteOriginal")}：{original}
        </p>
      ) : null}
    </div>
  );
}
