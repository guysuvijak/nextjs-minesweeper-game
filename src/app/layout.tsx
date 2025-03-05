import { VIEWPORT, METADATA } from '@/configs';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { Web3Provider } from '@/providers/Web3Provider';
import { FontProvider } from '@/providers/FontProvider';
import './globals.css';

export const viewport = VIEWPORT;
export const metadata = METADATA;

const RootLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <html lang='en'>
            <body>
                <ThemeProvider>
                    <LanguageProvider />
                        <FontProvider>
                            <Web3Provider>
                                <main>
                                    {children}
                                </main>
                            </Web3Provider>
                        </FontProvider>
                </ThemeProvider>
            </body>
        </html>
    )
};

export default RootLayout;