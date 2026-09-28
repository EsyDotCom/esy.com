"use client";

/* The animatic, playable on the page. A port of the animatic artifact's player:
 * one WebAudio clock drives every recorded line, the music (dipped under each line
 * by the level the mix check set), the sound effects and the beds; two picture
 * layers cross with the transition the timeline chose; stills drift slowly; clips
 * are kept locked to the soundtrack. Media lives under MEDIA (timeline.json, f/,
 * v/, a/). The opening plays with the town music only (no cricket bed). */

import { useEffect, useRef, useState } from "react";

type Line = { at: number; dur: number; file: string; v: string; sub: string; gain?: number; duck?: number };
type Sfx = { at: number; file: string; gain: number; loop?: boolean; end?: number };
type Shot = { id: string; scene: string; what: string; frame: string; card?: boolean; clip?: string | null; start: number; dur: number; tx?: { type: string; dur: number }; pan?: string | null; lines: Line[]; sfx: Sfx[] };
type Timeline = { runtime: number; shots: Shot[]; music: { file: string; start: number; end: number }[]; mix?: { master: number } };

const WHO: Record<string, string> = { MILO: "Milo", OTTO: "Ottoline", MOON: "The Moon", TALL: "Tall Star", ROUND: "Round Star", TINY: "Tiny Star" };
const COLORS = ["#e9a64a", "#c9924a", "#f08a4b", "#e8c46a", "#9fb3df", "#5a6aa8", "#ffcf73", "#f3e4cc", "#d98f7c", "#b7a5d8", "#7fb5a8", "#e3b660"];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function AnimaticPlayer({ media, title, poster, cardLine }: { media: string; title: string; poster: string; cardLine: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const l0 = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLDivElement>(null);
  const subEl = useRef<HTMLDivElement>(null);
  const trackEl = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<Timeline | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [loadMsg, setLoadMsg] = useState("");
  const [time, setTime] = useState(0);
  const [badge, setBadge] = useState("");
  const api = useRef<{ play: () => void; pause: () => void; seek: (t: number) => void; toggle: () => void } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${media}/timeline.json`).then((r) => r.json()).then((d: Timeline) => { if (alive) setTl(d); }).catch(() => {});
    return () => { alive = false; };
  }, [media]);

  useEffect(() => {
    if (!tl) return;
    const TL = tl;
    const SPANS: { a: number; e: number; duck: number }[] = [];
    for (const l of TL.shots.flatMap((s) => s.lines).sort((a, b) => a.at - b.at)) {
      const last = SPANS[SPANS.length - 1];
      if (last && l.at - last.e < 1.0) { last.e = Math.max(last.e, l.at + l.dur); last.duck = Math.min(last.duck, l.duck ?? 0.13); }
      else SPANS.push({ a: l.at, e: l.at + l.dur, duck: l.duck ?? 0.13 });
    }
    const layers = [l0.current!, l1.current!];
    let ctx: AudioContext | null = null, MASTER: GainNode | null = null;
    const buffers: Record<string, AudioBuffer> = {};
    let playing = false, startCtx = 0, offset = 0, raf = 0, cur = -1, front = 0;
    let sources: AudioBufferSourceNode[] = [];
    const sfxOf = (s: Shot) => (s.id === "1.1" ? [] : s.sfx); // the opening: town music only
    const now = () => (playing && ctx ? ctx.currentTime - startCtx : offset);

    async function load() {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      MASTER = ctx.createGain(); MASTER.gain.value = TL.mix?.master ?? 1; MASTER.connect(ctx.destination);
      const files = new Set<string>();
      TL.shots.forEach((s) => { s.lines.forEach((l) => files.add(l.file)); sfxOf(s).forEach((x) => files.add(x.file)); });
      TL.music.forEach((m) => files.add(m.file));
      let n = 0;
      await Promise.all([...files].map(async (f) => {
        try { const r = await fetch(`${media}/a/${f}`); buffers[f] = await ctx!.decodeAudioData(await r.arrayBuffer()); } catch { /* a missing sound never blocks the film */ }
        setLoadMsg(`Loading sound… ${++n}/${files.size}`);
      }));
    }
    function src(file: string, when: number, from: number, gainVal: number, loop?: boolean, until?: number | null) {
      const b = buffers[file]; if (!b || !ctx || !MASTER) return null;
      const s = ctx.createBufferSource(); s.buffer = b; s.loop = !!loop;
      const g = ctx.createGain(); g.gain.value = gainVal; s.connect(g).connect(MASTER);
      const at = Math.max(ctx.currentTime, when);
      s.start(at, loop ? from % b.duration : Math.min(from, b.duration));
      if (until) s.stop(Math.max(at + 0.05, until));
      sources.push(s); return { s, g };
    }
    function schedule(pos: number) {
      if (!ctx) return;
      sources.forEach((s) => { try { s.stop(); } catch { /* already stopped */ } }); sources = [];
      const base = ctx.currentTime + 0.08 - pos; startCtx = base;
      for (const m of TL.music) {
        if (m.end <= pos) continue;
        const r = src(m.file, base + Math.max(m.start, pos), Math.max(0, pos - m.start), 0.3, false, base + m.end + 1.2);
        if (!r) continue;
        const g = r.g.gain; g.setValueAtTime(0.3, ctx.currentTime);
        const last = m === TL.music[TL.music.length - 1];
        const under = SPANS.find((sp) => m.start >= sp.a - 0.15 && m.start <= sp.e + 0.2);
        if (pos <= m.start) { g.setValueAtTime(0.0001, base + m.start); g.setTargetAtTime(under ? under.duck : 0.3, base + m.start, 0.35); }
        g.setTargetAtTime(0.0001, base + m.end - (last ? 3 : 0.2), last ? 0.9 : 0.5);
        for (const sp of SPANS) {
          if (sp.e < Math.max(pos, m.start) || sp.a > m.end) continue;
          g.setTargetAtTime(sp.duck, base + Math.max(sp.a - 0.15, pos), 0.08);
          g.setTargetAtTime(0.3, base + sp.e + 0.2, 0.35);
        }
      }
      for (const s of TL.shots) {
        for (const l of s.lines) if (l.at + l.dur > pos) src(l.file, base + Math.max(l.at, pos), Math.max(0, pos - l.at), l.gain ?? 1.0);
        for (const x of sfxOf(s)) {
          if (x.loop ? (x.end ?? 0) <= pos : x.at + 4 <= pos) continue;
          const r = src(x.file, base + Math.max(x.at, pos), Math.max(0, pos - x.at), x.gain, x.loop, x.loop ? base + (x.end ?? 0) + 0.3 : null);
          if (r && x.loop) r.g.gain.setTargetAtTime(0.0001, base + (x.end ?? 0) - 1.6, 0.4);
        }
      }
    }
    const shotAt = (t: number) => { const i = TL.shots.findIndex((s) => t < s.start + s.dur); return i < 0 ? TL.shots.length - 1 : i; };
    const runOf = (i: number) => {
      const same = (x: number, y: number) => !TL.shots[x].clip && !TL.shots[x].card && TL.shots[x].frame === TL.shots[y].frame;
      let a = i, b = i; while (a > 0 && same(a - 1, i)) a--; while (b < TL.shots.length - 1 && same(b + 1, i)) b++; return [a, b];
    };
    function show(i: number, instant?: boolean) {
      const s = TL.shots[i], prev = cur; cur = i;
      setBadge(`${s.id} · ${s.scene}`);
      if (prev >= 0 && runOf(i)[0] <= prev && prev < i) return;
      front ^= 1;
      const L = layers[front], O = layers[front ^ 1];
      L.replaceChildren();
      if (s.card) {
        const c = document.createElement("div"); c.className = "fp-card";
        const h = document.createElement("h3"); h.textContent = s.frame; const p = document.createElement("p"); p.textContent = cardLine;
        const wrap = document.createElement("div"); wrap.append(h, p); c.append(wrap); L.append(c);
      } else if (s.clip) {
        const v = document.createElement("video"); v.src = `${media}/v/${s.clip}.mp4`; v.muted = true; v.playsInline = true; v.preload = "auto"; v.poster = `${media}/f/${s.frame}.webp`; L.append(v);
        const fit = () => {
          const r = v.duration / s.dur; v.playbackRate = r < 1 && r >= 0.8 ? r : 1; v.dataset.rate = String(v.playbackRate);
          v.currentTime = Math.min(Math.max(0, (now() - s.start + (playing ? 0.12 : 0)) * v.playbackRate), v.duration - 0.05);
          if (playing) v.play().catch(() => {});
        };
        if (v.readyState >= 1) fit(); else v.addEventListener("loadedmetadata", fit, { once: true });
      } else {
        const img = document.createElement("img"); img.src = `${media}/f/${s.frame}.webp`; img.alt = s.what; L.append(img);
      }
      const tx = instant ? { type: "cut", dur: 0 } : s.tx || { type: "dissolve", dur: 0.25 };
      if (tx.type === "fade") { O.style.transition = "opacity 1s ease"; L.style.transition = "opacity 1s ease 1.4s"; }
      else if (tx.type === "cut") { O.style.transition = L.style.transition = "none"; }
      else { O.style.transition = L.style.transition = `opacity ${tx.dur}s ease`; }
      L.classList.add("on"); O.classList.remove("on");
    }
    function frame() {
      const t = Math.min(now(), TL.runtime);
      const i = shotAt(t); if (i !== cur) show(i);
      const s = TL.shots[i], [ra, rb] = runOf(i), r0 = TL.shots[ra].start, r1 = TL.shots[rb].start + TL.shots[rb].dur, p = (t - r0) / (r1 - r0);
      const el = layers[front].firstElementChild as HTMLElement | null;
      if (el instanceof HTMLVideoElement && playing && el.dataset.rate && !el.seeking) {
        const base = +el.dataset.rate, want = (t - s.start) * base;
        if (want < el.duration - 0.06) {
          const drift = want - el.currentTime;
          if (Math.abs(drift) > 0.3) el.currentTime = want;
          else { const k = Math.abs(drift) > 0.1 ? 0.15 : 0.08; el.playbackRate = base * (1 + Math.max(-k, Math.min(k, drift * 1.2))); }
        }
      }
      if (el instanceof HTMLImageElement) {
        const pan = TL.shots[ra].pan, dir = pan === "right" ? -1 : pan === "left" ? 1 : ra % 2 ? 1 : -1;
        el.style.transform = pan === "up" ? `scale(${1.04 + 0.05 * p}) translateY(${(p - 0.5) * 2.4}%)` : `scale(${1.02 + 0.06 * p}) translateX(${dir * (p - 0.5) * 1.6}%)`;
      }
      const line = s.lines.find((l) => t >= l.at && t < l.at + l.dur + 0.25);
      const sub = subEl.current;
      if (sub) {
        if (line) { sub.replaceChildren(); const b = document.createElement("b"); b.textContent = WHO[line.v] ?? line.v; sub.append(b, document.createTextNode(line.sub)); sub.classList.add("on"); }
        else sub.classList.remove("on");
      }
      setTime(t);
      if (t >= TL.runtime && playing) { pause(); offset = 0; }
      if (playing) raf = requestAnimationFrame(frame);
    }
    async function play() {
      if (!ctx) { setState("loading"); await load(); }
      if (ctx?.state === "suspended") await ctx.resume();
      schedule(offset); playing = true; setState("playing");
      const v = layers[front].querySelector("video"); if (v) v.play().catch(() => {});
      cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
    }
    function pause() {
      offset = now(); playing = false; setState("paused");
      sources.forEach((s) => { try { s.stop(); } catch { /* already stopped */ } }); sources = [];
      layers.forEach((l) => l.querySelectorAll("video").forEach((v) => v.pause()));
      cancelAnimationFrame(raf);
    }
    function seek(t: number) {
      offset = Math.max(0, Math.min(t, TL.runtime - 0.05)); cur = -1;
      if (playing && ctx) { schedule(offset); startCtx = ctx.currentTime + 0.08 - offset; } else { show(shotAt(offset), true); frame(); }
    }
    api.current = { play, pause, seek, toggle: () => (playing ? pause() : play()) };
    show(0, true); setTime(0);
    return () => {
      cancelAnimationFrame(raf);
      sources.forEach((s) => { try { s.stop(); } catch { /* already stopped */ } });
      ctx?.close().catch(() => {});
    };
  }, [tl, media, cardLine]);

  const scenes = tl ? [...new Set(tl.shots.map((s) => s.scene))] : [];
  const color = (scene: string) => COLORS[scenes.indexOf(scene) % COLORS.length];
  const runtime = tl?.runtime ?? 0;
  const onTrack = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect(); api.current?.seek(runtime * (e.clientX - r.left) / r.width);
  };

  return (
    <div className="fp">
      <div className="fp-stage" ref={stage}>
        <div className="fp-layer" ref={l0} />
        <div className="fp-layer" ref={l1} />
        {badge ? <span className="fp-badge">{badge}</span> : null}
        <div className="fp-sub" ref={subEl} aria-live="polite" />
        {state === "idle" || state === "loading" ? (
          <button type="button" className="fp-cover" onClick={() => api.current?.play()} disabled={!tl || state === "loading"} aria-label={`Play ${title} with sound`}>
            <img src={poster} alt="" />
            <span className="fp-cover-in"><i />{state === "loading" ? loadMsg || "Loading…" : `Play the animatic · ${fmt(runtime)} · sound on`}</span>
          </button>
        ) : null}
      </div>
      <div className="fp-bar">
        <button type="button" className={`fp-pp${state === "playing" ? " is-playing" : ""}`} onClick={() => api.current?.toggle()} disabled={!tl} aria-label={state === "playing" ? "Pause" : "Play"} />
        <span className="fp-time">{fmt(time)} / {fmt(runtime)}</span>
        <div className="fp-track" ref={trackEl} onClick={onTrack} role="slider" tabIndex={0} aria-label="Seek" aria-valuemin={0} aria-valuemax={Math.round(runtime)} aria-valuenow={Math.round(time)}
          onKeyDown={(e) => { if (e.key === "ArrowRight") api.current?.seek(time + 5); if (e.key === "ArrowLeft") api.current?.seek(time - 5); }}>
          {tl?.shots.map((s) => <span key={s.id} style={{ flex: s.dur, background: color(s.scene) }} title={`${s.id} · ${s.scene}`} />)}
          <i className="fp-head" style={{ left: `${runtime ? (100 * time) / runtime : 0}%` }} />
        </div>
      </div>
    </div>
  );
}
