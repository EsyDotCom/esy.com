/* esy.com/scout/how-we-work/ (2026-11-07): how Scout works, its rules and its corrections. Written after
 * the legal research on creator profiles (2026-11-07): Scout should look and work like a publication,
 * with its methods, dates, independence and a corrections route and log in one public place. Linked
 * from every Scout page. Corrections log: src/data/scout/corrections.json. */
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import corrections from '@/data/scout/corrections.json';
import { BASIS, type Basis } from './funnels';
import { CREATOR_LIST, SCOUT_CONTACT, correctionMail } from './creatorData';

type Correction = { date: string; creator: string; page: string | null; kind: string; what: string; why: string };
const LOG = corrections.entries as Correction[];
const day = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const KIND: Record<string, string> = { correction: 'Correction', 'photo-removed': 'Photo removed', 'page-removed': 'Page removed', update: 'Update' };

export const METHODS_UPDATED = '2026-11-07';

export function ScoutMethods() {
  return (
    <div className="ld ld--map-night has-band pf-page">
      <header className="ld-head">
        <Link className="fo-lockup ld-lockup" href="/scout/" aria-label="Scout"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout</span></Link>
        <nav className="ld-head-nav" aria-label="Scout"><Link href="/scout/">The tool</Link><Link href="/scout/creators/">All creators</Link></nav>
        <Link className="fo-btn fo-btn--primary ld-head-cta" href="/scout/#join">Get the newsletter</Link>
      </header>
      <main className="ld-main">
        <article className="pf sm">
          <nav className="pf-crumbs" aria-label="Breadcrumb"><Link href="/scout/"><ArrowLeft size={13} aria-hidden="true" />Scout</Link><span>/</span><span>How Scout works</span></nav>
          <p className="fo-label">How Scout works</p>
          <h1 className="pf-name">How we study creators, and how to correct us</h1>
          <p className="sm-lede">Scout is Esy’s independent analysis of how creators and AI companies market themselves: where their audience is, where they send people, and what they sell. This page says where it comes from, what we never publish, and how anyone in it can ask for a correction or removal. Updated {day(METHODS_UPDATED)}.</p>

          <nav className="sm-toc" aria-label="On this page">
            <a href="#what">What Scout is</a><a href="#sources">Where it comes from</a><a href="#labels">How every line is labelled</a><a href="#never">What we never publish</a><a href="#photos">Photos</a><a href="#independence">Independence</a><a href="#refresh">Dates and refreshes</a><a href="#corrections">Corrections and removal</a><a href="#log">Corrections log</a>
          </nav>

          <section className="sm-sec" id="what">
            <h2 className="pf-h2">What Scout is</h2>
            <p>Scout is editorial analysis, published as commentary for marketers and marketing engineers who want to learn how successful creators build their businesses. It covers {CREATOR_LIST.length} creators today, plus AI companies, and each page is built from that creator’s own study, not generated from a feed. Each page describes public business activity: the platforms someone posts on, the pages their links lead to, and the offers and prices on their own sites. It isn’t business, financial or legal advice.</p>
          </section>

          <section className="sm-sec" id="sources">
            <h2 className="pf-h2">Where it comes from</h2>
            <p>Only what a creator or company has made public: their public profiles and posts, the pages their links lead to, and their own offer and pricing pages. We read them the way any visitor can. We never sign up, buy, join a private group, or use anything behind a paywall or a login wall to fill in a page; when something needs that, the line says <em>not checked</em> instead.</p>
          </section>

          <section className="sm-sec" id="labels">
            <h2 className="pf-h2">How every line is labelled</h2>
            <p>Every line on a Scout page says how we know it:</p>
            <ul className="pf-know">{(Object.keys(BASIS) as Basis[]).map((b) => <li key={b}><b>{BASIS[b].name}.</b> <span>{BASIS[b].says}</span></li>)}</ul>
            <p>A creator’s <em>game plan</em> is always Esy’s reading of the facts shown beside it: our opinion, labelled as such, so you can check it against the evidence.</p>
          </section>

          <section className="sm-sec" id="never">
            <h2 className="pf-h2">What we never publish</h2>
            <ul className="sm-list">
              <li>Anyone’s earnings, revenue or income. We show prices as listed, never what someone makes.</li>
              <li>Personal or family details, home locations, or anything about someone’s life outside their public business.</li>
              <li>Private messages, private groups, or anything behind a login or paywall.</li>
              <li>Full posts, captions or transcripts. We paraphrase, and quote at most a few words of someone’s own offer copy.</li>
              <li>Claims that someone did something wrong. Scout describes how a business works, not whether it’s good.</li>
            </ul>
          </section>

          <section className="sm-sec" id="photos">
            <h2 className="pf-h2">Photos</h2>
            <p>We show each creator’s public profile picture, small, only to identify whose marketing a page studies. Faces never appear in Esy’s ads or sales emails, and never next to a sign-up form. Anyone can ask us to remove their photo, and we will, replacing it with their initial.</p>
          </section>

          <section className="sm-sec" id="independence">
            <h2 className="pf-h2">Independence</h2>
            <p>Scout isn’t affiliated with or endorsed by anyone it covers. No one pays to be in Scout, to be left out, or to be described a certain way, and Scout has no affiliate or sponsored links. Links to the people and companies we cover are marked <code>nofollow</code>. Esy makes its own products for the same readers; we never compare a creator’s offers with ours on a Scout page.</p>
          </section>

          <section className="sm-sec" id="refresh">
            <h2 className="pf-h2">Dates and refreshes</h2>
            <p>Every page shows the day we read the creator’s pages, and every audience count and price is as shown that day. Pages change, so we re-read and refresh them over time; a page’s date changes only when we read it again.</p>
          </section>

          <section className="sm-sec" id="corrections">
            <h2 className="pf-h2">Corrections and removal</h2>
            <p>If you’re in Scout, or you spot something wrong, write to <a href={correctionMail()}>{SCOUT_CONTACT}</a>. Every page also has a <em>Request a correction or removal</em> link with its name filled in.</p>
            <ul className="sm-list">
              <li><b>Factual errors</b> are fixed within five business days and recorded in the log below.</li>
              <li><b>Photos</b> come down on request, every time.</li>
              <li><b>Personal information</b> that shouldn’t be there comes down as soon as we see the request.</li>
              <li><b>Removing a whole page</b> is considered on request. Tell us why; we weigh it against the page’s value as analysis, and we answer every request.</li>
              <li><b>Objections</b> under privacy law (for example the GDPR) are handled as described in our <Link href="/privacy/#scout">privacy policy</Link>.</li>
            </ul>
          </section>

          <section className="sm-sec" id="log">
            <h2 className="pf-h2">Corrections log</h2>
            {LOG.length === 0 ? <p className="sm-empty">No corrections yet. Every correction, photo removal and page removal will be listed here with its date.</p> : (
              <ol className="sm-log">
                {LOG.map((e) => <li key={e.date + e.creator + e.what}><span className="sm-log-d">{day(e.date)}</span><span><b>{KIND[e.kind] ?? e.kind}: {e.creator}.</b> {e.what} <em>{e.why}</em></span></li>)}
              </ol>
            )}
          </section>
          <p className="pf-indep">See also our <Link href="/editorial-standards/">editorial standards</Link>, <Link href="/privacy/#scout">privacy policy</Link> and <Link href="/terms/#scout">terms</Link>.</p>
        </article>
      </main>
    </div>
  );
}
