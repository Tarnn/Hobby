'use client';

import Image from 'next/image';

import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CountUp } from '../count-up';
import { Reveal } from '../reveal';
import { SectionHeading } from '../section-heading';

import { PROFILE } from '@/content/portfolio';

const STATS = [
  { key: 'years', value: '10+' },
  { key: 'companies', value: '4' },
  { key: 'users', value: 'Millions' },
] as const;

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          align="center"
        />

        <div className="mt-14 grid items-center gap-10 md:mt-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14">
          {/* Photo */}
          <Reveal className="flex justify-center md:justify-start">
            <div className="group relative">
              <div className="from-brand absolute -inset-3 rounded-[2rem] bg-gradient-to-tr to-purple-500 opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
              <div className="ring-border bg-card relative overflow-hidden rounded-[1.75rem] ring-1">
                <Image
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  width={420}
                  height={520}
                  className="h-auto w-72 object-cover transition-transform duration-500 group-hover:scale-[1.03] md:w-80"
                  priority
                />
              </div>
              <div className="bg-background/80 ring-border absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-lg ring-1 backdrop-blur">
                <MapPin className="text-brand size-4" />
                Born in Canada · Based in the USA
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="flex flex-col gap-5">
            {(['p1', 'p2', 'p3', 'p4'] as const).map((p, i) => (
              <Reveal key={p} delay={i}>
                <p className="text-muted-foreground text-base/relaxed md:text-lg/relaxed">
                  {t(p)}
                </p>
              </Reveal>
            ))}

            <Reveal delay={4}>
              <dl className="border-border mt-4 grid grid-cols-3 gap-4 border-t pt-8">
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
