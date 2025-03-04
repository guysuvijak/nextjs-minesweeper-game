'use client'
import React, { useEffect, useMemo, useCallback } from 'react';
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import useWalletStore from '@/stores/walletStore';

const networkRPC = process.env.NETWORK_RPC as 'mainnet' | 'testnet' | 'devnet';

export interface SolanaProviderProps {
    children: React.ReactNode;
};

const WalletStateUpdater = () => {
    const { publicKey, connected, connecting } = useWallet();
    const { setConnected, setPublicKey, setConnecting } = useWalletStore();

    const publicKeyString = useMemo(() => publicKey?.toString() || null, [publicKey]);
    
    const updateWalletState = useCallback(() => {
        setConnected(connected);
        
        if (publicKeyString !== useWalletStore.getState().publicKey) {
            setPublicKey(publicKeyString);
        }
        
        if (connecting !== useWalletStore.getState().connecting) {
            setConnecting(connecting);
        }
    }, [connected, publicKeyString, connecting, setConnected, setPublicKey, setConnecting]);
    
    useEffect(() => {
        updateWalletState();
    }, [updateWalletState]);
    
    return null;
};

const SolanaProvider = ({ children }: SolanaProviderProps) => {
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
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter()
    ], []);

    const walletConfig = useMemo(() => ({
        wallets,
        autoConnect: true
    }), [wallets]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider {...walletConfig}>
                <WalletModalProvider>
                    <WalletStateUpdater />
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
};

export default SolanaProvider;