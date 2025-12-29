import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for better SEO and deployment flexibility
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    unoptimized: true, // For static export
  },
  // Ensure trailing slashes for consistent routing
  trailingSlash: true,
};

export default nextConfig;
