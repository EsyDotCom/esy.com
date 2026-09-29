import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// One footer direction. The page itself is a short note; the footer under test
// renders in the footer's real slot (ConditionalFooter), over the same factory
// scene, so it's seen exactly where it lives.

const prototype = findPrototype('footer')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Footer ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function FooterVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  if (!v) notFound();

  return (
    <div className="proto">
      <LightHeader />
      <main className="pi-wrap" style={{ paddingTop: 56, paddingBottom: 24 }}>
        <p className="pi-kicker">
          Footer {v.key} · {v.name}
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.08, marginTop: 12 }}>{v.title}</h1>
        <p style={{ marginTop: 14, fontSize: '1.1rem', lineHeight: 1.55, maxWidth: 720 }}>{v.blurb}</p>
        <p style={{ marginTop: 18, fontSize: '0.9rem', opacity: 0.7 }}>Scroll down: the footer below is this version.</p>
      </main>
      <PrototypeBar prototype={prototype} current={v.slug} />
    </div>
  );
}
