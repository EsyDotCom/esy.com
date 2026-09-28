"use client";

/* Direction B's film header, "written in starlight": a full-screen night over the
 * Moon's silver path (the film's own shot, looping as two copies that crossfade
 * so it never jumps), a twinkling starfield with the odd shooting star, a title
 * that writes itself in gold the way the address does at 7.4, and a wax seal that
 * presses in. The scene leans a little with the pointer. Reduced motion shows the
 * still with no drift. */

import { useEffect, useRef, useState } from "react";

import { LETTER } from "@/data/films/the-letter-with-no-address";

const BASE = `/films/${LETTER.slug}`;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const FADE = 1.2; // seconds of crossfade between the two copies of the loop

export default function FilmHeroB() {
  const root = useRef<HTMLElement>(null);
  const sky = useRef<HTMLCanvasElement>(null);
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setStill(true); return; }
    const el = root.current, cv = sky.current, va = a.current, vb = b.current;
    if (!el || !cv || !va || !vb) return;

    // Loop by crossfading two copies of the same clip, slowed a little.
    let front = va, back = vb;
    for (const v of [va, vb]) v.playbackRate = 0.7;
    va.style.opacity = "1"; vb.style.opacity = "0";
    va.play().catch(() => setStill(true));
    let swapping = false;
    const tick = () => {
      if (!swapping && front.duration && front.currentTime > front.duration - FADE * 0.7) {
        swapping = true;
        back.currentTime = 0; back.playbackRate = 0.7;
        back.play().catch(() => {});
        back.style.opacity = "1"; front.style.opacity = "0";
        const old = front; front = back; back = old;
        window.setTimeout(() => { old.pause(); swapping = false; }, FADE * 1000);
      }
    };
    va.addEventListener("timeupdate", tick); vb.addEventListener("timeupdate", tick);

    // Starfield: twinkling points and an occasional shooting star.
    const ctx = cv.getContext("2d");
    let w = 0, h = 0, raf = 0, last = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { w = el.clientWidth; h = el.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx?.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const stars = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random() * 0.75, r: Math.random() * 1.3 + 0.3, p: Math.random() * Math.PI * 2, s: 0.6 + Math.random() * 1.6, gold: Math.random() < 0.18 }));
    let meteor: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (pausedRef.current || !ctx) return;
      const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a2 = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t / 1000 * s.s + s.p));
        ctx.fillStyle = s.gold ? `rgba(255,231,176,${a2})` : `rgba(255,255,255,${a2 * 0.85})`;
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!meteor && Math.random() < dt * 0.12) meteor = { x: Math.random() * w * 0.6 + w * 0.3, y: Math.random() * h * 0.25, vx: -520, vy: 230, life: 1 };
      if (meteor) {
        const m = meteor; m.x += m.vx * dt; m.y += m.vy * dt; m.life -= dt * 1.1;
        const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 0.18, m.y - m.vy * 0.18);
        g.addColorStop(0, `rgba(255,240,200,${Math.max(0, m.life)})`); g.addColorStop(1, "rgba(255,240,200,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 0.18, m.y - m.vy * 0.18); ctx.stroke();
        if (m.life <= 0) meteor = null;
      }
    };
    raf = requestAnimationFrame(draw);

    // A gentle lean toward the pointer.
    const lean = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--lx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
      el.style.setProperty("--ly", String(((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    el.addEventListener("pointermove", lean);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", lean);
      window.removeEventListener("resize", resize);
      va.removeEventListener("timeupdate", tick); vb.removeEventListener("timeupdate", tick);
    };
  }, []);

  const toggle = () => {
    const next = !paused; setPaused(next); pausedRef.current = next;
    for (const v of [a.current, b.current]) {
      if (!v) continue;
      if (next) v.pause(); else if (v.style.opacity === "1") v.play().catch(() => {});
    }
  };

  return (
    <section ref={root} className={`fb-imm${still ? " is-still" : ""}`} aria-label={LETTER.title}>
      <div className="fb-imm-scene" aria-hidden="true">
        {still ? (
          <img className="fb-imm-media" src={`${BASE}/d1-moon.webp`} alt="" />
        ) : (
          <>
            <video ref={a} className="fb-imm-media" src={`${BASE}/moon-path.mp4`} poster={`${BASE}/d1-moon.webp`} muted playsInline preload="auto" />
            <video ref={b} className="fb-imm-media" src={`${BASE}/moon-path.mp4`} muted playsInline preload="auto" />
          </>
        )}
        <span className="fb-imm-wash" />
      </div>
      <canvas ref={sky} className="fb-imm-sky" aria-hidden="true" />

      <div className="fb-imm-in">
        <p className="fb-series">A {LETTER.series} film</p>
        <h1 className="fb-imm-title">
          <span className="fb-imm-ink">{LETTER.title}</span>
          <span className="fb-imm-spark" aria-hidden="true" />
        </h1>
        <p className="fb-tagline">{LETTER.tagline}</p>
        <div className="fb-chips">
          <span className="fb-chip">{LETTER.runtime}</span>
          <span className="fb-chip">Ages {LETTER.ages}</span>
          <span className="fb-chip">{LETTER.shots} shots</span>
          <span className="fb-chip">Animatic</span>
        </div>
        <div className="fb-btns">
          <a className="fb-btn fb-btn--go" href={LETTER.animaticUrl} {...ext}>▶ Watch the animatic</a>
          <a className="fb-btn" href="#drawer">Open the drawer</a>
          {!still ? (
            <button type="button" className="fb-btn fb-imm-pause" onClick={toggle} aria-pressed={paused}>
              {paused ? "▶ Play the sky" : "❚❚ Pause the sky"}
            </button>
          ) : null}
        </div>
      </div>
      <span className="fb-imm-seal" aria-hidden="true">Starlight<br />Mail</span>
      <a className="fb-imm-cue" href="#fb-ch1">Open the letter ↓</a>
    </section>
  );
}
