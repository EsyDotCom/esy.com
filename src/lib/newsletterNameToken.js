import { createHmac, timingSafeEqual } from 'node:crypto';

/* A short-lived pass for the signup form's second step, "what should I call
   you?" (2026-10-06). The subscribe route hands one back with every accepted
   signup; /api/newsletter/name accepts a first name only with it. Without it,
   anyone could post any address and rename a subscriber.

   The token is the address and an expiry, signed with an HMAC. The key is
   derived from BEEHIIV_API_KEY with a label, so no new secret has to be set,
   and the token can't be used for anything but this. */

const TTL_MS = 30 * 60 * 1000;
const LABEL = 'esy.com newsletter name step v1';

function key() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  if (!apiKey) return null;
  return createHmac('sha256', apiKey).update(LABEL).digest();
}

const sign = (k, payload) => createHmac('sha256', k).update(payload).digest('base64url');

/** A token for `email`, good for 30 minutes; null when the API key is missing. */
export function signNameToken(email) {
  const k = key();
  if (!k) return null;
  const payload = Buffer.from(JSON.stringify({ e: email, x: Date.now() + TTL_MS })).toString('base64url');
  return `${payload}.${sign(k, payload)}`;
}

/** The address a token was issued for, or null if it's forged, malformed or expired. */
export function verifyNameToken(token) {
  const k = key();
  if (!k || typeof token !== 'string') return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;

  // Compare signatures in constant time, so a guess can't be timed.
  const expected = Buffer.from(sign(k, payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const { e, x } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof e === 'string' && typeof x === 'number' && Date.now() < x ? e : null;
  } catch {
    return null;
  }
}
