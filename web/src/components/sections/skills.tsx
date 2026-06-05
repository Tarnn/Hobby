'use client';

/* eslint-disable @next/next/no-img-element */
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { SectionHeading } from '../section-heading';

import { SKILLS, type Skill } from '@/content/portfolio';

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <div className="border-border bg-card hover:border-brand/50 group flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-3 shadow-sm transition-colors">
      <img
        src={skill.logo}
        alt={skill.name}
        loading="lazy"
        className="size-7 object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-sm font-medium whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

function Marquee({
  items,
  direction = 'left',
  duration = 40,
}: {
  items: Skill[];
  direction?: 'left' | 'right';
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden py-1">
      <motion.div
        className="flex w-max gap-4"
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : '0%' }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const t = useTranslations('skills');
  const half = Math.ceil(SKILLS.length / 2);
  const row1 = SKILLS.slice(0, half);
  const row2 = SKILLS.slice(half);

  return (
    <section id="skills" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      <div className="relative mt-12 flex flex-col gap-4 md:mt-16">
        {/* edge fades */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent md:w-32" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent md:w-32" />
        <Marquee items={row1} direction="left" duration={38} />
        <Marquee items={row2} direction="right" duration={44} />
      </div>
    </section>
  );
}
