/* The newsletter's list lives in Resend (2026-10-09; it was Beehiiv). These are
   the few calls the signup flow needs, over plain fetch like the Beehiiv calls
   they replace, so there's no SDK to keep in step.

   The list's shape:
   - Every signup is a contact with string properties `confirmed` ("false" until
     the confirmation link is clicked), `source` (the page) and `video` (the
     YouTube video, when there is one). `reminder` holds the id of the one
     "still want it?" email scheduled two days after signup, so confirming can
     cancel it (2026-11-01).
   - Only confirmed contacts are in the Newsletter segment
     (RESEND_NEWSLETTER_SEGMENT_ID), and issues go to that segment only.
   - Resend's own `unsubscribed` flag is left alone: it means "opted out", and
     using it for "not confirmed yet" would corrupt the unsubscribe list. */

const API = 'https://api.resend.com';

// Newsletter mail comes from the mail.esy.com subdomain, so a bad week of
// spam complaints can't touch the reputation of sign-in mail from esy.com.
// Replies go to Zev's real inbox.
export const FROM = 'Zev at Esy <zev@mail.esy.com>';
export const REPLY_TO = 'zev@esy.com';

export const isConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.RESEND_NEWSLETTER_SEGMENT_ID);

async function call(method, path, body, extraHeaders = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

// Resend takes properties as a flat { key: value } map of strings.
const props = (fields) => Object.fromEntries(Object.entries(fields).filter(([, v]) => typeof v === 'string'));

/** The contact for `email`, or null when there isn't one. Throws on other failures. */
export async function getContact(email) {
  const res = await call('GET', `/contacts/${encodeURIComponent(email)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Resend contact lookup failed (${res.status})`);
  return res.data;
}

/** A property's value on a contact ("" when unset). */
export const prop = (contact, key) => contact?.properties?.[key]?.value ?? '';

/** Creates the contact; a second create for the same address returns the same contact. */
export async function createContact(email, { firstName, ...fields }) {
  const body = { email, properties: props(fields) };
  if (firstName) body.first_name = firstName;
  const res = await call('POST', '/contacts', body);
  if (!res.ok) throw new Error(`Resend contact create failed (${res.status})`);
  return res.data;
}

/** Updates properties and/or the first name on an existing contact. */
export async function updateContact(email, { firstName, ...fields }) {
  const body = { properties: props(fields) };
  if (firstName) body.first_name = firstName;
  const res = await call('PATCH', `/contacts/${encodeURIComponent(email)}`, body);
  if (!res.ok) throw new Error(`Resend contact update failed (${res.status})`);
}

/** Puts a contact into the Newsletter segment, the list issues go to. */
export async function addToNewsletter(email) {
  const segment = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  const res = await call('POST', `/contacts/${encodeURIComponent(email)}/segments/${segment}`);
  if (!res.ok) throw new Error(`Resend segment add failed (${res.status})`);
}

/** Sends one email, now or at `scheduledAt` (an ISO time, up to 30 days out).
 *  The idempotency key stops a retried request from sending it twice. */
export async function sendEmail({ to, subject, html, text, idempotencyKey, scheduledAt }) {
  const res = await call(
    'POST',
    '/emails',
    { from: FROM, reply_to: REPLY_TO, to: [to], subject, html, text, ...(scheduledAt ? { scheduled_at: scheduledAt } : {}) },
    idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {},
  );
  // 409 on a keyed send means this key already sent an email in the last 24
  // hours (a double-click, a retry): that email is out, so it counts as sent.
  if (res.status === 409 && idempotencyKey) return { duplicate: true };
  if (!res.ok) throw new Error(`Resend send failed (${res.status}): ${res.data?.message || ''}`);
  return res.data;
}

/** Cancels an email scheduled for later. False when it couldn't be (already
 *  sent, already cancelled, or gone): callers treat that as nothing to do. */
export async function cancelEmail(id) {
  const res = await call('POST', `/emails/${encodeURIComponent(id)}/cancel`);
  return res.ok;
}

// Resend saves a contact property only once its key is defined. Each key this
// code introduces is defined the first time it's needed (once per server);
// a key that already exists makes the create fail, which is fine.
const defined = new Map();
export function defineProperty(key) {
  if (!defined.has(key)) {
    defined.set(key, call('POST', '/contact-properties', { key, type: 'string', fallback_value: '' }).catch(() => null));
  }
  return defined.get(key);
}

/** Tells Resend something happened to a contact, which starts any Automation
 *  listening for that event (the email course, the YouTube welcome). */
export async function sendEvent(event, email, payload) {
  const res = await call('POST', '/events/send', { event, email, payload });
  if (!res.ok) throw new Error(`Resend event "${event}" failed (${res.status}): ${res.data?.message || ''}`);
}
