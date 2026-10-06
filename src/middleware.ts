import { NextResponse, type NextRequest } from 'next/server';
import { isRetiredPath } from '@/lib/retired-routes';

// Retired routes answer 410 Gone: a permanent "this was here and was removed
// on purpose", which search engines drop faster than a 404. The matcher keeps
// middleware off every other request.

// A small, self-contained page so the 410 still reads as esy.com to a person.
const GONE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>This page was retired | Esy</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f7f5f0; color: #1e293b; font: 16px/1.6 system-ui, -apple-system, sans-serif; }
  main { max-width: 32rem; padding: 2rem 1rem; }
  h1 { font-size: 1.75rem; line-height: 1.2; margin: 0 0 .75rem; }
  p { margin: 0 0 1.5rem; color: #475569; }
  a { color: #0f766e; font-weight: 600; margin-right: 1.25rem; }
</style>
</head>
<body>
<main>
  <h1>This page was retired.</h1>
  <p>Esy's early essays and catalog pages have been archived. Esy is now The Marketing Engineer.</p>
  <a href="/">Home</a><a href="/engineer/">Read the articles</a><a href="/news/">AI marketing news</a>
</main>
</body>
</html>`;

export function middleware(request: NextRequest) {
  if (!isRetiredPath(request.nextUrl.pathname)) return NextResponse.next();
  return new NextResponse(GONE_HTML, {
    status: 410,
    headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' },
  });
}

// One entry per retired section, plus /essays (old slugs only; see isRetiredPath).
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
  ],
};
