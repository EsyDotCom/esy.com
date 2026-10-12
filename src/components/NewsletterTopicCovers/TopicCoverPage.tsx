/* One take of the topic covers (2026-10-11): the issue page's cover header (L3,
 * the shipped issue layout, its own classes) with the take's art behind the
 * title, then a sheet with both topics' covers moving and still. */

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CoverArt, type TakeId } from './covers';
import { ROUND_ONE_TOPICS, TOPIC_ISSUES, TOPIC_NAMES, dateLabel, type TopicIssue } from './topics';

export interface TopicTake {
  key: string;
  name: string;
  idea: string;
  motion: string;
}

export const TOPIC_TAKES: Record<TakeId, TopicTake> = {
  mason: {
    key: 'A',
    name: 'Mason at work',
    idea: 'The course cover’s room, with Mason doing the topic’s work. Dots leave his screen for jobs around the room; Muse works through a long task on his second screen while he types, then asks for his OK.',
    motion: 'Drawn in code, so it moves for free on the site. For email it goes as a still or a short GIF recorded from the page.',
  },
  type: {
    key: 'B',
    name: 'Type',
    idea: 'The topic’s name is the cover, set huge in our stencil type. The full stop in “dots.” splits into a linked team; the night passes over “muse” while its steps fill in and a ring waits for your OK.',
    motion: 'Drawn in code, so it moves for free on the site, and it’s the easiest to keep as a series: one word, one motion per issue.',
  },
  room: {
    key: 'C',
    name: 'The room',
    idea: 'The live covers’ desk at night with no one in it and the screen off, edited with gpt-image-2.5 Sunburst so the room stays the same: glowing dots travelling across the desk, or a phone waiting for an OK.',
    motion: 'A photo, so it moves only through a video model (a few seconds of the dots rolling, or the phone lighting up). A still until then.',
  },
  scene: {
    key: 'D',
    name: 'Scene',
    idea: 'The live covers’ desk at night with the topic’s own characters at work on it, and nothing else on the cover. Dots: the night crew, five Dots along the desk’s edge, each on a small job. Muse: Jolly working late, the phone lit and waiting for an OK. Clay + Claude Code: raw clay riding a conveyor out as contact cards, under an orange terminal.',
    motion: 'A photo: a few seconds from a video model would bring it alive (the Dots swinging their legs and passing the card along, Jolly typing, the clay rolling down the belt). A still until then.',
  },
  tagged: {
    key: 'E',
    name: 'Tagged',
    idea: 'D’s scene, branded: the product’s own logo and name on a white chip in the corner. (Its colours ran along the bottom edge until round 3 took them off.)',
    motion: 'The same as D: a still, or a few seconds from a video model, with the chip and rule laid on after.',
  },
  poster: {
    key: 'F',
    name: 'Poster',
    idea: 'The characters cut out of D’s scene onto the product’s own colour, sitting on a ledge, with a four-word hook: “The team that never logs off.”, “Works late. Asks first.”, “Raw lists in. Leads out.”',
    motion: 'Cut-outs, so they can move in code on the site (the Dots swing their legs, the belt rolls) and still read as a still in email.',
  },
  glow: {
    key: 'G',
    name: 'Glow',
    idea: 'E’s idea in the room itself: the product’s logo lit on the wall behind the desk like a sign, its light spilling on the wall, the name beneath.',
    motion: 'A video model would let the sign flicker on as the scene starts; until then a still.',
  },
  screen: {
    key: 'H',
    name: 'On screen',
    idea: 'The product is what’s running: its logo and name lit on the monitor, lighting the desk a little (Dots and Clay on a dark screen, Muse on its pale one).',
    motion: 'A still, or the screen waking from black in a few seconds of video.',
  },
  bug: {
    key: 'I',
    name: 'Bug',
    idea: 'The quietest tag: only the logo, small, in the top-right corner like a channel’s mark. The characters do the rest.',
    motion: 'A still; the mark stays put if the scene is animated.',
  },
  credit: {
    key: 'J',
    name: 'Credit',
    idea: 'An editorial credit, top right: the logo, then “OPENAI · DOTS” spaced out in small capitals over a hairline, like a magazine’s photo credit.',
    motion: 'A still; the credit stays put if the scene is animated.',
  },
  'night-chip': {
    key: 'K',
    name: 'Night chip',
    idea: 'E’s chip made for the night scene: dark glass with a faint edge, white words, and the logo with a soft halo of its own colour.',
    motion: 'A still; the chip stays put if the scene is animated.',
  },
  'glow-app': {
    key: 'L',
    name: 'Glow + app',
    idea: 'G’s sign on the wall, and on the monitor the kind of app the issue is about, at work: the Dots’ background tasks in their own colours, Muse’s long plan waiting on an OK, Claude Code filling a Clay table. The screens are stand-ins drawn for the prototype; a real issue would use a screenshot from the setup it describes.',
    motion: 'A still, or a few seconds of video with the screen baked back on each frame (video models garble UI), the way the homepage hero’s screen is made.',
  },
  'camo-drawn': {
    key: 'M',
    name: 'Camouflage · Drawn',
    idea: 'An octopus changes its skin to match where it is, so Mason takes on the issue’s product: the five Dots’ colours as diamond spots, Meta’s blue with Jolly’s cream, a clay body with a Claude-orange mantle. The product’s own logo rides on a luggage tag from one arm. Drawn in code, in the course covers’ night room.',
    motion: 'Drawn in code, so it moves for free on the site: his arms curl, he blinks, the spots shimmer in turn. For email it goes as a still.',
  },
  'camo-toy': {
    key: 'N',
    name: 'Camouflage · Toy',
    idea: 'M’s Mason made a real vinyl toy on the live covers’ desk, in the same world as the Dots and Jolly scenes. The figure was placed flat on the photo and turned 3D with gpt-image-2.5, so his shape stays his; the logo is laid on the tag afterwards, from the company’s own file.',
    motion: 'A photo: a few seconds from a video model would bring it alive (the spots shimmering, the tag swinging), with the tag’s logo laid back on each frame.',
  },
  'camo-felt': {
    key: 'O',
    name: 'Camouflage · Felt',
    idea: 'The same, made a handmade felt toy: softer and warmer than the vinyl, still his stencil shape and the product’s colours.',
    motion: 'As N: a still, or a few seconds of video with the logo laid back on each frame.',
  },
  net: {
    key: 'P',
    name: 'Network',
    idea: 'No character: glossy vinyl shapes cut at our 45°, joined by glowing light, each issue’s idea as a system. Dots, five coloured nodes wired to one hub; Muse, a path that lights up step by step and stops at a gate, waiting for an OK; Clay + Claude Code, rough lumps that go through a network and come out as precise tiles. The product’s own logo rides on a dark glass chip.',
    motion: 'A photo: a few seconds from a video model would send the light along the tubes. A still until then.',
  },
  sys: {
    key: 'Q',
    name: 'Systems',
    idea: 'The same vinyl and light, as wider systems: a hub with eight cables out to its modules, a city grid of light pulses with one block waiting, a lattice that runs from rough at the bottom to precise at the top.',
    motion: 'As P: light running through the system, from a video model; a still until then.',
  },
};

