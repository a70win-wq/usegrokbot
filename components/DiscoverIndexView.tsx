"use client";

import { useEffect, useState } from "react";
import { DiscoverFeed } from "@/components/DiscoverFeed";
import { JsonLd } from "@/components/JsonLd";
import { SearchBar } from "@/components/SearchBar";
import { discoverStories, type DiscoverTab } from "@/data/discover";
import { useI18n } from "@/lib/i18n";
import { SEARCH_UI_ENABLED } from "@/lib/search";

export function DiscoverIndexView({
  initialQuery = "",
  initialTab = "latest",
}: {
  initialQuery?: string;
  initialTab?: DiscoverTab;
}) {
  const { t, absoluteHref } = useI18n();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  }, [query]);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("discover.title"),
          description: t("discover.body"),
          url: absoluteHref("/discover"),
          numberOfItems: discoverStories.length,
        }}
      />
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">{t("discover.title")}</h1>
      <p className="mt-3 max-w-2xl text-base text-mute">{t("discover.body")}</p>
      {SEARCH_UI_ENABLED ? (
        <div className="mt-8">
          <SearchBar variant="inline" initialQuery={initialQuery} onQueryChange={setQuery} stayOnPage />
        </div>
      ) : null}
      <div className="mt-10">
        <DiscoverFeed query={query} initialTab={initialTab} />
      </div>
    </div>
  );
}
