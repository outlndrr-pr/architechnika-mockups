import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16: quality values used with next/image must be allowlisted.
    qualities: [60, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
    ],
  },
};

export default nextConfig;
