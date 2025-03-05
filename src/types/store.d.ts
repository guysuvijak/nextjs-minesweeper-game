export interface CommonStateProps {
    isMenuQuestOpen: boolean;
    isMenuAchievementOpen: boolean;
    isMenuSettingOpen: boolean;
    isMenuSingleplayerOpen: boolean;
    isMenuMultiplayerOpen: boolean;
    setIsMenuQuestOpen: (isMenuQuestOpen) => void;
    setIsMenuAchievementOpen: (isAchievementOpen) => void;
    setIsMenuSettingOpen: (isMenuSettingOpen) => void;
    setIsMenuSingleplayerOpen: (isMenuSingleplayerOpen) => void;
    setIsMenuMultiplayerOpen: (isMenuMultiplayerOpen) => void;
};
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
    flagIcon: FlagStyle;
    flagColor: string;
    bombIcon: BombStyle;
    numberStyle: NumberStyle;
    setFlagIcon: (flagIcon) => void;
    setFlagColor: (flagColor) => void;
    setBombIcon: (bombIcon) => void;
    setNumberStyle: (numberStyle) => void;
};