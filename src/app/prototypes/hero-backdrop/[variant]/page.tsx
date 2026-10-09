import { notFound } from 'next/navigation';
import NewsletterHomePage from '@/components/NewsletterHome/NewsletterHomePage';
import { PROMISES, PromiseStudio, resolveDesks } from '@/components/EducationHero';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { getAllAgenticArticles } from '@/lib/published-articles';
import { HERO_SHOTS } from '@/components/EducationHero/heroLoops';

// The real homepage with a photoreal background loop in place of Zev's
// portrait (2026-10-09). Everything else matches src/app/page.js. The shots
// are made through api.esy.com by scripts/generate-hero-loops.mjs.

const prototype = findPrototype('hero-backdrop')!;

// Round 2: the portrait stays, in front of a softened shot (take → shot).
const WITH_FACE: Record<string, string> = { 'desk-portrait': 'desk', 'studio-portrait': 'studio',
  // Round 3: B6's feel, every one with the portrait in front.
  'desk-night': 'desk-night', 'desk-highrise': 'desk-highrise', 'desk-loft': 'desk-loft', 'city-nyc': 'city-nyc', 'city-miami': 'city-miami',
  // Round 4: B6's desk with the words centred and a smaller portrait under them.
  'centered-left': 'desk', 'centered-right': 'desk',
  // ...and on the live hero's plain navy, no shot behind.
  'plain-left': 'desk', 'plain-right': 'desk',
  // B13 with Zev's untouched headshot.
  'original-left': 'desk' };
// Round 5: B9's high floor, the skyline open, Zev's photo small on the left.
const SMALL_LEFT: Record<string, { byline: 'top' | 'button' | 'foot'; faceSize: number; photo: string; solidCopy?: boolean; socials?: 'pop' | 'profile' | 'zoom' }> = {
  'highrise-top': { byline: 'top', faceSize: 64, photo: '/images/zev-uhuru-smirk-glasses-navy-a.png' },
  'highrise-button': { byline: 'button', faceSize: 64, photo: '/images/zev-uhuru-smirk-glasses-navy-a.png' },
  'highrise-foot': { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru-smirk-glasses-navy-a.png' },
  // ...and the same three on B10's loft.
  'loft-top': { byline: 'top', faceSize: 64, photo: '/images/zev-uhuru-smirk-glasses-navy-a.png' },
  'loft-button': { byline: 'button', faceSize: 64, photo: '/images/zev-uhuru-smirk-glasses-navy-a.png' },
  'loft-foot': { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru-smirk-glasses-navy-a.png' },
  // B26 with the copy side nearly solid navy.
  'loft-foot-solid': { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru-smirk-glasses-navy-a.png', solidCopy: true },
  // B27 with Zev's untouched headshot.
  'loft-foot-original': { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru.png', solidCopy: true },
  // B28 with his socials behind the photo: hover (or tap) for a close-up and links.
  'socials-pop': { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru.png', solidCopy: true, socials: 'pop' },
  'socials-profile': { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru.png', solidCopy: true, socials: 'profile' },
  'socials-zoom': { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru.png', solidCopy: true, socials: 'zoom' },
  // B23's high floor with everything B28–B30 settled: the original photo,
  // the near-solid copy side, and the profile card on hover.
  'highrise-profile': { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru.png', solidCopy: true, socials: 'profile' },
  // Rounds 7–8: B32's layout over an open office, a data center, or people at work.
  ...Object.fromEntries(['office-night', 'office-lights', 'datacenter-dusk', 'datacenter-aerial', 'dev-window', 'dev-output', 'team-floor', 'team-desk',
    'zev-dc-aisle', 'zev-dc-catwalk', 'zev-dc-glass', 'zev-agency-close', 'zev-agency-desk'].map((id) => [
    `b32-${id}`, { byline: 'foot' as const, faceSize: 56, photo: '/images/zev-uhuru.png', solidCopy: true, socials: 'profile' as const },
  ])),
};
const SHOT_OF: Record<string, string> = {
  'highrise-top': 'desk-highrise', 'highrise-button': 'desk-highrise', 'highrise-foot': 'desk-highrise',
  'loft-top': 'desk-loft', 'loft-button': 'desk-loft', 'loft-foot': 'desk-loft', 'loft-foot-solid': 'desk-loft', 'loft-foot-original': 'desk-loft',
  'socials-pop': 'desk-loft', 'socials-profile': 'desk-loft', 'socials-zoom': 'desk-loft',
  'highrise-profile': 'desk-highrise',
  // B33 was redone in round 8 with analytics dashboards on its screens; the first cut stays as 'office-night'.
  'b32-office-night': 'office-dashboards', 'b32-office-lights': 'office-lights', 'b32-datacenter-dusk': 'datacenter-dusk', 'b32-datacenter-aerial': 'datacenter-aerial',
  // B37 and B38 were redone as Zev himself (rounds 9–10, from his reference sheet); their first cuts stay as 'dev-window' and 'dev-output'.
  'b32-dev-window': 'zev-desk-a', 'b32-dev-output': 'zev-output', 'b32-team-floor': 'team-floor', 'b32-team-desk': 'team-desk',
  // Round 11: Zev walking a data center, and Esy's real Search page on his screen.
  'b32-zev-dc-aisle': 'zev-dc-aisle', 'b32-zev-dc-catwalk': 'zev-dc-catwalk', 'b32-zev-dc-glass': 'zev-dc-glass',
  // B44 was re-shot over his left shoulder (the first close-up put the screen under the copy); that cut stays as 'zev-agency-close'.
  'b32-zev-agency-close': 'zev-agency-shoulder',
};
const CENTERED: Record<string, 'left' | 'right'> = { 'centered-left': 'left', 'centered-right': 'right', 'plain-left': 'left', 'plain-right': 'right', 'original-left': 'left' };

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Hero backdrop ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function HeroBackdropPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const shot = WITH_FACE[variant] ?? SHOT_OF[variant] ?? variant;
  if (!HERO_SHOTS[shot]) notFound();
  const articles = await getAllAgenticArticles();
  const backdrop = { ...HERO_SHOTS[shot], portrait: !!WITH_FACE[variant],
    // The portrait takes use photo A (2026-10-09): Smirk 1 (one edit of Zev's
    // headshot on api.esy.com), then one more edit adding rimless silver glasses
    // and a deep navy studio backdrop with the mouth untouched. Two edits at most:
    // every edit redraws the whole photo, and stacking four roughened the skin.
    // zev-uhuru-glasses-before-lip-touchup.png is kept for reference. PNG, not
    // WebP: the dev image optimizer stalls converting the WebP edits.
    photo: !WITH_FACE[variant] ? undefined : variant === 'original-left' ? '/images/zev-uhuru.png' : '/images/zev-uhuru-smirk-glasses-navy-a.png',
    centered: CENTERED[variant], plain: variant.startsWith('plain-'),
    ...SMALL_LEFT[variant] };

  return (
    <>
      <NewsletterHomePage
        compose={{ mark: 'stencil', band: 'replay' }}
        appsLayout="tour"
        newsColumn
        hero={<PromiseStudio promise={PROMISES.engineering} desks={resolveDesks(articles)} backdrop={backdrop} />}
      />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
