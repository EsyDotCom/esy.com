"use client";

/* Direction A's film header, "curtain up": the film's own opening shot fills the
 * screen behind letterbox bars that open on load. The crane plays once at half
 * speed, lands on the Cloud Post Office under the title and holds there with a
 * slow push-in. Reduced motion shows the still. */

import { useEffect, useRef, useState } from "react";

import { LETTER } from "@/data/films/the-letter-with-no-address";

const BASE = `/films/${LETTER.slug}`;

export default function FilmHeroA() {
  const video = useRef<HTMLVideoElement>(null);
  const [landed, setLanded] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const v = video.current;
    if (reduce || !v) { setStill(true); return; }
    v.playbackRate = 0.5;
    v.play().catch(() => setStill(true));
  }, []);

  const replay = () => {
    const v = video.current; if (!v) return;
    setLanded(false); v.currentTime = 0; v.playbackRate = 0.5; v.play().catch(() => {});
  };

  return (
    <section className={`fa-imm${landed ? " is-landed" : ""}${still ? " is-still" : ""}`} aria-label={LETTER.title}>
      <div className="fa-imm-stage" aria-hidden="true">
        {still ? (
          <img className="fa-imm-media" src={`${BASE}/dawn-home.webp`} alt="" />
        ) : (
          <video
            ref={video}
            className="fa-imm-media"
            src={`${BASE}/opening-crane.mp4`}
            poster={`${BASE}/look-world.webp`}
            muted
            playsInline
            preload="auto"
            onEnded={() => setLanded(true)}
          />
        )}
        <span className="fa-imm-grain" />
        <span className="fa-imm-vignette" />
      </div>
      <span className="fa-imm-bar fa-imm-bar--top" aria-hidden="true" />
      <span className="fa-imm-bar fa-imm-bar--bottom" aria-hidden="true" />

      <div className="fa-imm-in">
        <p className="fa-imm-now"><span>Now showing</span> A {LETTER.series} film · ages {LETTER.ages}</p>
        <h1 className="fa-imm-title">
          The Letter With <i>No Address</i>
        </h1>
        <p className="fa-imm-log">{LETTER.logline}</p>
        <div className="fa-imm-meta">
          <span>{LETTER.runtime}</span>
          <span>{LETTER.shots} shots</span>
          <span>{LETTER.voices} voices</span>
          <span>now streaming</span>
          <span>made with Esy</span>
        </div>
        <div className="fa-btns">
          <a className="fa-btn fa-btn--go" href="#fr-now">▶ Watch the film</a>
          <a className="fa-btn" href="#package">The package · {LETTER.package.length} files</a>
          {!still ? (
            <button type="button" className="fa-btn fa-imm-replay" onClick={replay} disabled={!landed} aria-label="Replay the opening shot">
              ↺ Replay the opening
            </button>
          ) : null}
        </div>
      </div>
      <a className="fa-imm-cue" href="#fa-now">Scroll</a>
    </section>
  );
}
