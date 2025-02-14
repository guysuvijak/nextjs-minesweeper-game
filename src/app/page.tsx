'use client'
import { useState } from 'react';
import MainMenu from '@/components/MainMenu';
import Minesweeper from '@/components/Minesweeper';
import { SettingsModal } from '@/components/SettingsModal';
import { GameResultModal } from '@/components/GameResultModal';
import { GameStats, GameSettings } from '@/types';
import type { Difficulty } from '@/types';

export default function Home() {
    const [ showGame, setShowGame ] = useState(false);
    const [ showSettings, setShowSettings ] = useState(false);
    const [ showLeaderboard, setShowLeaderboard ] = useState(false);
    const [ showGameOver, setShowGameOver ] = useState(false);
    const [ gameStats, setGameStats]  = useState<GameStats | null>(null);
    const [ difficulty, setDifficulty ] = useState<Difficulty>('easy');
    const [ settings, setSettings ] = useState<GameSettings>({
        language: 'en',
        flagIcon: 'default',
        bombIcon: 'default',
        numberStyle: 'default'
    });
    console.log(showLeaderboard)

    const handleStartGame = (selectedDifficulty: Difficulty) => {
        setDifficulty(selectedDifficulty);
        setShowGame(true);
    };
  
    const handleGameOver = (stats: GameStats) => {
        setGameStats(stats);
        setShowGameOver(true);
    };

    const handlePlayAgain = () => {
        setShowGameOver(false);
        setShowGame(false);
    };

    const handleSettingsChange = (newSettings: GameSettings) => {
        setSettings(newSettings);
        setShowSettings(false);
    };

    return (
        <>
            {!showGame ? (
                <MainMenu
                    onStartGame={handleStartGame}
                    onOpenSettings={() => setShowSettings(true)}
                    language={settings.language}
                    onShowLeaderboard={() => setShowLeaderboard(true)}
                />
            ) : (
                <Minesweeper 
                    settings={settings}
                    difficulty={difficulty}
                    language={settings.language}
                    onGameOver={handleGameOver}
                />
            )}

            <SettingsModal 
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                settings={settings}
                onSettingsChange={handleSettingsChange}
            />

            {gameStats && (
                <GameResultModal 
                    isOpen={showGameOver}
                    onClose={() => setShowGameOver(false)}
                    stats={gameStats}
                    language={settings.language}
                    onPlayAgain={handlePlayAgain}
                />
            )}
        </>
    );
}