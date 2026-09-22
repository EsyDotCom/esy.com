"use client";
/* eslint-disable @next/next/no-img-element -- decorative images inside a
   scaled drawing of the app; next/image sizing would fight the transform. */

/**
 * SeoPageReplay — a replay of SEOPage's real builder (create.seopage.com):
 * describe, research, score, go live. Ported from seopage.com's homepage
 * (components/home/BuilderDemo.tsx there) with its example business fixed:
 * Nora's plumbing shop in Denver. Drawn at the app's true size (1180px) with
 * its real tokens, then scaled to fit its column. Runs only while visible;
 * starts paused for reduced-motion visitors.
 *
 * If the builder's look changes, re-port from that component.
 */
import { useEffect, useRef, useState } from 'react';
import { Archivo, Funnel_Display } from 'next/font/google';

// The builder's display face and SEOPage's wordmark face.
const archivoFont = Archivo({ weight: ['700', '800'], subsets: ['latin'], display: 'swap' });
const funnelDisplay = Funnel_Display({ weight: '700', subsets: ['latin'], display: 'swap' });

const W = 1180;
const H = 762;
const SCENES = ["Describe", "Research", "Score", "Go live"] as const;
const LEN = [44, 40, 56, 30];
const STEPS = ["Researching your market", "Planning your local SEO", "Writing your page", "Choosing your design"];
const CHECKS = ["Title fits on Google", "Description fits", "One clear headline", "Search in all three", "City named up front", "4+ direct answers", "Questions covered", "Business schema", "FAQ schema", "Tap-to-call phone"];

// The example business the replay builds (an illustration, not a customer).
const name = "Lind Plumbing";
const service = "Plumbing";
const city = "Denver";
const svcCap = service.charAt(0).toUpperCase() + service.slice(1);
const svcLow = service.toLowerCase();
const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "");

