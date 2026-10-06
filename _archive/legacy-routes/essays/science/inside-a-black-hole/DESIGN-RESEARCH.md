# Design Research: Inside a Black Hole

> **Essay**: Inside a Black Hole — What Physics Actually Tells Us
> **Type**: Conceptual Essay (Pure)
> **Date**: February 8, 2026
> **Design Researcher**: Pedagogical Lens — Astrophysics/GR Domain

---

## Design Philosophy

The visual identity of this essay must be **derived from the subject itself**: the physics of black holes. Every design decision — color, type, motion, layout — should feel like a consequence of the content, not a decorative layer applied on top.

### Core Design Principle: Darkness as Medium

Black holes are defined by absence — the absence of light, the absence of escape, the absence of information. The essay's design should make darkness the primary medium, not just a "dark mode" background. Light (text, diagrams, accents) emerges FROM the darkness, the way photons emerge from the accretion disk surrounding the void.

### Subject-Derived Design Signals

| Physical Phenomenon | Design Implication |
|---|---|
| Event horizon (boundary, irreversibility) | Hard transitions in scroll interactions; once the reader "crosses," the visual tone shifts subtly |
| Gravitational lensing (light bending) | Curved elements, warped grids, radial distortions in diagram aesthetics |
| Time dilation (observer duality) | Split compositions, asymmetric pacing, dual color temperatures |
| Singularity (inevitability, temporal) | Vertical convergence — visual elements converge UPWARD, not inward |
| Hawking radiation (faint glow from void) | Subtle luminous accents emerging from dark backgrounds |
| Penrose diagrams (geometric purity) | Clean SVG lines, mathematical precision, no organic/hand-drawn aesthetics |
| Spacetime curvature | Grid distortions as a recurring motif — straight lines that curve near "massive" elements |

---

## Color System

### Primary Palette: The Spectrum of a Black Hole

The palette is derived from the actual electromagnetic signatures of black holes — the colors of accretion disks, redshifted light, and the EHT image.

```
┌─────────────────────────────────────────────────┐
│  THE VOID              #050508                  │
│  Near-absolute black. The essay's ground truth. │
│  Not gray. Not dark blue. BLACK.                │
│                                                  │
│  ACCRETION GOLD        #c4922a                  │
│  The dominant accent. Derived from the EHT      │
│  image's photon ring — heated gas at billions   │
│  of degrees. Warm, luminous, authoritative.     │
│                                                  │
│  LENSING BLUE          #3d7ec7                  │
│  Cool counterpoint. The color of shifted light  │
│  paths, gravitational blueshift, Penrose        │
│  diagram elements. Cerebral, precise.           │
│                                                  │
│  QUANTUM VIOLET        #6b4fa0                  │
│  Used ONLY for quantum effects (Sections 7-8).  │
│  Hawking radiation, the information paradox,    │
│  the frontier of known physics. Signals         │
│  "we've left classical physics behind."         │
│                                                  │
│  HORIZON TEAL          #1a9e8f                  │
│  Interactive highlights. Where the reader can   │
│  touch, click, explore. The color of agency.    │
│                                                  │
│  DANGER RED            #b5382a                  │
│  Sparingly used. Tidal forces, spaghettification│
│  lethal zones. Physical danger.                 │
│                                                  │
│  TEXT PRIMARY           #e0dcd8                  │
│  Warm off-white. NOT pure white (too harsh      │
│  against #050508). Slight warmth creates        │
│  intimacy — you're being told a story.          │
│                                                  │
│  TEXT SECONDARY         #8a8580                  │
│  Muted. Captions, annotations, secondary info.  │
│  Recedes but remains readable (WCAG AA on       │
│  #050508 background).                           │
│                                                  │
│  DIAGRAM LINES         #4a4a5a                  │
│  For structural diagram elements (grids, axes,  │
│  boundaries). Visible but not dominant.         │
│                                                  │
│  SINGULARITY WHITE     #ffffff                  │
│  Pure white — used ONLY for the singularity     │
│  line in Penrose diagrams. Maximum contrast     │
│  signals maximum importance.                    │
└─────────────────────────────────────────────────┘
```

### Color Rules

