import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { BuilderWindow } from '@/components/PageBuilder/BuilderWindow';
import { DIRECTIONS } from '@/components/PageBuilder/directions';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import '@/components/PageBuilder/page.css';

// One direction of the os.esy.com page builder, in the real site chrome. The
// builder runs on its own page (./raw/) shown in a scaled window, on sample data.
const prototype = findPrototype('page-builder')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Page builder ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function PageBuilderVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const direction = DIRECTIONS[variant];
  const v = prototype.variants.find((x) => x.slug === variant);
  if (!direction || !v) notFound();
  const round = prototype.rounds.find((r) => r.n === v.round);

  return (
    <div className="pbp-page">
      {/* The site chrome and the heading use the prototypes' look; the window
          sits outside .proto so those styles don't reach the builder. */}
      <div className="proto pbp-top">
        <LightHeader />
        <header className="pbp-head">
          <p className="pbp-kicker">
            Prototype · {prototype.name} · Round {v.round}
            {round ? `: ${round.title}` : ''}
          </p>
          <h1>
            {v.key} · {v.name}
          </h1>
          <p className="pbp-blurb">{v.blurb}</p>
          <p className="pbp-sample">Northside Roofing, its page and every figure here are samples.</p>
        </header>
      </div>
      <main className="pbp">
        <BuilderWindow src={`/prototypes/page-builder/${variant}/raw/`} url="os.esy.com/agency/work/pages/roof-leak-repair-denver" />
      </main>
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
