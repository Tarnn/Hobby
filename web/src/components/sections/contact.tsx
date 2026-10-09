'use client';

import { ArrowUpRight, FileText, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { em } from '../section-heading';
import { ContactForm } from './contact-form';

import { PROFILE, SOCIALS } from '@/content/portfolio';

export default function Contact() {
  const t = useTranslations('contact');

  const methods = [
    {
      icon: Mail,
      label: t('emailButton'),
      href: `mailto:${PROFILE.email}`,
      value: PROFILE.email,
    },
    {
      icon: Linkedin,
      label: t('linkedinButton'),
      href: SOCIALS.linkedin,
      value: 'in/taranjit-kang',
    },
    {
      icon: FileText,
      label: t('resumeButton'),
      href: PROFILE.resumeUrl,
      value: 'PDF',
    },
  ];

  return (
    <section id="contact" className="section-padding scroll-mt-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="border-border relative isolate overflow-hidden rounded-[2rem] border p-6 pb-20 md:p-12 md:pb-24 lg:p-16 lg:pb-28"
        >
          {/* Glowing horizon — the meadow's sun, setting behind the card */}
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <div className="bg-card/40 absolute inset-0" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 70% 55% at 50% 115%, color-mix(in srgb, var(--brand) 26%, transparent), transparent 70%)',
              }}
            />
            <div
              className="absolute top-[86%] left-1/2 aspect-square w-[160%] -translate-x-1/2 rounded-full md:top-[80%] md:w-[120%]"
              style={{
                boxShadow:
                  '0 0 0 1.5px color-mix(in srgb, var(--brand) 75%, white), 0 -4px 50px 4px color-mix(in srgb, var(--brand) 45%, transparent), inset 0 10px 90px 8px color-mix(in srgb, var(--brand) 20%, transparent)',
              }}
            />
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            {/* Left: pitch + quick methods */}
            <div className="flex flex-col">
              <span className="text-muted-foreground inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase">
                <span className="text-brand">06</span>
                <span aria-hidden className="bg-border h-px w-8" />
                {t('eyebrow')}
              </span>
              <h2 className="font-display mt-6 max-w-md text-[2.6rem] leading-[1.02] font-light tracking-[-0.025em] text-balance md:text-6xl">
                {t.rich('title', { em })}
              </h2>
              <p className="text-muted-foreground mt-5 max-w-md text-base text-pretty md:text-lg">
                {t('subtitle')}
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {methods.map(({ icon: Icon, label, href, value }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group border-border bg-background/50 hover:border-brand/50 flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm transition-colors"
                  >
                    <span className="bg-brand/10 text-brand grid size-10 shrink-0 place-items-center rounded-lg">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-muted-foreground truncate text-xs">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-brand size-4 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: working form */}
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
