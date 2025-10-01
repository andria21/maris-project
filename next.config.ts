import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hosts
      },
      {
        protocol: "http",
        hostname: "**", // allow http too (if needed)
      },
    ], // add any domains you want
  },
  experimental: {
    serverActions: {
      // increase the limit (example: 10MB)
      bodySizeLimit: "10mb",
    },
  },
  reactStrictMode: false,
};

export default nextConfig;
