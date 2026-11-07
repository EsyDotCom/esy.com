import { NextResponse } from 'next/server';

import { EMAIL_REGEX, clientIp, detectBot } from '@/lib/botCheck';
import { attribute, formLabel } from '@/lib/newsletter/attribution';
import { REMINDER_AFTER_MS, confirmLink, confirmationEmail, reminderEmail } from '@/lib/newsletter/confirmEmail';
import { REPLY_TO, createContact, defineProperty, getContact, isConfigured, prop, sendEmail, updateContact } from '@/lib/newsletter/resend';
import { signToken } from '@/lib/newsletter/tokens';

/* Every newsletter signup on esy.com posts here: the homepage, /seo, /skills,
   courses, articles, /invite. Since 2026-10-09 the list lives in Resend and
   esy.com runs its own double opt-in:

   1. The address becomes a Resend contact with confirmed = "false", plus the
      page (and YouTube video) it came from, and which signup box (`form`).
   2. We send the confirmation email. Its link opens /newsletter/confirm, which
      marks the contact confirmed and adds it to the Newsletter segment.
   3. A first signup also gets one reminder, scheduled for two days later and
      cancelled if they confirm before then (2026-11-01).

   Nobody receives an issue until step 2, so a typo'd or stranger's address
   never joins the list. */

// Bots learn from error messages, so a rejection returns the same shape a real
// success does. The signup simply never reaches Resend.
function silentlyAccept(reason, meta) {
  console.warn('[newsletter] rejected as bot:', reason, meta);
  return NextResponse.json({ success: true });
}


/* Schedules the reminder and notes its id on the contact. Best effort: a
   reminder that can't be scheduled must never fail the signup itself. Its
   link is signed now and good for 7 days, so 5 days after it arrives. */
async function scheduleReminder(request, address) {
  try {
    const reminder = await sendEmail({
      to: address,
      ...reminderEmail(confirmLink(request, signToken('confirm', address))),
      scheduledAt: new Date(Date.now() + REMINDER_AFTER_MS).toISOString(),
      idempotencyKey: `confirm-reminder-${address}`,
    });
    if (reminder?.id) {
      await defineProperty('reminder');
      await updateContact(address, { reminder: reminder.id });
    }
  } catch (error) {
    console.warn('[newsletter] reminder not scheduled:', error?.message);
  }
}

/* esy.com/scout's "Map a company" form (2026-11-07) sends the website a reader
   wants mapped as `request`. It's cut down to a bare hostname ("clay.com"), so
   nothing but letters, digits, dots and hyphens reaches a contact, and it's
   kept only from that form. */
function requestedSite(form, value) {
  if (formLabel(form) !== 'scout-request' || typeof value !== 'string') return '';
  const host = value.trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#\s]/)[0];
  const clean = host.replace(/[^a-z0-9.-]/g, '').slice(0, 80);
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(clean) ? clean : '';
}

/* Keeps a map request on the subscriber's contact (`request`, the latest one
   asked for) and tells Zev, so the map can be sent when it's done. Best effort:
   a request that can't be noted must never fail the signup itself. */
async function noteMapRequest(address, site, isNew) {
  try {
    await defineProperty('request');
    if (!isNew) await updateContact(address, { request: site });
    await sendEmail({
      to: REPLY_TO,
      subject: `Scout map request: ${site}`,
      text: `${address} asked for a funnel map of ${site} on esy.com/scout. It's saved on their Resend contact as "request".`,
      // The address passed the email check but may still hold markup characters, so it's escaped.
      html: `<p>${address.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`)} asked for a funnel map of <b>${site}</b> on esy.com/scout.</p><p>It's saved on their Resend contact as <code>request</code>.</p>`,
      idempotencyKey: `scout-request-${address}-${site}`,
    });
  } catch (error) {
    console.warn('[newsletter] map request not noted:', error?.message);
  }
}

export async function POST(request) {
  try {
    const { email, hp, elapsedMs, source, video, name, form, src, request: asked } = await request.json();

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

    // A map request from esy.com/scout is kept whether or not they're already subscribed.
    const site = requestedSite(form, asked);
    if (site) await noteMapRequest(address, site, !existing);

    if (prop(existing, 'confirmed') === 'true') {
      return NextResponse.json({ success: true, alreadySubscribed: true, nameToken: signToken('name', address) });
    }

    // New signups record where they came from. Someone signing up again before
    // confirming keeps their first source, so attribution credits the page that
    // actually brought them in; they just get a fresh confirmation email.
    // The skills course form asks for a first name up front; it's cleaned
    // like the name step's (no markup, no control characters, capped).
    if (!existing) {
      const where = attribute(source, video, src);
      // Defined once per server; Resend drops a property whose key isn't defined.
      if (where.src) await defineProperty('src');
      if (where.page) await defineProperty('page');
      const firstName = typeof name === 'string'
        ? name.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80)
        : '';
      await createContact(address, {
        firstName,
        confirmed: 'false',
        source: where.path || '/',
        video: where.video,
        // The ?src= of the link that brought them, and the article they were reading.
        src: where.src,
        page: where.page,
        // Which box on that page: the header, the hero, the band at the foot...
        form: formLabel(form),
        // The website asked for on esy.com/scout's "Map a company" form, if any.
        ...(site ? { request: site } : {}),
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

    // A first signup also gets one reminder, two days on, cancelled if they
    // confirm first (/api/newsletter/confirm). Only ever one per address, so
    // signing up again doesn't add more.
    if (!existing) await scheduleReminder(request, address);

    // The pass for the form's "what should I call you?" step
    // (/api/newsletter/name). Bot rejections above never get one.
    return NextResponse.json({ success: true, nameToken: signToken('name', address) });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
