'use client';

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { CountUp } from '../count-up';
import { GrassSilhouette } from '../grass-silhouette';
import { Reveal } from '../reveal';
import { em, SectionHeading } from '../section-heading';

import { EXPERIENCE, PROFILE } from '@/content/portfolio';
import { TIMES_OF_DAY } from '@/lib/time-of-day';

// Numeric values animate; `null` means a localized word (about.statValues).
const STATS = [
  { key: 'years', value: '10+' },
  { key: 'companies', value: '6' },
  { key: 'industries', value: '4' },
  { key: 'users', value: null },
] as const;

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
        {/* One graded portrait per time of day. Inactive ones are
            display:none and lazy, so only the current grade downloads. */}
        <div className="absolute bottom-0 left-1/2 aspect-square w-[94%] -translate-x-1/2 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          {TIMES_OF_DAY.map((tod) => (
            <Image
              key={tod}
              src={PROFILE.portrait[tod]}
              alt={PROFILE.name}
              fill
              sizes="(max-width: 768px) 264px, 316px"
              className={`tod-${tod} object-contain`}
            />
          ))}
          {/* Rim light from the sun, clipped to the silhouette */}
          <div
            aria-hidden
            className="portrait-rim absolute inset-0"
            style={{
              maskImage: `url(${PROFILE.portrait.morning})`,
              WebkitMaskImage: `url(${PROFILE.portrait.morning})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
            }}
          />
        </div>
        {/* Grass in front, so he's standing in the meadow */}
        <GrassSilhouette className="absolute inset-x-0 -bottom-px h-[22%] w-full" />
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
                  // dt before dd for valid markup; column-reverse puts the
                  // number on top visually.
                  <div key={stat.key} className="flex flex-col-reverse">
                    <dt className="text-muted-foreground mt-2 font-mono text-[10.5px] tracking-[0.14em] uppercase">
                      {t(`stats.${stat.key}`)}
                    </dt>
                    <dd className="font-display text-gradient-brand text-[2.6rem] leading-none font-light md:text-5xl">
                      <CountUp
                        value={
                          stat.value === null
                            ? t(`statValues.${stat.key}`)
                            : stat.value
                        }
                      />
                    </dd>
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
