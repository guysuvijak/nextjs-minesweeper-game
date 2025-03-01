'use client';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flag, RotateCcw, ArrowLeft, Shovel } from 'lucide-react';
import { TooltipWrapper } from '@/components/TooltipWrapper';
import { Cell, Difficulty } from '@/types';
import { Timer } from '@/components/Timer';
import { useTranslation } from '@/hooks/useTranslation';
import { useGameStore, useSettingStore } from '@/stores';
import { useTheme } from 'next-themes';
import { Particles } from '@/components/magicui/particles';
import { cn } from '@/lib/utils';
import {
    DIFFICULTY_DATA,
    SCORE_CONFIG,
    getBombIcon,
    getFlagIcon,
    getNumberDisplay
} from '@/configs';

export const Minesweeper = () => {
    const { t } = useTranslation();
    const {
        board, isGameOver, difficulty, isFlagMode, flagsPlaced,
        setBoard, setTime, setIsStartGame, setIsShowResult, setIsGameOver, setIsFlagMode, setFlagsPlaced
    } = useGameStore();
    const { flagIcon, flagColor, bombIcon, numberStyle } = useSettingStore();
    const { theme } = useTheme();
    const { rows, cols, mines } = DIFFICULTY_DATA[difficulty as Difficulty];
    const [ gameWon, setGameWon ] = useState(false);
    const [ timeElapsed, setTimeElapsed ] = useState(0);
    const [ isGameStarted, setIsGameStarted ] = useState(false);
    const scoreConfigRef = useRef(SCORE_CONFIG);

    const initializeBoard = useCallback(() => {
        const newBoard: Cell[][] = Array(rows).fill(null)
            .map(() => Array(cols).fill(null).map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0,
            }))
        );

        setBoard(newBoard);
        setTime(0);
        setIsGameOver(false);
        setGameWon(false);
        setFlagsPlaced(0);
        setIsGameStarted(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows, cols]);

    useEffect(() => {
        initializeBoard();
    }, [difficulty, initializeBoard]);

    const calculateScore = useCallback(() => {
        const config = scoreConfigRef.current;
        const timeMultiplier = Math.max(1, (config.maxTime - timeElapsed) / config.maxTime);
        const difficultyMultiplier = config.multipliers[difficulty as Difficulty];
        const flagAccuracyBonus = flagsPlaced === mines ? config.flagBonus : 1;

        return Math.floor(
            config.baseScore *
                timeMultiplier *
                difficultyMultiplier *
                flagAccuracyBonus
        );
    }, [timeElapsed, flagsPlaced, difficulty, mines]);

    const handleGameOver = useCallback(() => {
        if (isGameOver || gameWon) {
            setIsGameStarted(false);
            setIsShowResult(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isGameOver,
        gameWon,
        calculateScore,
        timeElapsed,
        difficulty,
        flagsPlaced,
    ]);

    useEffect(() => {
        handleGameOver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameOver, gameWon]);

    const placeMines = (firstRow: number, firstCol: number) => {
        const newBoard = [...board];
        let minesPlaced = 0;

        while (minesPlaced < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            
            if (!(row === firstRow && col === firstCol)) {
                if (!newBoard[row][col].isMine) {
                    newBoard[row][col].isMine = true;
                    minesPlaced++;
                }
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
    };

    const revealCell = (row: number, col: number) => {
        if (board[row][col].isFlagged) return;

        if (isGameOver || gameWon || board[row][col].isRevealed) return;
        
        if (!isGameStarted) {
            setIsGameStarted(true);
            placeMines(row, col);
        }

        const newBoard = [...board];

        if (board[row][col].isMine) {
            newBoard[row][col].isRevealed = true;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (newBoard[r][c].isMine) {
                        newBoard[r][c].isRevealed = true;
                    }
                }
            }

            setBoard(newBoard);
            setIsGameOver(true);
            return;
        } else {
            let flagsRemoved = 0;
            const revealEmpty = (r: number, c: number) => {
                if (
                    r < 0 ||
                    r >= rows ||
                    c < 0 ||
                    c >= cols ||
                    newBoard[r][c].isRevealed
                ) {
                    return;
                }

                if (newBoard[r][c].isFlagged) {
                    newBoard[r][c].isFlagged = false;
                    flagsRemoved++;
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

            if (flagsRemoved > 0) {
                setFlagsPlaced(flagsPlaced - flagsRemoved);
            }
            
            const unrevealedNonMines = newBoard
                .flat()
                .filter((cell) => !cell.isRevealed && !cell.isMine).length;

            if (unrevealedNonMines === 0) {
                setGameWon(true);
            }
        }
    };

    const toggleFlag = (row: number, col: number) => {
        if (isGameOver || gameWon || board[row][col].isRevealed) return;

        const newBoard = [...board];
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        setBoard(newBoard);
        setFlagsPlaced(flagsPlaced + (newBoard[row][col].isFlagged ? 1 : -1));
    };

    const getCellContent = (cell: Cell) => {
        if (cell.isFlagged) return getFlagIcon(flagIcon, flagColor);
        if (!cell.isRevealed) return null;
        if (cell.isMine) return getBombIcon(bombIcon);

        return getNumberDisplay(cell.neighborMines, numberStyle);
    };

    const getCellSize = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            // Mobile
            if (width < 640) return 28; // px
            // Tablet
            if (width < 1024) return 32; // px
            // Desktop
            return 36; // px
        }
        return 32; // Default
    };

    const getCellClasses = (cell: Cell) => {
        const baseClasses = [
            'w-8 h-8 p-0 text-sm font-bold',
            cell.isRevealed ? 'cursor-default' : 'cursor-pointer',
            !cell.isRevealed
                ? 'bg-secondary hover:bg-secondary/80 border border-primary/10'
                : 'hover:bg-transparent',
            cell.isMine && cell.isRevealed ? 'bg-red-100' : '',
            cell.isRevealed && !cell.isMine ? 'bg-background' : '',
            'select-none',
        ];

        const NUMBER_COLORS = {
            1: 'text-blue-500',
            2: 'text-green-500',
            3: 'text-red-500',
            4: 'text-purple-500',
            5: 'text-yellow-500',
            6: 'text-pink-500',
            7: 'text-teal-500',
            8: 'text-gray-500',
        };

        if (!cell.isRevealed || cell.isMine || cell.isFlagged) {
            return baseClasses.filter(Boolean).join(' ');
        }

        if (cell.neighborMines > 0) {
            const colorClass =
                NUMBER_COLORS[cell.neighborMines as keyof typeof NUMBER_COLORS];
            return [...baseClasses, colorClass].filter(Boolean).join(' ');
        }

        return baseClasses.filter(Boolean).join(' ');
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        if (isFlagMode) {
            toggleFlag(rowIndex, colIndex);
        } else {
            revealCell(rowIndex, colIndex);
        }
    };
    
    const handleBackMenu = () => {
        setIsStartGame(false);
        setIsShowResult(false);
        setIsGameOver(false);
    };

    return (
        <div className='min-h-screen bg-background p-2 md:p-4 flex items-center justify-center overflow-hidden'>
            <Card className='w-full max-w-[95vw] md:max-w-fit mx-auto z-10 overflow-hidden'>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div className='w-[30%]'>
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={handleBackMenu}
                            >
                                <ArrowLeft className='h-4 w-4' />
                            </Button>
                        </div>
                        <div className='flex w-[40%] justify-center'>
                            <Timer
                                isRunning={isGameStarted && !isGameOver && !gameWon}
                                onTimeUpdate={setTimeElapsed}
                            />
                        </div>
                        <div className='flex items-center justify-end gap-2 w-[30%]'>
                            <TooltipWrapper message={isFlagMode ? t('game.dig-mode') : t('game.flag-mode')}>
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
                            </TooltipWrapper>
                            <TooltipWrapper message={t('game.reset-tooltip')}>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    onClick={initializeBoard}
                                >
                                    <RotateCcw className='w-4 h-4' />
                                </Button>
                            </TooltipWrapper>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-2 gap-2'>
                        <Badge variant='outline'>
                            {t('game.mine')}: {mines - flagsPlaced}
                        </Badge>
                        {isGameOver && (
                            <Badge variant='destructive'>
                                {t('game.lose')}
                            </Badge>
                        )}
                        {gameWon && (
                            <Badge variant='default'>{t('game.win')}</Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className='p-2 md:p-4'>
                    <div className='max-w-full overflow-auto'>
                        <div
                            className='grid gap-[1px] mx-auto'
                            style={{
                                gridTemplateColumns: `repeat(${cols}, ${getCellSize()}px)`,
                                width: 'fit-content',
                                minWidth: 'min-content',
                                maxHeight: '70vh',
                            }}
                        >
                            {board.map((row, rowIndex) =>
                                row.map((cell, colIndex) => (
                                    <Button
                                        key={`${rowIndex}-${colIndex}`}
                                        variant='secondary'
                                        size='icon'
                                        className={cn(
                                            getCellClasses(cell),
                                            'w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9',
                                            'min-w-[28px] min-h-[28px]',
                                            'p-0 text-xs md:text-sm'
                                        )}
                                        onClick={() =>
                                            handleCellClick(rowIndex, colIndex)
                                        }
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
                className='absolute inset-0 z-0'
                quantity={400}
                ease={80}
                color={theme === 'dark' ? '#FFFFFF' : '#000000'}
                refresh
            />
        </div>
    );
};
