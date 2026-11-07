'use client';
/* A creator's own page on esy.com/scout (2026-11-07, /prototypes/scout-profile/), for a future
 * esy.com/scout/<name>. Zev: profiles like Forbes's, editorial; no newsletter signup on or around the
 * profile (only the site header's button). Everything shown is the public snapshot (creators.json):
 * the game plan (Esy's reading), platforms and audiences as shown, where their links go, offers at the
 * price shown, social profiles. Every page carries the independence line and the corrections address.
 *   dossier  P1 · Dossier   a magazine profile: the person and their game plan as the standfirst, an
 *                           at-a-glance strip, the funnel in lanes, the offers, how we know, more creators.
 *   funnel   P2 · Funnel    the funnel is the page: a sticky profile on the left, the wires diagram and
 *                           the offers filling the right.
 *   card     P3 · Card      a Scout card first, made to be shared by the creator (copy the link), then
 *                           the funnel and the offers beneath.
 *   merge    P4 · Dossier + card  P1's editorial top (face, name, socials, the game plan as the standfirst)
 *                           with P3's navy Scout card beside it as the fact box, then P1's sections. */
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Check, Link2, Plus } from 'lucide-react';
import { relFor } from '@/lib/outbound';
import { CREATORS, Face } from './CreatorPlans';
import { SCOUT_CONTACT, SCOUT_METHODS, correctionMail, faqFor, slugOf, type PublicCreator } from './creatorData';
import { BasisChip } from './FunnelMap';
import { BASIS, type Basis } from './funnels';
import { FunnelDiagram, PlatformMark, audience } from './FunnelViews';

export type ProfileTake = 'dossier' | 'funnel' | 'card' | 'merge';


