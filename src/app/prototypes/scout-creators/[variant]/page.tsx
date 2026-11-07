import { notFound } from 'next/navigation';
import { ScoutLanding } from '@/components/Scout/ScoutLanding';
import type { CreatorsTake } from '@/components/Scout/CreatorPlans';
import type { FunnelView } from '@/components/Scout/FunnelViews';
import { cormorant } from '@/components/SkillsHub/folio/font';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

// esy.com/scout with the creators' game plans (2026-11-07). Zev: expose a small version of Scout's
// directory publicly, the creators and their game plans, funnels and social links. Each take is the
// live esy.com/scout with one placement added (CreatorPlans.tsx):
//   S6 · Shelf   a row of creator cards under the map; picking one opens its plan below
//   S7 · Index   a searchable two-pane directory under the map
//   S8 · Lookup  above the fold: the hero's plate opens on creators' game plans
//   S9 · Lookup + search  S8 with a search box over the faces, in an app shell (Zev's pick)
// Round 3, S9 with the profile first and the funnel as a diagram:
//   S10 · Wires  columns joined by thin curves   S11 · Lanes  a row per platform   S12 · Dots  colour dots, no lines

const TAKES: Record<string, CreatorsTake> = { shelf: 'shelf', index: 'index', lookup: 'lookup', 'lookup-search': 'search', wires: 'search', lanes: 'search', dots: 'search' };
// Round 3: S9's shell with the funnel drawn as a diagram (FunnelViews.tsx).
const FUNNEL: Record<string, FunnelView> = { wires: 'wires', lanes: 'lanes', dots: 'dots' };

const prototype = findPrototype('scout-creators')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Scout, creators’ game plans ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function ScoutCreatorsVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES[variant];
  if (!take) notFound();
  return (
    <div className={`folio ${cormorant.variable}`}>
      <ScoutLanding creators={take} funnel={FUNNEL[variant]} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
