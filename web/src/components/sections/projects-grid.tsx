'use client';

import { ArrowUpRight, ExternalLink, Github, Globe, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import type { FeaturedProject } from '@/content/portfolio';
import { LANG_COLOR, type Project } from '@/lib/github';

export function ProjectsGrid({
  featured,
  projects,
  profileUrl,
}: {
  featured: FeaturedProject[];
  projects: Project[];
  profileUrl: string;
}) {
  const t = useTranslations('projects');

  return (
    <>
      <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {/* Featured live deployments */}
        {featured.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group border-brand/30 from-brand/[0.07] hover:border-brand/60 relative flex flex-col rounded-2xl border bg-gradient-to-br to-transparent p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="bg-brand/10 text-brand grid size-10 place-items-center rounded-xl">
                <Globe className="size-5" />
              </span>
              <span className="bg-brand/10 text-brand inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold">
                <span className="relative flex size-1.5">
                  <span className="bg-brand absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                  <span className="bg-brand relative inline-flex size-1.5 rounded-full" />
                </span>
                {t('liveDemo')}
              </span>
            </div>

            <h3 className="group-hover:text-brand mt-4 font-semibold transition-colors">
              {p.name}
            </h3>
            <p className="text-muted-foreground mt-2 line-clamp-3 flex-1 text-sm/relaxed">
              {p.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              <ArrowUpRight className="text-brand ms-auto size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        ))}

        {/* GitHub repositories */}
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group border-border bg-card hover:border-brand/50 flex flex-col rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="bg-muted text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand grid size-10 place-items-center rounded-xl transition-colors">
                <Github className="size-5" />
              </span>
              <div className="text-muted-foreground flex items-center gap-3 text-xs">
                {p.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5" />
                    {p.stars}
                  </span>
                )}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <h3 className="group-hover:text-brand mt-4 font-semibold transition-colors">
              {p.name}
            </h3>
            <p className="text-muted-foreground mt-2 line-clamp-3 flex-1 text-sm/relaxed">
              {p.description}
            </p>

            <div className="mt-5 flex items-center justify-between">
              {p.language ? (
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                  <span
                    className="size-2.5 rounded-full"
                    style={{
                      backgroundColor: LANG_COLOR[p.language] ?? '#8b95a5',
                    }}
                  />
                  {p.language}
                </span>
              ) : (
                <span />
              )}
              {p.homepage && (
                <span className="text-brand flex items-center gap-1 text-xs font-medium">
                  <ExternalLink className="size-3.5" />
                  {t('liveDemo')}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border hover:border-brand hover:text-brand inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
        >
          <Github className="size-4" />
          {t('viewAll')}
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </>
  );
}
