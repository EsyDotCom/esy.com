# Esy — Visual Language: Vinyl

## Status
AUTHORITATIVE / SOURCE OF TRUTH for Esy's imagery
Decided: 2026-10-11 · Mason's name, arms and references added 2026-10-14
Owner: Zev

---

## The decision

**Esy's material is vinyl.** Every picture Esy makes of its world, from Mason to abstract art, is made of vinyl, in one of three forms:

| Form | What it is | Used for |
|---|---|---|
| **Matte-satin vinyl** | A moulded designer-toy figure: smooth, soft sheen, crisp edges slightly softened. | Mason, and the props and playset world around him. |
| **Glossy vinyl** | The same moulded material polished to a shine, with clear studio reflections. | Abstract art: networks, systems, pieces, cities. |
| **Lit vinyl** | Translucent parts that glow from inside, teal and jade, like lit acrylic. | Light, flow and connection: the tubes, seams and nodes that show work moving. |

Felt and flocked vinyl were tried (prototypes, 2026-10-11) and are **retired**. Don't make new images in them.

**The theme is toys.** The systems Esy builds are serious; the world we show them in is a toy world, where complex machines look as simple to pick up as a playset. Everything we picture, Mason, the footer, covers, banners, abstract art, keeps that toy feel: moulded, tactile, made to be handled, calm rather than cute.

Why vinyl: it keeps the exact 45° cuts of the esy wordmark's stencil, so Mason and the logo read as one family; it is precise, made and durable, like the work Esy stands for; and it holds up from a footer down to a thumbnail, where softer finishes go dark and flat.

---

## Mason in vinyl

Mason is a designer vinyl toy. He is always the same figure:

- a squat, angular octopus; his head is a tall **octagon with 45° cut corners**, with a small **teal stripe** on its left side
- two big upright **rectangular ivory eyes** with small dark rectangular pupils; no mouth; calm and neutral, never grinning
- a **navy collar** under the head
- **eight arms** of short blocky segments in navy and deep teal, every tip bright teal

### His name

