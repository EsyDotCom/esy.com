import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MousePointerClick } from 'lucide-react';
import LightHeader from '@/components/LightHeader/LightHeader';
import { PROTOTYPES, type Prototype, type PrototypeVariant } from '@/components/prototypes/registry';
import '@/components/prototypes/prototypes.css';

const TITLE = 'We built five versions of the Esy homepage — Esy prototypes';
const DESCRIPTION =
  'Five working versions of the esy.com homepage hero, each with a live copy of Esy OS inside. Open any one and try it: hover the chart, switch to dark mode, let the questions play.';

// Shared on LinkedIn, so the title, description and card (opengraph-image.tsx)
// carry the page. Still noindex (from the layout): it's for people with the link.
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/prototypes/', siteName: 'Esy' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
};

const hrefOf = (p: Prototype, v: PrototypeVariant) => `/prototypes/${p.slug}/${v.slug}/`;

// The index as a showcase: the newest prototype's story first (what we built,
// how we narrowed it, what shipped), then every variant as a card with a
// picture and one obvious thing to click.
export default function PrototypesIndex() {
  const list = [...PROTOTYPES].sort((a, b) => b.date.localeCompare(a.date));
  const [latest] = list;
  const shipped = latest.variants.find((v) => v.live);

  return (
    <div className="proto">
      <LightHeader />
      <main>
        {/* ── What this is, and the one thing to do ─────────────────────── */}
        <section className="pi-hero">
          <div className="pi-wrap">
            <span className="pi-kicker">Esy prototypes · {latest.name}</span>
            <h1>{latest.headline}</h1>
            <p className="pi-intro">{latest.intro}</p>
            <div className="pi-actions">
              {shipped && (
                <Link href={hrefOf(latest, shipped)} className="pi-btn pi-btn--primary">
                  Try the one we shipped <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
              <a href="#versions" className="pi-btn pi-btn--ghost">
                See all five
              </a>
            </div>

            {/* The process in three steps, so the letters make sense. */}
            <ol className="pi-steps" aria-label="How we got there">
              {latest.rounds.map((r) => (
                <li key={r.n}>
                  <span className="n">{r.n}</span>
                  <span>
                    <b>{r.title}</b>
                    <small>
                      {latest.variants
                        .filter((v) => v.round === r.n)
                        .map((v) => (v.mergeOf ? `${v.key} = ${v.mergeOf.join(' + ')}` : v.key))
                        .join(r.n === 1 ? ', ' : ' · ')}
                    </small>
                  </span>
                </li>
              ))}
              {shipped && (
                <li className="is-live">
                  <span className="n">✓</span>
                  <span>
                    <b>Shipped</b>
                    <small>
                      {shipped.key} is live on{' '}
                      <Link href={shipped.liveHref ?? '/'} className="pi-inline">
                        esy.com
                      </Link>
                    </small>
                  </span>
                </li>
              )}
            </ol>
          </div>
        </section>

        {/* ── The shipped one, big ──────────────────────────────────────── */}
        {shipped && (
          <section className="pi-wrap pi-featured-wrap" aria-label="The version we shipped">
            <div className="pi-featured">
              <Link href={hrefOf(latest, shipped)} className="pi-shot" aria-label={`Try ${shipped.key} · ${shipped.name}`}>
                <Image src={shipped.image} alt="" width={1200} height={750} priority sizes="(max-width: 900px) 100vw, 720px" />
                <span className="pi-shot-cta" aria-hidden="true">
                  <MousePointerClick size={16} /> Try it
                </span>
              </Link>
              <div className="pi-featured-body">
                <span className="pi-live">Live on esy.com</span>
                <span className="pi-key">
                  {shipped.key} · {shipped.name}
                  {shipped.mergeOf && <em> ({shipped.mergeOf.join(' + ')})</em>}
                </span>
                <h2>{shipped.title}</h2>
                <p>{shipped.blurb}</p>
                <div className="pi-actions">
                  <Link href={hrefOf(latest, shipped)} className="pi-btn pi-btn--primary">
                    Try the prototype <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link href={shipped.liveHref ?? '/'} className="pi-btn pi-btn--ghost">
                    See it on esy.com <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Every version, round by round ─────────────────────────────── */}
        {list.map((p) => (
          <section key={p.slug} id={p === latest ? 'versions' : p.slug} className="pi-wrap pi-rounds">
            {p !== latest && <h2 className="pi-proto-name">{p.name}</h2>}
            {p.rounds.map((r) => (
              <div key={r.n} className="pi-round">
                <div className="pi-round-head">
                  <span className="pi-round-n">Round {r.n}</span>
                  <h3>{r.title}</h3>
                  <p>{r.summary}</p>
                </div>
                <div className="pi-grid">
                  {p.variants
                    .filter((v) => v.round === r.n)
                    .map((v) => (
                      <Link key={v.slug} href={hrefOf(p, v)} className={`pi-card ${v.live ? 'is-live' : ''}`}>
                        <span className="pi-card-shot">
                          <Image src={v.image} alt="" width={1200} height={750} sizes="(max-width: 700px) 100vw, 380px" />
                          {v.live && <span className="pi-live">Live</span>}
                        </span>
                        <span className="pi-card-body">
                          <span className="pi-key">
                            {v.key} · {v.name}
                            {v.mergeOf && <em> ({v.mergeOf.join(' + ')})</em>}
                          </span>
                          <span className="pi-card-title">{v.title}</span>
                          <span className="pi-card-blurb">{v.blurb}</span>
                          <span className="pi-card-cta">
                            Try it <ArrowRight size={15} aria-hidden="true" />
                          </span>
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </section>
        ))}

        {/* ── Where this leads ──────────────────────────────────────────── */}
        <section className="pi-wrap">
          <div className="pi-close">
            <div>
              <h2>Esy OS runs your AI workers and keeps the books.</h2>
              <p>What they made, what it cost for each client, and what&apos;s waiting for your sign-off, on one page.</p>
            </div>
            <Link href="/waitlist/?src=prototypes" className="pi-btn pi-btn--light">
              Join the waitlist <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
