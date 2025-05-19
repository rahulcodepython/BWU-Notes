import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Optional: Configure if needed
    webpackDevMiddleware: (config: any) => {
        config.watchOptions = {
            poll: 500, // Faster polling (every 500ms)
            aggregateTimeout: 300, // Same as before
            ignored: ['**/.git', '**/.next', '**/node_modules'] // Explicitly ignore non-source dirs
        };
        return config;
    },
};

export default nextConfig;
