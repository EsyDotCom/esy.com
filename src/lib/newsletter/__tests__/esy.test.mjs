// Signups through Esy (2026-11-03): where calls go and what each answer means.
// Run: node --test src/lib/newsletter/__tests__/esy.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { callEsy, confirmOutcome, subscribeOutcome, subscriptionsUrl, unsubscribeOutcome, viaEsy } from '../esy.js';

test('the switch is off unless set to exactly "true"', () => {
  assert.equal(viaEsy({}), false);
  assert.equal(viaEsy({ NEWSLETTER_VIA_ESY: '1' }), false);
  assert.equal(viaEsy({ NEWSLETTER_VIA_ESY: 'true' }), true);
});

test('calls go to The Marketing Engineer by its slug, actions as :verb', () => {
  assert.equal(subscriptionsUrl('', {}), 'https://api.esy.com/v1/newsletters/engineer/subscriptions');
  assert.equal(subscriptionsUrl('confirm', { ESY_API_URL: 'http://localhost:8000/' }), 'http://localhost:8000/v1/newsletters/engineer/subscriptions:confirm');
});

test('a call forwards the reader’s IP and never throws', async () => {
  let seen;
  const fetchImpl = async (url, init) => {
    seen = { url, init };
    return new Response(JSON.stringify({ status: 'check_email' }), { status: 202 });
  };
  const answer = await callEsy('', { email: 'a@b.co' }, { clientIp: '203.0.113.9', env: {}, fetchImpl });
  assert.equal(answer.status, 202);
  assert.equal(seen.init.headers['X-Forwarded-For'], '203.0.113.9');
  assert.deepEqual(JSON.parse(seen.init.body), { email: 'a@b.co' });

  const down = await callEsy('', {}, { env: {}, fetchImpl: async () => { throw new Error('ECONNREFUSED'); } });
  assert.deepEqual(down, { status: 0, data: {} });
});

test('every accepted signup looks the same to the form', () => {
  assert.deepEqual(subscribeOutcome({ status: 202, data: { status: 'check_email' } }), { status: 200, body: { success: true } });
  assert.equal(subscribeOutcome({ status: 429, data: {} }).status, 429);
  assert.equal(subscribeOutcome({ status: 422, data: { detail: 'internal wording' } }).body.error, 'A valid email address is required.');
  // Esy down: a polite retry, never a crash or Esy's own wording.
  assert.equal(subscribeOutcome({ status: 0, data: {} }).status, 502);
});

test('confirm answers map onto the page’s screens', () => {
  const done = confirmOutcome({ status: 200, data: { newsletter: { name: 'The Marketing Engineer', slug: 'engineer' }, status: 'subscribed' } });
  assert.deepEqual(done, { status: 200, body: { success: true, newsletter: { name: 'The Marketing Engineer', slug: 'engineer' } } });
  assert.equal(confirmOutcome({ status: 410, data: {} }).body.expired, true);
  assert.equal(confirmOutcome({ status: 404, data: {} }).status, 400);
  assert.equal(confirmOutcome({ status: 500, data: {} }).status, 502);
});

test('unsubscribe answers map onto the page’s screens', () => {
  assert.equal(unsubscribeOutcome({ status: 204, data: {} }).status, 200);
  assert.equal(unsubscribeOutcome({ status: 403, data: {} }).status, 400);
  assert.equal(unsubscribeOutcome({ status: 0, data: {} }).status, 502);
});
