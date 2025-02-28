'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';

const NotFoundPage = () => {
    const id = 'not-found';
    const { t } = useTranslation();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className='flex flex-1 w-screen h-screen items-center justify-center text-lg'>
                {t(`${id}.loading`)}
            </div>
        )
    }

    return (
        <div className='flex flex-1 w-screen h-screen items-center justify-center bg-background px-4'>
            <Card className='max-w-lg text-center shadow-lg p-6'>
                <CardContent>
                    <Image 
                        src='/assets/not-found.webp' 
                        alt='Not Found' 
                        width={400} 
                        height={300} 
                        className='mx-auto rounded-lg'
                    />
                    <h2 className='text-2xl md:text-3xl font-semibold mt-4'>{t(`${id}.title`)}</h2>
                    <p className='text-md md:text-lg text-muted-foreground mt-2'>{t(`${id}.description`)}</p>
                    <Button asChild className='mt-4'>
                        <Link href='/'>{t(`${id}.button`)}</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFoundPage;