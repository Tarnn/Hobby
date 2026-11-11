import { getTranslations } from 'next-intl/server';

import { em, SectionHeading } from '../section-heading';
import { ProjectsGrid } from './projects-grid';

import { FEATURED_PROJECTS } from '@/content/portfolio';
import { getProjects, profileUrl } from '@/lib/github';

// Featured projects and GitHub repos share one grid; nine cards fill three
// rows of three on desktop.
const GRID_SIZE = 9;

export default async function Projects() {
  const t = await getTranslations('projects');
  const projects = await getProjects(
    Math.max(0, GRID_SIZE - FEATURED_PROJECTS.length),
    FEATURED_PROJECTS.flatMap((p) => (p.repo ? [p.repo] : [])),
  );

  return (
    <section id="projects" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow={t('eyebrow')}
          title={t.rich('title', { em })}
          subtitle={t('subtitle')}
        />
        <ProjectsGrid
          featured={FEATURED_PROJECTS}
          projects={projects}
          profileUrl={profileUrl}
        />
      </div>
    </section>
  );
}
