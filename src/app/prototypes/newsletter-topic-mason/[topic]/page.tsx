import { notFound } from 'next/navigation';
import { CamoMason } from '@/components/NewsletterTopicCovers/mason-camo';
import type { TopicId } from '@/components/NewsletterTopicCovers/topics';

// Round 5 of the topic covers (2026-10-11): Mason in a topic's camouflage, laid
// flat on the live covers' desk plate at 1536x1024 with a blank tag, so a script
// can capture it as the source for the N · Toy and O · Felt edits. Not a page
// anyone visits; the takes show the finished images.

export const metadata = { title: 'Mason camouflage source — Esy prototypes', robots: { index: false } };

const PLATE = 'https://images.esy.com/artifacts/photo-image/run-478aa4ef/image.webp';
const TOPICS: TopicId[] = ['dots', 'muse', 'clay'];

export default async function MasonCamoSource({ params }: { params: Promise<{ topic: string }> }) {
  const topic = (await params).topic as TopicId;
  if (!TOPICS.includes(topic)) notFound();
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#000' }}>
      <style>{'.tc-mason-src *, .tc-mason-src { animation: none !important; } nextjs-portal { display: none; }'}</style>
      <svg className="tc-mason-src" viewBox="0 0 1536 1024" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <image href={PLATE} width={1536} height={1024} />
        {/* sitting on the desk's left side, arms over its front edge, the tag hanging in front */}
        <g transform="translate(22 366) scale(1.7)">
          <CamoMason topic={topic} id={`src-${topic}`} tag="blank" />
        </g>
      </svg>
    </div>
  );
}
