'use client';

import { useEffect, useState } from 'react';

import { ArrowDownToLine } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '../language-switcher';
import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { Wordmark } from '../ui/wordmark';

import { NAV_LINKS, PROFILE } from '@/content/portfolio';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <motion.div
        initial={false}
        animate={{
          width: scrolled ? '100%' : '100%',
        }}
        className={cn(
          'flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-colors duration-300 md:px-6',
          scrolled
            ? 'border-border bg-background/70 shadow-lg backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <Wordmark />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                active === link.id
                  ? 'text-brand bg-brand/10'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t(link.id)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full">
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowDownToLine className="size-4" />
              {t('resume')}
            </a>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex size-10 items-center justify-center"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="relative h-4 w-6">
              <span
                className={cn(
                  'bg-foreground absolute left-0 block h-0.5 w-full rounded-full transition-all duration-300',
                  menuOpen ? 'top-1/2 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'bg-foreground absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 rounded-full transition-all duration-300',
                  menuOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'bg-foreground absolute left-0 block h-0.5 w-full rounded-full transition-all duration-300',
                  menuOpen ? 'top-1/2 -rotate-45' : 'bottom-0',
                )}
              />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 top-0 z-40 md:hidden',
          menuOpen ? 'visible' : 'invisible',
        )}
      >
        <div
          className={cn(
            'bg-background/95 absolute inset-0 backdrop-blur-xl transition-opacity duration-300',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={cn(
            'relative flex h-full flex-col items-center justify-center gap-2 transition-all duration-300',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'text-2xl font-semibold transition-colors',
                active === link.id ? 'text-brand' : 'text-foreground',
              )}
            >
              {t(link.id)}
            </a>
          ))}
          <Button asChild size="lg" className="mt-6 rounded-full">
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <ArrowDownToLine className="size-4" />
              {t('resume')}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
