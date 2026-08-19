"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { useSaved } from "./saved";

export function SaveButton({
  slug,
  title,
  className,
  withLabel = false,
}: {
  slug: string;
  title: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { has, toggle } = useSaved();
  const { t } = useI18n();
  const saved = has(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={saved ? t("save.remove", { title }) : t("save.add", { title })}
      className={cn(
        "spring-press inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px] px-2.5 text-[13px] text-mute hover:text-ink",
        saved && "text-danger",
        className,
      )}
    >
      <Heart
        className={cn("spring-pop size-4", saved && "scale-125")}
        strokeWidth={1.75}
        fill={saved ? "currentColor" : "none"}
      />
      {withLabel ? (saved ? t("save.saved") : t("save.save")) : null}
    </button>
  );
}
