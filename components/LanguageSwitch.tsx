"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { localeLabels, locales, useI18n, type Locale } from "@/lib/i18n";
import { LOCALE_COOKIE, hreflang, localeToUrl, stripLocalePrefix, withLocale } from "@/lib/i18n/paths";
import { STORAGE_KEY } from "@/lib/i18n/types";

const menuLocaleLabels: Record<Locale, string> = {
  "zh-Hant": "繁體",
  "zh-Hans": "简体",
  en: "English",
};

export function LanguageSwitch({
  compact = false,
  variant = "default",
  onSelect,
}: {
  compact?: boolean;
  variant?: "default" | "menu";
  onSelect?: () => void;
}) {
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const path = stripLocalePrefix(pathname);

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={cn(
        "flex h-10 items-center rounded-[10px] border border-line p-0.5",
        variant === "menu" && "h-auto rounded-full bg-card p-0.5",
        compact && variant === "default" && "scale-[0.95]",
      )}
    >
      {locales.map((item) => {
        const urlLocale = localeToUrl[item];
        return (
          <a
            key={item}
            href={withLocale(path, urlLocale)}
            hrefLang={hreflang[urlLocale]}
            aria-current={locale === item ? "page" : undefined}
            onClick={(event) => {
              onSelect?.();
              if (locale === item) {
                event.preventDefault();
                return;
              }
              window.localStorage.setItem(STORAGE_KEY, item);
              document.cookie = `${LOCALE_COOKIE}=${urlLocale}; path=/; max-age=31536000; samesite=lax`;
              event.currentTarget.href = `${withLocale(path, urlLocale)}${window.location.search}`;
            }}
            className={cn(
              "inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-1.5 text-[15px] leading-none transition-colors",
              variant === "menu" && "h-11 min-w-[3.25rem] rounded-full px-2 text-[15px]",
              locale === item
                ? "bg-accent-soft font-medium text-accent"
                : variant === "menu"
                  ? "text-mute hover:bg-elevated hover:text-ink"
                  : "text-mute hover:bg-card hover:text-ink",
            )}
          >
            {variant === "menu" ? menuLocaleLabels[item] : localeLabels[item]}
          </a>
        );
      })}
    </div>
  );
}
