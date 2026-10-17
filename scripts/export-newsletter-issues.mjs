#!/usr/bin/env node
/* The newsletter's issues as JSON, for api.esy.com's import
   (scripts/import_newsletter_issues.py there), so Compose can manage the
   issues that were written into this repo.

   Reads src/components/NewsletterPage/issues.ts as it is (through jiti, so
   there's no build step) and prints esy.com's Issue objects, newest first.
   Prints only; it changes nothing here or on the API.

     node scripts/export-newsletter-issues.mjs > /tmp/issues.json
     node scripts/export-newsletter-issues.mjs --check     # count and list them */

import { createJiti } from 'jiti';
import { fileURLToPath } from 'node:url';

const jiti = createJiti(fileURLToPath(import.meta.url));
const { ISSUES } = await jiti.import('../src/components/NewsletterPage/issues.ts');

if (process.argv.includes('--check')) {
  for (const issue of ISSUES) console.log(`No. ${issue.n}  ${issue.slug}  ${issue.body.length} parts`);
  console.log(`${ISSUES.length} issues`);
} else {
  process.stdout.write(`${JSON.stringify(ISSUES, null, 2)}\n`);
}
