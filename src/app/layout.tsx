import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/app/providers';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
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
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang='en' className={`${geistSans.variable} ${geistMono.variable} antialiased font-system`}>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
};