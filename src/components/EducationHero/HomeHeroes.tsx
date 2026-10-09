/* The homepage's heroes as named components, so the homepage swaps between
 * them with one line in src/app/page.js (2026-10-09).
 *
 *   HomeHeroAtWork     live since 2026-10-09 (evening): B45 from /prototypes/hero-backdrop/.
 *                      B32's layout over Zev, seen from behind at his desk at dusk,
 *                      the real os.esy.com/agency/search page on his second screen
 *                      with its chart filling in each loop (baked onto the video
 *                      frame by frame, since video models garble UI).
 *   HomeHeroHighFloor  live 2026-10-09 (day): B32. A slow shot of a high-floor
 *                      office at dusk behind the words; the copy side nearly solid
 *                      navy; Zev's photo small, signed under the button, with his
 *                      LinkedIn and GitHub in a profile card on hover or tap.
 *   HomeHeroPortrait   live 2026-10-06 → 10-09: C · Engineering from
 *                      /prototypes/home-promise/, the plain navy hero with Zev's
 *                      360px portrait on the right. Revert to it by rendering
 *                      it in src/app/page.js instead. */

import type { ResolvedDesk } from './desks';
import { HERO_SHOTS } from './heroLoops';
import { PROMISES, PromiseStudio } from './promises';

type HeroProps = { desks: ResolvedDesk[] };

// B32's byline and copy treatment, shared by the heroes built on it.
const SIGNED = { byline: 'foot', faceSize: 56, photo: '/images/zev-uhuru.png', solidCopy: true, socials: 'profile' } as const;

export function HomeHeroAtWork({ desks }: HeroProps) {
  return <PromiseStudio promise={PROMISES.engineering} desks={desks} backdrop={{ ...HERO_SHOTS['zev-agency-desk'], ...SIGNED }} />;
}

export function HomeHeroHighFloor({ desks }: HeroProps) {
  return (
    <PromiseStudio
      promise={PROMISES.engineering}
      desks={desks}
      backdrop={{ ...HERO_SHOTS['desk-highrise'], ...SIGNED }}
    />
  );
}

export function HomeHeroPortrait({ desks }: HeroProps) {
  return <PromiseStudio promise={PROMISES.engineering} desks={desks} />;
}
