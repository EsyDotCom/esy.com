import { NextResponse } from 'next/server';

import { attribute } from '@/lib/newsletter/attribution';
import { mirrorToBeehiiv } from '@/lib/newsletter/beehiiv';
import { addToNewsletter, createContact, getContact, isConfigured, prop, sendEvent, updateContact } from '@/lib/newsletter/resend';
import { readToken } from '@/lib/newsletter/tokens';

/* The confirmation link's second half (2026-10-09). /newsletter/confirm posts
   the pass from the email here, from the browser, after the page loads: mail
   scanners that pre-open links don't run scripts, so they can't confirm an
   address on the reader's behalf.

   A genuine, unexpired pass makes the contact confirmed, puts it in the
   Newsletter segment (the list issues go to), and fires "newsletter.confirmed"
   with where they came from, which starts any Automation listening for it
   (the email course, the YouTube welcome with the video files). Confirming
   twice is harmless: the second time changes nothing and fires nothing. */

const CONFIRMED_EVENT = 'newsletter.confirmed';

export async function POST(request) {
  try {
    const { token } = await request.json();

    const pass = readToken('confirm', token);
    if (!pass) {
      return NextResponse.json({ error: 'This link isn’t valid.' }, { status: 400 });
    }
    if (pass.expired) {
      // The page offers a fresh link; /api/newsletter/confirm/resend takes it from here.
      return NextResponse.json({ error: 'This link has expired.', expired: true }, { status: 410 });
    }

    if (!isConfigured()) {
      console.error('Missing RESEND_API_KEY or RESEND_NEWSLETTER_SEGMENT_ID');
      return NextResponse.json({ error: 'Newsletter service is not configured.' }, { status: 500 });
    }

    const email = pass.email;
    let contact = await getContact(email);

    if (prop(contact, 'confirmed') === 'true') {
      return NextResponse.json({ success: true, alreadyConfirmed: true });
    }

    // The contact can be gone (deleted in Resend between the email and the
    // click). The pass still proves they own the inbox, so they're re-added.
    if (!contact) {
      await createContact(email, { confirmed: 'false', source: '/' });
      contact = await getContact(email);
    }

    // Order matters: segment first, then the flag. If the segment add fails,
    // the contact stays unconfirmed and a second click tries again.
    await addToNewsletter(email);
    await updateContact(email, { confirmed: 'true' });

    // What happens next for them depends on where they came from, so the event
    // carries it. Best effort: with no Automation listening yet the event has
    // nowhere to go, and that must not fail their confirmation.
    const source = prop(contact, 'source') || '/';
    const video = prop(contact, 'video');
    try {
      await sendEvent(CONFIRMED_EVENT, email, { source, video });
    } catch (error) {
      console.warn('[newsletter] confirmed event not sent:', error?.message);
    }

    // Beehiiv keeps a silent backup copy of confirmed subscribers until Resend
    // is verified in production (see lib/newsletter/beehiiv.js).
    await mirrorToBeehiiv(email, attribute(source, video), contact?.first_name);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter confirm error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try the link again.' }, { status: 500 });
  }
}
