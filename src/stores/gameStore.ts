import { create } from 'zustand';
import { GameStateProps } from '@/types';

export const useGameStore = create<GameStateProps>((set) => ({
    isStartGame: false,
    isGameOver: false,
    isGameWon: false,
    isShowResult: false,
    board: [],
    difficulty: 'easy',
    isFlagMode: false,
    flagsPlaced: 0,
    time: 0,
    score: 0,
    setIsStartGame: (isStartGame) => set({ isStartGame }),
    setIsGameOver: (isGameOver) => set({ isGameOver }),
    setIsGameWon: (isGameWon) => set({ isGameWon }),
    setIsShowResult: (isShowResult) => set({ isShowResult }),
    setBoard: (board) => set({ board }),
    setDifficulty: (difficulty) => set({ difficulty }),
    setIsFlagMode: (isFlagMode) => set({ isFlagMode }),
    setFlagsPlaced: (flagsPlaced) => set({ flagsPlaced }),
    setTime: (time) => set({ time }),
    setScore: (score) => set({ score })
}));