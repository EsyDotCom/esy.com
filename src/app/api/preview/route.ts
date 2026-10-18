import { cookies, draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PREVIEW_COOKIE, fetchPreview, pagePathFor } from '@/lib/preview';

// Where a preview link from Compose lands: {siteUrl}/api/preview?token=…&path=…
// (api.esy.com #589). Checks the token with Esy, turns on Draft Mode, keeps the
// token in an httpOnly cookie and sends the reader to the piece's page, which
// then renders the draft (src/lib/preview.ts). A dead link goes to a page that
// says so. The link's `path` is not followed: esy.com picks the page from the
// piece's own kind and slug, so this route can't redirect anywhere else.

export const dynamic = 'force-dynamic';

// A preview is private: never cached, never indexed.
const PRIVATE = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' };

// A day is plenty for one look; the link itself lasts as long as Esy says.
const COOKIE_MAX_AGE = 60 * 60 * 24;

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')?.trim();
  const goTo = (path: string) => NextResponse.redirect(new URL(path, request.url), { status: 307, headers: PRIVATE });

  if (!token) return goTo('/preview/expired/?reason=missing');

  const read = await fetchPreview(token);
  if ('status' in read) {
    const reason = read.status === 404 ? 'unknown' : read.status === 410 ? 'expired' : 'unavailable';
    return goTo(`/preview/expired/?reason=${reason}`);
  }

  (await draftMode()).enable();
  (await cookies()).set(PREVIEW_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
  return goTo(pagePathFor(read.payload.kind, read.payload.slug));
}
