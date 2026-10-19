'use client';

// The share prototype's pieces (2026-10-19): the icon row, copy link, the
// native share button, and Google's preferred-source badge. Shared by SH1–SH3.

import { useEffect, useState } from 'react';
import { AtSign, Check, Link2, Mail, Share2, X as Close } from 'lucide-react';
import { PREFERRED_SOURCE_URL, shareLinks, taggedUrl, type ShareNetwork, type ShareTarget } from './share';

/* ── Network marks: the networks' own logos, drawn small. Threads uses the
   @ glyph as in Zev's reference; email and link are generic icons. ── */
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

const MARK: Record<ShareNetwork, () => React.JSX.Element> = {
  x: XMark,
  linkedin: LinkedInMark,
  facebook: FacebookMark,
  threads: () => <AtSign size={18} aria-hidden="true" />,
  email: () => <Mail size={18} aria-hidden="true" />,
};

/** Copy the post's address; says "Copied" for two seconds. */
export function CopyLink({ url, compact = false }: { url: string; compact?: boolean }) {
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
    <button type="button" className={`nsh-icon${copied ? ' is-copied' : ''}`} onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} title={copied ? 'Copied' : 'Copy link'}>
      {copied ? <Check size={18} aria-hidden="true" /> : <Link2 size={18} aria-hidden="true" />}
      {!compact && <span className="nsh-copied" aria-live="polite">{copied ? 'Copied' : ''}</span>}
    </button>
  );
}

/** "Share" plus every network as an icon link, and copy link. */
export function ShareRow({ target, tag, only, label = true, vertical = false }: {
  target: ShareTarget;
  tag: string;
  /** A subset, for the compact row under the byline. */
  only?: ShareNetwork[];
  label?: boolean;
  vertical?: boolean;
}) {
  const url = taggedUrl(target.url, tag);
  const links = shareLinks({ url, title: target.title }).filter((l) => !only || only.includes(l.network));
  return (
    <div className={`nsh-row${vertical ? ' nsh-row--vertical' : ''}`} role="group" aria-label="Share this post">
      {label && <span className="nsh-label">Share</span>}
      {links.map((l) => {
        const Mark = MARK[l.network];
        return (
          <a key={l.network} className="nsh-icon" href={l.href} target={l.network === 'email' ? undefined : '_blank'} rel="noopener noreferrer" aria-label={l.label} title={l.label}>
            <Mark />
          </a>
        );
      })}
      <CopyLink url={url} compact={vertical} />
    </div>
  );
}

/**
 * Google's own "Add as a preferred source on Google" badge, unmodified, from
 * the official asset pack (light on light grounds, dark on navy). It links to
 * Google's preferences with esy.com filled in.
 */
