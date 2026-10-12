import { MasonScene } from '@/components/BrandShapes/mason-scene';
import { OctopusFigure } from '@/components/BrandShapes/octopus-figure';
import { CamoMason } from '@/components/NewsletterTopicCovers/mason-camo';
import type { TopicId } from '@/components/NewsletterTopicCovers/topics';
import '@/components/BrandShapes/reef.css';

// Mason flat on a pale studio sweep at 1536x1024 (2026-10-11), so a script can
// capture him as the source for the toy renders (/prototypes/mason-toy/): in
// his own colours, empty-handed, or with ?topic= in that issue's camouflage
// with a blank tag held out; or with ?reef=1 the live footer's reef, full width,
// as the source for its vinyl version. Not a page anyone visits.

export const metadata = { title: 'Mason toy source — Esy prototypes', robots: { index: false } };

const TOPICS: TopicId[] = ['dots', 'muse', 'clay'];

export default async function MasonToySource({ searchParams }: { searchParams: Promise<{ topic?: string; reef?: string }> }) {
  const { topic, reef } = await searchParams;
  // The live footer's world, edge to edge on its own water (capture with reduced motion for the finished gate).
  if (reef) {
    return (
      <div className="bs-fw" style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#0E2B45', display: 'flex', alignItems: 'flex-end' }}>
        <style>{'nextjs-portal { display: none; } .bs-fw .bs-fs { width: 100vw !important; }'}</style>
        <MasonScene />
      </div>
    );
  }
  const camo = TOPICS.find((t) => t === topic);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'radial-gradient(ellipse at 50% 40%, #F1EFEA 0%, #DCD8CF 100%)' }}>
      <style>{'.bs-oct *, .bs-oct { animation: none !important; } nextjs-portal { display: none; } .tc-toy-src { position: absolute; left: 50%; top: 52%; width: 1080px; translate: -50% -50%; }'}</style>
      <div className="tc-toy-src">
        {camo ? (
          <svg viewBox="0 0 480 360" role="img" aria-label="Mason in camouflage">
            <CamoMason topic={camo} id={`toy-src-${camo}`} tag="blank" />
          </svg>
        ) : (
          <OctopusFigure items={{}} />
        )}
      </div>
    </div>
  );
}
