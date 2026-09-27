import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { metadata as homeMetadata } from '@/app/page';
import '@/components/prototypes/og-preview.css';

// One share-card direction, shown the three ways people meet it: full size,
// in a feed post, and as a chat-app link preview. The card is the real PNG from
// ./card/, rendered by src/lib/og/newsletterCards.tsx. The title and
// description beside it are the homepage's own, so the previews read exactly
// as a share of esy.com would.

const prototype = findPrototype('og')!;
const HOME_TITLE = String(homeMetadata.title);
const HOME_DESCRIPTION = String(homeMetadata.description);

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Share card ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function OgVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  if (!v) notFound();
  const card = `/prototypes/og/${v.slug}/card/`;

  return (
    <div className="proto">
      <LightHeader />
      <main className="og-page pi-wrap">
        {/* ── What this direction is ──────────────────────────────────── */}
        <header className="og-head">
          <p className="pi-kicker">
            Share card {v.key} · {v.name}
          </p>
          <h1>{v.title}</h1>
          <p className="og-blurb">{v.blurb}</p>
        </header>

        {/* ── Full size: the real 1200×630 image ───────────────────────── */}
        <section className="og-block" aria-labelledby="og-full">
          <h2 id="og-full">Full size</h2>
          {/* eslint-disable-next-line @next/next/no-img-element -- the generated PNG, shown exactly as platforms fetch it */}
          <img className="og-full" src={card} width={1200} height={630} alt={`Share card ${v.key}: ${v.title}`} />
          <p className="og-note">
            1200 × 630, the size LinkedIn, X, Slack and iMessage fetch. <a className="pi-inline" href={card}>Open the PNG</a>.
          </p>
        </section>

        <div className="og-grid">
          {/* ── In a feed: roughly how a LinkedIn or X post shows a link ── */}
          <section className="og-block" aria-labelledby="og-feed">
            <h2 id="og-feed">In a feed</h2>
            <article className="og-post">
              <div className="og-post-head">
                {/* eslint-disable-next-line @next/next/no-img-element -- small static avatar */}
                <img src="/images/og/zev-uhuru-360.jpg" alt="" width={44} height={44} className="og-post-avatar" />
                <div>
                  <b>Zev Uhuru</b>
                  <span>Marketing Engineering · 1h</span>
                </div>
              </div>
              <p className="og-post-text">This week&apos;s issue is out: one AI marketing system, built step by step. Free to subscribe.</p>
              <div className="og-link">
                {/* eslint-disable-next-line @next/next/no-img-element -- the card under test */}
                <img src={card} alt="" width={1200} height={630} />
                <div className="og-link-meta">
                  <b>{HOME_TITLE}</b>
                  <span>esy.com</span>
                </div>
              </div>
            </article>
            <p className="og-note">Approximate. Each platform draws its own frame around the image.</p>
          </section>

          {/* ── In a chat app: the small unfurl where most shares end up ── */}
          <section className="og-block" aria-labelledby="og-chat">
            <h2 id="og-chat">In a chat app</h2>
            <div className="og-chat">
              <p className="og-chat-msg">
                worth subscribing to <span className="pi-inline">https://esy.com</span>
              </p>
              <div className="og-unfurl">
                <b>Esy</b>
                <span className="og-unfurl-title">{HOME_TITLE}</span>
                <span className="og-unfurl-desc">{HOME_DESCRIPTION}</span>
                {/* eslint-disable-next-line @next/next/no-img-element -- the card at chat size */}
                <img src={card} alt="" width={1200} height={630} />
              </div>
            </div>
            <p className="og-note">At about 300px wide, only the biggest words survive. That&apos;s the real test.</p>
          </section>
        </div>
      </main>
      <PrototypeBar prototype={prototype} current={v.slug} />
    </div>
  );
}
