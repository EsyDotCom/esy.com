/* Signups through Esy (2026-11-03, api.esy.com docs/plans/2026-11-01-many-newsletters.md).
   Esy keeps every newsletter's list now: it sends the confirmation and the
   reminder, and its Topic keeps an unsubscribe from one newsletter off the
   others. esy.com only forwards, server to server, so the forms and the hook
   don't change.

   NEWSLETTER_VIA_ESY=true switches the subscribe route over. Until then the
   Resend-direct code runs as before, so this can deploy ahead of the API.
   Links Esy itself sent (?token=) are honoured either way: they only exist
   once Esy is sending. */

/** The Marketing Engineer's public name in Esy's signup routes. */
export const NEWSLETTER_SLUG = 'engineer';

export function viaEsy(env = process.env) {
  return env.NEWSLETTER_VIA_ESY === 'true';
}

function apiUrl(env) {
  return (env.ESY_API_URL || 'https://api.esy.com').replace(/\/+$/, '');
}

/** `…/subscriptions`, or `…/subscriptions:confirm` for an action. */
export function subscriptionsUrl(action = '', env = process.env) {
  return `${apiUrl(env)}/v1/newsletters/${NEWSLETTER_SLUG}/subscriptions${action ? `:${action}` : ''}`;
}

/* One call to Esy. Never throws: a network failure or a timeout comes back as
   status 0, which every outcome below turns into a polite "try again". The
   reader's IP rides along, so Esy's per-network limit counts people, not
   esy.com's servers. */
export async function callEsy(action, body, { clientIp, env = process.env, fetchImpl = fetch, timeoutMs = 10000 } = {}) {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (clientIp) headers['X-Forwarded-For'] = clientIp;
  try {
    const res = await fetchImpl(subscriptionsUrl(action, env), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
      cache: 'no-store',
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  } catch (error) {
    console.warn(`[newsletter] Esy ${action || 'subscribe'} unreachable:`, error?.message);
    return { status: 0, data: {} };
  }
}

const ok = (status) => status >= 200 && status < 300;
const refused = (status) => [400, 401, 403, 404, 422].includes(status);

/* What each answer means for the site's own routes, kept to the shapes the
   forms and pages already read ({ success } or { error }). Esy answers every
   signup the same way, whoever it is, so there's no "already subscribed" to
   pass on: the form says "check your email" either way. Esy's own error
   wording is for Esy's clients, not readers, so it's never shown. */
export function subscribeOutcome({ status }) {
  if (ok(status)) return { status: 200, body: { success: true } };
  if (status === 429) {
    return { status: 429, body: { error: 'Too many signups from your network just now. Please try again in a few minutes.' } };
  }
  if (status === 400 || status === 422) return { status: 400, body: { error: 'A valid email address is required.' } };
  return { status: 502, body: { error: 'Couldn’t sign you up just now. Please try again in a minute.' } };
}

export function confirmOutcome({ status, data }) {
  if (ok(status)) return { status: 200, body: { success: true, newsletter: data?.newsletter ?? null } };
  if (status === 410 || data?.expired) {
    return { status: 410, body: { error: 'This link has expired.', expired: true, fromEsy: true } };
  }
  if (refused(status)) return { status: 400, body: { error: 'This link isn’t valid.' } };
  return { status: 502, body: { error: 'Something went wrong. Please try the link again.' } };
}

export function unsubscribeOutcome({ status }) {
  if (ok(status)) return { status: 200, body: { success: true } };
  if (status === 410 || refused(status)) return { status: 400, body: { error: 'This link isn’t valid.' } };
  return { status: 502, body: { error: 'Couldn’t unsubscribe you just now. Please try again in a minute.' } };
}
