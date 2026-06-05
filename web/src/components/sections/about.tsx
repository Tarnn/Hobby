'use client';

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { CountUp } from '../count-up';
import { Reveal } from '../reveal';
import { SectionHeading } from '../section-heading';

import { EXPERIENCE, PROFILE } from '@/content/portfolio';

const STATS = [
  { key: 'years', value: '10+' },
  { key: 'companies', value: '6' },
  { key: 'industries', value: '4' },
  { key: 'users', value: 'Millions' },
] as const;

export default function About() {
  const t = useTranslations('about');
  const current = EXPERIENCE[0]; // most recent role

  return (
    <section id="about" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          align="center"
        />

        <div className="mt-16 grid items-center gap-14 md:mt-20 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
          {/* Photo */}
          <Reveal className="flex justify-center md:justify-start">
            <div className="group relative w-fit">
              {/* Ambient gradient blobs */}
              <div
                aria-hidden
                className="bg-brand/30 absolute -top-8 -left-8 size-40 rounded-full blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -right-6 -bottom-10 size-40 rounded-full bg-purple-500/30 blur-3xl"
              />

              {/* Gradient ring frame */}
              <div className="from-brand relative rounded-[2rem] bg-gradient-to-br to-purple-500 p-[3px] shadow-2xl">
                <div className="bg-card overflow-hidden rounded-[1.85rem]">
                  <Image
                    src={PROFILE.photo}
                    alt={PROFILE.name}
                    width={420}
                    height={520}
                    className="h-auto w-72 object-cover transition-transform duration-500 group-hover:scale-[1.04] md:w-80"
                    priority
                  />
                </div>

                {/* Floating "currently at" badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="bg-background/85 ring-border absolute -top-4 -right-4 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-xl ring-1 backdrop-blur"
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
                    <span className="text-xs font-semibold">
                      {current.company}
                    </span>
                  </span>
                </motion.div>
              </div>

              {/* Location badge */}
              <div className="bg-background/85 ring-border absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xl ring-1 backdrop-blur">
                <MapPin className="text-brand size-4" />
                {t('location')}
              </div>
            </div>
          </Reveal>

          {/* Text + stats */}
          <div className="flex flex-col gap-5">
            {(['p1', 'p2', 'p3', 'p4'] as const).map((p, i) => (
              <Reveal key={p} delay={i}>
                <p className="text-muted-foreground text-base/relaxed md:text-lg/relaxed">
                  {t(p)}
                </p>
              </Reveal>
            ))}

            <Reveal delay={4}>
              <dl className="border-border mt-4 grid grid-cols-2 gap-x-4 gap-y-6 border-t pt-8 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div key={stat.key} className="flex flex-col">
                    <dt className="sr-only">{t(`stats.${stat.key}`)}</dt>
                    <dd className="text-gradient-brand text-3xl font-bold md:text-4xl">
                      <CountUp value={stat.value} />
                    </dd>
                    <span className="text-muted-foreground mt-1 text-xs md:text-sm">
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
