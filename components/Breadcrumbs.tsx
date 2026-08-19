import { LocaleLink } from "@/components/LocaleLink";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-faint">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>→</span> : null}
            {item.href ? (
              <LocaleLink href={item.href} className="hover:text-ink">
                {item.label}
              </LocaleLink>
            ) : (
              <span className="text-mute">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
