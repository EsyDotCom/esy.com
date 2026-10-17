import type { Metadata } from 'next';
import Link from 'next/link';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import '@/components/NewsletterHome/NewsletterHome.css';
import './expired.css';

// Where a preview link that can't be opened lands (src/app/api/preview/route.ts):
// Esy answered 404 (no such link) or 410 (expired, turned off, or the piece
// was deleted), or couldn't be reached. Says which, and what to do.

export const metadata: Metadata = {
  title: 'Preview link',
  robots: { index: false, follow: false },
};

const MESSAGES: Record<string, { title: string; body: string }> = {
  expired: {
    title: 'This preview link has expired',
    body: 'It ran out or was turned off in Compose. Ask whoever sent it for a new one.',
  },
  unknown: {
    title: 'This preview link doesn’t exist',
    body: 'Check that you copied the whole link, or ask for a new one.',
  },
  missing: {
    title: 'This preview link is incomplete',
    body: 'The link is missing its key. Copy it again from Compose, or ask for a new one.',
  },
  unavailable: {
    title: 'We couldn’t open this preview',
    body: 'Esy didn’t answer just now. Try the link again in a minute.',
  },
};

export default async function PreviewExpiredPage({ searchParams }: { searchParams: Promise<{ reason?: string }> }) {
  const { reason } = await searchParams;
  const message = MESSAGES[reason ?? ''] ?? MESSAGES.expired;
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />
      <main className="pvx">
        <p className="pvx-kicker">Preview</p>
        <h1 className="pvx-title">{message.title}</h1>
        <p className="pvx-body">{message.body}</p>
        <Link className="pvx-home" href="/">Go to esy.com</Link>
      </main>
    </div>
  );
}
