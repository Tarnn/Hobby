'use client';

import { ArrowUpRight, FileText, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

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
          className="border-border relative overflow-hidden rounded-[2rem] border p-6 md:p-12 lg:p-16"
        >
          {/* Decorative backdrop */}
          <div className="absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-40" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 60% 80% at 50% 120%, color-mix(in srgb, var(--brand) 25%, transparent), transparent 70%)',
              }}
            />
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            {/* Left: pitch + quick methods */}
            <div className="flex flex-col">
              <span className="bg-brand/10 text-brand ring-brand/20 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1">
                <span className="bg-brand size-1.5 rounded-full" />
                {t('eyebrow')}
              </span>
              <h2 className="mt-6 max-w-md text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
                {t('title')}
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
                    className="group border-border bg-card/50 hover:border-brand/50 flex items-center gap-4 rounded-xl border p-4 transition-colors"
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
