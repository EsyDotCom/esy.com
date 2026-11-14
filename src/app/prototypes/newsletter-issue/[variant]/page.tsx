import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { IssueCover, IssueGuide, IssueLetter } from '@/components/NewsletterPage/IssuePages';
import { IssueBuildProof, IssueBuildSell, IssueReceipts } from '@/components/NewsletterPage/IssueRound2';
import { LATEST, findIssue } from '@/components/NewsletterPage/issues';
import { weeklySample } from '@/components/NewsletterPage/weekly-sample';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsletterPage/newsletter-page.css';

// One issue of The Marketing Engineer as its own page, three takes
// (2026-10-09). ?issue=1|2|3 picks the sample issue (the latest by default);
// older/newer links stay inside the same take. Ships at /newsletter/<slug>/.
// Round 2 (2026-10-14): the upgraded issue for agencies, one sample
// (agency-issue.ts), so those takes ignore ?issue.
// Round 3 (2026-11-14): the weekly issue (template v3) on the live page's
// component, with a sample issue that is never in ISSUES (weekly-sample.ts).
// ?sponsor=own|system|tutorial|none switches the sponsor; ?markdown=check
// appends raw HTML and unsafe links to The System to show they read as text.

const prototype = findPrototype('newsletter-issue')!;

// Slug to take, kept on the server (a map exported from a client module
// would arrive as a reference).
const TAKES = { letter: IssueLetter, guide: IssueGuide, cover: IssueCover } as const;
const ROUND2 = { 'build-proof': IssueBuildProof, receipts: IssueReceipts, 'build-sell': IssueBuildSell } as const;

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Newsletter issue ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function NewsletterIssueProtoPage({
  params,
  searchParams,
}: {
  params: Promise<{ variant: string }>;
  searchParams: Promise<{ issue?: string; sponsor?: string; markdown?: string }>;
}) {
  const { variant } = await params;
  const { issue: n, sponsor, markdown } = await searchParams;
  // The weekly sample on the live issue page's component (L5, which reads v3 issues in N12's order).
  if (variant === 'weekly') {
    return (
      <div className={`nl ${nlSerif.variable}`}>
        <LightHeader />
        <IssueReceipts issue={weeklySample({ sponsor, check: markdown === 'check' })} />
        <PrototypeBar prototype={prototype} current={variant} />
      </div>
    );
  }
  const Round2 = ROUND2[variant as keyof typeof ROUND2];
  if (Round2) {
    return (
      <div className={`nl ${nlSerif.variable}`}>
        <LightHeader />
        <Round2 />
        <PrototypeBar prototype={prototype} current={variant} />
      </div>
    );
  }
  const Take = TAKES[variant as keyof typeof TAKES];
  if (!Take) notFound();
  const issue = (n && findIssue(Number(n))) || LATEST;
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <Take issue={issue} link={`/prototypes/newsletter-issue/${variant}/?issue={n}`} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
