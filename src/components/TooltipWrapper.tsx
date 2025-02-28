import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

interface UseTooltipProps {
    message: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
};
 
const TooltipWrapper = ({ message, children, position = 'top' }: UseTooltipProps) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={position}>
                    <p className='text-center whitespace-pre-line'>{message}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};

export { TooltipWrapper };