export type Language = 'en' | 'th' | 'jp';
export type FlagStyle = 'default' | 'triangle' | 'circle';
export type BombStyle = 'default' | 'skull' | 'fire';
export type NumberStyle = 'default' | 'roman' | 'thai';

export interface GameSettings {
    language: Language;
    flagIcon: FlagStyle;
    bombIcon: BombStyle;
    numberStyle: NumberStyle;
};

export interface GameStats {
    time: number;
    difficulty: Difficulty;
    flagsPlaced: number;
    score: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';