'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Particles } from '@/components/magicui/particles';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { CustomDock } from '@/components/CustomDock';
import { useCommonStore } from '@/stores';
import { useWallet } from '@solana/wallet-adapter-react';
import { Web3ConnectButton } from '@/components/Web3Connect';
import pkg from '../../package.json';

interface PrimaryMenuButtonProps {
    title: string;
    alt: string;
    image: string;
    onClick: () => void;
};

interface SecondaryMenuButtonProps {
    title: string;
    alt: string;
    image: string;
    onClick: () => void;
};

const PrimaryMenuButton = ({ title, alt, image, onClick }: PrimaryMenuButtonProps) => (
    <Button
        key={alt}
        variant='outline'
        className='h-32 bg-gradient-to-b from-background to-muted hover:from-muted/80 hover:to-muted flex flex-col items-center justify-center gap-2 border-2'
        onClick={onClick}
    >
        <Image alt={alt} src={image} width={32} height={32} draggable={false} />
        <span className='text-sm md:text-md lg:text-lg font-bold whitespace-break-spaces'>{title}</span>
    </Button>
);

const SecondaryMenuButton = ({ title, alt, image, onClick }: SecondaryMenuButtonProps) => (
    <Button
        key={alt}
        variant='outline'
        className='h-24 flex flex-col items-center justify-center gap-2 border-2'
        onClick={onClick}
    >
        <Image alt={alt} src={image} width={32} height={32} draggable={false} />
        <span className='font-bold whitespace-break-spaces'>{title}</span>
    </Button>
);

export const MainMenu = () => {
    const { t } = useTranslation();
    const { setIsMenuSingleplayerOpen, setIsMenuMultiplayerOpen, setIsMenuAchievementOpen, setIsMenuQuestOpen, setIsMenuSettingOpen } = useCommonStore();
    const wallet = useWallet();
    const { theme } = useTheme();
    const versionGame = pkg.version;

    useEffect(() => {
        if (!wallet.connected) {
        }
    }, [wallet]);

    return (
        <div className='min-h-screen bg-background p-4 flex flex-col items-center justify-center'>
            <Card className='w-full max-w-3xl z-10 border-2 mb-4'>
                <CardHeader className='text-center space-y-2 pb-2'>
                    <CardTitle className='text-5xl font-bold tracking-tight'>
                        <SparklesText sparklesCount={5} text={t('common.game-title')} />
                    </CardTitle>
                    <CardDescription className='text-lg'>
                        {t('common.game-desc')}
                    </CardDescription>
                </CardHeader>
                <CardContent className='p-6'>
                    {/* Main Menu - Primary Options */}
                    <div className='grid grid-cols-3 gap-4 mb-6'>
                        <PrimaryMenuButton
                            onClick={() => setIsMenuSingleplayerOpen(true)}
                            title={t('mainmenu.singleplayer.title')} alt={'Singleplayer'} image={'/assets/icons/menu/menu-singleplayer.webp'}
                        />
                        <PrimaryMenuButton
                            onClick={() => setIsMenuMultiplayerOpen(true)}
                            title={t('mainmenu.multiplayer.title')} alt={'Multiplayer'} image={'/assets/icons/menu/menu-multiplayer.webp'}
                        />
                        <PrimaryMenuButton
                            onClick={() => {}}
                            title={t('mainmenu.store.title')} alt={'Store'} image={'/assets/icons/menu/menu-store.webp'}
                        />
                    </div>

                    {/* Secondary Menu Options */}
                    <div className='grid grid-cols-2 gap-4 mb-6'>
                        <SecondaryMenuButton
                            onClick={() => setIsMenuAchievementOpen(true)}
                            title={t('mainmenu.achievement.title')} alt={'Achievement'} image={'/assets/icons/menu/menu-achievement.webp'}
                        />
                        <SecondaryMenuButton
                            onClick={() => setIsMenuQuestOpen(true)}
                            title={t('mainmenu.quest.title')} alt={'Quests'} image={'/assets/icons/menu/menu-quest.webp'}
                        />
                    </div>

                    {/* Bottom Actions */}
                    <div className='flex justify-center items-center gap-4'>
                        <Web3ConnectButton />
                        
                        <Button 
                            variant='outline'
                            className='flex items-center justify-center gap-2 h-9 sm:h-10'
                            onClick={() => setIsMenuSettingOpen(true)}
                        >
                            <Settings className='w-4 h-4' />
                            {t('mainmenu.settings')}
                        </Button>
                    </div>

                    {/* Game Info */}
                    <div className='text-center text-sm text-muted-foreground mt-6'>
                        <p>
                            {t('mainmenu.description', {
                                versionGame:
                                    <Link href='https://github.com/guysuvijak/nextjs-minesweeper-game/blob/main/CHANGELOG.md' target='_blank' className='underline'>
                                        {versionGame}
                                    </Link>
                            })}
                        </p>
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
    );
};