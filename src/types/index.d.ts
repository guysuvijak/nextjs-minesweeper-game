import { GameStateProps, SettingStateProps } from './store';

export { GameStateProps, SettingStateProps };

export type Language = 'en' | 'th' | 'jp' | 'vi' | 'zh';
export type FlagStyle = 'default' | 'pyramid' | 'radar' | 'sparkles' | 'sigma';
export type BombStyle = 'default' | 'skull' | 'fire' | 'flame' | 'ghost';
export type NumberStyle = 'default' | 'roman' | 'thai' | 'abc' | 'question';
export type Difficulty = 'easy' | 'medium' | 'hard';

export type TranslationValue = string | { [key: string]: TranslationValue };

export type Variables = {
    [key: string]: string | number | ReactNode
};
export type Translation = {
    [key: string]: TranslationValue
};

export type TranslationsType = {
    [K in Language]: {
        [key: string]: TranslationValue;
    };
};

export interface LanguageStateProps {
    lang: string;
    setLang: (lang: string) => void;
};

export interface GameStats {
    time: number;
    difficulty: Difficulty;
    flagsPlaced: number;
    score: number;
};

export interface Cell {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
};
