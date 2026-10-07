import Link from 'next/link';

import { ArchiveScene, BuriedScene, MovedOnScene } from './gone-scenes';

// esy.com's 410 page, as three takes (2026-10-06, prototype at /prototypes/gone/).
// A 410 answers a retired URL: the page was here and was taken down on
// purpose. Each take keeps the 404's layout (light header, message, a reef in
// the footer world's place) and answers "what happened to it?" its own way.
//
//   A · Archive  — "This page was retired." Mason files the 410 slab in a crate
//                  and fits a fresh piece. Kept, not lost.
//   B · Buried   — "This page is gone for good." He buries the 410 slab beside
//                  his finished gate. It isn't coming back.
//   C · Moved on — "We've moved on from this page." The old slab lies overgrown
//                  while he builds; the links say what esy.com makes now.

export type GoneTake = 'archive' | 'buried' | 'moved-on';

const COPY: Record<GoneTake, { title: string; line: string }> = {
  archive: {
    title: 'This page was retired.',
    line: 'It was part of esy.com before the site became The Marketing Engineer. We took it down on purpose and kept it in our archive. Here’s what we make now.',
  },
  buried: {
    title: 'This page is gone for good.',
    line: 'We removed it on purpose when esy.com became The Marketing Engineer, and it isn’t coming back. These will get you somewhere useful.',
  },
  'moved-on': {
    title: 'We’ve moved on from this page.',
    line: 'esy.com is The Marketing Engineer now: articles, news and courses on building AI systems for marketing. Start with one of these.',
  },
};

// The same four ways back as the 404, so both pages point at the same places.
const LINKS = [
  { href: '/', text: 'Home', line: 'The front page' },
  { href: '/engineer/', text: 'The Marketing Engineer', line: 'Systems built on live sites, step by step' },
  { href: '/news/', text: 'AI Marketing News', line: 'What shipped, checked at the source' },
  { href: '/courses/', text: 'Courses', line: 'Build the systems yourself' },
];

const SCENES: Record<GoneTake, () => React.ReactNode> = { archive: ArchiveScene, buried: BuriedScene, 'moved-on': MovedOnScene };

/** The message and the way back: the 404's buttons, or (C) a card per section with a line on what it is. */
export function GoneMessage({ take }: { take: GoneTake }) {
  return (
    <div className="nf-msg">
      <p className="nf-kicker">410</p>
      <h1>{COPY[take].title}</h1>
      <p>{COPY[take].line}</p>
      {take === 'moved-on' ? (
        <nav className="gn-cards" aria-label="What esy.com makes now">
          {LINKS.slice(1).map((l) => (
            <Link key={l.href} href={l.href}>
              <b>{l.text}</b>
              <span>{l.line}</span>
            </Link>
          ))}
        </nav>
      ) : (
        <nav className="nf-links" aria-label="Where to go instead">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.text}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

/** The whole page body for one take: message, then its reef in the footer world's wrapper. */
export function GonePage({ take }: { take: GoneTake }) {
  const Scene = SCENES[take];
  return (
    <>
      <GoneMessage take={take} />
      <div className="fw bs-fw nf-world" aria-hidden="true">
        <Scene />
      </div>
    </>
  );
}
