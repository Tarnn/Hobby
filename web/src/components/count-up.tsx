'use client';

import { useEffect, useRef, useState } from 'react';

import { useInView } from 'motion/react';

// Animates the numeric part of a value (e.g. "10+", "4"). Non-numeric values
// like "Millions" render as-is.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState<string>(value);

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || target === null) return;
    let raf = 0;
    const duration = 1200;
    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const p = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(eased * target)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setDisplay(`0${suffix}`);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, suffix]);

  return <span ref={ref}>{target === null ? value : display}</span>;
}
