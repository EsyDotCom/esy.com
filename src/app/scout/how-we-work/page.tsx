import type { Metadata } from 'next';
import { ScoutMethodsTake } from '@/components/Scout/ScoutMethodsTakes';
import { cormorant } from '@/components/SkillsHub/folio/font';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

const TITLE = 'How Scout Works: Sources, Labels and Corrections';
const DESCRIPTION = 'How Esy’s Scout studies creators’ public marketing: where it comes from, how every line is labelled, what we never publish, and how to request a correction or removal.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: `${TITLE} | Esy`, description: DESCRIPTION, type: 'article', url: 'https://esy.com/scout/how-we-work/', siteName: 'Esy', locale: 'en_US' },
  alternates: { canonical: '/scout/how-we-work/' },
};

export default function ScoutHowWeWorkPage() {
  // M4 · Commitments + promises from /prototypes/scout-methods/ (Zev, 2026-11-07).
  return <div className={`folio ${cormorant.variable}`}><ScoutMethodsTake take="merge" /></div>;
}
