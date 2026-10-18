'use client';

// P2 · The morning paper (2026-10-18). The picked os.esy.com sign-in's
// metaphor, carried onto the homepage: the page is a front page about your
// clients in AI search. The lead story, the photo (Mason at his desk with the
// paper, os.esy.com public/auth/morning-paper.webp), then the paper's sections
// (AI answers, Rankings, Analytics, On your desk), each one a product feature.
// Mason stays in the photo and the editor's box, never the headline.

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ClientLogo } from './clients';
import {
  CitedPanel, DataPanel, MasonQuiet, NewsletterBand, PricingNote, ProductHeader, RankPanel, ThemeStrip, WorkPanel, signup, useTheme,
} from './parts';
import { CHECKS, CITED, CITATIONS, CLIENT_RANKS, PROOF, SAMPLE_NOTE } from './sample';

const TAKE = 'p2';

export default function TakePaper() {
  const [theme, setTheme] = useTheme();
  const lead = CITATIONS[0];
  const fern = CLIENT_RANKS[0];
  return (
    <div className="ph ph--paper" data-theme={theme} id="top">
      <ProductHeader take={TAKE} />

      <section className="ph-mast" aria-label="This week's front page">
        <div className="ph-wrap">
          <div className="ph-mast-line"><span>Sunday, October 18, 2026</span><span>This week in AI search</span><span>Sample edition</span></div>
          <h1 className="ph-mast-title">Your clients, on the front page of AI search.</h1>
          <p className="ph-mast-sub">Esy writes every client’s front page each week: where AI answers cite them, how they rank, and what changed.</p>
          <div className="ph-ctas ph-ctas--center">
            <a href={signup(TAKE)} className="ph-btn">Get started <ArrowRight size={16} aria-hidden="true" /></a>
            <a href="#product" className="ph-link">Read the sections</a>
          </div>
        </div>
      </section>

      <section className="ph-front">
        <div className="ph-wrap ph-front-in">
          <article className="ph-lead">
            <p className="ph-lead-kicker">Lead story · sample client</p>
            <ClientLogo id="fernvale" size={30} />
            <h2>Fernvale quoted in {CITED} AI answers this week.</h2>
            <p className="ph-lead-dek">{lead.engine} names it for “{lead.q}”. Google has it at #{fern.google}, and {fern.aiShare}% of the answers Esy checked mention it.</p>
            <figure className="ph-lead-photo">
              <Image src="/prototypes/product-home/morning-paper.webp" alt="Mason the octopus at his desk at night, a newspaper in one arm, the city lights behind him." width={1200} height={800} sizes="(max-width: 900px) 100vw, 640px" priority />
              <figcaption>Mason reads the week’s edition before you do.</figcaption>
            </figure>
          </article>
          <aside className="ph-front-side" aria-label="Also on the front page">
            <div className="ph-side-box">
              <p className="ph-side-h">Rankings</p>
              <RankPanel rows={3} compact />
            </div>
            <div className="ph-side-box">
              <p className="ph-side-h">Analytics</p>
              <DataPanel sources={false} />
            </div>
            <p className="ph-sample">{SAMPLE_NOTE}</p>
          </aside>
        </div>
      </section>

      <section id="product" className="ph-sections">
        <div className="ph-wrap">
          <p className="ph-section-rule"><span>The sections</span></p>
          <div className="ph-section-grid">
            <article>
              <h3>AI answers</h3>
              <p>Which questions cite which client, in ChatGPT, Perplexity, Copilot and Google’s AI answers. Esy asks {CHECKS.questions} questions per client, {CHECKS.runs} times a week.</p>
              <CitedPanel rows={3} />
            </article>
            <article>
              <h3>Rankings</h3>
              <p>Google and Bing positions next to each client’s share of AI answers, with eight weeks of trend.</p>
              <RankPanel rows={4} />
            </article>
            <article>
              <h3>Analytics</h3>
              <p>Search Console, GA4 and Bing, read every day, including visits that came from AI answers.</p>
              <DataPanel />
            </article>
            <article>
              <h3>On your desk</h3>
              <p>The pages and outreach Esy drafted to win the next citation, waiting for your OK.</p>
              <WorkPanel />
            </article>
          </div>
        </div>
      </section>

      <section className="ph-editor">
        <div className="ph-wrap ph-editor-in">
          <MasonQuiet pose="rest" className="ph-editor-mason" />
          <div>
            <p className="ph-kicker ph-kicker--on-dark">From the editor’s desk</p>
            <h2>We print our own paper first.</h2>
            <ul className="ph-proof-list ph-proof-list--dark">
              {PROOF.map((p) => <li key={p.line}><b>{p.big}</b><span>{p.line}</span><small>{p.small}</small></li>)}
            </ul>
          </div>
        </div>
      </section>

      <PricingNote take={TAKE} />
      <NewsletterBand />
      <ThemeStrip theme={theme} set={setTheme} />
    </div>
  );
}
