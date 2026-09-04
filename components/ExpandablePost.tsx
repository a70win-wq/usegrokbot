"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
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
  const collapsedHeight = lines * 24;
  const [expandedHeight, setExpandedHeight] = useState(collapsedHeight);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const fullHeight = el.scrollHeight;
      setExpandedHeight(fullHeight);
      setOverflows(fullHeight > collapsedHeight + 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, collapsedHeight]);

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setOpen((current) => !current);
  }

  return (
    <div className={className}>
      <div
        className="expand-copy min-w-0"
        style={{ gridTemplateRows: `${open ? expandedHeight : collapsedHeight}px` }}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            ref={ref}
            className="min-w-0 text-[15px] leading-6 wrap-break-word whitespace-pre-wrap text-ink"
          >
            {text}
          </p>
        </div>
      </div>
      {overflows ? (
        <button
          type="button"
          className={cn(
            "pointer-events-auto relative z-10 -ml-2 mt-1 inline-flex min-h-11 items-center gap-1 rounded-lg px-2 py-2 text-[15px] font-medium text-accent transition-colors duration-200 hover:bg-accent-soft active:bg-accent-soft",
          )}
          aria-expanded={open}
          onClick={toggle}
        >
          {open ? t("discover.showLess") : t("discover.showMore")}
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              open && "rotate-180",
            )}
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
