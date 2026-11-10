'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { EsyLoader } from '@/components/EsyLoader';

/* Unsubscribing takes a press of the button, not just opening the page: mail
   scanners open links to check them, and one must never unsubscribe anyone.
   Four screens: ask, done, a broken link, and a failure worth retrying. */

type State = 'ask' | 'working' | 'done' | 'invalid' | 'error';

export default function UnsubscribeClient() {
  const token = useSearchParams().get('token') || '';
  const [state, setState] = useState<State>(token ? 'ask' : 'invalid');

  const unsubscribe = async () => {
    setState('working');
    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      setState(res.ok ? 'done' : res.status === 400 ? 'invalid' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <>
        <h1 className="nl-title">You&apos;re unsubscribed.</h1>
        <p className="nc-body">You won&apos;t get The Marketing Engineer anymore. Changed your mind? You can sign up again any time.</p>
        <Link href="/" className="nc-link">
          Go to esy.com <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </>
    );
  }

  if (state === 'invalid') {
    return (
      <>
        <h1 className="nl-title">This link doesn&apos;t work.</h1>
        <p className="nc-body">It may have been cut short when it was copied. Open it again from the email, or reply to any issue and I&apos;ll take you off myself.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="nl-title">Unsubscribe from The Marketing Engineer?</h1>
      <p className="nc-body">You&apos;ll stop getting the weekly issue. Nothing else changes.</p>
      <button type="button" className="nc-btn" onClick={unsubscribe} disabled={state === 'working'}>
        {state === 'working' ? <EsyLoader size={16} label="" /> : <>Unsubscribe me <ArrowRight size={15} aria-hidden="true" /></>}
      </button>
      {state === 'error' && <p className="nc-note nc-note--error" role="alert">That didn&apos;t go through. Try again in a minute.</p>}
    </>
  );
}
