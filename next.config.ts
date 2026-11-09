import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["sponge-legwarmer-defection.ngrok-free.dev"],

  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
};

export default nextConfig;
