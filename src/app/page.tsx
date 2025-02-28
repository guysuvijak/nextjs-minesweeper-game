'use client'
import { MainMenu } from '@/components/MainMenu';
import { Minesweeper } from '@/components/Minesweeper';
import { SettingsModal } from '@/components/SettingsModal';
import { GameResultModal } from '@/components/GameResultModal';
import { useGameStore } from '@/stores';

export default function Home() {
    const { isStartGame } = useGameStore();

    return (
        <>
            {!isStartGame ? (
                <MainMenu />
            ) : (
                <Minesweeper />
            )}
            <SettingsModal />
            <GameResultModal />
        </>
    )
};