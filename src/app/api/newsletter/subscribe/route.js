import { NextResponse } from 'next/server';

import { EMAIL_REGEX, clientIp, detectBot } from '@/lib/botCheck';

// Only these are forwarded to Beehiiv as referring_site, so a spoofed `source`
// in the request body cannot write arbitrary text into subscriber records.
const KNOWN_SOURCES = new Set([
  '/', '/engineer', '/agentic', '/school', '/research', '/courses', '/about', '/waitlist', '/news',
]);

// Bots learn from error messages, so a rejection returns the same shape a real
// success does. The signup simply never reaches Beehiiv.
function silentlyAccept(reason, meta) {
  console.warn('[newsletter] rejected as bot:', reason, meta);
  return NextResponse.json({ success: true });
}

export async function POST(request) {
  try {
    const { email, hp, elapsedMs, source } = await request.json();

    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const address = String(email).trim().toLowerCase();
    const ip = clientIp(request);

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

    /* No Turnstile here (removed 2026-09-27; the waitlist keeps it). Its
       Managed widget showed a "verify you are human" box to many real readers,
       and a newsletter signup is a low-value target: the honeypot, fill-time
       and per-IP gates above catch scripted fills, junk that slips through is
       never sent to (nothing sends from this Beehiiv list), and it is filtered
       before any import into Substack. */

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      console.error('Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID');
      return NextResponse.json(
        { error: 'Newsletter service is not configured.' },
        { status: 500 }
      );
    }

    // Real attribution: this used to hardcode /engineer, which mislabelled every
    // signup from every other page. Unknown paths fall back to the bare domain.
    // Every AI News page (/news/, a post, a story) counts as /news.
    const normalized = typeof source === 'string' && source.startsWith('/news') ? '/news' : source;
    const path = KNOWN_SOURCES.has(normalized) ? normalized : '';
    const referringSite = `https://esy.com${path === '/' ? '' : path}`;

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: address,
          reactivate_existing: true,
          send_welcome_email: true,
          referring_site: referringSite,
          utm_source: 'esy_website',
          utm_medium: 'organic',
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Beehiiv API error:', res.status, errorData);

      if (res.status === 409) {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }

      return NextResponse.json(
        { error: 'Subscription failed. Please try again.' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
