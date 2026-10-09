"use client";

/* Version B's page ending, below the Lost Letters drawer: one last letter,
 * addressed to the reader, opens on the desk, and the footer is a strip of
 * postage stamps under a Starlight Mail postmark. The esy.com site footer stands
 * down for this page (ConditionalFooter). */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Logo from "@/components/Logo";
import { LETTER } from "@/data/films/the-letter-with-no-address";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const IMG = (n: string) => `/films/${LETTER.slug}/${n}.webp`;
const HERO = LETTER.series.split(" ")[0];
const LINKS: { title: string; items: { label: string; href: string; external?: boolean }[] }[] = [
  { title: "Films", items: [{ label: "All films", href: "/prototypes/films/b-index/" }, { label: "Watch the animatic", href: LETTER.animaticUrl, external: true }, { label: "Read the storybook", href: LETTER.storybookUrl, external: true }] },
  { title: "Read", items: [{ label: "The Marketing Engineer", href: "/newsletter/" }, { label: "Topics", href: "/topics/" }, { label: "Docs", href: "/docs/" }] },
  { title: "Esy", items: [{ label: "About", href: "/about/" }, { label: "Privacy", href: "/privacy/" }, { label: "Terms", href: "/terms/" }, { label: "clip.art", href: "https://clip.art", external: true }] },
];

function EsyLogo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="fe-mark" aria-label="Esy home">
      <Logo suffix="" href="" wordmarkOnly animatedE wordmarkFont="blackops" theme={light ? "light" : "dark"} size={60} />
    </Link>
  );
}

function A({ href, external, children, className }: { href: string; external?: boolean; children: React.ReactNode; className?: string }) {
  return external ? <a className={className} href={href} {...ext}>{children}</a> : <Link className={className} href={href}>{children}</Link>;
}

/* Adds .is-in when the element scrolls into view (once). */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

/* ── 2 · The last letter ─────────────────────────────────── */
function LastLetter() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div className="fe-letter-wrap">
      <div ref={ref} className={`fe-wrap fe-letter-stage${inView ? " is-in" : ""}`}>
        <p className="fe-kick">One more, at the very back of the drawer</p>
        <h2 className="fe-h">A letter for you</h2>
        <div className="fe-env" aria-hidden="true"><span className="fe-env-flap" /><span className="fe-env-seal">★</span></div>
        <article className="fe-note">
          <p className="fe-note-to">To whoever is reading this,</p>
          <p>Thank you for staying up with us. Every letter here found its way home, and this one found you.</p>
          <p>If you&apos;d like to see the whole night again, the animatic is waiting. And if you know a little one who can&apos;t sleep, the storybook is on clip.art.</p>
          <p className="fe-note-sign">Stamp. Seal. Slot. Goodnight, reader.<br /><span>— {HERO}</span></p>
          <div className="fe-note-btns">
            <A className="fe-btn fe-btn--go" href={LETTER.animaticUrl} external>▶ Watch the animatic</A>
            <A className="fe-btn" href={LETTER.storybookUrl} external>Read the storybook</A>
          </div>
        </article>
      </div>
      <footer className="fe-stamps">
        <div className="fe-wrap">
          <div className="fe-postmark" aria-hidden="true"><span>STARLIGHT MAIL</span><b>DELIVERED</b><span>{new Date().getFullYear()}</span></div>
          <div className="fe-stamprow">
            {LINKS.flatMap((g) => g.items).map((l, i) => (
              <A key={l.label} className="fe-stamp" href={l.href} external={l.external}>
                <span className="fe-stamp-im" style={{ backgroundImage: `url(${IMG(["milo-stamp", "stars-bounce", "d1-moon", "lane-search", "drawer-glow", "pigeon-glow", "ottoline-perch", "moon-tender", "stars-still", "launch"][i % 10])})` }} />
                <span className="fe-stamp-l">{l.label}</span>
              </A>
            ))}
          </div>
          <div className="fe-copy fe-copy--ink"><EsyLogo light /><span>© 2024–2026 ESY, LLC · {LETTER.series} is a clip.art character</span></div>
        </div>
      </footer>
    </div>
  );
}

export default function FilmEndingsB() {
  return (
    <div className="fe">
      <LastLetter />
    </div>
  );
}
