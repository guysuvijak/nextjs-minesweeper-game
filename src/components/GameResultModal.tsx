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

export function GameResultModal() {
    const { t } = useTranslation();
    const { isShowResult, difficulty, score, flagsPlaced, time, setIsGameOver, setIsShowResult, setBoard, setTime } = useGameStore();
    const { rows, cols } = DIFFICULTY_DATA[difficulty as Difficulty];
    const [ isSharing, setIsSharing ] = useState(false);
    const confettiRef = useRef<ConfettiRef>(null);

    const handleShare = async () => {
        setIsSharing(true);
        const element = document.getElementById('game-stats');
        if (element) {
            try {
                const html2canvasModule = await import('html2canvas');
                const html2canvas = html2canvasModule.default;
                
                const canvas = await html2canvas(element);
                canvas.toBlob((blob) => {
                    if (blob) {
                        navigator.clipboard.write([
                            new ClipboardItem({ 'image/png': blob })
                        ]);
                    }
                    setIsSharing(false);
                });
            } catch (error) {
                console.error('Error generating image:', error);
                setIsSharing(false);
            }
        } else {
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
        setIsGameOver(false);
        setIsShowResult(false);
    };

    return (
        <Dialog open={isShowResult} onOpenChange={setIsShowResult}>
            <DialogContent className='sm:max-w-[425px]' aria-description='Game Result'>
                <DialogHeader>
                    <DialogTitle>
                        {score > 0 ? t('gameresult.win') : t('gameresult.lose')}
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
                {score > 0 &&
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