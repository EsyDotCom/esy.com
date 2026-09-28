import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import LinkedInBanner, { BANNER_VARIANTS, type BannerVariant } from '@/components/LinkedInBanner/LinkedInBanner';
import ScaledBanner from '@/components/LinkedInBanner/ScaledBanner';
import '@/components/prototypes/og-preview.css';
import '@/components/LinkedInBanner/banner-preview.css';

// One banner direction, shown the three ways it gets seen: the artwork with the
// photo's footprint marked, a desktop profile, and the phone app. Every preview
// is the same 1584×396 canvas scaled down, and the download is that canvas
// exported by scripts/export-linkedin-banners.mjs.

const prototype = findPrototype('linkedin-banner')!;

// The profile text under the banner, as it would read on LinkedIn.
const PROFILE = {
  name: 'Zev Uhuru',
  headline: 'Marketing engineer · I build AI marketing systems and teach it in The Marketing Engineer · clip.art, SEOPage, Esy',
};

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `LinkedIn banner ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

/** A generic profile card: banner, photo over its bottom-left, name and headline. */
function ProfileCard({ variant, size }: { variant: BannerVariant; size: 'desk' | 'phone' }) {
  return (
    <div className={`bp-profile bp-profile--${size}`}>
      <ScaledBanner>
        <LinkedInBanner variant={variant} />
      </ScaledBanner>
      {/* The circle clips the photo: globals.css zooms every portrait of Zev to crop it. */}
      <div className="bp-avatar">
        {/* eslint-disable-next-line @next/next/no-img-element -- small static avatar */}
        <img src="/images/og/zev-uhuru-360.jpg" alt="" width={360} height={360} />
      </div>
      <div className="bp-profile-text">
        <b>{PROFILE.name}</b>
        <span>{PROFILE.headline}</span>
      </div>
    </div>
  );
}

export default async function LinkedInBannerPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  const known = BANNER_VARIANTS.find((b) => b === variant);
  if (!v || !known) notFound();
  const png = `/prototypes/linkedin-banner/${v.slug}.png`;

  return (
    <div className="proto">
      <LightHeader />
      <main className="og-page pi-wrap">
        <header className="og-head">
          <p className="pi-kicker">
            LinkedIn banner {v.key} · {v.name}
          </p>
          <h1>{v.title}</h1>
          <p className="og-blurb">{v.blurb}</p>
        </header>

        {/* ── The artwork, with where the photo lands ─────────────────── */}
        <section className="og-block" aria-labelledby="bp-full">
          <h2 id="bp-full">The banner</h2>
          <ScaledBanner safeZone className="bp-full">
            <LinkedInBanner variant={known} />
          </ScaledBanner>
          <p className="og-note">
            1584 × 396, LinkedIn&apos;s upload size. The circles mark roughly where your profile photo covers it on desktop and in
            the phone app. <a className="pi-inline" href={png} download={`esy-linkedin-banner-${v.slug}.png`}>Download the PNG</a>.
          </p>
        </section>

        <div className="bp-grid">
          {/* ── Desktop profile ─────────────────────────────────────────── */}
          <section className="og-block" aria-labelledby="bp-desk">
            <h2 id="bp-desk">On your profile</h2>
            <ProfileCard variant={known} size="desk" />
            <p className="og-note">Approximate. LinkedIn draws its own frame and buttons.</p>
          </section>

          {/* ── Phone app ───────────────────────────────────────────────── */}
          <section className="og-block" aria-labelledby="bp-phone">
            <h2 id="bp-phone">In the app</h2>
            <ProfileCard variant={known} size="phone" />
            <p className="og-note">At phone width the banner is about 100px tall. Only the biggest words survive.</p>
          </section>
        </div>
      </main>
      <PrototypeBar prototype={prototype} current={v.slug} />
    </div>
  );
}