export default function SeoPageReplay() {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [{ scene, t }, setPos] = useState({ scene: 0, t: 0 });
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const motion = requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    });
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => {
      cancelAnimationFrame(motion);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const id = setInterval(() => {
      setPos((p) => (p.t >= LEN[p.scene] ? { scene: (p.scene + 1) % 4, t: 0 } : { scene: p.scene, t: p.t + 1 }));
    }, 110);
    return () => clearInterval(id);
  }, [playing, visible]);

  const typeOf = (s: string, start: number) => s.slice(0, Math.max(0, Math.min(s.length, (t - start) * 2)));
  const sB = 2 + Math.ceil(name.length / 2) + 2;
  const sC = sB + Math.ceil(service.length / 2) + 2;
  const tn = typeOf(name, 2), ts = typeOf(service, sB), tc = typeOf(city, sC);
  const aA = scene === 0 && tn.length < name.length;
  const bA = scene === 0 && !aA && ts.length < service.length;
  const cA = scene === 0 && !aA && !bA && tc.length < city.length;
  const rIdx = Math.min(4, Math.floor(t / 9));
  const lit = scene === 2 ? Math.min(10, 2 + Math.floor(t / 3)) : 0;
  const circ = 194.8;
  const scroll = scene === 2 ? Math.min(250, Math.max(0, (t - 24) * 9)) : 0;
  const paid = scene === 3 && t > 20;

  return (
    <div className="spr-root flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-full border border-white/12 bg-white/5 p-1" role="tablist" aria-label="SEOPage builder replay steps">
          {SCENES.map((s, i) => (
            <button
              key={s}
              role="tab"
              aria-selected={scene === i}
              onClick={() => setPos({ scene: i, t: 0 })}
              className={`h-[42px] rounded-full px-4 text-[14px] transition-colors sm:px-5 ${scene === i ? "bg-[#EEF2FF] font-semibold text-[#04060B]" : "text-[#A0A9C0] hover:text-[#EEF2FF]"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex h-11 items-center gap-2 rounded-full border border-white/20 px-[18px] text-[14px] text-[#C9D0E2] hover:border-white/50"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <div ref={wrap} className="w-full overflow-hidden" style={{ height: H * scale }}>
        <div
          className="overflow-hidden rounded-[20px] border border-white/15 bg-[#f5f6f8] shadow-[0_80px_140px_-60px_rgba(61,107,255,.5),0_40px_80px_-40px_rgba(0,0,0,.8)]"
          style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left", fontFamily: "var(--font-geist-sans), sans-serif", color: "#0a0c11" }}
          aria-hidden
        >
          {/* browser chrome */}
          <div className="flex h-[42px] items-center gap-3 border-b border-[#dcdfe4] bg-[#e8eaee] px-4">
            <span className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="mx-auto rounded-[7px] bg-[#f5f6f8] px-4 py-[5px] text-[12px] text-[#4b515c]" style={mono}>
              {scene === 0 ? "create.seopage.com" : `create.seopage.com/build/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            </span>
          </div>

          <div className="relative h-[720px] overflow-hidden">
            {/* app header */}
            <div className="flex h-[52px] items-center gap-3 border-b border-[#e6e8ec] bg-white px-5">
              {/* The builder's real header: the seopage¹ wordmark, as in components/Brand.tsx there. */}
              <span className={`${funnelDisplay.className} inline-flex items-start text-[20px] font-bold leading-none tracking-[-0.04em] text-[#0a0c11]`}>
                seopage
                <span className="ml-[0.29em] mt-[0.07em] flex h-[1.5em] min-w-[1.5em] items-center justify-center rounded-[0.43em] bg-[#3D6BFF] text-[0.28em] tracking-normal text-white">
                  1
                </span>
              </span>
              <span className="border-l border-[#e6e8ec] pl-2.5 text-[10.5px] uppercase tracking-[.14em] text-[#646b78]" style={mono}>
                create
              </span>
              {scene === 2 && (
                <span className="ml-auto flex items-center gap-3.5">
                  <span className="text-[13px] font-semibold">{name}</span>
                  <span className="flex h-[34px] items-center rounded-lg bg-[#1b46d4] px-3.5 text-[13px] font-semibold text-white">Go live · $149</span>
                </span>
              )}
            </div>

            {scene === 0 && (
              <div key="intake" className="spr-pop absolute inset-x-0 bottom-0 top-[52px] grid grid-cols-2">
                <div className="flex flex-col gap-[18px] border-r border-[#e6e8ec] bg-white px-14 py-[46px]">
                  <span className="text-[10.5px] uppercase tracking-[.16em] text-[#1b46d4]" style={mono}>New page · step 1 of 3</span>
                  <span className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.025em]" style={archivo}>
                    Tell us who you are.
                    <br />
                    We&apos;ll find the search worth winning.
                  </span>
                  <span className="mt-1.5 text-[12px] font-semibold">Business name</span>
                  <Field active={aA} text={tn} />
                  <div className="grid grid-cols-2 gap-3">
                    <span className="flex flex-col gap-2"><span className="text-[12px] font-semibold">What you do</span><Field active={bA} text={ts} /></span>
                    <span className="flex flex-col gap-2"><span className="text-[12px] font-semibold">Where you work</span><Field active={cA} text={tc} /></span>
                  </div>
                  <span className="text-[12px] font-semibold">What should the page do?</span>
                  <span className="flex gap-2 text-[12.5px]">
                    <span className="flex h-[34px] items-center rounded-full bg-[#0a0c11] px-3.5 text-white">Get phone calls</span>
                    <span className="flex h-[34px] items-center rounded-full border border-[#d3d7dd] px-3.5 text-[#353a44]">Book jobs online</span>
                    <span className="flex h-[34px] items-center rounded-full border border-[#d3d7dd] px-3.5 text-[#353a44]">Collect emails</span>
                  </span>
                  <span className={`mt-1.5 flex h-[46px] items-center self-start rounded-lg px-[22px] text-[14.5px] font-semibold text-white transition-all ${t > 36 ? "scale-[.97] bg-[#1434a8]" : "bg-[#1b46d4]"}`}>
                    Research my market
                  </span>
                </div>
                <div className="flex flex-col gap-4 bg-[#eceef2] px-14 py-[46px]">
                  <span className="text-[10.5px] uppercase tracking-[.16em] text-[#646b78]" style={mono}>Your page is taking shape</span>
                  <div className="overflow-hidden rounded-xl bg-white shadow-[0_24px_48px_-24px_rgba(10,12,17,.35)]">
                    <div className="relative h-[230px]">
                      <img src="/images/seopage/nora-proud.webp" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 40%" }} />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(12,20,45,.92) 0%, rgba(12,20,45,.55) 55%, rgba(12,20,45,.1) 100%)" }} />
                      <div className="absolute left-6 right-[140px] top-7 flex flex-col gap-2 text-white">
                        <span className="text-[9.5px] uppercase tracking-[.16em] text-[#9fb4ff]" style={mono}>{city} · same-day service</span>
                        <span className="text-[24px] font-extrabold leading-[1.05]" style={archivo}>{svcCap} in {city}, done right.</span>
                        <span className="mt-1 self-start rounded-lg bg-[#1b46d4] px-3 py-2 text-[12px] font-semibold">Call now</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 px-5 py-4">
                      <i className="h-2 rounded bg-[#e6e8ec]" /><i className="h-2 rounded bg-[#e6e8ec]" /><i className="h-2 rounded bg-[#e6e8ec]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {scene === 1 && (
              <div key="research" className="spr-pop absolute inset-x-0 bottom-0 top-[52px] flex">
                <div className="flex w-80 shrink-0 flex-col gap-[22px] border-r border-[#e6e8ec] bg-white px-[30px] py-9">
                  <span className="text-[10.5px] uppercase tracking-[.16em] text-[#1b46d4]" style={mono}>Building your page</span>
                  <span className="text-[25px] font-extrabold leading-[1.1] tracking-[-0.02em]" style={archivo}>Researching {name}&apos;s market</span>
                  <div className="flex flex-col gap-3.5">
                    {STEPS.map((l, i) => {
                      const done = i < rIdx, act = i === rIdx;
                      return (
                        <span key={l} className="flex items-center gap-3">
                          <span className={`box-border h-[18px] w-[18px] shrink-0 rounded-full ${done ? "bg-[#1b46d4]" : act ? "border-[1.5px] border-[#1b46d4] bg-[#eef1fc]" : "border-[1.5px] border-[#d3d7dd]"}`} />
                          <span className={`text-[13.5px] ${done || act ? "font-semibold" : "text-[#8a909c]"}`}>{l}</span>
                        </span>
                      );
                    })}
                  </div>
                  <span className="mt-auto rounded-lg bg-[#f5f6f8] px-3.5 py-3 text-[12.5px] leading-[1.5] text-[#353a44]"><b>Real search data, not a guess.</b> Usually a few minutes.</span>
                </div>
                <div className="grid flex-1 grid-cols-2 content-start gap-[18px] p-8">
                  {t >= 6 && (
                    <Card title={`Searches in ${city}`} note="PER MONTH">
                      {[[`${svcLow} ${city.toLowerCase()}`, 2400, true], [`${svcLow} near me`, 1300, false], [`emergency ${svcLow}`, 480, false]].map(([k, n, p]) => (
                        <span key={String(k)} className="flex flex-col gap-[5px]">
                          <span className="flex justify-between text-[13px]"><span className={p ? "font-semibold text-[#1b46d4]" : "text-[#353a44]"}>{k}</span><span className="text-[12px]" style={mono}>{Number(n).toLocaleString("en-US")}</span></span>
                          <span className="h-1.5 rounded bg-[#eef0f3]"><span className="block h-1.5 rounded" style={{ width: `${Math.round(Number(n) / 24)}%`, background: p ? "#1b46d4" : "#9fb0ec" }} /></span>
                        </span>
                      ))}
                    </Card>
                  )}
                  {t >= 16 && (
                    <Card title="Skipped on purpose" note="WRONG AUDIENCE" noteColor="#b42318">
                      <Skip k={`${svcLow} jobs ${city.toLowerCase()}`} why="Job seekers, not customers" />
                      <Skip k={`diy ${svcLow}`} why="People fixing it themselves" />
                    </Card>
                  )}
                  {t >= 26 && (
                    <div className="col-span-2">
                      <Card title="Questions people ask" note="INTO YOUR FAQ">
                        <span className="grid grid-cols-2 gap-2 text-[13px]">
                          {[`How much does ${svcLow} cost in ${city}?`, "How fast can someone come out?", "Do you charge to come out?", "Are you licensed and insured?"].map((q) => (
                            <span key={q} className="rounded-lg bg-[#f5f6f8] px-3 py-2.5">{q}</span>
                          ))}
                        </span>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            )}

            {scene === 2 && (
              <div key="editor" className="spr-pop absolute inset-x-0 bottom-0 top-[52px] flex">
                <div className="flex w-[196px] shrink-0 flex-col gap-0.5 border-r border-[#e6e8ec] bg-white px-2.5 py-[18px] text-[13px]">
                  <span className="px-2 pb-2 text-[10px] uppercase tracking-[.14em] text-[#646b78]" style={mono}>Sections</span>
                  <span className="rounded-lg bg-[#eef1fc] px-2.5 py-[9px] font-semibold text-[#1434a8]">Hero</span>
                  {["Trust bar", "Services", "About", "FAQ", "Call to action"].map((x) => <span key={x} className="px-2.5 py-[9px]">{x}</span>)}
                  <span className="mt-auto rounded-lg bg-[#f5f6f8] p-2.5 text-[12px] leading-[1.45] text-[#353a44]">Rewrite: <b>Shorter</b> · More urgent · Friendlier</span>
                </div>
                <div className="flex flex-1 justify-center overflow-hidden bg-[#e3e6eb] p-5">
                  <div className="relative w-full overflow-hidden rounded-[10px] bg-white shadow-[0_24px_48px_-24px_rgba(10,12,17,.4)]">
                    <div style={{ transform: `translateY(-${scroll}px)`, transition: "transform .12s linear" }}>
                      <div className="flex h-11 items-center justify-between bg-[#0e1631] px-[22px] text-white">
                        <span className="text-[14px] font-extrabold" style={archivo}>{name}</span>
                        <span className="flex items-center gap-[18px] text-[11.5px] text-white/75"><span>Services</span><span>Areas</span><span>FAQ</span><span className="rounded-md bg-[#3d6bff] px-2.5 py-1.5 font-semibold text-white">(720) 555-0147</span></span>
                      </div>
                      <div className="relative h-[300px]">
                        <img src="/images/seopage/nora-proud.webp" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "55% 38%" }} />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(14,22,49,.94) 0%, rgba(14,22,49,.72) 45%, rgba(14,22,49,.05) 85%)" }} />
                        <div className="absolute left-[26px] top-10 flex w-[330px] flex-col gap-2.5 text-white">
                          <span className="text-[9.5px] uppercase tracking-[.16em] text-[#9fb4ff]" style={mono}>{city} · licensed master plumber</span>
                          <span className="text-[28px] font-extrabold leading-[1.04] tracking-[-0.02em]" style={archivo}>{svcCap} in {city}, done right the first time.</span>
                          <span className="text-[12.5px] leading-[1.5] text-white/80">A written price before any work starts. Same-day, evenings and weekends.</span>
                          <span className="mt-1 flex gap-2 text-[12px]"><span className="rounded-lg bg-[#3d6bff] px-[13px] py-[9px] font-semibold">Call now</span><span className="rounded-lg border border-white/35 px-[13px] py-[9px]">Get a quote</span></span>
                        </div>
                      </div>
                      <div className="flex justify-around border-b border-[#e6e8ec] bg-[#f3f5fb] px-[22px] py-3 text-[11.5px] font-semibold text-[#1d2a55]">
                        <span>✓ Licensed &amp; insured</span><span>✓ Upfront, written pricing</span><span>✓ Same-day service</span><span>✓ Local since 2014</span>
                      </div>
                      <div className="px-[22px] pb-2 pt-5 text-[18px] font-extrabold" style={archivo}>What we fix in {city}</div>
                      <div className="grid grid-cols-3 gap-3 px-[22px] pb-[18px]">
                        {[["svc-leak", "Leaks & fixtures", "Faucets, toilets, shut-offs"], ["svc-heater", "Water heaters", "Repair and replacement"], ["svc-drain", "Drains & sewer", "Clogs cleared same day"]].map(([img, h, d]) => (
                          <div key={img} className="overflow-hidden rounded-[10px] border border-[#e6e8ec]">
                            <img src={`/images/seopage/${img}.webp`} alt="" className="block h-24 w-full object-cover" />
                            <div className="px-3 py-2.5"><span className="block text-[12.5px] font-bold">{h}</span><span className="text-[11px] text-[#646b78]">{d}</span></div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 border-t border-[#eef0f3] bg-[#f9fafc] px-[22px] pb-[22px] pt-4 text-[12px]">
                        <span className="text-[16px] font-extrabold" style={archivo}>{svcCap} in {city}: common questions</span>
                        <span className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2.5"><b>How much does {svcLow} cost in {city}?</b><br /><span className="text-[#4b515c]">We diagnose first and put the price in writing before any work starts.</span></span>
                        <span className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2.5"><b>How fast can you get here?</b><br /><span className="text-[#4b515c]">Same day across {city}, evenings and weekends included.</span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[290px] shrink-0 flex-col gap-4 border-l border-[#e6e8ec] bg-white p-[22px]">
                  <span className="flex gap-4 border-b border-[#e6e8ec] pb-2.5 text-[13px]"><b>Score</b><span className="text-[#646b78]">Research</span><span className="text-[#646b78]">AI answers</span></span>
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-[76px] w-[76px] shrink-0">
                      <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90">
                        <circle cx="38" cy="38" r="31" fill="none" stroke="#eceef2" strokeWidth="7" />
                        <circle cx="38" cy="38" r="31" fill="none" stroke={lit === 10 ? "#15803d" : "#1b46d4"} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(circ * lit) / 10} ${circ}`} style={{ transition: "stroke-dasharray .35s" }} />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[22px] font-extrabold tabular-nums" style={archivo}>{lit * 10}</span>
                    </div>
                    <span className="flex flex-col gap-0.5"><span className="text-[9.5px] uppercase tracking-[.14em] text-[#646b78]" style={mono}>SEO + AI readiness</span><span className="text-[14px] font-semibold">{lit === 10 ? "Ready to rank" : "Scoring your page"}</span></span>
                  </div>
                  <div className="flex flex-col gap-2 text-[12.5px]">
                    {CHECKS.map((c, i) => (
                      <span key={c} className="flex items-center gap-2">
                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-all ${i < lit ? "bg-[#e7f3ec] text-[#15803d]" : "bg-[#eef0f3] text-transparent"}`}>✓</span>
                        <span className={i < lit ? "" : "text-[#8a909c]"}>{c}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {scene === 3 && (
              <div key="live" className="absolute inset-x-0 bottom-0 top-[52px] flex items-center justify-center bg-[#0a0c11]/45">
                <div className="spr-pop w-[480px] overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.5)]">
                  <div className="relative h-[130px]">
                    <img src="/images/seopage/nora-proud.webp" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 35%" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  <div className="flex flex-col gap-3.5 px-7 pb-[26px] pt-1">
                    <span className="text-[25px] font-extrabold leading-[1.1] tracking-[-0.02em]" style={archivo}>Put {name} on the web.</span>
                    <span className="rounded-lg border border-[#e6e8ec] bg-[#f5f6f8] px-3 py-2.5 text-[12px] text-[#353a44]" style={mono}>{slug}.seo.page</span>
                    <span className="flex flex-col gap-[7px] text-[13.5px]"><span>✓ Live the moment you pay</span><span>✓ Leads go to your inbox</span><span>✓ Download the HTML, yours to keep</span></span>
                    <span className="flex items-baseline gap-2.5 border-t border-[#e6e8ec] pt-3"><span className="text-[32px] font-extrabold" style={archivo}>$149</span><span className="rounded-[5px] bg-[#eef1fc] px-[7px] py-1 text-[10px] uppercase tracking-[.12em] text-[#1434a8]" style={mono}>Launch price</span></span>
                    <span className={`flex h-12 items-center justify-center rounded-[10px] text-[15px] font-semibold text-white transition-colors ${paid ? "bg-[#15803d]" : "bg-[#1b46d4]"}`}>
                      {paid ? `Live at ${slug}.seo.page` : "Pay $149 and go live"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" };
const archivo = { fontFamily: `${archivoFont.style.fontFamily}, sans-serif` };

function Field({ active, text }: { active: boolean; text: string }) {
  return (
    <span className={`flex h-[42px] items-center rounded-lg border bg-white px-3 text-[14px] ${active ? "border-[#1b46d4] shadow-[0_0_0_3px_rgba(27,70,212,.16)]" : "border-[#d3d7dd]"}`}>
      {text}
      {active && <span className="spr-tcaret" />}
    </span>
  );
}

function Card({ title, note, noteColor = "#646b78", children }: { title: string; note: string; noteColor?: string; children: React.ReactNode }) {
  return (
    <div className="spr-pop flex flex-col gap-3 rounded-xl border border-[#e6e8ec] bg-white p-5">
      <span className="flex justify-between text-[14px] font-semibold">
        {title}
        <span className="text-[10px] font-normal" style={{ ...mono, color: noteColor }}>{note}</span>
      </span>
      {children}
    </div>
  );
}

function Skip({ k, why }: { k: string; why: string }) {
  return (
    <span className="rounded-lg border border-[#f3d3cf] bg-[#fdf5f4] px-3 py-2.5 text-[13px]">
      <s>{k}</s>
      <br />
      <span className="text-[12px] text-[#7a2a22]">{why}</span>
    </span>
  );
}
