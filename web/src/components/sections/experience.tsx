'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import Image from 'next/image';

import { ArrowUpRight, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { Reveal } from '../reveal';
import { SectionHeading } from '../section-heading';

import { EXPERIENCE } from '@/content/portfolio';
import { cn } from '@/lib/utils';

export default function Experience() {
  const t = useTranslations('experience');
  const [selected, setSelected] = useState(0);
  const active = EXPERIENCE[selected];

  return (
    <section
      id="experience"
      className="section-padding bg-muted/30 border-border scroll-mt-24 border-y"
    >
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
          {/* Timeline list */}
          <Reveal>
            <ol className="relative">
              <span className="bg-border absolute top-2 bottom-2 left-[19px] w-px md:left-[23px]" />
              {EXPERIENCE.map((exp, i) => {
                const isActive = i === selected;
                return (
                  <li key={exp.id} className="relative">
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      className={cn(
                        'group flex w-full items-start gap-4 rounded-2xl p-3 text-left transition-colors md:p-4',
                        isActive ? 'bg-card shadow-sm' : 'hover:bg-card/60',
                      )}
                    >
                      <span
                        className={cn(
                          'relative z-10 mt-0.5 grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border bg-white transition-colors md:size-12',
                          isActive
                            ? 'border-brand ring-brand/20 ring-2'
                            : 'border-border',
                        )}
                      >
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="size-6 object-contain md:size-7"
                        />
                      </span>
                      <span className="flex flex-1 flex-col">
                        <span className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2">
                            <span
                              className={cn(
                                'font-semibold transition-colors md:text-lg',
                                isActive ? 'text-brand' : 'text-foreground',
                              )}
                            >
                              {exp.company}
                            </span>
                            {exp.current && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-500">
                                <span className="size-1.5 rounded-full bg-green-500" />
                                {t('present')}
                              </span>
                            )}
                          </span>
                          <span className="text-muted-foreground text-xs font-medium md:text-sm">
                            {exp.period}
                          </span>
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {exp.role}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Detail panel */}
          <Reveal delay={1}>
            <div className="border-border bg-card sticky top-24 overflow-hidden rounded-3xl border shadow-sm">
              {/* Visual: project screenshot, or branded fallback */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    {active.image ? (
                      <div className="bg-muted absolute inset-0">
                        <Image
                          src={active.image}
                          alt={`${active.company} project`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain p-4"
                        />
                      </div>
                    ) : (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
                        style={{
                          background: `radial-gradient(ellipse 90% 90% at 50% 0%, ${active.accent}22, transparent 70%), linear-gradient(160deg, ${active.accent}14, transparent)`,
                        }}
                      >
                        <div className="bg-background/80 ring-border grid size-24 place-items-center rounded-3xl shadow-lg ring-1 backdrop-blur">
                          <img
                            src={active.logo}
                            alt={active.company}
                            className="size-14 object-contain"
                          />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
                          <Sparkles className="size-4" />
                          {active.highlight}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-border border-t p-6 md:p-8">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {active.company}
                  </h3>
                  <span className="text-muted-foreground text-sm">
                    {active.location}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground text-sm/relaxed md:text-base/relaxed">
                      {t(`items.${active.id}`)}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {active.stack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="text-brand mt-5 inline-flex items-center gap-1 text-sm font-medium">
                  {active.role} · {active.period}
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
