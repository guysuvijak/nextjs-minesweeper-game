export interface GameStateProps {
    isStartGame: boolean;
    isGameOver: boolean;
    isShowResult: boolean;
    board: Cell[][];
    difficulty: Difficulty;
    isFlagMode: boolean;
    flagsPlaced: number;
    time: number;
    score: number;
    setIsStartGame: (isStartGame) => void;
    setIsGameOver: (isGameOver) => void;
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
    bombIcon: BombStyle;
    numberStyle: NumberStyle;
    setIsMenuSettingOpen: (isMenuSettingOpen) => void;
    setFlagIcon: (flagIcon) => void;
    setBombIcon: (bombIcon) => void;
    setNumberStyle: (numberStyle) => void;
};