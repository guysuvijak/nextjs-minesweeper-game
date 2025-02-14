'use client';
import { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameStats } from '@/types';
import { useTranslation, Language } from '@/hooks/useTranslation';
import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';
import html2canvas from 'html2canvas';

interface GameOverModalProps {
    isOpen: boolean;
    onClose: () => void;
    stats: GameStats;
    language: Language;
    onPlayAgain: () => void;
};

export function GameResultModal({ isOpen, onClose, stats, language, onPlayAgain }: GameOverModalProps) {
    const { t } = useTranslation(language);
    const confettiRef = useRef<ConfettiRef>(null);

    const handleShare = async () => {
        const element = document.getElementById('game-stats');
        if (element) {
            const canvas = await html2canvas(element);
            canvas.toBlob((blob) => {
                if (blob) {
                    navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                }
            });
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>
                        {stats.score > 0 ? t('gameresult.win') : t('gameresult.lose')}
                    </DialogTitle>
                </DialogHeader>
                <div id='game-stats' className='p-4 bg-card rounded-lg'>
                    <div className='space-y-2'>
                        <p>{t('gameresult.time')}: {formatTime(stats.time)}</p>
                        <p>{t('gameresult.score')}: {stats.score.toLocaleString()}</p>
                        <p>{t('gameresult.difficulty')}: {t(`difficulty.${stats.difficulty}`)}</p>
                        <p>{t('gameresult.flag')}: {stats.flagsPlaced}</p>
                    </div>
                </div>
                <div className='flex justify-end space-x-2'>
                    <Button onClick={handleShare}>{t('gameresult.share-button')}</Button>
                    <Button onClick={onPlayAgain}>{t('gameresult.again-button')}</Button>
                </div>
                {stats.score > 0 &&
                    <Confetti
                        ref={confettiRef}
                        className='absolute left-0 top-0 z-50 size-full'
                        onMouseEnter={() => {
                            confettiRef.current?.fire({});
                        }}
                    />
                }
            </DialogContent>
        </Dialog>
    )
};