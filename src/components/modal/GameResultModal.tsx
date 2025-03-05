'use client';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';
import { useGameStore } from '@/stores';
import { Loader2 } from 'lucide-react';
import { Cell, Difficulty } from '@/types';
import { DIFFICULTY_DATA } from '@/configs';
import { useTheme } from 'next-themes';
import { sendWebhookDiscordShare } from '@/utils/discord-webhook';
import { useWalletStore } from '@/stores';

interface FileSystemWritableFileStream {
    write(data: Blob | BufferSource | string): Promise<void>;
    close(): Promise<void>;
};

interface FileSystemFileHandle {
    createWritable(): Promise<FileSystemWritableFileStream>;
};

interface SaveFilePickerOptions {
    suggestedName?: string;
    types?: Array<{
        description: string;
        accept: Record<string, string[]>;
    }>;
};

interface WindowWithFileSystem extends Window {
    showSaveFilePicker?: (options: SaveFilePickerOptions) => Promise<FileSystemFileHandle>;
};

export function GameResultModal() {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { publicKey, connected } = useWalletStore();
    const { board, isShowResult, isGameWon, difficulty, score, flagsPlaced, time, setIsGameOver, setFlagsPlaced, setIsShowResult, setBoard, setTime } = useGameStore();
    const { rows, cols } = DIFFICULTY_DATA[difficulty as Difficulty];
    const [ isSharing, setIsSharing ] = useState(false);
    const confettiRef = useRef<ConfettiRef>(null);

    const handleShare = async () => {
        setIsSharing(true);
        try {
            const html2canvasModule = await import('html2canvas');
            const html2canvas = html2canvasModule.default;

            // Adjust container size based on difficulty
            const containerWidth = difficulty === 'easy' ? '550px' : difficulty === 'medium' ? '620px' : difficulty === 'hard' ? '680px' : '550px';
            const boardSize = difficulty === 'easy' ? '208px' : difficulty === 'medium' ? '292px' : difficulty === 'hard' ? '350px' : '180px';
            
            // Create container with dark background
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            container.style.top = '-9999px';
            container.style.display = 'flex';
            container.style.width = containerWidth;
            container.style.backgroundColor = theme === 'dark' ? '#252525' : '#eeeeee';
            container.style.padding = '20px';
            container.style.borderRadius = '8px';
            document.body.appendChild(container);
            
            // Create left section for stats
            const statsWrapper = document.createElement('div');
            statsWrapper.style.width = '300px';
            statsWrapper.style.marginRight = '10px';
            statsWrapper.style.backgroundColor = theme === 'dark' ? '#252525' : '#eeeeee';
            statsWrapper.style.color = theme === 'dark' ? 'white' : 'black';
            container.appendChild(statsWrapper);
            
            // Create header with icon and title
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            header.style.marginBottom = '16px';
            
            // Add game icon
            const icon = document.createElement('img');
            icon.src = '/icon/icon-96x96.png';
            icon.width = 48;
            icon.height = 48;
            icon.style.marginRight = '12px';
            
            // Add game title
            const title = document.createElement('h2');
            title.textContent = t('common.game-title');
            title.style.fontWeight = 'bold';
            title.style.fontSize = '24px';
            title.style.color = theme === 'dark' ? 'white' : 'black';
            
            header.appendChild(icon);
            header.appendChild(title);
            statsWrapper.appendChild(header);
            
            const createCurrentStats = () => {
                const statsDiv = document.createElement('div');
                statsDiv.style.padding = '16px';
                statsDiv.style.paddingTop = '0px';
                statsDiv.style.borderRadius = '8px';
                statsDiv.style.backgroundColor = theme === 'dark' ? 'black' : 'white';
                statsDiv.style.width = '300px';
                statsDiv.style.marginBottom = '16px';
                
                const statsContent = document.createElement('div');
                statsContent.style.display = 'flex';
                statsContent.style.flexDirection = 'column';
                statsContent.style.gap = '8px';
                
                const createStatItem = (label: string, value: string) => {
                    const item = document.createElement('p');
                    item.style.margin = '0';
                    item.style.color = theme === 'dark' ? 'white' : 'black';
                    item.textContent = `${label}: ${value}`;
                    return item;
                };
                
                statsContent.appendChild(createStatItem(t('gameresult.time'), formatTime(time)));
                statsContent.appendChild(createStatItem(t('gameresult.score'), `${score.toLocaleString()} (${isGameWon ? t(`gameresult.win`) : t(`gameresult.lose`)})`));
                statsContent.appendChild(createStatItem(t('gameresult.difficulty'), t(`difficulty.${difficulty}`)));
                statsContent.appendChild(createStatItem(t('gameresult.flag'), flagsPlaced.toString()));
                
                statsDiv.appendChild(statsContent);
                return statsDiv;
            };
            
            if (createCurrentStats()) {
                const statsClone = createCurrentStats();
                
                if (statsClone.style) {
                    statsClone.style.backgroundColor = theme === 'dark' ? 'black' : 'white';
                    statsClone.style.width = '300px';
                    statsClone.style.marginBottom = '16px';
                }
                
                statsWrapper.appendChild(statsClone);
                
                // Add footer with website URL
                const footer = document.createElement('div');
                footer.style.position = 'absolute';
                footer.style.bottom = '10px';
                footer.style.left = '0';
                footer.style.width = '100%';
                footer.style.fontSize = '14px';
                footer.style.opacity = '0.6';
                footer.style.textAlign = 'center';
                footer.textContent = 'Play at: https://nextjs-minesweeper-game.vercel.app';
                footer.style.color = theme === 'dark' ? '#cccccc' : '#5a5a5a';
                footer.style.padding = '5px 0';
                container.appendChild(footer);
                
                // Create right section for game board (no separate background)
                const boardWrapper = document.createElement('div');
                boardWrapper.style.width = boardSize;
                boardWrapper.style.display = 'flex';
                boardWrapper.style.alignItems = 'end';
                boardWrapper.style.justifyContent = 'center';
                boardWrapper.style.marginBottom = '16px';
                container.appendChild(boardWrapper);

                const gridCell = difficulty === 'easy' ? '20px' : difficulty === 'medium' ? '16px' : difficulty === 'hard' ? '10px' : '20px';
                const fontSize = difficulty === 'easy' ? '12px' : difficulty === 'medium' ? '10px' : difficulty === 'hard' ? '6px' : '12px';
                
                // Create game board display
                const boardDisplay = document.createElement('div');
                boardDisplay.style.display = 'grid';
                boardDisplay.style.gap = '1px';
                boardDisplay.style.width = 'fit-content';
                boardDisplay.style.gridTemplateColumns = `repeat(${cols}, ${gridCell})`;
                
                board.forEach((row) => {
                    row.forEach((cell) => {
                        const cellElement = document.createElement('div');
                        cellElement.style.width = gridCell;
                        cellElement.style.height = gridCell;
                        cellElement.style.display = 'flex';
                        cellElement.style.alignItems = 'center';
                        cellElement.style.justifyContent = 'center';
                        cellElement.style.fontSize = fontSize;
                        cellElement.style.fontWeight = 'bold';
                        cellElement.style.position = 'relative';
                        cellElement.style.overflow = 'hidden';

                        const topPosition = difficulty === 'easy' ? '15%' : difficulty === 'medium' ? '15%' : difficulty === 'hard' ? '0%' : '15%';
                        
                        const contentElement = document.createElement('div');
                        contentElement.style.position = 'absolute';
                        contentElement.style.left = '50%';
                        contentElement.style.top = topPosition;
                        contentElement.style.transform = 'translate(-50%, -50%)';
                        contentElement.style.lineHeight = '1';
                        
                        if (cell.isRevealed) {
                            if (cell.isMine) {
                                cellElement.style.backgroundColor = '#FF6B6B';
                                contentElement.textContent = '💣';
                            } else {
                                cellElement.style.backgroundColor = theme === 'dark' ? '#333333' : '#dddddd';
                                if (cell.neighborMines > 0) {
                                    contentElement.textContent = cell.neighborMines.toString();
                                    
                                    const colors = {
                                        1: '#3B82F6', 2: '#10B981', 3: '#EF4444',
                                        4: '#8B5CF6', 5: '#F59E0B', 6: '#EC4899',
                                        7: '#14B8A6', 8: '#6B7280'
                                    };
                                    contentElement.style.color = colors[cell.neighborMines as keyof typeof colors] || 'white';
                                }
                            }
                        } else {
                            cellElement.style.backgroundColor = theme === 'dark' ? '#555555' : '#f0f0f0';
                            cellElement.style.border = '1px solid rgba(128, 128, 128, 0.2)';
                            
                            if (cell.isFlagged) {
                                contentElement.textContent = '🚩';
                            }
                        }
                        
                        cellElement.appendChild(contentElement);
                        boardDisplay.appendChild(cellElement);
                    });
                });
                
                boardWrapper.appendChild(boardDisplay);
                
                const canvas = await html2canvas(container);
                
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        try {
                            const date = new Date();
                            const fileName = `minesweeper-score-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}.png`;
    
                            const windowWithFileSystem = window as WindowWithFileSystem;
    
                            if (typeof windowWithFileSystem.showSaveFilePicker === 'function') {
                                try {
                                    const fileHandle = await windowWithFileSystem.showSaveFilePicker({
                                        suggestedName: fileName,
                                        types: [
                                            {
                                                description: 'PNG Image',
                                                accept: { 'image/png': ['.png'] }
                                            }
                                        ]
                                    });
                                    
                                    const writable = await fileHandle.createWritable();
                                    await writable.write(blob);
                                    if (connected) {
                                        try {
                                            const imageUrl = URL.createObjectURL(blob);
                                            await sendWebhookDiscordShare(publicKey, blob);
                                            setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
                                        } catch (webhookError) {
                                            console.error('Error sending webhook:', webhookError);
                                        }
                                    }
                                    await writable.close();
                                } catch (err) {
                                    if (err instanceof Error && err.name !== 'AbortError') {
                                        fallbackDownload();
                                    }
                                }
                            } else {
                                fallbackDownload();
                            }
                            
                            function fallbackDownload() {
                                const a = document.createElement('a');
                                a.download = fileName;
                                a.href = URL.createObjectURL(blob as Blob);
                                a.click();
                                URL.revokeObjectURL(a.href);
                            }
                            
                            document.body.removeChild(container);
                            setIsSharing(false);
                        } catch (error) {
                            console.error('Error saving image:', error);
                            setIsSharing(false);
                        }
                    } else {
                        document.body.removeChild(container);
                        setIsSharing(false);
                    }
                });
            } else {
                document.body.removeChild(container);
                setIsSharing(false);
            }
        } catch (error) {
            console.error('Error generating image:', error);
            setIsSharing(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayAgain = () => {
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
        setFlagsPlaced(0);
        setIsGameOver(false);
        setIsShowResult(false);
    };

    return (
        <Dialog open={isShowResult} onOpenChange={setIsShowResult}>
            <DialogContent className='sm:max-w-[425px]' aria-description='Game Result'>
                <DialogHeader>
                    <DialogTitle>
                        {isGameWon ? t('gameresult.win') : t('gameresult.lose')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('gameresult.description')}
                    </DialogDescription>
                </DialogHeader>
                <div id='game-stats' className='p-4 bg-card rounded-lg'>
                    <div className='space-y-2'>
                        <p>{t('gameresult.time')}: {formatTime(time)}</p>
                        <p>{t('gameresult.score')}: {score.toLocaleString()}</p>
                        <p>{t('gameresult.difficulty')}: {t(`difficulty.${difficulty}`)}</p>
                        <p>{t('gameresult.flag')}: {flagsPlaced}</p>
                    </div>
                </div>
                <div className='flex justify-end space-x-2 z-30'>
                    <Button onClick={handleShare} disabled={isSharing}>
                        {isSharing ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                {t('common.loading')}
                            </>
                        ) : (
                            t('gameresult.share-button')
                        )}
                    </Button>
                    <Button variant={'destructive'} onClick={handlePlayAgain}>{t('gameresult.again-button')}</Button>
                </div>
                {isGameWon &&
                    <Confetti
                        ref={confettiRef}
                        className='absolute left-0 top-0 z-10 size-full'
                        onMouseEnter={() => {
                            confettiRef.current?.fire({});
                        }}
                    />
                }
            </DialogContent>
        </Dialog>
    )
};