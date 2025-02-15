import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/app/providers';
import { METADATA } from '@/configs';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = METADATA;

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