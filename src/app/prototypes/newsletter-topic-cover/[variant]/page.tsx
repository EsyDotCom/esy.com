import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import type { TakeId } from '@/components/NewsletterTopicCovers/covers';
import TopicCoverPage, { TOPIC_TAKES } from '@/components/NewsletterTopicCovers/TopicCoverPage';
import { findTopic } from '@/components/NewsletterTopicCovers/topics';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsletterPage/newsletter-page.css';

// Newsletter covers by topic, three ways (2026-10-11). Each take shows the
// issue page's cover with its art (?topic=muse|dots), then both issues'
// covers, moving and still.

const prototype = findPrototype('newsletter-topic-cover')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Topic covers ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function TopicCoverProtoPage({
  params,
  searchParams,
}: {
  params: Promise<{ variant: string }>;
  searchParams: Promise<{ topic?: string }>;
}) {
  const { variant } = await params;
  const { topic } = await searchParams;
  if (!(variant in TOPIC_TAKES)) notFound();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <TopicCoverPage take={variant as TakeId} issue={findTopic(topic)} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
