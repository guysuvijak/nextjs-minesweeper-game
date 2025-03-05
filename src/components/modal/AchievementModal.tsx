'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_ACHIEVEMENT_DATA } from '@/configs/mock';
import { AchievementCard } from '@/components/mainmenu/AchievementCard';
import { useCommonStore } from '@/stores';

export const AchievementModal = () => {
    const { t } = useTranslation();
    const { isMenuAchievementOpen, setIsMenuAchievementOpen } = useCommonStore();
    
    return (
        <Dialog open={isMenuAchievementOpen} onOpenChange={setIsMenuAchievementOpen}>
            <DialogContent className='sm:max-w-[720px]'>
                <DialogHeader>
                    <DialogTitle>{t('mainmenu.achievement.title')}</DialogTitle>
                    <DialogDescription>
                        {t('mainmenu.achievement.description')}
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue='all' className='w-full'>
                    <TabsList className='grid w-full grid-cols-3'>
                        <TabsTrigger value='all'>{t('mainmenu.achievement.menu-all')}</TabsTrigger>
                        <TabsTrigger value='collected'>{t('mainmenu.achievement.menu-collected')}</TabsTrigger>
                        <TabsTrigger value='not-collected'>{t('mainmenu.achievement.menu-not-collected')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value='all' className='min-h-[400px] max-h-[400px] overflow-y-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
                            {/* Achievement Items All Collected */}
                            {MOCK_ACHIEVEMENT_DATA.map((achievement, index) => (
                                <AchievementCard
                                    key={index}
                                    title={achievement.title}
                                    description={achievement.description}
                                    collected={achievement.collected}
                                    dateCollected={achievement.dateCollected || ''}
                                    icon={achievement.icon}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value='collected' className='min-h-[400px] max-h-[400px] overflow-y-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
                            {/* Achievement Items Not Collected */}
                            {MOCK_ACHIEVEMENT_DATA.filter((achievement) => achievement.collected).map((achievement, index) => (
                                <AchievementCard
                                    key={index}
                                    title={achievement.title}
                                    description={achievement.description}
                                    collected={achievement.collected}
                                    dateCollected={achievement.dateCollected || ''}
                                    icon={achievement.icon}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value='not-collected' className='min-h-[400px] max-h-[400px] overflow-y-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
                            {/* Achievement Items */}
                            {MOCK_ACHIEVEMENT_DATA.filter((achievement) => !achievement.collected).map((achievement, index) => (
                                <AchievementCard
                                    key={index}
                                    title={achievement.title}
                                    description={achievement.description}
                                    collected={achievement.collected}
                                    dateCollected={achievement.dateCollected || ''}
                                    icon={achievement.icon}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
};