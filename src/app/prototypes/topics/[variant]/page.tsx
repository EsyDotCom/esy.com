import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { TakeContents, TakeCovers, TakeExplorer } from '@/components/TopicsProto/TopicsTakes';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { topicCards } from '@/components/Topics/topicCards';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/TopicsProto/topics-proto.css';

// esy.com/topics, reimagined in Esy's brand: three takes (2026-10-09), over
// the real topics and the real published articles. Each topic's cover is
// generated through api.esy.com in the newsletter's series style
// (scripts/generate-newsletter-covers.mjs, COVERS_SET=topics).

const prototype = findPrototype('topics')!;
const TAKES = { covers: TakeCovers, contents: TakeContents, explorer: TakeExplorer } as const;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Topics ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function TopicsProtoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Take = TAKES[variant as keyof typeof TAKES];
  if (!Take) notFound();

  // The same cards the live /topics uses.
  const { topics, total } = topicCards(await getAllAgenticArticles());

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <Take topics={topics} total={total} />
      <WeeklyEmailBand />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
