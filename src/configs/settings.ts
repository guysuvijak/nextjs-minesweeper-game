import { Language, FlagStyle, BombStyle, NumberStyle } from '@/types';
import {
    Pyramid, Radar, Sparkles, Sigma, Flag,
    Skull, Flame, FlameKindling, Ghost, Bomb
} from 'lucide-react';

export const LANGUAGE_OPTIONS: { value: Language; label: string; }[] = [
    { value: 'en', label: 'settings.language.en' },
    { value: 'th', label: 'settings.language.th' },
    { value: 'jp', label: 'settings.language.jp' },
    { value: 'vi', label: 'settings.language.vi' },
    { value: 'zh', label: 'settings.language.zh' }
];

export const FLAG_OPTIONS: { value: FlagStyle; icon: typeof Flag; }[] = [
    { value: 'default', icon: Flag },
    { value: 'pyramid', icon: Pyramid },
    { value: 'radar', icon: Radar },
    { value: 'sparkles', icon: Sparkles },
    { value: 'sigma', icon: Sigma }
];

export const BOMB_OPTIONS: { value: BombStyle; icon: typeof Bomb; }[] = [
    { value: 'default', icon: Bomb },
    { value: 'skull', icon: Skull },
    { value: 'fire', icon: Flame },
    { value: 'flame', icon: FlameKindling },
    { value: 'ghost', icon: Ghost }
];

export const NUMBER_OPTIONS: { value: NumberStyle; label: string; }[] = [
    { value: 'default', label: 'settings.number.default' },
    { value: 'roman', label: 'settings.number.roman' },
    { value: 'thai', label: 'settings.number.thai' },
    { value: 'abc', label: 'settings.number.abc' },
    { value: 'question', label: 'settings.number.question' }
];