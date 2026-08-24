"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

const LINE_HEIGHT_REM = 1.5;

export function ExpandablePost({
  text,
  lines = 6,
  className,
}: {
  text: string;
  lines?: number;
  className?: string;
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState(false);
  const maxHeight = `${lines * LINE_HEIGHT_REM}rem`;

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
        className="overflow-hidden text-[15px] leading-6 whitespace-pre-wrap text-ink"
        style={open ? undefined : { maxHeight }}
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
    </div>
  );
}
