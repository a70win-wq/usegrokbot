"use client";

import { useI18n } from "@/lib/i18n";
import { CopyButton } from "./CopyButton";

export function PromptBox({ prompt, title }: { prompt: string; title?: string }) {
  const { t } = useI18n();

  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-elevated">
      <div className="flex items-center justify-between border-b border-line bg-card px-4 py-2.5">
        <span className="font-mono text-[13px] font-medium tracking-[0.05em] text-mute uppercase">
          {title ?? t("detail.promptTitle")}
        </span>
        <CopyButton text={prompt} label={t("copy.short")} variant="inline" className="h-10 text-[15px]" />
      </div>
      <pre className="prompt-scroll max-h-[480px] overflow-auto bg-input px-5 py-5 font-mono text-[15px] leading-[1.7] wrap-break-word whitespace-pre-wrap text-ink">
        {prompt}
      </pre>
    </div>
  );
}
