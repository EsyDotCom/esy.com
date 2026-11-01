// The confirmation reminder's words and timing (2026-11-01).
// Run: node --test src/lib/newsletter/__tests__/confirmEmail.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { REMINDER_AFTER_MS, confirmationEmail, reminderEmail } from '../confirmEmail.js';

const LINK = 'https://esy.com/newsletter/confirm/?t=abc%3D&x=<1>';

test('the reminder goes out two days after signup', () => {
  assert.equal(REMINDER_AFTER_MS, 48 * 60 * 60 * 1000);
});

test('the reminder carries the link, says it is the only one, and escapes the link in HTML', () => {
  const { subject, html, text } = reminderEmail(LINK);
  assert.equal(subject, 'Still want The Marketing Engineer?');
  assert.ok(text.includes(`Confirm my email: ${LINK}`));
  assert.ok(text.includes('This is the only reminder.'));
  assert.ok(html.includes('x=&lt;1&gt;') && !html.includes('x=<1>'));
});

test('the reminder reads differently from the confirmation email', () => {
  assert.notEqual(reminderEmail(LINK).subject, confirmationEmail(LINK).subject);
});
