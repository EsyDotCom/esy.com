# Design Research: Seven Million Years

**Status**: ✅ APPROVED
**Date**: February 24, 2026
**Essay**: Seven Million Years — The Complete Visual History of Our Kind
**Category**: Science / Paleoanthropology

---

## Design Philosophy

This essay's visual identity is derived entirely from the physical materials and environments of hominin evolution: **geological strata**, **fossilized bone**, **stone tools**, **cave interiors**, **red ochre pigments**, and the **African landscape**. The experience should feel like descending through layers of deep time — each era a distinct geological stratum with its own character — culminating in the illuminated present.

The guiding metaphor is **the stratigraphic column**: layers of earth and time compressed into visual form. Just as paleontologists read history in cross-sections of sediment, the reader scrolls down through millions of years, with each section's visual treatment reflecting its geological and cultural era.

This is not a tech-forward essay. It is **photography-forward** — the experience of walking through a world-class natural history museum at night, with dramatic specimen lighting, vast landscape panoramas, and quietly authoritative data visualizations that belong in a peer-reviewed journal, not a dashboard.

---

## Color Palette

Every color in this palette traces to a physical material in the hominin world.

### Primary Colors

| Name | Hex | HSL | Source Material |
|------|-----|-----|-----------------|
| **Stratum Dark** | `#1A1610` | 36°, 25%, 8% | Deep cave interior — Lascaux, Chauvet, Denisova Cave. The darkness where bones wait to be found. |
| **Stratum Mid** | `#2C2519` | 33°, 28%, 14% | Compressed sediment layer — the brown-black of fossilized earth. |
| **Bone Ivory** | `#E8DCC8` | 36°, 38%, 85% | Fossilized hominin bone — the color of a cleaned cranium under museum lighting. The primary text color. |

### Secondary Colors

| Name | Hex | HSL | Source Material |
|------|-----|-----|-----------------|
| **Ochre Red** | `#C4572A` | 16°, 64%, 47% | Red ochre (iron oxide, Fe₂O₃) — the oldest known pigment used by hominins, from at least 300,000 years ago (Blombos Cave). Used for body painting, cave art, and symbolic marking. The primary accent color. |
| **Yellow Ochre** | `#C89B3C` | 40°, 55%, 51% | Yellow ochre (goethite) — another prehistoric pigment. Found in hominin contexts from 200,000+ years ago. Used for secondary emphasis and data visualization highlights. |
| **Flint Grey** | `#8A8477` | 40°, 7%, 50% | Flaked flint / knapped stone tool surface — the grey of an Acheulean hand axe's fracture plane. Used for muted text, borders, and UI elements. |

### Tertiary / Era-Specific Colors

| Name | Hex | HSL | Source Material |
|------|-----|-----|-----------------|
| **Savanna Gold** | `#B89E5A` | 43°, 37%, 54% | Dry East African grassland — the landscape where Lucy walked. For Pliocene-era sections. |
| **Rift Sienna** | `#8B5E3C` | 24°, 39%, 39% | Exposed Rift Valley sediment — the layered canyon walls of Olduvai Gorge. For geological and timeline elements. |
| **Glacial Blue** | `#6B8FA4` | 203°, 22%, 53% | Ice Age Europe — glacial meltwater, the cold world of the Neanderthals. For Late Pleistocene sections. Sparingly used — this is primarily a warm palette. |
| **Ash Charcoal** | `#3D3832` | 30°, 9%, 22% | Volcanic ash (Laetoli, Toba) — the background for card-like elements. |
| **Ember Glow** | `#D4743B` | 22°, 63%, 53% | Controlled fire (~1 MYA) — the warmth of a hominin hearth. For hover states and interactive highlights. |

### Palette Rules
- **Background gradient**: `Stratum Dark` → `Stratum Mid` — subtle shift as reader scrolls deeper
- **Text hierarchy**: `Bone Ivory` for body, `Flint Grey` for secondary, `Ochre Red` for emphasis
- **Data visualization**: Use `Ochre Red`, `Yellow Ochre`, `Savanna Gold`, `Glacial Blue`, `Rift Sienna` as a diverging palette. Never use pure red/blue/green — stay within the earth-tone family.
- **Hover/Active**: `Ember Glow` for interactive elements
- **Borders**: `Flint Grey` at 30% opacity

---

## Typography

### Display Font: Newsreader (Google Fonts — already loaded in project)
- **Why**: Newsreader is a transitional serif with editorial authority and excellent readability at large sizes. Its slightly condensed proportions and sharp details evoke the typography of scientific journals (Nature, Science) and quality longform journalism (NYT Magazine).
- **Subject connection**: The serif form echoes the carved inscriptions of museum specimen labels — authoritative, permanent, unhurried.
- **Usage**: Hero title, section headings (h1, h2)
- **Weights**: 400 (body), 600 (subheadings), 700 (display)

