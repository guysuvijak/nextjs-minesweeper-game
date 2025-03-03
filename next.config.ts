import type { NextConfig } from 'next';
import NextBundleAnalyzer from '@next/bundle-analyzer';
import createNextPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
});

const withPWA = createNextPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true
});

const nextConfig = {
    output: 'export',
    assetPrefix: isProd ? 'https://nextjs-minesweeper-game.vercel.app' : '',
    reactStrictMode: true,
    images: {
        unoptimized: true,
        formats: ['image/webp'],
        deviceSizes: [32, 64, 96],
        remotePatterns: [
            { protocol: 'https', hostname: 'www.google.com' },
            { protocol: 'https', hostname: 'nextjs-minesweeper-game.vercel.app' }
        ]
    }
} satisfies NextConfig;

export default isProd ? withPWA(nextConfig) : withBundleAnalyzer(nextConfig);