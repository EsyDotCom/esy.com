import { TermsPage } from '@/components/Privacy/TermsPage';

// esy.com/terms, rewritten 2026-11-06 in /privacy's design. The text lives in
// src/components/Privacy/terms.ts; update it and its date when the terms change.
export const metadata = {
  title: 'Terms of Service',
  description: 'The terms for using esy.com, The Marketing Engineer, Scout and the Esy apps, in plain words.',
  alternates: { canonical: 'https://esy.com/terms/' },
};

export default function Terms() {
  // The site's light header comes from ConditionalNavigation.
  return <TermsPage />;
}
