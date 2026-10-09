'use client';

import { useRef } from 'react';

import { Moon, Sun, Sunset } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import { setTimeOfDay, TIMES_OF_DAY, type TimeOfDay } from '@/lib/time-of-day';
import { cn } from '@/lib/utils';

const ICONS: Record<TimeOfDay, typeof Sun> = {
  morning: Sun,
  golden: Sunset,
  night: Moon,
};

/** Labeled segmented control (radiogroup) for the hero meadow. */
export function TimeOfDaySwitch({ className }: { className?: string }) {
  const t = useTranslations('hero.tod');
  const tod = useTimeOfDay();
  const refs = useRef<Record<TimeOfDay, HTMLButtonElement | null>>({
    morning: null,
    golden: null,
    night: null,
  });

  const select = (next: TimeOfDay) => {
    const rect = refs.current[next]?.getBoundingClientRect();
    setTimeOfDay(next, {
      origin: rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : undefined,
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!tod) return;
    const dir =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? -1
          : 0;
    if (!dir) return;
    e.preventDefault();
    const i = TIMES_OF_DAY.indexOf(tod);
    const next =
      TIMES_OF_DAY[(i + dir + TIMES_OF_DAY.length) % TIMES_OF_DAY.length];
    select(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={t('label')}
      className={cn(
        'border-foreground/10 bg-background/55 inline-flex items-center gap-0.5 rounded-full border p-1 shadow-lg shadow-black/5 backdrop-blur-xl',
        className,
      )}
    >
      {TIMES_OF_DAY.map((value) => {
        const Icon = ICONS[value];
        const active = tod === value;
        return (
          <button
            key={value}
            ref={(el) => {
              refs.current[value] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active || (!tod && value === 'morning') ? 0 : -1}
            onClick={() => select(value)}
            onKeyDown={onKeyDown}
            className={cn(
              'focus-visible:ring-ring/60 relative flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors outline-none focus-visible:ring-2 sm:px-3.5',
              active
                ? 'text-foreground'
                : 'text-foreground/60 hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId="tod-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="bg-background absolute inset-0 rounded-full shadow-sm"
              />
            )}
            <Icon className="relative size-3.5" />
            <span className="relative">{t(value)}</span>
          </button>
        );
      })}
    </div>
  );
}
