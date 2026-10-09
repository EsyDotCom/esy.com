import { NextResponse } from 'next/server';

import { getContact, isConfigured, updateContact } from '@/lib/newsletter/resend';
import { verifyToken } from '@/lib/newsletter/tokens';

/* The signup form's second step (2026-10-06): after someone subscribes, the
   form asks "what should I call you?" and posts the answer here with the pass
   the subscribe route returned. The first name lands on their Resend contact
   (Beehiiv until 2026-10-09), so emails can greet people by name.

   Two guards: the pass proves this browser just signed that address up, and
   a name already on the contact is never overwritten, so the step can only
   fill a blank, never rename someone. */

export async function POST(request) {
  try {
    const { token, name } = await request.json();

    const email = verifyToken('name', token);
    if (!email) {
      return NextResponse.json({ error: 'This step has expired. You’re still signed up.' }, { status: 403 });
    }

    // Same cleaning as before: trimmed, single-spaced, no angle brackets or
    // control characters, capped.
    const cleanName = typeof name === 'string'
      ? name.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80)
      : '';
    if (!cleanName) {
      return NextResponse.json({ error: 'Type your first name, or skip this.' }, { status: 400 });
    }

    if (!isConfigured()) {
      console.error('Missing RESEND_API_KEY or RESEND_NEWSLETTER_SEGMENT_ID');
      return NextResponse.json({ error: 'Newsletter service is not configured.' }, { status: 500 });
    }

    // Look before writing: a contact who already has a name keeps it.
    const contact = await getContact(email);
    if (!contact) {
      return NextResponse.json({ error: 'Couldn’t save your name just now. You’re still signed up.' }, { status: 404 });
    }
    if (typeof contact.first_name === 'string' && contact.first_name.trim()) {
      return NextResponse.json({ success: true, kept: true });
    }

    await updateContact(email, { firstName: cleanName });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter name error:', error);
    return NextResponse.json({ error: 'Couldn’t save your name just now. You’re still signed up.' }, { status: 502 });
  }
}
