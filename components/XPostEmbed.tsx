"use client";

import { useEffect } from "react";

const WIDGET_SRC = "https://platform.x.com/widgets.js";

declare global {
  interface Window {
    twttr?: { widgets: { load: () => void } };
  }
}

export function XPostEmbed({ url }: { url: string }) {
  useEffect(() => {
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

  return (
    <div className="min-h-[120px]">
      <blockquote className="twitter-tweet">
        <a href={url}>View original post on X</a>
      </blockquote>
    </div>
  );
}
