import { NextResponse } from 'next/server';

import { EMAIL_REGEX, clientIp, detectBot } from '@/lib/botCheck';
import { attribute, formLabel } from '@/lib/newsletter/attribution';
import { confirmLink, confirmationEmail } from '@/lib/newsletter/confirmEmail';
import { createContact, getContact, isConfigured, prop, sendEmail } from '@/lib/newsletter/resend';
import { signToken } from '@/lib/newsletter/tokens';

/* Every newsletter signup on esy.com posts here: the homepage, /seo, /skills,
   courses, articles, /invite. Since 2026-10-09 the list lives in Resend and
   esy.com runs its own double opt-in:

   1. The address becomes a Resend contact with confirmed = "false", plus the
      page (and YouTube video) it came from, and which signup box (`form`).
   2. We send the confirmation email. Its link opens /newsletter/confirm, which
      marks the contact confirmed and adds it to the Newsletter segment.

   Nobody receives an issue until step 2, so a typo'd or stranger's address
   never joins the list. */

// Bots learn from error messages, so a rejection returns the same shape a real
// success does. The signup simply never reaches Resend.
function silentlyAccept(reason, meta) {
  console.warn('[newsletter] rejected as bot:', reason, meta);
  return NextResponse.json({ success: true });
}


export async function POST(request) {
  try {
    const { email, hp, elapsedMs, source, video, name, form } = await request.json();

    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const address = String(email).trim().toLowerCase();
    const ip = clientIp(request);

    // Same bot gates as before. No Turnstile here (removed 2026-09-27; the
    // waitlist keeps it): the honeypot, fill-time and per-IP gates catch
    // scripted fills, and the confirmation step keeps whatever slips through
    // off the list.
    const bot = detectBot({ hp, elapsedMs, ip });
    if (bot?.soft) {
      // A shared IP can catch a real person, so say so rather than fake success.
      console.warn('[newsletter] soft-rejected:', bot.reason, { address });
      return NextResponse.json(
        { error: 'Too many signups from your network just now. Please try again in a few minutes.' },
        { status: 429 }
      );
    }
    if (bot) return silentlyAccept(bot.reason, { address });

    if (!isConfigured()) {
      console.error('Missing RESEND_API_KEY or RESEND_NEWSLETTER_SEGMENT_ID');
      return NextResponse.json({ error: 'Newsletter service is not configured.' }, { status: 500 });
    }

    // Already confirmed: nothing to send, and the form says so instead of
    // asking them to check an inbox for an email that isn't coming.
    const existing = await getContact(address);
    if (prop(existing, 'confirmed') === 'true') {
      return NextResponse.json({ success: true, alreadySubscribed: true, nameToken: signToken('name', address) });
    }

    // New signups record where they came from. Someone signing up again before
    // confirming keeps their first source, so attribution credits the page that
    // actually brought them in; they just get a fresh confirmation email.
    // The skills course form asks for a first name up front; it's cleaned
    // like the name step's (no markup, no control characters, capped).
    if (!existing) {
      const where = attribute(source, video);
      const firstName = typeof name === 'string'
        ? name.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80)
        : '';
      await createContact(address, {
        firstName,
        confirmed: 'false',
        source: where.path || '/',
        video: where.video,
        // Which box on that page: the header, the hero, the band at the foot...
        form: formLabel(form),
      });
    }

    // The confirmation email. The idempotency key is per address per minute,
    // so a double-click or a retried request sends one email, not two.
    const link = confirmLink(request, signToken('confirm', address));
    await sendEmail({
      to: address,
      ...confirmationEmail(link),
      idempotencyKey: `confirm-signup-${address}-${Math.floor(Date.now() / 60000)}`,
    });

    // The pass for the form's "what should I call you?" step
    // (/api/newsletter/name). Bot rejections above never get one.
    return NextResponse.json({ success: true, nameToken: signToken('name', address) });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
