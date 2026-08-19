"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
  variant?: "ghost" | "solid" | "inline";
};

export function CopyButton({ text, label, className, variant = "ghost" }: CopyButtonProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const idleLabel = label ?? t("copy.prompt");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "spring-press inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px] px-3 text-[13px] font-medium transition",
        variant === "ghost" &&
          "border border-line bg-transparent text-mute hover:border-line-strong hover:text-ink",
        variant === "solid" && "h-11 bg-ink px-5 text-sm text-inverse hover:opacity-90",
        variant === "inline" && "h-8 px-2.5 text-mute hover:text-ink",
        className,
      )}
    >
      {copied ? (
        <Check className="spring-pop size-3.5 scale-110 text-ok" strokeWidth={2} />
      ) : (
        <Copy className="size-3.5" strokeWidth={1.75} />
      )}
      {copied ? t("copy.copied") : idleLabel}
    </button>
  );
}
