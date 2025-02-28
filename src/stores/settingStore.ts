import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SettingStateProps } from '@/types';

export const useSettingStore = create<SettingStateProps>()(
    persist(
        (set) => ({
            isMenuSettingOpen: false,
            flagIcon: 'default',
            bombIcon: 'default',
            numberStyle: 'default',
            setIsMenuSettingOpen: (isMenuSettingOpen) => set({ isMenuSettingOpen }),
            setFlagIcon: (flagIcon) => set({ flagIcon }),
            setBombIcon: (bombIcon) => set({ bombIcon }),
            setNumberStyle: (numberStyle) => set({ numberStyle }),
        }),
        {
            name: 'setting-storage',
            partialize: (state) => ({
                flagIcon: state.flagIcon,
                bombIcon: state.bombIcon,
                numberStyle: state.numberStyle
            }),
        }
    )
);