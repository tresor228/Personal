import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [95, 75, 50],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
