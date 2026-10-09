'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MailCheck } from 'lucide-react';
import { EsyLoader } from '@/components/EsyLoader';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';

/* The header's button (2026-10-09): another way to subscribe, on every page
   with the light header. It replaced "App" (os.esy.com), and reads as an action,
   "Start Email Course": the same promise as every signup (the free email
   course, then the weekly issue), and "email" so nobody expects one of the
   video courses at /courses. Like the homepage
   hero's signup, it starts as a button and turns into the email box in place
   when clicked, focused; Escape (with the box empty) turns it back. It posts
   to the same signup as every form, recorded against the page it was made on,
   and sized for the header: one line, a short "check your inbox" once sent,
   and any error just under it. */
export default function HeaderSubscribe() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { subscribe, status, errorMessage, reset, honeypotProps } = useNewsletterSubscribe();

  // Opening puts the cursor in the box, so the click is followed straight by typing.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (status === 'success') {
    return (
      <p className="lh-sub-done" role="status">
        <MailCheck size={16} aria-hidden="true" /> Check your inbox to confirm
      </p>
    );
  }

  if (!open) {
    return (
      <button type="button" className="lh-cta" onClick={() => setOpen(true)}>
        Start Email Course
      </button>
    );
  }

  const isLoading = status === 'loading';
  return (
    <form
      className="lh-sub-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        subscribe(inputRef.current?.value || '');
      }}
    >
      {/* Bot trap: off-screen, never focusable, never filled by a human. */}
      <input {...honeypotProps} />
      <input
        ref={inputRef}
        className="lh-sub-input"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        aria-label="Email address for The Marketing Engineer"
        disabled={isLoading}
        onChange={() => status === 'error' && reset()}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && !inputRef.current?.value) setOpen(false);
        }}
      />
      <button type="submit" className="lh-sub-btn" disabled={isLoading} aria-label="Start the email course">
        {isLoading ? <EsyLoader size={14} label="" /> : <ArrowRight size={16} aria-hidden="true" />}
      </button>
      {status === 'error' && errorMessage && (
        <p className="lh-sub-error" role="alert">{errorMessage}</p>
      )}
    </form>
  );
}