const day = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const isBasis = (b?: string): b is Basis => b === 'counted' || b === 'seen' || b === 'reading' || b === 'open';
const plat = (n: string) => n.replace(/\s*\(.*$/, '');
/** The first money figure in a price ("From $5K" → 5000, "$184/mo" → 184), and how it reads ("$5K", "$184/mo"). */
function money(price?: string) {
  const m = (price ?? '').match(/\$\s*([\d,]+(?:\.\d+)?)\s*([KkMm])?(\s*\/\s*(?:mo|month|yr|year|wk|week))?/);
  if (!m) return null;
  const v = parseFloat(m[1].replace(/,/g, '')) * (m[2] ? (/k/i.test(m[2]) ? 1e3 : 1e6) : 1);
  return { v, text: `$${m[1]}${m[2] ? m[2].toUpperCase() : ''}${m[3] ? m[3].replace(/\s+/g, '').replace('month', 'mo').replace('year', 'yr').replace('week', 'wk') : ''}` };
}
/** The cheapest paid offer, for the at-a-glance strip, with its price read short. */
function cheapestPaid(c: PublicCreator) {
  const priced = c.ladder.filter((l) => l.kind !== 'free').map((l) => ({ l, m: money(l.price) })).filter((x) => x.m && x.m.v > 0)
    .sort((a, b) => a.m!.v - b.m!.v);
  return priced[0] ? { ...priced[0].l, short: priced[0].m!.text } : undefined;
}
/** Creators who post on the same main platform, for "more creators". */
const similar = (c: PublicCreator) => CREATORS.filter((x) => x.id !== c.id && plat(x.platforms[0]?.name ?? '') === plat(c.platforms[0]?.name ?? '')).slice(0, 4);

function Socials({ c, size = 15 }: { c: PublicCreator; size?: number }) {
  return (
    <ul className="pf-socials" aria-label={`${c.name} on social`}>
      {c.links.map((l) => (
        <li key={l.url}><a href={l.url} target="_blank" rel={relFor(l.url, { newTab: true })} title={`${l.kind}${l.handle ? ` ${l.handle}` : ''}`}><PlatformMark name={l.kind ?? ''} size={size} /><span className="pf-handle">{l.handle ?? l.kind}</span></a></li>
      ))}
    </ul>
  );
}

function Crumbs({ c }: { c: PublicCreator }) {
  return <nav className="pf-crumbs" aria-label="Breadcrumb"><Link href="/scout/"><ArrowLeft size={13} aria-hidden="true" />Scout</Link><span>/</span><span>{c.name}</span></nav>;
}

function Game({ c }: { c: PublicCreator }) {
  return c.game
    ? <p className="pf-game">{c.game} <BasisChip b="reading" /></p>
    : <p className="pf-game is-quiet">We don’t publish this one’s game plan. Their funnel and offers are below.</p>;
}

function Glance({ c }: { c: PublicCreator }) {
  const cheap = cheapestPaid(c);
  return (
    <dl className="pf-glance">
      {c.platforms[0] && <div><dt>Biggest audience</dt><dd>{audience(c.platforms[0].followers)}<small>{plat(c.platforms[0].name)}</small></dd></div>}
      <div><dt>Platforms</dt><dd>{c.platforms.length}</dd></div>
      <div><dt>Offers</dt><dd>{c.ladder.length}<small>{c.ladder.filter((l) => l.kind === 'free').length} free</small></dd></div>
      {cheap && <div><dt>First paid step</dt><dd>{cheap.short}<small>{cheap.name}</small></dd></div>}
    </dl>
  );
}

function Offers({ c }: { c: PublicCreator }) {
  return (
    <ol className="pf-offers">
      {c.ladder.map((l, i) => (
        <li key={l.name + i} className={l.kind === 'free' ? 'is-free' : ''}>
          <span className="pf-offer-price">{l.price}</span>
          <span className="pf-offer-name">{l.url ? <a href={l.url} target="_blank" rel={relFor(l.url, { newTab: true })}>{l.name}</a> : l.name}</span>
          {l.what && <span className="pf-offer-what">{l.what}</span>}
          {isBasis(l.basis) && <BasisChip b={l.basis} />}
        </li>
      ))}
    </ol>
  );
}

/** The creator's FAQ: questions built from their public data, each answer citing their own links. */
function ProfileFaq({ c }: { c: PublicCreator }) {
  return (
    <section className="pf-sec" id="faq">
      <h2 className="pf-h2">Questions about {c.name}</h2>
      <div className="me-faq pf-faq">
        {faqFor(c).map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary><span>{f.q}</span><Plus size={18} aria-hidden="true" /></summary>
            <p>{f.a.map((p, j) => (p.href
              ? <a key={j} href={p.href} {...(p.href.startsWith('mailto:') ? {} : { target: '_blank', rel: relFor(p.href, { newTab: true }) })}>{p.text}</a>
              : <span key={j}>{p.text}</span>))}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function HowWeKnow() {
  return (
    <ul className="pf-know">
      {(Object.keys(BASIS) as Basis[]).map((b) => <li key={b}><BasisChip b={b} /><span>{BASIS[b].says}</span></li>)}
    </ul>
  );
}

function Indep({ c }: { c: PublicCreator }) {
  return (
    <div className="pf-indep">
      <p>Read from {c.name}’s own public pages on {day(c.readOn)}; audiences and prices as shown that day. Independent analysis by Esy, not affiliated with or endorsed by {c.name}; no one pays to be in Scout.</p>
      <p className="pf-indep-links"><a href={correctionMail(c.name)}>Request a correction or removal</a><span aria-hidden="true">·</span><Link href={SCOUT_METHODS}>How Scout works</Link></p>
    </div>
  );
}

function More({ c }: { c: PublicCreator }) {
  const list = similar(c);
  if (!list.length) return null;
  return (
    <section className="pf-sec">
      <h2 className="pf-h2">More creators on {plat(c.platforms[0]?.name ?? 'the list')}</h2>
      <ul className="pf-more">
        {list.map((x) => (
          <li key={x.id}><Link href={`../${slugOf(x)}/`}><Face c={x} size={44} /><span><b>{x.name}</b><small>{x.platforms[0] ? `${plat(x.platforms[0].name)} ${audience(x.platforms[0].followers)}` : ''}</small></span></Link></li>
        ))}
      </ul>
    </section>
  );
}

// ── P1 · Dossier ─────────────────────────────────────────────────────────────────────────

function Dossier({ c }: { c: PublicCreator }) {
  return (
    <article className="pf pf--dossier">
      <Crumbs c={c} />
      <header className="pf-hero">
        <Face c={c} size={128} />
        <div>
          <p className="fo-label">On the Scout list</p>
          <h1 className="pf-name">{c.name}</h1>
          <Socials c={c} />
        </div>
      </header>
      <Game c={c} />
      <Glance c={c} />
      <section className="pf-sec"><h2 className="pf-h2">The funnel</h2><p className="pf-lede">Where they post, where each platform sends people, and what they sell after it.</p><FunnelDiagram c={c} view="lanes" /></section>
      <section className="pf-sec"><h2 className="pf-h2">What they sell, cheapest first</h2><Offers c={c} /></section>
      <section className="pf-sec pf-sec--quiet"><h2 className="pf-h2">How we know</h2><HowWeKnow /><Indep c={c} /></section>
      <More c={c} />
    </article>
  );
}

// ── P2 · Funnel ──────────────────────────────────────────────────────────────────────────

function Funnel({ c }: { c: PublicCreator }) {
  return (
    <article className="pf pf--funnel">
      <Crumbs c={c} />
      <div className="pf-split">
        <aside className="pf-side">
          <Face c={c} size={96} />
          <p className="fo-label">On the Scout list</p>
          <h1 className="pf-name">{c.name}</h1>
          <Socials c={c} size={14} />
          <Game c={c} />
          <Glance c={c} />
          <Indep c={c} />
        </aside>
        <div className="pf-main">
          <section className="pf-sec pf-sec--first"><h2 className="pf-h2">How {c.name.split(' ')[0]} turns followers into customers</h2><p className="pf-lede">Rest on any card to follow its path.</p><FunnelDiagram c={c} view="wires" /></section>
          <section className="pf-sec"><h2 className="pf-h2">What they sell, cheapest first</h2><Offers c={c} /></section>
          <section className="pf-sec pf-sec--quiet"><h2 className="pf-h2">How we know</h2><HowWeKnow /></section>
          <More c={c} />
        </div>
      </div>
    </article>
  );
}

/** P3's Scout card, compact: the brand, the top audiences, the first paid step, the date, copy link. */
function ScoutCard({ c }: { c: PublicCreator }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(`https://esy.com/scout/${slugOf(c)}/`).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const cheap = cheapestPaid(c);
  return (
    <aside className="pf-scard pf-scard--box" aria-label={`${c.name}’s Scout card`}>
      <div className="pf-scard-top">
        <span className="pf-scard-brand"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout list</span></span>
        <span className="pf-scard-date">{day(c.readOn)}</span>
      </div>
      <dl className="pf-scard-facts">
        {c.platforms.slice(0, 3).map((p) => <div key={p.name}><dt><PlatformMark name={p.name} size={13} />{plat(p.name)}</dt><dd>{audience(p.followers)}</dd></div>)}
        <div><dt>Offers</dt><dd>{c.ladder.length}<small>{c.ladder.filter((l) => l.kind === 'free').length} free</small></dd></div>
        {cheap && <div className="is-wide"><dt>First paid step · {cheap.name}</dt><dd>{cheap.short}</dd></div>}
      </dl>
      <button type="button" className="pf-share" onClick={copy}>{copied ? <><Check size={14} aria-hidden="true" />Link copied</> : <><Link2 size={14} aria-hidden="true" />Copy link to this page</>}</button>
    </aside>
  );
}

// ── P4 · Dossier + card ──────────────────────────────────────────────────────────────────

function Merge({ c }: { c: PublicCreator }) {
  return (
    <article className="pf pf--merge">
      <Crumbs c={c} />
      <div className="pf-top">
        <div className="pf-top-main">
          <header className="pf-hero">
            <Face c={c} size={120} />
            <div>
              <p className="fo-label">On the Scout list</p>
              <h1 className="pf-name">{c.name}</h1>
              <Socials c={c} />
            </div>
          </header>
          <Game c={c} />
          <p className="pf-byline">Analysis by Esy · read {day(c.readOn)} · <Link href={SCOUT_METHODS}>how we know</Link> · <a href={correctionMail(c.name)}>request a correction</a></p>
        </div>
        <ScoutCard c={c} />
      </div>
      <section className="pf-sec"><h2 className="pf-h2">The funnel</h2><p className="pf-lede">Where they post, where each platform sends people, and what they sell after it.</p><FunnelDiagram c={c} view="lanes" /></section>
      <section className="pf-sec"><h2 className="pf-h2">What they sell, cheapest first</h2><Offers c={c} /></section>
      <ProfileFaq c={c} />
      <section className="pf-sec pf-sec--quiet"><h2 className="pf-h2">How we know</h2><HowWeKnow /><Indep c={c} /></section>
      <More c={c} />
    </article>
  );
}

// ── P3 · Card ────────────────────────────────────────────────────────────────────────────

function Card({ c }: { c: PublicCreator }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(`https://esy.com/scout/${slugOf(c)}/`).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const cheap = cheapestPaid(c);
  return (
    <article className="pf pf--card">
      <Crumbs c={c} />
      {/* The Scout card: the creator's share-worthy summary, first. */}
      <section className="pf-scard" aria-label={`${c.name}’s Scout card`}>
        <div className="pf-scard-top">
          <span className="pf-scard-brand"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout list</span></span>
          <span className="pf-scard-date">{day(c.readOn)}</span>
        </div>
        <div className="pf-scard-body">
          <Face c={c} size={112} />
          <div>
            <h1 className="pf-name">{c.name}</h1>
            <Socials c={c} size={14} />
            <Game c={c} />
          </div>
        </div>
        <dl className="pf-scard-facts">
          {c.platforms.slice(0, 3).map((p) => <div key={p.name}><dt><PlatformMark name={p.name} size={13} />{plat(p.name)}</dt><dd>{audience(p.followers)}</dd></div>)}
          {cheap && <div><dt>First paid step · {cheap.name}</dt><dd>{cheap.short}</dd></div>}
        </dl>
        <button type="button" className="pf-share" onClick={copy}>{copied ? <><Check size={14} aria-hidden="true" />Link copied</> : <><Link2 size={14} aria-hidden="true" />Copy link to this page</>}</button>
      </section>
      <section className="pf-sec"><h2 className="pf-h2">The funnel</h2><FunnelDiagram c={c} view="lanes" /></section>
      <section className="pf-sec"><h2 className="pf-h2">What they sell, cheapest first</h2><Offers c={c} /></section>
      <section className="pf-sec pf-sec--quiet"><h2 className="pf-h2">How we know</h2><HowWeKnow /><Indep c={c} /></section>
      <More c={c} />
    </article>
  );
}

export function ScoutProfile({ take, c }: { take: ProfileTake; c: PublicCreator }) {
  return take === 'funnel' ? <Funnel c={c} /> : take === 'card' ? <Card c={c} /> : take === 'merge' ? <Merge c={c} /> : <Dossier c={c} />;
}

/** The Scout header on a profile: the lockup, back to the list, and the site's one newsletter button. */
export function ProfilePage({ take, c }: { take: ProfileTake; c: PublicCreator }) {
  return (
    <div className="ld ld--map-night has-band pf-page">
      <header className="ld-head">
        <Link className="fo-lockup ld-lockup" href="/scout/" aria-label="Scout"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout</span></Link>
        <nav className="ld-head-nav" aria-label="Scout"><Link href="/scout/creators/">All creators</Link><Link href={SCOUT_METHODS}>How Scout works</Link></nav>
        <Link className="fo-btn fo-btn--primary ld-head-cta" href="/scout/#join">Get the newsletter</Link>
      </header>
      <main className="ld-main"><ScoutProfile take={take} c={c} /></main>
    </div>
  );
}

/** esy.com/scout/creators/: everyone on the list, each linking to their page. Same header, no signup. */
export function CreatorsIndex() {
  const list = [...CREATORS].sort((a, b) => (b.platforms[0]?.followers ?? 0) - (a.platforms[0]?.followers ?? 0));
  return (
    <div className="ld ld--map-night has-band pf-page">
      <header className="ld-head">
        <Link className="fo-lockup ld-lockup" href="/scout/" aria-label="Scout"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout</span></Link>
        <nav className="ld-head-nav" aria-label="Scout"><Link href="/scout/">The tool</Link><Link href={SCOUT_METHODS}>How Scout works</Link></nav>
        <Link className="fo-btn fo-btn--primary ld-head-cta" href="/scout/#join">Get the newsletter</Link>
      </header>
      <main className="ld-main">
        <section className="pf pf-index">
          <nav className="pf-crumbs" aria-label="Breadcrumb"><Link href="/scout/"><ArrowLeft size={13} aria-hidden="true" />Scout</Link><span>/</span><span>Creators</span></nav>
          <p className="fo-label">The Scout list</p>
          <h1 className="pf-name">{list.length} creators and their game plans</h1>
          <p className="pf-lede">How each one converts social traffic into digital product sales: where they post, where they send people, and what they sell. Read from their own public pages.</p>
          <ul className="pf-index-grid">
            {list.map((c) => (
              <li key={c.id}>
                <Link href={`/scout/creators/${slugOf(c)}/`}>
                  <Face c={c} size={52} />
                  <span>
                    <b>{c.name}</b>
                    <small>{c.platforms[0] ? `${plat(c.platforms[0].name)} ${audience(c.platforms[0].followers)}` : ''}{c.ladder.length ? ` · ${c.ladder.length} offers` : ''}</small>
                    {c.game && <em>{c.game.split(/(?<=[.!?])\s/)[0]}</em>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="pf-indep"><p>Independent analysis of public pages, not affiliated with or endorsed by anyone shown; no one pays to be in Scout.</p><p className="pf-indep-links"><a href={correctionMail()}>Request a correction or removal</a><span aria-hidden="true">·</span><Link href={SCOUT_METHODS}>How Scout works</Link></p></div>
        </section>
      </main>
    </div>
  );
}
