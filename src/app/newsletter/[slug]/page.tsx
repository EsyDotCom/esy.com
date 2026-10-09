import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { ISSUES } from '@/components/NewsletterPage/issues';
import { LiveIssue } from '@/components/NewsletterPage/Live';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsletterPage/newsletter-page.css';

// One issue of The Marketing Engineer (2026-10-09), as L3 · Cover from
// /prototypes/newsletter-issue/, with the course promo. The issues are samples
// for now, so these pages stay out of search until real ones replace them.
// (/newsletter/confirm/ is its own folder and wins over this segment.)

export const dynamicParams = false;

export function generateStaticParams() {
  return ISSUES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const issue = ISSUES.find((i) => i.slug === slug);
  if (!issue) return {};
  const title = `${issue.title} — The Marketing Engineer`;
  return {
    title,
    description: issue.dek,
    robots: { index: false, follow: true },
    openGraph: { title, description: issue.dek, type: 'article', url: `https://esy.com/newsletter/${slug}/`, siteName: 'Esy', images: issue.cover ? [issue.cover] : undefined },
    alternates: { canonical: `/newsletter/${slug}/` },
  };
}

export default async function NewsletterIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = ISSUES.find((i) => i.slug === slug);
  if (!issue) notFound();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <LiveIssue n={issue.n} />
    </div>
  );
}
