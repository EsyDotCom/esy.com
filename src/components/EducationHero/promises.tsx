/* The homepage promise (2026-10-06, /prototypes/home-promise/): three ways to
 * open the hero, each with the free email course as the one action. All three
 * sit on the 360px portrait (picked at /prototypes/face-size/).
 *
 *   A · Builder     — who I am: "I build the AI systems that run marketing."
 *   B · SEO         — the hook: "SEO isn't dead. It runs on AI now." Live at esy.com/seo.
 *   C · Engineering — the blunt claim: "AI marketing is an engineering job now." Live at esy.com.
 *
 * Each subtitle says what you get from the course; the signup is the site's
 * one list (NewsletterSignup): a button that opens the form, then a name. The
 * course isn't written yet, so the fine print says the lessons arrive as
 * they're published, as /skills does. */

import type { ReactNode } from 'react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import EduStudio from './EduStudio';
import type { Lesson, ResolvedDesk } from './desks';

export interface HeroPromise {
  key: string;
  name: string;
  headline: ReactNode;
  sub: ReactNode;
}

export const PROMISES: Record<string, HeroPromise> = {
  builder: {
    key: 'A',
    name: 'Builder',
    headline: <>I build the AI systems that <em>run marketing</em>, and show you how.</>,
    sub: (
      <>
        Learn to build AI systems that do a marketing team&apos;s work: research, writing, pages and reports. A free
        email course with the systems I run my own businesses on, and the skills to run them yourself.
      </>
    ),
  },
  seo: {
    key: 'B',
    name: 'SEO isn’t dead',
    headline: <>SEO isn&apos;t dead. <em>It runs on AI now.</em></>,
    sub: (
      <>
        People still search. What changed is who does the work: AI can research, write and check pages, if you build
        the system around it. A free email course with the systems I run, and the skills to run them yourself.
      </>
    ),
  },
  engineering: {
    key: 'C',
    name: 'Engineering',
    headline: <>AI marketing is <em>an engineering job</em> now.</>,
    sub: (
      <>
        {/* Proof first (2026-10-09, take A of three): the headline makes the claim,
            this line backs it with real results (the same numbers as the About page). */}
        My AI systems published 30,000+ pages and took clip.art to #1 on Google for “AI clipart”. One person built
        them, and you can too. Take the free email course and leave with your first one running, built with the
        same skills I use to grow and profit.
      </>
    ),
  },
};

/** The course signup: the same list as every signup on the site. The hero
 *  shows only the button, so the page doesn't open on a form; clicking it opens
 *  the email box in place, and the first name is asked after signing up. */
export function CourseSignup() {
  return (
    <NewsletterSignup form="hero"
      tone="dark"
      reveal
      askName
      cta="Start the free email course"
      submit="Start the course"
      note="Free. Lessons arrive as they’re published, then The Marketing Engineer every week. Unsubscribe in one click."
    />
  );
}

/** The hero as shipped: Studio with a promise's headline and subtitle, the
 *  course button and the 360px portrait captioned with the name (no greeting).
 *  Since 2026-10-09 nothing sits under the button: the "systems run" row is
 *  off, and the live pages pass no `latest`, so the signup is the only click.
 *  esy.com renders C, esy.com/seo renders B, and the prototype renders all
 *  three, so they can't drift apart. */
export function PromiseStudio({ promise, desks, latest }: { promise: HeroPromise; desks: ResolvedDesk[]; latest?: Lesson | null }) {
  return (
    <EduStudio
      desks={desks}
      latest={latest}
      phone="profile"
      headline={promise.headline}
      sub={promise.sub}
      signup={<CourseSignup />}
      thirdApp="os"
      greeting={false}
      portrait="medium"
      systemsRow={false}
    />
  );
}
