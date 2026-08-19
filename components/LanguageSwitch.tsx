"use client";

import { cn } from "@/lib/cn";
import { localeLabels, locales, useI18n } from "@/lib/i18n";

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={cn(
        "flex items-center rounded-lg border border-line p-0.5",
        compact && "scale-[0.95]",
      )}
    >
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={cn(
            "h-7 min-w-7 rounded-md px-1.5 text-[12px] leading-none transition",
            locale === item ? "bg-ink text-inverse" : "text-mute hover:text-ink",
          )}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
