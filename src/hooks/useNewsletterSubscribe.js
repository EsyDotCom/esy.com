"use client"

import { useState, useCallback, useRef } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A human needs at least this long to read the field, focus it and type an
// address. Anything faster is a script that filled and submitted in one pass.
const MIN_HUMAN_FILL_MS = 2500;

// Off-screen rather than display:none — hidden inputs are cheap for a bot to
// detect and skip, whereas a positioned-away field looks ordinary in the DOM.
/** @type {import('react').CSSProperties} */
const HONEYPOT_STYLE = {
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  opacity: 0,
  pointerEvents: 'none',
};

/**
 * Reusable hook for newsletter subscription.
 *
 * Carries three bot signals to the API alongside the address:
 *   - `hp`        honeypot field value; non-empty means an indiscriminate filler
 *   - `elapsedMs` time from form mount to submit; implausibly fast means a script
 *   - `source`    the real page path, since the API can no longer assume /engineer
 *
 * @param {Object} opts
 * @param {string} [opts.endpoint='/api/newsletter/subscribe'] - API endpoint to POST to
 * @param {number} [opts.errorResetMs=5000] - ms before auto-resetting error state
 *
 * Returns { subscribe, status, errorMessage, reset, honeypotProps }
 */
export function useNewsletterSubscribe({ endpoint = '/api/newsletter/subscribe', errorResetMs = 5000 } = {}) {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(null);
  const errorTimerRef = useRef(null);
  const honeypotRef = useRef(null);

  // Mount time is the clock start for the fill-speed check. useRef's initializer
  // runs once per mounted form, so remounts correctly restart the timer.
  const mountedAtRef = useRef(Date.now());

  const clearErrorTimer = () => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
  };

  const reset = useCallback(() => {
    clearErrorTimer();
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  const subscribe = useCallback(async (email) => {
    clearErrorTimer();

    if (!email || email.trim() === '') {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          hp: honeypotRef.current?.value || '',
          elapsedMs: Date.now() - mountedAtRef.current,
          source: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });

      let data = {};
      try {
        const text = await res.text();
        if (text) {
          data = JSON.parse(text);
        }
      } catch {
        if (!res.ok) {
          throw new Error('Subscription failed. Please try again.');
        }
      }

      if (!res.ok) {
        throw new Error(data.error || 'Subscription failed.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');

      if (errorResetMs > 0) {
        errorTimerRef.current = setTimeout(() => {
          setStatus((prev) => (prev === 'error' ? 'idle' : prev));
          setErrorMessage((prev) => prev ? null : prev);
        }, errorResetMs);
      }
    }
  }, [endpoint, errorResetMs]);

  // Spread onto a bare <input> inside each form. The name deliberately avoids
  // every autofill category (name, email, company, organization, address,
  // phone): password managers fill by name attribute and ignore
  // autoComplete="off", so a field called "company" would get populated for
  // real users and silently drop them. Indiscriminate bots fill every text
  // input regardless of its name, so nothing is lost by picking an inert one.
  // The data-* opt-outs cover 1Password and LastPass specifically.
  const honeypotProps = {
    ref: honeypotRef,
    type: 'text',
    name: 'contact_note',
    tabIndex: -1,
    autoComplete: 'off',
    'aria-hidden': true,
    'data-1p-ignore': true,
    'data-lpignore': 'true',
    'data-form-type': 'other',
    style: HONEYPOT_STYLE,
  };

  return { subscribe, status, errorMessage, reset, honeypotProps };
}
