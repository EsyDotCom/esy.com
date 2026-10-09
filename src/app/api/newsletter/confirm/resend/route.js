import { NextResponse } from 'next/server';

import { confirmLink, confirmationEmail } from '@/lib/newsletter/confirmEmail';
import { getContact, isConfigured, prop, sendEmail } from '@/lib/newsletter/resend';
import { readToken, signToken } from '@/lib/newsletter/tokens';

/* "Send me a new link" on an expired confirmation (2026-10-09). The old pass
   is still genuine, just old, so it says whose inbox to send to: the reader
   doesn't retype their address, and nobody can ask for a link to an address
   they never had a pass for. Passes older than 30 days past expiry are
   refused, so a leaked old email can't be replayed forever. */

const GRACE_MS = 30 * 24 * 60 * 60 * 1000;

export async function POST(request) {
  try {
    const { token } = await request.json();

    const pass = readToken('confirm', token);
    if (!pass || pass.expiredForMs > GRACE_MS) {
      return NextResponse.json({ error: 'This link is too old. Sign up again from esy.com.' }, { status: 400 });
    }

    if (!isConfigured()) {
      console.error('Missing RESEND_API_KEY or RESEND_NEWSLETTER_SEGMENT_ID');
      return NextResponse.json({ error: 'Newsletter service is not configured.' }, { status: 500 });
    }

    // Confirmed in the meantime (another tab, another email): nothing to send.
    const contact = await getContact(pass.email);
    if (prop(contact, 'confirmed') === 'true') {
      return NextResponse.json({ success: true, alreadyConfirmed: true });
    }

    const link = confirmLink(request, signToken('confirm', pass.email));
    await sendEmail({
      to: pass.email,
      ...confirmationEmail(link),
      // One fresh link per address per minute, however often the button is pressed.
      idempotencyKey: `confirm-resend-${pass.email}-${Math.floor(Date.now() / 60000)}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter confirm resend error:', error);
    return NextResponse.json({ error: 'Couldn’t send a new link just now. Please try again.' }, { status: 500 });
  }
}
