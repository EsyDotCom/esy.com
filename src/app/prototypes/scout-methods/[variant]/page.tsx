import { notFound } from 'next/navigation';
import { ScoutMethodsTake, type MethodsTake } from '@/components/Scout/ScoutMethodsTakes';
import { cormorant } from '@/components/SkillsHub/folio/font';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

// esy.com/scout/how-we-work/, three designs (2026-11-07): the same words (ScoutMethodsTakes.tsx), laid out
//   M1 · Commitments  a sticky index and a big statement per rule
//   M2 · Always / Never  three promises, an always / never split, a corrections panel
//   M3 · How a page is made  four stages, then the corrections process as a timeline

const TAKES: Record<string, MethodsTake> = { commitments: 'commitments', split: 'split', process: 'process', merge: 'merge' };
const prototype = findPrototype('scout-methods')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `How Scout works ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function ScoutMethodsVariant({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const take = TAKES[variant];
  if (!take) notFound();
  return (
    <div className={`folio ${cormorant.variable}`}>
      <ScoutMethodsTake take={take} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
