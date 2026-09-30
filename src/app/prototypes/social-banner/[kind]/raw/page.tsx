import { notFound } from 'next/navigation';
import DeskBanner, { DESK_BANNERS, type DeskBannerKind } from '@/components/LinkedInBanner/DeskBanner';

// The bare GitHub or X banner, nothing around it: what
// scripts/export-linkedin-banners.mjs screenshots at 2x.
export const metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return Object.keys(DESK_BANNERS).map((kind) => ({ kind }));
}

export default async function RawSocialBanner({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!(kind in DESK_BANNERS)) notFound();
  const k = kind as DeskBannerKind;
  return (
    <div id="banner" style={{ width: DESK_BANNERS[k].width, height: DESK_BANNERS[k].height }}>
      <DeskBanner kind={k} />
    </div>
  );
}
