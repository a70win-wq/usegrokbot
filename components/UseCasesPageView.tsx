"use client";

import { JsonLd } from "@/components/JsonLd";
import { UseCasesExplorer } from "@/components/UseCasesExplorer";
import { useCases } from "@/data/use-cases";
import { useI18n } from "@/lib/i18n";

export function UseCasesPageView({
  initialQuery,
  initialOfficial = false,
}: {
  initialQuery: string;
  initialOfficial?: boolean;
}) {
  const { t, absoluteHref } = useI18n();

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Grok Bot use cases",
          numberOfItems: useCases.length,
          itemListElement: useCases.slice(0, 20).map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
            url: absoluteHref(`/use-cases/${item.slug}`),
          })),
        }}
      />
      <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
        {t("pages.useCasesTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-mute">
        {t("pages.useCasesBody", { n: useCases.length })}
      </p>
      <div className="mt-8">
        <UseCasesExplorer items={useCases} initialQuery={initialQuery} initialOfficial={initialOfficial} />
      </div>
    </div>
  );
}
