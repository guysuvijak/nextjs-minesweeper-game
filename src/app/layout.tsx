import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Thai } from 'next/font/google';
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

const notoSansThai = Noto_Sans_Thai({
    variable: '--font-noto-sans-thai',
    subsets: ['thai'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Mineswapper',
    description: 'NextJS Mineswapper simple gameplay',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} font-noto-sans antialiased`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
};