### Body Font: Literata (Google Fonts — already loaded in project)
- **Why**: Literata was designed specifically for long-form digital reading. It has generous x-height, clear letter differentiation, and excellent rendering on screens. It reads beautifully in the 16–19px range.
- **Subject connection**: Literata's warm character and humanist proportions feel appropriate for a story about humanity itself. It is neither clinical nor casual — it has the tone of a knowledgeable guide.
- **Usage**: Body text, captions, blockquotes
- **Weight**: 400 (regular), 400 italic (emphasis)

### Data Font: Inter (Google Fonts — already loaded in project)
- **Why**: Inter is optimized for UI and data labels. Clean, neutral, highly legible at small sizes. Works perfectly for chart axes, legends, and annotation labels.
- **Subject connection**: The modern sans-serif provides visual contrast against the serif body text — the present looking back at the past. Data labels should feel contemporary and precise.
- **Usage**: Chart labels, axis values, data annotations, badges, navigation
- **Weights**: 400, 500, 600

### Monospace Font: Geist Mono (already loaded in project)
- **Why**: For dates, measurements, and technical taxonomic names. The monospace treatment signals precision and scientific data.
- **Usage**: MYA/kya dates, cranial capacity values (e.g., "1,350 cc"), Latin binomial names when used inline as data points
- **Weight**: 400

### Type Scale

```
--smy-font-display: 'Newsreader', 'Georgia', serif;
--smy-font-body: 'Literata', 'Georgia', serif;
--smy-font-data: 'Inter', 'Helvetica Neue', sans-serif;
--smy-font-mono: 'Geist Mono', 'Consolas', monospace;

Hero title:    clamp(2.5rem, 7vw, 4rem)    / Newsreader 700
Section h2:    clamp(1.75rem, 4.5vw, 2.75rem) / Newsreader 600
Subsection h3: clamp(1.25rem, 3vw, 1.625rem)  / Newsreader 500
Body:          clamp(1rem, 1.125rem, 1.1875rem) / Literata 400
Caption:       0.875rem                       / Inter 400
Data label:    0.75rem                        / Inter 500
Date/measure:  0.8125rem                      / Geist Mono 400
```

---

## Animation Philosophy

### Guiding Principle
Every animation must **reveal information** or **orient the reader in time/space**. Nothing moves for decorative reasons. The pace should feel **geological** — slow, deliberate, weighty — not digital or snappy.

### Scroll Animations
- **Section reveals**: Sections fade in with a subtle upward translate (12px) over 700ms. The easing is heavy: `cubic-bezier(0.25, 0.1, 0.25, 1.0)` — like sediment settling.
- **Staggered children**: Within data grids and comparison cards, children stagger by 80ms — giving the impression of layers being revealed.
- **No parallax**: This essay does not use parallax scrolling. Parallax feels playful; this story is serious.

### Data Visualization Transitions
- **Chart enter**: Data points fade in and scale from center, staggered by position — like fossils being unearthed.
- **Migration map**: Paths animate along their route using D3 `attrTween` with eased interpolation. Speed: ~3 seconds per major route segment. The animation should feel like a slow pulse spreading across the map.
- **Timeline scrub**: When the user interacts with time-based controls, transitions are 300ms with easing — responsive but not jarring.

### Photography Transitions
- **Full-bleed images**: Fade in from 0 to full opacity over 800ms as they enter the viewport. No zoom, no slide.
- **Specimen images**: Subtle scale (0.98 → 1.0) over 600ms — as if the reader is leaning in to look closer.

### Hover States
- **Interactive elements**: Background color shifts to `Ember Glow` at 15% opacity. Transition: 200ms ease.
- **Chart data points**: Scale to 1.15× with a tooltip appearing. Transition: 150ms.
- **No hover animations on mobile**: Use `:hover` only within `@media (hover: hover)`.

### Reduced Motion
All animations respect `prefers-reduced-motion: reduce`. In reduced-motion mode:
- Section reveals become instant (opacity: 1, no transform)
- Chart transitions are instant
- Migration map shows final state without animation
- Photography loads at full opacity

---

## Visual Motifs

### 1. Stratigraphic Layering
The primary visual motif. Section backgrounds subtly shift in tone as the reader scrolls — darker at the top (deep time) to slightly warmer as we approach the present. Thin horizontal rules between sections evoke the boundaries between geological strata.

