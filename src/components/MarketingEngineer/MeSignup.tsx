'use client';
/* The Marketing Engineer signup on /marketing-engineer (2026-11-07). Posts through the site's one
 * hook (useNewsletterSubscribe → /api/newsletter/subscribe, double opt-in through Resend), so the list
 * stays single. `form` names the box (e.g. 'me-hero'); on the prototype pages the API also records the
 * page path (/prototypes/marketing-engineer/…), so prototype signups are told apart from real ones.
 * After a yes it asks for a first name, once, since that costs no signups. */
import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, MailCheck } from 'lucide-react';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';
import { NEWSLETTER } from './content';

export function MeSignup({
  form,
  tone = 'light',
  cta = 'Get the newsletter',
  placeholder = 'you@company.com',
  fine = NEWSLETTER.fine,
}: {
  form: string;
  tone?: 'light' | 'dark';
  cta?: string;
  placeholder?: string;
  fine?: string | null;
}) {
  const email = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const { subscribe, status, errorMessage, honeypotProps, canSaveName, saveName, alreadySubscribed } = useNewsletterSubscribe({ form });
  const [named, setNamed] = useState<'idle' | 'saving' | 'done'>('idle');
  const [nameError, setNameError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    subscribe(email.current?.value || '');
  };

  // The optional first name, saved with the one-time token the signup returned.
  const onName = async (e: FormEvent) => {
    e.preventDefault();
    const v = name.current?.value.trim();
    if (!v) return;
    setNamed('saving');
    const err = await saveName(v);
    if (err) { setNameError(err); setNamed('idle'); } else setNamed('done');
  };

  if (status === 'success') {
    return (
      <div className={`me-signup is-${tone} is-done`} role="status">
        <p className="me-signup-done">
          <MailCheck size={18} aria-hidden="true" />
          {alreadySubscribed ? 'You’re already on the list. The next issue comes Friday.' : 'Check your inbox and confirm, and the next issue is yours.'}
        </p>
        {canSaveName && named !== 'done' && (
          <form className="me-signup-row" onSubmit={onName}>
            <label className="me-sr" htmlFor={`${form}-name`}>First name</label>
            <input id={`${form}-name`} ref={name} type="text" autoComplete="given-name" placeholder="What should I call you?" />
            <button type="submit" disabled={named === 'saving'}>Save</button>
          </form>
        )}
        {nameError && <p className="me-signup-error">{nameError}</p>}
        {named === 'done' && <p className="me-signup-fine">Thanks. See you Friday.</p>}
      </div>
    );
  }

  return (
    <div className={`me-signup is-${tone}`}>
      <form className="me-signup-row" onSubmit={onSubmit} noValidate>
        <label className="me-sr" htmlFor={`${form}-email`}>Email address</label>
        <input id={`${form}-email`} ref={email} type="email" autoComplete="email" inputMode="email" placeholder={placeholder} aria-invalid={status === 'error'} />
        <input {...honeypotProps} />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : cta}
          {status !== 'loading' && <ArrowRight size={16} aria-hidden="true" />}
        </button>
      </form>
      {status === 'error' && errorMessage ? <p className="me-signup-error" role="alert">{errorMessage}</p>
        : fine ? <p className="me-signup-fine">{fine}</p> : null}
    </div>
  );
}
