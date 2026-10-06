# Design Research Report — The Bitter History of Chocolate

> **Subject**: The 3,500-year history of cacao, from Mesoamerican sacred substance to modern commodity
> **Design Researcher**: Design Research Agent
> **Date**: 2026-02-09
> **Spec Reference**: orchestration/skills/visual-essay-invocation/specs/the-bitter-history-of-chocolate.md

---

## Visual Archaeology

### Source Materials Studied

The visual identity for this essay is derived from five material sources:

1. **Cacao itself** — The pod, seed, nib, liquor, and bar at each stage of transformation. Colors and textures are literally extracted from the substance.
2. **Mesoamerican codices** — Codex Mendoza, Florentine Codex, Madrid Codex. Angular illustration style, flat color, jade/obsidian/terracotta palette.
3. **Colonial-era manuscripts and serving ware** — Spanish gold, Baroque silver, tooled leather, wax seals. The aesthetic of European extraction.
4. **Industrial-era patent drawings and advertising** — Mechanical precision, bold Victorian typography, factory photography in sepia tones.
5. **Modern documentary photography** — West African cocoa farms in harsh equatorial light; craft chocolate workshops in warm amber.

### Key Insight

Chocolate is unique among essay subjects because it is *itself* a visual material that transforms through multiple states. The design system follows the substance — every color, texture, and motion principle traces to a physical stage of cacao's transformation.

---

## Color Palette

### Primary Palette (Derived from Cacao Stages)

| Token | Hex | Name | Subject Derivation |
|-------|-----|------|--------------------|
| `--cacao-pod` | `#8B4513` | Raw Umber | Photographed exterior of a ripe cacao pod — the warm red-brown of Theobroma bark |
| `--cacao-seed` | `#DEB887` | Pale Seed | The cream-lavender of freshly cut cacao seeds before fermentation |
| `--fermented` | `#5C3317` | Fermented Bean | The deep purple-brown that develops during 5–7 days of fermentation |
| `--nib-dark` | `#2C1810` | Roasted Nib | Near-black of cracked, roasted nibs — the darkest stage of the transformation |
| `--liquor` | `#3E1F0D` | Cocoa Liquor | The viscous dark liquid when nibs are ground — pure cacao in liquid form |
| `--butter` | `#F5DEB3` | Cocoa Butter | The pale golden fat separated by Van Houten's hydraulic press — the lightest cacao derivative |
| `--bar-tempered` | `#4A2C17` | Tempered Dark | The glossy mahogany of a properly tempered dark chocolate bar |

### Era Accent Palette

| Token | Hex | Name | Subject Derivation |
|-------|-----|------|--------------------|
| `--maya-jade` | `#4A8B6F` | Jade Green | Mesoamerican jade — the sacred stone that accompanied cacao in ritual offerings |
| `--obsidian` | `#1A1A2E` | Obsidian | Volcanic glass used in Aztec ceremonial blades; the darkness before the pod cracks |
| `--maize-gold` | `#DAA520` | Maize Gold | The gold of maize, cacao's Mesoamerican companion crop |
| `--colonial-gold` | `#C8A951` | Spanish Gold | The plundered gold of Aztec treasure — the color of colonial extraction |
| `--burgundy` | `#722F37` | Conquistador Wine | Deep burgundy of Spanish court wine, the drink chocolate was replacing |
| `--brass` | `#B5A642` | Industrial Brass | The brass fittings of Van Houten's press, Lindt's conche, Hershey's factory |
| `--blood-red` | `#8B1A1A` | Blood of Gods | The Aztec belief: cacao was the blood of gods. This red appears only in sacred/ritual contexts |

### Background System

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-hero` | `#1A0F0A` | Very dark chocolate brown — hero and revelation sections |
| `--bg-body` | `#F0E6D0` | Parchment cream — primary reading background |
| `--bg-dark` | `#2C1810` | Nib-dark — used for data callouts and contrast sections |
| `--bg-modern` | `#FAFAFA` | Near-white — documentary/modern sections for harsh daylight feel |

### Color Usage Rules

1. **Hero/Revelation**: Dark chocolate background (`--bg-hero`) with cream text (`--butter`)
2. **Mesoamerican sections**: Jade, obsidian, terracotta accents on parchment
3. **Colonial sections**: Gold, burgundy, parchment — warm candlelit feel
4. **Industrial sections**: Sepia, brass, cream — mechanical warmth
5. **Modern exposé**: Near-white background, desaturated — harsh documentary honesty
6. **Modern bean-to-bar**: Return to warm amber/chocolate tones — craft counter-narrative
7. **Blood-red** (`--blood-red`): Used ONLY for the "blood of gods" motif — never for generic emphasis

---

## Typography

### Font Selections

