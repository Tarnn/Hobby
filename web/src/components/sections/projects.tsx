import { getTranslations } from 'next-intl/server';

import { em, SectionHeading } from '../section-heading';
import { ProjectsGrid, type ProjectCard } from './projects-grid';

import { FEATURED_PROJECTS, SOCIALS } from '@/content/portfolio';

export default async function Projects() {
  const t = await getTranslations('projects');

  const cards: ProjectCard[] = FEATURED_PROJECTS.map((p) => ({
    name: p.name,
    description: p.description,
    url: p.url,
    tags: p.tags,
    source: p.repo ? `${SOCIALS.github}/${p.repo}` : undefined,
  }));

  return (
    <section id="projects" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow={t('eyebrow')}
          title={t.rich('title', { em })}
          subtitle={t('subtitle')}
        />
        <ProjectsGrid projects={cards} profileUrl={SOCIALS.github} />
      </div>
    </section>
  );
}
