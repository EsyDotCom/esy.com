'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';

/* The /invite signup: the site's one list, open on first sight (people came
   here to sign up, so there's no button to click first), and the first name
   asked after. A description link can name its video (?v=clay-enrichment),
   which is sent as `video` so Resend can send that video's skills and
   prompts; the bare address said aloud in a video sends none. */
const NOTE = 'Free. The skills and prompts arrive by email, then The Marketing Engineer every week. Unsubscribe in one click.';

function WithVideo() {
  const video = useSearchParams().get('v');
  return <InviteForm extra={video ? { video } : undefined} />;
}

function InviteForm({ extra }: { extra?: Record<string, string> }) {
  return <NewsletterSignup tone="dark" askName cta="Invite me" note={NOTE} extra={extra} />;
}

// useSearchParams needs a Suspense boundary on a static page; the fallback is
// the same form without the video, so nothing shifts while it resolves.
export default function InviteSignup() {
  return (
    <Suspense fallback={<InviteForm />}>
      <WithVideo />
    </Suspense>
  );
}
