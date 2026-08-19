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
    ];
  },
};

export default nextConfig;
