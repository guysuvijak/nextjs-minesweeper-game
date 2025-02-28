'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';

interface TimerProps {
    isRunning: boolean;
    onTimeUpdate: (time: number) => void;
}

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
    const [time, setTime] = useState(0);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // ใช้ useCallback เพื่อ memoize ฟังก์ชัน
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
    }, [onTimeUpdate]);

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

    // ใช้ Intl.RelativeTimeFormat เพื่อความยืดหยุ่น
    const formatTime = useCallback((seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(
            2,
            '0'
        )}`;
    }, []);

    return (
        <Badge variant="outline" className="font-mono text-lg">
            {formatTime(time)}
        </Badge>
    );
}
