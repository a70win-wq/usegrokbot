"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatStarCount } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function GitHubStar({
  stars,
  className,
  label = "responsive",
}: {
  stars?: number | null;
  className?: string;
  label?: "responsive" | "always";
}) {
  const { t } = useI18n();
  const count = typeof stars === "number" ? formatStarCount(stars) : null;

  return (
    <a
      href={site.githubUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={t("github.starAria")}
      className={cn(
        "inline-flex h-8 items-center overflow-hidden rounded-lg border border-line text-[12px] text-mute transition hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 px-2.5">
        <Star className="size-3.5" strokeWidth={1.75} />
        <span className={label === "always" ? undefined : "hidden sm:inline"}>{t("github.star")}</span>
      </span>
      {count ? (
        <span className="border-l border-line px-2 font-mono text-[11px] text-faint tabular-nums">
          {count}
        </span>
      ) : null}
    </a>
  );
}
