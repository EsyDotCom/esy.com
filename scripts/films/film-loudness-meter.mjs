#!/usr/bin/env node
/**
 * The film loudness meter. Renders a film's soundtrack offline exactly as the
 * animatic player schedules it (per-line music dips, effect levels, the master
 * level from timeline.mix), then runs the checks in the Sound and Mix standard:
 * BS.1770 integrated loudness, true peak (4x oversampled), each line against
 * the music and the effects, and 3 s windows (Torcoli 2024). Prints one JSON
 * record; save it next to the others in docs/films/<slug>/mix-passes/.
 *
 * Usage:
 *   node scripts/films/film-loudness-meter.mjs [media dir] > pass.json
 *   media dir defaults to public/films/the-letter-with-no-address/animatic
 *   (timeline.json, a/ sound files; the local copy, gitignored).
 *
 * Needs Playwright and its Chromium. esy.com doesn't install it, so point
 * PLAYWRIGHT_MODULE at an installed copy, e.g. another repo's
 * node_modules/playwright/index.mjs.
 *
 * The standard (research, targets, every pass): the "Sound and Mix" doc linked
 * from the film page's press kit, and docs/films/README.md.
 */
import http from "http";
import { readFile } from "fs/promises";
import path from "path";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const dir = path.resolve(process.argv[2] || "public/films/the-letter-with-no-address/animatic");
// A tiny static server over the media folder, so the page can fetch timeline.json and a/*.
const server = http.createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p === "/") { res.writeHead(200, { "content-type": "text/html" }); return res.end("<!doctype html><title>meter</title>"); }
  try { res.writeHead(200); res.end(await readFile(path.join(dir, path.normalize(p).replace(/^([/\\])+/, "")))); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const b = await chromium.launch(); const p = await b.newPage();
await p.goto(`http://127.0.0.1:${server.address().port}/`);
const res = await p.evaluate(async () => {
  const TL = await (await fetch("timeline.json?" + Date.now())).json();
  const MIX = TL.mix || { master: 1, limiter: false };
  const SR = 48000, LEN = Math.ceil((TL.runtime + 2) * SR), cache = {};
  const buf = async (ctx, f) => { if (!cache[f]) cache[f] = await (await fetch("a/" + f)).arrayBuffer(); return ctx.decodeAudioData(cache[f].slice(0)); };
  const lines = TL.shots.flatMap((s) => s.lines);
  const spans = []; for (const l of lines.slice().sort((a, b) => a.at - b.at)) { const last = spans[spans.length - 1];
      if (last && l.at - last.e < 1.0) { last.e = Math.max(last.e, l.at + l.dur + (l.hold || 0)); last.duck = Math.min(last.duck, l.duck ?? 0.13); }
      else spans.push({ a: l.at, e: l.at + l.dur + (l.hold || 0), duck: l.duck ?? 0.13 }); }
  async function render(kinds, master) {
    const ctx = new OfflineAudioContext(2, LEN, SR);
    let out = ctx.destination;
    if (master) { const mg = ctx.createGain(); mg.gain.value = MIX.master; let node = mg;
      if (MIX.limiter) { const c = ctx.createDynamicsCompressor(); Object.assign(c, {}); c.threshold.value = MIX.limiter.threshold; c.knee.value = 0; c.ratio.value = 20; c.attack.value = 0.001; c.release.value = 0.12; mg.connect(c); node = c; }
      node.connect(ctx.destination); out = mg; }
    const play = async (file, at, gain, loop, until, auto) => { const s = ctx.createBufferSource(); s.buffer = await buf(ctx, file); s.loop = !!loop;
      const g = ctx.createGain(); g.gain.value = gain; s.connect(g).connect(out); s.start(at); if (until) s.stop(until); if (auto) auto(g.gain); };
    if (kinds.includes("dialogue")) for (const l of lines) await play(l.file, l.at, l.gain ?? 1.0);
    if (kinds.includes("sfx")) for (const s of TL.shots) for (const x of s.sfx) await play(x.file, x.at, x.gain, x.loop, x.loop ? x.end + 0.3 : null, x.loop ? (g) => { g.setValueAtTime(x.gain, x.at); g.setTargetAtTime(0.0001, x.end - 1.6, 0.4); } : null);
    if (kinds.includes("music")) for (const m of TL.music) { const last = m === TL.music[TL.music.length - 1];
      await play(m.file, m.start, 0.3, false, m.end + 1.2, (g) => { const under = spans.find((sp) => m.start >= sp.a - 0.15 && m.start <= sp.e + 0.2); g.setValueAtTime(0.0001, m.start); g.setTargetAtTime(under ? under.duck : 0.3, m.start, 0.35);
        for (const sp of spans) { const a = sp.a, e = sp.e; if (e < m.start || a > m.end) continue;
          g.setTargetAtTime(sp.duck, Math.max(a - 0.15, m.start), 0.08); g.setTargetAtTime(0.3, e + 0.2, 0.35); }
        g.setTargetAtTime(0.0001, m.end - (last ? 3 : 0.2), last ? 0.9 : 0.5); }); }
    const r = await ctx.startRendering(); return [r.getChannelData(0), r.getChannelData(1)];
  }
  const kw = (x) => { const f = (x, b, a) => { const y = new Float32Array(x.length); let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
      for (let i = 0; i < x.length; i++) { const v = b[0] * x[i] + b[1] * x1 + b[2] * x2 - a[1] * y1 - a[2] * y2; x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v; } return y; };
    return f(f(x, [1.53512485958697, -2.69169618940638, 1.19839281085285], [1, -1.69065929318241, 0.73248077421585]), [1, -2, 1], [1, -1.99004745483398, 0.99007225036621]); };
  const blocks = (ch, win) => { const k = ch.map(kw), N = win * SR, H = 0.1 * SR, out = [];
    for (let s = 0; s + N <= k[0].length; s += H) { let z = 0; for (const c of k) { let a = 0; for (let i = s; i < s + N; i++) a += c[i] * c[i]; z += a / N; } out.push({ t: s / SR, z }); } return out; };
  const L = (z) => -0.691 + 10 * Math.log10(z);
  const integ = (bl) => { const g1 = bl.filter((b) => L(b.z) > -70); if (!g1.length) return null; const rel = L(g1.reduce((a, b) => a + b.z, 0) / g1.length) - 10;
    const g2 = g1.filter((b) => L(b.z) > rel); return +L(g2.reduce((a, b) => a + b.z, 0) / g2.length).toFixed(1); };
  const truePeak = (ch) => { // 4x oversampling with a 48-tap windowed-sinc interpolator (BS.1770 Annex 2 style)
    const T = 12, taps = []; for (let ph = 1; ph < 4; ph++) { const h = []; for (let k = -T + 1; k <= T; k++) { const x = k - ph / 4; const w = 0.5 + 0.5 * Math.cos(Math.PI * x / T); h.push(x === 0 ? 1 : (Math.sin(Math.PI * x) / (Math.PI * x)) * w); } taps.push(h); }
    let pk = 0; for (const c of ch) for (let i = T; i < c.length - T; i++) { const v = Math.abs(c[i]); if (v > pk) pk = v; if (v < 0.5) continue;
      for (const h of taps) { let s = 0; for (let k = 0; k < h.length; k++) s += h[k] * c[i - T + 1 + k]; if (Math.abs(s) > pk) pk = Math.abs(s); } }
    return +(20 * Math.log10(pk)).toFixed(2); };
  const st = { dialogue: await render(["dialogue"], false), music: await render(["music"], false), sfx: await render(["sfx"], false) };
  const mix = await render(["dialogue", "music", "sfx"], true);
  const M = { d: blocks(st.dialogue, 0.4), m: blocks(st.music, 0.4), s: blocks(st.sfx, 0.4) };
  const S3 = { d: blocks(st.dialogue, 3), bg: blocks([0, 1].map((c) => { const x = new Float32Array(LEN); for (let i = 0; i < LEN; i++) x[i] = st.music[c][i] + st.sfx[c][i]; return x; }), 3) };
  const dInt = integ(M.d), mean = (a) => a.reduce((x, y) => x + y.z, 0) / a.length;
  const perLine = []; for (const s of TL.shots) for (const l of s.lines) { const inside = (b) => b.t >= l.at && b.t + 0.4 <= l.at + l.dur;
    const d = M.d.filter(inside), m = M.m.filter(inside), x = M.s.filter(inside); if (!d.length) continue;
    const dl = L(mean(d)), ml = L(mean(m)), xl = L(mean(x));
    perLine.push({ id: s.id, file: l.file, at: l.at, dur: l.dur, d: +dl.toFixed(1), overMusic: ml < -70 ? null : +(dl - ml).toFixed(1), overSfx: xl < -70 ? null : +(dl - xl).toFixed(1), duck: l.duck ?? 0.13 }); }
  // over dialogue passages: dialogue-stem loudness minus music-stem loudness, integrated on speech blocks
  const speech = M.d.map((b, i) => [b, M.m[i]]).filter(([b]) => L(b.z) > dInt - 20);
  const dialogueOverMusic = +(L(mean(speech.map((x) => x[0]))) - L(mean(speech.map((x) => x[1])))).toFixed(1);
  // 3 s windows with speech in them: dialogue vs everything else
  const speechIn = (t) => lines.reduce((a, l) => a + Math.max(0, Math.min(t + 3, l.at + l.dur) - Math.max(t, l.at)), 0);
  const win = S3.d.map((b, i) => ({ t: b.t, d: L(b.z), bg: L(S3.bg[i].z) })).filter((w) => speechIn(w.t) >= 1.5);
  const worst = win.map((w) => ({ t: +w.t.toFixed(1), margin: +(w.d - w.bg).toFixed(1) })).sort((a, b) => a.margin - b.margin);
  return { integrated: { mix: integ(blocks(mix, 0.4)), dialogue: dInt }, truePeak: truePeak(mix), dialogueOverMusic,
    windows: { count: worst.length, under0: worst.filter((w) => w.margin < 0).length, under10: worst.filter((w) => w.margin < 10).length, under15: worst.filter((w) => w.margin < 15).length, worst: worst.slice(0, 4) },
    quietDialogueWindows: win.filter((w) => w.d < dInt - 10).length, perLine };
});
console.log(JSON.stringify(res));
await b.close();
server.close();