| Role | Font | Weight | Subject Alignment |
|------|------|--------|-------------------|
| **Display / Headings** | Playfair Display | 700, 900 | High-contrast didone serif evokes both the angular carving of Mesoamerican glyphs and the European typographic tradition of chocolate house broadsheets. The thick-thin stroke contrast mirrors the bitter-sweet duality of the subject. |
| **Body / Historian Voice** | Source Serif Pro | 400, 600 | Designed for screen reading with roots in early modern punch-cutting. Its clarity and moderate contrast reference the scholarly tradition while remaining invisible as a reading surface. |
| **Witness Voice / Quotes** | Cormorant Garamond | 400i, 600i | Claude Garamont's 16th-century typeface redesigned for screens. The italic has a handwritten quality that evokes the colonial-era manuscripts and letters (Cortés to Charles V) that document chocolate's European arrival. |
| **Data Voice / Statistics** | JetBrains Mono | 400, 700 | Monospace precision for the modern investigative data: $0.78/day, 1.56 million children, 6% farmer share. The mechanical regularity of code typography against the organic irregularity of cacao. |
| **Captions / Labels** | Source Sans Pro | 400, 600 | The sans-serif companion to Source Serif — unobtrusive, functional, clear. |

### Typographic Scale

| Level | Size (mobile) | Size (desktop) | Line Height |
|-------|--------------|----------------|-------------|
| Display (hero title) | 2.5rem | 4.5rem | 1.1 |
| H1 (movement titles) | 2rem | 3rem | 1.15 |
| H2 (section titles) | 1.5rem | 2rem | 1.2 |
| Body | 1.125rem | 1.25rem | 1.7 |
| Pull quote | 1.375rem | 1.75rem | 1.5 |
| Data callout | 1rem | 1.125rem | 1.4 |
| Caption | 0.875rem | 0.9375rem | 1.5 |

### Era-Specific Typography Treatments

- **Mesoamerican**: Headings get extra letter-spacing (+0.05em) — evoking carved stone inscription
- **Colonial**: Pull quotes in Cormorant Garamond italic — the manuscript hand
- **Industrial**: Data callouts in JetBrains Mono — mechanical precision
- **Modern**: Body text slightly tighter (line-height: 1.6) — journalistic density

---

## Animation Philosophy

### Core Principle: "The Melt"

Chocolate is defined by *phase transitions* — solid to liquid, bitter to sweet, pod to bar. Every animation in this essay should evoke transformation: slow melts, gradual reveals, viscous flows. Nothing snaps; everything transitions.

### Motion Vocabulary

