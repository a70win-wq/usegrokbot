"use client";

import { useState } from "react";
import { categories } from "@/data/categories";
import { localizeCategory, useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function SubmitPage() {
  const { locale, t } = useI18n();
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const does = String(form.get("does") ?? "").trim();
    const prompt = String(form.get("prompt") ?? "").trim();
    if (!name || !does || !prompt) {
      setError(t("submit.missing"));
      return;
    }

    const title = `Community use case: ${name}`;
    const body = [
      "## What it does",
      does,
      "",
      "## Category",
      String(form.get("category") ?? ""),
      "",
      "## Apps",
      String(form.get("apps") ?? "Not specified"),
      "",
      "## Prompt",
      "```",
      prompt,
      "```",
      "",
      "## Submitted by",
      String(form.get("author") ?? "Anonymous"),
      String(form.get("link") ?? ""),
    ].join("\n");

    const url = `https://github.com/${site.githubRepo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <div className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{t("submit.title")}</h1>
      <p className="mt-3 text-base text-mute">{t("submit.body")}</p>
      <p className="mt-2 text-sm text-faint">
        {t("submit.githubHint")}{" "}
        <a href={`${site.githubUrl}/issues`} className="text-accent" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <Field name="name" label={t("submit.name")} required />
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-faint">{t("submit.does")}</span>
          <textarea
            name="does"
            required
            rows={4}
            className="w-full rounded-[10px] border border-line bg-input px-3 py-2.5 text-sm text-ink"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-faint">{t("submit.category")}</span>
          <select
            name="category"
            className="h-11 w-full rounded-[10px] border border-line bg-input px-3 text-sm text-ink"
            defaultValue="sales"
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {localizeCategory(category, locale).name}
              </option>
            ))}
          </select>
        </label>
        <Field name="apps" label={t("submit.apps")} placeholder="Gmail, Slack" />
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium text-faint">{t("submit.prompt")}</span>
          <textarea
            name="prompt"
            required
            rows={8}
            className="w-full rounded-[10px] border border-line bg-input px-3 py-2.5 font-mono text-[13px] text-ink"
          />
        </label>
        <Field name="author" label={t("submit.author")} />
        <Field name="link" label={t("submit.link")} />
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
