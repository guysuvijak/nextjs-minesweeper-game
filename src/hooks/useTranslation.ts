import { useCallback } from 'react';
import en from '@/locales/en.json';
import th from '@/locales/th.json';
import jp from '@/locales/jp.json';

type TranslationValue = string | { [key: string]: TranslationValue };

type TranslationsType = {
    [K in Language]: {
        [key: string]: TranslationValue;
    };
};

const translations: TranslationsType = {
    en,
    th,
    jp
};

export type Language = 'en' | 'th' | 'jp';

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