**CSS implementation**: Alternating `background-color` values between `Stratum Dark` and `Ash Charcoal` for different sections. A thin 1px border using `Rift Sienna` at 30% opacity separates eras.

### 2. The Divider Line
Between major sections, a thin horizontal line appears — representing the boundary between geological eras. The line uses a gradient: transparent → `Rift Sienna` → transparent. Width: 40% of container, centered.

### 3. Era Badges
Each section begins with a small badge showing the era name and date range (e.g., "3.9–2.9 MYA — The Pliocene"). The badge uses `Geist Mono` in `Ochre Red`, with a small dot indicator. This provides temporal orientation throughout the scroll.

### 4. Specimen Frame
When fossil photographs appear, they sit in a frame styled to evoke museum display: dark background (`Stratum Dark`), subtle inner shadow, thin border in `Flint Grey`. Caption below in `Inter 400`.

### 5. Reading Progress
A thin vertical bar on the left edge of the viewport fills with `Ochre Red` as the reader scrolls — like sediment filling a core sample tube. Notch marks at section boundaries.

---

## Differentiation Check

### How this differs from every existing Esy essay:

| Existing Essay | Its Design | This Essay's Design | Difference |
|---------------|-----------|--------------------| -----------|
| The Sword | Metallurgical (tamahagane, forge orange, hamon white) | Geological/paleontological (earth strata, bone, ochre) | Material world: metal vs. earth/bone |
| Silk | Textile (mulberry, gold, ivory, lapis) | Geological/paleontological | Material world: fabric vs. stone |
| The Speed of Everything | Kinetic/physics (velocity-derived) | Deep time/biological | Domain: physics vs. evolution |
| Inside a Black Hole | Cosmic (gravitational, spacetime) | Terrestrial/archaeological | Scale: cosmic vs. earthbound |
| The Anatomy of a Wave | Physics/water (blue, oscillation) | Earth/bone (warm, layered) | Color temperature: cool vs. warm |

### Unique aspects of this design:
1. **Photography-forward**: No other Esy essay is this photographic. Most are illustration/SVG-driven.
2. **Warm earth palette**: Most essays trend cool or neutral. This is deliberately warm — sienna, ochre, bone.
3. **Stratigraphic structure**: The layered-earth metaphor is unique. No other essay uses geological layering as its organizing visual principle.
4. **Museum lighting treatment**: The specimen photography treatment (dark background, dramatic lighting, caption below) is not used in any other essay.
5. **Deep time navigation**: The era badge + date system is specific to this essay's need to orient readers across 7 million years.
6. **Dual serif typographic system**: Newsreader for display + Literata for body is a unique pairing not used elsewhere. Both are already loaded but not used together.

---

## CSS Custom Properties (Preview)

```css
:root {
  /* Primary: Geological strata */
  --smy-stratum-dark: #1A1610;
  --smy-stratum-mid: #2C2519;
  --smy-bone-ivory: #E8DCC8;

  /* Secondary: Hominin pigments */
  --smy-ochre-red: #C4572A;
  --smy-yellow-ochre: #C89B3C;
  --smy-flint-grey: #8A8477;

  /* Tertiary: Era-specific */
  --smy-savanna-gold: #B89E5A;
  --smy-rift-sienna: #8B5E3C;
  --smy-glacial-blue: #6B8FA4;
  --smy-ash-charcoal: #3D3832;
  --smy-ember-glow: #D4743B;

  /* Text hierarchy */
  --smy-text-primary: var(--smy-bone-ivory);
  --smy-text-secondary: var(--smy-flint-grey);
  --smy-text-accent: var(--smy-ochre-red);

  /* Backgrounds */
  --smy-bg-primary: var(--smy-stratum-dark);
  --smy-bg-secondary: var(--smy-stratum-mid);
  --smy-bg-card: var(--smy-ash-charcoal);

  /* Borders */
  --smy-border: rgba(138, 132, 119, 0.3);
  --smy-divider: rgba(139, 94, 60, 0.3);

  /* Typography */
  --smy-font-display: 'Newsreader', 'Georgia', serif;
  --smy-font-body: 'Literata', 'Georgia', serif;
  --smy-font-data: 'Inter', 'Helvetica Neue', sans-serif;
  --smy-font-mono: 'Geist Mono', 'Consolas', monospace;

  /* Animation */
  --smy-ease-geological: cubic-bezier(0.25, 0.1, 0.25, 1.0);
  --smy-ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
  --smy-duration-fast: 200ms;
  --smy-duration-normal: 700ms;
  --smy-duration-slow: 1200ms;
}
```
