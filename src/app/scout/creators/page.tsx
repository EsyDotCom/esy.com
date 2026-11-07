import type { Metadata } from 'next';
import { CreatorsIndex } from '@/components/Scout/ScoutProfiles';
import { CREATOR_LIST } from '@/components/Scout/creatorData';
import { cormorant } from '@/components/SkillsHub/folio/font';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';

/* esy.com/scout/creators/ (2026-11-07): everyone on the Scout list, each linking to their page. */

const TITLE = `The Scout List: ${CREATOR_LIST.length} Creators and Their Game Plans`;
const DESCRIPTION = 'How top creators convert social traffic into digital product sales: where they post, where they send people, and what they sell, read from their own public pages.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: `${TITLE} | Esy`, description: DESCRIPTION, type: 'website', url: 'https://esy.com/scout/creators/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: `${TITLE} | Esy`, description: DESCRIPTION },
  alternates: { canonical: '/scout/creators/' },
};

export default function ScoutCreatorsPage() {
  return <div className={`folio ${cormorant.variable}`}><CreatorsIndex /></div>;
}
