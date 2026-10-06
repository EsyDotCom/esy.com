import Link from 'next/link';

import { InkScene, PieceScene } from './scenes';

// esy.com's 404, as parts (2026-10-06), the same as docs.esy.com's. A message
// with the way back, and a reef world told by Mason that takes the footer
// world's place: on a page with an .nf-world, the usual footer world steps
// aside (not-found.css), so the footer card floats over this one instead.
//
//   NotFoundPiece — B · Missing piece: live as esy.com's 404.
//   NotFoundInk   — C · Ink.
// The three takes were compared on docs.esy.com/prototypes/not-found.

export type NotFoundTake = 'piece' | 'ink';

const COPY: Record<NotFoundTake, { title: string; line: string }> = {
  piece: {
    title: 'That piece isn’t here.',
    line: 'We looked for the page you asked for, and it isn’t on esy.com. Try one of these instead.',
  },
  ink: {
    title: 'This page vanished in a cloud of ink.',
    line: 'Octopuses ink when something startles them. This link startled us: there’s no page at this address. These will get you back on course.',
  },
};

const SCENES: Record<NotFoundTake, () => React.ReactNode> = { piece: PieceScene, ink: InkScene };

/** The message and the way back. */
export function NotFoundMessage({ take }: { take: NotFoundTake }) {
  return (
    <div className="nf-msg">
      <p className="nf-kicker">404</p>
      <h1>{COPY[take].title}</h1>
      <p>{COPY[take].line}</p>
      <nav className="nf-links" aria-label="Where to go instead">
        <Link href="/">Home</Link>
        <Link href="/engineer/">The Marketing Engineer</Link>
        <Link href="/news/">AI Marketing News</Link>
        <Link href="/courses/">Courses</Link>
      </nav>
    </div>
  );
}

/** The reef that tells the 404, in the footer world's wrapper. */
export function NotFoundWorld({ take }: { take: NotFoundTake }) {
  const Scene = SCENES[take];
  return (
    <div className="fw bs-fw nf-world" aria-hidden="true">
      <Scene />
    </div>
  );
}

/** B · Missing piece: Mason tries a piece marked 404 in his gate, and it doesn't fit. */
export function NotFoundPiece() {
  return (
    <>
      <NotFoundMessage take="piece" />
      <NotFoundWorld take="piece" />
    </>
  );
}

/** C · Ink: a cloud of ink clears to show 4-0-4 set in slabs on the seabed. */
export function NotFoundInk() {
  return (
    <>
      <NotFoundMessage take="ink" />
      <NotFoundWorld take="ink" />
    </>
  );
}
