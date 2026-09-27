'use client';

/* One prototype in a phone-sized frame (390×844), for comparing phone layouts
 * side by side. The page loads in a same-origin iframe, so once it loads the
 * frame can: hide the prototype switcher and the cookie notice (they'd cover
 * the bottom of a tiny screen), and measure how far down the Subscribe button
 * sits, which is the number this comparison is about. */

import { useState } from 'react';

// Roughly what a phone shows before the first scroll once the browser's own
// bars take their share of an 844px iPhone screen.
const FIRST_SCREEN = 700;

export default function PhoneFrame({ src, label, note }: { src: string; label: string; note: string }) {
  const [buttonAt, setButtonAt] = useState<number | null>(null);

  const onLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const doc = e.currentTarget.contentDocument;
    if (!doc) return;
    // The switcher: plain CSS, it has a class.
    const style = doc.createElement('style');
    style.textContent = '.proto-bar { display: none !important; }';
    doc.head.appendChild(style);
    // The cookie notice has only inline styles, so find it by its words and
    // hide the fixed box around them.
    const hideCookieNotice = () => {
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.textContent?.includes('We respect your privacy')) continue;
        let el = n.parentElement;
        while (el && getComputedStyle(el).position !== 'fixed') el = el.parentElement;
        if (el) el.style.display = 'none';
      }
    };
    // Where the first Subscribe button's bottom edge lands, from the top of the page.
    const measure = () => {
      const btn = doc.querySelector('#subscribe button[type="submit"]');
      if (btn) setButtonAt(Math.round(btn.getBoundingClientRect().bottom + (doc.defaultView?.scrollY ?? 0)));
    };
    // The notice appears after a delay, and fonts can shift the layout, so keep
    // checking every 300ms for the first six seconds.
    let ticks = 0;
    const timer = window.setInterval(() => {
      hideCookieNotice();
      measure();
      ticks += 1;
      if (ticks >= 20) window.clearInterval(timer);
    }, 300);
  };

  const above = buttonAt !== null && buttonAt <= FIRST_SCREEN;
  return (
    <figure className="pf">
      <figcaption className="pf-head">
        <b>{label}</b>
        <span>{note}</span>
      </figcaption>
      <div className="pf-device">
        <iframe src={src} title={label} width={390} height={844} onLoad={onLoad} />
        {/* Where the first screen ends on a typical phone. */}
        <div className="pf-fold" style={{ top: FIRST_SCREEN }} aria-hidden="true">
          <span>first screen ends</span>
        </div>
      </div>
      <p className={`pf-verdict${buttonAt === null ? '' : above ? ' pf-verdict--ok' : ' pf-verdict--low'}`}>
        {buttonAt === null
          ? 'Measuring…'
          : above
            ? `Subscribe button ends at ${buttonAt}px: on the first screen.`
            : `Subscribe button ends at ${buttonAt}px: needs a scroll.`}
      </p>
      <a className="pf-open" href={src} target="_blank" rel="noopener noreferrer">
        Open full page
      </a>
    </figure>
  );
}
