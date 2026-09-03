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
    { key: "role" as const, number: "01", label: copy.byRole, href: "/templates" },
    { key: "teams" as const, number: "02", label: copy.botTeams, href: "/templates/teams" },
    { key: "all" as const, number: "03", label: copy.allTemplates, href: "/templates/all" },
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
                "relative flex min-h-14 min-w-0 items-center justify-center gap-2 border-b-2 px-2 py-3 text-center text-[13px] leading-4 transition-colors sm:text-sm",
                current
                  ? "border-accent font-medium text-ink"
                  : "border-transparent text-mute hover:border-line-strong hover:text-ink",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "hidden font-mono text-[10px] tabular-nums sm:inline",
                  current ? "text-accent" : "text-faint",
                )}
              >
                {item.number}
              </span>
              <span className="min-w-0 text-balance">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
