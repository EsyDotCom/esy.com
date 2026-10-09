/* The homepage's heroes as named components, so the homepage swaps between
 * them with one line in src/app/page.js (2026-10-09).
 *
 *   HomeHeroHighFloor  live since 2026-10-09: B32 from /prototypes/hero-backdrop/.
 *                      A slow shot of a high-floor office at dusk behind the
 *                      words; the copy side nearly solid navy; Zev's photo small,
 *                      signed under the button, with his LinkedIn and GitHub in a
 *                      profile card on hover or tap.
 *   HomeHeroPortrait   live 2026-10-06 → 10-09: C · Engineering from
 *                      /prototypes/home-promise/, the plain navy hero with Zev's
 *                      360px portrait on the right. Revert to it by rendering
 *                      it in src/app/page.js instead. */

import type { ResolvedDesk } from './desks';
import { HERO_SHOTS } from './heroLoops';
import { PROMISES, PromiseStudio } from './promises';

type HeroProps = { desks: ResolvedDesk[] };

export function HomeHeroHighFloor({ desks }: HeroProps) {
  return (
    <PromiseStudio
      promise={PROMISES.engineering}
      desks={desks}
      backdrop={{
        ...HERO_SHOTS['desk-highrise'],
        byline: 'foot',
        faceSize: 56,
        photo: '/images/zev-uhuru.png',
        solidCopy: true,
        socials: 'profile',
      }}
    />
  );
}

export function HomeHeroPortrait({ desks }: HeroProps) {
  return <PromiseStudio promise={PROMISES.engineering} desks={desks} />;
}
