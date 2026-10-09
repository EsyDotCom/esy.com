import type { Metadata } from 'next';
import { Suspense } from 'react';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import ConfirmClient from './ConfirmClient';
import '@/components/NewsletterHome/NewsletterHome.css';
import './confirm.css';

// esy.com/newsletter/confirm (2026-10-09): where the confirmation email's
// button lands. The page confirms from the browser (ConfirmClient), not on the
// server, so mail scanners that pre-open links can't confirm for the reader.

export const metadata: Metadata = {
  title: 'Confirm your email',
  description: 'Confirm your email for The Marketing Engineer.',
  // A one-person page with a private pass in its address: never in search.
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmPage() {
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <main className="nc">
        <div className="nc-card">
          <p className="nl-kicker">The Marketing Engineer</p>
          {/* useSearchParams needs a Suspense boundary on a static page. */}
          <Suspense fallback={<h1 className="nl-title">Confirming your email…</h1>}>
            <ConfirmClient />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
