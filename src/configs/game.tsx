import { FLAG_OPTIONS, BOMB_OPTIONS } from '@/configs/settings';
import { FlagStyle, BombStyle, NumberStyle } from '@/types';

export const DIFFICULTY_DATA = {
    easy: { mines: 10, size: '9x9', rows: 9, cols: 9 },
    medium: { mines: 40, size: '16x16', rows: 16, cols: 16 },
    hard: { mines: 99, size: '16x30', rows: 16, cols: 30 }
};

export const SCORE_CONFIG = {
    baseScore: 1000,
    maxTime: 300,
    multipliers: {
        easy: 1,
        medium: 2,
        hard: 3
    },
    flagBonus: 1.5
};

const NUMBER_STYLES = {
    roman: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'],
    thai: ['๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘'],
    abc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    question: ['?', '?', '?', '?', '?', '?', '?', '?']
};

export const getFlagIcon = (style: FlagStyle, color: string) => {
    const option = FLAG_OPTIONS.find(opt => opt.value === style);
    const Icon = option?.icon || FLAG_OPTIONS[0].icon;
    return <Icon className='w-4 h-4' style={{ color: `${color}` }} />;
};

export const getBombIcon = (style: BombStyle) => {
    const option = BOMB_OPTIONS.find(opt => opt.value === style);
    const Icon = option?.icon || BOMB_OPTIONS[0].icon;
    return <Icon className='w-4 h-4 text-red-500' />;
};

export const getNumberDisplay = (number: number, style: NumberStyle) => {
    if (number === 0) return null;
    
    if (style === 'default') return number;
    
    return NUMBER_STYLES[style]?.[number - 1] || number;
};