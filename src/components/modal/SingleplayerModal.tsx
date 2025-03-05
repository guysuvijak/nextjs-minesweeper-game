'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import { Bomb } from 'lucide-react';
import { useCommonStore, useGameStore } from '@/stores';
import { cn } from '@/lib/utils';
import { DIFFICULTY_DATA } from '@/configs';

export const SingleplayerModal = () => {
    const { t } = useTranslation();
    const { isMenuSingleplayerOpen, setIsMenuSingleplayerOpen } = useCommonStore();
    const { difficulty, setDifficulty, setIsStartGame } = useGameStore();

    const handleGameStart = () => {
        setIsStartGame(true);
    };

    return (
        <Dialog open={isMenuSingleplayerOpen} onOpenChange={setIsMenuSingleplayerOpen}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>{t('mainmenu.singleplayer.title')}</DialogTitle>
                    <DialogDescription>
                        {t('mainmenu.singleplayer.description')}
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-3 py-4'>
                    {Object.entries(DIFFICULTY_DATA).map(([key, data]) => (
                        <Button
                            key={key}
                            variant={difficulty === key ? 'default' : 'outline'}
                            className={cn(
                                'h-12 sm:h-14 relative overflow-hidden group transition-all duration-200',
                                difficulty === key 
                                    ? 'border-2 border-primary bg-primary/10 hover:bg-primary/20' 
                                    : 'hover:border-primary/50 hover:bg-muted'
                            )}
                            onClick={() => {
                                setDifficulty(key as typeof difficulty);
                                setTimeout(() => {
                                    setIsMenuSingleplayerOpen(false);
                                    handleGameStart();
                                }, 300);
                            }}
                        >
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex flex-1 items-center justify-between gap-4'>
                                    <div className='flex items-center gap-4'>
                                        <Image alt={key} src={data.image} width={36} height={36} draggable={false} />
                                        <div className='text-lg lg:text-xl font-medium text-foreground'>{t(`mainmenu.singleplayer.${key}`)}</div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Badge variant='secondary' className='font-mono'>
                                            {data.size}
                                        </Badge>
                                        <Badge 
                                            variant={difficulty === key ? 'default' : 'outline'}
                                            className='flex items-center gap-1'
                                        >
                                            <Bomb className='w-4 h-4' />
                                            {data.mines}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
};