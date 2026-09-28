"use client";

/* Version A's film page below the hero, "The Final Reel": the page is the film's
 * last reel. A slate tracks the scene in view, the story runs on a film strip at
 * its timecodes, the cast are posters, the versions are countdown leader frames,
 * the files are film cans, and the footer is the end credits, rolling. The
 * esy.com site footer stands down for this page (ConditionalFooter). */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Logo from "@/components/Logo";
import { LETTER } from "@/data/films/the-letter-with-no-address";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const IMG = (n: string) => `/films/${LETTER.slug}/${n}.webp`;
const SCENES = [
  { id: "fr-now", code: "SC 01", name: "NOW SHOWING" },
  { id: "fr-story", code: "SC 02", name: "THE STORY" },
  { id: "fr-cast", code: "SC 03", name: "THE CAST" },
  { id: "fr-making", code: "SC 04", name: "THE MAKING" },
  { id: "fr-kit", code: "SC 05", name: "THE PRESS KIT" },
  { id: "fr-end", code: "END", name: "CREDITS" },
];
const CREDITS: [string, string][] = [
  ["A film by", "Esy"],
  ["Written by", "Screenplay draft B"],
  ["Starring", LETTER.series],
  ["", "Ottoline"],
  ["", "The Moon"],
  ["", "The Sleepy Stars"],
  ["Voices", "Six designed voices"],
  ["Frames", "Esy, from the clip.art pack"],
  ["Motion", "Seedance 2.5 · Kling O3 · OmniHuman 1.5"],
  ["Music", "Temp score from the storybook"],
  ["Mix", "−16 LUFS, checked line by line"],
  ["Made by", "Zev, with Claude and Esy"],
  ["Studio", "ESY LLC"],
];
const LINKS = [
  { label: "All films", href: "/films/v/a/" },
  { label: "Read the storybook", href: LETTER.storybookUrl, external: true },
  { label: "The Marketing Engineer", href: "/engineer/" },
  { label: "Topics", href: "/topics/" },
  { label: "Docs", href: "/docs/" },
  { label: "About", href: "/about/" },
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "clip.art", href: "https://clip.art", external: true },
];

export default function FilmReelA() {
  const [scene, setScene] = useState(SCENES[0]);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = SCENES.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) setScene(SCENES.find((s) => s.id === e.target.id) ?? SCENES[0]);
    }), { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="fr" ref={root}>
      <div className="fr-slate" aria-hidden="true"><div><b>{scene.code}</b><span>{scene.name}</span></div></div>

      <div className="fa-wrap">
        <section className="fr-sec" id="fr-now" aria-labelledby="fr-now-h">
          <h2 className="fr-h" id="fr-now-h"><small>Scene 01 · Now showing</small>The animatic</h2>
          <a className="fr-screen" href={LETTER.animaticUrl} {...ext} aria-label="Open the animatic player">
            <img src={IMG("animatic-player")} alt="The animatic player: the balloon beside the Moon, with a subtitle and the scene-coloured timeline" />
            <span className="fr-play"><i /></span>
          </a>
          <div className="fr-tc"><span>00:00:00:00</span><span>version {LETTER.version} · {LETTER.shots} shots · every line recorded</span><span>00:0{LETTER.runtime}:00</span></div>
        </section>

        <section className="fr-sec" id="fr-story" aria-labelledby="fr-story-h">
          <h2 className="fr-h" id="fr-story-h"><small>Scene 02 · The story</small>One night, from dusk to dawn</h2>
          <p className="fr-lede">Swipe the reel. Each frame is a still from the film, at its timecode.</p>
        </section>
      </div>
      <div className="fr-strip">
        <div className="fr-strip-row">
          {LETTER.chapters.map((c) => (
            <article key={c.title} className="fr-frame">
              <div className="fr-frame-im">
                <img src={IMG(c.image)} alt={c.alt} loading="lazy" />
                <span className="fr-frame-tc">{c.tc}</span>
                {c.line ? <span className="fr-frame-sub"><b>{c.speaker}</b>{c.line}</span> : null}
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="fa-wrap">
        <section className="fr-sec" id="fr-cast" aria-labelledby="fr-cast-h">
          <h2 className="fr-h" id="fr-cast-h"><small>Scene 03 · The cast</small>Who&apos;s in it</h2>
          <div className="fr-cast">
            {LETTER.cast.map((c) => (
              <div key={c.name} className="fr-poster" style={{ backgroundImage: `url(${IMG(c.image)})`, backgroundPosition: c.position, backgroundSize: c.zoom }} role="img" aria-label={`${c.name}: ${c.role}`}>
                <div><small>Starring</small><b>{c.name}</b><span>{c.role}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section className="fr-sec" id="fr-making" aria-labelledby="fr-making-h">
          <h2 className="fr-h" id="fr-making-h"><small>Scene 04 · The making</small>{LETTER.versions.length} cuts in one day</h2>
          <ol className="fr-leader">
            {LETTER.versions.map((v) => (
              <li key={v.v} className="fr-count"><div><b>{v.v}</b><span>{v.text}</span></div></li>
            ))}
          </ol>
        </section>

        <section className="fr-sec" id="fr-kit" aria-labelledby="fr-kit-h">
          <h2 className="fr-h" id="fr-kit-h"><small>Scene 05 · The press kit</small>Every file behind the film</h2>
          <div className="fr-kit">
            {LETTER.package.map((p) => {
              const body = (
                <>
                  <span className="fr-tin" style={{ backgroundImage: `url(${IMG(p.image)})` }} />
                  <span><small>{p.kind} · {p.updated}</small><b>{p.title}</b><span className="fr-kit-d">{p.description}{p.private ? " Private for now." : ""}</span></span>
                </>
              );
              return p.private
                ? <div key={p.title} className="fr-can fr-can--private">{body}</div>
                : <a key={p.title} className="fr-can" href={p.url} {...ext}>{body}</a>;
            })}
          </div>
        </section>
      </div>

      <footer className="fr-end" id="fr-end">
        <div className="fr-roll" aria-label="End credits">
          <div className="fr-roll-in">
            <dl className="fr-credits">
              {CREDITS.map(([role, name], i) => (
                <div key={i} className="fr-credit"><dt>{role}</dt><dd>{name}</dd></div>
              ))}
            </dl>
            <p className="fr-theend">The End</p>
          </div>
        </div>
        <div className="fr-endnav">
          <Link href="/" className="fr-mark" aria-label="Esy home">
            <Logo suffix="" href="" wordmarkOnly animatedE wordmarkFont="blackops" theme="dark" size={60} />
          </Link>
          <nav aria-label="Esy">
            {LINKS.map((l) => (l.external
              ? <a key={l.label} href={l.href} {...ext}>{l.label}</a>
              : <Link key={l.label} href={l.href}>{l.label}</Link>))}
          </nav>
        </div>
        <p className="fr-copy">© 2024–2026 ESY, LLC · Films made with Esy · {LETTER.series} is a clip.art character</p>
      </footer>
    </div>
  );
}
