"use client";

import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { t } = useI18n();
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("theme.toggle")}
      className="inline-flex size-11 items-center justify-center rounded-[10px] text-mute transition-colors hover:bg-elevated hover:text-ink xl:size-10"
    >
      <Sun className="hidden size-4 [[data-theme=dark]_&]:block" strokeWidth={1.75} />
      <Moon className="size-4 [[data-theme=dark]_&]:hidden" strokeWidth={1.75} />
    </button>
  );
}
