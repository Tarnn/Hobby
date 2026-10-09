import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Baseline hardening for every response. (HSTS is already sent by Vercel.)
const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // Opt out of AI training and text-and-data mining (W3C TDMRep; see also
  // /.well-known/tdmrep.json, robots.txt and src/middleware.ts).
  { key: 'tdm-reservation', value: '1' },
  { key: 'X-Robots-Tag', value: 'noai, noimageai' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Metadata here is static, so always put it in <head> instead of streaming
  // it into <body> for non-bot user agents. Every link-preview client (not
  // just the crawlers Next recognizes) then sees the title, description and
  // share card.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hobby-tkang.s3.us-east-2.amazonaws.com',
      },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
};

export default withNextIntl(nextConfig);
