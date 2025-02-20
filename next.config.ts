import { NextConfig } from "next";

const nextConfig: NextConfig = {
  ExperimentalTurboOptions: {
    turbo: false, // Turbopack'i devre dışı bırakıyoruz
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
