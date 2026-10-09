'use client';

/* Zev's signature photo with his socials behind it (2026-10-09,
 * /prototypes/hero-backdrop/ B29–B31). Hovering the photo, focusing it, or
 * tapping it on a phone opens a close-up of the photo with LinkedIn and
 * GitHub links:
 *   pop     — a small card above the head: the close-up, the name, two links
 *   profile — a wider card: the close-up beside the name, a proof line, two buttons
 *   zoom    — the photo itself grows into a big close-up, two round icons under it */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import { LINKEDIN_URL } from './shared';

export const GITHUB_URL = 'https://github.com/ZevUhuru';

export type SocialHover = 'pop' | 'profile' | 'zoom';

export default function SocialAvatar({ photo, style }: { photo: string; style: SocialHover }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  // Leaving the photo waits a beat before closing, so the pointer can travel
  // up into the card (an invisible bridge in CSS covers the gap too).
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const hideSoon = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(false), 220); };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  // A tap outside closes it on phones, where there's no hover to leave.
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  const links = (
    <span className="sa-links">
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="sa-link" aria-label="Zev Uhuru on LinkedIn">
        <Linkedin size={16} aria-hidden="true" /> <span className="sa-link-label">LinkedIn</span>
      </a>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="sa-link" aria-label="Zev Uhuru on GitHub">
        <Github size={16} aria-hidden="true" /> <span className="sa-link-label">GitHub</span>
      </a>
    </span>
  );

  return (
    <span
      ref={ref}
      className={`sa sa--${style}${open ? ' is-open' : ''}`}
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onFocus={show}
      onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      {/* The small photo is the trigger: a button, so it works by tap and keyboard. */}
      <button type="button" className="sa-trigger" aria-expanded={open} aria-label="Zev Uhuru: LinkedIn and GitHub" onClick={() => setOpen((o) => !o)}>
        <span className="eh-studio-byline-photo">
          <Image src={photo} alt="" width={160} height={160} />
        </span>
      </button>

      <span className="sa-card" role="group" aria-label="Zev Uhuru's profiles" aria-hidden={!open}>
        <span className="sa-closeup">
          <Image src={photo} alt="Zev Uhuru" width={480} height={480} loading="eager" />
        </span>
        {style !== 'zoom' && (
          <span className="sa-who">
            <b>Zev Uhuru</b>
            <span>Marketing engineer</span>
            {style === 'profile' && <span className="sa-proof">Built the systems behind clip.art’s 30,000+ pages.</span>}
          </span>
        )}
        {links}
      </span>
    </span>
  );
}
