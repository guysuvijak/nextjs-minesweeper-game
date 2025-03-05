import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
    connected: boolean;
    publicKey: string | null;
    connecting: boolean;
    
    setConnected: (status: boolean) => void;
    setPublicKey: (key: string | null) => void;
    setConnecting: (status: boolean) => void;
};

export const useWalletStore = create<WalletState>()(
    persist(
        (set) => ({
            connected: false,
            publicKey: null,
            connecting: false,
            
            setConnected: (status) => set({ connected: status }),
            setPublicKey: (key) => set({ publicKey: key }),
            setConnecting: (status) => set({ connecting: status })
        }),
        {
            name: 'wallet-storage',
            partialize: (state) => ({ 
                connected: state.connected, 
                publicKey: state.publicKey 
            }),
        }
    )
);