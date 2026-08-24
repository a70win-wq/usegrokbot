"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { openExternalUrl } from "@/lib/open-external";

const WIDGET_SRC = "https://platform.x.com/widgets.js";

declare global {
  interface Window {
    twttr?: { widgets: { load: () => void } };
  }
}

function canLoadXWidgets() {
  const host = window.location.hostname;
  return window.location.protocol === "https:" && host !== "localhost" && host !== "127.0.0.1";
}

export function XPostEmbed({ url }: { url: string }) {
  const { t } = useI18n();
  const [embed, setEmbed] = useState(false);

  useEffect(() => {
    if (!canLoadXWidgets()) return;
    setEmbed(true);

    function loadWidgets() {
      window.twttr?.widgets?.load();
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`);
    if (existing) {
      loadWidgets();
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = loadWidgets;
    document.body.appendChild(script);
  }, [url]);

  if (!embed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => openExternalUrl(url, event)}
        className="inline-flex h-11 items-center rounded-[10px] border border-line px-4 text-sm text-mute hover:border-line-strong hover:text-ink"
      >
        {t("discover.viewOriginalX")} ↗
      </a>
    );
  }

  return (
    <div className="min-h-[120px]">
      <blockquote className="twitter-tweet">
        <a href={url}>View original post on X</a>
      </blockquote>
    </div>
  );
}
