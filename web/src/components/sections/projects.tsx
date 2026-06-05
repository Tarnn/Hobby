import { getTranslations } from 'next-intl/server';

import { SectionHeading } from '../section-heading';
import { ProjectsGrid } from './projects-grid';

import { FEATURED_PROJECTS } from '@/content/portfolio';
import { getProjects, profileUrl } from '@/lib/github';

export default async function Projects() {
  const t = await getTranslations('projects');
  const projects = await getProjects(6);

  return (
    <section id="projects" className="section-padding scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
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
