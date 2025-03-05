'use client';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TooltipWrapper } from '@/components/TooltipWrapper';
import { cn } from '@/lib/utils';
import { Dock, DockIcon } from '@/components/magicui/dock';

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
    youtube: (props: IconProps) => (
        <svg
        width='32px'
        height='32px'
        viewBox='0 0 32 32'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
        >
        <title>youtube</title>
        <path d='M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z' />
        </svg>
    ),
    github: (props: IconProps) => (
        <svg viewBox='0 0 438.549 438.549' {...props}>
        <path
            fill='currentColor'
            d='M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z'
        ></path>
        </svg>
    ),
    facebook: (props: IconProps) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 30 30'
            width='30px'
            height='30px'
            {...props}
        >
        <path fill='currentColor' d='M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z'/>
        </svg>
    ),
    discord: (props: IconProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            {...props}
        >
            <path fill='currentColor' d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
        </svg>
    )
};

const DATA = {
    navbar: [
        { href: 'https://www.facebook.com/guy.suvijak', icon: Icons.facebook, label: 'Facebook' },
        { href: 'https://www.youtube.com/@MeteorVIIx', icon: Icons.youtube, label: 'Youtube' },
        { href: 'https://discord.gg/6KbSzbc999', icon: Icons.discord, label: 'Discord' },
    ],
    contact: {
        social: {
            GitHub: {
                name: 'GitHub',
                url: 'https://github.com/guysuvijak',
                icon: Icons.github,
            },
            SourceCode: {
                name: 'Source-code',
                url: 'https://github.com/guysuvijak/nextjs-minesweeper-game',
                icon: Icons.github
            }
        },
    },
};

export function CustomDock() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Dock direction='middle' className='my-4'>
                {DATA.navbar.map((item) => (
                    <DockIcon key={item.label}>
                        <TooltipWrapper message={item.label}>
                            <Link
                                href={item.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={item.label}
                                className={cn(
                                buttonVariants({ variant: 'ghost', size: 'icon' }),
                                'size-12 rounded-full',
                                )}
                            >
                                <item.icon className='size-4' />
                            </Link>
                        </TooltipWrapper>
                    </DockIcon>
                ))}
                
                <Separator orientation='vertical' className='h-full' />

                {Object.entries(DATA.contact.social).map(([name, social]) => (
                    <DockIcon key={name}>
                        <TooltipWrapper message={name}>
                            <Link
                                href={social.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={social.name}
                                className={cn(
                                buttonVariants({ variant: 'ghost', size: 'icon' }),
                                'size-12 rounded-full',
                                )}
                            >
                                <social.icon className='size-4' />
                            </Link>
                        </TooltipWrapper>
                    </DockIcon>
                ))}
            </Dock>
        </div>
    )
};