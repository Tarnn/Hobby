'use client';

import { ArrowUpRight, Github, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export type ProjectCard = {
  name: string;
  description: string;
  url: string; // the live site
  tags: string[];
  source?: string; // the public repo, if there is one
};

export function ProjectsGrid({
  projects,
  profileUrl,
}: {
  projects: ProjectCard[];
  profileUrl: string;
}) {
  const t = useTranslations('projects');

  return (
    <>
      {/* Three to a row on desktop, two on tablets. A flex row rather than a
          grid so a last row that is not full sits centred. */}
      <div className="mt-14 flex flex-wrap justify-center gap-5 md:mt-16">
        {/* The project name is the card's link and covers the whole card; the
            link to the source sits above it. */}
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group border-brand/30 from-brand/[0.07] hover:border-brand/60 relative flex w-full flex-col rounded-2xl border bg-gradient-to-br to-transparent p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
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
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:after:ring-ring outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2"
              >
                {p.name}
              </a>
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
              <span className="ms-auto flex items-center gap-2">
                {p.source && (
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name}: ${t('viewRepo')}`}
                    title={t('viewRepo')}
                    className="text-muted-foreground hover:bg-brand/10 hover:text-brand focus-visible:ring-ring relative -my-1 grid size-8 place-items-center rounded-full transition-colors outline-none focus-visible:ring-2"
                  >
                    <Github className="size-4" />
                  </a>
                )}
                <ArrowUpRight className="text-brand size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.article>
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
