import { NextResponse } from 'next/server';

import { EMAIL_REGEX, clientIp, detectBot } from '@/lib/botCheck';
import { signNameToken } from '@/lib/newsletterNameToken';

// Only these are forwarded to Beehiiv as referring_site, so a spoofed `source`
// in the request body cannot write arbitrary text into subscriber records.
const KNOWN_SOURCES = new Set([
  '/', '/engineer', '/agentic', '/school', '/research', '/courses', '/about', '/waitlist', '/news', '/skills', '/seo',
]);

// Bots learn from error messages, so a rejection returns the same shape a real
// success does. The signup simply never reaches Beehiiv.
function silentlyAccept(reason, meta) {
  console.warn('[newsletter] rejected as bot:', reason, meta);
  return NextResponse.json({ success: true });
}

export async function POST(request) {
  try {
    const { email, hp, elapsedMs, source, name } = await request.json();

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
    // Every AI Marketing News page (/news/, a post, a story) counts as /news.
    // Every skills page (/skills/, a take, later a skill's own page) counts as
    // /skills (2026-10-06), so the skills hub's course signups are attributable.
    const normalized =
      typeof source === 'string' && source.startsWith('/news') ? '/news'
      : typeof source === 'string' && source.startsWith('/skills') ? '/skills'
      : source;
    const path = KNOWN_SOURCES.has(normalized) ? normalized : '';
    const referringSite = `https://esy.com${path === '/' ? '' : path}`;

    // Skills signups also carry a campaign, so Beehiiv can segment them (and the
    // course can be sent to them) without parsing referring_site. utm_content is
    // the page's slug under /skills (a take like "h", later a skill), letters,
    // digits and hyphens only, so a spoofed source can't write arbitrary text.
    const skillsSlug = path === '/skills' ? (String(source).split('/')[2] || 'index').replace(/[^a-z0-9-]/gi, '').slice(0, 40) || 'index' : null;
    const campaign = skillsSlug ? { utm_campaign: 'skills', utm_content: skillsSlug } : {};

    // Custom fields, using the publication's existing ones (the waitlist fills
    // the same two): "Name" when the form asked for it, and "Signup Source" =
    // "skills" for the skills hub, so those subscribers segment on a real field.
    // The name is trimmed, single-spaced, stripped of angle brackets and control
    // characters, and capped, so a form can't write markup or a novel into it.
    const cleanName = typeof name === 'string'
      ? name.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80)
      : '';
    const customFields = [
      { name: 'Name', value: cleanName },
      { name: 'Signup Source', value: skillsSlug ? 'skills' : '' },
    ].filter((f) => f.value);

    // Confirmed subscribers only (2026-10-06): every signup gets Beehiiv's
    // confirmation email and stays "pending" until the link is clicked,
    // whatever the publication's own setting is. Someone who wants the email
    // will confirm it; an address nobody confirms isn't worth keeping.
    const base = {
      email: address,
      double_opt_override: 'on',
      reactivate_existing: true,
      send_welcome_email: true,
      referring_site: referringSite,
      utm_source: 'esy_website',
      utm_medium: 'organic',
      ...campaign,
    };

    const send = (body) => fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      }
    );

    let res = await send(customFields.length ? { ...base, custom_fields: customFields } : base);

    // Beehiiv 400s when a custom field doesn't exist in the publication. The
    // subscriber matters more than the metadata, so retry without the fields
    // (the waitlist route does the same); the skills mark survives in the UTMs.
    if (res.status === 400 && customFields.length) {
      console.warn('[newsletter] Beehiiv rejected custom_fields; retrying without them.');
      res = await send(base);
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Beehiiv API error:', res.status, errorData);

      if (res.status === 409) {
        return NextResponse.json({ success: true, alreadySubscribed: true, nameToken: signNameToken(address) });
      }

      return NextResponse.json(
        { error: 'Subscription failed. Please try again.' },
        { status: res.status }
      );
    }

    // The pass for the form's "what should I call you?" step
    // (/api/newsletter/name). Bot rejections above never get one.
    return NextResponse.json({ success: true, nameToken: signNameToken(address) });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
