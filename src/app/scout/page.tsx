import type { Metadata } from 'next';
import { ScoutLanding } from '@/components/Scout/ScoutLanding';
import { cormorant } from '@/components/SkillsHub/folio/font';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

// esy.com/scout (2026-11-07): Scout's public page, the free directory of funnel maps. S5 "Map, night"
// from the scout.esy.com repo's prototypes, picked by Zev for Marcus. Folio's look, as on /skills, and
// its own bar, so the global navigation skips /scout (ConditionalNavigation). Signups go to The
// Marketing Engineer, marked as from /scout (src/lib/newsletter/attribution.js).

const TITLE = 'Scout: Funnel Maps of AI Companies and Creators';
const DESCRIPTION =
  'How n8n, Gamma, Clay and the creators marketing engineers learn from get their customers: where people find them, where they land, what they pay for, and the one move that makes it work. Every line says how we know it.';

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
      <ScoutLanding />
    </div>
  );
}
