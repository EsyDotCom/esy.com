'use client';
/* esy.com/scout's hero, three ways (2026-11-07, /prototypes/scout-hero/). Zev: "See how they get
 * their customers" doesn't say who or what. The hero should say what Scout is (how top creators turn
 * social traffic into digital product businesses) and make creators proud to be on the list. Each take
 * sits on the navy band above S11's tool. Hype from what Scout has checked, never earnings: audiences
 * as shown, offers and prices from their own pages. All numbers are computed from creators.json.
 *   list      H1 · The list      the roster as an honour roll: a wall of faces, the list's numbers.
 *                                 Headline: "Study the creators converting social traffic into digital product sales" (Zev,
 *                                 2026-11-07: a marketing engineer site, so funnel language).
 *   pipeline  H2 · Post to product  the promise, then proof cycling through real creators:
 *                                 platform and audience → the free thing → the paid offer.
 *   cover     H3 · Cover        a magazine cover: one creator in the spotlight (rotating), the rest
 *                                 of the list beside them. */
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { CREATORS, Face, type PublicCreator } from './CreatorPlans';
import { PlatformMark, audience, graphOf } from './FunnelViews';

export type HeroTake = 'list' | 'pipeline' | 'cover';

// ── The list's numbers, computed ─────────────────────────────────────────────────────────
const FOLLOWERS = CREATORS.reduce((n, c) => n + c.platforms.reduce((m, p) => m + (p.followers ?? 0), 0), 0);
const OFFERS = CREATORS.reduce((n, c) => n + c.ladder.length, 0);
const FREE = CREATORS.reduce((n, c) => n + c.ladder.filter((l) => l.kind === 'free').length, 0);
const PLATFORMS = [...new Set(CREATORS.flatMap((c) => c.platforms.map((p) => p.name.replace(/\s*\(.*$/, ''))))].filter((p) => ['YouTube', 'Instagram', 'X', 'LinkedIn', 'TikTok', 'Newsletter'].includes(p));
const top = (c: PublicCreator) => c.platforms[0];

/** A full path for H2's proof: a platform, a free stop it links to, and a paid offer behind it. */
function pathFor(c: PublicCreator) {
  const g = graphOf(c);
  for (const p of g.plats) {
    const stops = g.edges.filter(([a]) => a === p.id).map(([, b]) => b);
    for (const s of stops) {
      const offerIds = g.edges.filter(([a]) => a === s).map(([, b]) => b);
      const offers = offerIds.map((id) => g.offers.find((o) => o.id === id)!).filter(Boolean);
      const free = g.offers.find((o) => o.free && offers.includes(o)) ?? g.offers.find((o) => o.free);
      const paid = offers.find((o) => !o.free) ?? g.offers.find((o) => !o.free && o.price && /\$/.test(o.price));
      if (p.aud && free && paid && free !== paid) return { c, plat: p, free, paid };
    }
  }
  return null;
}
const PATHS = CREATORS.map(pathFor).filter((x): x is NonNullable<ReturnType<typeof pathFor>> => !!x);

function useCycle(n: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms]);
  return [i, setI] as const;
}

/** "44.5M" → 44.5 with a small M, so the unit never towers over the figures. */
const Num = ({ v }: { v: string }) => {
  const m = v.match(/^([\d.,]+)([KMB]?)$/);
  return m ? <>{m[1]}{m[2] && <small className="sh2-unit">{m[2]}</small>}</> : <>{v}</>;
};

function Stats() {
  return (
    <dl className="sh2-stats">
      <div><dt>Creators</dt><dd><Num v={String(CREATORS.length)} /></dd></div>
      <div><dt>Followers</dt><dd><Num v={audience(FOLLOWERS)} /></dd></div>
      <div><dt>Offers mapped</dt><dd><Num v={String(OFFERS)} /></dd></div>
      <div><dt>Free offers</dt><dd><Num v={String(FREE)} /></dd></div>
    </dl>
  );
}

const SEE = <a className="sh2-see" href="#creators">See every game plan <ArrowDown size={14} aria-hidden="true" /></a>;

// ── H1 · The list ────────────────────────────────────────────────────────────────────────

