'use client';
import { useEffect, useRef, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { useGameStore } from '@/stores';

interface TimerProps {
    isRunning: boolean;
    onTimeUpdate: (time: number) => void;
};

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
    const { time, setTime } = useGameStore();
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    
    const updateTime = useCallback(() => {
        if (startTimeRef.current !== null) {
            const currentTime = performance.now();
            const elapsed = Math.floor(
                (currentTime - startTimeRef.current) / 1000
            );
            setTime(elapsed);
            onTimeUpdate(elapsed);
            rafRef.current = requestAnimationFrame(updateTime);
        }
    }, [onTimeUpdate, setTime]);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = performance.now() - time * 1000;
            rafRef.current = requestAnimationFrame(updateTime);
        } else if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [time, isRunning, updateTime]);
    
    const formatTime = useCallback((seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, []);

    return (
        <Badge variant='outline' className='font-mono text-lg'>
            {formatTime(time)}
        </Badge>
    )
};
