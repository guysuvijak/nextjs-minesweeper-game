'use client';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flag, RotateCcw, Bomb, Pyramid, Radar, Skull, Flame } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GameSettings, GameStats } from '@/types';
import { Timer } from '@/components/Timer';
import { useTranslation, Language } from '@/hooks/useTranslation';
import { useTheme } from 'next-themes';
import { Particles } from '@/components/magicui/particles';

interface Cell {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
};

type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTIES = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 },
};

interface MinesweeperProps {
    settings: GameSettings;
    difficulty: Difficulty;
        language: Language;
    onGameOver: (stats: GameStats) => void;
};

export default function Minesweeper({ settings, difficulty: initialDifficulty, language, onGameOver }: MinesweeperProps) {
    const { t } = useTranslation(language);
    const [difficulty, setDifficulty ] = useState<Difficulty>(initialDifficulty);
    const [ board, setBoard ] = useState<Cell[][]>([]);
    const [ gameOver, setGameOver ] = useState(false);
    const [ gameWon, setGameWon ] = useState(false);
    const [ flagCount, setFlagCount ] = useState(0);
    const { rows, cols, mines } = DIFFICULTIES[difficulty];
    const [ timeElapsed, setTimeElapsed ] = useState(0);
    const [ isGameStarted, setIsGameStarted ] = useState(false);
    const { resolvedTheme } = useTheme();
    const [ color, setColor ] = useState('#ffffff');

    useEffect(() => {
        setColor(resolvedTheme === 'dark' ? '#ffffff' : '#000000');
    }, [resolvedTheme]);

    const calculateScore = () => {
        const baseScore = 1000;
        const timeMultiplier = Math.max(1, (300 - timeElapsed) / 300);
        const difficultyMultiplier = {
            easy: 1,
            medium: 2,
            hard: 3
        }[difficulty];
        
        const flagAccuracyBonus = flagCount === mines ? 1.5 : 1;

        return Math.floor(
            baseScore * 
            timeMultiplier * 
            difficultyMultiplier * 
            flagAccuracyBonus
        );
    };

    const initializeBoard = useCallback(() => {
        const newBoard: Cell[][] = Array(rows).fill(null).map(() =>
            Array(cols).fill(null).map(() => ({
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
                            if (row + i >= 0 && row + i < rows && col + j >= 0 && col + j < cols) {
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
        if (gameOver || gameWon) {
            setIsGameStarted(false);
            onGameOver({
                time: timeElapsed,
                difficulty,
                flagsPlaced: flagCount,
                score: gameWon ? calculateScore() : 0
            });
        }
    }, [gameOver, gameWon]);

    useEffect(() => {
        initializeBoard();
    }, [difficulty, initializeBoard]);

    const revealCell = (row: number, col: number) => {
        if (!isGameStarted) {
            setIsGameStarted(true);
        }

        if (gameOver || gameWon || board[row][col].isRevealed || board[row][col].isFlagged) return;

        const newBoard = [...board];
        
        if (board[row][col].isMine) {
            // Game Over - reveal all mines
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (newBoard[i][j].isMine) {
                        newBoard[i][j].isRevealed = true;
                    }
                }
            }
            setGameOver(true);
        } else {
            // Reveal current cell and neighbors if empty
            const revealEmpty = (r: number, c: number) => {
                if (r < 0 || r >= rows || c < 0 || c >= cols || newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) {
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
        }

        setBoard(newBoard);

        // Check for win
        const unrevealedNonMines = newBoard.flat().filter(cell => !cell.isRevealed && !cell.isMine).length;
        
        if (unrevealedNonMines === 0) {
            setGameWon(true);
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
        if (cell.isFlagged) {
            return getFlagIcon(settings.flagIcon);
        }
        if (!cell.isRevealed) {
            return null;
        }
        if (cell.isMine) {
            return getBombIcon(settings.bombIcon);
        }
      
        return getNumberDisplay(cell.neighborMines, settings.numberStyle);
    };

    const getCellColor = (cell: Cell) => {
        if (!cell.isRevealed) {
            return 'bg-secondary hover:bg-secondary/80';
        }
        if (cell.isMine) {
            return 'bg-red-100';
        }

        return 'bg-background';
    };

    const getFlagIcon = (style: React.ReactNode) => {
        switch (style) {
            case 'pyramid':
                return <Pyramid className='w-4 h-4 text-red-500' />;
            case 'radar':
                return <Radar className='w-4 h-4 text-red-500' />;
            default:
                return <Flag className='w-4 h-4 text-red-500' />;
        }
    };
      
    const getBombIcon = (style: React.ReactNode) => {
        switch (style) {
            case 'skull':
                return <Skull className='w-4 h-4 text-red-500' />;
            case 'fire':
                return <Flame className='w-4 h-4 text-red-500' />;
            default:
                return <Bomb className='w-4 h-4 text-red-500' />;
        }
    };
      
    const getNumberDisplay = (number: number, style: React.ReactNode) => {
        if (number === 0) return null;
      
        switch (style) {
            case 'roman':
                const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
                return romanNumerals[number - 1];
            case 'thai':
                const thaiNumbers = ['๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘'];
                return thaiNumbers[number - 1];
            default:
                return number;
        }
    };

    const getCellClasses = (cell: Cell) => {
        const baseClasses = `w-8 h-8 p-0 text-sm font-bold ${getCellColor(cell)}`;
        
        if (!cell.isRevealed || cell.isMine || cell.isFlagged) {
            return baseClasses;
        }
        
        const numberColors = [
          'text-blue-500',   // 1
          'text-green-500',  // 2
          'text-red-500',    // 3
          'text-purple-500', // 4
          'text-yellow-500', // 5
          'text-pink-500',   // 6
          'text-teal-500',   // 7
          'text-gray-500'    // 8
        ];
      
        return `${baseClasses} ${numberColors[cell.neighborMines - 1] || ''}`;
    };

    return (
        <div className='min-h-screen bg-background p-4 flex items-center justify-center'>
            <Card className='max-w-fit mx-auto z-10'>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <CardTitle>{t('common.game-title')}</CardTitle>
                        <div className='flex items-center gap-4'>
                            <Timer 
                                isRunning={isGameStarted && !gameOver && !gameWon}
                                onTimeUpdate={setTimeElapsed}
                            />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant='outline' 
                                            size='icon'
                                            onClick={initializeBoard}
                                        >
                                            <RotateCcw className='w-4 h-4' />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{t('game.reset-tooltip')}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <Badge variant='outline'>
                            {t('game.mine')}: {mines - flagCount}
                        </Badge>
                        {gameOver && (
                            <Badge variant='destructive'>{t('game.lose')}</Badge>
                        )}
                        {gameWon && (
                            <Badge variant='default'>{t('game.win')}</Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div 
                        className='grid gap-1' 
                        style={{gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`}}
                    >
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <Button
                                    key={`${rowIndex}-${colIndex}`}
                                    variant='secondary'
                                    size='icon'
                                    className={getCellClasses(cell)}
                                    onClick={() => revealCell(rowIndex, colIndex)}
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
                </CardContent>
            </Card>
            <Particles
                className='absolute inset-0 z-0'
                quantity={400}
                ease={80}
                color={color}
                refresh
            />
        </div>
    )
};