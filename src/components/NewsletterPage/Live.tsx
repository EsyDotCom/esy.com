'use client';

/* The live /newsletter pages (2026-10-09): the picked takes with the real
   signup, real addresses, and sample issues labelled as samples until Compose
   writes real ones. Index: D's top with I's wide feed (Round3 TakeWideFeed).
   Issue page: L5 · Receipts first since 2026-10-15 (IssueRound2 IssueReceipts),
   with cover, course promo and signup band from L3; it was L3 · Cover before. */

import { IssueReceipts } from './IssueRound2';
import { findIssue } from './issues';
import { TakeWideFeed } from './Round3';
import { type NewsletterMode, NewsletterModeProvider } from './shared';

const LIVE: NewsletterMode = { link: '/newsletter/{slug}/', archive: '/newsletter/', live: true };

export function LiveNewsletterIndex() {
  return (
    <NewsletterModeProvider value={LIVE}>
      <TakeWideFeed />
    </NewsletterModeProvider>
  );
}

export function LiveIssue({ n }: { n: number }) {
  const issue = findIssue(n);
  if (!issue) return null;
  return (
    <NewsletterModeProvider value={LIVE}>
      <IssueReceipts issue={issue} />
    </NewsletterModeProvider>
  );
}
