/* The face-shape sheet: Zev's photo at every size and in every frame the site
 * uses, under the take's shape, so a shape is judged at 34px as well as 440px.
 * It sits under the real homepage hero on each take's page. The article
 * pieces are the real ones (Byline, ArticleEnd) on the newest real articles;
 * the header menu's byline repeats LightHeader's markup. */

import Image from 'next/image';
import { ArticleEnd, Byline } from '@/components/ArticleImage/shared';
import type { AgenticVideo } from '@/data/agentic-videos';
import type { FaceShapeTake } from './shapes';

// Every size the photo appears at on the site, and where.
const SIZES: { px: number; where: string }[] = [
  { px: 34, where: 'Header menu' },
  { px: 44, where: 'Byline' },
  { px: 72, where: 'Article end' },
  { px: 112, where: 'Phone hero' },
  { px: 144, where: 'Who writes it' },
];

function Chip({ px, ring = false, keep = false }: { px: number; ring?: boolean; keep?: boolean }) {
  return (
    <span className={`fsh-chip${ring ? ' fsh-chip--ring' : ''}${keep ? ' fsh-keep' : ''}`} style={{ width: px, height: px }}>
      <Image src="/images/zev-uhuru.png" alt="" width={px * 2} height={px * 2} />
    </span>
  );
}

function Ladder({ ring = false }: { ring?: boolean }) {
  return (
    <div className="fsh-ladder">
      {SIZES.map((s) => (
        <span className="fsh-rung" key={s.px}>
          <Chip px={s.px} ring={ring} />
          {s.where} · {s.px}
        </span>
      ))}
    </div>
  );
}

export default function FaceSheet({ take, articles }: { take: FaceShapeTake; articles: AgenticVideo[] }) {
  const newest = articles[0];
  return (
    <section className="fsh-sheet" aria-labelledby="fsh-title">
      <div className="nl-container">
        <div className="fsh-sheet-head">
          <div>
            <p className="nl-eyebrow">Prototype · the face, everywhere it appears</p>
            <h2 className="nl-title" id="fsh-title">{take.name}</h2>
            <p className="nl-lede">{take.why}</p>
          </div>
          {/* Today's circle beside the take, at one size. */}
          <div className="fsh-versus" aria-label="Today and this take">
            <span className="fsh-rung"><Chip px={88} keep />Today · circle</span>
            <span className="fsh-rung"><Chip px={88} />{take.name}</span>
          </div>
        </div>

        <div className="fsh-grid">
          <div className="fsh-card fsh-card--wide">
            <p className="fsh-card-label">Every size, on paper</p>
            <Ladder />
          </div>
          <div className="fsh-card fsh-card--dark fsh-card--wide">
            <p className="fsh-card-label">Every size, on navy, with the jade ring</p>
            <Ladder ring />
          </div>

          <div className="fsh-card">
            <p className="fsh-card-label">In an article</p>
            {newest && <Byline publishedAt={newest.publishedAt} minutes={8} />}
            <ArticleEnd related={articles.slice(0, 2)} />
          </div>
          <div className="fsh-card fsh-card--dark">
            <p className="fsh-card-label">The header menu and a cover byline</p>
            <div className="nav-agentic-byline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/zev-uhuru.png" alt="" className="nav-agentic-avatar" />
              <div className="nav-agentic-byline-text">
                <span className="nav-agentic-byline-name">Zev Uhuru</span>
                <span className="nav-agentic-byline-role">Agentic Engineer</span>
              </div>
            </div>
            {newest && <Byline publishedAt={newest.publishedAt} minutes={8} onDark />}
          </div>
        </div>

        <p className="fsh-note">
          Only the frame changes: the photo, the homepage and every component here are the real ones, and the header
          menu&apos;s photo changes too. The articles are the newest real ones; the 8 min read is a sample.
        </p>
      </div>
    </section>
  );
}
