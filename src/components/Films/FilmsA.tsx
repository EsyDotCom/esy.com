/* Films, direction A · "Premiere". The index is a slate of posters under a
 * featured film; the film page reads like a release: hero, the animatic,
 * credits, the world, the cast, the making, and the package as a press kit. */

import Link from "next/link";

import { nlSerif } from "@/components/NewsletterHome/serif";
import { FILM_STAGES, LETTER } from "@/data/films/the-letter-with-no-address";

import FilmFrame from "./FilmFrame";
import FilmHeader from "./FilmHeader";
import FilmHeroA from "./FilmHeroA";
import FilmReelA from "./FilmReelA";
import "./films-a.css";

const BASE = "/films/v/a";
const FILM_HREF = `${BASE}/${LETTER.slug}/`;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Steps() {
  return (
    <div className="fa-steps-wrap">
      <ol className="fa-steps" aria-label="Where the film is">
        {FILM_STAGES.map((s, i) => (
          <li key={s} className={i < LETTER.stageIndex ? "is-done" : i === LETTER.stageIndex ? "is-now" : ""} aria-current={i === LETTER.stageIndex ? "step" : undefined}>
            <i />
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FilmsIndexA() {
  return (
    <div className={`fa ${nlSerif.variable}`}>
      <section className="fa-hero" aria-label="Featured film">
        <FilmFrame name="look-world" alt="Starlight Town at night, with the Moon and the Cloud Post Office" sizes="100vw" priority />
        <div className="fa-wrap" style={{ width: "100%" }}>
          <div className="fa-hero-in">
            <span className="fa-kick">Esy Films · now in production</span>
            <h1 className="fa-title">
              The Letter With <i>No Address</i>
            </h1>
            <p className="fa-log">A four-minute bedtime film made from a clip.art pack. Milo Moonbear, the night postman, follows a letter with no address across the sky.</p>
            <div className="fa-btns">
              <a className="fa-btn fa-btn--go" href={LETTER.animaticUrl} {...ext}>▶ Watch the animatic</a>
              <Link className="fa-btn" href={FILM_HREF}>How it was made</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="fa-wrap">
        <section className="fa-sec" aria-labelledby="fa-slate">
          <h2 className="fa-h2" id="fa-slate"><small>The slate</small>Films made from clip art</h2>
          <div className="fa-slate">
            <Link className="fa-poster" href={FILM_HREF}>
              <span className="fa-poster-im">
                <FilmFrame name="moon-rise" alt="Milo's balloon rising toward the sleeping Moon" sizes="(max-width: 900px) 50vw, 280px" />
                <b>{LETTER.title}</b>
              </span>
              <small>{LETTER.series} · animatic · {LETTER.runtime}</small>
            </Link>
            <div className="fa-poster fa-poster--ghost">
              <span className="fa-poster-im"><p>Milo, film two<span>in script</span></p></span>
              <small>{LETTER.series} · next</small>
            </div>
            <a className="fa-poster fa-poster--ghost" href={LETTER.storybookUrl} {...ext}>
              <span className="fa-poster-im"><p>The storybook<span>where Milo started, on clip.art ↗</span></p></span>
              <small>{LETTER.series} · read now</small>
            </a>
            <a className="fa-poster fa-poster--ghost" href={LETTER.packsUrl} {...ext}>
              <span className="fa-poster-im"><p>Every film starts as a pack<span>browse packs on clip.art ↗</span></p></span>
              <small>clip.art</small>
            </a>
          </div>
        </section>

        <section className="fa-sec" aria-labelledby="fa-how">
          <h2 className="fa-h2" id="fa-how"><small>How a film gets made</small>Ten stages, five decisions</h2>
          <Steps />
        </section>
      </div>
    </div>
  );
}

export function FilmDetailA() {
  return (
    <div className={`fa fa--film ${nlSerif.variable}`}>
      <FilmHeader tone="a" />
      <FilmHeroA />
      <FilmReelA />
    </div>
  );
}
