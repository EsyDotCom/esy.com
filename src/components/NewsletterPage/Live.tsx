'use client';

/* The live /newsletter pages (2026-10-09): the picked takes with the real
   signup, real addresses, and sample issues labelled as samples until Compose
   writes real ones. Index: D's top with I's wide feed (Round3 TakeWideFeed).
   Issue page: L5 · Receipts first since 2026-10-15 (IssueRound2 IssueReceipts),
   with cover, course promo and signup band from L3; it was L3 · Cover before.

   Since 2026-10-16 the server pages pass the issues in: the registry merged
   with those published from Compose (src/lib/published-issues.ts), plus the
   headlines of Compose news posts the issues link. */

import { IssueReceipts } from './IssueRound2';
import type { Issue } from './issues';
import { TakeWideFeed } from './Round3';
import { type IssuesData, IssuesProvider, type NewsletterMode, NewsletterModeProvider } from './shared';

const LIVE: NewsletterMode = { link: '/newsletter/{slug}/', archive: '/newsletter/', live: true };

export function LiveNewsletterIndex({ data }: { data: IssuesData }) {
  return (
    <NewsletterModeProvider value={LIVE}>
      <IssuesProvider value={data}>
        <TakeWideFeed />
      </IssuesProvider>
    </NewsletterModeProvider>
  );
}

export function LiveIssue({ issue, data }: { issue: Issue; data: IssuesData }) {
  return (
    <NewsletterModeProvider value={LIVE}>
      <IssuesProvider value={data}>
        <IssueReceipts issue={issue} />
      </IssuesProvider>
    </NewsletterModeProvider>
  );
}
