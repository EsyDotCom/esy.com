import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { TakeBatch, TakeReadFirst, TakeStudio } from '@/components/NewsletterPage/Takes';
import { TakeMagazine, TakePublication, TakeWelcome } from '@/components/NewsletterPage/Round2';
import { TakeFeedNews, TakeFeedRail, TakeWideFeed } from '@/components/NewsletterPage/Round3';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsletterPage/newsletter-page.css';

// esy.com/newsletter, three takes on how the page opens (2026-10-09), in the
// real light header and footer, over three sample issues. The real
// /newsletter route doesn't exist yet; the pick ships there.

const prototype = findPrototype('newsletter')!;

// Slug to take. Kept here, on the server: a plain object exported from the
// client module would arrive as a reference, not a map.
const TAKES = {
  batch: TakeBatch, 'read-first': TakeReadFirst, studio: TakeStudio,
  publication: TakePublication, welcome: TakeWelcome, magazine: TakeMagazine,
  'feed-rail': TakeFeedRail, 'feed-news': TakeFeedNews, 'wide-feed': TakeWideFeed,
} as const;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Newsletter page ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function NewsletterProtoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Take = TAKES[variant as keyof typeof TAKES];
  if (!Take) notFound();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <Take />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
