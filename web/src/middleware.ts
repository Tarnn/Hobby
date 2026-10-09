import { type NextRequest, NextResponse } from 'next/server';

import { AI_BOT_PATTERN } from '@/lib/ai-bots';

// Refuse AI crawlers and assistants at the edge. robots.txt and the TDM
// reservation stay readable so well-behaved bots can see the opt-out.
export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  if (!AI_BOT_PATTERN.test(ua)) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === '/robots.txt' || pathname.startsWith('/.well-known/')) {
    return NextResponse.next();
  }

  return new NextResponse(
    'AI crawlers and assistants are not permitted on this site. See /robots.txt.\n',
    {
      status: 403,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-robots-tag': 'noindex, noai, noimageai',
      },
    },
  );
}

export const config = {
  // Everything except immutable build assets.
  matcher: ['/((?!_next/static).*)'],
};
