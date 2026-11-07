import { CookiesPage } from '@/components/Privacy/CookiesPage';

// esy.com/cookies, rewritten 2026-11-06 in /privacy's design. The text lives in
// src/components/Privacy/cookies.ts; update it and its date when what the site stores changes.
export const metadata = {
  title: 'Cookie Policy',
  description: 'What esy.com stores in your browser, why, for how long, and how to change your choice.',
  alternates: { canonical: 'https://esy.com/cookies/' },
};

export default function Cookies() {
  // The site's light header comes from ConditionalNavigation.
  return <CookiesPage />;
}
