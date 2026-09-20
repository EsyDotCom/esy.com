import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { DropDaybreak, DropDusk, DropLedger } from '@/components/DropUrlHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// One "drop your URL" direction, in the real site chrome. Waitlist links carry
// a `proto-` source so prototype clicks never count as homepage signups.
const HEROES: Record<string, React.ComponentType<{ src?: string }>> = {
  dusk: DropDusk,
  daybreak: DropDaybreak,
  ledger: DropLedger,
};

const prototype = findPrototype('drop-url')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function DropUrlVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Hero = HEROES[variant];
  if (!Hero) notFound();

  return (
    <div className="proto">
      <LightHeader />
      <Hero src={`proto-drop-${variant}`} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
