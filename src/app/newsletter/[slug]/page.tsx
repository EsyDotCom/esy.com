import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { LiveIssue } from '@/components/NewsletterPage/Live';
import { findIssueBySlug, getIssueNews, getIssues } from '@/lib/published-issues';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsletterPage/newsletter-page.css';

// One issue of The Marketing Engineer (2026-10-09), as L5 · Receipts first from
// /prototypes/newsletter-issue/ since 2026-10-15 (L3 · Cover before), with the
// course promo. The issues in the registry are samples and stay out of search;
// a real one, published from Compose, is indexed. (/newsletter/confirm/ is its
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const issue = await findIssueBySlug(slug);
  if (!issue) return {};
  const title = `${issue.title} — The Marketing Engineer`;
  return {
    title,
    description: issue.dek,
    robots: { index: Boolean(issue.real), follow: true },
    openGraph: { title, description: issue.dek, type: 'article', url: `https://esy.com/newsletter/${slug}/`, siteName: 'Esy', images: issue.cover ? [issue.cover] : undefined },
    alternates: { canonical: `/newsletter/${slug}/` },
  };
}

export default async function NewsletterIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issues = await getIssues();
  const issue = issues.find((i) => i.slug === slug);
  if (!issue) notFound();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <LiveIssue issue={issue} data={{ issues, news: await getIssueNews(issues) }} />
    </div>
  );
}
