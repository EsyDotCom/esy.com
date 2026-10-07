import { NextResponse } from 'next/server';

import { verifyNameToken } from '@/lib/newsletterNameToken';

/* The signup form's second step (2026-10-06): after someone subscribes, the
   form asks "what should I call you?" and posts the answer here with the token
   the subscribe route returned. The first name lands in Beehiiv's "Name"
   field, so emails can greet people by name.

   Two guards: the token proves this browser just signed that address up, and
   a name already on the subscriber is never overwritten, so the step can only
   fill a blank, never rename someone. */

const BEEHIIV = 'https://api.beehiiv.com/v2/publications';

export async function POST(request) {
  try {
    const { token, name } = await request.json();

    const email = verifyNameToken(token);
    if (!email) {
      return NextResponse.json({ error: 'This step has expired. You’re still signed up.' }, { status: 403 });
    }

    // Same cleaning as the subscribe route: trimmed, single-spaced, no angle
    // brackets or control characters, capped.
    const cleanName = typeof name === 'string'
      ? name.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80)
      : '';
    if (!cleanName) {
      return NextResponse.json({ error: 'Type your first name, or skip this.' }, { status: 400 });
    }

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    if (!apiKey || !publicationId) {
      console.error('Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID');
      return NextResponse.json({ error: 'Newsletter service is not configured.' }, { status: 500 });
    }

    const byEmail = `${BEEHIIV}/${publicationId}/subscriptions/by_email/${encodeURIComponent(email)}`;
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` };

    // Look before writing: a subscriber who already has a name keeps it.
    const found = await fetch(`${byEmail}?expand[]=custom_fields`, { headers });
    if (!found.ok) {
      console.error('[newsletter/name] Beehiiv lookup failed:', found.status);
      return NextResponse.json({ error: 'Couldn’t save your name just now. You’re still signed up.' }, { status: 502 });
    }
    const { data } = await found.json().catch(() => ({}));
    const existing = (data?.custom_fields || []).find((f) => f?.name === 'Name')?.value;
    if (typeof existing === 'string' && existing.trim()) {
      return NextResponse.json({ success: true, kept: true });
    }

    const res = await fetch(byEmail, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ custom_fields: [{ name: 'Name', value: cleanName }] }),
    });
    if (!res.ok) {
      console.error('[newsletter/name] Beehiiv update failed:', res.status, await res.json().catch(() => ({})));
      return NextResponse.json({ error: 'Couldn’t save your name just now. You’re still signed up.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter name error:', error);
    return NextResponse.json({ error: 'Something went wrong. You’re still signed up.' }, { status: 500 });
  }
}
