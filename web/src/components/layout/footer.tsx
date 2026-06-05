'use client';

import { Github, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Wordmark } from '../ui/wordmark';

import { NAV_LINKS, PROFILE, SOCIALS } from '@/content/portfolio';

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const socials = [
    { href: SOCIALS.github, label: 'GitHub', icon: Github },
    { href: SOCIALS.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: SOCIALS.x, label: 'X (Twitter)', icon: XIcon },
  ];

  return (
    <footer className="bg-footer-background text-background dark:text-foreground border-t border-white/5">
      <div className="container py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark className="dark:[&_span:last-child]:text-foreground [&_span:last-child]:text-white" />
            <p className="mt-4 text-sm/relaxed opacity-70">
              {t('footer.tagline')}
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="hover:text-brand mt-4 inline-block text-sm opacity-90 transition-colors"
            >
              {PROFILE.email}
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="hover:text-brand text-sm opacity-80 transition-colors"
                >
                  {t(`nav.${link.id}`)}
                </a>
              ))}
            </nav>
            <div className="flex gap-3 md:justify-end">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:border-brand hover:text-brand grid size-10 place-items-center rounded-full border border-white/15 transition-colors"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-60 md:flex-row">
          <p>
            © {year} {PROFILE.name}. {t('footer.rights')}
          </p>
          <p>{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
