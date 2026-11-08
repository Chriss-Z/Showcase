import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/Showcase",

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["sponge-legwarmer-defection.ngrok-free.dev"],
};

export default nextConfig;
