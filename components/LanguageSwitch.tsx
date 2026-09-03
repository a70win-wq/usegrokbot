"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { cn } from "@/lib/cn";
import { localeLabels, locales, useI18n, type Locale } from "@/lib/i18n";
import { hreflang, localeToUrl, stripLocalePrefix, withLocale } from "@/lib/i18n/paths";

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
  return (
    <Suspense
      fallback={<LanguageSwitchControl compact={compact} variant={variant} onSelect={onSelect} search="" />}
    >
      <LanguageSwitchFromUrl compact={compact} variant={variant} onSelect={onSelect} />
    </Suspense>
  );
}

function LanguageSwitchFromUrl({
  compact,
  variant,
  onSelect,
}: {
  compact: boolean;
  variant: "default" | "menu";
  onSelect?: () => void;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return (
    <LanguageSwitchControl
      compact={compact}
      variant={variant}
      onSelect={onSelect}
      search={query ? `?${query}` : ""}
    />
  );
}

function LanguageSwitchControl({
  compact,
  variant,
  onSelect,
  search,
}: {
  compact: boolean;
  variant: "default" | "menu";
  onSelect?: () => void;
  search: string;
}) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
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
            href={withLocale(`${path}${search}`, urlLocale)}
            hrefLang={hreflang[urlLocale]}
            aria-current={locale === item ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              onSelect?.();
              if (locale === item) return;
              setLocale(item);
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