function List({ join }: { join: ReactNode }) {
  return (
    // Centred (Zev, 2026-11-07): the two-line headline, the intro, the wall of faces across the hero,
    // the list's numbers, the independence line, then the signup in its own row below the wall, never
    // beside the faces (the faces identify whose marketing is studied, they don't sell the newsletter).
    <div className="sh2-stack is-center">
      <header className="sh2-top">
        <p className="fo-label">The Scout list · by Esy</p>
        <h1 className="ld-h1 sh2-h1-2">Study the creators converting social traffic <em>into digital product sales.</em></h1>
        <p className="ld-lede">Scout studies how {CREATORS.length} of the best do it: where their traffic comes from, the free thing that catches it, and the courses, communities and software they sell. Read from their own public pages, every line labelled with how we know it.</p>
      </header>
      <div className="sh2-wall" aria-label="On the list">
        <ul>
          {CREATORS.map((c) => (
            <li key={c.id} title={`${c.name}${top(c) ? ` · ${top(c).name.replace(/\s*\(.*$/, '')} ${audience(top(c).followers)}` : ''}`}>
              <Face c={c} size={56} />
              <span>{c.name.split(' ')[0]}</span>
            </li>
          ))}
        </ul>
        <Stats />
        <p className="sh2-indep">Followers combined across their platforms, as each profile showed them. Independent analysis of public pages, not affiliated with or endorsed by anyone shown. Corrections or removal: <a href="mailto:zev@esy.com">zev@esy.com</a></p>
        {SEE}
      </div>
      <div className="sh2-joinrow">
        <p><b>New game plans, in The Marketing Engineer.</b> The systems I build for marketing, and each creator added to the list.</p>
        {join}
      </div>
    </div>
  );
}

// ── H2 · Post to product ─────────────────────────────────────────────────────────────────

function Pipeline({ join }: { join: ReactNode }) {
  const [i, setI] = useCycle(PATHS.length, 4200);
  const p = PATHS[i];
  return (
    <div className="sh2 sh2--pipeline">
      <div className="sh2-text">
        <p className="fo-label">Scout · by Esy</p>
        <h1 className="ld-h1">See how top creators turn social traffic into <em>digital products.</em></h1>
        <p className="ld-lede">From the post to the product: where each creator’s followers come from, the free thing they send them to, and what they sell after it. {CREATORS.length} creators so far, read from their own public pages.</p>
        <p className="sh2-plats" aria-label="Platforms studied">{PLATFORMS.map((x) => <span key={x}><PlatformMark name={x} size={14} />{x}</span>)}</p>
        {join}
      </div>
      {p && (
        <figure className="sh2-proof" aria-live="polite">
          <figcaption><Face c={p.c} size={40} /><span><b>{p.c.name}</b><small>A real path, from their public pages</small></span></figcaption>
          <ol key={p.c.id}>
            <li><span className="sh2-step-k">The traffic</span><b><PlatformMark name={p.plat.label} size={15} />{p.plat.label}</b><em>{audience(p.plat.aud)} followers</em></li>
            <li aria-hidden="true" className="sh2-arrow"><ArrowRight size={18} /></li>
            <li><span className="sh2-step-k">The free thing</span><b>{p.free.label}</b><em>{p.free.price}</em></li>
            <li aria-hidden="true" className="sh2-arrow"><ArrowRight size={18} /></li>
            <li className="is-paid"><span className="sh2-step-k">The product</span><b>{p.paid.label}</b><em>{p.paid.price}</em></li>
          </ol>
          <div className="sh2-dots" role="tablist" aria-label="Examples">
            {PATHS.map((x, n) => <button key={x.c.id} type="button" role="tab" aria-selected={n === i} aria-label={x.c.name} className={n === i ? 'is-on' : ''} onClick={() => setI(n)} />)}
          </div>
        </figure>
      )}
    </div>
  );
}

// ── H3 · Cover ───────────────────────────────────────────────────────────────────────────

const FEATURED = CREATORS.filter((c) => c.game && c.avatar && top(c)?.followers);

function Cover({ join }: { join: ReactNode }) {
  const [i, setI] = useCycle(FEATURED.length, 5200);
  const c = FEATURED[i];
  // The edition is the newest read on the list, so server and browser always agree.
  const edition = new Date(`${CREATORS.map((x) => x.readOn).sort().at(-1)}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return (
    <div className="sh2 sh2--cover">
      <div className="sh2-text">
        <p className="fo-label">The Scout list · {edition}</p>
        <h1 className="ld-h1">Who’s winning on social, and <em>how they sell.</em></h1>
        <p className="ld-lede">The game plans of {CREATORS.length} creators who built businesses on YouTube, Instagram, X and LinkedIn: how they pull traffic, the free thing that catches it, and the digital products behind it.</p>
        {join}
      </div>
      {c && (
        <figure className="sh2-cover" key={c.id}>
          <div className="sh2-cover-face"><Face c={c} size={132} /></div>
          <figcaption>
            <p className="sh2-cover-k">On the list</p>
            <b>{c.name}</b>
            <span className="sh2-cover-aud"><PlatformMark name={top(c).name} size={15} />{audience(top(c).followers)} on {top(c).name.replace(/\s*\(.*$/, '')}</span>
            <p className="sh2-cover-game">{c.game!.split(/(?<=[.!?])\s/)[0]}</p>
            {SEE}
          </figcaption>
          <ul className="sh2-cover-more" aria-label="More on the list">
            {FEATURED.map((x, n) => (
              <li key={x.id}><button type="button" className={n === i ? 'is-on' : ''} onClick={() => setI(n)} title={x.name} aria-label={x.name}><Face c={x} size={30} /></button></li>
            ))}
          </ul>
        </figure>
      )}
    </div>
  );
}

export function ScoutHero({ take, join }: { take: HeroTake; join: ReactNode }) {
  if (take === 'pipeline') return <Pipeline join={join} />;
  if (take === 'cover') return <Cover join={join} />;
  return <List join={join} />;
}
