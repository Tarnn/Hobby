'use client';

import * as React from 'react';

import { Moon, Sun, Sunset } from 'lucide-react';
import { AnimatePresence, motion as m } from 'motion/react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import { nextTimeOfDay, setTimeOfDay, type TimeOfDay } from '@/lib/time-of-day';

const ICONS: Record<TimeOfDay, typeof Sun> = {
  morning: Sun,
  golden: Sunset,
  night: Moon,
};

const TINTS: Record<TimeOfDay, string> = {
  morning: 'text-amber-500',
  golden: 'text-orange-300',
  night: 'text-sky-200',
};

/** Navbar control: cycles morning → golden → night. */
export function ThemeToggle() {
  const t = useTranslations('hero.tod');
  const tod = useTimeOfDay();
  const ref = React.useRef<HTMLButtonElement>(null);

  const onClick = () => {
    if (!tod) return;
    const rect = ref.current?.getBoundingClientRect();
    setTimeOfDay(nextTimeOfDay(tod), {
      origin: rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : undefined,
    });
  };

  const Icon = tod ? ICONS[tod] : Sun;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={tod ? `${t('label')}: ${t(tod)}` : t('label')}
      title={tod ? `${t('label')}: ${t(tod)}` : undefined}
      className="relative size-10 overflow-hidden rounded-full"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={tod ?? 'pending'}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="grid place-items-center"
        >
          <Icon className={`size-[18px] ${tod ? TINTS[tod] : 'opacity-0'}`} />
        </m.span>
      </AnimatePresence>
    </Button>
  );
}
