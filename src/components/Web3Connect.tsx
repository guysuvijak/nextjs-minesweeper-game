import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const WalletAdapterStyles = () => {
    useEffect(() => {
        import('@solana/wallet-adapter-react-ui/styles.css').catch(err => console.error('Failed to load wallet styles:', err));
    }, []);
    
    return null;
};

const WalletMultiButton = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false }
);

const Web3ConnectButton = () => {
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <>
            <WalletAdapterStyles />
            {mounted && <WalletMultiButton />}
        </>
    )
};

export { Web3ConnectButton };