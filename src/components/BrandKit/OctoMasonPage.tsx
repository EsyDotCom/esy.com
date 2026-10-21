/* esy.com/mason (2026-10-14): OctoMason™, Mason for short. The mark is
   "OctoMason™" where he acts as the brand (the word and the character design);
   everyday copy, captions and alt text say "Mason". The page says who he is,
   why an octopus and why "Mason", how he looks, where he shows up, and the
   few rules for using him. Built from the brand kit's parts (kit.ts, parts.tsx)
   so it reads like /brand; octomason.com redirects here. */

import Image from 'next/image';
import Link from 'next/link';
import { ISSUES } from '@/components/NewsletterPage/issues';
import { MASON, SCENES } from './kit';
import { FlatMason, MasonSpec, Rules, Turnaround } from './parts';

export const OCTOMASON = 'OctoMason™';
const ICONS = '/brand/icons';

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bk-section">
      <p className="bk-kicker">{kicker}</p>
      <h2 className="bk-h2">{title}</h2>
      {children}
    </section>
  );
}

// The rules for using him: only what's already canon (VISUAL_LANGUAGE.md, the brand kit).
const USING = [
  `Write ${OCTOMASON} the first time he appears as the brand in a place, as “${OCTOMASON} (Mason for short)”. After that, and in captions and alt text, he’s Mason.`,
  'In a scene he’s always doing the work: building, checking, carrying.',
  'No people in his scenes. The whole scene is vinyl, in navy and teal, never a toy dropped into a photograph.',
  'What he builds stays abstract: shapes, pieces, light. Never a product name or a label.',
  'Every new picture starts from his studio shot, so he stays himself.',
  'His pictures carry no generated words or logos; we set words in our own type.',
];

export default function OctoMasonPage() {
  const reef = SCENES[0];
  return (
    <main className="bk">
      <header className="om-hero">
        <div className="om-hero-in">
          <div className="om-hero-copy">
            <p className="bk-kicker bk-kicker--light">Esy’s mascot</p>
            <h1 className="bk-h1">{OCTOMASON}</h1>
            <p className="om-short">Mason for short</p>
            <p className="bk-lede">{MASON.who}</p>
          </div>
          <Image
            className="om-hero-head"
            src={`${ICONS}/mason-vinyl-cutout-1024.png`}
            alt="Mason’s head as a vinyl toy: a navy octagon with a teal stripe and two ivory eyes"
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 900px) 60vw, 380px"
          />
        </div>
      </header>

      <div className="bk-wrap">
        <Section id="octopus" kicker="01 · Why an octopus" title="One mind, eight arms">
          <div className="om-two">
            <div>
              <p className="bk-p">
                Two thirds of a real octopus’s neurons sit in its arms, so each arm can work on its own while one mind keeps the whole job in view. That’s how Esy works: many jobs at once, kept in one place.
              </p>
              <p className="bk-p">Eight arms give him his octagon: the same 45° cuts as the e in our wordmark, so Mason and the logo read as one family.</p>
            </div>
            <figure className="bk-shot">
              <Image src={MASON.studio} alt="Mason as a vinyl toy on a studio sweep" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 540px" />
              <figcaption>His studio shot, at rest: seven arms forward, the eighth curled up behind.</figcaption>
            </figure>
          </div>
        </Section>

        <Section id="name" kicker="02 · Why Mason" title="He builds">
          <div className="om-two">
            <figure className="bk-shot">
              <Image src={reef.img} alt="Mason’s reef in vinyl, with the octagon gate he built" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 540px" />
              <figcaption>His reef, where he quarries slabs and builds the octagon gate.</figcaption>
            </figure>
            <div>
              <p className="bk-p">A mason builds with stone, one piece at a time. Mason’s first home was a reef, where he quarries slabs with his arms and builds an octagon gate, one slab after another.</p>
              <p className="bk-p">That’s the work Esy does too: real pieces, put together in order, with every step kept.</p>
            </div>
          </div>
        </Section>

        <Section id="look" kicker="03 · How he looks" title="A vinyl toy in a vinyl world">
          <p className="bk-p">
            Mason is a matte-satin designer vinyl toy, and everything around him is vinyl too: a glossy playset in navy and teal, lit from inside where work moves.
          </p>
          <Turnaround />
          {/* His eight arms (Zev, 2026-10-14): at rest seven fan forward and the
              eighth curls up behind like a tail; at work all eight can show. */}
          <div className="om-two om-two--top">
            <figure className="bk-shot">
              <Image src="/brand/kit/mason-at-rest.webp" alt="Mason resting on a stack of sealed envelopes, seven arms forward and his eighth curled up behind him like a tail" width={1536} height={864} sizes="(max-width: 900px) 100vw, 540px" />
              <figcaption>At rest, after a send.</figcaption>
            </figure>
            <div>
              <h3 className="om-h3">Eight arms, always</h3>
              <p className="bk-p">At rest, seven arms fan out in front and the eighth curls up behind him like a tail.</p>
              <p className="bk-p">At work, all eight can show, and each one has a job: typing, stamping, holding, standing. Some can be out of sight, behind him or out of frame, like the four in the footer. Never more than eight.</p>
            </div>
          </div>
          <div className="om-two om-two--top">
            <MasonSpec />
            <div>
              <h3 className="om-h3">Small sizes</h3>
              <p className="bk-p">{MASON.small}</p>
              <FlatMason />
              <p className="bk-p om-more">
                <Link href="/brand/#icons">His icons and their files are in the brand kit →</Link>
              </p>
            </div>
          </div>
        </Section>

        <Section id="seen" kicker="04 · Where you’ll see him" title="On every cover, at the foot of every page">
          <h3 className="om-h3">The Marketing Engineer</h3>
          <p className="bk-p">Every issue’s cover is Mason acting out the issue.</p>
          <div className="om-covers">
            {ISSUES.map((i) => (
              <Link key={i.slug} href={`/newsletter/${i.slug}/`} className="om-cover">
                {i.cover && <Image src={i.cover} alt={i.coverAlt ?? `The cover of issue ${i.n}`} width={1536} height={864} sizes="(max-width: 900px) 100vw, 540px" />}
                <span className="om-cover-n">No. {i.n} · {i.title}</span>
                {i.coverCaption && <span className="om-cover-cap">{i.coverCaption}</span>}
              </Link>
            ))}
          </div>

          <div className="om-two om-two--top om-seen">
            <figure className="bk-shot">
              <Image src="/brand/scenes/mason-study.webp" alt="Mason at work in his study, the scene under the site’s footer" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 540px" />
              <figcaption><b>The footer.</b> Mason at work in his study, at the foot of every page.</figcaption>
            </figure>
            <figure className="om-app">
              {/* Retired as the icon 2026-10-21: the e is Esy's symbol, Mason the mascot. */}
              <Image src={`${ICONS}/mason-vinyl-teal-512.png`} alt="Mason’s vinyl head on teal" width={512} height={512} sizes="180px" />
              <figcaption><b>The old app icon.</b> His vinyl head on teal was our app icon and profile picture until 21 October 2026. The e is Esy’s symbol now; Mason is the mascot. <Link href="/brand/#icons">Icons →</Link></figcaption>
            </figure>
          </div>
        </Section>

        <Section id="using" kicker="05 · Using Mason" title="A few rules">
          <Rules items={USING} />
        </Section>
      </div>
      <p className="bk-wrap bk-foot">Every picture of Mason is made with Esy, on api.esy.com, from his vinyl studio shot. {OCTOMASON} is a trademark of ESY LLC.</p>
    </main>
  );
}
