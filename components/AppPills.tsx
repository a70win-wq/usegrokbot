import { LocaleLink } from "@/components/LocaleLink";
import { appsBySlug } from "@/data/apps";
import type { AppSlug } from "@/data/types";
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
