'use client';

/* Round 4 (2026-10-11): the covers. The live page (D's top with I's wide feed)
   with two new cover sets in place of the generated glowing scenes, which read
   as 2023 AI art. Both live in the room from the homepage video and the YouTube
   templates (dark navy, small teal lights), so every channel shares one world.

   J · Real screen   A photo of the desk with the issue's real page on the
                     monitor: clip.art, AI Marketing News, SEOPage.
   K · Proof card    The room out of focus with the issue's headline result as
                     a card, drawn in code (only facts the issue states).

   Each take is the live page with the mode's cover set swapped in. J shipped
   (2026-10-11): its covers are now every issue's own, made by
   scripts/newsletter-cover.py. */

import { TakeWideFeed } from './Round3';
import { type NewsletterMode, NewsletterModeProvider, useNewsletterMode } from './shared';

function WithCovers({ covers }: { covers: string }) {
  const mode: NewsletterMode = { ...useNewsletterMode(), covers };
  return (
    <NewsletterModeProvider value={mode}>
      <TakeWideFeed />
    </NewsletterModeProvider>
  );
}

export const TakeRealScreen = () => <WithCovers covers="/images/newsletter/covers/{n}.webp" />;
export const TakeProofCard = () => <WithCovers covers="/prototypes/newsletter/covers/proof/{n}.webp" />;
