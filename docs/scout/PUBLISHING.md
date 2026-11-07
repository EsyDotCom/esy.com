# Publishing Scout on esy.com: the rules

Internal. Written 2026-11-07 after legal research on Scout's public creator pages (notes summarised in
PR #248; a lawyer should still review the profile template once). The public version of these rules is
esy.com/scout/how-we-work/ (`src/components/Scout/ScoutMethods.tsx`). Keep both in step.

## Why these rules
Editorial profiles of public creators are broadly protected in the US: news and commentary
exceptions to the right of publicity (Cal. Civ. Code 3344(d), and 3344(e): ads around coverage don't
make it commercial; NY Civil Rights Law 50–51), and profiles built without consent were protected in
*Vrdolyak v. Avvo* (N.D. Ill. 2016). The protection is lost when a page sells something with the
person's name, implies they endorse us, or gets facts wrong. These rules keep Scout on the editorial side.

## Never
- **No creator's name or face in Esy's own marketing**: ads, sales emails, course pages, paid boosts,
  social posts selling Esy. Sharing a Scout page as journalism is fine; promoting Esy with it isn't.
- **No sign-up, offer or Esy product on or beside a profile.** The only newsletter ask on a Scout page
  is the Scout header's button. No email gate, no teaser, no "full breakdown" behind a form.
- **Never compare a creator's offers with Esy's** on a Scout page (false-advertising and anti-SLAPP risk).
- **No earnings, revenue or income** about a named person. Prices as listed, audiences as shown, dated.
  `scripts/scout-snapshot.mjs` drops income lines; keep it that way.
- **No personal or family details**, locations, private groups, DMs, or anything behind a login or paywall.
- **No full posts, captions or transcripts.** Paraphrase; quotes under 15 words, only offer copy.
- **No affiliate or sponsored links**, and no one pays to be in, out of, or described in Scout.
- **No AI-generated portraits** of real people.
- **Don't sell, license or gate Scout data.**

## Always
- Every line labelled counted / seen / Esy's reading / not checked; the game plan marked as our reading.
- Every page dated (the day we read their pages); a date changes only when we read them again.
- The independence line and the correction link (scout@esy.com, subject filled in) on every page.
- Outside links `nofollow` (`src/lib/outbound.ts`).
- The same template for everyone (no favourites, which also signals no endorsement).

## Corrections and removals (scout@esy.com)
- Factual errors: fixed within 5 business days, then logged in `src/data/scout/corrections.json`
  (date, creator, page, kind, what, why; never who asked) and shipped.
- Photo removal: always, on request. Replace the avatar with their initial in the snapshot.
- Personal information: remove at once.
- Whole-page removal: considered; answer every request and log the outcome if the page comes down.
- GDPR objections from EU creators: weigh legitimate interests and journalism (Art. 85); explain the decision.

## Open items (owner: Zev)
- Create the scout@esy.com mailbox or alias.
- Capture practice: Instagram and LinkedIn are read in Zev's logged-in Chrome today. Logged-in collection
  is what cost hiQ against LinkedIn; prefer logged-out public pages or official APIs, and update the
  scout-add-creator skill when decided.
- Photos: prefer avatars from the official YouTube/X APIs, or creators' press kits; hotlinking from
  YouTube's CDN is low risk in California but unsettled in New York.
- One lawyer review of the profile template, the privacy section and the terms section.
