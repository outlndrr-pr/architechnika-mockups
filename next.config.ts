import type { NextConfig } from "next";

// DEPLOY_TARGET=pages produces a static export served from
// https://outlndrr-pr.github.io/architechnika-mockups/
const isPages = process.env.DEPLOY_TARGET === "pages";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export" as const,
        basePath: "/architechnika-mockups",
        trailingSlash: true,
      }
    : {}),
  images: {
    // Next 16: quality values used with next/image must be allowlisted.
    qualities: [60, 75, 90],
    // Static export has no image optimizer; sources are already CDN-sized.
    unoptimized: isPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
    ],
  },
};

export default nextConfig;
