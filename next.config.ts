import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // PERFORMANCE OPTIMIZATION: Enhanced experimental features
  experimental: {
    // This enables experimental optimizations for specific packages
    optimizePackageImports: [
      "lucide-react", 
      "framer-motion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog", 
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tabs",
      "recharts"
    ],
    // Enable modern bundling optimizations
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    },
  },

  // PERFORMANCE OPTIMIZATION: Enhanced webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Bundle analysis for development debugging
    if (dev && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: false
        })
      );
    }

    // PERFORMANCE OPTIMIZATION: Enhanced code splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Separate chunk for heavy UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|framer-motion)[\\/]/,
            name: 'ui-libs',
            chunks: 'all',
            priority: 20,
          },
          // Separate chunk for charts and data visualization
          charts: {
            test: /[\\/]node_modules[\\/](recharts|d3)[\\/]/,
            name: 'charts',
            chunks: 'all',
            priority: 15,
          },
          // Separate chunk for icons
          icons: {
            test: /[\\/]node_modules[\\/](@tabler\/icons-react|lucide-react)[\\/]/,
            name: 'icons',
            chunks: 'all',
            priority: 10,
          },
          // Default vendor chunk for other libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 5,
          },
        },
      },
    };

    // PERFORMANCE OPTIMIZATION: Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      // Tree-shake heavy libraries
      '@radix-ui/react-icons': '@radix-ui/react-icons/dist/index.esm.js'
    };

    return config;
  },

  // PERFORMANCE OPTIMIZATION: Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },

  // PERFORMANCE OPTIMIZATION: Headers for caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          }
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
