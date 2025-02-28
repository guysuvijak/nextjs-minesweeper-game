'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { Bomb, Settings, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Particles } from '@/components/magicui/particles';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { CustomDock } from '@/components/CustomDock';
import { cn } from '@/lib/utils';
import { DIFFICULTY_DATA } from '@/configs';
import { useSettingStore } from '@/stores/settingStore';
import { useGameStore } from '@/stores';
import { version } from '../../package.json';

export const MainMenu = () => {
    const { t } = useTranslation();
    const { setIsMenuSettingOpen } = useSettingStore();
    const { difficulty, setDifficulty, setIsStartGame } = useGameStore();
    const { theme } = useTheme();
    
    const handleGameStart = () => {
        setIsStartGame(true);
    };

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
                                variant={difficulty === key ? 'default' : 'outline'}
                                className={cn(
                                    'h-12 sm:h-14 md:h-16 relative overflow-hidden group transition-all duration-200',
                                    difficulty === key 
                                        ? 'border-2 border-primary bg-primary/10 hover:bg-primary/20' 
                                        : 'hover:border-primary/50 hover:bg-muted'
                                )}
                                onClick={() => setDifficulty(key as typeof difficulty)}
                            >
                                <div className='flex items-center justify-between w-full px-4'>
                                    <div className='flex items-center gap-4'>
                                        <div className='text-xl font-medium text-foreground'>{t(`mainmenu.difficulty.${key}`)}</div>
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
                                    <ChevronRight className={cn(
                                        'w-5 h-5 transition-all duration-200',
                                        difficulty === key ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                    )} />
                                </div>
                            </Button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col space-y-4 pt-2 items-center justify-center'>
                        <ShimmerButton
                            className='w-full sm:w-[70%] shadow-2xl'
                            background={theme === 'dark' ? '#FFFFFF' : '#000000'}
                            shimmerColor={theme === 'dark' ? '#000000' : '#FFFFFF'}
                            shimmerSize='0.1em'
                            onClick={handleGameStart}
                        >
                            <span className='whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg'>
                                {t('mainmenu.playgame')}
                            </span>
                        </ShimmerButton>
                        
                        <Button 
                            variant='outline'
                            className='flex items-center justify-center gap-2 h-9 sm:h-12'
                            onClick={() => setIsMenuSettingOpen(true)}
                        >
                            <Settings className='w-4 h-4' />
                            {t('mainmenu.settings')}
                        </Button>
                    </div>

                    {/* Game Info */}
                    <div className='text-center text-sm text-muted-foreground'>
                        <p>{t('mainmenu.description', { version: version })}</p>
                        <CustomDock />
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
    )
};