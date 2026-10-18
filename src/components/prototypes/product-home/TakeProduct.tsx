'use client';

// P1 · The product up front (2026-10-18). The homepage as os.esy.com's front
// door, led the way AI-search products lead: a promise, the real screen
// (os.esy.com/agency/search, scaled like a screenshot), how it works, the
// three features, the work Esy does, proof from our own brands, then the
// publication as a band that sends readers to /newsletter.

import { ArrowRight, Plug, Search, Sparkles } from 'lucide-react';
import {
  AppShot, CitedPanel, DataPanel, MasonQuiet, NewsletterBand, PricingNote, ProductHeader, RankPanel, ThemeStrip, WorkPanel, signup, useTheme,
} from './parts';
import { CHECKS, PROOF } from './sample';

const TAKE = 'p1';

export default function TakeProduct() {
  const [theme, setTheme] = useTheme();
  return (
    <div className="ph" data-theme={theme} id="top">
      <section className="ph-night ph-hero1">
        <ProductHeader take={TAKE} onDark />
        <div className="ph-wrap ph-hero1-in">
          <p className="ph-kicker ph-kicker--on-dark">AI search for agencies and brands</p>
          <h1>See where AI answers cite your clients.</h1>
          <p className="ph-lede">Esy tracks every client in ChatGPT, Perplexity, Copilot and Google’s AI answers, beside their classic rankings and analytics. Then it does the work that moves them, and you approve it.</p>
          <div className="ph-ctas">
            <a href={signup(TAKE)} className="ph-btn ph-btn--bright">Get started <ArrowRight size={16} aria-hidden="true" /></a>
            <a href="#product" className="ph-link ph-link--on-dark">See the product</a>
          </div>
        </div>
        <div className="ph-wrap ph-hero1-shot">
          <MasonQuiet pose="point" className="ph-hero1-mason" />
          <AppShot />
        </div>
      </section>

      <section id="product" className="ph-steps">
        <div className="ph-wrap">
          <p className="ph-kicker">How it works</p>
          <h2>Connect. Track. Act.</h2>
          <ol className="ph-steps-list">
            <li><Plug size={20} aria-hidden="true" /><b>Connect</b><span>Add a client and connect Search Console, GA4 and Bing. Esy reads them every day.</span></li>
            <li><Search size={20} aria-hidden="true" /><b>Track</b><span>Esy asks the answer engines {CHECKS.questions} questions per client, {CHECKS.runs} times a week, and reads every citation.</span></li>
            <li><Sparkles size={20} aria-hidden="true" /><b>Act</b><span>It drafts the pages and outreach that win the next citation. Nothing goes out until you approve it.</span></li>
          </ol>
        </div>
      </section>

      <section className="ph-feature">
        <div className="ph-wrap ph-feature-in">
          <div className="ph-feature-copy">
            <p className="ph-kicker">AI answers</p>
            <h2>Know when an answer names your client.</h2>
            <p>Every week, see which questions cite which page, in which engine, and whether it’s more than last week.</p>
          </div>
          <CitedPanel rows={3} />
        </div>
      </section>

      <section className="ph-feature ph-feature--tint">
        <div className="ph-wrap ph-feature-in ph-feature-in--flip">
          <div className="ph-feature-copy">
            <p className="ph-kicker">Rankings</p>
            <h2>Rankings, AI and classic, side by side.</h2>
            <p>Google and Bing positions next to each client’s share of AI answers, with eight weeks of trend, so you see both kinds of search move together.</p>
          </div>
          <RankPanel rows={4} />
        </div>
      </section>

      <section className="ph-feature">
        <div className="ph-wrap ph-feature-in">
          <div className="ph-feature-copy">
            <p className="ph-kicker">Analytics</p>
            <h2>Every source in one place.</h2>
            <p>Search Console, GA4 and Bing, read for you, including the visits that come from AI answers.</p>
          </div>
          <DataPanel />
        </div>
      </section>

      <section className="ph-teal">
        <div className="ph-wrap ph-feature-in ph-feature-in--flip">
          <div className="ph-feature-copy">
            <p className="ph-kicker ph-kicker--on-dark">The work</p>
            <h2>The pages and outreach, done for you.</h2>
            <p>Esy writes the pages from your client’s own facts and sends the outreach that earns citations. You approve every one.</p>
          </div>
          <WorkPanel />
        </div>
      </section>

      <section className="ph-proof">
        <div className="ph-wrap">
          <p className="ph-kicker">Proof</p>
          <h2>We run it on our own brands first.</h2>
          <ul className="ph-proof-list">
            {PROOF.map((p) => <li key={p.line}><b>{p.big}</b><span>{p.line}</span><small>{p.small}</small></li>)}
          </ul>
        </div>
      </section>

      <PricingNote take={TAKE} />
      <NewsletterBand />

      <section className="ph-night ph-final">
        <div className="ph-wrap">
          <h2>Start with one client.</h2>
          <p>See where AI answers cite them this week.</p>
          <a href={signup(TAKE)} className="ph-btn ph-btn--bright">Get started <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </section>
      <ThemeStrip theme={theme} set={setTheme} />
    </div>
  );
}
