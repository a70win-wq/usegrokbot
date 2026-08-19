"use client";

import { useMemo, useState } from "react";
import { defaultCustomizeFields } from "@/data/defaults";
import type { UseCase } from "@/data/types";
import { useI18n } from "@/lib/i18n";
import { PromptBox } from "./PromptBox";

const fieldKeys = ["company", "industry", "focus", "frequency", "destination"] as const;

export function CustomizePrompt({ useCase }: { useCase: UseCase }) {
  const { t } = useI18n();
  const fields = useCase.customizeFields ?? defaultCustomizeFields;
  const [values, setValues] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState<string | null>(null);
  const preview = useMemo(() => generated, [generated]);

  function labelFor(key: string, fallback: string) {
    return fieldKeys.includes(key as (typeof fieldKeys)[number]) ? t(`customize.${key}`) : fallback;
  }

  function generate() {
    const lines = fields
      .map((field) => {
        const value = values[field.key]?.trim();
        return value ? `- ${labelFor(field.key, field.label)}: ${value}` : null;
      })
      .filter(Boolean);

    const block = lines.length > 0 ? `Use this context when you run:\n${lines.join("\n")}\n\n` : "";
    setGenerated(`${block}${useCase.prompt}`);
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="block sm:last:odd:col-span-2">
            <span className="mb-1.5 block text-[12px] font-medium text-faint">
              {labelFor(field.key, field.label)}
            </span>
            <input
              value={values[field.key] ?? ""}
              placeholder={field.placeholder}
              onChange={(event) =>
                setValues((current) => ({ ...current, [field.key]: event.target.value }))
              }
              className="h-11 w-full rounded-[10px] border border-line bg-input px-3 text-sm text-ink placeholder:text-faint"
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={generate}
        className="spring-press mt-5 inline-flex h-11 items-center rounded-[10px] bg-ink px-4 text-sm text-inverse hover:opacity-90"
      >
        {t("detail.generate")}
      </button>
      {preview ? (
        <div className="mt-5">
          <PromptBox prompt={preview} title={t("detail.yourVersion")} />
        </div>
      ) : null}
    </div>
  );
}
