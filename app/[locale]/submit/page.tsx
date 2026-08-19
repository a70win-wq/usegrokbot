"use client";

import { useState } from "react";
import { LocaleLink } from "@/components/LocaleLink";
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

type IngestResponse = {
  status: "published" | "queued" | "extracted" | "skipped";
  slug?: string;
  url?: string;
  prUrl?: string;
  reason?: string;
  story?: { title?: string; slug?: string };
};

export default function SubmitPage() {
  const { t } = useI18n();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<IngestResponse | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const xUrl = String(form.get("xUrl") ?? "").trim();
    const prompt = String(form.get("prompt") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    if (!xUrl) {
      setError(t("submit.missing"));
      return;
    }
    if (!isPublicXUrl(xUrl)) {
      setError(t("submit.invalidUrl"));
      return;
    }

    setSending(true);
    setError("");
    setDone(null);
    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xUrl, prompt, notes }),
      });
      const data = (await response.json()) as IngestResponse;
      if (data.status === "skipped") {
        setError(data.reason || t("submit.skipped"));
        return;
      }
      if (data.status === "extracted") {
        const title = `Ingest use case: ${xUrl}`;
        const body = [
          "## X post URL",
          xUrl,
          "",
          "## Prompt",
          prompt || "Not provided",
          "",
          "## Notes",
          notes || "Not provided",
          "",
          "```json",
          JSON.stringify(data.story ?? {}, null, 2),
          "```",
        ].join("\n");
        window.location.href = `https://github.com/${site.githubRepo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
        return;
      }
      setDone(data);
    } catch {
      setError(t("submit.failed"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{t("submit.title")}</h1>
      <p className="mt-3 text-base text-mute">{t("submit.body")}</p>
      <p className="mt-2 text-sm text-faint">{t("submit.review")}</p>

      {done ? (
        <div className="mt-10 rounded-2xl border border-line bg-elevated px-5 py-8">
          <p className="text-lg font-medium text-ink">
            {done.status === "published" ? t("submit.published") : t("submit.queued")}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {done.url ? (
              <LocaleLink href={done.url} className="accent-gradient inline-flex h-11 items-center rounded-[10px] px-4 text-sm font-medium">
                {t("submit.viewStory")}
              </LocaleLink>
            ) : null}
            {done.prUrl ? (
              <a
                href={done.prUrl}
                className="inline-flex h-11 items-center rounded-[10px] border border-line px-4 text-sm text-ink"
                target="_blank"
                rel="noreferrer"
              >
                {t("submit.viewPr")}
              </a>
            ) : null}
          </div>
        </div>
      ) : (
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
            disabled={sending}
            className="accent-gradient h-11 rounded-[10px] px-5 text-sm font-medium text-inverse disabled:opacity-60"
          >
            {sending ? t("submit.sending") : t("submit.send")}
          </button>
        </form>
      )}
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
