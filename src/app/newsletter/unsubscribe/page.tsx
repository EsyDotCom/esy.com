import type { Metadata } from 'next';
import { Suspense } from 'react';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import UnsubscribeClient from './UnsubscribeClient';
import '@/components/NewsletterHome/NewsletterHome.css';
import '../confirm/confirm.css';

// esy.com/newsletter/unsubscribe (2026-11-03): where the unsubscribe link in
// Esy's own emails (the confirmation and the reminder) lands. Same card as
// the confirm page. Issues carry Resend's link instead, which shows the
// reader only The Marketing Engineer.

export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Unsubscribe from The Marketing Engineer.',
  // A one-person page with a private pass in its address: never in search.
  robots: { index: false, follow: false },
};

export default function NewsletterUnsubscribePage() {
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <main className="nc">
        <div className="nc-card">
          <p className="nl-kicker">The Marketing Engineer</p>
          {/* useSearchParams needs a Suspense boundary on a static page. */}
          <Suspense fallback={<h1 className="nl-title">Unsubscribe</h1>}>
            <UnsubscribeClient />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
