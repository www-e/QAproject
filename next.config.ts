import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // This will remove all console.log statements from the production build.
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    // This enables experimental optimizations for specific packages,
    // which can lead to a smaller final bundle size.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;