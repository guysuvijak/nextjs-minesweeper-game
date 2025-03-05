'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import { MOCK_QUEST_DATA } from '@/configs/mock';
import { QuestCard } from '@/components/mainmenu/QuestCard';
import { useCommonStore } from '@/stores';

export const QuestModal = () => {
    const { t } = useTranslation();
    const { isMenuQuestOpen, setIsMenuQuestOpen } = useCommonStore();
    
    return (
        <Dialog open={isMenuQuestOpen} onOpenChange={setIsMenuQuestOpen}>
            <DialogContent className='sm:max-w-[720px]'>
                <DialogHeader>
                    <DialogTitle>{t('mainmenu.quest.title')}</DialogTitle>
                    <DialogDescription>
                        {t('mainmenu.quest.description')}
                    </DialogDescription>
                </DialogHeader>
                <div className='max-h-[400px] overflow-y-auto'>
                    <div className='space-y-4 py-4 pr-2'>
                        {MOCK_QUEST_DATA.map((quest, index) => (
                            <QuestCard 
                                key={index}
                                title={quest.title}
                                description={quest.description}
                                progress={quest.progress}
                                total={quest.total}
                                reward={quest.reward}
                                completed={quest.completed}
                            />
                        ))}
                    </div>
                </div>
                <div className='text-xs text-center text-muted-foreground pt-2'>
                    {t('mainmenu.quest.reset')}
                </div>
            </DialogContent>
        </Dialog>
    )
};