'use client';

import { useEffect, useRef, useState, useTransition } from 'react';

import { Check, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';

import { locales, localeNames, type Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const activeLocale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function select(locale: Locale) {
    setOpen(false);
    if (locale === activeLocale) return;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'hover:border-brand/50 hover:text-brand border-border text-muted-foreground flex size-10 items-center justify-center rounded-full border transition-colors',
          isPending && 'opacity-60',
        )}
      >
        <Globe className="size-5" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="bg-popover text-popover-foreground border-border absolute end-0 z-50 mt-2 min-w-44 overflow-hidden rounded-xl border p-1 shadow-xl"
        >
          {locales.map((locale) => (
            <li key={locale}>
              <button
                type="button"
                role="option"
                aria-selected={locale === activeLocale}
                onClick={() => select(locale)}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  locale === activeLocale && 'text-brand font-medium',
                )}
              >
                {localeNames[locale]}
                {locale === activeLocale && <Check className="size-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
