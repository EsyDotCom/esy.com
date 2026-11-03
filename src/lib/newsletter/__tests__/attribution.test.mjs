// Where a signup came from (src/lib/newsletter/attribution.js): the page's hub,
// the video, and since 2026-11-03 the ?src= tag and an article's slug, which
// os.esy.com's Plan counts readers by. Run: node --test src/lib/newsletter/__tests__/attribution.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attribute } from '../attribution.js';

test('an article counts as /articles, with its slug as the page', () => {
  const where = attribute('/articles/how-to-write-a-brief/', '', '');
  assert.equal(where.path, '/articles');
  assert.equal(where.page, 'how-to-write-a-brief');
  assert.equal(where.src, '');
});

test('the articles index has no page', () => {
  assert.equal(attribute('/articles', '', '').page, '');
});

test('the ?src= tag is kept, lowercased, letters digits and hyphens only', () => {
  assert.equal(attribute('/newsletter', '', 'LinkedIn').src, 'linkedin');
  assert.equal(attribute('/newsletter', '', 'li<script>').src, 'liscript');
  assert.equal(attribute('/newsletter', '', 'x'.repeat(60)).src.length, 40);
  assert.equal(attribute('/newsletter', '', undefined).src, '');
});

test('news pages still count as /news, and /newsletter is not swallowed by it', () => {
  assert.equal(attribute('/news/some-story', '', '').path, '/news');
  assert.equal(attribute('/newsletter', '', '').path, '/newsletter');
});

test('a YouTube signup keeps its video', () => {
  const where = attribute('/invite', 'brief-system', 'youtube');
  assert.equal(where.video, 'brief-system');
  assert.equal(where.src, 'youtube');
});
