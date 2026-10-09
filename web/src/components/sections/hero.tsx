'use client';

import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import { ArrowDown, Hand, Mail, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { TimeOfDaySwitch } from '../time-of-day-switch';
import { Button } from '../ui/button';

import { canRunMeadow, whenIdle } from '@/lib/gpu';

const Meadow = dynamic(() => import('../meadow/meadow'), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          );
        },
        deleting ? 45 : 85,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

/** Tarn's local time (San Jose). Client-only to avoid hydration drift. */
function LocalClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Los_Angeles',
      timeZoneName: 'short',
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return now ? <span> · {now}</span> : null;
}

const chip =
  'border-foreground/10 bg-background/55 text-foreground/80 rounded-full border px-3 py-1.5 backdrop-blur-md';

export default function Hero() {
  const t = useTranslations('hero');
  const roles = t.raw('roles') as string[];
  const typed = useTypewriter(roles);
  const surface = useRef<HTMLElement>(null);
  // three.js is fetched only after first paint, and only where it runs well;
  // everyone else keeps the poster still underneath.
  const [meadowOn, setMeadowOn] = useState(false);
  useEffect(() => whenIdle(() => canRunMeadow() && setMeadowOn(true)), []);

  const [first, ...rest] = t('name').split(' ');

  return (
    <section
      id="top"
      ref={surface}
      className="cursor-hand relative isolate h-svh min-h-[640px] w-full overflow-hidden"
    >
      {/* CSS sky — under the meadow, and the fallback without WebGL */}
      <div aria-hidden className="hero-sky absolute inset-0 -z-30" />
      <div aria-hidden className="hero-poster absolute inset-0 -z-30" />
      <div className="absolute inset-0 -z-20">
        {meadowOn && <Meadow surface={surface} />}
      </div>
      <div
        aria-hidden
        className="hero-scrim pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="from-background pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t to-transparent"
      />

      <div className="container flex h-full flex-col pt-28 md:pt-36 lg:pt-40">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center md:mx-0 md:items-start md:text-left">
          <h1 className="font-display mt-6 text-[clamp(4.1rem,13vw,9.25rem)] leading-[0.9] font-light tracking-[-0.035em] text-balance">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              {first}
            </motion.span>{' '}
            <motion.em
              className="inline-block pr-[0.06em]"
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.22, ease: EASE }}
            >
              {rest.join(' ')}
            </motion.em>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-foreground/85 mt-5 flex h-6 items-center font-mono text-xs tracking-[0.16em] uppercase sm:text-sm"
          >
            <span className="text-brand mr-2">◆</span>
            <span>{typed}</span>
            <span className="bg-brand ml-1 inline-block h-4 w-[2px] animate-pulse" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="text-foreground/80 mt-6 hidden max-w-xl text-base/relaxed text-pretty sm:block md:text-lg/relaxed"
          >
            {t('tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="mt-7 flex flex-wrap justify-center gap-2.5 sm:mt-8 sm:gap-3 md:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-5 text-[15px] shadow-lg shadow-black/10 sm:px-6 sm:text-base"
            >
              <a href="#contact">
                <Mail className="size-4" />
                {t('ctaContact')}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-background/45 border-foreground/15 rounded-full px-5 text-[15px] backdrop-blur-md sm:px-6 sm:text-base"
            >
              <a href="#experience">
                <ArrowDown className="size-4" />
                {t('ctaWork')}
              </a>
            </Button>
          </motion.div>
        </div>

        {/* HUD — location + clock · time of day · how to play */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
          className="mt-auto grid grid-cols-1 items-end gap-3 pb-5 font-mono text-[10.5px] tracking-[0.14em] uppercase md:grid-cols-[1fr_auto_1fr] md:pb-7"
        >
          <div className="hidden md:flex">
            <span className={`${chip} inline-flex items-center gap-2`}>
              <MapPin className="text-brand size-3.5" />
              {t('basedIn')}
              <LocalClock />
            </span>
          </div>
          <div className="flex flex-col items-center gap-2.5">
            <TimeOfDaySwitch className="font-sans tracking-normal normal-case" />
            <span className="text-foreground/70 md:hidden">
              {t('hintTouch')}
            </span>
          </div>
          <div className="hidden justify-end md:flex">
            <span className={`${chip} inline-flex items-center gap-2`}>
              <Hand className="text-brand size-3.5" />
              {t('hint')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