1. **No more than 2 accent colors per section.** Each section has a dominant accent:
   - Sections 1: Gold (EHT ring)
   - Section 2: Gold + Red/Blue split (observer duality — warm redshift vs. cool blueshift)
   - Section 3: Teal (the crossing — interactivity)
   - Section 4: White + Blue (Penrose diagram — geometric purity)
   - Section 5: Red (danger — tidal forces)
   - Section 6: Teal + Blue (interactive Penrose)
   - Section 7: Violet (quantum regime)
   - Section 8: Violet + Blue (frontier)
   - Section 9: Gold (callback to opening — circle closes)

2. **Color transitions signal conceptual shifts.** The palette warms in Sections 1-3 (classical, embodied), cools in 4-6 (geometric, structural), shifts to violet in 7-8 (quantum), and returns to gold in 9 (philosophical close).

3. **Background is ALWAYS #050508.** No gray cards, no lighter backgrounds, no gradients to lighter tones. The void is constant.

4. **Colorblind safety.** Gold/blue/violet/teal are distinguishable across most color vision deficiencies. Red is NEVER used as the sole differentiator — always paired with shape or label.

### CSS Custom Properties

```css
:root {
  /* Backgrounds */
  --void: #050508;
  --void-elevated: #0a0a10;     /* For subtle card-like elevation */

  /* Text */
  --text-primary: #e0dcd8;
  --text-secondary: #8a8580;
  --text-caption: #6a6560;

  /* Accents */
  --accretion-gold: #c4922a;
  --accretion-gold-dim: #8a6820;   /* For less prominent gold */
  --lensing-blue: #3d7ec7;
  --lensing-blue-dim: #2a5a8f;
  --quantum-violet: #6b4fa0;
  --quantum-violet-dim: #4a3670;
  --horizon-teal: #1a9e8f;
  --danger-red: #b5382a;
  --danger-red-dim: #7a2820;

  /* Diagram */
  --diagram-line: #4a4a5a;
  --diagram-line-hover: #7a7a8a;
  --singularity-white: #ffffff;

  /* Glow effects */
  --glow-gold: 0 0 20px rgba(196, 146, 42, 0.3);
  --glow-blue: 0 0 15px rgba(61, 126, 199, 0.25);
  --glow-violet: 0 0 15px rgba(107, 79, 160, 0.25);
  --glow-teal: 0 0 12px rgba(26, 158, 143, 0.2);
}
```

---

## Typography

### Typeface Selection

**Display & Body: Newsreader** (Google Fonts, free)

Rationale: Newsreader is a transitional serif designed for immersive long-form reading. Its moderate contrast and open apertures provide excellent legibility on dark backgrounds. It has the editorial authority of a quality publication without the sterility of Garamond or the heaviness of Georgia.

Fallback chain: `'Newsreader', 'Source Serif Pro', Georgia, 'Times New Roman', serif`

**Diagram Labels & Annotations: JetBrains Mono** (free, open source)

Rationale: Monospaced type in diagram labels signals "this is precise, scientific, measurable." It creates a clear visual distinction between narrative prose (serif) and factual annotation (mono). JetBrains Mono has excellent legibility at small sizes and distinguishes similar characters (0/O, 1/l/I) which matters for physics notation.

Fallback chain: `'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Courier New', monospace`

### Type Scale

```
Display Heading (essay title):
  font-family: Newsreader
  font-size: clamp(2.5rem, 5vw, 3.5rem)
  font-weight: 700
  line-height: 1.1
  letter-spacing: -0.02em
  color: var(--text-primary)

Section Heading (## sections):
  font-family: Newsreader
  font-size: clamp(1.75rem, 3.5vw, 2.25rem)
  font-weight: 600
  line-height: 1.2
  letter-spacing: -0.01em
  color: var(--text-primary)

Body Prose:
  font-family: Newsreader
  font-size: clamp(1.05rem, 1.8vw, 1.2rem)
  font-weight: 400
  line-height: 1.85
  letter-spacing: 0
  color: var(--text-primary)
  max-width: 680px

Pull Quote:
  font-family: Newsreader
  font-size: clamp(1.3rem, 2.5vw, 1.6rem)
  font-weight: 400
  font-style: italic
  line-height: 1.5
  color: var(--accretion-gold)
  border-left: 3px solid var(--accretion-gold-dim)
  padding-left: 1.5rem

Caption / Annotation:
  font-family: JetBrains Mono
  font-size: clamp(0.7rem, 1.2vw, 0.8rem)
  font-weight: 400
  line-height: 1.5
  letter-spacing: 0.04em
  text-transform: uppercase
  color: var(--text-secondary)

Diagram Label:
  font-family: JetBrains Mono
  font-size: 0.75rem
  font-weight: 500
  line-height: 1.3
  color: var(--text-primary)

Inline Citation:
  font-family: JetBrains Mono
  font-size: 0.7rem
  font-weight: 400
  color: var(--text-secondary)
  opacity: 0.8
```

