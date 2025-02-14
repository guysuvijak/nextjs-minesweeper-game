'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Flag, Pyramid, Radar, Bomb, Skull, Flame, Moon, Sun } from 'lucide-react';
import { GameSettings, Language, FlagStyle, BombStyle, NumberStyle } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: GameSettings;
    onSettingsChange: (settings: GameSettings) => void;
}

export const SettingsModal = ({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) => {
    const { t } = useTranslation(settings.language);
    const [ localSettings, setLocalSettings ] = useState(settings);
    const { theme, setTheme } = useTheme();

    const handleSave = () => {
        onSettingsChange(localSettings);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{t('settings.title')}</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-2 items-center gap-4'>
                        {/* Theme */}
                        <Label htmlFor='theme'>
                            {t('settings.theme.title')}
                        </Label>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className='w-full justify-between px-3'
                        >
                            <span>{t(`settings.theme.${theme}`)}</span>
                            {theme === 'dark' ? (
                                <Moon className='w-4 h-4' />
                            ) : (
                                <Sun className='w-4 h-4' />
                            )}
                        </Button>
                        {/* Language */}
                        <Label htmlFor='language'>
                            {t('settings.language.title')}
                        </Label>
                        <Select
                            value={localSettings.language}
                            onValueChange={(value: Language) => 
                                setLocalSettings(prev => ({ ...prev, language: value }))
                            }
                        >
                            <SelectTrigger id='language'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='en'>{t('settings.language.en')}</SelectItem>
                                <SelectItem value='th'>{t('settings.language.th')}</SelectItem>
                                <SelectItem value='jp'>{t('settings.language.jp')}</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Flag Style */}
                        <Label htmlFor='flag'>
                            {t('settings.flag.title')}
                        </Label>
                        <Select
                            value={localSettings.flagIcon}
                            onValueChange={(value: FlagStyle) => 
                                setLocalSettings(prev => ({ ...prev, flagIcon: value }))
                            }
                        >
                            <SelectTrigger id='flag'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='default'><Flag className='w-4 h-4 text-red-500' /></SelectItem>
                                <SelectItem value='pyramid'><Pyramid className='w-4 h-4 text-red-500' /></SelectItem>
                                <SelectItem value='radar'><Radar className='w-4 h-4 text-red-500' /></SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Bomb Style */}
                        <Label htmlFor='bomb'>
                            {t('settings.bomb.title')}
                        </Label>
                        <Select
                            value={localSettings.bombIcon}
                            onValueChange={(value: BombStyle) => 
                                setLocalSettings(prev => ({ ...prev, bombIcon: value }))
                            }
                        >
                            <SelectTrigger id='bomb'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='default'><Bomb className='w-4 h-4 text-red-500' /></SelectItem>
                                <SelectItem value='skull'><Skull className='w-4 h-4 text-red-500' /></SelectItem>
                                <SelectItem value='fire'><Flame className='w-4 h-4 text-red-500' /></SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Number Style */}
                        <Label htmlFor='number'>
                            {t('settings.number.title')}
                        </Label>
                        <Select
                            value={localSettings.numberStyle}
                            onValueChange={(value: NumberStyle) => 
                                setLocalSettings(prev => ({ ...prev, numberStyle: value }))
                            }
                        >
                            <SelectTrigger id='number'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='default'>{t('settings.number.default')}</SelectItem>
                                <SelectItem value='roman'>{t('settings.number.roman')}</SelectItem>
                                <SelectItem value='thai'>{t('settings.number.thai')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex justify-end gap-3'>
                    <Button variant='outline' onClick={onClose}>
                        {t('settings.cancel-button')}
                    </Button>
                    <Button onClick={handleSave}>
                        {t('settings.save-button')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
};