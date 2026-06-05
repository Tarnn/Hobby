import { EXPERIENCE, PROFILE, SOCIALS } from '@/content/portfolio';

const SITE_URL = 'https://www.tarnnn.com';

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    alternateName: PROFILE.shortName,
    url: SITE_URL,
    image: PROFILE.photo,
    email: `mailto:${PROFILE.email}`,
    jobTitle: PROFILE.title,
    worksFor: { '@type': 'Organization', name: EXPERIENCE[0].company },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Sheridan College' },
      { '@type': 'CollegeOrUniversity', name: 'University of Waterloo' },
    ],
    knowsAbout: [
      'Java',
      'Spring Boot',
      'React',
      'TypeScript',
      'Microservices',
      'AWS',
      'Cloud Architecture',
      'Full Stack Development',
    ],
    sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.x],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
