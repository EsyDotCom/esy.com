import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { HeroSplit, HeroSplitTour, HeroStage, HeroStageTour, HeroTour } from '@/components/HomeHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// One hero direction, in the real site chrome (light header, footer below).
// Waitlist links carry a `proto-` source so prototype clicks never count as
// homepage signups.
const HEROES: Record<string, React.ComponentType<{ src?: string }>> = {
  split: HeroSplit,
  stage: HeroStage,
  tour: HeroTour,
  'split-tour': HeroSplitTour,
  'stage-tour': HeroStageTour,
};

const prototype = findPrototype('hero')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ direction: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  const v = prototype.variants.find((x) => x.slug === direction);
  return { title: v ? `Hero ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function HeroDirectionPage({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  const Hero = HEROES[direction];
  if (!Hero) notFound();

  return (
    <div className="proto">
      <LightHeader />
      <Hero src={`proto-hero-${direction}`} />
      <PrototypeBar prototype={prototype} current={direction} />
    </div>
  );
}
