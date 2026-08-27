import type { NextConfig } from "next";

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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.usegrokbot.com" }],
        destination: "https://usegrokbot.com/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/official",
        destination: "/:locale/roles",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/apps",
        destination: "/:locale/integrations",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/apps/:slug",
        destination: "/:locale/integrations/:slug",
        permanent: true,
      },

      {
        source: "/:locale(en|zh-hk|zh-cn)/prompts",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/saved",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/discover",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/learn",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/learn/:slug",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/categories/customer-support",
        destination: "/:locale/categories/operations",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/categories/hr",
        destination: "/:locale/categories/operations",
        permanent: true,
      },

      {
        source: "/:locale(en|zh-hk|zh-cn)/categories/productivity",
        destination: "/:locale/categories/personal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
