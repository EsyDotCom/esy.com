"use client";

/* The /films index, "Title Sequence" (direction 6 of the index prototypes).
 * The page opens like a film's titles: FILMS fills the screen with the featured
 * film's world inside the letters, and scrolling flies through the lettering
 * into the film itself. Every other film gets a full-screen chapter with its
 * genre set huge, then the ten stages, the list of every film, and "Fin."
 * Nothing in the frame assumes a genre: each film brings its own. The site nav
 * and footer stand down here (ConditionalNavigation, ConditionalFooter). */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Logo from "@/components/Logo";
import { FILMS, filmHref } from "@/data/films";
import { FILM_STAGES } from "@/data/films/the-letter-with-no-address";

import FilmHeader from "./FilmHeader";
import { filmCond, filmMono } from "./fonts";
import { nlSerif } from "@/components/NewsletterHome/serif";
import "./films-a.css";
import "./films-index.css";

const LINKS = [
  { label: "The Marketing Engineer", href: "/newsletter/" },
  { label: "Topics", href: "/topics/" },
  { label: "Docs", href: "/docs/" },
  { label: "About", href: "/about/" },
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];
const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (x: number) => Math.min(1, Math.max(0, x));

export default function FilmsIndex() {
  const [featured, ...rest] = FILMS;
  const chapters = [
    { id: "ft-0", label: featured.title },
    ...rest.map((f, i) => ({ id: `ft-${i + 1}`, label: f.title })),
    { id: "ft-making", label: "How a film is made" },
  ];
  const zoom = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const full = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const cap = useRef<HTMLParagraphElement>(null);
  const all = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [showIndex, setShowIndex] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bigs = [...document.querySelectorAll<HTMLElement>(".ft-ch .ft-big")];
    const secs = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    let raf = 0;
    const tick = () => {
      const z = zoom.current!, r = z.getBoundingClientRect();
      const p = reduce ? 1 : clamp(-r.top / (r.height - window.innerHeight));
      const zp = clamp(p / 0.7);
      word.current!.style.transform = `scale(${1 + Math.pow(zp, 3) * 38})`;
      word.current!.style.opacity = String(1 - clamp((zp - 0.5) / 0.18));
      full.current!.style.opacity = String(clamp((zp - 0.42) / 0.22));
      cap.current!.style.opacity = String(1 - clamp(p / 0.1));
      const c = clamp((p - 0.7) / 0.2);
      card.current!.style.opacity = String(c);
      card.current!.style.transform = `translateY(${(1 - c) * 20}px)`;
      card.current!.style.visibility = c > 0.02 ? "visible" : "hidden";
      setShowIndex(r.top < 0 && all.current!.getBoundingClientRect().top > window.innerHeight * 0.5);
      let cur = 0;
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top < window.innerHeight * 0.5) cur = i; });
      setCurrent(cur);
      if (!reduce) bigs.forEach((b) => {
        const box = b.closest(".ft-ch")!.getBoundingClientRect();
        const q = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
        b.style.transform = `translateX(${q * 30 * Number(b.dataset.drift)}vw)`;
      });
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
    // chapters are derived from static data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`ft ${nlSerif.variable} ${filmCond.variable} ${filmMono.variable}`}>
      <FilmHeader tone="a" />

      <nav className={`ft-idx${showIndex ? " is-on" : ""}`} aria-label="Chapters">
        {chapters.map((c, i) => (
          <a key={c.id} href={`#${c.id}`} className={i === current ? "is-on" : undefined}>
            <span>{c.label}</span>{pad(i + 1)}<i />
          </a>
        ))}
      </nav>

      <section className="ft-zoom" id="ft-0" ref={zoom} aria-labelledby="ft-featured">
        <div className="ft-stick">
          <div className="ft-full" ref={full}>
            <img src={featured.still} alt={featured.stillAlt} fetchPriority="high" />
          </div>
          <div className="ft-word" ref={word} aria-hidden="true">
            <b style={{ backgroundImage: `url(${featured.still})` }}>Films</b>
          </div>
          <h1 className="ft-sr">Esy Films</h1>
          <p className="ft-cap" ref={cap}>Esy presents · films of every kind</p>
          <div className="ft-card" ref={card}>
            <div className="ft-in">
              <small>01 · Now showing · {featured.genre}</small>
              <h2 id="ft-featured">{featured.title}</h2>
              <p>{featured.logline}</p>
              <div className="ft-btns">
                <Link className="ft-btn ft-btn--go" href={`${filmHref(featured)}#fr-now`}>▶ Watch the film</Link>
                <span className="ft-btn">{featured.meta}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {rest.map((f, i) => (
        <section key={f.slug} className="ft-ch" id={`ft-${i + 1}`} aria-labelledby={`ft-t-${i + 1}`}>
          <div className="ft-bg" style={{ backgroundImage: `url(${f.still})` }} />
          <span className="ft-num" aria-hidden="true">{pad(i + 2)}</span>
          <div className="ft-in">
            <div className={`ft-big${i % 2 ? "" : " ft-big--o"}`} data-drift={i % 2 ? 1 : -1} aria-hidden="true">{f.genre}</div>
            <div className="ft-meta">
              <small>{pad(i + 2)} · {f.status}</small>
              <h2 id={`ft-t-${i + 1}`}>{f.title}</h2>
              <p>{f.logline}</p>
              <div className="ft-btns"><Link className="ft-btn ft-btn--go" href={filmHref(f)}>▶ Watch</Link><span className="ft-btn">{f.meta}</span></div>
            </div>
          </div>
        </section>
      ))}

      <section className="ft-ch ft-ch--making" id="ft-making" aria-labelledby="ft-making-h">
        <span className="ft-num" aria-hidden="true">{pad(chapters.length)}</span>
        <div className="ft-in">
          <div className="ft-big ft-big--o" data-drift={rest.length % 2 ? 1 : -1} aria-hidden="true">Ten stages</div>
          <div className="ft-meta">
            <small>How a film is made</small>
            <h2 id="ft-making-h">Every Esy film, whatever kind, runs through the same ten stages.</h2>
            <ol className="ft-stages">
              {FILM_STAGES.map((s, i) => <li key={s}><em>{pad(i + 1)}</em>{s}</li>)}
            </ol>
          </div>
        </div>
      </section>

      <div className="ft-in">
        <section className="ft-all" ref={all} aria-labelledby="ft-all-h">
          <h2 id="ft-all-h">Every film · {FILMS.length}</h2>
          {FILMS.map((f, i) => (
            <Link key={f.slug} className="ft-row" href={filmHref(f)}>
              <em>{pad(i + 1)}</em>
              <b style={{ backgroundImage: `url(${f.still})` }}>{f.title}</b>
              <span>{f.meta} · {f.status}</span>
            </Link>
          ))}
        </section>
      </div>

      <footer className="ft-fin">
        <div className="ft-fin-in">
          <p className="ft-fin-word">Fin.</p>
          <Link href="/" className="ft-mark" aria-label="Esy home">
            <Logo suffix="" href="" wordmarkOnly animatedE wordmarkFont="blackops" theme="dark" size={60} />
          </Link>
          <nav aria-label="Esy">
            {LINKS.map((l) => <Link key={l.label} href={l.href}>{l.label}</Link>)}
          </nav>
          <small>© 2024–2026 ESY, LLC · Films made with Esy</small>
        </div>
      </footer>
    </div>
  );
}
