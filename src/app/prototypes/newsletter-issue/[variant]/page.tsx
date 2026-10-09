import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { IssueCover, IssueGuide, IssueLetter } from '@/components/NewsletterPage/IssuePages';
import { LATEST, findIssue } from '@/components/NewsletterPage/issues';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsletterPage/newsletter-page.css';

// One issue of The Marketing Engineer as its own page, three takes
// (2026-10-09). ?issue=1|2|3 picks the sample issue (the latest by default);
// older/newer links stay inside the same take. Ships at /newsletter/<slug>/.

const prototype = findPrototype('newsletter-issue')!;

// Slug to take, kept on the server (a map exported from a client module
// would arrive as a reference).
const TAKES = { letter: IssueLetter, guide: IssueGuide, cover: IssueCover } as const;

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
  searchParams: Promise<{ issue?: string }>;
}) {
  const { variant } = await params;
  const { issue: n } = await searchParams;
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
