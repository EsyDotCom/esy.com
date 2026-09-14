"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Play } from 'lucide-react';

import Logo from '@/components/Logo';
import { agenticVideos } from '@/data/agentic-videos';
import { LATEST_ARTICLES_HREF, articlePath } from '@/lib/article-path';
import { type NavArticle, toNavArticles } from '@/lib/nav-articles';

import './LightHeader.css';

/* The light site header. Pages that are light-first (the homepage, topics,
   articles, the waitlist) render this and the global navy bar stands down for
   them in ConditionalNavigation — the same way scrollytelling pages carry
   their own header.

   Sticky on white with a hairline; the wordmark is the brand mark itself:
   Black Ops One at weight 400 (the only cut — faux bold fills the stencil
   gaps), teal e, ink sy.

   Articles carries the publication's preview dropdown: the navy "window into
   the publication" the old navy nav had on Agentic (removed in #108, restored
   here). Its chrome and motion are the .nav-panel / .nav-agentic-* rules in
   globals.css; this file owns the hover behaviour and the content. */

// Fallback rows for pages that don't pass live articles (e.g. /waitlist): the
// static registry's newest three.
const REGISTRY_LATEST = toNavArticles(agenticVideos);

// Hover intent, same as the old nav: the open delay stops a pointer sweeping
// past from flashing the panel; the close delay lets it cross the gap into it.
const PANEL_OPEN_DELAY_MS = 150;
const PANEL_CLOSE_DELAY_MS = 250;

export default function LightHeader({
  latest = REGISTRY_LATEST,
}: {
  /** Newest articles for the Articles dropdown; server pages pass the live list. */
  latest?: NavArticle[];
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  // Never leave a timer firing into an unmounted header.
  useEffect(() => clearTimers, []);

  // Pointer opens wait out the hover-intent delay; keyboard focus is deliberate
  // and opens at once.
  const openPanel = (immediate = false) => {
    clearTimers();
    if (immediate || open) { setOpen(true); return; }
    openTimer.current = setTimeout(() => setOpen(true), PANEL_OPEN_DELAY_MS);
  };
  // Also cancels a pending open, so a pointer that leaves early opens nothing.
  const closePanel = (immediate = false) => {
    clearTimers();
    if (immediate) { setOpen(false); return; }
    closeTimer.current = setTimeout(() => setOpen(false), PANEL_CLOSE_DELAY_MS);
  };

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
              masthead. Topics lives in the footer's Learn column.
              The waitlist CTA it replaced, for reverting:
          <Link href="/waitlist/?src=header" className="lh-cta">Join the waitlist</Link>
          */}

          {/* ══ Articles, with the publication's preview dropdown ══
              The link still navigates; hovering (or focusing) opens the panel.
              Escape, a click, or focus leaving the subtree closes it. */}
          <div
            className="lh-menu"
            ref={menuRef}
            onMouseEnter={() => openPanel()}
            onMouseLeave={() => closePanel()}
            onKeyDown={(e) => { if (e.key === 'Escape') closePanel(true); }}
            onBlur={(e) => {
              if (!menuRef.current?.contains(e.relatedTarget as Node)) closePanel(true);
            }}
          >
            <Link
              href={LATEST_ARTICLES_HREF}
              className="lh-signin"
              aria-expanded={open}
              aria-haspopup="true"
              onFocus={() => openPanel(true)}
              onClick={() => closePanel(true)}
            >
              Articles
            </Link>

            <div
              className={`nav-panel nav-agentic-dropdown ${open ? 'open' : ''}`}
              aria-label="Latest from The Marketing Engineer"
            >
              {/* Left rail — what the publication is, and who writes it */}
              <div className="nav-agentic-rail">
                <span className="nav-agentic-eyebrow">The Marketing Engineer</span>
                <p className="nav-agentic-tagline">
                  Tutorials, guides, and news on AI, marketing, and engineering,
                  from the engineer running Esy in production.
                </p>
                <div className="nav-agentic-byline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/zev-uhuru.png" alt="" className="nav-agentic-avatar" />
                  <div className="nav-agentic-byline-text">
                    <span className="nav-agentic-byline-name">Zev Uhuru</span>
                    <span className="nav-agentic-byline-role">Agentic Engineer</span>
                  </div>
                </div>
                <Link
                  href="/topics/"
                  className="nav-agentic-rail-cta"
                  onClick={() => closePanel(true)}
                >
                  Browse topics
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>

              {/* Right — the newest articles with their thumbnails */}
              <div className="nav-agentic-episodes">
                <span className="nav-agentic-episodes-label">Latest articles</span>
                {latest.map((a, i) => (
                  <Link
                    key={a.slug}
                    href={articlePath(a.slug)}
                    className="nav-agentic-episode"
                    style={{ transitionDelay: open ? `${60 + i * 45}ms` : '0ms' }}
                    onClick={() => closePanel(true)}
                  >
                    <span className="nav-agentic-thumb">
                      {a.thumb && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={a.thumb} alt="" loading="lazy" />
                      )}
                      <span className="nav-agentic-thumb-play">
                        <Play size={11} fill="currentColor" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="nav-agentic-episode-body">
                      <span className="nav-agentic-episode-title">{a.title}</span>
                      <span className="nav-agentic-episode-meta">
                        <span className="nav-agentic-episode-cat">{a.categoryLabel}</span>
                        {a.minutes !== null && (
                          <>
                            <span className="nav-agentic-episode-dot" aria-hidden="true" />
                            <Clock size={11} aria-hidden="true" />
                            {a.minutes} min
                          </>
                        )}
                      </span>
                    </span>
                  </Link>
                ))}
                <Link
                  href={LATEST_ARTICLES_HREF}
                  className="nav-agentic-all"
                  onClick={() => closePanel(true)}
                >
                  All articles
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <Link href="/#subscribe" className="lh-cta">Subscribe</Link>
        </nav>
      </div>
    </header>
  );
}
