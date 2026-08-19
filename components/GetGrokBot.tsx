"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function GetGrokBot({
  className,
  variant = "quiet",
}: {
  className?: string;
  variant?: "quiet" | "accent" | "link";
}) {
  const { t } = useI18n();

  return (
    <a
      href={site.xaiBotUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={t("official.downloadAria")}
      className={cn(
        variant === "accent" &&
          "accent-gradient spring-press inline-flex h-11 items-center gap-2 rounded-[10px] px-5 text-sm font-medium",
        variant === "link" && "inline-flex items-center gap-1 text-sm text-mute hover:text-ink",
        variant === "quiet" &&
          "inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-[12px] text-mute transition hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      {variant === "link" ? null : <Download className="size-3.5" strokeWidth={1.75} />}
      <span className={variant === "quiet" ? "hidden sm:inline" : undefined}>{t("official.download")}</span>
    </a>
  );
}
