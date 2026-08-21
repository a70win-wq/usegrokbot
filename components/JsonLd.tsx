import Script from "next/script";
import { jsonLd } from "@/lib/seo";

function scriptId(html: string) {
  let hash = 2166136261;
  for (let i = 0; i < html.length; i += 1) {
    hash ^= html.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `jsonld-${(hash >>> 0).toString(36)}`;
}

export function JsonLd({ data }: { data: unknown }) {
  const html = jsonLd(data);
  return (
    <Script id={scriptId(html)} type="application/ld+json" strategy="afterInteractive">
      {html}
    </Script>
  );
}
