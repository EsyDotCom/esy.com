# Archive

Code that shipped, was replaced, and is kept out of the live tree rather than
deleted — so a decision can be revisited without digging through history.

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
