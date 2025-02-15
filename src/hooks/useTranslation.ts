'use client'
import { useCallback } from 'react';
import { TranslationValue, Language as LanguageType } from '@/types';
import { LANGUAGE_DATA } from '@/configs';

export type Language = LanguageType;

export function useTranslation(language: Language) {
    const t = useCallback((key: string, params?: Record<string, string>): string => {
        const translation = key.split('.').reduce<TranslationValue>((obj, k) => {
            if (typeof obj === 'object' && obj !== null) {
                return obj[k];
            }
            return key;
        }, LANGUAGE_DATA[language]);
        
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