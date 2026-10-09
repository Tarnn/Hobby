'use client';

import { useEffect, useState } from 'react';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '../language-switcher';
import { Wordmark } from '../ui/wordmark';

import { NAV_LINKS } from '@/content/portfolio';
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
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
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
          // z-50 keeps the bar (and its close button) above the menu overlay.
          'relative z-50 flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-colors duration-300 md:px-6',
          scrolled
            ? 'border-border bg-background/70 shadow-lg backdrop-blur-xl'
            : 'border-foreground/10 bg-background/30 backdrop-blur-md',
        )}
      >
        <Wordmark />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                active === link.id
                  ? 'text-brand bg-brand/10'
                  : 'text-foreground/70 hover:text-foreground',
              )}
            >
              {t(link.id)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="focus-visible:ring-ring relative flex size-10 items-center justify-center rounded-full outline-none focus-visible:ring-2"
          >
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
        id="mobile-menu"
        className={cn(
          'fixed inset-0 top-0 z-40 lg:hidden',
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
            'pointer-events-none relative flex h-full flex-col items-center justify-center gap-2 transition-all duration-300',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'pointer-events-auto text-2xl font-semibold transition-colors',
                active === link.id ? 'text-brand' : 'text-foreground',
              )}
            >
              {t(link.id)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
