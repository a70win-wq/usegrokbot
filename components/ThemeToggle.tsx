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
      className="inline-flex size-9 items-center justify-center rounded-lg text-mute hover:text-ink"
    >
      <Sun className="hidden size-3.5 [[data-theme=dark]_&]:block" strokeWidth={1.75} />
      <Moon className="size-3.5 [[data-theme=dark]_&]:hidden" strokeWidth={1.75} />
    </button>
  );
}
