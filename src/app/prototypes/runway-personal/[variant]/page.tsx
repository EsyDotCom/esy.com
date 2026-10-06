import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { RunwayHousehold, RunwayPaycheck, RunwaySafetyNet, RunwayStage } from '@/components/RunwayViews';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// One personal-runway direction, in the real site chrome. Waitlist links carry
// a `proto-` source so prototype clicks never count as real signups.
const VIEWS: Record<string, React.ComponentType> = {
  household: RunwayHousehold,
  paycheck: RunwayPaycheck,
  'safety-net': RunwaySafetyNet,
};

const prototype = findPrototype('runway-personal')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Personal runway ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function RunwayPersonalPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const View = VIEWS[variant];
  const v = prototype.variants.find((x) => x.slug === variant);
  if (!View || !v) notFound();

  return (
    <div className="proto">
      <LightHeader />
      <RunwayStage prototype={prototype} variant={v} src={`proto-runway-personal-${variant}`}>
        <View />
      </RunwayStage>
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
