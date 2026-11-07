/* One homepage section per Esy OS app (round 2, 2026-11-07, /prototypes/home-os-apps/).
 * Zev: "they are supposed to have a section for each app we decide to place there, no longer just
 * one section for all… more sophisticated, no slop, nice transitions… capture the valuable features."
 *
 * `HOME_APPS` is the list the homepage shows, in order: change it to add or drop an app. Each app has
 * three features, the ones that are worth something to a marketing engineer, each with the visual
 * that proves it (OsFeatureVisuals.tsx). Real or sample is said per visual, never left to guess:
 *   agency  Today, approvals and search are drawn with sample figures (labelled on the visual).
 *   compose The replay, the checked piece and the live posts are real (composeShowcase.ts); the
 *           Fact-checker's notes are samples, as on the Compose band.
 *   scout   The map, the line counts and the directory are real (esy.com/scout's data). */

import type { OsAppId } from './osApps';

export type FeatureVisual =
  | 'agency-today' | 'agency-approve' | 'agency-search'
  | 'compose-team' | 'compose-checks' | 'compose-posts'
  | 'scout-map' | 'scout-basis' | 'scout-directory';

export interface Feature {
  id: FeatureVisual;
  /** Two or three words. */
  name: string;
  /** What it does for you, in one or two plain sentences. */
  says: string;
}

export interface AppSection {
  app: OsAppId;
  /** The section's claim. */
  headline: string;
  lede: string;
  features: [Feature, Feature, Feature];
  cta: { label: string; href: string };
  /** The ground this section sits on, for the transitions between sections. */
  ground: string;
}

export const APP_SECTIONS: Record<Exclude<OsAppId, 'echo'>, AppSection> = {
  agency: {
    app: 'agency',
    headline: 'Run the whole business from one room.',
    lede: 'Clients, the work, outreach, search, the inbox and the money, in one place. Agents do the work. You decide what goes out.',
    ground: '#0A2540',
    cta: { label: 'Join the waitlist', href: '/waitlist/' },
    features: [
      { id: 'agency-today', name: 'Today', says: 'What came in, what went out, what got made and what waits on you, before you open anything else.' },
      { id: 'agency-approve', name: 'You approve what ships', says: 'Agents draft, check and file the work, and nothing goes out until a person approves it. Every piece keeps how it was made: the sources, the model and the cost.' },
      { id: 'agency-search', name: 'Search that says what to make', says: 'Search Console, GA4 and Bing side by side, turned into the pages to write or fix next.' },
    ],
  },
  compose: {
    app: 'compose',
    headline: 'A newsroom that checks its own work.',
    lede: 'A team of agents for each publication, with you at the end. AI Marketing News is written this way, every day.',
    ground: '#061527',
    cta: { label: 'See Compose', href: 'https://compose.esy.com' },
    features: [
      { id: 'compose-team', name: 'A team per publication', says: 'A Researcher finds the primary source, a Writer drafts in the publication’s voice, a Fact-checker reads it against the source. Then it waits for you.' },
      { id: 'compose-checks', name: 'Every claim, checked', says: 'Each claim is matched to the line of the source that backs it, and anything that can change is flagged to check again before you publish.' },
      { id: 'compose-posts', name: 'Published, not drafted', says: 'The pieces go live. These are AI Marketing News’s newest posts at esy.com/news, each one written in Compose.' },
    ],
  },
  scout: {
    app: 'scout',
    headline: 'Learn from the people further along.',
    lede: 'Scout studies the creators and AI companies marketing engineers learn from, and shows how each one gets its customers.',
    ground: '#071A2E',
    cta: { label: 'See the funnel maps', href: '/scout/' },
    features: [
      { id: 'scout-map', name: 'Funnel maps', says: 'Where people find them, where they land, what they pay for, and the one move that makes it work.' },
      { id: 'scout-basis', name: 'Every line says how we know', says: 'Counted from their posts, seen on a public page, our reading, or not checked yet. Nothing is stated without its source.' },
      { id: 'scout-directory', name: 'Studied the same way', says: 'Creators and companies read with the same questions, so anyone can be put next to anyone.' },
    ],
  },
};

/** The apps the homepage shows, in order. echo isn't open yet, so it closes the run as a line, not a section. */
export const HOME_APPS: Exclude<OsAppId, 'echo'>[] = ['agency', 'compose', 'scout'];
