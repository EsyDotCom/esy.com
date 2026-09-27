/* Education hero E · Scene: the promise over a picture.
 *
 * A full-bleed background generated through api.esy.com
 * (scripts/generate-education-backdrops.mjs), dark on the left where the white
 * headline and signup sit, detail on the right. Under the signup, a small
 * byline with Zev's face, so the picture sets the mood and the face says who
 * will be writing. */

import Image from 'next/image';
import type { Lesson, ResolvedDesk } from './desks';
import { ChannelLine, EduSignup } from './shared';

// Which generated backdrop the Scene uses; both live in
// public/prototypes/education/backdrops/. `flow` (abstract lines of light) is
// the default: `desk` shows a stranger at a desk, and next to Zev's byline a
// reader would take that person for him.
export const SCENE_BACKDROP = '/prototypes/education/backdrops/flow.webp';

export default function EduScene({ backdrop = SCENE_BACKDROP }: { desks: ResolvedDesk[]; latest?: Lesson | null; backdrop?: string }) {
  return (
    <section className="eh eh-scene" id="subscribe">
      {/* The picture, then a navy shade that keeps the left half readable. */}
      <Image src={backdrop} alt="" fill priority sizes="100vw" className="eh-scene-bg" />
      <div className="eh-scene-shade" aria-hidden="true" />

      <div className="nl-container eh-scene-inner">
        <p className="eh-kicker eh-kicker--onDark">The Marketing Engineer · Free weekly email</p>
        <h1 className="eh-h1 eh-h1--left eh-h1--onDark">
          Learn to build the AI systems that <em>run marketing</em>.
        </h1>
        <p className="eh-sub eh-sub--left eh-sub--onDark">
          Practical lessons on SEO, AI coding tools, and marketing agents, from someone running them in production.
          The best of each week arrives as one email.
        </p>
        <EduSignup tone="dark" />

        {/* The face: who will be writing to you. */}
        <div className="eh-scene-byline">
          <span className="eh-scene-avatar">
            <Image src="/images/zev-uhuru.png" alt="" width={96} height={96} />
          </span>
          <p>
            <b>Written by Zev Uhuru</b>
            <span>who runs these systems at clip.art and SEOPage</span>
          </p>
        </div>
        <ChannelLine />
      </div>
    </section>
  );
}
