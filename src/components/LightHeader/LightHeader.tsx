"use client";

import Link from 'next/link';

import Logo from '@/components/Logo';
import { LATEST_ARTICLES_HREF } from '@/lib/article-path';

import './LightHeader.css';

/* The light site header. Pages that are light-first (the homepage, The
   Marketing Engineer) render this and the global navy bar stands down for
   them in ConditionalNavigation — the same way scrollytelling pages carry
   their own header.

   Sticky on white with a hairline; the wordmark is the brand mark itself:
   Black Ops One at weight 400 (the only cut — faux bold fills the stencil
   gaps), teal e, ink sy. */
export default function LightHeader() {
  return (
    <header className="lh">
      <div className="lh-inner">
        <Link href="/" className="lh-wordmark" aria-label="Esy home">
          {/* The real Logo, not a flat span: `animatedE` renders the brand "e"
              as Black Ops One glyph pieces that play the synthesis motion on
              hover (.esy-wordmark:hover in globals.css). */}
          <Logo
            suffix=""
            href=""
            wordmarkOnly
            animatedE
            wordmarkFont="blackops"
            theme="light"
            size={60}
            priority
          />
        </Link>
        <nav className="lh-nav" aria-label="Primary">
          {/* Pre-launch the header carries exactly one action. Restore Sign in
              when the studio opens.
          <Link href="https://app.esy.com/signin" className="lh-signin">Sign in</Link>
          */}
          {/* Pre-launch: Make isn't open, so the dominant CTA is the waitlist.
              Restore the line below the day the studio opens.
          <Link href="https://app.esy.com" className="lh-cta">Start producing</Link>
          */}
          {/* The site is The Marketing Engineer first (2026-09-13): the header
              points at the latest articles and the signup on the homepage
              masthead.
              The waitlist CTA it replaced, for reverting:
          <Link href="/waitlist/?src=header" className="lh-cta">Join the waitlist</Link>
          */}
          <Link href="/topics/" className="lh-signin">Topics</Link>
          <Link href={LATEST_ARTICLES_HREF} className="lh-signin">Articles</Link>
          <Link href="/#subscribe" className="lh-cta">Subscribe</Link>
        </nav>
      </div>
    </header>
  );
}
