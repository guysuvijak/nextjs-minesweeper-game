export interface GameStateProps {
    isStartGame: boolean;
    isGameOver: boolean;
    isGameWon: boolean;
    isShowResult: boolean;
    board: Cell[][];
    difficulty: Difficulty;
    isFlagMode: boolean;
    flagsPlaced: number;
    time: number;
    score: number;
    setIsStartGame: (isStartGame) => void;
    setIsGameOver: (isGameOver) => void;
    setIsGameWon: (isGameWon) => void;
    setIsShowResult: (isShowResult) => void;
    setBoard: (board) => void;
    setDifficulty: (difficulty) => void;
    setIsFlagMode: (isFlagMode) => void;
    setFlagsPlaced: (flagsPlaced) => void;
    setTime: (time) => void;
    setScore: (score) => void;
};

export interface SettingStateProps {
    isMenuSettingOpen: boolean;
    flagIcon: FlagStyle;
    flagColor: string;
    bombIcon: BombStyle;
    numberStyle: NumberStyle;
    setIsMenuSettingOpen: (isMenuSettingOpen) => void;
    setFlagIcon: (flagIcon) => void;
    setFlagColor: (flagColor) => void;
    setBombIcon: (bombIcon) => void;
    setNumberStyle: (numberStyle) => void;
};