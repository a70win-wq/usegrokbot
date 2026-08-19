import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
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
        source: "/:locale(en|zh-hk|zh-cn)/apps",
        destination: "/:locale/integrations",
        permanent: true,
      },
      {
        source: "/:locale(en|zh-hk|zh-cn)/apps/:slug",
        destination: "/:locale/integrations/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
