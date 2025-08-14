import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Avoid hitting /_next/image in environments where the optimizer isn't reachable
    unoptimized: true,
  },
};

export default nextConfig;
