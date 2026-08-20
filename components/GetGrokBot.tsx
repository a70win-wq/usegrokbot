"use client";

import { ExternalLink } from "lucide-react";
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
  const { locale } = useI18n();
  const copy = openGrokCopy(locale);

  return (
    <a
      href={site.xaiBotUrl}
      aria-label={copy.aria}
      title={copy.aria}
      className={cn(
        variant === "accent" &&
          "accent-gradient spring-press inline-flex h-11 items-center gap-2 rounded-[10px] px-5 text-sm font-medium",
        variant === "link" && "inline-flex items-center gap-1 text-sm text-mute hover:text-ink",
        variant === "quiet" &&
          "inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-[12px] text-mute transition hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      {variant === "link" ? null : <ExternalLink className="size-3.5" strokeWidth={1.75} />}
      <span className={variant === "quiet" ? "hidden sm:inline" : undefined}>{copy.label}</span>
    </a>
  );
}

function openGrokCopy(locale: string) {
  if (locale === "zh-Hant") {
    return {
      label: "打開 Grok",
      aria: "打開 Grok；手機已安裝 Grok app 時會優先用 app 開啟",
    };
  }
  if (locale === "zh-Hans") {
    return {
      label: "打开 Grok",
      aria: "打开 Grok；手机已安装 Grok app 时会优先用 app 打开",
    };
  }
  return {
    label: "Open Grok",
    aria: "Open Grok; on mobile, the installed Grok app can handle this link",
  };
}
