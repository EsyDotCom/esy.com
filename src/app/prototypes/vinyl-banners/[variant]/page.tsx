import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import VinylBannerPage, { BANNER_CONCEPTS, type BannerConcept } from '@/components/VinylBanners/VinylBannerPage';
import '@/components/prototypes/og-preview.css';

// The Marketing Engineer's channel and social banners in glossy vinyl (2026-10-11):
// one concept per take, on YouTube, LinkedIn and X.

const prototype = findPrototype('vinyl-banners')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Vinyl banners ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false } };
}

export default async function VinylBannersProtoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  const concept = BANNER_CONCEPTS.find((c) => c === variant) as BannerConcept | undefined;
  if (!v || !concept) notFound();
  return (
    <div className="proto">
      <LightHeader />
      <main className="og-page pi-wrap">
        <header className="og-head">
          <p className="pi-kicker">Vinyl banners {v.key} · {v.name}</p>
          <h1>{v.title}</h1>
          <p className="og-blurb">{v.blurb}</p>
        </header>
        <VinylBannerPage concept={concept} />
      </main>
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
