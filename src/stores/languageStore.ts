import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageStateProps } from '@/types';

export const useLanguageStore = create<LanguageStateProps>()(
    persist(
        (set) => ({
            lang: 'en',
            setLang: (lang) => set({ lang })
        }),
        { name: 'language-store' }
    )
);