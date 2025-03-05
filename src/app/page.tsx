'use client'
import { MainMenu } from '@/components/MainMenu';
import { Minesweeper } from '@/components/Minesweeper';
import { SingleplayerModal } from '@/components/modal/SingleplayerModal';
import { MultiplayerModal } from '@/components/modal/MultiplayerModal';
import { AchievementModal } from '@/components/modal/AchievementModal';
import { QuestModal } from '@/components/modal/QuestModal';
import { SettingsModal } from '@/components/modal/SettingsModal';
import { GameResultModal } from '@/components/modal/GameResultModal';
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
            <SingleplayerModal />
            <MultiplayerModal />
            <AchievementModal />
            <QuestModal />
            <SettingsModal />
            <GameResultModal />
        </>
    )
};