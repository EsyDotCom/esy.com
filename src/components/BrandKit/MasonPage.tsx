/* esy.com/brand/mason, three ways (2026-10-11). Same Mason, different stance:

   D · Character sheet  a model sheet: the turnaround, his spec, do and don't,
                         poses, the flat drawing for small sizes, files
   E · Story            who he is, where he lives, what he does, in big pictures,
                         with the rules at the end
   F · Toy box          a collectible's product page: the studio shot, what's in
                         the box (poses), his editions, a spec table, files */

import Image from 'next/image';
import Link from 'next/link';
import { MASON, SCENES } from './kit';
import { DoDont, Download, Editions, FlatMason, MasonSpec, Poses, Turnaround } from './parts';

export type MasonTake = 'sheet' | 'story' | 'toybox';

function Block({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="bk-section">
      <p className="bk-kicker">{kicker}</p>
      <h2 className="bk-h2">{title}</h2>
      {children}
    </section>
  );
}

const Back = () => <Link className="bk-back" href="/prototypes/brand/sheet/">← Brand kit</Link>;

/* ── D · Character sheet ── */
function Sheet() {
  return (
    <div className="bk-wrap">
      <header className="bk-plain-head">
        <Back />
        <p className="bk-kicker">Character sheet</p>
        <h1 className="bk-h1 bk-h1--navy">Mason</h1>
        <p className="bk-lede bk-lede--navy">{MASON.who}</p>
      </header>
      <Turnaround />
      <div className="bk-two">
        <Block kicker="Spec" title="Always the same figure"><MasonSpec /></Block>
        <Block kicker="Use" title="Do and don’t"><DoDont /></Block>
      </div>
      <Block kicker="Poses" title="Clip art, transparent"><Poses /></Block>
      <Block kicker="Small sizes" title="The flat drawing"><p className="bk-p">{MASON.small}</p><FlatMason /></Block>
      <Block kicker="Editions" title="Camouflage"><p className="bk-p">For the newsletter he takes on the product’s colours, with its logo on a tag. The colours change; the shape never does.</p><Editions /></Block>
    </div>
  );
}

/* ── E · Story ── */
function Story() {
  const [reef, gate, assembly] = SCENES;
  return (
    <>
      <header className="bk-hero bk-hero--story">
        <Image src={reef.img} alt="Mason’s reef in vinyl: the octagon gate and a school of fish" fill priority sizes="100vw" />
        <div className="bk-hero-copy">
          <Back />
          <h1 className="bk-h1">Meet Mason</h1>
          <p className="bk-lede">{MASON.home}</p>
        </div>
      </header>
      <div className="bk-story">
        <div className="bk-story-row">
          <Image src={MASON.studio} alt="Mason as a vinyl toy" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 55vw" />
          <div>
            <p className="bk-kicker">Who he is</p>
            <h2 className="bk-h2">One mind, eight arms</h2>
            <p className="bk-p">{MASON.who} Two thirds of a real octopus’s neurons sit in its arms, so each arm can work on its own while the mind keeps the whole job in view.</p>
          </div>
        </div>
        <div className="bk-story-row bk-story-row--flip">
          <Image src={gate.img} alt={gate.note} width={1536} height={1024} sizes="(max-width: 900px) 100vw, 55vw" />
          <div>
            <p className="bk-kicker">What he does</p>
            <h2 className="bk-h2">He does the work, you approve it</h2>
            <p className="bk-p">His line runs, then stops at the gate where one key waits. Humans think; AI assists.</p>
          </div>
        </div>
        <div className="bk-story-row">
          <Image src={assembly.img} alt={assembly.note} width={1536} height={1024} sizes="(max-width: 900px) 100vw, 55vw" />
          <div>
            <p className="bk-kicker">How he works</p>
            <h2 className="bk-h2">Workflows, not prompts</h2>
            <p className="bk-p">One clear line, a station for every step, raw pieces in and finished pieces out, an arm at several stations at once.</p>
          </div>
        </div>
      </div>
      <div className="bk-wrap">
        <Block kicker="Drawing him" title="So he stays himself"><Turnaround /><div className="bk-two"><MasonSpec /><DoDont /></div></Block>
        <Block kicker="Poses" title="Clip art"><Poses /></Block>
      </div>
    </>
  );
}

/* ── F · Toy box ── */
function ToyBox() {
  return (
    <div className="bk-wrap">
      <Back />
      <div className="bk-product">
        <Image className="bk-product-img" src={MASON.studio} alt="Mason, the vinyl toy, on a studio sweep" width={1536} height={1024} priority sizes="(max-width: 900px) 100vw, 640px" />
        <div className="bk-product-copy">
          <p className="bk-kicker">Esy · Designer vinyl · Series 1</p>
          <h1 className="bk-h1 bk-h1--navy">Mason</h1>
          <p className="bk-lede bk-lede--navy">{MASON.who}</p>
          <table className="bk-table">
            <tbody>
              {MASON.spec.map((s) => (
                <tr key={s.part}><th>{s.part}</th><td>{s.is}</td></tr>
              ))}
              <tr><th>Reference</th><td>Every picture of him starts from this studio shot ({MASON.reference}).</td></tr>
            </tbody>
          </table>
          <div className="bk-dls">
            <Download href={MASON.studio} label="Studio shot" />
            <Download href={MASON.turnaround} label="Turnaround" />
          </div>
        </div>
      </div>
      <Block kicker="In the box" title="Poses"><Poses /></Block>
      <Block kicker="Editions" title="Camouflage, Series 1"><Editions /></Block>
      <Block kicker="Every angle" title="Turnaround"><Turnaround /></Block>
      <Block kicker="Care" title="Handle with care"><DoDont /></Block>
      <Block kicker="Small sizes" title="The flat drawing"><p className="bk-p">{MASON.small}</p><FlatMason /></Block>
    </div>
  );
}

export default function MasonPage({ take }: { take: MasonTake }) {
  return (
    <main className="bk">
      {take === 'sheet' ? <Sheet /> : take === 'story' ? <Story /> : <ToyBox />}
      <p className="bk-wrap bk-foot">Prototype for esy.com/brand/mason. Mason’s pictures are made on api.esy.com from his vinyl studio shot; the poses are real clip.art runs. Nothing here is live.</p>
    </main>
  );
}
