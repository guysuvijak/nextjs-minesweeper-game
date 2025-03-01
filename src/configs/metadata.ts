import type { Viewport, Metadata } from 'next';

export const VIEWPORT: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#000000'
}

export const METADATA: Metadata = {
    manifest: '/manifest.json',
    title: 'Minesweeper',
    description: 'A simple implementation of the classic Minesweeper game built with Next.js. This project showcases the use of React components and modern front-end development techniques. Players can enjoy the Minesweeper game experience directly in their browser, with a clean and responsive UI.',
    openGraph: {
        title: 'Minesweeper',
        description: 'A simple implementation of the classic Minesweeper game built with Next.js. This project showcases the use of React components and modern front-end development techniques. Players can enjoy the Minesweeper game experience directly in their browser, with a clean and responsive UI.',
        url: 'https://nextjs-minesweeper-game.vercel.app/',
        siteName: 'Minesweeper',
        images: [
            {
                url: 'https://nextjs-minesweeper-game.vercel.app/metadata/manifest.webp',
                width: 1200,
                height: 630
            }
        ]
    },
    keywords: ['Minesweeper', 'nextjs', 'game-website', 'meteorviix'],
    authors: [
        { name: 'Minesweeper' },
        {
            name: 'Minesweeper',
            url: 'https://nextjs-minesweeper-game.vercel.app/',
        },
    ],
    icons: [
        { rel: 'apple-touch-icon', url: 'icon/icon-128x128.png' },
        { rel: 'icon', url: 'icon/icon-128x128.png' },
    ],
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Minesweeper'
    },
    applicationName: 'Minesweeper',
    formatDetection: {
        telephone: false
    }
};