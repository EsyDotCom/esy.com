import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { LiveIssue } from '@/components/NewsletterPage/Live';
import { getIssueNews, getIssues } from '@/lib/published-issues';
import { issueInSearch } from '@/lib/search-indexing';
import { previewIssue, readPreview, sectionPathFor } from '@/lib/preview';
import PreviewBar from '@/components/PreviewBar/PreviewBar';
import type { Issue } from '@/components/NewsletterPage/issues';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsletterPage/newsletter-page.css';

// One issue of The Marketing Engineer (2026-10-09), as L5 · Receipts first from
// /prototypes/newsletter-issue/ since 2026-10-15 (L3 · Cover before), with the
// course promo. The issues in the registry are samples and stay out of search;
// a real one, published from Compose, is indexed unless Esy marks it noindex
// (src/lib/search-indexing.ts). (/newsletter/confirm/ is its
// own folder and wins over this segment.)
//
// Issues published from Compose (src/lib/published-issues.ts) get a page the
// moment they're published: unknown slugs render on demand, and the revalidate
// webhook refreshes these pages. The hour is only a backstop.
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getIssues()).map((i) => ({ slug: i.slug }));
}

// Every issue, and this slug's: the published ones, or, when a preview link is
// open for this issue (Draft Mode), the draft in its place (src/lib/preview.ts).
async function issuesFor(slug: string): Promise<{ issues: Issue[]; issue?: Issue; isPreview: boolean }> {
  const published = await getIssues();
  const preview = await readPreview('issue', slug);
  if (!preview) return { issues: published, issue: published.find((i) => i.slug === slug), isPreview: false };
  const draft = previewIssue(preview);
  const issues = [draft, ...published.filter((i) => i.slug !== slug)].sort((a, b) => b.n - a.n);
  return { issues, issue: draft, isPreview: true };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { issue } = await issuesFor(slug);
  if (!issue) return {};
  const title = `${issue.title} — The Marketing Engineer`;
  return {
    title,
    description: issue.dek,
    // Samples (the registry) and issues Esy marks noindex stay out of search.
    robots: { index: issueInSearch(issue), follow: true },
    openGraph: { title, description: issue.dek, type: 'article', url: `https://esy.com/newsletter/${slug}/`, siteName: 'Esy', images: issue.cover ? [issue.cover] : undefined },
    alternates: { canonical: `/newsletter/${slug}/` },
  };
}

export default async function NewsletterIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { issues, issue, isPreview } = await issuesFor(slug);
  if (!issue) notFound();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <LiveIssue issue={issue} data={{ issues, news: await getIssueNews(issues) }} />
      {isPreview && <PreviewBar exitTo={sectionPathFor('issue')} />}
    </div>
  );
}