- **OctoMason™** is the mark: the word and the character design. Write it with ™ (® only once it's registered) wherever he appears as the brand: /mason (his page), /brand, merch, the vinyl toy, clip.art packs, social handles.
- **Mason** is what we call him everywhere else: story copy, captions, covers, alt text. "Mason" alone never takes ™.
- Introduce him once per place as **"OctoMason™ (Mason for short)"**.
- octomason.com redirects to esy.com/mason. Filing the mark waits on a USPTO search and an attorney's clearance.

### His eight arms

He has **eight arms, never more**. Not all eight have to show.

- **At rest:** seven arms fan forward and the **eighth curls up behind him like a tail**: four chunky blocks and a teal tip, rising behind his right side. Never fan all eight forward at rest.
- **At work:** all eight can show, each doing a job (typing, stamping, holding) or standing.
- **Hidden arms are fine** when the scene explains it: behind a desk, out of frame, tucked under him. The footer shows four.
- Never curl the eighth out to the side in front of him as a decoration.

### His two references

| Reference | What it shows | Used for |
|---|---|---|
| **The display shot**: studio shot at rest with the tail (api.esy.com run-cfbeb89e), plus the tail turnaround | Who he is, all eight arms accounted for | /mason, /brand, anyone drawing him |
| **The generation master**: the original front studio shot, seven arms forward, the eighth hidden behind (run-80a49586) | A calm starting point | Every new picture is edited from this one |

Why two: the image model can't count. Started from the tail shot it adds a ninth or tenth arm; started from the seven-arm shot it stays close to eight. So we generate from the seven-arm shot and make every finished picture match the rule above. The seven-arm shot and its old turnaround are also kept in esy.com `public/brand/kit/archive/`; never delete them.

**Never describe him from words alone**: the model drifts (a render from words gave him a cube head, 2026-10-11). Every new picture is an edit of the generation master.

### Checking every picture

Before any picture of Mason is used:

1. **Count his arms.** More than eight: paint over the extra and re-render. At rest without the tail: add it.
2. **Fix by guide, not by words.** The model doesn't follow counts, sizes or shapes from text. Paint the exact shapes onto the image (blocks for an arm, a bar for a slot), upload it, and edit from that guide, asking only to finish the look. This is how the tail, the eight-arm studio shot and issue 4's handoff were fixed.
3. **Zoom in to check.** Count from a crop of the arms, not the whole cover.

### Later: a 3D model

If OctoMason becomes merch and a vinyl toy, he should exist as a posable 3D model built from the turnaround. Renders from it hold the count and shape every time, and the toy needs that model anyway.

He may wear a product's colours for the newsletter (*Camouflage*: the colours change, the shape never does).

The flat stencil drawing of Mason (`OctopusFigure`, code) stays for small and functional uses: icons, avatars, the loader, 404s, anything under about 100px or that must move cheaply in code. It is a drawing of the vinyl figure, not a second mascot. At rest it follows the same rule: seven arms forward and the tail (`pose="rest"`).

**Icons:** the browser tab is his vinyl head alone on transparent, as tall as the icon (being tried since 2026-10-18; the e on navy before, and a navy-tile version is in the suite). The navy app tile keeps a small border (head 88% of the height). The app icon is his vinyl head on teal, filling about three quarters of the tile (Android gets a smaller foreground inside its safe circle); below 40pt it falls back to the flat head. Files and the full suite: esy.com/brand#icons.

---

## The world is vinyl too

When Mason appears, **the whole scene is made of the material**: desk, walls, lamps, plants, props, all moulded vinyl at his scale, like a designer-toy playset. Never a vinyl figure dropped into a real photo.

- Palette: navy `#0A2540`, ink `#061527`, teal `#00A896`, jade `#00D4AA`, mint `#2BD8BB`, ivory `#F4F1EA`. Warm lamp light is allowed. Other colours appear only as a product's own colours on the newsletter.
- Night by default: deep navy rooms, lit by lamps, screens and lit vinyl.
- Abstract art floats on a deep navy ground, glossy shapes joined by lit vinyl.

---

## Rules that carry over

- **Mason works.** When he is the main character he is doing something relevant; he doesn't just sit or pose.
- **What he builds is abstract.** Shapes, pieces, nodes and light, cut at 45°. Never label them with products or verticals.
- **Never park two symbols side by side.** Each element has its own job; a secondary one sits apart.
- **Models draw no words and no logos.** Words are set afterwards in our type (Black Ops One for the wordmark, Cormorant Garamond for names, Helvetica Neue for lines). Company logos appear only as the companies' own files, laid on afterwards, never redrawn.
- **People's own profiles stay real.** Zev's personal LinkedIn, X and YouTube banners keep his real desk photo; vinyl art speaks for Esy and The Marketing Engineer, not for a person.

---

## Where it's used

| Surface | Vinyl form |
|---|---|
| Newsletter covers | **Vinyl Mason acting out the issue's title** (the standard since 2026-10-12): one plain sentence of what he's doing that shows the title, made from his studio shot (`esy.com/scripts/newsletter-mason-cover.mjs`). Issues about another company's product may use his camouflage, with the product's logo on a tag. |
| YouTube thumbnails | Vinyl Mason scenes, alongside the face-led A · Desk template |
| Site footer world | Mason in a vinyl playset, showing what Esy stands for |
| Brand banners (newsletter, Skool, Esy pages) | Glossy-and-lit abstract art |
| Merch | Vinyl Mason as the standard figure |

---

## How it's made

- Mason scenes: `edit-image` on api.esy.com from the generation master (run-80a49586), the instruction naming his look, the material, the vinyl world and the eight-arm rule. Then count his arms and fix by guide (see "Checking every picture").
- Abstract art: `generate-photoreal-image` (4:3), or `edit-image` over a plain navy 2560×1440 placeholder for 16:9 banners at full size.
- Words and logos: laid on by script.

Working references (esy.com prototypes, 2026-10-11): `/prototypes/mason-toy/` (materials, footers, Mason in use), `/prototypes/newsletter-topic-cover/` (Camouflage; P · Network, Q · Systems), `/prototypes/vinyl-banners/`.

---

## End of Visual Language
