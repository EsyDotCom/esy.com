/* Films, direction A · "Premiere". The index is a slate of posters under a
 * featured film; the film page reads like a release: hero, the animatic,
 * credits, the world, the cast, the making, and the package as a press kit. */

import Link from "next/link";

import { nlSerif } from "@/components/NewsletterHome/serif";
import { FILM_STAGES, LETTER, PACKAGE_GROUPS } from "@/data/films/the-letter-with-no-address";

import FilmFrame from "./FilmFrame";
import FilmHeroA from "./FilmHeroA";
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
    <div className={`fa ${nlSerif.variable}`}>
      <FilmHeroA />

      <div className="fa-wrap">
        <section className="fa-sec" aria-labelledby="fa-now">
          <h2 className="fa-h2" id="fa-now"><small>Now showing</small>The animatic</h2>
          <a className="fa-player" href={LETTER.animaticUrl} {...ext} aria-label="Open the animatic player">
            <FilmFrame name="animatic-player" alt="The Milo animatic player: Milo beside the Moon, with a subtitle and the scene-coloured timeline" sizes="(max-width: 1180px) 100vw, 1130px" />
            <span className="fa-player-play"><i /></span>
          </a>
          <div className="fa-cap">
            <span>Version {LETTER.version} · every line recorded · temp music · mixed to −16 LUFS</span>
            <span>Opens the full player ↗</span>
          </div>
        </section>

        <section className="fa-sec" aria-labelledby="fa-credits">
          <h2 className="fa-h2" id="fa-credits"><small>Credits</small>Who and what made it</h2>
          <dl className="fa-credits">
            {LETTER.credits.map((c) => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>{c.title}<span>{c.note}</span></dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fa-sec" aria-labelledby="fa-world">
          <h2 className="fa-h2" id="fa-world"><small>The world</small>Starlight Town</h2>
          <div className="fa-reel">
            {LETTER.reel.map((r) => (
              <FilmFrame key={r.image} name={r.image} alt={r.alt} sizes="320px" />
            ))}
          </div>
        </section>

        <section className="fa-sec" aria-labelledby="fa-cast">
          <h2 className="fa-h2" id="fa-cast"><small>The cast</small>Who&apos;s in it</h2>
          <div className="fa-cast">
            {LETTER.cast.map((c) => (
              <figure key={c.name}>
                <span className="fa-cast-ph" style={{ backgroundImage: `url(/films/${LETTER.slug}/${c.image}.webp)`, backgroundPosition: c.position, backgroundSize: c.zoom }} role="img" aria-label={c.name} />
                <figcaption><b>{c.name}</b><span>{c.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="fa-sec" aria-labelledby="fa-making">
          <h2 className="fa-h2" id="fa-making"><small>The making</small>{LETTER.versions.length} versions of the animatic</h2>
          <ol className="fa-versions">
            {LETTER.versions.map((v) => (
              <li key={v.v}><b>{v.v}</b><span>{v.text}</span></li>
            ))}
          </ol>
          <Steps />
        </section>

        <section className="fa-sec" id="package" aria-labelledby="fa-package">
          <h2 className="fa-h2" id="fa-package"><small>The package</small>Every file behind the film</h2>
          {PACKAGE_GROUPS.map((g) => (
            <div key={g.key} style={{ display: "grid", gap: 14 }}>
              <p className="fa-group">{g.title}</p>
              <div className="fa-kit">
                {LETTER.package.filter((p) => p.group === g.key).map((p) => {
                  const body = (
                    <>
                      <FilmFrame name={p.image} alt="" sizes="96px" />
                      <span className="fa-card-t">
                        <small>{p.kind} · {p.updated}</small>
                        <b>{p.title}</b>
                        <p>{p.description}</p>
                        <em>{p.private ? "Private for now" : "Open ↗"}</em>
                      </span>
                    </>
                  );
                  return p.private ? (
                    <div key={p.title} className="fa-card fa-card--private">{body}</div>
                  ) : (
                    <a key={p.title} className="fa-card" href={p.url} {...ext}>{body}</a>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <footer className="fa-foot">
          <span>Esy Films</span>
          <span>{LETTER.series} is a clip.art character</span>
          <a href={LETTER.storybookUrl} {...ext}>Read the storybook on clip.art ↗</a>
          <Link href={`${BASE}/`}>All films</Link>
        </footer>
      </div>
    </div>
  );
}
