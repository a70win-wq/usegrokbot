"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

function isPublicXUrl(value: string) {
  try {
    const url = new URL(value);
    return /^(www\.)?(x\.com|twitter\.com)$/i.test(url.hostname) && url.pathname.length > 1;
  } catch {
    return false;
  }
}

export default function SubmitPage() {
  const { t } = useI18n();
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const xUrl = String(form.get("xUrl") ?? "").trim();
    if (!xUrl) {
      setError(t("submit.missing"));
      return;
    }
    if (!isPublicXUrl(xUrl)) {
      setError(t("submit.invalidUrl"));
      return;
    }

    const title = `Ingest use case: ${xUrl}`;
    const body = [
      "## X post URL",
      xUrl,
      "",
      "## Prompt",
      String(form.get("prompt") ?? "").trim() || "Not provided",
      "",
      "## Notes",
      String(form.get("notes") ?? "").trim() || "Not provided",
      "",
      "## Ingest",
      "Extract name, @handle, post date, title, what they built, apps / integrations, result or output, category, trust status, and the original X source.",
      "Do not invent result numbers. If the post has no number, publish it as Output.",
    ].join("\n");

    const url = `https://github.com/${site.githubRepo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <div className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{t("submit.title")}</h1>
      <p className="mt-3 text-base text-mute">{t("submit.body")}</p>
      <p className="mt-2 text-sm text-faint">{t("submit.review")}</p>
      <p className="mt-2 text-sm text-faint">
        {t("submit.githubHint")}{" "}
        <a href={`${site.githubUrl}/issues`} className="text-accent" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <Field name="xUrl" label={t("submit.xUrl")} required placeholder="https://x.com/..." />
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-faint">{t("submit.prompt")}</span>
          <textarea
            name="prompt"
            rows={8}
            className="w-full rounded-[10px] border border-line bg-input px-3 py-2.5 font-mono text-[13px] text-ink"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-faint">{t("submit.notes")}</span>
          <textarea
            name="notes"
            rows={4}
            placeholder={t("submit.notesHint")}
            className="w-full rounded-[10px] border border-line bg-input px-3 py-2.5 text-sm text-ink placeholder:text-faint"
          />
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <button
          type="submit"
          className="accent-gradient h-11 rounded-[10px] px-5 text-sm font-medium text-inverse"
        >
          {t("submit.send")}
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  required,
  placeholder,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-faint">{label}</span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-[10px] border border-line bg-input px-3 text-sm text-ink placeholder:text-faint"
      />
    </label>
  );
}
