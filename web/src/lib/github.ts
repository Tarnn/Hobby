// Public GitHub repos that have a live site: the ones whose "Website" field is
// set on GitHub. The fetch is cached (revalidated daily) so we don't hit the
// unauthenticated rate limit per request; if GitHub is unreachable we fall back
// to the curated list below.

export type Project = {
  name: string;
  description: string;
  language: string | null;
  url: string; // the repo on GitHub
  homepage: string; // the live site
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

// Curated fallback, used when the API is down.
const FALLBACK: Project[] = [
  {
    name: 'giftsplit',
    description: 'Splitting funds for group gifts, made effortless.',
    language: 'TypeScript',
    url: 'https://github.com/tarnn/giftsplit',
    homepage: 'https://giftsplit.vercel.app',
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

// The "Website" field is free text; only a full web address can be linked to.
function liveUrl(homepage: string | null): string | null {
  const url = homepage?.trim();
  return url && /^https?:\/\//i.test(url) ? url : null;
}

// `skip` names repos to leave out: the ones already shown as featured projects.
export async function getLiveProjects(
  limit = 6,
  skip: string[] = [],
): Promise<Project[]> {
  const skipped = new Set(skip.map((name) => name.toLowerCase()));
  const fallback = FALLBACK.filter(
    (p) => !skipped.has(p.name.toLowerCase()),
  ).slice(0, limit);

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

    return repos
      .filter(
        (r) =>
          !r.fork &&
          !r.archived &&
          r.description &&
          liveUrl(r.homepage) &&
          !EXCLUDE.has(r.name.toLowerCase()) &&
          !skipped.has(r.name.toLowerCase()),
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
          homepage: liveUrl(r.homepage) as string,
        }),
      );
  } catch {
    return fallback;
  }
}

export const profileUrl = `https://github.com/${GH_USER}`;
