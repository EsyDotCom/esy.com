/* Where a signup came from, worked out once for every newsletter route
   (2026-10-09; moved out of the subscribe route). The form sends the page path
   (`source`) and, on /invite, the video a description link named (`video`).

   Only known paths are kept, so a spoofed `source` can't write arbitrary text
   into a subscriber record; anything else counts as the bare domain. */

const KNOWN_SOURCES = new Set([
  '/', '/engineer', '/agentic', '/school', '/research', '/courses', '/about', '/waitlist', '/news', '/skills', '/seo', '/invite', '/newsletter',
]);

// Letters, digits and hyphens only, capped: the shape of a page or video slug.
const slug = (value, max) => String(value || '').replace(/[^a-z0-9-]/gi, '').slice(0, max);

/** { path, referringSite, signupSource, campaign, video } for a signup. */
export function attribute(source, video) {
  // The site uses trailing slashes, so the path arrives as "/seo/"; one
  // trailing slash is dropped before matching, or "/seo/" would miss "/seo".
  const raw = typeof source === 'string' ? source : '';
  const trimmed = raw.length > 1 ? raw.replace(/\/$/, '') : raw;

  // Whole sections count as their hub: every news page as /news, every skills
  // page as /skills. Matched on "/news" or "/news/…" exactly, so /newsletter
  // isn't swallowed by /news.
  const under = (hub) => trimmed === hub || trimmed.startsWith(`${hub}/`);
  const normalized = under('/news') ? '/news' : under('/skills') ? '/skills' : trimmed;
  const path = KNOWN_SOURCES.has(normalized) ? normalized : '';

  // Skills signups carry the page under /skills (a take, later a skill);
  // YouTube signups (/invite) carry the video, or "invite" for the bare
  // address said aloud in a video.
  const skillsSlug = path === '/skills' ? slug(trimmed.split('/')[2], 40) || 'index' : null;
  const videoSlug = path === '/invite' ? slug(video, 60) || 'invite' : null;

  return {
    path,
    referringSite: `https://esy.com${path === '/' ? '' : path}`,
    signupSource: skillsSlug ? 'skills' : videoSlug ? 'youtube' : '',
    campaign: skillsSlug ? { utm_campaign: 'skills', utm_content: skillsSlug }
      : videoSlug ? { utm_campaign: 'youtube', utm_content: videoSlug }
      : {},
    video: videoSlug && videoSlug !== 'invite' ? videoSlug : '',
  };
}

/** Which signup box a signup came from ('header', 'hero', 'email-band', ...),
 *  as the form sends it (2026-10-09). Letters, digits and hyphens only, capped,
 *  so a spoofed value can't write arbitrary text into a contact. */
export const formLabel = (form) => slug(form, 40).toLowerCase();
