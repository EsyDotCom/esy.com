'use client';

// P3 · Agencies and brands, two doors (2026-10-18). The hero splits into the
// two people Esy serves: an agency with clients (Morgan) and a brand that
// wants to be the answer. Picking a door swaps the feature rows below; then
// the product, AI search beside classic SEO tracking, pricing, and questions.

import { useState } from 'react';
import { ArrowRight, Building2, Check, Store } from 'lucide-react';
import { ClientLogo, ClientMark, CLIENTS, type ClientId } from './clients';
import {
  AppShot, CitedPanel, DataPanel, MasonQuiet, NewsletterBand, PricingNote, ProductHeader, RankPanel, ThemeStrip, WorkPanel, signup, useTheme,
} from './parts';
import { CHECKS, CITATIONS, CLIENT_RANKS } from './sample';

const TAKE = 'p3';
type Door = 'agency' | 'brand';

const ROWS: Record<Door, { kicker: string; title: string; body: string; panel: 'cited' | 'rank' | 'data' | 'work' }[]> = {
  agency: [
    { kicker: 'Every client', title: 'Every client’s AI citations, on one screen.', body: 'Add each client once. Esy checks where AI answers cite them every week, so you can show it in your report.', panel: 'cited' },
    { kicker: 'Rankings', title: 'AI and classic rankings, per client.', body: 'Google and Bing positions beside each client’s share of AI answers, with eight weeks of trend.', panel: 'rank' },
    { kicker: 'The work', title: 'Pages and outreach, drafted for your OK.', body: 'Esy writes from each client’s own facts and drafts the outreach. You approve, it ships.', panel: 'work' },
  ],
  brand: [
    { kicker: 'Your brand', title: 'See where AI answers cite you.', body: 'Esy asks ChatGPT and Perplexity the questions your buyers ask, and reads Copilot and Google’s AI answers.', panel: 'cited' },
    { kicker: 'Your search data', title: 'Search Console, GA4 and Bing, read for you.', body: 'Clicks, impressions and the visits that came from AI answers, in one place.', panel: 'data' },
    { kicker: 'Rankings', title: 'Know when you move, in both kinds of search.', body: 'Your Google and Bing positions next to your share of AI answers.', panel: 'rank' },
  ],
};

const COMPARE: { row: string; ai: string; seo: string }[] = [
  { row: 'What it measures', ai: 'Whether an answer names or quotes your page', seo: 'Your position in a list of links' },
  { row: 'Where', ai: 'ChatGPT, Perplexity, Copilot, Google’s AI answers', seo: 'Google and Bing results' },
  { row: 'How often', ai: `${CHECKS.questions} questions, ${CHECKS.runs} runs a week, per client`, seo: 'Daily from Search Console and Bing' },
  { row: 'What you do about it', ai: 'Pages written from your facts, outreach that earns citations', seo: 'Pages and fixes that move positions' },
];

const FAQ: { q: string; a: string }[] = [
  { q: 'Which AI answers does Esy check?', a: `ChatGPT and Perplexity, asked ${CHECKS.questions} questions per client ${CHECKS.runs} times a week through their APIs; Copilot’s citations from Bing’s weekly export; Google’s AI answers from Search Console. Not Gemini: its terms forbid analysing its answers.` },
  { q: 'What do I need to connect?', a: 'Google Search Console, Google Analytics 4 and Bing Webmaster Tools. Each takes a minute, and Esy reads them from then on.' },
  { q: 'Who does the work?', a: 'Esy drafts the pages and the outreach. A person approves every one before it goes out.' },
  { q: 'Is it for agencies or brands?', a: 'Both. Agencies add each client; a brand adds itself. The screens are the same.' },
];

function Panel({ kind }: { kind: 'cited' | 'rank' | 'data' | 'work' }) {
  if (kind === 'cited') return <CitedPanel rows={3} />;
  if (kind === 'rank') return <RankPanel rows={4} />;
  if (kind === 'data') return <DataPanel />;
  return <WorkPanel />;
}

/** The agency door's preview: four clients, each with this week's citations. */
function AgencyPreview() {
  const cites = (id: ClientId) => CITATIONS.filter((c) => c.client === id).length;
  return (
    <ul className="ph-door-list">
      {CLIENT_RANKS.map((r) => (
        <li key={r.client}><ClientMark id={r.client} size={24} /><span>{CLIENTS[r.client].name}</span><em>{cites(r.client) || '–'} cited · {r.aiShare}% of answers</em></li>
      ))}
    </ul>
  );
}

