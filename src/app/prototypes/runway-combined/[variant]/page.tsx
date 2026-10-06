import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { MergedPrototype, RunwayPayYourself, RunwaySplit, RunwayStage, RunwaySwitch } from '@/components/RunwayViews';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// One combined-runway direction, in the real site chrome. Waitlist links carry
// a `proto-` source so prototype clicks never count as real signups.
const VIEWS: Record<string, React.ComponentType> = {
  switch: RunwaySwitch,
  split: RunwaySplit,
  'pay-yourself': RunwayPayYourself,
  'd-merged': MergedPrototype,
};
// D brings its own window, with the sample-founder picker above it.
const OWN_WINDOW = new Set(['d-merged']);

const prototype = findPrototype('runway-combined')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Combined runway ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function RunwayCombinedPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const View = VIEWS[variant];
  const v = prototype.variants.find((x) => x.slug === variant);
  if (!View || !v) notFound();

  return (
    <div className="proto">
      <LightHeader />
      <RunwayStage prototype={prototype} variant={v} src={`proto-runway-combined-${variant}`} framed={!OWN_WINDOW.has(variant)}>
        <View />
      </RunwayStage>
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