### Typography Rules

1. **No Inter.** Inter is a UI font designed for interfaces. This is an essay, not a dashboard. Using Inter for body text signals "software," not "authoritative publication."

2. **Serif dominance.** 90%+ of visible text should be Newsreader. Monospace is reserved for annotations, labels, and citations — the "data layer" overlaid on the narrative.

3. **Line-height is generous.** 1.85 for body text. Dense conceptual physics needs breathing room. The reader will re-read sentences.

4. **No font-weight below 400.** Light and thin weights disappear on dark backgrounds. Even secondary text stays at 400.

5. **Letter-spacing adjustments:**
   - Headings: negative tracking (-0.01 to -0.02em) for visual weight
   - Body: default (0)
   - Monospace annotations: positive tracking (0.04em) for legibility at small sizes

---

## Animation Philosophy

### Core Principle: Motion as Physics

Every animation in this essay should feel like it obeys the laws of the subject. No bouncy easing, no playful springs, no elastic effects. Motion here is gravitational — smooth, inevitable, decelerating as it reaches equilibrium.

### Easing Curves

```
Standard entrance:     cubic-bezier(0.25, 0.1, 0.25, 1.0)   — smooth deceleration
Gravitational fall:    cubic-bezier(0.4, 0.0, 1.0, 1.0)     — accelerating toward destination
Fade in from void:     cubic-bezier(0.0, 0.0, 0.2, 1.0)     — slow start, then appear
Scroll-lock progress:  linear                                  — tied to scroll position
Exit/fade out:         cubic-bezier(0.4, 0.0, 0.6, 1.0)     — gentle departure
```

### Animation Rules

1. **No animation exceeds 600ms.** The universe inside a black hole is relentless. Animations should feel purposeful, not leisurely.

2. **Scroll-locked sections use linear easing.** When animation is tied to scroll position, the reader controls the pace. No easing on top of manual control.

3. **GPU-only properties.** All animations use `transform` and `opacity` only. No animating `width`, `height`, `margin`, `top`, `left`, `background-color`, or `border`.

4. **Entrance pattern: Emergence from void.** Elements fade in from opacity 0 and translate upward slightly (10-20px). They emerge from darkness — not slide in from the side, not scale up, not bounce.

5. **Stagger pattern: Gravitational cascade.** When multiple elements enter, they stagger with 80-120ms delays. Each element appears to "fall" into place after the previous one, like objects in a gravitational field.

6. **Scroll-crossing moment (Section 3).** The ONE exception to subtlety. A very brief (200ms) pulse of the horizon marker — a thin horizontal line that flashes accent-teal and fades — signals the crossing. This is the only "event" in an otherwise smooth scroll. The point: even this is subtle.

7. **Penrose diagram build.** Additive — each step adds to the previous. No step replaces what came before. The diagram is being CONSTRUCTED, not revealed. Lines draw from their starting point outward, as if being plotted by a patient hand.

8. **Information flow diagram.** The LEFT side (information falling in) uses structured, colorful, varied animations — each icon has character. The RIGHT side (Hawking radiation) uses identical, monochrome, uniform motion — every particle is the same. The animation contrast IS the paradox.

9. **Reduced motion.** All `prefers-reduced-motion: reduce` cases show the final state immediately with no transition. The essay must be fully comprehensible without any animation.

### Scroll Interaction Design

```
Section 2 — Observer Duality Split:
  Type: Scroll-locked
  Depth: 600px
  Behavior: Both panels advance synchronously with scroll
  Left panel progressively redshifts; right panel stays normal

Section 3 — Crossing the Horizon:
  Type: Scroll-locked
  Depth: 400px
  Behavior: Continuous environmental transition
  Pre-horizon → horizon marker flash → post-horizon star compression

Section 4 — Penrose Progressive Build:
  Type: Scroll-locked
  Depth: 1000px
  Behavior: 5 additive steps, each triggered by scroll range
  Elements draw/fade in; previous elements persist

Section 6 — Interactive Penrose:
  Type: Free interaction (NOT scroll-locked)
  Behavior: Click/tap points to see light cones
  Hover to highlight causal regions
```

