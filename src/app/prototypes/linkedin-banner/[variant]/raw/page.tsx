import { notFound } from 'next/navigation';
import LinkedInBanner, { BANNER_VARIANTS } from '@/components/LinkedInBanner/LinkedInBanner';

// The bare 1584×396 canvas, nothing around it: what
// scripts/export-linkedin-banners.mjs screenshots into the downloadable PNG.

export function generateStaticParams() {
  return BANNER_VARIANTS.map((variant) => ({ variant }));
}

export default async function RawBanner({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const known = BANNER_VARIANTS.find((b) => b === variant);
  if (!known) notFound();
  return (
    <div id="banner" style={{ width: 1584, height: 396 }}>
      <LinkedInBanner variant={known} />
    </div>
  );
}
