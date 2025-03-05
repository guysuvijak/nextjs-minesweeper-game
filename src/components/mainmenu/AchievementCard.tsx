'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
    title: string; 
    description: string; 
    collected: boolean; 
    dateCollected?: string;
    icon: string;
};

const AchievementCard = ({ title, description, collected, dateCollected, icon }: AchievementCardProps) => {
    const { t } = useTranslation();

    return (
        <Card className={cn(
            'border overflow-hidden transition-all duration-200',
            collected ? 'border-primary' : 'border-muted opacity-70'
        )}>
            <CardContent className='p-4 flex gap-4'>
                <div className={cn(
                    'w-16 h-16 flex items-center justify-center text-2xl rounded-lg',
                    collected ? 'bg-primary/10' : 'bg-muted'
                )}>
                    {icon}
                </div>
                <div className='flex-1'>
                    <h3 className='font-semibold flex items-start justify-between gap-2'>
                        {title}
                        {collected && <Badge className='ml-2' variant='outline'>{t('achievement.complete')}</Badge>}
                    </h3>
                    <p className='text-sm text-muted-foreground'>{description}</p>
                    {collected && dateCollected && (
                        <p className='text-xs text-muted-foreground mt-2'>
                            {t('achievement.achieved', { date: new Date(dateCollected).toLocaleDateString() })}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export { AchievementCard };