import { PrivacyPage } from '@/components/Privacy/PrivacyTakes';

// esy.com/privacy: P1 "The short version" from /prototypes/privacy/ (picked by Zev, 2026-11-06).
// The text lives in src/components/Privacy/policy.ts; change it there and update its date.
export const metadata = {
  title: 'Privacy Policy',
  description: 'What Esy collects, why, who helps us, how long we keep it, and how to see, fix or delete it.',
  alternates: { canonical: 'https://esy.com/privacy/' },
};

export default function Privacy() {
  // The site's light header comes from ConditionalNavigation, as on most pages.
  return <PrivacyPage take="short" />;
}
