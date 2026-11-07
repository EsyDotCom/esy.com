import type { Metadata } from 'next';
import { ScoutLanding } from '@/components/Scout/ScoutLanding';
import { cormorant } from '@/components/SkillsHub/folio/font';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

// esy.com/scout (2026-11-07): Scout's public page, the free directory of funnel maps. S5 "Map, night"
// from the scout.esy.com repo's prototypes, picked by Zev for Marcus. Folio's look, as on /skills, and
// its own bar, so the global navigation skips /scout (ConditionalNavigation). Signups go to The
// Marketing Engineer, marked as from /scout (src/lib/newsletter/attribution.js).

const TITLE = 'Scout: How Top Creators Convert Social Traffic into Digital Product Sales';
const DESCRIPTION =
  'Study the creators converting social traffic into digital product sales: where their traffic comes from, the free thing that catches it, and the courses, communities and software they sell. 35 game plans, read from their own public pages.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: `${TITLE} | Esy`, description: DESCRIPTION, type: 'website', url: 'https://esy.com/scout/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: `${TITLE} | Esy`, description: DESCRIPTION },
  alternates: { canonical: '/scout/' },
};

export default function ScoutPage() {
  return (
    <div className={`folio ${cormorant.variable}`}>
      {/* S11 · Lanes from /prototypes/scout-creators/ (Zev, 2026-11-07): the creators' game plans in
          the Scout shell, each funnel drawn as a row per platform; H1 · The list from
          /prototypes/scout-hero/ above it (centred, the signup below the wall of faces). */}
      <ScoutLanding creators="search" funnel="lanes" heroTake="list" />
    </div>
  );
}
