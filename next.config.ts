import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Images are already optimized via Cloudinary CDN
  },
};

export default nextConfig;