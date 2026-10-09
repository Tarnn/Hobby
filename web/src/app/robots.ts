import type { MetadataRoute } from 'next';

import { AI_BOTS } from '@/lib/ai-bots';

export default function robots(): MetadataRoute.Robots {
  const base = 'https://www.tarnnn.com';
  return {
    rules: [
      // No AI training, AI search or AI assistants (also enforced in middleware).
      { userAgent: [...AI_BOTS], disallow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
