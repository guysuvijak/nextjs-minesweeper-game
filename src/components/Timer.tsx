'use client';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface TimerProps {
    isRunning: boolean;
    onTimeUpdate: (time: number) => void;
};

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
    const [ time, setTime ] = useState(0);
    
    useEffect(() => {
        onTimeUpdate(time);
    }, [time, onTimeUpdate]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
            setTime(prev => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Badge variant='outline' className='font-mono text-lg'>
            {formatTime(time)}
        </Badge>
    )
};