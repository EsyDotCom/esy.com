/* Education hero F · Studio: a magazine cover in the first person.
 *
 * Dark navy. Zev's headshot, large, in a jade-ringed circle on the right, so
 * the face is the first thing seen and the words beside it are his. Under the
 * signup, the proof: the two businesses the systems run on, in their own
 * wordmarks, and the newest real article.
 *
 * `phone` picks the layout under 960px only; desktop is the same for all:
 *   photo   — the big circle above the copy (F as shipped; the signup can fall below the fold)
 *   avatar  — a 64px photo inline with "Hi, I'm Zev." (G)
 *   profile — a profile row: 112px photo, name and role, then the copy (H)
 *   after   — copy and signup first, the big circle under the form (I) */

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ClipArtWordmark from '@/components/NewsletterHome/ClipArtWordmark';
import SeoPageWordmark from '@/components/NewsletterHome/SeoPageWordmark';
import ComposeWordmark, { type ComposeMarkStyle } from '@/components/NewsletterHome/ComposeWordmark';
import type { Lesson, ResolvedDesk } from './desks';
import { EduSignup } from './shared';
import HeroLoop from './HeroLoop';
import SocialAvatar, { type SocialHover } from './SocialAvatar';

export type StudioPhoneLayout = 'photo' | 'avatar' | 'profile' | 'after';

type StudioProps = {
  desks: ResolvedDesk[]; latest?: Lesson | null; phone?: StudioPhoneLayout;
  /** Compose's mark as a third app in "The systems run" (/prototypes/home-compose/). */
  composeMark?: ComposeMarkStyle;
  /** The promise, swapped by /prototypes/home-promise/. Each defaults to the
      live hero's: the headline, the line under it, and the weekly signup. */
  headline?: ReactNode;
  sub?: ReactNode;
  signup?: ReactNode;
  /** The third app in "The systems run": Compose (live) or OS, os.esy.com,
      set in the same stencil with its teal first letter. */
  thirdApp?: 'compose' | 'os';
  /** "Hi, I'm Zev." above the headline (live). Off, the headline is the first
      thing read: the name moves to a caption under the portrait on desktop,
      and the phone's profile row drops under the headline as a byline. */
  greeting?: boolean;
  /** The desktop portrait: 440px (large, F as shipped) or 360px (medium,
      picked at /prototypes/face-size/), so the face and the headline weigh
      the same. Phones are unchanged. */
  portrait?: 'large' | 'medium';
  /** "The systems run" row of app wordmarks under the signup. Off on the live
      hero (2026-10-09): the line under the headline already carries the
      clip.art proof, and the wordmarks linked away before the signup. */
  systemsRow?: boolean;
  /** A photoreal background loop in place of the portrait
      (/prototypes/hero-backdrop/, 2026-10-09): the shot fills the hero, the
      copy sits on its calm left side, and the face moves to a small byline
      under the headline. With `portrait`, the face stays at full size in
      front of a softened shot instead. */
  backdrop?: {
    video: string; poster: string; focus?: string; portrait?: boolean; photo?: string;
    /** Centred headline and subtitle, with a smaller portrait under them on
        the left or the right of the button (B13, B14). */
    centered?: 'left' | 'right';
    /** No shot: the live hero's plain navy ground (B15, B16). */
    plain?: boolean;
    /** The portrait's size, in px: under the centred copy (104 by default)
        or as the byline (36 by default). */
    faceSize?: number;
    /** Where the byline sits when there's no big portrait (B21–B23): above
        the headline, beside the course button, or under the fine print.
        Under the headline when unset (B1–B5). */
    byline?: 'top' | 'button' | 'foot';
    /** The copy side nearly solid navy, fading quickly to the room (B27). */
    solidCopy?: boolean;
    /** Hovering the byline photo opens a close-up with LinkedIn and GitHub (B29–B31). */
    socials?: SocialHover;
  };
};

