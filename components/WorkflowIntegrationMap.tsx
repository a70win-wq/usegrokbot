import { appsBySlug } from "@/data/apps";
import type { UseCase } from "@/data/types";
import { displayApps } from "@/lib/capabilities";
import { BotFace, botColorFor } from "./BotFace";
import { NamedIcon } from "./icons";

export function WorkflowIntegrationMap({ useCase, label }: { useCase: UseCase; label: string }) {
  const apps = displayApps(useCase).slice(0, 6);
  if (apps.length < 2) return null;

  return (
    <div
      className="relative mt-4 h-[210px] overflow-hidden rounded-2xl border border-line bg-elevated"
      role="img"
      aria-label={`${label}: apps connected through Grok Bot`}
    >
      <div className="absolute inset-x-0 top-3 text-center text-[10px] font-medium tracking-[0.12em] text-faint uppercase">
        {label}
      </div>

      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 100 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        {apps.map((app, index) => {
          const x = ((index + 1) / (apps.length + 1)) * 100;
          const bend = 100 + Math.abs(50 - x) * 0.25;
          const path = `M ${x} 58 C ${x} ${bend}, 50 ${bend}, 50 148`;
          return (
            <g key={app}>
              <path d={path} fill="none" stroke="currentColor" strokeWidth="0.55" className="text-line" />
              <path
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeDasharray="2.5 7"
                className="text-accent motion-reduce:hidden"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-19"
                  dur={`${1.15 + index * 0.13}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}
      </svg>

      {apps.map((app, index) => {
        const x = ((index + 1) / (apps.length + 1)) * 100;
        const item = appsBySlug[app];
        return (
          <div
            key={app}
            className="absolute top-[42px] z-10 flex -translate-x-1/2 flex-col items-center gap-1.5"
            style={{ left: `${x}%` }}
          >
            <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-card shadow-sm">
              <NamedIcon name={item.icon} className="size-4 text-ink" />
            </span>
            <span className="max-w-[84px] truncate text-[10px] text-mute">{item.name}</span>
          </div>
        );
      })}

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-accent/30 bg-card px-3 py-2 shadow-sm">
        <BotFace size={20} color={botColorFor(useCase.slug)} />
        <span className="text-[12px] font-medium text-ink">Grok Bot</span>
      </div>
    </div>
  );
}
