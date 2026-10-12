/* esy.com/brand, three ways (2026-10-11). Same kit, different stance:

   A · Sheet     a press kit: the vinyl logo up top, then logo, colour, type,
                 the toy world, Mason and voice, each with its files
   B · Showroom  a toy store: big vinyl pictures lead every section, the
                 rules sit small beside them, the toy world up front
   C · Guide     a style guide: a sticky contents rail, rules first, pictures
                 as evidence, for whoever makes the next cover

   Mason gets a card that opens his own page (/prototypes/brand-mason/). */

import Image from 'next/image';
import Link from 'next/link';
import { LOGO, MASON, NAME, VOICE } from './kit';
import { FlatLogos, MasonCard, Materials, Rules, SceneGrid, Swatches, TypeSpecimens, VinylLogos } from './parts';

export type BrandTake = 'sheet' | 'showroom' | 'guide';
const MASON_HREF = '/prototypes/brand-mason/sheet/';

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bk-section">
      <p className="bk-kicker">{kicker}</p>
      <h2 className="bk-h2">{title}</h2>
      {children}
    </section>
  );
}

/* ── A · Sheet ── */
function Sheet({ masonHref }: { masonHref?: string }) {
  return (
    <>
      <header className="bk-hero bk-hero--sheet">
        <Image src={LOGO.vinyl.dark} alt="The esy wordmark made in glossy vinyl, on navy" fill priority sizes="100vw" />
        <div className="bk-hero-copy">
          <p className="bk-kicker bk-kicker--light">Brand kit</p>
          <h1 className="bk-h1">Esy</h1>
          <p className="bk-lede">{NAME.say}. {NAME.line}</p>
        </div>
      </header>
      <div className="bk-wrap">
        <Section id="name" kicker="01 · Name" title="Esy, said Eh-see">
          <p className="bk-p">{NAME.root} {NAME.play}</p>
        </Section>
        <Section id="logo" kicker="02 · Logo" title="The wordmark">
          <FlatLogos />
          <Rules items={LOGO.rules} />
          <VinylLogos />
        </Section>
        <Section id="colour" kicker="03 · Colour" title="Navy, teal and light">
          <Swatches />
        </Section>
        <Section id="type" kicker="04 · Type" title="Three faces, three jobs">
          <TypeSpecimens />
        </Section>
        <Section id="world" kicker="05 · The world" title="Everything is vinyl">
          <p className="bk-p">The toy theme runs through everything we picture. Vinyl comes in three forms:</p>
          <Materials />
          <SceneGrid />
        </Section>
        <Section id="mason" kicker="06 · Mascot" title="Mason">
          <MasonCard href={masonHref} />
        </Section>
        <Section id="voice" kicker="07 · Voice" title="How we sound">
          <Rules items={VOICE} />
        </Section>
      </div>
    </>
  );
}

/* ── B · Showroom ── */
function Showroom() {
  return (
    <>
      <header className="bk-hero bk-hero--show">
        <Image src={LOGO.vinyl.light} alt="The esy wordmark made in glossy vinyl, on ivory" fill priority sizes="100vw" />
        <div className="bk-hero-copy bk-hero-copy--dark">
          <p className="bk-kicker">The Esy brand</p>
          <h1 className="bk-h1 bk-h1--navy">Serious systems, <em>made of toys.</em></h1>
          <p className="bk-lede bk-lede--navy">{NAME.play}</p>
        </div>
      </header>
      <div className="bk-show">
        <div className="bk-show-row">
          <Image className="bk-show-img" src={MASON.studio} alt="Mason, Esy’s octopus, as a vinyl toy" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 60vw" />
          <div className="bk-show-copy">
            <p className="bk-kicker">The mascot</p>
            <h2 className="bk-h2">Mason</h2>
            <p className="bk-p">{MASON.who}</p>
            <Link className="bk-btn" href={MASON_HREF}>Mason’s kit</Link>
          </div>
        </div>
        <div className="bk-show-row bk-show-row--flip">
          <Image className="bk-show-img" src="/brand/kit/toy-footer-gate.webp" alt="Mason’s line stopping at a lit gate where one key waits" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 60vw" />
          <div className="bk-show-copy">
            <p className="bk-kicker">The world</p>
            <h2 className="bk-h2">Everything is vinyl</h2>
            <p className="bk-p">Matte-satin for Mason and his playset, glossy for abstract art, lit from inside where work moves. The whole scene is made of it, in navy and teal.</p>
          </div>
        </div>
      </div>
      <div className="bk-wrap">
        <Section id="art" kicker="In the box" title="The pieces">
          <Materials />
        </Section>
        <Section id="logo" kicker="The wordmark" title="esy">
          <VinylLogos only="dark" />
          <FlatLogos />
          <Rules items={LOGO.rules} />
        </Section>
        <Section id="colour" kicker="Colours" title="From the box">
          <Swatches big />
        </Section>
        <Section id="type" kicker="Type" title="Lettering">
          <TypeSpecimens />
        </Section>
        <Section id="scenes" kicker="On the shelf" title="Where it shows up">
          <SceneGrid />
        </Section>
      </div>
    </>
  );
}