export function PreferredSourceBadge({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const src = `/prototypes/news-share/google_preferred_source_badge_${theme}_en`;
  return (
    <a className="nsh-badge" href={PREFERRED_SOURCE_URL} target="_blank" rel="noopener noreferrer">
      {/* eslint-disable-next-line @next/next/no-img-element -- Google's official badge, served as-is */}
      <img src={`${src}.png`} srcSet={`${src}.png 1x, ${src}@2x.png 2x`} width={169} height={53} alt="Add as a preferred source on Google" />
    </a>
  );
}

/** The preferred-source invitation with one line of why. */
export function PreferredSourceCard({ tone = 'paper' }: { tone?: 'paper' | 'navy' }) {
  return (
    <aside className={`nsh-pref nsh-pref--${tone}`} aria-label="Follow AI Marketing News in Google">
      <div>
        <p className="nsh-pref-title">See our news first in Google</p>
        <p className="nsh-pref-line">Pick esy.com as a preferred source, and Google shows more AI Marketing News in Top Stories when you search.</p>
      </div>
      <PreferredSourceBadge theme={tone === 'navy' ? 'dark' : 'light'} />
    </aside>
  );
}

/** Phone: one Share button that opens the device's share sheet, or a menu where there isn't one. */
export function NativeShare({ target, tag }: { target: ShareTarget; tag: string }) {
  const [open, setOpen] = useState(false);
  const [canNative, setCanNative] = useState(false);
  useEffect(() => setCanNative(typeof navigator !== 'undefined' && typeof navigator.share === 'function'), []);
  const url = taggedUrl(target.url, tag);
  const share = async () => {
    if (canNative) {
      try {
        await navigator.share({ title: target.title, url });
      } catch {
        // Closing the sheet is not an error worth showing.
      }
      return;
    }
    setOpen((o) => !o);
  };
  return (
    <div className="nsh-native">
      <button type="button" className="nsh-native-btn" onClick={share} aria-expanded={canNative ? undefined : open}>
        <Share2 size={18} aria-hidden="true" /> Share
      </button>
      {open && (
        <div className="nsh-native-menu" role="dialog" aria-label="Share this post">
          <ShareRow target={target} tag={tag} label={false} />
          <button type="button" className="nsh-icon" onClick={() => setOpen(false)} aria-label="Close">
            <Close size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

const NUDGE_KEY = 'esy.news.preferredSourceNudge';

/** A one-time, dismissible nudge for /news. Remembered per browser. */
export function PreferredSourceNudge() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    try {
      setShown(window.localStorage.getItem(NUDGE_KEY) !== 'dismissed');
    } catch {
      setShown(true);
    }
  }, []);
  const dismiss = () => {
    setShown(false);
    try {
      window.localStorage.setItem(NUDGE_KEY, 'dismissed');
    } catch {
      // Private mode: it just shows again next time.
    }
  };
  if (!shown) return null;
  return (
    <div className="nsh-nudge" role="region" aria-label="Follow AI Marketing News in Google">
      <p>
        <b>Read us in Google?</b> Add esy.com as a preferred source and Top Stories shows more of our news.
      </p>
      <PreferredSourceBadge />
      <button type="button" className="nsh-icon" onClick={dismiss} aria-label="Not now">
        <Close size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * SH4's rail stops before the article's end (Zev, 2026-10-19: "the rail should
 * stop some distance prior to the footer"). The rail is sticky until its
 * bottom would come within `gap` px of the footer share bar; then it rests in
 * place, `gap` px above the bar, and scrolls away with the page. An
 * IntersectionObserver watches the bar against a band at the top of the
 * window as tall as the rail's stop line, so there's no scroll listener.
 * It's rebuilt on resize, because the line depends on the window's height.
 */
export function RailStop({ children, bar, gap = 56, top = 140 }: { children: React.ReactNode; bar: string; gap?: number; top?: number }) {
  const [rest, setRest] = useState<number | null>(null);
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(bar);
    const article = el?.closest<HTMLElement>('.np');
    const rail = el?.firstElementChild as HTMLElement | null;
    if (!footer || !article || !rail) return;
    let io: IntersectionObserver | null = null;
    const build = () => {
      io?.disconnect();
      const railH = rail.getBoundingClientRect().height;
      const line = top + railH + gap; // px from the window's top where the bar meets the rail's stop
      const below = Math.max(0, window.innerHeight - line);
      io = new IntersectionObserver(
        ([entry]) => {
          const barTop = entry.boundingClientRect.top;
          if (barTop <= line) {
            // Rest the rail gap px above the bar, in the article's coordinates.
            const restTop = barTop - article.getBoundingClientRect().top - railH - gap;
            setRest(Math.max(0, restTop));
          } else {
            setRest(null);
          }
        },
        { rootMargin: `0px 0px -${below}px 0px`, threshold: [0, 1] },
      );
      io.observe(footer);
    };
    build();
    window.addEventListener('resize', build);
    return () => {
      io?.disconnect();
      window.removeEventListener('resize', build);
    };
  }, [el, bar, gap, top]);
  return (
    <div ref={setEl} className={`nsh-railstop${rest !== null ? ' is-resting' : ''}`} style={rest !== null ? ({ '--nsh-rest-top': `${rest}px` } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
