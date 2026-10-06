import type { Metadata } from 'next';
import { FolioTake } from '@/components/SkillsHub/folio/FolioTakes';
import { cormorant } from '@/components/SkillsHub/folio/font';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/SkillsHub/folio/replay.css';
import '@/components/SkillsHub/folio/merges.css';
import '@/components/SkillsHub/folio/skills-folio.css';

// esy.com/skills (shipped 2026-10-06): prototype H · Chat from
// /prototypes/skills/h/ — the course beside the headline, a chat simulator
// that shows the actual work, the shelf, and the course band. No picker. The
// course card signs people up to The Marketing Engineer, marked as from skills
// (see /api/newsletter/subscribe). Brings its own Folio bar, so the global
// navigation skips /skills (ConditionalNavigation).

const TITLE = 'AI Marketing Skills — The Marketing Engineer';
const DESCRIPTION =
  'The skills our agency runs on, written down so your agent can use them too. Install one, then ask in plain words for the work. Works with Claude Code, Cursor, Codex and more.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/skills/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  alternates: { canonical: '/skills/' },
};

export default function SkillsPage() {
  return (
    <div className={cormorant.variable}>
      <FolioTake variant="h" />
    </div>
  );
}
