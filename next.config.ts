import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/portfolio',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;