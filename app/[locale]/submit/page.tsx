"use client";

import { useState } from "react";
import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { celebrate } from "@/lib/celebrate";
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

function identityFromXUrl(value: string) {
  try {
    const url = new URL(value.trim());
    if (!/^(www\.)?(x\.com|twitter\.com)$/i.test(url.hostname)) return "";
    return decodeURIComponent(url.pathname.split("/").filter(Boolean)[0] ?? "").replace(/^@/, "");
  } catch {
    return "";
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
  const { t, locale } = useI18n();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<IngestResponse | null>(null);
  const [xUrlPreview, setXUrlPreview] = useState("");
  const handle = identityFromXUrl(xUrlPreview);
  const identitySeed = handle || "your-grok-bot";
  const copy = identityCopy(locale);

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
      void celebrate("submit");
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
          <div className="flex items-center gap-4">
            <BlobatarAvatar name={identitySeed} size={56} expression="love" />
            <div>
              <p className="text-lg font-medium text-ink">
                {done.status === "published" ? t("submit.published") : t("submit.queued")}
              </p>
              {handle ? <p className="mt-1 text-[13px] text-faint">@{handle}</p> : null}
            </div>
          </div>
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
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-faint">{t("submit.xUrl")}</span>
            <input
              name="xUrl"
              required
              placeholder="https://x.com/..."
              value={xUrlPreview}
              onChange={(event) => setXUrlPreview(event.target.value)}
              className="h-11 w-full rounded-[10px] border border-line bg-input px-3 text-sm text-ink placeholder:text-faint"
            />
          </label>

          <div className="flex items-center gap-4 rounded-2xl border border-line bg-elevated px-4 py-4">
            <BlobatarAvatar name={identitySeed} size={72} expression={handle ? "happy" : "thinking"} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{copy.title}</p>
              <p className="mt-1 truncate text-[13px] text-mute">
                {handle ? `@${handle}` : copy.placeholderName}
              </p>
              <p className="mt-1 text-[12px] leading-5 text-faint">{copy.body}</p>
            </div>
          </div>

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

function identityCopy(locale: string) {
  if (locale === "zh-Hant") {
    return {
      title: "你的 UseGrokBot 身份",
      body: "貼上 X URL，就會即時生成你的社群 Blob。同一個 handle 永遠是同一隻。",
      placeholderName: "你的 Grok Bot",
    };
  }
  if (locale === "zh-Hans") {
    return {
      title: "你的 UseGrokBot 身份",
      body: "贴上 X URL，就会即时生成你的社区 Blob。同一个 handle 永远是同一只。",
      placeholderName: "你的 Grok Bot",
    };
  }
  if (locale === "ja") {
    return {
      title: "あなたの UseGrokBot の姿",
      body: "X の URL を貼ると、コミュニティ用の Blob がすぐに現れます。同じ handle なら、いつも同じ姿です。",
      placeholderName: "あなたの Grok Bot",
    };
  }
  return {
    title: "Your UseGrokBot identity",
    body: "Paste an X URL to reveal your community Blob. Same handle, same creature every time.",
    placeholderName: "Your Grok Bot",
  };
}
