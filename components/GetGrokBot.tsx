"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

type Variant = "quiet" | "accent" | "link" | "outline";

export function GetGrokBot({
  className,
  variant = "quiet",
  label,
}: {
  className?: string;
  variant?: Variant;
  label?: string;
}) {
  const { locale } = useI18n();
  const copy = grokBotCopy(locale);
  const [href, setHref] = useState(site.grokBotDesktopUrl);
  const [destination, setDestination] = useState<"desktop" | "ios">("desktop");

  useEffect(() => {
    const isIOS =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      setHref(site.grokBotIosUrl);
      setDestination("ios");
    }
  }, []);

  const aria = destination === "ios" ? copy.iosAria : copy.desktopAria;

  return (
    <a
      href={href}
      aria-label={aria}
      title={aria}
      className={cn(
        variant === "accent" &&
          "accent-gradient spring-press inline-flex h-11 items-center gap-2 rounded-[10px] px-5 text-sm font-medium",
        variant === "link" && "inline-flex items-center gap-1 text-sm text-mute hover:text-ink",
        variant === "quiet" &&
          "inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-[12px] text-mute transition hover:border-line-strong hover:text-ink",
        variant === "outline" &&
          "spring-press inline-flex h-11 items-center gap-1.5 rounded-[10px] border border-line px-4 text-sm font-medium text-ink hover:border-line-strong",
        className,
      )}
    >
      {variant === "link" ? null : <ExternalLink className="size-3.5" strokeWidth={1.75} />}
      <span className={variant === "quiet" ? "hidden sm:inline" : undefined}>{label ?? copy.label}</span>
    </a>
  );
}

function grokBotCopy(locale: string) {
  if (locale === "zh-Hant") {
    return {
      label: "Grok Bot app",
      iosAria: "打開或安裝 Grok Bot iPhone app",
      desktopAria: "打開 Grok Bot 官方電腦版登入及下載頁",
    };
  }
  if (locale === "zh-Hans") {
    return {
      label: "Grok Bot app",
      iosAria: "打开或安装 Grok Bot iPhone app",
      desktopAria: "打开 Grok Bot 官方电脑版登录及下载页",
    };
  }
  return {
    label: "Grok Bot app",
    iosAria: "Open or install the Grok Bot iPhone app",
    desktopAria: "Open the official Grok Bot desktop onboarding and download page",
  };
}
