"use client";

import type { UseCase } from "@/data/types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

const statusClass = {
  alert: "bg-danger",
  watch: "bg-warn",
  ok: "bg-ok",
};

export function ExampleOutput({ example }: { example: UseCase["exampleOutput"] }) {
  const { t } = useI18n();

  return (
    <div className="rounded-[16px] border border-line bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] md:p-6">
      <p className="font-mono text-[11px] font-medium tracking-wide text-faint uppercase">{t("detail.example")}</p>
      <h3 className="mt-2 text-lg font-medium tracking-tight text-ink">{example.title}</h3>
      <div className="mt-5 space-y-5">
        {example.items.map((item) => (
          <div key={item.name} className="border-t border-line pt-5 first:border-t-0 first:pt-0">
            <div className="flex items-start gap-3">
              <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", statusClass[item.status])} />
              <div>
                <div className="text-sm font-medium text-ink">{item.name}</div>
                <p className="mt-1.5 text-sm leading-6 text-mute">{item.summary}</p>
                {item.why ? (
                  <p className="mt-2 text-sm leading-6 text-mute">
                    <span className="text-faint">{t("detail.why")}</span>
                    {item.why}
                  </p>
                ) : null}
                {item.action ? (
                  <p className="mt-2 text-sm leading-6 text-mute">
                    <span className="text-faint">{t("detail.action")}</span>
                    {item.action}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
