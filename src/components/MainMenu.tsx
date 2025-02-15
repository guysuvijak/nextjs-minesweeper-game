'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation, Language } from '@/hooks/useTranslation';
import { Bomb, Settings, ChevronRight, Trophy } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Particles } from '@/components/magicui/particles';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { CustomDock } from '@/components/CustomDock';
import { Difficulty } from '@/types';
import { cn } from '@/lib/utils';
import { DIFFICULTY_DATA } from '@/configs';

interface MainMenuProps {
    onStartGame: (difficulty: Difficulty) => void;
    onOpenSettings: () => void;
    language: Language;
    onShowLeaderboard: () => void;
};

export const MainMenu = ({ onStartGame, onOpenSettings, language }: MainMenuProps) => {
    const { t } = useTranslation(language);
    const { resolvedTheme } = useTheme();
    const [ selectedDifficulty, setSelectedDifficulty ] = useState<Difficulty>('easy');
    const [ color, setColor ] = useState('#FFFFFF');

    useEffect(() => {
        setColor(resolvedTheme === 'dark' ? '#FFFFFF' : '#000000');
    }, [resolvedTheme]);

    return (
        <div className='min-h-screen bg-background p-4 flex items-center justify-center'>
            <Card className='w-full max-w-2xl z-10 border-2'>
                <CardHeader className='text-center space-y-2 pb-2'>
                    <CardTitle className='text-5xl font-bold tracking-tight'>
                        <SparklesText sparklesCount={5} text={t('common.game-title')} />
                    </CardTitle>
                    <CardDescription className='text-lg'>
                        {t('mainmenu.difficulty.title')}
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 p-6'>
                    {/* Difficulty Selection */}
                    <div className='grid gap-3'>
                        {Object.entries(DIFFICULTY_DATA).map(([key, data]) => (
                            <Button
                                key={key}
                                variant={selectedDifficulty === key ? 'default' : 'outline'}
                                className={cn(
                                    'h-12 sm:h-14 md:h-16 relative overflow-hidden group transition-all duration-200',
                                    selectedDifficulty === key 
                                        ? 'border-2 border-primary bg-primary/10 hover:bg-primary/20' 
                                        : 'hover:border-primary/50 hover:bg-muted'
                                )}
                                onClick={() => setSelectedDifficulty(key as typeof selectedDifficulty)}
                            >
                                <div className='flex items-center justify-between w-full px-4'>
                                    <div className='flex items-center gap-4'>
                                        <div className='text-xl font-medium text-foreground'>{t(`mainmenu.difficulty.${key}`)}</div>
                                        <Badge variant='secondary' className='font-mono'>
                                            {data.size}
                                        </Badge>
                                        <Badge 
                                            variant={selectedDifficulty === key ? 'default' : 'outline'}
                                            className='flex items-center gap-1'
                                        >
                                            <Bomb className='w-4 h-4' />
                                            {data.mines}
                                        </Badge>
                                    </div>
                                    <ChevronRight className={cn(
                                        'w-5 h-5 transition-all duration-200',
                                        selectedDifficulty === key 
                                            ? 'translate-x-0 opacity-100' 
                                            : '-translate-x-4 opacity-0'
                                    )} />
                                </div>
                            </Button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col space-y-4 pt-2 items-center justify-center'>
                        <ShimmerButton
                            className='w-full sm:w-[70%] shadow-2xl'
                            background={resolvedTheme === 'dark' ? '#FFFFFF' : '#000000'}
                            shimmerColor={resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'}
                            shimmerSize='0.1em'
                            onClick={() => onStartGame(selectedDifficulty)}
                        >
                            <span className='whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg'>
                                {t('mainmenu.playgame')}
                            </span>
                        </ShimmerButton>
                        
                        <div className='grid grid-cols-2 gap-3'>
                            <Button 
                                variant='outline'
                                className='flex items-center justify-center gap-2 h-9 sm:h-12'
                                onClick={onOpenSettings}
                            >
                                <Settings className='w-4 h-4' />
                                {t('mainmenu.settings')}
                            </Button>
                            
                            <Button 
                                variant='outline'
                                className='flex items-center justify-center gap-2 h-9 sm:h-12'
                                disabled
                            >
                                <Trophy className='w-4 h-4' />
                                {t('mainmenu.leaderboard')}
                            </Button>
                        </div>
                    </div>

                    {/* Game Info */}
                    <div className='text-center text-sm text-muted-foreground'>
                        <p>{t('mainmenu.description')}</p>
                        <CustomDock />
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