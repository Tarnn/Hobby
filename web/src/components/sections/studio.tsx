'use client';

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { Reveal } from '../reveal';
import { em, SectionHeading } from '../section-heading';

import { STUDIO, STUDIO_APPS, type StudioApp } from '@/content/portfolio';

const EASE = [0.22, 1, 0.36, 1] as const;

function AppCard({ app, index }: { app: StudioApp; index: number }) {
  const t = useTranslations('studio');
  const features = t.raw(`apps.${app.id}.features`) as string[];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="group border-border bg-card/70 hover:border-brand/40 relative flex flex-col overflow-hidden rounded-[1.75rem] border shadow-sm backdrop-blur-sm transition-colors"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={app.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white/90 uppercase ring-1 ring-white/15 backdrop-blur-md">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-300 opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-amber-300" />
          </span>
          {t('status')}
        </span>

        <div className="absolute inset-x-5 bottom-5 flex items-end gap-3.5">
          <img
            src={app.icon}
            alt=""
            width={56}
            height={56}
            loading="lazy"
            className="size-14 shrink-0 rounded-2xl shadow-xl ring-1 ring-white/25 transition-transform duration-500 group-hover:-rotate-6"
          />
          <div className="min-w-0 text-white">
            <h3 className="font-display text-3xl leading-none font-light tracking-tight">
              {app.name}
            </h3>
            <p className="font-display mt-1.5 truncate text-[0.95rem] text-white/85 italic">
              {t(`apps.${app.id}.tagline`)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-muted-foreground text-[0.95rem]/relaxed">
          {t(`apps.${app.id}.description`)}
        </p>
        <ul className="flex flex-wrap gap-2">
          {features.map((f) => (
            <li
              key={f}
              className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium"
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="border-border text-muted-foreground mt-auto flex items-center justify-between gap-3 border-t pt-4 font-mono text-[10.5px] tracking-[0.14em] uppercase">
          <span>{t(`apps.${app.id}.platforms`)}</span>
          <ArrowUpRight className="group-hover:text-brand size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Whole card is the link; kept last so it sits above the content. */}
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${app.name}: ${t(`apps.${app.id}.tagline`)}`}
        className="focus-visible:ring-ring absolute inset-0 rounded-[1.75rem] outline-none focus-visible:ring-2"
      />
    </motion.article>
  );
}

export default function Studio() {
  const t = useTranslations('studio');

  return (
    <section id="studio" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow={t('eyebrow')}
          title={t.rich('title', { em })}
          subtitle={t('subtitle')}
        />

        {/* Studio plate */}
        <Reveal delay={2}>
          <div className="border-border bg-card/50 mx-auto mt-12 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-3xl border px-5 py-5 text-center backdrop-blur-sm sm:flex-row sm:rounded-full sm:py-2.5 sm:ps-6 sm:pe-2.5 sm:text-left md:mt-14">
            <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:gap-3">
              {/* Logo as a mask so it inherits the current text color */}
              <span
                role="img"
                aria-label={STUDIO.legalName}
                className="text-foreground block h-7 w-[90px] bg-current"
                style={{
                  maskImage: `url(${STUDIO.logo})`,
                  WebkitMaskImage: `url(${STUDIO.logo})`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
              <span
                aria-hidden
                className="bg-border hidden h-5 w-px sm:block"
              />
              <span className="text-muted-foreground font-mono text-[10.5px] tracking-[0.14em] uppercase">
                {t('studioLine')}
              </span>
            </div>
            <a
              href={STUDIO.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand text-brand-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-transform outline-none hover:scale-[1.03] focus-visible:ring-2 active:scale-95"
            >
              {t('visit')}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {STUDIO_APPS.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
