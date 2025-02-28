'use client';
import { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { LANGUAGE_OPTIONS, FLAG_OPTIONS, BOMB_OPTIONS, NUMBER_OPTIONS } from '@/configs';
import { useLanguageStore, useSettingStore } from '@/stores';

export const SettingsModal = () => {
    const { t } = useTranslation();
    const { lang, setLang } = useLanguageStore();
    const { theme, setTheme } = useTheme();
    const {
        isMenuSettingOpen, setIsMenuSettingOpen,
        flagIcon, setFlagIcon,
        bombIcon, setBombIcon,
        numberStyle, setNumberStyle
    } = useSettingStore();

    const Icon = useMemo(() => (theme === 'dark' ? Sun : Moon), [theme]);

    return (
        <Dialog open={isMenuSettingOpen} onOpenChange={setIsMenuSettingOpen}>
            <DialogContent className='sm:max-w-[425px]' aria-description='Setting'>
                <DialogHeader>
                    <DialogTitle>{t('settings.title')}</DialogTitle>
                    <DialogDescription>
                        {t('settings.description')}
                    </DialogDescription>
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
                            aria-label='Toggle theme'
                        >
                            <span>{t(`settings.theme.${theme}`)}</span>
                            <Icon className='w-4 h-4' />
                        </Button>

                        {/* Language */}
                        <Label htmlFor='language'>
                            {t('settings.language.title')}
                        </Label>
                        <Select
                            value={lang}
                            onValueChange={(value) => setLang(value)}
                        >
                            <SelectTrigger id='language'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {LANGUAGE_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {t(option.label)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Flag Style */}
                        <Label htmlFor='flag'>
                            {t('settings.flag.title')}
                        </Label>
                        <Select
                            value={flagIcon}
                            onValueChange={(value) => setFlagIcon(value)}
                        >
                            <SelectTrigger id='flag'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {FLAG_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        <option.icon className='w-4 h-4 text-red-500' />
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Bomb Style */}
                        <Label htmlFor='bomb'>
                            {t('settings.bomb.title')}
                        </Label>
                        <Select
                            value={bombIcon}
                            onValueChange={(value) => setBombIcon(value)}
                        >
                            <SelectTrigger id='bomb'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {BOMB_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        <option.icon className='w-4 h-4 text-red-500' />
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Number Style */}
                        <Label htmlFor='number'>
                            {t('settings.number.title')}
                        </Label>
                        <Select
                            value={numberStyle}
                            onValueChange={(value) => setNumberStyle(value)}
                        >
                            <SelectTrigger id='number'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {NUMBER_OPTIONS.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {t(option.label)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex justify-end gap-3'>
                    <Button variant='outline' onClick={() => setIsMenuSettingOpen(false)}>
                        {t('settings.done-button')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
};