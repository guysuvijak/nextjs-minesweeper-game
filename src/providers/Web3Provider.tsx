'use client'
import React, { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { SolflareWalletAdapter, TorusWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider } from '@solana/wallet-adapter-react';  
import { clusterApiUrl } from '@solana/web3.js';
import { useTheme } from 'next-themes';

const networkRPC = process.env.NETWORK_RPC as 'mainnet' | 'testnet' | 'devnet';

const WalletProvider = dynamic(
    () => import('@solana/wallet-adapter-react').then(mod => mod.WalletProvider),
    { ssr: false }
);

const WalletModalProvider = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider),
    { ssr: false }
);

export interface Web3ProviderProps {
    children: React.ReactNode;
};

const Web3Provider = ({ children }: Web3ProviderProps) => {
    const { theme } = useTheme();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme || 'dark');
    }, [theme]);

    const network = useMemo(() => {
        switch(networkRPC) {
            case 'mainnet':
                return WalletAdapterNetwork.Mainnet;
            case 'testnet':
                return WalletAdapterNetwork.Testnet;
            case 'devnet':
            default:
                return WalletAdapterNetwork.Devnet;
        }
    }, []);
    
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter()
    ], [network]);
 
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default dynamic(() => Promise.resolve(Web3Provider), { ssr: false });