import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.noroff.dev",
      },
      {
        protocol: "https",
        hostname: "static.cloud.noroff.dev",
      },
    ],
  },
};

export default nextConfig;
