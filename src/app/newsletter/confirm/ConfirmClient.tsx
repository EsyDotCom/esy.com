'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { EsyLoader } from '@/components/EsyLoader';

/* The confirmation, run from the browser: it posts the pass from the link to
   /api/newsletter/confirm once the page has loaded. Five outcomes, one screen
   each: confirming, confirmed, expired (with a button for a fresh link), a
   broken link, and a failure worth retrying. */

type State = 'confirming' | 'confirmed' | 'expired' | 'invalid' | 'error';
type Resend = 'idle' | 'sending' | 'sent' | 'failed';

export default function ConfirmClient() {
  const token = useSearchParams().get('t') || '';
  const [state, setState] = useState<State>(token ? 'confirming' : 'invalid');
  const [resend, setResend] = useState<Resend>('idle');

  // Only the latest run of the effect may set the screen. React runs effects
  // twice in development, which posts twice; that's harmless, because a second
  // confirmation changes nothing and still answers 200.
  useEffect(() => {
    if (!token) return;
    let live = true;
    fetch('/api/newsletter/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!live) return;
        if (res.ok) setState('confirmed');
        else if (data.expired) setState('expired');
        else if (res.status === 400) setState('invalid');
        else setState('error');
      })
      .catch(() => live && setState('error'));
    return () => {
      live = false;
    };
  }, [token]);

  // An expired link can still ask for a fresh one: the old pass says where to send it.
  const sendNewLink = async () => {
    setResend('sending');
    try {
      const res = await fetch('/api/newsletter/confirm/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      setResend(res.ok ? 'sent' : 'failed');
    } catch {
      setResend('failed');
    }
  };

  if (state === 'confirming') {
    return (
      <>
        <h1 className="nl-title">Confirming your email…</h1>
        <p className="nc-body"><EsyLoader size={18} label="Confirming" /></p>
      </>
    );
  }

  if (state === 'confirmed') {
    return (
      <>
        <h1 className="nl-title">You&apos;re in.</h1>
        <p className="nc-body">
          The Marketing Engineer will arrive every week: the AI marketing systems I build, how they work, what they
          did, and the skills to run them yourself. Reply to any issue and it comes straight to me.
        </p>
        <p className="nc-sign">Zev</p>
        <Link href="/" className="nc-link">
          Read the latest on esy.com <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </>
    );
  }

  if (state === 'expired') {
    return (
      <>
        <h1 className="nl-title">This link has expired.</h1>
        <p className="nc-body">Confirmation links last 7 days. I can send you a fresh one.</p>
        {resend === 'sent' ? (
          <p className="nc-note" role="status">Sent. Check your inbox for a new link.</p>
        ) : (
          <button type="button" className="nc-btn" onClick={sendNewLink} disabled={resend === 'sending'}>
            {resend === 'sending' ? <EsyLoader size={16} label="" /> : <>Send me a new link <ArrowRight size={15} aria-hidden="true" /></>}
          </button>
        )}
        {resend === 'failed' && <p className="nc-note nc-note--error" role="alert">That didn&apos;t go through. Try again in a minute.</p>}
      </>
    );
  }

  if (state === 'invalid') {
    return (
      <>
        <h1 className="nl-title">This link doesn&apos;t work.</h1>
        <p className="nc-body">It may have been cut short when it was copied. Open it again from the email, or sign up again on esy.com.</p>
        <Link href="/" className="nc-link">
          Go to esy.com <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="nl-title">Something went wrong.</h1>
      <p className="nc-body">Your email isn&apos;t confirmed yet. Open the link from the email again in a minute.</p>
    </>
  );
}
