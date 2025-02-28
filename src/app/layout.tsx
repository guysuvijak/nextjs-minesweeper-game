import { Geist, Geist_Mono } from 'next/font/google';
import { METADATA } from '@/configs';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LanguageProvider } from '@/providers/LanguageProvider'
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

const RootLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <html lang='en' className={`${geistSans.variable} ${geistMono.variable} antialiased font-system`}>
            <body>
                <ThemeProvider>
                    <LanguageProvider />
                    <main>
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    )
};

export default RootLayout;