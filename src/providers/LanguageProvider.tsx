'use client';
import { useEffect } from 'react';
import { useLanguageStore } from '@/stores/languageStore';

const LanguageProvider = () => {
    const { lang } = useLanguageStore();

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    return null;
};

export { LanguageProvider };