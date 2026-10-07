import { NextResponse, type NextRequest } from 'next/server';
import { isRetiredPath } from '@/lib/retired-routes';

// Retired routes answer 410 Gone: a permanent "this was here and was removed
// on purpose", which search engines drop faster than a 404. The page itself
// is /gone (B · Buried, laid out like the 404), rewritten in place so the
// address in the bar stays the one the reader asked for. The matcher keeps
// middleware off every other request.

export function middleware(request: NextRequest) {
  if (!isRetiredPath(request.nextUrl.pathname)) return NextResponse.next();
  return NextResponse.rewrite(new URL('/gone/', request.url), {
    status: 410,
    headers: { 'x-robots-tag': 'noindex' },
  });
}

// One entry per retired section, plus /essays (old slugs only; see isRetiredPath)
// and /gone itself, so visiting the page directly answers 410 too.
export const config = {
  matcher: [
    '/essays/:path+',
    '/visual-essays/:path*',
    '/scrollytelling/:path*',
    '/photo-essays/:path*',
    '/how-to-write/:path*',
    '/how-to-write-an-essay/:path*',
    '/writing-prompts/:path*',
    '/theme-comparison/:path*',
    '/artifacts/:path*',
    '/clip-art/:path*',
    '/infographics/:path*',
    '/models/:path*',
    '/roadmap/:path*',
    '/agentic-workflows/:path*',
    '/gone/:path*',
  ],
};
