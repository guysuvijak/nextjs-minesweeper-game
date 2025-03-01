import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SettingStateProps } from '@/types';

export const useSettingStore = create<SettingStateProps>()(
    persist(
        (set) => ({
            isMenuSettingOpen: false,
            flagIcon: 'default',
            flagColor: '#FF0000',
            bombIcon: 'default',
            numberStyle: 'default',
            setIsMenuSettingOpen: (isMenuSettingOpen) => set({ isMenuSettingOpen }),
            setFlagIcon: (flagIcon) => set({ flagIcon }),
            setFlagColor: (flagColor) => set({ flagColor }),
            setBombIcon: (bombIcon) => set({ bombIcon }),
            setNumberStyle: (numberStyle) => set({ numberStyle }),
        }),
        {
            name: 'setting-storage',
            partialize: (state) => ({
                flagIcon: state.flagIcon,
                flagColor: state.flagColor,
                bombIcon: state.bombIcon,
                numberStyle: state.numberStyle
            }),
        }
    )
);