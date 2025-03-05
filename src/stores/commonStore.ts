import { create } from 'zustand';
import { CommonStateProps } from '@/types';

export const useCommonStore = create<CommonStateProps>((set) => ({
    isMenuQuestOpen: false,
    isMenuAchievementOpen: false,
    isMenuSettingOpen: false,
    isMenuSingleplayerOpen: false,
    isMenuMultiplayerOpen: false,
    setIsMenuQuestOpen: (isMenuQuestOpen) => set({ isMenuQuestOpen }),
    setIsMenuAchievementOpen: (isMenuAchievementOpen) => set({ isMenuAchievementOpen }),
    setIsMenuSettingOpen: (isMenuSettingOpen) => set({ isMenuSettingOpen }),
    setIsMenuSingleplayerOpen: (isMenuSingleplayerOpen) => set({ isMenuSingleplayerOpen }),
    setIsMenuMultiplayerOpen: (isMenuMultiplayerOpen) => set({ isMenuMultiplayerOpen })
}));