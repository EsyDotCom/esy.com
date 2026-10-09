import { createHmac, timingSafeEqual } from 'node:crypto';

/* Signed passes for the newsletter's two follow-up steps (2026-10-09):
   - "name":    the form's "what should I call you?" step, good for 30 minutes.
   - "confirm": the link in the confirmation email, good for 7 days.

   A pass is the address, its purpose and an expiry, signed with an HMAC, so no
   database is needed: whoever holds a valid pass proved they got it from us.
   The purpose is part of what's signed, so a name pass can never confirm an
   address and a confirmation link can never rename anyone.

   The key is NEWSLETTER_TOKEN_SECRET (its own secret, no longer derived from
   the Beehiiv key, so moving off Beehiiv doesn't invalidate passes). */

export const TOKEN_TTL_MS = {
  name: 30 * 60 * 1000,
  confirm: 7 * 24 * 60 * 60 * 1000,
};

function key() {
  const secret = process.env.NEWSLETTER_TOKEN_SECRET;
  if (!secret) return null;
  return createHmac('sha256', secret).update('esy.com newsletter tokens v2').digest();
}

const sign = (k, payload) => createHmac('sha256', k).update(payload).digest('base64url');

/** A pass for `email` and `purpose`; null when the secret is missing. */
export function signToken(purpose, email) {
  const k = key();
  if (!k || !TOKEN_TTL_MS[purpose]) return null;
  const payload = Buffer.from(JSON.stringify({ p: purpose, e: email, x: Date.now() + TOKEN_TTL_MS[purpose] })).toString('base64url');
  return `${payload}.${sign(k, payload)}`;
}

/** What a pass says, without judging its age: { email, expired } for a genuine
 *  pass of this purpose, or null when it's forged, malformed or for another
 *  purpose. Callers decide what an expired pass may still do (a confirmation
 *  link that ran out can still ask for a fresh one). */
export function readToken(purpose, token) {
  const k = key();
  if (!k || typeof token !== 'string') return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;

  // Compare signatures in constant time, so a guess can't be timed.
  const expected = Buffer.from(sign(k, payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const { p, e, x } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (p !== purpose || typeof e !== 'string' || typeof x !== 'number') return null;
    return { email: e, expired: Date.now() >= x, expiredForMs: Math.max(0, Date.now() - x) };
  } catch {
    return null;
  }
}

/** The address on a genuine, unexpired pass of this purpose, or null. */
export function verifyToken(purpose, token) {
  const read = readToken(purpose, token);
  return read && !read.expired ? read.email : null;
}
