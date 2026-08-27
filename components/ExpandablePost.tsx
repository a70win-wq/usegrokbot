"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

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

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || open) return;
    const measure = () => {
      setOverflows(el.scrollHeight > el.clientHeight + 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, open, lines]);

  return (
    <div className={className}>
      <p
        ref={ref}
        className="min-w-0 overflow-hidden text-[15px] leading-6 wrap-break-word whitespace-pre-wrap text-ink"
        style={open ? undefined : { maxHeight: `calc(${lines} * 1lh)` }}
      >
        {text}
      </p>
      {overflows ? (
        <button
          type="button"
          className="pointer-events-auto relative z-10 mt-1 text-[15px] font-medium text-accent"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setOpen((current) => !current);
          }}
        >
          {open ? t("discover.showLess") : t("discover.showMore")}
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
