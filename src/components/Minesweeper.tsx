'use client';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flag, RotateCcw, Bomb, Pyramid, Radar, Skull, Flame, FlameKindling, ArrowLeft, Sparkles, Sigma, Ghost, Shovel } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GameSettings, GameStats, Difficulty, Cell } from '@/types';
import { Timer } from '@/components/Timer';
import { useTranslation, Language } from '@/hooks/useTranslation';
import { useTheme } from 'next-themes';
import { Particles } from '@/components/magicui/particles';
import { cn } from '@/lib/utils';

const DIFFICULTIES = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
};

interface MinesweeperProps {
    settings: GameSettings;
    difficulty: Difficulty;
    language: Language;
    onGameOver: (stats: GameStats) => void;
    onBackMenu: () => void;
};

export default function Minesweeper({ settings, difficulty: initialDifficulty, language, onGameOver, onBackMenu }: MinesweeperProps) {
    const { t } = useTranslation(language);
    const [ difficulty ] = useState<Difficulty>(initialDifficulty);
    const [ board, setBoard ] = useState<Cell[][]>([]);
    const [ gameOver, setGameOver ] = useState(false);
    const [ gameWon, setGameWon ] = useState(false);
    const [ flagCount, setFlagCount ] = useState(0);
    const { rows, cols, mines } = DIFFICULTIES[difficulty];
    const [ timeElapsed, setTimeElapsed ] = useState(0);
    const [ isGameStarted, setIsGameStarted ] = useState(false);
    const { resolvedTheme } = useTheme();
    const [ color, setColor ] = useState('#ffffff');
    const [ isFlagMode, setIsFlagMode ] = useState(false);

    useEffect(() => {
        setColor(resolvedTheme === 'dark' ? '#ffffff' : '#000000');
    }, [resolvedTheme]);

    const scoreConfigRef = useRef({
        baseScore: 1000,
        maxTime: 300,
        multipliers: {
            easy: 1,
            medium: 2,
            hard: 3
        },
        flagBonus: 1.5
    });

    const calculateScore = useCallback(() => {
        const config = scoreConfigRef.current;
        const timeMultiplier = Math.max(1, (config.maxTime - timeElapsed) / config.maxTime);
        const difficultyMultiplier = config.multipliers[difficulty];
        const flagAccuracyBonus = flagCount === mines ? config.flagBonus : 1;

        return Math.floor(
            config.baseScore * 
            timeMultiplier * 
            difficultyMultiplier * 
            flagAccuracyBonus
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGameOver = useCallback(() => {
        if (gameOver || gameWon) {
            setIsGameStarted(false);
            onGameOver({
                time: timeElapsed,
                difficulty,
                flagsPlaced: flagCount,
                score: gameWon ? calculateScore() : 0
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameOver, gameWon, onGameOver, calculateScore]);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        handleGameOver();
    }, [gameOver, gameWon]);
    /* eslint-enable react-hooks/exhaustive-deps */

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

    const getFlagIcon = (style: React.ReactNode) => {
        switch (style) {
            case 'pyramid':
                return <Pyramid className='w-4 h-4 text-red-500' />;
            case 'radar':
                return <Radar className='w-4 h-4 text-red-500' />;
            case 'sparkles':
                return <Sparkles className='w-4 h-4 text-red-500' />;
            case 'sigma':
                return <Sigma className='w-4 h-4 text-red-500' />;
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
            case 'flame':
                return <FlameKindling className='w-4 h-4 text-red-500' />;
            case 'ghost':
                return <Ghost className='w-4 h-4 text-red-500' />;
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
        const baseStyles = [
            'w-8 h-8 p-0 text-sm font-bold',
            cell.isRevealed ? 'cursor-default' : 'cursor-pointer',
            !cell.isRevealed ? 'bg-secondary hover:bg-secondary/80' : '',
            cell.isMine && cell.isRevealed ? 'bg-red-100' : '',
            cell.isRevealed && !cell.isMine ? 'bg-background' : '',
            'select-none'
        ].filter(Boolean).join(' ');
    
        if (!cell.isRevealed || cell.isMine || cell.isFlagged) {
            return baseStyles;
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
    
        return `${baseStyles} ${numberColors[cell.neighborMines - 1] || ''}`;
    };

    return (
        <div className='min-h-screen bg-background p-4 flex items-center justify-center'>
            <Card className='max-w-fit mx-auto z-10'>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div className='w-[30%]'>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={onBackMenu}
                        >
                            <ArrowLeft className='h-4 w-4' />
                        </Button>
                    </div>
                    <div className='flex w-[40%] justify-center'>
                        <Timer
                            isRunning={isGameStarted && !gameOver && !gameWon}
                            onTimeUpdate={setTimeElapsed}
                        />
                    </div>
                    <div className='flex items-center justify-end gap-2 w-[30%]'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={isFlagMode ? 'default' : 'outline'} 
                                        size='icon'
                                        onClick={() => setIsFlagMode(!isFlagMode)}
                                    >
                                        {isFlagMode ? (
                                            <Flag className={cn('w-4 h-4')} />
                                        ) : (
                                            <Shovel className={cn('w-4 h-4')} />
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{isFlagMode ? t('game.dig-mode') : t('game.flag-mode')}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
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
                <div className='flex justify-center items-center mt-2 gap-2'>
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
                        className='grid gap-1 overflow-auto' 
                        style={{
                            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                            maxWidth: '100%'
                        }}
                    >
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <Button
                                    key={`${rowIndex}-${colIndex}`}
                                    variant='secondary'
                                    size='icon'
                                    className={getCellClasses(cell)}
                                    onClick={() => {
                                        if (isFlagMode) {
                                            toggleFlag(rowIndex, colIndex);
                                        } else {
                                            revealCell(rowIndex, colIndex);
                                        }
                                    }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
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