import React from 'react';
import dynamic from 'next/dynamic';
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletMultiButton = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
    { ssr: false }
);

const Web3ConnectButton = () => {
    return (
        <WalletMultiButton />
    )
};

export { Web3ConnectButton };