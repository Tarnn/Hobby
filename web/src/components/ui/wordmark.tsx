'use client';

import Link from 'next/link';

import { motion, useMotionValue, useSpring } from 'motion/react';

import { Monogram } from './monogram';

import { cn } from '@/lib/utils';

/** Masthead lockup: TK ligature, hairline, "Taranjit *Kang*" in IvyPresto. */
export function Wordmark({
  className,
  tone = 'auto',
}: {
  className?: string;
  tone?: 'auto' | 'light';
}) {
  // Magnetic: the mark gently follows the cursor while hovered.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link
      href="#top"
      aria-label="Taranjit Kang, home"
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        'group relative inline-flex items-center gap-3',
        tone === 'light' ? 'text-white' : 'text-foreground',
        className,
      )}
    >
      <motion.span style={{ x: sx, y: sy }} className="block">
        <Monogram className="group-hover:text-brand h-[26px] w-auto transition-colors duration-300" />
      </motion.span>
      <span
        aria-hidden
        className={cn(
          'h-5 w-px',
          tone === 'light' ? 'bg-white/25' : 'bg-foreground/20',
        )}
      />
      <span className="font-display text-[1.3rem] leading-none tracking-[-0.01em] whitespace-nowrap">
        Taranjit <em>Kang</em>
      </span>
    </Link>
  );
}
