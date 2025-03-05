'use client';
import { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { LANGUAGE_OPTIONS, FLAG_OPTIONS, BOMB_OPTIONS, NUMBER_OPTIONS } from '@/configs';
import { useCommonStore, useLanguageStore, useSettingStore } from '@/stores';

interface Option {
    value: string;
    label?: string;
    icon?: React.ElementType;
    svgIcon?: string;
};

interface SelectFieldProps {
    id: string;
    label: string;
    color?: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
};

const SelectField: React.FC<SelectFieldProps> = ({ id, label, color, value, options, onChange }) => {
    const { t } = useTranslation();

    return (
        <>
            <Label htmlFor={id}>{t(label)}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={id}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.svgIcon ? (
                                <div className='flex items-center'>
                                    <div dangerouslySetInnerHTML={{ __html: option.svgIcon }} className='mr-2 inline-block' />
                                    {t(option.label || '')}
                                </div>
                            ) : option.icon ? (
                                <option.icon className='w-4 h-4 mr-2' style={{ color: color || '#FF0000' }} />
                            ) : (
                                t(option.label || '')
                            )}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
};

export const SettingsModal = () => {
    const { t } = useTranslation();
    const { lang, setLang } = useLanguageStore();
    const { theme, setTheme } = useTheme();
    const { isMenuSettingOpen, setIsMenuSettingOpen } = useCommonStore();
    const {
        flagIcon, setFlagIcon,
        flagColor, setFlagColor,
        bombIcon, setBombIcon,
        numberStyle, setNumberStyle
    } = useSettingStore();

    const Icon = useMemo(() => (theme === 'dark' ? Sun : Moon), [theme]);

    const handleFlagColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlagColor(e.target.value);
    };

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
                        {/* Theme Toggle */}
                        <Label htmlFor='theme'>{t('settings.theme.title')}</Label>
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

                        {/* Language Selection */}
                        <SelectField
                            id='language'
                            label='settings.language.title'
                            value={lang}
                            onChange={setLang}
                            options={LANGUAGE_OPTIONS}
                        />

                        {/* Flag Style Selection */}
                        <SelectField
                            id='flag'
                            label='settings.flag.title'
                            color={flagColor}
                            value={flagIcon}
                            onChange={setFlagIcon}
                            options={FLAG_OPTIONS}
                        />

                        {/* Flag Color Picker */}
                        <Label htmlFor='flagColor'>{t('settings.flag-color.title')}</Label>
                        <div className='flex gap-2'>
                            <Input
                                type='text'
                                value={flagColor}
                                onChange={handleFlagColorChange}
                                className='flex-1'
                                maxLength={7}
                                pattern='#[0-9A-Fa-f]{6}'
                            />
                            <Input
                                id='flagColor'
                                type='color'
                                value={flagColor}
                                onChange={handleFlagColorChange}
                                className='w-10 h-10 p-1 cursor-pointer'
                            />
                        </div>

                        {/* Bomb Style Selection */}
                        <SelectField
                            id='bomb'
                            label='settings.bomb.title'
                            value={bombIcon}
                            onChange={setBombIcon}
                            options={BOMB_OPTIONS}
                        />

                        {/* Number Style Selection */}
                        <SelectField
                            id='number'
                            label='settings.number.title'
                            value={numberStyle}
                            onChange={setNumberStyle}
                            options={NUMBER_OPTIONS}
                        />
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