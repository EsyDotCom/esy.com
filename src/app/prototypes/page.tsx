import Link from 'next/link';
import LightHeader from '@/components/LightHeader/LightHeader';
import { PROTOTYPES } from '@/components/prototypes/registry';
import '@/components/prototypes/prototypes.css';

export const metadata = { title: 'Prototypes — Esy' };

// Every prototype and its variants, newest first. Cards open the variant in
// the real site chrome.
export default function PrototypesIndex() {
  const list = [...PROTOTYPES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="proto">
      <LightHeader />
      <main className="proto-index">
        <span className="k">Esy prototypes</span>
        <h1>Directions we clicked through</h1>
        <p>
          Each prototype is a few working directions, built with the real product&apos;s UI and sample data, so they can
          be compared by using them rather than by looking at mockups. The one marked Live is on the site.
        </p>
        {list.map((p) => (
          <section key={p.slug}>
            <h2>
              {p.name} · {p.date}
            </h2>
            <p className="proto-summary">{p.summary}</p>
            <div className="proto-cards">
              {p.variants.map((v) => (
                <Link key={v.slug} href={`/prototypes/${p.slug}/${v.slug}/`} className="proto-card">
                  {v.live && <span className="live">Live</span>}
                  <span className="k">
                    {v.key} · {v.name}
                  </span>
                  <span className="t">{v.title}</span>
                  <span className="d">{v.blurb}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
