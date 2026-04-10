import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "*.firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "grainy-gradients.vercel.app",
      },
    ],
  },
  // Compress responses
  compress: true,
};

export default nextConfig;
