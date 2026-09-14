# Archive

Code that shipped, was replaced, and is kept out of the live tree rather than
deleted — so a decision can be revisited without digging through history.

## engineer-index (retired 2026-09-13)

The `/engineer` article index for The Marketing Engineer: studio-stage hero,
category shelves (Latest, Workflow Research, Model Research, AI Coding Tools,
Tutorials & Guides), the operator band, courses promo, and newsletter capture.
Retired when the publication became the site: the homepage is now the front
page (`/#latest`), and the bare `/engineer` index 301s there
(`public/_redirects`). Articles still live under the namespace, at
`esy.com/engineer/<slug>/` (`src/app/engineer/[slug]`).

Not routed. The components it renders (`src/components/Agentic/*`) stay in
place, so it still compiles. Its category shelves are the seed of topic pages:
to revive it as a browse page, move these files under a route folder (e.g.
`src/app/topics/`) and drop the matching redirect; the article URLs themselves
don't need to move.

## homepage-autopilot-story (retired 2026-09-13)

The "Put marketing production on autopilot" homepage (formerly
`src/components/HomeV3`): the isometric/clay story from Monday pile-up to
Friday handled, the scroll-driven production-line scrubber, clip.art
receipts, channels band, and the waitlist as the one CTA. Replaced at `/` by
The Marketing Engineer newsletter front page
(`src/components/NewsletterHome`) when esy.com repositioned as a publication.

Not imported anywhere. The scene art it uses (`public/brand/scenes/*`) is
still in place. To revive, either revert the PR that retired it, or by hand:

1. Copy `route-page.js` over `src/app/page.js` (its import already points
   here, and it carries the page's original metadata).
2. `src/app/opengraph-image.tsx`: render `renderHomeBrandPoster()` from
   `@/lib/og/homeBrandPoster` again.
3. `src/components/LightHeader/LightHeader.tsx`: swap the Subscribe/Issues
   links back for the commented-out "Join the waitlist" CTA.
4. `src/components/Home/footer.tsx` and `src/app/layout.js`: restore the
   "Put marketing production on autopilot" tagline and default metadata
   (both are noted inline where they changed).

## homepage-intelligence-circuitry (retired 2026-09-04)

The esy.com homepage from the "Intelligence Circuitry" era: navy hero on a
56px circuit grid, live RunConsole demo, clip.art case study, artifact
spotlight, workers roster, founder note. Replaced at `/` by the isometric
story homepage (then `src/components/HomeV3`, now archived above as
`homepage-autopilot-story`), which won a three-way comparison against this
page and the clay-cast candidate (`/homepage-v2`, deleted).

Not imported anywhere. To revive: point `src/app/page.js` back at
`IntelligenceCircuitryPage` and restore the navy nav/footer defaults in
`ConditionalNavigation.js` and `Home/footer.tsx`.