| Motion Type | Easing | Duration | Subject Connection |
|-------------|--------|----------|--------------------|
| **Reveal** (content entering) | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` | 600–800ms | Viscous — like liquid chocolate being poured |
| **Scroll-driven** (parallax, progress) | Linear or slight ease-out | Tied to scroll | Continuous flow — cacao as liquid running downhill |
| **Micro-interaction** (tap, hover) | `ease-out` | 200–400ms | Quick snap — like breaking a chocolate bar |
| **Era transition** | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | 1000–1200ms | Slow dissolve — like one era melting into the next |
| **Data animation** (charts, splits) | `ease-in-out` | 800ms | Measured, precise — the weight of facts |

### Scroll-Lock Motion Design

1. **Pod Crack (Hero)**: Slow fracture animation — the pod splits along its ridges. Interior glow increases as crack widens. Parallax seeds shift slightly inside. Motion should feel organic, geological — not mechanical.

2. **IngredientOracle**: Each stage transition uses a dissolve/morph effect — the pod dissolves into beans, beans darken into nibs, nibs liquify. The transition *is* the content. 700ms per stage transition.

3. **MigrationTrail**: The route line draws with a viscous quality — thick, slow, like pouring liquid on a tilted surface. At each stop, the landscape photograph fades in at 0.6 opacity, then sharpens to 1.0 over 400ms.

4. **Price Split**: The chocolate bar initially appears whole, then fractures along clean break lines. Each slice separates with subtle momentum — the larger slices (manufacturer, retailer) slide confidently; the farmer's tiny slice barely moves. Motion communicates inequality.

5. **TimefoldSlider**: Each era fades in with the era-specific palette shift. Background color morphs, typography adjusts. The slider handle is a cacao bean that transforms through stages as it moves across the timeline.

### Particle System

- **Cacao dust**: Fine particles (2–4px) in `--fermented` color, drifting at 0.3× parallax during era transitions
- **Liquid drips**: Occasional chocolate-colored drip animations at section boundaries — very subtle, decorative
- **Gold flecks**: In colonial sections only — tiny `--colonial-gold` particles, 0.2× parallax, evoking the gold obsession

### Reduced Motion

When `prefers-reduced-motion` is active:
- All scroll-lock sequences become simple fade-in reveals (no animation)
- Parallax disabled — all layers at 1.0× speed
- Particle systems disabled
- Era transitions become instant color switches (no morph)
- IngredientOracle stages appear as static carousel, no dissolve

---

## Visual Motifs

### Primary Motif: The Cacao Pod

The pod appears five times in the essay as a visual anchor:
1. **Hero**: Intact pod in darkness, cracking open
2. **Movement I**: Botanical illustration style — the sacred object
3. **Movement III**: Cross-section diagram — the industrial dissection
4. **Movement IV**: Documentary photograph — the West African harvest
5. **Revelation**: Same as hero, but now the reader sees it differently

### Secondary Motif: The Crack

The physical act of cracking — pod cracking, bar breaking — is the essay's recurring visual metaphor. Cracks appear as:
- Section dividers (hairline fracture lines instead of horizontal rules)
- Era transitions (the previous era's palette "cracks" to reveal the next)
- The Price Split animation (the bar literally cracks apart)
- The hero sequence (the original crack)

### Tertiary Motif: Liquid Pour

Chocolate in liquid form connects the Mesoamerican pouring technique (height pour for foam) to modern tempering. Liquid chocolate visuals appear in:
- Progress bar ("The Melt" — liquid filling from top)
- Section transitions (color washes that pour across the viewport)
- Quote callout backgrounds (dark chocolate gradient washes)

---

## Differentiation Check

### How This Essay's Design Differs from Previous Esy Essays

| Design Element | This Essay | Key Differentiator |
|---------------|------------|-------------------|
| **Color source** | Literally derived from cacao's physical transformation stages | Not metaphorical — colors are extracted from the actual substance |
| **Animation philosophy** | "The Melt" — viscous, phase-transition motion | No other essay uses liquid/viscous easing as primary motion vocabulary |
| **Progress bar** | Vertical chocolate melt strip | Unique form factor — liquid filling, not thread or line |
| **Typography contrast** | 5-font system with three narrative voices | Unusually rich type palette — most essays use 3 fonts |
| **Era transitions** | Gradual palette morph via scroll position | Continuous gradient shift, not discrete section breaks |
| **Primary motif** | Cacao pod as recurring visual anchor (5 appearances) | Subject-as-motif — the pod IS the visual system |
| **Interaction type** | IngredientOracle + FlavorWheel + MigrationTrail + Price Split | Four distinct interaction modes — most essays have 1–2 |
| **Dark mode strategy** | Dark chocolate (#1A0F0A) hero, parchment body, dark data sections | Three-tone approach — not binary light/dark |

### Cross-Essay Collision Check

Reviewed all existing DESIGN-RESEARCH.md files in `src/app/essays/`. No collisions found:
- **Silk**: Luminous thread metaphor, shimmer particles, textile textures — distinct
- **Water Scarcity**: Blue/earth tones, geographic data-driven — distinct
- **Black Hole**: Cosmic darkness, gravitational lensing, scientific purple — distinct
- **Chocolate**: Cacao-derived browns/golds, viscous motion, food-substance palette — unique in the Esy catalog

---

## CSS Custom Properties (Implementation Reference)

```css
:root {
  /* Cacao Transformation Palette */
  --cacao-pod: #8B4513;
  --cacao-seed: #DEB887;
  --fermented: #5C3317;
  --nib-dark: #2C1810;
  --liquor: #3E1F0D;
  --butter: #F5DEB3;
  --bar-tempered: #4A2C17;
  
  /* Era Accents */
  --maya-jade: #4A8B6F;
  --obsidian: #1A1A2E;
  --maize-gold: #DAA520;
  --colonial-gold: #C8A951;
  --burgundy: #722F37;
  --brass: #B5A642;
  --blood-red: #8B1A1A;
  
  /* Backgrounds */
  --bg-hero: #1A0F0A;
  --bg-body: #F0E6D0;
  --bg-dark: #2C1810;
  --bg-modern: #FAFAFA;
  
  /* Typography */
  --font-display: 'Playfair Display', serif;
  --font-body: 'Source Serif Pro', serif;
  --font-witness: 'Cormorant Garamond', serif;
  --font-data: 'JetBrains Mono', monospace;
  --font-caption: 'Source Sans Pro', sans-serif;
  
  /* Animation */
  --ease-viscous: cubic-bezier(0.25, 0.1, 0.25, 1.0);
  --ease-era-shift: cubic-bezier(0.4, 0.0, 0.2, 1.0);
  --duration-reveal: 700ms;
  --duration-era: 1100ms;
  --duration-micro: 300ms;
}
```

---

*Design research complete. Visual identity is uniquely derived from the physical substance of cacao and its transformation through human history. No cross-essay collisions detected.*
