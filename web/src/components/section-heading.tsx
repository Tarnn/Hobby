import { type ReactNode } from 'react';

import { Reveal } from './reveal';

import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className,
      )}
    >
      <Reveal>
        <span className="bg-brand/10 text-brand ring-brand/20 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
          <span className="bg-brand size-1.5 rounded-full" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className="text-muted-foreground max-w-2xl text-base text-pretty md:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
