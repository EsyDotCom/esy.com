/* Films, direction B · "Night Post". The index is the publication's light page
 * with a night-sky shelf for the Milo Moonbear series. The film page lives in
 * Starlight Town: the story in chapters (stopping before the ending), the cast,
 * how it was made, and every file kept in the Lost Letters drawer. */

import Link from "next/link";

import LightHeader from "@/components/LightHeader/LightHeader";
import { nlSerif } from "@/components/NewsletterHome/serif";
import "@/components/NewsletterHome/NewsletterHome.css";
import { LETTER, PACKAGE_GROUPS } from "@/data/films/the-letter-with-no-address";

import FilmFrame from "./FilmFrame";
import { storySans, storySerif } from "./fonts";
import "./films-b.css";

const BASE = "/films/v/b";
const FILM_HREF = `${BASE}/${LETTER.slug}/`;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const fontVars = `${storySerif.variable} ${storySans.variable} ${nlSerif.variable}`;

export function FilmsIndexB() {
  return (
    <div className={`fb fb-index nl ${fontVars}`}>
      <LightHeader />
      <div className="fb-wrap">
        <header className="fb-index-hero">
          <p className="nl-eyebrow">Esy Films</p>
          <h1>Films made from clip art</h1>
          <p>
            Every film starts as a clip.art pack and becomes an animated short through Esy. A person decides the look, the script, the cast, the
            animatic and the final cut. Everything else is checked by machine, and every file is kept.
          </p>
        </header>
      </div>
      <div className="fb-wrap">
        <section className="fb-shelf fb-night" aria-labelledby="fb-series" style={{ paddingInline: 28 }}>
          <p className="fb-series" id="fb-series">The {LETTER.series} series</p>
          <div className="fb-shelf-row">
            <Link className="fb-film" href={FILM_HREF}>
              <FilmFrame name="moon-rise" alt="Milo's balloon rising toward the sleeping Moon" sizes="(max-width: 900px) 100vw, 520px" priority />
              <span className="fb-film-ov">
                <b>{LETTER.title}</b>
                <span>Film one · animatic · {LETTER.runtime} · ages {LETTER.ages}</span>
              </span>
            </Link>
            <div className="fb-film fb-film--soon"><div><b>Film two</b><span>In script</span></div></div>
            <a className="fb-film fb-film--soon" href={LETTER.storybookUrl} {...ext}><div><b>The storybook</b><span>Where Milo started, on clip.art ↗</span></div></a>
          </div>
        </section>
      </div>
      <div className="fb-wrap">
        <div className="fb-how">
          <div><h2>From a pack</h2><p>The {LETTER.series} pack gave the hero, the balloon, the post office and the look.</p></div>
          <div><h2>Through Esy</h2><p>Frames, voices, timing and the mix, each made and checked by a workflow.</p></div>
          <div><h2>With every file kept</h2><p>Each film page links the whole package: scripts, casting, the animatic and the plans.</p></div>
        </div>
      </div>
    </div>
  );
}

export function FilmDetailB() {
  return (
    <div className={`fb fb-night fb-page ${fontVars}`}>
      <div className="fb-wrap">
        <section className="fb-hero" aria-label={LETTER.title}>
          <div>
            <p className="fb-series">A {LETTER.series} film</p>
            <h1 className="fb-title">{LETTER.title}</h1>
            <p className="fb-tagline">{LETTER.tagline}</p>
            <div className="fb-chips">
              <span className="fb-chip">{LETTER.runtime}</span>
              <span className="fb-chip">Ages {LETTER.ages}</span>
              <span className="fb-chip">{LETTER.shots} shots</span>
              <span className="fb-chip">Animatic</span>
            </div>
            <div className="fb-btns">
              <a className="fb-btn fb-btn--go" href={LETTER.animaticUrl} {...ext}>▶ Watch the animatic</a>
              <a className="fb-btn" href="#drawer">Open the drawer</a>
            </div>
          </div>
          <div className="fb-art">
            <FilmFrame name="envelope-desk" alt="The blank envelope on Milo's desk: a crayon star, a moon and tiny booties, and a star-shaped seal" sizes="(max-width: 860px) 100vw, 600px" priority />
            <span className="fb-seal" aria-hidden="true">Starlight<br />Mail</span>
          </div>
        </section>

        <div className="fb-chapters">
          {LETTER.chapters.map((c) => (
            <section className="fb-ch" key={c.title} aria-label={c.title}>
              <div className="fb-ch-fr">
                <FilmFrame name={c.image} alt={c.alt} sizes="(max-width: 860px) 100vw, 620px" />
                {c.line ? <span className="fb-subtitle"><b>{c.speaker}</b>{c.line}</span> : null}
              </div>
              <div>
                <small>{c.label}</small>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="fb-band" aria-labelledby="fb-cast">
        <div className="fb-wrap">
          <h2 className="fb-h2" id="fb-cast">The cast</h2>
          <p className="fb-sub">Six voices, each designed three ways and chosen by ear.</p>
          <div className="fb-cast">
            {LETTER.cast.map((c) => (
              <figure key={c.name}>
                <span className="fb-cast-ph" style={{ backgroundImage: `url(/films/${LETTER.slug}/${c.image}.webp)`, backgroundPosition: c.position, backgroundSize: c.zoom }} role="img" aria-label={c.name} />
                <figcaption><b>{c.name}</b><span>{c.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="fb-wrap">
        <section style={{ paddingBlock: "48px 8px" }} aria-labelledby="fb-made">
          <h2 className="fb-h2" id="fb-made">How it was made</h2>
          <p className="fb-sub">In one day, by hand, before any of it becomes an Esy workflow.</p>
          <ul className="fb-making">
            {LETTER.making.map((m) => (
              <li key={m.text}><b>{m.n}</b><span>{m.text}</span></li>
            ))}
          </ul>
          <ol className="fb-versions" aria-label="Versions of the animatic">
            {LETTER.versions.map((v) => (
              <li key={v.v}><b>{v.v}</b>{v.text}</li>
            ))}
          </ol>
        </section>

        <section id="drawer" style={{ paddingBlock: "40px 0" }} aria-labelledby="fb-drawer">
          <h2 className="fb-h2" id="fb-drawer">The Lost Letters drawer</h2>
          <p className="fb-sub">Every file behind the film, kept like mail. Open any letter.</p>
          {PACKAGE_GROUPS.map((g) => {
            const items = LETTER.package.filter((p) => p.group === g.key);
            return (
              <div className="fb-drawer" key={g.key}>
                <p className="fb-drawer-lip">{g.title}<span>{items.length} letters</span></p>
                <div className="fb-letters">
                  {items.map((p) => {
                    const body = (
                      <>
                        <FilmFrame name={p.image} alt="" sizes="46px" />
                        <span className="fb-pm">{p.kind} · postmarked {p.updated}</span>
                        <b>{p.title}</b>
                        <p>{p.description}</p>
                        <span className="fb-open">{p.private ? "Private for now" : "Open the letter"}</span>
                      </>
                    );
                    return p.private ? (
                      <div key={p.title} className="fb-letter fb-letter--private">{body}</div>
                    ) : (
                      <a key={p.title} className="fb-letter" href={p.url} {...ext}>{body}</a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        <footer className="fb-foot">
          <span>Esy Films</span>
          <span>{LETTER.series} is a clip.art character</span>
          <a href={LETTER.storybookUrl} {...ext}>Read the storybook on clip.art ↗</a>
          <Link href={`${BASE}/`}>All films</Link>
        </footer>
      </div>
    </div>
  );
}
