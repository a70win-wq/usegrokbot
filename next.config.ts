import type { NextConfig } from "next";
import {
  legacyPageRedirects,
  urlReductionRedirects,
} from "./lib/url-reduction-redirects";

type ConfiguredRedirects = Awaited<
  ReturnType<NonNullable<NextConfig["redirects"]>>
>;

export function configuredRedirects(): ConfiguredRedirects {
  return [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.usegrokbot.com" }],
      destination: "https://usegrokbot.com/:path*",
      permanent: true,
    },
    ...legacyPageRedirects(),
    ...urlReductionRedirects(),
  ];
}

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  async headers() {
    return [
      {
        source: "/card.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
          { key: "Content-Type", value: "image/jpeg" },
        ],
      },
      {
        source: "/poster.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
          { key: "Content-Type", value: "image/png" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
    ];
  },
  redirects: configuredRedirects,
};

export default nextConfig;
