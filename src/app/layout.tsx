import { Geist, Geist_Mono } from 'next/font/google';
import { VIEWPORT, METADATA } from '@/configs';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { Web3Provider } from '@/providers/Web3Provider';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const viewport = VIEWPORT;
export const metadata = METADATA;

const RootLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <html lang='en' className={`${geistSans.variable} ${geistMono.variable} antialiased font-system`}>
            <body>
                <ThemeProvider>
                    <LanguageProvider />
                        <Web3Provider>
                            <main>
                                {children}
                            </main>
                        </Web3Provider>
                </ThemeProvider>
            </body>
        </html>
    )
};

export default RootLayout;