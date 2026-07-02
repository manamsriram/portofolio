// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Portofolio',       // Must match your repo name exactly
  assetPrefix: '/Portofolio/',
  images: {
    unoptimized: true,           // Required — Next.js Image Optimization needs a server
  },
};

export default nextConfig;
