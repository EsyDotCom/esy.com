import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { EduStudio, resolveDesks } from '@/components/EducationHero';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import InviteSignup from './InviteSignup';
import '@/components/NewsletterHome/NewsletterHome.css';

// esy.com/invite (2026-10-09): where YouTube sends people to join The
// Marketing Engineer, YouTube being the newsletter's main source. It is
// the homepage's hero with the invite as its promise: the skills and prompts
// from every video, and first access to new courses and to Esy (2026-10-09:
// no code, and no community pitch; the newsletter is for education and for
// distributing the courses and os.esy.com). Signups are recorded with
// utm_campaign "youtube" (see /api/newsletter/subscribe), so the YouTube →
// email step can be measured and Resend can send that video's skills and
// prompts.

const TITLE = 'You’re invited: AI Marketing, from YouTube';
const DESCRIPTION =
  'The skills and prompts from every video, ready for your AI, and first access to new courses and to Esy. Free.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // A page for people sent here from a video, not one to rank: kept out of
  // search so it doesn't compete with the homepage for "AI marketing".
  robots: { index: false, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/invite/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  alternates: { canonical: '/invite/' },
};

// Same posture as the homepage: hourly backstop for the "Latest" line.
export const revalidate = 3600;

export default async function InvitePage() {
  const articles = await getAllAgenticArticles();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <EduStudio
        desks={resolveDesks(articles)}
        phone="profile"
        headline={<>You came from YouTube, so you&apos;re <em>invited</em>.</>}
        sub={
          <>
            Get the skills and prompts from every video, ready for your AI, and first access to new courses and to
            Esy, where the systems come already set up.
          </>
        }
        signup={<InviteSignup />}
        thirdApp="os"
        greeting={false}
        portrait="medium"
        systemsRow={false}
      />
    </div>
  );
}
