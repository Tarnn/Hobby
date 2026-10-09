// Time of day is the site's theme: it drives both the CSS tokens (via
// `data-tod` on <html>) and the WebGL meadow palette. Defaults to the
// visitor's local clock until they pick one, which is then persisted.

export const TIMES_OF_DAY = ['morning', 'golden', 'night'] as const;
export type TimeOfDay = (typeof TIMES_OF_DAY)[number];

export const TOD_STORAGE_KEY = 'tod';

export function isTimeOfDay(value: unknown): value is TimeOfDay {
  return (
    typeof value === 'string' &&
    (TIMES_OF_DAY as readonly string[]).includes(value)
  );
}

export function timeOfDayForHour(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 16) return 'morning';
  if (hour >= 16 && hour < 20) return 'golden';
  return 'night';
}

/**
 * Inline <head> script: resolves the time of day before first paint so the
 * page never flashes the wrong palette. Must stay dependency-free.
 */
export const TOD_INIT_SCRIPT = `(function(){try{var k='${TOD_STORAGE_KEY}',s=null;try{s=localStorage.getItem(k)}catch(e){}var t=(s==='morning'||s==='golden'||s==='night')?s:null;if(!t){var h=new Date().getHours();t=h>=5&&h<16?'morning':h>=16&&h<20?'golden':'night'}var d=document.documentElement;d.setAttribute('data-tod',t);d.classList.toggle('dark',t!=='morning');d.style.colorScheme=t==='morning'?'light':'dark'}catch(e){}})();`;

// ---------------------------------------------------------------------------
// Tiny external store (useSyncExternalStore-compatible). The DOM attribute is
// the source of truth so the inline script and React never disagree.

const listeners = new Set<() => void>();

export function subscribeTimeOfDay(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getTimeOfDaySnapshot(): TimeOfDay {
  const value = document.documentElement.getAttribute('data-tod');
  return isTimeOfDay(value) ? value : 'night';
}

export function getTimeOfDayServerSnapshot(): TimeOfDay | null {
  return null;
}

function applyToDocument(tod: TimeOfDay) {
  const root = document.documentElement;
  root.setAttribute('data-tod', tod);
  root.classList.toggle('dark', tod !== 'morning');
  root.style.colorScheme = tod === 'morning' ? 'light' : 'dark';
}

type SetOptions = {
  /** Viewport point the circular reveal grows from. */
  origin?: { x: number; y: number };
};

export function setTimeOfDay(tod: TimeOfDay, { origin }: SetOptions = {}) {
  if (tod === getTimeOfDaySnapshot()) return;

  try {
    localStorage.setItem(TOD_STORAGE_KEY, tod);
  } catch {
    // Private mode / blocked storage: the choice just won't persist.
  }

  const commit = () => {
    applyToDocument(tod);
    listeners.forEach((l) => l());
  };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduced) {
    commit();
    return;
  }

  const root = document.documentElement;
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  root.style.setProperty('--x', `${(x / window.innerWidth) * 100}%`);
  root.style.setProperty('--y', `${(y / window.innerHeight) * 100}%`);
  root.classList.remove('page-transition');
  root.classList.add('theme-transition');

  const transition = document.startViewTransition(commit);
  transition.finished.finally(() => root.classList.remove('theme-transition'));
}
