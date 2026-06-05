export const locales = ['en', 'es', 'fr', 'hi', 'pa'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  hi: 'हिन्दी',
  pa: 'ਪੰਜਾਬੀ',
};

export const LOCALE_COOKIE = 'NEXT_LOCALE';
