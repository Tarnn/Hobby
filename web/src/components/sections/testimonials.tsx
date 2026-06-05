'use client';

/* eslint-disable @next/next/no-img-element */
import { Linkedin, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { SectionHeading } from '../section-heading';

import { TESTIMONIALS } from '@/content/portfolio';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonials" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-14 columns-1 gap-5 md:mt-16 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="border-border bg-card hover:border-brand/40 mb-5 break-inside-avoid rounded-2xl border p-6 shadow-sm transition-colors"
            >
              <Quote className="text-brand/30 size-8" />
              <blockquote className="text-muted-foreground mt-3 text-sm/relaxed">
                {item.quote}
              </blockquote>
              <figcaption className="border-border mt-5 flex items-center gap-3 border-t pt-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy"
                  className="size-11 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">
                    {item.name}
                  </div>
                  <div className="text-muted-foreground truncate text-xs">
                    {item.occupation}
                  </div>
                </div>
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} on LinkedIn`}
                  className="text-muted-foreground hover:text-brand hover:border-brand border-border grid size-9 shrink-0 place-items-center rounded-full border transition-colors"
                >
                  <Linkedin className="size-4" />
                </a>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
