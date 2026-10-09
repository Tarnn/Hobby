'use client';

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { CountUp } from '../count-up';
import { Reveal } from '../reveal';
import { em, SectionHeading } from '../section-heading';

import { EXPERIENCE, PROFILE } from '@/content/portfolio';

const STATS = [
  { key: 'years', value: '10+' },
  { key: 'companies', value: '6' },
  { key: 'industries', value: '4' },
  { key: 'users', value: 'Millions' },
] as const;

// Deterministic grass silhouette for the portrait window. Integer PRNG keeps
// the path identical on server and client (no hydration drift).
function prng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const BLADES = (() => {
  const rand = prng(42);
  const n = (v: number) => v.toFixed(2);
  return Array.from({ length: 46 }, (_, i) => {
    const x = (i / 45) * 100 + (rand() - 0.5) * 2.4;
    const h = 34 + rand() * 46;
    const lean = (rand() - 0.5) * 10;
    return `M${n(x - 1.6)} 100 Q${n(x + lean * 0.4)} ${n(100 - h * 0.6)} ${n(x + lean)} ${n(100 - h)} Q${n(x + lean * 0.3 + 0.6)} ${n(100 - h * 0.55)} ${n(x + 1.6)} 100Z`;
  }).join(' ');
})();

/** Arched "window" onto the current sky, with Tarn standing in the meadow. */
function PortraitWindow() {
  const t = useTranslations('about');
  const current = EXPERIENCE[0]; // most recent role

  return (
    <div className="group relative w-fit">
      {/* Ambient glow keyed to the time of day */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-10 bottom-0 rounded-full opacity-70 blur-3xl"
        style={{ background: 'var(--sun-glow)' }}
      />

      <div className="ring-foreground/10 relative aspect-[4/5] w-[17.5rem] overflow-hidden rounded-t-[999px] rounded-b-[2.25rem] shadow-2xl ring-1 md:w-[21rem]">
        <div aria-hidden className="hero-sky absolute inset-0" />
        {/* Sun / moon */}
        <motion.div
          aria-hidden
          className="absolute top-[15%] left-[17%] size-11 rounded-full md:size-14"
          style={{
            background: 'var(--sun-disc)',
            boxShadow: '0 0 60px 22px var(--sun-glow)',
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Image
          src={PROFILE.portraitCutout}
          alt={PROFILE.name}
          width={800}
          height={800}
          sizes="(max-width: 768px) 280px, 336px"
          className="absolute bottom-0 left-1/2 w-[94%] -translate-x-1/2 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          priority
        />
        {/* Grass in front, so he's standing in the meadow */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-x-0 -bottom-px h-[22%] w-full"
          style={{ color: 'var(--grass-silhouette)' }}
        >
          <path d={BLADES} fill="currentColor" />
          <rect y="92" width="100" height="8" fill="currentColor" />
        </svg>
      </div>

      {/* Floating "currently at" badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-background/85 ring-border absolute top-[22%] -right-6 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl ring-1 backdrop-blur md:-right-10"
      >
        <span className="grid size-7 place-items-center rounded-lg bg-white">
          <img
            src={current.logo}
            alt={current.company}
            className="size-5 object-contain"
          />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-muted-foreground text-[10px]">
            {t('currentlyAt')}
          </span>
          <span className="text-xs font-semibold">{current.company}</span>
        </span>
      </motion.div>

      {/* Location badge */}
      <div className="bg-background/85 ring-border absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xl ring-1 backdrop-blur">
        <MapPin className="text-brand size-4" />
        {t('location')}
      </div>
    </div>
  );
}

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow={t('eyebrow')}
          title={t.rich('title', { em })}
          align="center"
        />

        <div className="mt-16 grid items-center gap-16 md:mt-20 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal className="flex justify-center md:justify-start">
            <PortraitWindow />
          </Reveal>

          <div className="flex flex-col gap-5">
            {(['p1', 'p2', 'p3', 'p4'] as const).map((p, i) => (
              <Reveal key={p} delay={i}>
                <p
                  className={
                    i === 0
                      ? 'text-foreground/90 text-lg/relaxed md:text-xl/relaxed'
                      : 'text-muted-foreground text-base/relaxed md:text-lg/relaxed'
                  }
                >
                  {t(p)}
                </p>
              </Reveal>
            ))}

            <Reveal delay={4}>
              <dl className="border-border mt-4 grid grid-cols-2 gap-x-4 gap-y-7 border-t pt-8 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div key={stat.key} className="flex flex-col">
                    <dt className="sr-only">{t(`stats.${stat.key}`)}</dt>
                    <dd className="font-display text-gradient-brand text-[2.6rem] leading-none font-light md:text-5xl">
                      <CountUp value={stat.value} />
                    </dd>
                    <span className="text-muted-foreground mt-2 font-mono text-[10.5px] tracking-[0.14em] uppercase">
                      {t(`stats.${stat.key}`)}
                    </span>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
