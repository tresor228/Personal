import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  images: {
    qualities: [95, 75, 50], // Qualités autorisées pour les images (95 est utilisé dans vos projets)
  },
};

export default nextConfig;
