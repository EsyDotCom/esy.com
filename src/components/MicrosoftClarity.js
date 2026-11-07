'use client';

import { useEffect } from 'react';
import { hasAnalyticsConsent } from '@/lib/cookieConsent';

const CLARITY_PROJECT_ID = 'ulfblwfzmy';

/* Microsoft Clarity records how pages are used (clicks, scrolls), so it is analytics and waits for
   consent, like Google Analytics (2026-11-06, with the rewritten privacy policy). It loads only once
   the visitor has allowed analytics cookies: on page load if they already have, or the moment they
   accept in the cookie notice (which fires `cookie-consent-updated`). Production only, as before. */
function loadClarity() {
  if (window.clarity) return; // already loaded on this page
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
}

export default function MicrosoftClarity() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (hasAnalyticsConsent()) loadClarity();
    const onConsent = (e) => { if (e?.detail?.analytics) loadClarity(); };
    window.addEventListener('cookie-consent-updated', onConsent);
    return () => window.removeEventListener('cookie-consent-updated', onConsent);
  }, []);
  return null;
}
