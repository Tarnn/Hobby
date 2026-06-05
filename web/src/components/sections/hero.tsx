'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { ArrowDownToLine, FileText, MousePointerClick } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';

import { PROFILE } from '@/content/portfolio';

const HeroCanvas = dynamic(() => import('../hero-canvas'), { ssr: false });

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          );
        },
        deleting ? 45 : 85,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export default function Hero() {
  const t = useTranslations('hero');
  const roles = t.raw('roles') as string[];
  const typed = useTypewriter(roles);

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* WebGL particle field */}
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>

      {/* Gradient + grid backdrop (also fallback when WebGL/reduced-motion off) */}
      <div className="absolute inset-0 -z-20">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 50% at 50% -10%, color-mix(in srgb, var(--brand) 28%, transparent), transparent 70%)',
          }}
        />
        <div className="from-background absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
      </div>

      <div className="container flex flex-col items-center pt-28 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-border bg-background/50 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          <span className="text-muted-foreground">{t('available')}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-muted-foreground mb-3 text-lg font-medium"
        >
          {t('greeting')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-brand">{t('name')}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 flex h-10 items-center text-xl font-medium sm:text-2xl md:text-3xl"
        >
          <span className="text-foreground">{typed}</span>
          <span className="bg-brand ml-1 inline-block h-7 w-0.5 animate-pulse md:h-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-muted-foreground mt-7 max-w-2xl text-base text-pretty md:text-lg"
        >
          {t('tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="rounded-full text-base">
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowDownToLine className="size-4" />
              {t('downloadResume')}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-background/40 rounded-full text-base backdrop-blur"
          >
            <a
              href={PROFILE.coverLetterUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="size-4" />
              {t('downloadCoverLetter')}
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label={t('scroll')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-muted-foreground hover:text-brand absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs transition-colors md:flex"
      >
        <MousePointerClick className="size-4" />
        {t('scroll')}
      </motion.a>
    </section>
  );
}