---

## Layout Architecture

### Grid System

```
Desktop (≥1024px):
  Overall: 12-column grid, max-width 1400px, centered
  Prose: 8 columns, centered (≈680px)
  Visualizations: 10-12 columns (≈1000-1200px)
  Pull quotes: 6 columns, centered with left accent border

Tablet (768-1023px):
  Overall: 8-column grid
  Prose: 6 columns
  Visualizations: Full width with 24px padding

Mobile (320-767px):
  Overall: Single column
  Prose: Full width with 20px padding
  Visualizations: Full width with 16px padding
```

### Section Rhythm

Each section follows a consistent internal rhythm:

```
[Section Heading]          — centered, generous top margin (120px desktop)
[Intro prose block]        — 1-3 paragraphs, narrow column
[Visualization]            — wide, possibly scroll-locked
[Interpretive prose block] — 1-3 paragraphs, narrow column
[Pull quote or bridge]     — if present, before transition
[Transition space]         — 80-140px vertical breathing room
```

### Dark Space as Design Element

The essay's generous vertical spacing is not wasted space — it is THE VOID. The darkness between sections is the same darkness at the center of the EHT image. The reader should feel like they're falling through space between each section. Minimum 100px between sections; 140px around major conceptual transitions (before Section 4, before Section 7).

---

## Visualization Style Guide

### SVG Line Style

- **Stroke weight**: 1.5px for structural lines, 2px for emphasized paths, 1px for secondary grid
- **Stroke color**: `var(--diagram-line)` default, accent colors for highlighted elements
- **Line cap**: `round` for all diagram lines
- **Line join**: `round`
- **Dash pattern**: `8 4` for the event horizon line; solid for all other lines

### Penrose Diagram Style

- **Diamond outline**: `var(--diagram-line)` at 1.5px
- **Singularity line**: `var(--singularity-white)` at 2px, zig-zag pattern (4px amplitude, 8px wavelength)
- **Event horizon**: `var(--diagram-line)` at 1.5px, dashed `8 4`
- **Light cones**: `var(--lensing-blue)` fill at 15% opacity, `var(--lensing-blue)` stroke at 1px
- **Interactive highlight**: `var(--horizon-teal)` fill at 20% opacity with teal glow
- **Labels**: JetBrains Mono, positioned outside the diagram boundary, connected by thin leader lines

### Glow Effects

Black holes emit light from their accretion disks. The essay uses subtle glow effects (CSS `box-shadow` or SVG `filter: blur`) to create a sense of luminosity emerging from darkness.

- **EHT ring**: `var(--glow-gold)` on the ring element
- **Interactive elements on hover**: `var(--glow-teal)` on hover/focus
- **Quantum elements (Sections 7-8)**: `var(--glow-violet)` on particle/radiation elements
- **Glow intensity**: Never more than 0.3 opacity. Subtle, not neon.

### Spacetime Grid Motif

A recurring visual motif throughout the essay: a faint grid of lines representing spacetime. The grid appears in the background of certain sections and progressively distorts:

- **Section 1**: Flat grid (straight lines) — barely visible behind prose
- **Section 3**: Grid curves near a central point as the reader approaches the horizon
- **Section 4-6**: Grid inside the horizon is dramatically warped — lines converge upward
- **Section 7+**: Grid fades out as we enter the quantum regime (GR breaks down)

Grid properties:
- Color: `rgba(74, 74, 90, 0.08)` — extremely subtle
- Line weight: 0.5px
- Spacing: 60px on desktop, 40px on tablet, hidden on mobile (performance)
- Animation: Grid distortion is NOT animated — it's a static background per section

---

## Interaction Design

### Interactive Penrose Diagram (Section 6)

This is the essay's most interactive element. The reader should feel like a physicist exploring spacetime.

**Interactions:**
- **Click/tap a point**: A light cone appears at that point, showing all reachable futures
- **Click inside the horizon**: Light cone visibly points toward the singularity — escape is impossible
- **Click outside the horizon**: Light cone reaches both the singularity (if you fall in) and future infinity (if you escape)
- **Trace a path**: Click two points to see if one can causally influence the other

