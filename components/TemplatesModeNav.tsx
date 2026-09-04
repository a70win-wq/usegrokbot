import Link from "next/link";
import { cn } from "@/lib/cn";
import { withLocale, type UrlLocale } from "@/lib/i18n/paths";
import { templateHubUiCopy } from "@/data/template-types";
import type { Locale } from "@/lib/i18n/types";

export type TemplatesMode = "role" | "teams" | "all";

export function TemplatesModeNav({
  active,
  locale,
  urlLocale,
}: {
  active: TemplatesMode;
  locale: Locale;
  urlLocale: UrlLocale;
}) {
  const copy = templateHubUiCopy[locale];
  const items = [
    { key: "role" as const, label: copy.byRole, href: "/templates" },
    { key: "teams" as const, label: copy.botTeams, href: "/templates/teams" },
    { key: "all" as const, label: copy.allTemplates, href: "/templates/all" },
  ];

  return (
    <nav aria-label={copy.navLabel} data-templates-mode-nav>
      <div className="grid grid-cols-3 border-b border-line">
        {items.map((item) => {
          const current = active === item.key;
          return (
            <Link
              key={item.key}
              href={withLocale(item.href, urlLocale)}
              aria-current={current ? "page" : undefined}
              className={cn(
                "relative flex min-h-[72px] min-w-0 items-center justify-center px-2 py-3 text-center text-base leading-5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:min-h-20 sm:px-4 sm:text-lg",
                current
                  ? "font-medium text-ink"
                  : "text-mute hover:bg-elevated hover:text-ink",
              )}
            >
              <span className="min-w-0 text-balance">{item.label}</span>
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3 -bottom-px h-0.5 origin-center rounded-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  current ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
