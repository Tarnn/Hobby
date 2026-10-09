'use client';

import { useSyncExternalStore } from 'react';

import {
  getTimeOfDayServerSnapshot,
  getTimeOfDaySnapshot,
  subscribeTimeOfDay,
  type TimeOfDay,
} from '@/lib/time-of-day';

/** Current time of day, or `null` during SSR / before hydration. */
export function useTimeOfDay(): TimeOfDay | null {
  return useSyncExternalStore(
    subscribeTimeOfDay,
    getTimeOfDaySnapshot,
    getTimeOfDayServerSnapshot,
  );
}
