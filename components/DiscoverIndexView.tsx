"use client";

import { useState } from "react";
import { DiscoverFeed } from "@/components/DiscoverFeed";
import { JsonLd } from "@/components/JsonLd";
import { SearchBar } from "@/components/SearchBar";
import { discoverStories } from "@/data/discover";
import { useI18n } from "@/lib/i18n";

export function DiscoverIndexView() {
  const { t, absoluteHref } = useI18n();
  const [query, setQuery] = useState("");

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
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
      <div className="mt-8">
        <SearchBar variant="inline" onQueryChange={setQuery} stayOnPage />
      </div>
      <div className="mt-10">
        <DiscoverFeed query={query} />
      </div>
    </div>
  );
}
