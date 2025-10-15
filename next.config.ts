import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pin tracing root to silence lockfile workspace root inference warnings
  outputFileTracingRoot: process.cwd(),
  experimental: {
    // Disable Segment Explorer to avoid client-manifest errors in dev on some setups
    devtoolSegmentExplorer: false,
  },
  // Enable standalone output for Docker
  output: 'standalone',
};

export default nextConfig;
