import { LocaleLink } from "@/components/LocaleLink";
import { appsBySlug } from "@/data/apps";
import type { AppSlug, UseCase } from "@/data/types";
import { cn } from "@/lib/cn";
import { displayApps } from "@/lib/capabilities";
import { NamedIcon } from "./icons";

export function AppNamePills({ apps }: { apps: AppSlug[] }) {
  return (
    <div className="relative z-10 flex flex-wrap gap-1.5">
      {apps.map((app) => (
        <LocaleLink
          key={app}
          href={`/integrations/${app}`}
          className="inline-flex items-center gap-1 rounded-full bg-elevated px-2 py-0.5 text-[11px] text-mute hover:text-ink"
        >
          <NamedIcon name={appsBySlug[app].icon} className="size-3" />
          {appsBySlug[app].name}
        </LocaleLink>
      ))}
    </div>
  );
}

export function AppPills({
  useCase,
  highlight,
}: {
  useCase: UseCase;
  highlight?: AppSlug;
}) {
  const extras = new Set(useCase.alsoUses ?? []);

  return (
    <div className="flex flex-wrap gap-1.5">
      {displayApps(useCase).map((app) => (
        <LocaleLink
          key={app}
          href={`/integrations/${app}`}
          className={cn(
            "relative z-10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]",
            highlight === app
              ? "bg-accent-soft text-accent"
              : extras.has(app)
                ? "bg-elevated text-faint"
                : "bg-elevated text-mute hover:text-ink",
          )}
        >
          <NamedIcon name={appsBySlug[app].icon} className="size-3" />
          {appsBySlug[app].name}
        </LocaleLink>
      ))}
    </div>
  );
}
