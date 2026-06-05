// Live GitHub projects with a curated static fallback. The live fetch is cached
// (revalidated daily) so we don't hit the unauthenticated rate limit per request;
// if GitHub is unreachable we fall back to the curated list below.

export type Project = {
  name: string;
  description: string;
  language: string | null;
  url: string;
  homepage: string | null;
  stars: number;
};

const GH_USER = 'tarnn';

// Repos we never want to surface (low-signal, private-ish, profanity, this site).
const EXCLUDE = new Set([
  'hobby',
  'just-fucking-cancel',
  'ticker-datasci',
  'slash-commands',
  'rails-user-events',
  'todo-app-interview',
  'whatsapp_bot',
]);

// Curated fallback (also defines a nice default ordering if the API is down).
const FALLBACK: Project[] = [
  {
    name: 'giftsplit',
    description: 'Splitting funds for group gifts, made effortless.',
    language: 'TypeScript',
    url: 'https://github.com/tarnn/giftsplit',
    homepage: null,
    stars: 0,
  },
  {
    name: 'forcasty-java',
    description: 'Weather forecast API built with Java & Spring Boot.',
    language: 'Java',
    url: 'https://github.com/tarnn/forcasty-java',
    homepage: null,
    stars: 0,
  },
  {
    name: 'forcasty',
    description: 'Ruby on Rails weather application.',
    language: 'Ruby',
    url: 'https://github.com/tarnn/forcasty',
    homepage: null,
    stars: 0,
  },
  {
    name: 'tge-calendar',
    description: 'Web app that surfaces token TGE events on a calendar.',
    language: 'TypeScript',
    url: 'https://github.com/tarnn/tge-calendar',
    homepage: null,
    stars: 0,
  },
  {
    name: 'whipseeker-openapi',
    description:
      'OpenAPI 3.1 spec for the WhipSeeker APIs — deal recommendations, scheduling, ROI analytics and more.',
    language: 'OpenAPI',
    url: 'https://github.com/tarnn/whipseeker-openapi',
    homepage: null,
    stars: 0,
  },
  {
    name: 'SwapJeet-BE',
    description: 'Backend service for SwapJeet.',
    language: 'TypeScript',
    url: 'https://github.com/tarnn/SwapJeet-BE',
    homepage: null,
    stars: 0,
  },
];

type GitHubRepo = {
  name: string;
  fork: boolean;
  archived: boolean;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  pushed_at: string;
};

export async function getProjects(limit = 6): Promise<Project[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const repos = (await res.json()) as GitHubRepo[];

    const projects = repos
      .filter(
        (r) =>
          !r.fork &&
          !r.archived &&
          r.description &&
          !EXCLUDE.has(r.name.toLowerCase()),
      )
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          +new Date(b.pushed_at) - +new Date(a.pushed_at),
      )
      .slice(0, limit)
      .map(
        (r): Project => ({
          name: r.name,
          description: r.description as string,
          language: r.language,
          url: r.html_url,
          homepage: r.homepage || null,
          stars: r.stargazers_count,
        }),
      );

    return projects.length ? projects : FALLBACK.slice(0, limit);
  } catch {
    return FALLBACK.slice(0, limit);
  }
}

export const profileUrl = `https://github.com/${GH_USER}`;

// Brand-ish colors for language dots.
export const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Java: '#b07219',
  Python: '#3572A5',
  Ruby: '#701516',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Kotlin: '#A97BFF',
  OpenAPI: '#6BA539',
  Shell: '#89e051',
};
