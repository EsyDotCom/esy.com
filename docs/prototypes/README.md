# Prototypes

Clickable directions we compare by using them, not by looking at mockups. They live at **esy.com/prototypes/** (noindex, kept out of the sitemap) and stay there after a pick, so the next prototype starts from a working example.

**The reference build is the homepage hero (2026-09-18):** three directions for selling Esy OS (A · Split, B · Stage, C · Tour), each built around a working copy of the office's Books page. Then came a second round that merged the parts Zev liked: D · Split Tour (A's headline, C's flow) and E · Stage Tour (B's centred top, C's side-by-side flow under it). **E shipped as the homepage.** If you're building a new prototype, read that one first.

## The pattern

1. **Show the real product, not a picture of it.** Don't screenshot the app and don't draw a mockup. Rebuild the page from the product's own source: same markup, same class names, and the product's stylesheets **copied verbatim** (with a provenance header saying where they came from and when). Keep any tweaks for the new setting in a separate file. The result looks like the product because it *is* the product's UI.
   - Reference: `src/components/OfficePreview/` holds `office.css` and `office-rooms.css`, copied from os.esy.com, plus `preview.css` for the tweaks.
2. **Feed it sample data shaped like the real data.** Write one module shaped like the product's data type, and compute every derived figure (totals, headline sentences, per-unit costs) from it, so the numbers agree across panels. Size the numbers like our real work (clip.art, SEOPage.com). Say plainly on the page that the numbers are samples.
   - Reference: `src/components/OfficePreview/sample-books.ts`.
3. **Render at desktop width and scale it like a screenshot.** A full-viewport app becomes a window: fixed design width (1240px), `transform: scale()` to fit its container via ResizeObserver, and the desktop layout forced so the app's own breakpoints don't stack panels inside a wide picture. Add browser chrome with the real URL.
4. **Make it interactive in small ways.** Keep the product's own controls working: toggles, hover tooltips, theme switch. Anything outside the prototype answers with a one-line note instead of doing nothing. Expose a small set of hooks for the page around it, e.g. `focus` (light one part and dim the rest, scrolling it into view) and `onInteract` (stop an autoplay).
5. **Write several directions, each as its own component.** Each direction is its own component file with shared pieces factored out. They all use the same preview, so the comparison is about layout and copy, not about which one got the better screenshot.
   - Reference: `src/components/HomeHero/`, with `HeroSplit.tsx`, `HeroStage.tsx`, `HeroTour.tsx` and `shared.tsx`.
   - **Expect a merge round.** The pick is often "this part of A with that part of C". Keep each direction's moving parts as shared pieces (the Tour's questions, timer and step list live in `tour.tsx`) so a merge is a new small component, not a copy. `HeroSplitTour.tsx` and `HeroStageTour.tsx` are the merges.
6. **Copy says what the product does, in the customer's words.** No riddles, and no engine vocabulary (workflow, run, gate, provider). Each hero answers: what is it, what does it show you, what do I click.
7. **Show each direction in the real site chrome**, with the real header and footer, at `/prototypes/<prototype>/<variant>/`. A floating switcher moves between variants.

## Adding a prototype

1. Add an entry to `src/components/prototypes/registry.ts` (slug, name, date, summary, variants). The index at `/prototypes/` picks it up.
2. Put the variants in `src/components/<Feature>/` as real components. They should be shippable as-is, not throwaway code.
3. Add `src/app/prototypes/<slug>/[variant]/page.tsx` that maps variant slugs to components and renders `<PrototypeBar>`. Copy `src/app/prototypes/hero/[direction]/page.tsx`.
4. Tag any conversion links with a `proto-` source (e.g. `/waitlist/?src=proto-hero-stage`) so prototype clicks never count as real signups.
5. When a variant ships, mark it `live: true` in the registry and import the component where it goes live. Leave the prototype in place.

## Screenshots

`docs/prototypes/screenshots/` holds the hero build as it shipped: `home-hero.png` (E, live), `hero-a-split.png`, `hero-b-stage.png`, `hero-c-tour.png`, `hero-d-split-tour.png`, `home-full.png`, `prototypes-index.png`, and `engineer.png` (where the old newsletter hero went). Add pictures of a new prototype here when it's picked.

## Files

| Path | What it is |
|---|---|
| `src/app/prototypes/` | Routes: the index, one folder per prototype. The layout sets noindex. |
| `src/components/prototypes/` | Registry, floating switcher, index styles. |
| `src/components/OfficePreview/` | The working Books window: copied office CSS, sample data, the scaled frame. Reusable for any os.esy.com surface. |
| `src/components/HomeHero/` | The five hero directions. Stage Tour (E) is live on `/`. |
