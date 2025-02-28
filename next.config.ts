import type { NextConfig } from 'next';
import NextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
});

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
        formats: ['image/webp'],
        deviceSizes: [32, 64, 96],
        remotePatterns: [
            { hostname: 'www.google.com' },
            { hostname: 'www.nextjs-minesweeper-game.vercel.app'}
        ]
    }
};

export default withBundleAnalyzer(nextConfig);