/** The brand door's preview: one brand, where it was cited. */
function BrandPreview() {
  const c = CITATIONS.find((x) => x.client === 'juniper')!;
  return (
    <div className="ph-door-brand">
      <ClientLogo id="juniper" size={28} />
      <p><q>{c.q}</q><span>{c.engine} cites juniperlanedental.com</span></p>
    </div>
  );
}

export default function TakeDoors() {
  const [theme, setTheme] = useTheme();
  const [door, setDoor] = useState<Door>('agency');
  return (
    <div className="ph" data-theme={theme} id="top">
      <section className="ph-night ph-hero3">
        <ProductHeader take={TAKE} onDark />
        <div className="ph-wrap ph-hero3-in">
          <h1>Be the answer AI search gives.</h1>
          <p className="ph-lede">Esy tracks where ChatGPT, Perplexity, Copilot and Google’s AI answers cite you, beside your classic rankings, and does the work that earns the next one.</p>
          <div className="ph-doors" role="tablist" aria-label="Who it’s for">
            <button role="tab" aria-selected={door === 'agency'} className={`ph-door${door === 'agency' ? ' is-on' : ''}`} onClick={() => setDoor('agency')}>
              <span className="ph-door-k"><Building2 size={16} aria-hidden="true" /> For agencies</span>
              <b>Track every client.</b>
              <AgencyPreview />
            </button>
            <button role="tab" aria-selected={door === 'brand'} className={`ph-door${door === 'brand' ? ' is-on' : ''}`} onClick={() => setDoor('brand')}>
              <span className="ph-door-k"><Store size={16} aria-hidden="true" /> For brands</span>
              <b>See where AI answers cite you.</b>
              <BrandPreview />
            </button>
          </div>
          <p className="ph-sample ph-sample--dark">Sample clients and numbers.</p>
        </div>
      </section>

      <section id="product" className="ph-rows" aria-live="polite">
        <div className="ph-wrap">
          <p className="ph-kicker">{door === 'agency' ? 'For agencies' : 'For brands'}</p>
          {ROWS[door].map((r, i) => (
            <div key={r.title} className={`ph-feature-in${i % 2 ? ' ph-feature-in--flip' : ''} ph-row`}>
              <div className="ph-feature-copy">
                <p className="ph-kicker">{r.kicker}</p>
                <h2>{r.title}</h2>
                <p>{r.body}</p>
              </div>
              <Panel kind={r.panel} />
            </div>
          ))}
          <a href={signup(`${TAKE}-${door}`)} className="ph-btn">{door === 'agency' ? 'Add your first client' : 'Add your brand'} <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="ph-feature--tint ph-demo">
        <div className="ph-wrap">
          <p className="ph-kicker">The product</p>
          <h2>This is what you’ll see on Monday.</h2>
          <AppShot tab="Rankings" />
        </div>
      </section>

      <section className="ph-compare">
        <div className="ph-wrap">
          <p className="ph-kicker">AI search and classic SEO</p>
          <h2>Two kinds of search. One place to track both.</h2>
          <div className="ph-table-wrap">
            <table className="ph-ctable">
              <thead><tr><th scope="col"><span className="ph-sr">Compare</span></th><th scope="col">AI search</th><th scope="col">Classic SEO</th></tr></thead>
              <tbody>
                {COMPARE.map((c) => <tr key={c.row}><th scope="row">{c.row}</th><td>{c.ai}</td><td>{c.seo}</td></tr>)}
                <tr className="ph-ctable-esy"><th scope="row">In Esy</th><td><Check size={16} aria-hidden="true" /> Tracked</td><td><Check size={16} aria-hidden="true" /> Tracked</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <PricingNote take={TAKE} />

      <section className="ph-faq">
        <div className="ph-wrap ph-faq-in">
          <div>
            <p className="ph-kicker">Questions</p>
            <h2>What people ask first.</h2>
            <MasonQuiet pose="rest" className="ph-faq-mason" />
          </div>
          <div className="ph-faq-list">
            {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>

      <NewsletterBand />
      <ThemeStrip theme={theme} set={setTheme} />
    </div>
  );
}
