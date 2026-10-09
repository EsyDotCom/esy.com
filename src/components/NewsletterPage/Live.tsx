'use client';

/* The live /newsletter pages (2026-10-09): the picked takes with the real
   signup, real addresses, and sample issues labelled as samples until Compose
   writes real ones. Index: D's top with I's wide feed (Round3 TakeWideFeed).
   Issue page: L3 · Cover with the course promo (IssuePages IssueCover). */

import { IssueCover } from './IssuePages';
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
      <IssueCover issue={issue} link={LIVE.link} />
    </NewsletterModeProvider>
  );
}
