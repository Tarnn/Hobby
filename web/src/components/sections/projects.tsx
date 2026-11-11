import { getTranslations } from 'next-intl/server';

import { em, SectionHeading } from '../section-heading';
import { ProjectsGrid, type ProjectCard } from './projects-grid';

import { FEATURED_PROJECTS } from '@/content/portfolio';
import { getLiveProjects, profileUrl } from '@/lib/github';

// At most three rows of three on desktop.
const GRID_SIZE = 9;

export default async function Projects() {
  const t = await getTranslations('projects');

  // Everything here is live: the featured projects, then any other public
  // repo that has a website set on GitHub.
  const repos = await getLiveProjects(
    Math.max(0, GRID_SIZE - FEATURED_PROJECTS.length),
    FEATURED_PROJECTS.flatMap((p) => (p.repo ? [p.repo] : [])),
  );
  const cards: ProjectCard[] = [
    ...FEATURED_PROJECTS.map((p) => ({
      name: p.name,
      description: p.description,
      url: p.url,
      tags: p.tags,
      source: p.repo ? `${profileUrl}/${p.repo}` : undefined,
    })),
    ...repos.map((r) => ({
      name: r.name,
      description: r.description,
      url: r.homepage,
      tags: r.language ? [r.language] : [],
      source: r.url,
    })),
  ];

  return (
    <section id="projects" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow={t('eyebrow')}
          title={t.rich('title', { em })}
          subtitle={t('subtitle')}
        />
        <ProjectsGrid projects={cards} profileUrl={profileUrl} />
      </div>
    </section>
  );
}
