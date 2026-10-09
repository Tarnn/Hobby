'use client';

import { type ReactNode } from 'react';

import { MotionConfig } from 'motion/react';

/**
 * Honors prefers-reduced-motion for every motion component: transform and
 * layout animations are skipped while opacity fades still play. Doing it
 * here (not by branching per component) keeps SSR and hydration in sync.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
