'use client';

import Link from 'next/link';

import { motion, useMotionValue, useSpring } from 'motion/react';

import { cn } from '@/lib/utils';

// "TK" drawn as geometry on a 36-unit grid, so the mark renders identically
// everywhere (no font dependency). Shared with public/favicon/favicon.svg.
const MONOGRAM =
  'M4.85 10H16.45V13.7H4.85Z M8.8 10H12.5V26H8.8Z M18.85 10H22.55V26H18.85Z M19.14 20.2L25.66 10L30.04 10L22.26 22.2Z M25.1 15.94L31.14 26L26.56 26L21.74 17.95Z';

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
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
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
        'group relative inline-flex items-center gap-2.5 font-semibold tracking-tight',
        className,
      )}
    >
      <motion.span
        style={{ x: sx, y: sy }}
        className="relative grid size-9 place-items-center"
      >
        {/* Rotating gradient glow (revealed on hover) */}
        <motion.span
          aria-hidden
          className="absolute -inset-1.5 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"
          style={{
            background:
              'conic-gradient(from 0deg, var(--brand), var(--brand-2), var(--brand))',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Monogram tile */}
        <motion.span
          whileHover={{ rotate: -6, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="from-brand to-brand-2 relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br shadow-md ring-1 ring-white/25"
        >
          {/* Monogram */}
          <svg
            viewBox="0 0 36 36"
            className="text-brand-foreground size-9"
            fill="none"
            aria-hidden="true"
          >
            <path d={MONOGRAM} fill="currentColor" />
          </svg>

          {/* Sheen sweep on hover */}
          <span className="pointer-events-none absolute inset-0 -translate-x-[120%] -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />
        </motion.span>
      </motion.span>

      <span
        className={cn(
          'text-lg',
          tone === 'light' ? 'text-white' : 'text-base-dark',
        )}
      >
        Taranjit
        <span className="text-brand inline-block transition-transform duration-300 group-hover:translate-y-0.5">
          .
        </span>
      </span>
    </Link>
  );
}
