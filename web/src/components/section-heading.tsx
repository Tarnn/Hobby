import { type ReactNode } from 'react';

import { Reveal } from './reveal';

import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  /** Two-digit chapter marker, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

/** Italic accent for `t.rich('title', { em })` section titles. */
export const em = (chunks: ReactNode) => <em>{chunks}</em>;

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className,
      )}
    >
      <Reveal>
        <span className="text-muted-foreground inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase">
          {index && <span className="text-brand">{index}</span>}
          <span aria-hidden className="bg-border h-px w-8" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="font-display max-w-3xl text-[2.6rem] leading-[1.02] font-light tracking-[-0.025em] text-balance md:text-6xl lg:text-[4.25rem]">
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
