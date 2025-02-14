import { GameStats } from '@/types';

export const calculateScore = (stats: GameStats) => {
    const difficultyMultiplier = {
        easy: 1,
        medium: 2,
        hard: 3,
    };
    
    return Math.floor((1000 / stats.time) * difficultyMultiplier[stats.difficulty] * (stats.flagsPlaced > 0 ? 100 / stats.flagsPlaced : 1));
};