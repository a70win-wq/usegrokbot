"use client";

import Script from "next/script";

declare global {
  interface Window {
    twttr?: { widgets: { load: () => void } };
  }
}

export function XPostEmbed({ url }: { url: string }) {
  return (
    <div className="min-h-[120px]">
      <blockquote className="twitter-tweet">
        <a href={url}>View original post on X</a>
      </blockquote>
      <Script
        src="https://platform.x.com/widgets.js"
        strategy="lazyOnload"
        onReady={() => {
          window.twttr?.widgets?.load();
        }}
      />
    </div>
  );
}
