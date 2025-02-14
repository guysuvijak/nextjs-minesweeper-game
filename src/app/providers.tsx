'use client'
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) {
        return (
            <>
                {children}
            </>
        )
    };

    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}

export default Providers;