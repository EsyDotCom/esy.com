import { cookies, draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PREVIEW_COOKIE, isSafeExitPath } from '@/lib/preview';

// "Exit preview": turns Draft Mode off, forgets the token, and goes back to the
// section's list (or the homepage when `to` isn't one of this site's sections).

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  (await cookies()).delete(PREVIEW_COOKIE);
  const to = request.nextUrl.searchParams.get('to');
  return NextResponse.redirect(new URL(isSafeExitPath(to) ? to : '/', request.url), {
    status: 307,
    headers: { 'Cache-Control': 'private, no-store' },
  });
}
