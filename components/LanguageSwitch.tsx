"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { localeLabels, locales, useI18n } from "@/lib/i18n";
import { LOCALE_COOKIE, hreflang, localeToUrl, stripLocalePrefix, withLocale } from "@/lib/i18n/paths";
import { STORAGE_KEY } from "@/lib/i18n/types";

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t } = useI18n();
  const path = stripLocalePrefix(pathname);

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={cn(
        "flex items-center rounded-lg border border-line p-0.5",
        compact && "scale-[0.95]",
      )}
    >
      {locales.map((item) => {
        const urlLocale = localeToUrl[item];
        return (
          <Link
            key={item}
            href={withLocale(path, urlLocale)}
            hrefLang={hreflang[urlLocale]}
            onClick={(event) => {
              window.localStorage.setItem(STORAGE_KEY, item);
              document.cookie = `${LOCALE_COOKIE}=${urlLocale}; path=/; max-age=31536000; samesite=lax`;
              const search = window.location.search;
              if (!search) return;
              event.preventDefault();
              router.push(`${withLocale(path, urlLocale)}${search}`);
            }}
            className={cn(
              "inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-[12px] leading-none transition",
              locale === item ? "bg-ink text-inverse" : "text-mute hover:text-ink",
            )}
          >
            {localeLabels[item]}
          </Link>
        );
      })}
    </div>
  );
}