/** Round 1 (A–C) was drawn for Muse and Dots; round 2 (D–F) adds Clay + Claude Code. */
const ROUND_TWO: TakeId[] = ['scene', 'tagged', 'poster', 'glow', 'screen', 'bug', 'credit', 'night-chip', 'glow-app', 'camo-drawn', 'camo-toy', 'camo-felt', 'net', 'sys'];

function CoverHeader({ issue, take }: { issue: TopicIssue; take: TakeId }) {
  // Round 2 on is a 16:9 picture: the header shows all of it beside the title, never cropped.
  const whole = ROUND_TWO.includes(take);
  return (
    <header className={`nlp-cover has-cover tc-cover${whole ? ' tc-cover--whole' : ''}`}>
      <div className="tc-cover-art">
        <CoverArt take={take} topic={issue.id} />
      </div>
      {/* The live covers' shade: the title gets the left, the art the right. */}
      <div className="tc-cover-shade" aria-hidden="true" />
      <div className="nlp-cover-in tc-cover-in">
        <Link href="/prototypes/newsletter-topic-cover/" className="nlp-back nlp-back--dark"><ArrowLeft size={14} aria-hidden="true" /> All takes</Link>
        <div className="nlp-cover-grid">
          <span className="nlp-cover-n" aria-hidden="true">{String(issue.n).padStart(2, '0')}</span>
          <div>
            <p className="nlp-cover-kicker">The Marketing Engineer · No. {issue.n} · {dateLabel(issue.date)} · {issue.minutes} min</p>
            <h1 className="nlp-cover-title">{issue.title}</h1>
            <p className="nlp-cover-dek">{issue.dek}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export const issuesFor = (take: TakeId) =>
  ROUND_TWO.includes(take) ? TOPIC_ISSUES : TOPIC_ISSUES.filter((i) => ROUND_ONE_TOPICS.includes(i.id));

export default function TopicCoverPage({ take, issue: asked }: { take: TakeId; issue: TopicIssue }) {
  const t = TOPIC_TAKES[take];
  const issues = issuesFor(take);
  const issue = issues.includes(asked) ? asked : issues[0];
  return (
    <main className="nlp">
      <CoverHeader issue={issue} take={take} />
      <section className="tc-sheet" aria-labelledby="tc-sheet-title">
        <div className="nl-container">
          <div className="tc-sheet-head">
            <div>
              <p className="nl-eyebrow">Prototype · newsletter covers by topic</p>
              <h2 className="nl-title" id="tc-sheet-title">{t.key} · {t.name}</h2>
              <p className="nl-lede">{t.idea}</p>
            </div>
            {/* Two issues, two covers: see either one on the issue page. */}
            <nav className="tc-toggle" aria-label="Which issue">
              {issues.map((i) => (
                <Link key={i.id} href={`/prototypes/newsletter-topic-cover/${take}/?topic=${i.id}`} aria-current={i.id === issue.id ? 'page' : undefined}>
                  No. {i.n} · {TOPIC_NAMES[i.id]}
                </Link>
              ))}
            </nav>
          </div>

          <p className="tc-label">{issues.length === 2 ? 'Both issues' : 'Every issue'}, as they move</p>
          <div className={`tc-grid${issues.length > 2 ? ' tc-grid--three' : ''}`}>
            {issues.map((i) => (
              <figure key={i.id} className="tc-card">
                <div className="tc-frame"><CoverArt take={take} topic={i.id} /></div>
                <figcaption>
                  <span className="tc-card-n">No. {i.n}</span> {i.title}
                  <span className="tc-card-idea">{i.idea}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="tc-label">As a still, for email and social</p>
          <div className="tc-grid tc-grid--small">
            {issues.map((i) => (
              <div key={i.id} className="tc-frame"><CoverArt take={take} topic={i.id} still /></div>
            ))}
          </div>

          <p className="tc-note"><strong>Moving.</strong> {t.motion}</p>
          <p className="tc-note">
            Prototype. No faces and no esy mark: each cover carries its issue’s topic. Round 2 shows the products’ own characters in our desk scene,
            and where a logo appears it is the company’s own file, never redrawn. The titles are drafts and the issues aren’t written yet, so only the cover shows.
          </p>
        </div>
      </section>
    </main>
  );
}