export default function EduStudio({ latest, phone = 'photo', composeMark, headline, sub, signup, thirdApp = 'compose', greeting = true, portrait = 'large', systemsRow = true, backdrop }: StudioProps) {
  // Who's writing. The live hero names the businesses here; without the
  // greeting the wordmarks under the signup are the only place they appear.
  const role = greeting ? 'Marketing engineer · runs clip.art and SEOPage' : 'Marketing engineer';
  // Phone-only identity row for the avatar and profile layouts: the face
  // shrinks to sit beside the name, so the signup stays on the first screen.
  // Hidden on desktop and in the other layouts.
  const me = (
    <div className="eh-studio-me">
      <span className="eh-studio-me-photo">
        <Image src={backdrop?.photo ?? "/images/zev-uhuru.png"} alt="" width={224} height={224} />
      </span>
      <span className="eh-studio-me-text">
        <span className="eh-studio-hello">{greeting ? <>Hi, I&apos;m Zev.</> : 'Zev Uhuru'}</span>
        <span className="eh-studio-me-role">{role}</span>
      </span>
    </div>
  );

  // The small face over a backdrop: a ringed photo with the name. Its place
  // in the copy is backdrop.byline's (under the headline when unset).
  const byline = (
    <div className={`eh-studio-byline${backdrop?.byline ? ` eh-studio-byline--${backdrop.byline}` : ''}`}
      style={backdrop?.faceSize ? { ['--eh-byline' as string]: `${backdrop.faceSize}px` } : undefined}>
      {backdrop?.socials ? (
        <SocialAvatar photo={backdrop.photo ?? '/images/zev-uhuru.png'} style={backdrop.socials} />
      ) : (
        <span className="eh-studio-byline-photo">
          <Image src={backdrop?.photo ?? '/images/zev-uhuru.png'} alt="" width={160} height={160} />
        </span>
      )}
      {backdrop?.byline ? (
        <span className="eh-studio-byline-text"><b>Zev Uhuru</b><span>Marketing engineer</span></span>
      ) : (
        <><b>Zev Uhuru</b><span>· The Marketing Engineer</span></>
      )}
    </div>
  );

  // Centred takes (B13, B14): the headline and subtitle centred over the shot,
  // then one row under them with a smaller portrait and the name on one side
  // and the course button on the other.
  if (backdrop?.centered) {
    const face = (
      <div className="eh-under-face" style={backdrop.faceSize ? { ['--eh-face' as string]: `${backdrop.faceSize}px` } : undefined}>
        <span className="eh-under-ring">
          <span className="eh-under-circle">
            <Image src={backdrop.photo ?? '/images/zev-uhuru.png'} alt="Zev Uhuru" fill sizes="140px" priority />
          </span>
        </span>
        <span className="eh-under-name">
          <b>Zev Uhuru</b>
          <span>Marketing engineer</span>
        </span>
      </div>
    );
    return (
      <section className={`eh eh-studio eh-studio--backdrop eh-studio--centered${backdrop.plain ? ' eh-studio--plain' : ''}`} id="subscribe">
        {!backdrop.plain && <HeroLoop video={backdrop.video} poster={backdrop.poster} focus={backdrop.focus} />}
        <div className="nl-container eh-studio-inner">
          <div className="eh-centered-copy">
            <h1 className="eh-h1 eh-h1--onDark">
              {headline ?? <>I build the AI systems that <em>run marketing</em>, and show you how.</>}
            </h1>
            <p className="eh-sub eh-sub--onDark">{sub}</p>
            <div className={`eh-under eh-under--${backdrop.centered}`}>
              {face}
              <div className="eh-under-signup">{signup ?? <EduSignup tone="dark" />}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`eh eh-studio eh-studio--phone-${phone} eh-studio--portrait-${portrait}${backdrop ? ' eh-studio--backdrop' : ''}${backdrop?.portrait ? ' eh-studio--backdrop-portrait' : ''}${backdrop?.solidCopy ? ' eh-studio--solid-copy' : ''}`} id="subscribe">
      {backdrop && <HeroLoop video={backdrop.video} poster={backdrop.poster} focus={backdrop.focus} />}
      <div className="nl-container eh-studio-inner">
        {/* The portrait: zev-uhuru.png, the headshot used across the site. It
            is cropped to a circle on a white ground, so it's shown in a circle. */}
        {(!backdrop || backdrop.portrait) && (
        <div className="eh-studio-photo">
          <div className="eh-studio-ring">
            <div className="eh-studio-circle">
              <Image src={backdrop?.photo ?? "/images/zev-uhuru.png"} alt="Zev Uhuru" fill priority sizes="(max-width: 960px) 60vw, 460px" />
            </div>
          </div>
          {/* Without the greeting, the portrait is captioned with the name instead. */}
          {!greeting && (
            <p className="eh-studio-caption">
              <b>Zev Uhuru</b>
              <span>{role}</span>
            </p>
          )}
        </div>
        )}

        <div className="eh-studio-copy">
          {greeting && me}
          {greeting && <p className="eh-studio-hello eh-studio-hello--main">Hi, I&apos;m Zev.</p>}
          {backdrop?.byline === 'top' && byline}
          <h1 className="eh-h1 eh-h1--left eh-h1--onDark">
            {headline ?? <>I build the AI systems that <em>run marketing</em>, and show you how.</>}
          </h1>
          {!greeting && (!backdrop || backdrop.portrait) && me}
          {/* Over a backdrop, the face is a byline under the headline, on every screen size. */}
          {backdrop && !backdrop.portrait && !backdrop.byline && byline}
          <p className="eh-sub eh-sub--left eh-sub--onDark">
            {sub ?? (
              <>
                One email a week: the system I built, how it works, and what it did. SEO, agents, AI coding tools, and
                the integrations between them.
              </>
            )}
          </p>
          {backdrop?.byline === 'button' ? (
            <div className="eh-byline-row">
              {byline}
              {signup ?? <EduSignup tone="dark" />}
            </div>
          ) : (
            signup ?? <EduSignup tone="dark" />
          )}
          {backdrop?.byline === 'foot' && byline}

          {/* The proof: where the systems run (off on the live hero), then the newest issue. */}
          {systemsRow && (
            <div className="eh-studio-proof">
              <span className="eh-studio-proof-label">The systems run</span>
              <a href="https://clip.art" target="_blank" rel="noopener noreferrer" aria-label="clip.art">
                <ClipArtWordmark className="eh-studio-clipart" />
              </a>
              <a href="https://seopage.com" target="_blank" rel="noopener noreferrer" aria-label="SEOPage" className="eh-studio-seopage">
                <SeoPageWordmark weight="light" />
              </a>
              {thirdApp === 'os' ? (
                // OS in the esy stencil, lowercase with its teal first letter,
                // sized like the stencil Compose mark it replaces.
                <a href="https://os.esy.com" target="_blank" rel="noopener noreferrer" aria-label="Esy OS">
                  <span className="cw cw--stencil eh-studio-compose" aria-hidden="true">
                    <span className="cw-face">os</span>
                  </span>
                </a>
              ) : (
                composeMark && (
                  <a href="https://compose.esy.com" target="_blank" rel="noopener noreferrer" aria-label="Esy Compose">
                    <ComposeWordmark mark={composeMark} className="eh-studio-compose" />
                  </a>
                )
              )}
            </div>
          )}
          {latest?.href && (
            <Link href={latest.href} className="eh-studio-latest">
              <span>Latest</span> {latest.title} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* The phone-layout prototypes (round 3), as components the prototype route can map to. */
export const EduStudioAvatar = (props: StudioProps) => <EduStudio {...props} phone="avatar" />;
export const EduStudioProfile = (props: StudioProps) => <EduStudio {...props} phone="profile" />;
export const EduStudioAfter = (props: StudioProps) => <EduStudio {...props} phone="after" />;
