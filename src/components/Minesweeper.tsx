"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flag, RotateCcw, ArrowLeft, Shovel } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GameSettings, GameStats, Difficulty, Cell } from "@/types";
import { Timer } from "@/components/Timer";
import { useTranslation, Language } from "@/hooks/useTranslation";
import { useTheme } from "next-themes";
import { Particles } from "@/components/magicui/particles";
import { cn } from "@/lib/utils";
import {
  DIFFICULTY_DATA,
  SCORE_CONFIG,
  getBombIcon,
  getFlagIcon,
  getNumberDisplay,
} from "@/configs";

interface MinesweeperProps {
  settings: GameSettings;
  difficulty: Difficulty;
  language: Language;
  onGameOver: (stats: GameStats) => void;
  onBackMenu: () => void;
}

export const Minesweeper = ({
  settings,
  difficulty: initialDifficulty,
  language,
  onGameOver,
  onBackMenu,
}: MinesweeperProps) => {
  const { t } = useTranslation(language);
  const [difficulty] = useState<Difficulty>(initialDifficulty);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const { rows, cols, mines } = DIFFICULTY_DATA[difficulty];
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#FFFFFF");
  const [isFlagMode, setIsFlagMode] = useState(false);

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#FFFFFF" : "#000000");
  }, [resolvedTheme]);

  const scoreConfigRef = useRef(SCORE_CONFIG);

  const calculateScore = useCallback(() => {
    const config = scoreConfigRef.current;
    const timeMultiplier = Math.max(
      1,
      (config.maxTime - timeElapsed) / config.maxTime
    );
    const difficultyMultiplier = config.multipliers[difficulty];
    const flagAccuracyBonus = flagCount === mines ? config.flagBonus : 1;

    return Math.floor(
      config.baseScore *
        timeMultiplier *
        difficultyMultiplier *
        flagAccuracyBonus
    );
  }, [timeElapsed, flagCount, difficulty, mines]); // เพิ่ม dependencies

  const handleGameOver = useCallback(() => {
    if (gameOver || gameWon) {
      setIsGameStarted(false);
      onGameOver({
        time: timeElapsed,
        difficulty,
        flagsPlaced: flagCount,
        score: gameWon ? calculateScore() : 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, gameWon, onGameOver, calculateScore]);

  useEffect(() => {
    handleGameOver();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [gameOver, gameWon]);

  const initializeBoard = useCallback(() => {
    const newBoard: Cell[][] = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          }))
      );

    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (
                row + i >= 0 &&
                row + i < rows &&
                col + j >= 0 &&
                col + j < cols
              ) {
                if (newBoard[row + i][col + j].isMine) count++;
              }
            }
          }
          newBoard[row][col].neighborMines = count;
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
    setFlagCount(0);
  }, [rows, cols, mines]);

  useEffect(() => {
    initializeBoard();
  }, [difficulty, initializeBoard]);

  const revealCell = (row: number, col: number) => {
    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    if (
      gameOver ||
      gameWon ||
      board[row][col].isRevealed ||
      board[row][col].isFlagged
    )
      return;

    const newBoard = [...board];

    if (board[row][col].isMine) {
      // Game Over
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (newBoard[i][j].isMine) {
            newBoard[i][j].isRevealed = true;
          }
        }
      }
      setBoard(newBoard);
      setGameOver(true);
    } else {
      const revealEmpty = (r: number, c: number) => {
        if (
          r < 0 ||
          r >= rows ||
          c < 0 ||
          c >= cols ||
          newBoard[r][c].isRevealed ||
          newBoard[r][c].isFlagged
        ) {
          return;
        }

        newBoard[r][c].isRevealed = true;

        if (newBoard[r][c].neighborMines === 0) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              revealEmpty(r + i, c + j);
            }
          }
        }
      };

      revealEmpty(row, col);
      setBoard(newBoard);

      const unrevealedNonMines = newBoard
        .flat()
        .filter((cell) => !cell.isRevealed && !cell.isMine).length;

      if (unrevealedNonMines === 0) {
        setGameWon(true);
      }
    }
  };

  const toggleFlag = (row: number, col: number) => {
    if (gameOver || gameWon || board[row][col].isRevealed) return;

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
    setFlagCount(flagCount + (newBoard[row][col].isFlagged ? 1 : -1));
  };

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return getFlagIcon(settings.flagIcon);
    if (!cell.isRevealed) return null;
    if (cell.isMine) return getBombIcon(settings.bombIcon);

    return getNumberDisplay(cell.neighborMines, settings.numberStyle);
  };

  const getCellSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const maxCellWidth = Math.floor((width * 0.9) / cols); // 90% ของความกว้าง
      const maxCellHeight = Math.floor((height * 0.7) / rows); // 70% ของความสูง
      return Math.min(maxCellWidth, maxCellHeight, 36); // จำกัดสูงสุดที่ 36px
    }
    return 32; // Default
  };

  const getCellClasses = (cell: Cell) => {
    const baseClasses = [
      "w-8 h-8 p-0 text-sm font-bold",
      cell.isRevealed ? "cursor-default" : "cursor-pointer",
      !cell.isRevealed
        ? "bg-secondary hover:bg-secondary/80 border border-primary/10"
        : "hover:bg-transparent",
      cell.isMine && cell.isRevealed ? "bg-red-100" : "",
      cell.isRevealed && !cell.isMine ? "bg-background" : "",
      "select-none",
    ];

    const NUMBER_COLORS = {
      1: "text-blue-500",
      2: "text-green-500",
      3: "text-red-500",
      4: "text-purple-500",
      5: "text-yellow-500",
      6: "text-pink-500",
      7: "text-teal-500",
      8: "text-gray-500",
    };

    if (!cell.isRevealed || cell.isMine || cell.isFlagged) {
      return baseClasses.filter(Boolean).join(" ");
    }

    if (cell.neighborMines > 0) {
      const colorClass =
        NUMBER_COLORS[cell.neighborMines as keyof typeof NUMBER_COLORS];
      return [...baseClasses, colorClass].filter(Boolean).join(" ");
    }

    return baseClasses.filter(Boolean).join(" ");
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (isFlagMode) {
      toggleFlag(rowIndex, colIndex);
    } else {
      revealCell(rowIndex, colIndex);
    }
  };

  return (
    <div className="min-h-screen bg-background p-2 md:p-4 flex items-center justify-center overflow-hidden">
      <Card className="w-full max-w-[95vw] md:max-w-fit mx-auto z-10 overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="w-[30%]">
              <Button variant="ghost" size="icon" onClick={onBackMenu}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex w-[40%] justify-center">
              <Timer
                isRunning={isGameStarted && !gameOver && !gameWon}
                onTimeUpdate={setTimeElapsed}
              />
            </div>
            <div className="flex items-center justify-end gap-2 w-[30%]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isFlagMode ? "default" : "outline"}
                      size="icon"
                      onClick={() => setIsFlagMode(!isFlagMode)}
                    >
                      {isFlagMode ? (
                        <Flag className={cn("w-4 h-4")} />
                      ) : (
                        <Shovel className={cn("w-4 h-4")} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isFlagMode ? t("game.dig-mode") : t("game.flag-mode")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={initializeBoard}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("game.reset-tooltip")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex justify-center items-center mt-2 gap-2">
            <Badge variant="outline">
              {t("game.mine")}: {mines - flagCount}
            </Badge>
            {gameOver && <Badge variant="destructive">{t("game.lose")}</Badge>}
            {gameWon && <Badge variant="default">{t("game.win")}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="p-2 md:p-4">
          <div className="max-w-full overflow-auto">
            <div
              className="grid gap-[1px] mx-auto"
              style={{
                gridTemplateColumns: `repeat(${cols}, ${getCellSize()}px)`,
                width: "fit-content",
                minWidth: "min-content",
                maxHeight: "70vh",
              }}
            >
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <Button
                    key={`${rowIndex}-${colIndex}`}
                    variant="secondary"
                    size="icon"
                    className={cn(
                      getCellClasses(cell),
                      "w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9",
                      "min-w-[28px] min-h-[28px]",
                      "p-0 text-xs md:text-sm"
                    )}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      toggleFlag(rowIndex, colIndex);
                    }}
                  >
                    {getCellContent(cell)}
                  </Button>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Particles
        className="absolute inset-0 z-0"
        quantity={400}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};
