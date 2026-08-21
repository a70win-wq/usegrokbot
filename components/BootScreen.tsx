"use client";

import { useEffect, useState } from "react";
import { BloubBot } from "@/components/BloubBot";
import { COLORS, type Block } from "@/lib/bloub";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

declare global {
  interface Window {
    __ugbBootDone?: boolean;
  }
}

const MIN_MS = 800;
const FADE_MS = 300;
const BLUE = COLORS.find((item) => item.id === "bleu")?.hex ?? "#3b93f0";

const BOOT_CYCLE: Block[] = [
  { state: "idle", duration: 0.6 },
  { state: "egg", duration: 0.6 },
  { state: "exclaim", duration: 0.7 },
  { state: "wink", duration: 0.6 },
  { state: "idle", duration: 0.6 },
];

export function BootScreen() {
  const { t } = useI18n();
  const [open, setOpen] = useState(() => typeof window === "undefined" || !window.__ugbBootDone);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.__ugbBootDone) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.boot = "1";
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const started = performance.now();
    let fadeAt = 0;
    let hideAt = 0;

    const finish = () => {
      const hold = reduce ? 0 : Math.max(0, MIN_MS - (performance.now() - started));
      fadeAt = window.setTimeout(() => setLeaving(true), hold);
      hideAt = window.setTimeout(() => {
        window.__ugbBootDone = true;
        delete document.documentElement.dataset.boot;
        document.body.style.overflow = prevOverflow;
        setOpen(false);
      }, hold + FADE_MS);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fadeAt);
      window.clearTimeout(hideAt);
      delete document.documentElement.dataset.boot;
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!open) return null;

  return (
    <div
      suppressHydrationWarning
      aria-busy="true"
      aria-label={t("bot.boot")}
      className={cn(
        "fixed inset-0 z-[300] flex items-center justify-center bg-canvas transition-opacity ease-out",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="boot-wander size-[140px] md:size-[180px]">
        <BloubBot
          size={180}
          color={BLUE}
          paper="var(--canvas)"
          playing
          cycle={BOOT_CYCLE}
          crop="scene"
          className="h-full w-full"
          title={t("bot.aria")}
        />
      </div>
    </div>
  );
}