/* ── C · Guide ── */
const GUIDE = [
  ['name', 'Name'], ['logo', 'Logo'], ['colour', 'Colour'], ['type', 'Type'], ['world', 'Imagery'], ['mason', 'Mason'], ['voice', 'Voice'],
] as const;

function Guide() {
  return (
    <div className="bk-guide">
      <nav className="bk-guide-rail" aria-label="Brand guide">
        <p className="bk-kicker">Esy brand guide</p>
        {GUIDE.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        <Link className="bk-guide-mason" href={MASON_HREF}>Mason’s kit →</Link>
      </nav>
      <div className="bk-guide-body">
        <header className="bk-guide-head">
          <h1 className="bk-h1 bk-h1--navy">Brand guide</h1>
          <p className="bk-lede bk-lede--navy">What Esy looks and sounds like, and the files to make it. If something here disagrees with the brand docs, the docs win.</p>
        </header>
        <Section id="name" kicker="Name" title="Esy (Eh-see)">
          <Rules items={[NAME.root, NAME.play, 'Write it Esy in text; the wordmark is lowercase.']} />
        </Section>
        <Section id="logo" kicker="Logo" title="Use the files">
          <Rules items={LOGO.rules} />
          <FlatLogos />
          <VinylLogos />
        </Section>
        <Section id="colour" kicker="Colour" title="Six colours">
          <Swatches />
          <Rules items={['Navy is the ground. Teal and jade are light, used sparingly.', 'Other colours appear only as a product’s own colours, on newsletter covers.']} />
        </Section>
        <Section id="type" kicker="Type" title="Three faces">
          <TypeSpecimens />
        </Section>
        <Section id="world" kicker="Imagery" title="Vinyl, in three forms">
          <Rules items={['Every picture of Esy’s world is vinyl: matte-satin, glossy, or lit from inside.', 'The whole scene is vinyl, never a toy dropped into a photograph.', 'Models draw no words and no logos; we set words in our type and lay on logos from the companies’ own files.', 'Zev’s own profiles keep his real desk photo.']} />
          <Materials />
        </Section>
        <Section id="mason" kicker="Mason" title="The mascot">
          <MasonCard href={MASON_HREF} />
        </Section>
        <Section id="voice" kicker="Voice" title="How we sound">
          <Rules items={VOICE} />
        </Section>
      </div>
    </div>
  );
}

/** One take. `live` is the shipped esy.com/brand (A): no prototype note, and Mason's card stays a card until his page is picked. */
export default function BrandPage({ take, live = false }: { take: BrandTake; live?: boolean }) {
  return (
    <main className="bk">
      {take === 'sheet' ? <Sheet masonHref={live ? undefined : MASON_HREF} /> : take === 'showroom' ? <Showroom /> : <Guide />}
      {live ? (
        <p className="bk-wrap bk-foot">The SVGs are the logo; the vinyl renders are pictures of it. Every picture here is made with Esy, on api.esy.com.</p>
      ) : (
        <p className="bk-wrap bk-foot">Prototype for esy.com/brand. The vinyl renders are pictures of the logo (the SVGs are the logo); every picture is made on api.esy.com. Nothing here is live.</p>
      )}
    </main>
  );
}