**Visual feedback:**
- Selected point: `var(--horizon-teal)` dot with glow
- Light cone: `var(--lensing-blue)` filled triangle at 15% opacity
- Causally connected: green path between points
- Causally disconnected: gray dashed line with ✗

**Touch targets:** 44px minimum hit area. On mobile, reduce the number of interactive points but make them larger.

### Observer Duality Split (Section 2)

Scroll-driven. No click interaction. The left and right panels advance together as the reader scrolls.

**Left panel progression:** Color temperature shifts from normal → warm → deep red → infrared → invisible
**Right panel progression:** Stays normal throughout — the visual contrast tells the story

### Horizon Crossing (Section 3)

Scroll-driven. The reader IS the falling observer.

**Key moment:** A thin horizontal line (the horizon marker) scrolls past the center of the viewport. It flashes `var(--horizon-teal)` for 200ms and fades. Then the visual environment shifts (stars compress upward, grid distorts).

---

## Responsive Considerations

### Mobile-Specific Adaptations

| Element | Desktop | Mobile |
|---------|---------|--------|
| Penrose diagram | Interactive (click points) | Simplified (pre-set light cones, larger buttons) |
| Observer split | Side-by-side | Stacked vertically |
| Spacetime grid | Visible background motif | Hidden (performance) |
| Pull quotes | Left border accent | Top border accent (full width) |
| Diagram labels | Positioned outside diagram | Overlaid or below diagram |
| Font body size | 1.2rem | 1.05rem |
| Section spacing | 120-140px | 80-100px |

### Performance Budget

- **No external images.** All visuals are SVG or Canvas — zero raster dependencies.
- **SVG total weight**: Target < 50KB for all diagram SVGs combined
- **Font loading**: Use `font-display: swap`. Show fallback immediately, swap when loaded.
- **Scroll handler**: Throttled to 16ms (requestAnimationFrame)
- **Intersection Observer**: Preferred over scroll events for section detection
- **No layout thrashing**: All scroll-reading is batched in rAF cycles

---

## Anti-Patterns (What This Essay Must NOT Do)

| Anti-Pattern | Why It's Wrong for This Essay |
|---|---|
| Neon glow effects | Space is not Tron. Glow should be subtle, warm, physical. |
| Star field particle background | Decorative, not derived from content. Stars appear only where physically meaningful (Section 3). |
| Blue/purple gradient backgrounds | "Space aesthetic" cliché. Background is flat #050508. |
| Bouncy/spring animations | Black holes are gravitational, not elastic. Motion is smooth and inevitable. |
| 3D perspective transforms on text | Cheap sci-fi effect. Text is always flat, readable, editorial. |
| "Floating in space" parallax on prose | Parallax on body text reduces readability. Parallax is reserved for diagram elements only. |
| Glitch effects or CRT scan lines | This is physics, not cyberpunk. |
| Wormhole/tunnel animations | Wormholes are speculative. The essay covers what physics TELLS us, not speculation. |
| Rainbow or gradient accent palettes | One accent per section. Color carries meaning, not decoration. |
| Using red for "space" | Red is reserved for physical danger (tidal forces). Not a generic space color. |

---

## Design Research Sources

| Source | What It Informed |
|---|---|
| EHT Collaboration M87* image (2019) | Primary color palette (gold/black), ring structure |
| Penrose (1963) original conformal diagrams | Diagram style, line weight, zig-zag singularity convention |
| Hamilton (2021) JILA visualizations | Star compression effect, visual experience of falling in |
| Thorne (1994) *Black Holes and Time Warps* illustrations | Observer duality split, spaghettification visualization approach |
| Quanta Magazine visual essays | Layout rhythm, section spacing, pull quote treatment |
| Kurzgesagt "Black Holes" video | Audience calibration — what this audience already knows visually |
| Pudding.cool interactive essays | Scroll-lock interaction patterns, progressive diagram builds |
| Brilliant.org physics visualizations | Penrose diagram interactivity, light cone exploration UI |

---

*This design research document derives its entire visual system from the physics of black holes. No aesthetic decision is arbitrary — every color, typeface, animation curve, and layout choice traces back to a physical phenomenon or pedagogical requirement described in the research package.*
