'use client';

// Sharing an AI Marketing News post (SH4 · Footer + rail, picked 2026-10-19 on
// /prototypes/news-share/). After the article, a navy bar: Share (X, LinkedIn,
// Facebook, Threads, email, copy link) and Google's "Add as a preferred source"
// badge. From 1200px wide, a slim rail beside the column that follows the
// reader and comes to rest 56px above the bar. On tablets and phones, the bar
// only.
//
// Every share link is a plain URL to the network's own share page with the
// post's canonical address: no scripts, SDKs or trackers. The badge is Google's
// own asset, unmodified, linking to Google's source preferences for esy.com
// (Search Central, "Preferred sources"; preferences work per domain, so this is
// esy.com as a whole).

import { useEffect, useState } from 'react';
import { AtSign, Check, Link2, Mail } from 'lucide-react';
import './Share.css';

export const PREFERRED_SOURCE_URL = 'https://www.google.com/preferences/source?q=esy.com';

type Network = 'x' | 'linkedin' | 'facebook' | 'threads' | 'email';
type Target = { url: string; title: string };

const enc = encodeURIComponent;

/** Each network's own share page, in the order the bar shows them. */
function shareLinks({ url, title }: Target): { network: Network; label: string; href: string }[] {
  return [
    { network: 'x', label: 'Share on X', href: `https://x.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
    { network: 'linkedin', label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { network: 'facebook', label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { network: 'threads', label: 'Share on Threads', href: `https://www.threads.com/intent/post?text=${enc(`${title} ${url}`)}` },
    { network: 'email', label: 'Share by email', href: `mailto:?subject=${enc(title)}&body=${enc(`${title}\n\n${url}`)}` },
  ];
}

/* The networks' own marks, drawn small. Threads uses the @ glyph. */
function XMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452z" />
    </svg>
  );
}
function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M13.5 22v-8.2h2.75l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56h1.69V4.14A22.6 22.6 0 0 0 14.32 4c-2.44 0-4.12 1.49-4.12 4.23v2.37H7.44v3.2h2.76V22h3.3Z" />
    </svg>
  );
}
const MARK: Record<Network, () => React.JSX.Element> = {
  x: XMark,
  linkedin: LinkedInMark,
  facebook: FacebookMark,
  threads: () => <AtSign size={18} aria-hidden="true" />,
  email: () => <Mail size={18} aria-hidden="true" />,
};

/** Copy the post's address; says "Copied" for two seconds. */
function CopyLink({ url, compact }: { url: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link', url);
    }
  };
  return (
    <button type="button" className={`nws-icon${copied ? ' is-copied' : ''}`} onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} title={copied ? 'Copied' : 'Copy link'}>
      {copied ? <Check size={18} aria-hidden="true" /> : <Link2 size={18} aria-hidden="true" />}
      {!compact && <span className="nws-copied" aria-live="polite">{copied ? 'Copied' : ''}</span>}
    </button>
  );
}

function ShareRow({ target, vertical = false }: { target: Target; vertical?: boolean }) {
  return (
    <div className={`nws-row${vertical ? ' nws-row--vertical' : ''}`} role="group" aria-label="Share this post">
      {!vertical && <span className="nws-label">Share</span>}
      {shareLinks(target).map((l) => {
        const Mark = MARK[l.network];
        return (
          <a key={l.network} className="nws-icon" href={l.href} target={l.network === 'email' ? undefined : '_blank'} rel="noopener noreferrer" aria-label={l.label} title={l.label}>
            <Mark />
          </a>
        );
      })}
      <CopyLink url={target.url} compact={vertical} />
    </div>
  );
}

/** The bar after the article: Share on the left, Google's badge on the right. */
export function ShareBar({ url, title }: Target) {
  const src = '/images/news/google-preferred-source/google_preferred_source_badge_dark_en';
  return (
    <div className="nws-bar" data-share-bar>
      <ShareRow target={{ url, title }} />
      <a className="nws-badge" href={PREFERRED_SOURCE_URL} target="_blank" rel="noopener noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element -- Google's official badge, served as-is */}
        <img src={`${src}.png`} srcSet={`${src}.png 1x, ${src}@2x.png 2x`} width={169} height={53} alt="Add esy.com as a preferred source on Google" />
      </a>
    </div>
  );
}

/**
 * The rail beside the column (from 1200px). It's sticky until its bottom
 * would come within `gap` px of the share bar, then rests there and scrolls
 * away with the page. An IntersectionObserver watches the bar against a band
 * at the top of the window as tall as the rail's stop line (no scroll
 * listener), rebuilt on resize because the line depends on the window height.
 */
export function ShareRail({ url, title, gap = 56, top = 140 }: Target & { gap?: number; top?: number }) {
  const [rest, setRest] = useState<number | null>(null);
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!el) return;
    const article = el.closest<HTMLElement>('.np');
    const bar = article?.querySelector<HTMLElement>('[data-share-bar]');
    const rail = el.firstElementChild as HTMLElement | null;
    if (!article || !bar || !rail) return;
    let io: IntersectionObserver | null = null;
    const build = () => {
      io?.disconnect();
      const railH = rail.getBoundingClientRect().height;
      if (!railH) return; // hidden below 1200px
      const line = top + railH + gap;
      io = new IntersectionObserver(
        ([entry]) => {
          const barTop = entry.boundingClientRect.top;
          setRest(barTop <= line ? Math.max(0, barTop - article.getBoundingClientRect().top - railH - gap) : null);
        },
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - line)}px 0px`, threshold: [0, 1] },
      );
      io.observe(bar);
    };
    build();
    window.addEventListener('resize', build);
    return () => {
      io?.disconnect();
      window.removeEventListener('resize', build);
    };
  }, [el, gap, top]);
  return (
    <div ref={setEl} className={`nws-rail${rest !== null ? ' is-resting' : ''}`} style={rest !== null ? ({ '--nws-rest-top': `${rest}px` } as React.CSSProperties) : undefined}>
      <div className="nws-rail-box">
        <ShareRow target={{ url, title }} vertical />
      </div>
    </div>
  );
}
