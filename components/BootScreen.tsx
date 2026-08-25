"use client";

import { useEffect, useState } from "react";
import { BloubBot } from "@/components/BloubBot";
import { BOOT_MAX_MS } from "@/lib/boot-script";
import { COLORS, type Block } from "@/lib/bloub";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

declare global {
  interface Window {
    __ugbBootDone?: boolean;
  }
}

const FADE_MS = 200;
const BLUE = COLORS.find((item) => item.id === "bleu")?.hex ?? "#3b93f0";

const BOOT_CYCLE: Block[] = [
  { state: "idle", duration: 0.4 },
  { state: "wink", duration: 0.4 },
];

function bootAttr() {
  return document.documentElement.getAttribute("data-boot");
}

export function BootScreen() {
  const { t } = useI18n();
  const [open, setOpen] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.__ugbBootDone && bootAttr() === "skip") {
      setOpen(false);
      return;
    }

    let hideAt = 0;
    let finished = false;

    const hide = () => {
      if (finished) return;
      finished = true;
      window.__ugbBootDone = true;
      if (bootAttr() === "skip") {
        setOpen(false);
        return;
      }
      setLeaving(true);
      hideAt = window.setTimeout(() => setOpen(false), FADE_MS);
    };

    const onAttr = () => {
      const value = bootAttr();
      if (value === "off" || value === "skip") hide();
    };

    onAttr();
    const observer = new MutationObserver(onAttr);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-boot"] });
    const cap = window.setTimeout(() => {
      if (bootAttr() === "1" || !bootAttr()) {
        document.documentElement.setAttribute("data-boot", "off");
      }
      hide();
    }, BOOT_MAX_MS + FADE_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(cap);
      window.clearTimeout(hideAt);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      data-boot-screen=""
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
