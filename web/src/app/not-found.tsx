import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { GrassSilhouette } from '@/components/grass-silhouette';
import { em } from '@/components/section-heading';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pb-32 text-center">
      <div aria-hidden className="hero-sky absolute inset-0 -z-10" />
      {/* Soft wash so the copy stays legible over any sky */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 46% at 50% 54%, color-mix(in srgb, var(--background) 55%, transparent) 0%, transparent 72%)',
        }}
      />
      <GrassSilhouette className="absolute inset-x-0 -bottom-px -z-10 h-40 w-full md:h-56" />

      {/* Sun / moon, keyed to the time of day */}
      <div
        aria-hidden
        className="mb-10 size-16 rounded-full md:size-20"
        style={{
          background: 'var(--sun-disc)',
          boxShadow: '0 0 90px 36px var(--sun-glow)',
        }}
      />
      <p className="text-foreground/70 font-mono text-[11px] tracking-[0.2em] uppercase">
        {t('eyebrow')}
      </p>
      <h1 className="font-display mt-5 max-w-2xl text-5xl leading-[1.05] font-light tracking-tight text-balance md:text-7xl">
        {t.rich('title', { em })}
      </h1>
      <p className="text-foreground/80 mt-5 max-w-md text-base/relaxed md:text-lg/relaxed">
        {t('body')}
      </p>
      <Link
        href="/"
        className="bg-brand text-brand-foreground focus-visible:ring-ring mt-9 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-lg transition-transform outline-none hover:scale-[1.03] focus-visible:ring-2 active:scale-95"
      >
        <ArrowLeft className="size-4" />
        {t('cta')}
      </Link>
    </section>
  );
}
