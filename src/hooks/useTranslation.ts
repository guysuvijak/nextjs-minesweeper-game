import { useCallback } from 'react';
import { TranslationValue, TranslationsType, Language as LanguageType } from '@/types';
import en from '@/locales/en.json';
import th from '@/locales/th.json';
import jp from '@/locales/jp.json';
import vi from '@/locales/vi.json';
import zh from '@/locales/zh.json';

const translations: TranslationsType = {
    en,
    th,
    jp,
    vi,
    zh
};

export type Language = LanguageType;

export function useTranslation(language: Language) {
    const t = useCallback((key: string, params?: Record<string, string>): string => {
        const translation = key.split('.').reduce<TranslationValue>((obj, k) => {
            if (typeof obj === 'object' && obj !== null) {
                return obj[k];
            }
            return key;
        }, translations[language]);
        
        if (typeof translation !== 'string') {
            return key;
        }
        
        if (params) {
            return Object.entries(params).reduce((str, [param, value]) => {
                return str.replace(`{{${param}}}`, value);
            }, translation);
        }

        return translation;
    }, [language]);

    return { t };
};