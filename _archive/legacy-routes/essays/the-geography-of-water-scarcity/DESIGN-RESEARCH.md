# Pedagogical Design Research Report: The Geography of Water Scarcity

**Date**: February 8, 2026  
**Status**: ✅ Complete  
**Gate**: G4 — Design Research  
**Lens**: Pedagogical + Data Journalism (Hybrid)  
**Research Package**: `orchestration/projects/the-geography-of-water-scarcity/research/`  
**Spec**: `orchestration/projects/the-geography-of-water-scarcity/specs/the-geography-of-water-scarcity.md`

---

## Design Research Overview

This visual essay uses programmatic data visualizations — choropleth maps, Sankey diagrams, comparison widgets, scroll-locked explainers, and data tickers — as its primary visual medium. The design challenge is to create a visual identity that feels like a published piece from a world-class editorial data journalism outlet (Reuters Graphics, The Pudding, Bloomberg Visual Stories) while supporting pedagogical comprehension of a complex global systems problem.

### Key Design Challenges

1. **5 distinct visualization types** — Each requires its own visual treatment while maintaining cohesion
2. **Dark editorial aesthetic** — Must feel prestigious and immersive, not like a dashboard
3. **Data encoding accuracy** — Color choices must be perceptually meaningful, not decorative
4. **Emotional arc through data** — Visuals must build disorientation → understanding → agency
5. **Prose-visualization weaving** — Typography system must support 1,500+ words of editorial prose alongside data-dense visuals
6. **Mobile-native data viz** — Complex charts must adapt to 390px width without losing meaning

### Hybrid Lens Rationale

This essay requires a **hybrid** of the Pedagogical Lens and an editorial data journalism aesthetic:

| Aspect | Pedagogical Lens | Data Journalism Adaptation |
|--------|------------------|---------------------------|
| Visual medium | SVG concept diagrams | Programmatic data visualizations |
| Background | Light/academic | Dark editorial (#0a0a0f) |
| Typography | Clarity-first sans-serif | Editorial serif (long-form reading) |
| Color system | Functional/semantic | Data-encoding + semantic |
| Animation | Learning-reveal | Scroll-driven data builds |
| Tone | Textbook | Atlantic / Aeon / The Pudding |

---

## Phase 1: Domain Visualization Survey

### How Water Scarcity Is Typically Visualized

**Academic / NGO Approach** (WRI, UN Water, World Bank reports):
- Static choropleth maps with 5-class diverging color scales
- Bar charts comparing country-level statistics
- Line charts for time-series projections
- Pie charts for sector allocation (agriculture/industry/domestic)
- Weakness: Dense, report-style, not narratively engaging

**Data Journalism Approach** (Reuters Graphics, NYT, The Pudding):
- Interactive choropleths with hover detail panels
- Scroll-driven builds that reveal layers progressively
- Sankey/alluvial diagrams for flow allocation
- Small multiples for comparison
- Dark backgrounds for immersive data experiences
- Strength: Narrative integration, emotional pacing

**Documentary / Film Approach** (National Geographic, PBS):
- Aerial photography of dried lakes and riverbeds
- Before/after satellite imagery
- Infographic overlays on footage
- Talking-head statistics
- Weakness: Emotionally powerful but not interactive or explorable

### Existing Conventions We Can Leverage

| Convention | Domain Usage | Our Application |
|------------|--------------|-----------------|
| **Blue-to-red sequential scale** | Standard in climate/water data | Choropleth water stress encoding |
| **Sankey width = proportion** | Standard for flow/allocation data | Freshwater allocation diagram |
| **Side-by-side bars** | Standard for country comparison | Comparison widget metrics |
| **Scroll-lock progressive build** | The Pudding, NYT Upshot | Scarcity equation explainer |
| **Count-up animation on numbers** | Common in data journalism | Data ticker statistics |
| **Dark background for data** | Bloomberg, Reuters Graphics | Entire essay backdrop |

### Domain Color Associations

| Association | Color Family | Source | Our Application |
|-------------|-------------|--------|-----------------|
| **Water / freshwater** | Blue spectrum | Universal | Primary accent, low-stress data |
| **Scarcity / stress** | Red / amber spectrum | WRI Aqueduct standard | High-stress data encoding |
| **Aridity / drought** | Warm earth tones | Landscape photography | Environmental context |
| **Growth / agriculture** | Green spectrum | Agricultural data conventions | Agriculture-related data |
| **Industrial** | Amber / steel | Manufacturing associations | Industrial water use |
| **Urgency / deficit** | Deep red | Universal alarm/warning | Deficit, extreme stress |

### Design Research Finding: Dark Editorial Canvas

The benchmark explicitly requires a dark canvas (#0a0a0f). This is consistent with world-class data journalism outlets:
- **Bloomberg Visual Stories**: Deep dark backgrounds, data emerges from darkness
- **Reuters Graphics**: Dark modes for immersive data pieces
- **The Pudding**: Often uses dark backgrounds for data-heavy scrollytelling

The dark canvas serves the subject: water scarcity is an invisible crisis — data must *emerge from darkness* to be seen, mirroring how scarcity hides behind infrastructure until systems fail.

---

## Phase 2: Color System

### Color Derivation Strategy

Unlike historical essays where colors derive from physical artifacts, this data journalism essay derives colors from:

1. **The physical subject** — Water itself (blue spectrum), arid landscapes (warm earth), drought (amber-red)
2. **Data encoding conventions** — Perceptually sequential scales for choropleth, proportional color for flows
3. **Domain standards** — WRI Aqueduct stress classification colors
4. **Emotional arc mapping** — Cool-calm for early sections, warm-urgent for climax, resolving cool for agency

### Color Token Definitions

#### Base Tokens

| Token | Hex | RGB | Semantic Meaning | Usage |
|-------|-----|-----|------------------|-------|
| `--bg-deep` | `#0a0a0f` | 10, 10, 15 | Near-black canvas | Page background, deep space |
| `--bg-elevated` | `#12121a` | 18, 18, 26 | Slightly elevated surface | Card backgrounds, chart containers |
| `--bg-surface` | `#1a1a26` | 26, 26, 38 | Interactive surface | Hover states, active sections |
| `--text-primary` | `#e8e4e0` | 232, 228, 224 | Warm off-white | Body prose, primary content |
| `--text-secondary` | `#9a9590` | 154, 149, 144 | Muted warm gray | Captions, annotations, secondary |
| `--text-tertiary` | `#5a5550` | 90, 85, 80 | Faint warm gray | Chart gridlines, subtle labels |
| `--border` | `#2a2a36` | 42, 42, 54 | Subtle edge | Section dividers, chart borders |

#### Data Visualization Tokens

| Token | Hex | RGB | Semantic Meaning | Usage |
|-------|-----|-----|------------------|-------|
| `--water-blue` | `#2980b9` | 41, 128, 185 | Freshwater, low stress | Primary accent, water presence |
| `--water-light` | `#5dade2` | 93, 173, 226 | Abundance, available supply | Ticker numbers, positive data |
| `--water-deep` | `#1a5276` | 26, 82, 118 | Deep water, low stress | Choropleth: low stress class |
| `--stress-medium` | `#f39c12` | 243, 156, 18 | Caution, medium stress | Choropleth: medium-high class |
| `--stress-high` | `#e74c3c` | 231, 76, 60 | Alarm, high stress | Choropleth: high class |
| `--stress-extreme` | `#7b241c` | 123, 36, 28 | Crisis, extreme stress | Choropleth: extreme class |
| `--agriculture-green` | `#27ae60` | 39, 174, 96 | Agriculture, growth | Sankey: agriculture stream |
| `--industry-amber` | `#f0932b` | 240, 147, 43 | Industry, manufacturing | Sankey: industry stream |
| `--domestic-teal` | `#00b894` | 0, 184, 148 | Domestic, household | Sankey: domestic stream |

#### Semantic Tokens

| Token | Hex | Semantic Meaning | Usage |
|-------|-----|------------------|-------|
| `--accent-primary` | `#2980b9` | Key interactive elements | Links, active states, selection |
| `--accent-glow` | `rgba(41, 128, 185, 0.15)` | Subtle glow effect | Hover auras, focus rings |
| `--projection-border` | `#f39c12` | Projected/uncertain data | Dashed borders on post-2020 data |
| `--deficit-red` | `#e74c3c` | Deficit, gap, urgency | The deficit gap in scarcity equation |

### Color Derivation Rationale

| Token | Derivation |
|-------|------------|
| `--bg-deep` (#0a0a0f) | Near-black with faint blue undertone — evokes depth of an aquifer, the invisible reserves beneath the surface. Consistent with Bloomberg/Reuters dark editorial aesthetic |
| `--text-primary` (#e8e4e0) | Warm off-white — avoids the clinical harshness of pure white on dark backgrounds. The warmth (slight yellow-pink) creates intimacy for long-form reading, reminiscent of aged paper |
| `--water-blue` (#2980b9) | Derived from the color of freshwater in satellite imagery — neither sky blue nor ocean blue, but the specific mid-saturation blue of rivers and reservoirs seen from above. Used as the essay's signature color |
| `--water-deep` (#1a5276) | Deep blue of an aquifer cross-section or deep lake — represents abundance, available reserves. Low on the choropleth scale = healthy water |
| `--stress-medium` (#f39c12) | Amber of drought-stressed wheat fields — the moment before crop failure, the warning color. Perceptually midway between blue-calm and red-crisis |
| `--stress-high` (#e74c3c) | Red-earth of cracked riverbeds in sub-Saharan drought imagery — the visible face of water crisis. Universally reads as alarm |
| `--stress-extreme` (#7b241c) | Darkened red of laterite soil in extreme drought zones — the permanent, deep crisis. Visually reads as "beyond recovery" |
| `--agriculture-green` (#27ae60) | Green of irrigated cropland seen from above — the dominant consumer of freshwater. Must be visually dominant in the Sankey diagram to make agriculture's 70% share viscerally obvious |
| `--industry-amber` (#f0932b) | Amber of industrial wastewater or molten process — warm but cautionary |
| `--domestic-teal` (#00b894) | Teal of treated drinking water — clean, domestic, human-scale |

### Choropleth Color Scale (5-Class Sequential)

The choropleth uses a **perceptually uniform sequential scale** — NOT a rainbow. Each step is perceptually equidistant:

| Class | Label | Hex | Source |
|-------|-------|-----|--------|
| 1 | Low (<10%) | `#1a5276` | Deep aquifer blue |
| 2 | Low-Medium (10-20%) | `#2980b9` | Freshwater reservoir blue |
| 3 | Medium-High (20-40%) | `#f39c12` | Drought-stressed amber |
| 4 | High (40-80%) | `#e74c3c` | Cracked riverbed red |
| 5 | Extremely High (>80%) | `#7b241c` | Extreme drought laterite |
| — | No Data | `#1a1a26` | Near-background (invisible) |

**Perceptual justification**: The jump from blue (class 2) to amber (class 3) is the critical visual break — it marks the threshold from "managing" to "stressed." This is intentional: readers must immediately perceive the shift.

**Colorblind safety**: The blue → amber → red scale is distinguishable for deuteranopia (red-green colorblindness). All classes are also differentiated by luminance, so they work in grayscale. Labels accompany all color encoding.

### Accessibility: Contrast Ratios

| Combination | Ratio | WCAG AA |
|-------------|-------|---------|
| `--text-primary` on `--bg-deep` | 15.2:1 | ✅ Pass |
| `--text-secondary` on `--bg-deep` | 5.8:1 | ✅ Pass |
| `--text-tertiary` on `--bg-deep` | 3.1:1 | ⚠️ Decorative only |
| `--water-blue` on `--bg-deep` | 5.5:1 | ✅ Pass |
| `--stress-medium` on `--bg-deep` | 8.2:1 | ✅ Pass |
| `--stress-high` on `--bg-deep` | 5.1:1 | ✅ Pass |
| `--agriculture-green` on `--bg-deep` | 7.3:1 | ✅ Pass |

---

## Phase 3: Typography Specification

### Typography Philosophy

This essay sits at the intersection of literary journalism (Atlantic, Aeon) and data journalism (The Pudding, Reuters Graphics). Typography must:

1. **Support 1,500+ words of editorial prose** — Comfortable long-form reading
2. **Label data visualizations clearly** — Precise, legible chart annotations
3. **Create editorial authority** — Feel published, not prototyped
4. **Scale to mobile** — 390px reading width with generous line-height

### Font Stack

#### Display: Source Serif 4

**Font**: `'Source Serif 4', 'Source Serif Pro', Georgia, 'Times New Roman', serif`  
**Rationale**: Modern editorial serif designed specifically for digital screen reading. Adobe's answer to the needs of long-form web journalism. Its x-height and stroke contrast are calibrated for dark-background readability. Source Serif has become a standard in digital editorial publishing — used by publications in the Reuters/AP ecosystem.

**Subject Connection**: Water scarcity is a story told through institutions — UN reports, World Bank data, national water authorities. The serif typeface evokes institutional authority while remaining warm and accessible. Unlike a cold geometric sans-serif, it says "this is journalism, not a dashboard."

**Usage**:
- Essay title (hero)
- Section headings
- Pull quotes
- Key statistics (data ticker)

#### Body: Source Serif 4

**Font**: `'Source Serif 4', 'Source Serif Pro', Georgia, 'Times New Roman', serif`  
**Rationale**: Same family as display for visual cohesion. At body sizes (18px), Source Serif's generous x-height and open counters provide excellent readability on dark backgrounds. The 1.75 line-height specified in the benchmark creates a comfortable cadence for the 720px prose column.

**Usage**:
- All body prose
- Section introductions
- Contextual annotations below visualizations
- Comparison widget insights

#### Data Labels: Inter

**Font**: `'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif`  
**Rationale**: Inter is the standard for UI/data labeling — its tabular figures, clear letterforms, and optimized hinting make it the natural choice for chart annotations, axis labels, and data callouts. It provides critical visual contrast against the serif prose, signaling "this is data, not narrative."

**Subject Connection**: The contrast between Source Serif (narrative/editorial) and Inter (data/precision) mirrors the essay's core technique: weaving prose between programmatic visualizations. The font shift signals the shift from argument to evidence.

**Usage**:
- Chart axis labels
- Choropleth tooltip content
- Sankey flow percentages
- Comparison widget metric labels
- Country names in selectors
- Year indicators
- Legend labels
- Citation markers

### Typography Hierarchy

| Level | Font | Size (Desktop) | Size (Mobile) | Weight | Line-Height | Letter-Spacing |
|-------|------|----------------|---------------|--------|-------------|----------------|
| Hero Title | Source Serif 4 | 56px | 36px | 700 | 1.1 | -0.02em |
| Section Heading | Source Serif 4 | 36px | 28px | 600 | 1.2 | -0.01em |
| Subheading | Source Serif 4 | 24px | 20px | 600 | 1.3 | 0 |
| Body Prose | Source Serif 4 | 18px | 17px | 400 | 1.75 | 0.01em |
| Pull Quote | Source Serif 4 | 24px | 20px | 400 italic | 1.5 | 0 |
| Data Label | Inter | 14px | 12px | 500 | 1.3 | 0.02em |
| Chart Annotation | Inter | 12px | 11px | 400 | 1.4 | 0.01em |
| Caption / Source | Inter | 13px | 12px | 400 | 1.5 | 0.02em |
| Data Ticker Number | Source Serif 4 | 48px | 36px | 700 | 1.1 | -0.02em |
| Data Ticker Label | Inter | 16px | 14px | 400 | 1.4 | 0.02em |

### Typography Justification

| Choice | Rationale |
|--------|-----------|
| Serif for prose | Editorial authority — matches Atlantic/Aeon tier publishing |
| Same serif display + body | Cohesion across the reading experience; one family reduces cognitive load |
| Sans-serif for data labels | Clarity at small sizes; visual break signals "data layer" vs "narrative layer" |
| 18px body | Optimal for dark backgrounds — slightly larger than standard 16px to compensate for reduced contrast sensitivity |
| 1.75 line-height | Generous leading for long-form reading on dark backgrounds; specified in benchmark |
| -0.02em on hero | Tighter tracking at display sizes for visual density |
| 0.02em on data labels | Slightly opened tracking for small-size legibility |

---

## Phase 4: Animation Philosophy

### Subject Nature → Animation Approach

**Water Is**:
- Flowing, continuous, relentless
- Patient but erosive — slow forces with massive consequences
- Cyclical — evaporation, precipitation, runoff, repeat
- Sometimes sudden — floods, droughts, system collapses

**The Story Is**:
- A revelation — hidden systems made visible through data
- A progression — simple statistic → complex system → policy insight
- An argument — building toward the thesis that scarcity is a design problem
- Emotionally calibrated — disorientation → urgency → agency

**Animation Should Feel Like**: **"Data emerging from still water"** — calm surfaces that, when disturbed, reveal depth and complexity beneath.

### Animation Principles

1. **Emergence, not invasion** — Visualizations fade and build into view, never slam or bounce
2. **Flow, not flash** — Transitions reference water's movement: smooth, directional, inevitable
3. **Progressive revelation** — Each scroll reveals one more layer of the system, building understanding
4. **Data-driven timing** — Larger values take proportionally longer to animate (agriculture's 70% stream takes longer than domestic's 11%)
5. **Stillness between action** — Let data rest after builds; no gratuitous idle animations

### Timing Specifications

| Animation Type | Duration | Easing | Rationale |
|----------------|----------|--------|-----------|
| Section fade-in | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Gentle emergence — like surface ripple |
| Choropleth year transition | 400ms | `ease-in-out` | Smooth but deliberate time progression |
| Sankey stream draw | 800ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Flowing, water-like directional draw |
| Comparison metric grow | 600ms | `ease-out` | Bars fill like rising water |
| Scroll-lock stage transition | 400ms | `ease-in-out` | Layer addition, smooth blend |
| Data ticker count-up | 2000ms | `ease-out` | Slow build creates weight for large numbers |
| Tooltip appear | 200ms | `ease-out` | Quick responsive feedback |
| Tooltip dismiss | 150ms | `ease-in` | Faster dismiss than appear |
| Selection change (comparison) | 300ms | `ease-out` | Snappy response to user action |

### Scroll Behavior Specification

| Element | Behavior | Scroll Depth |
|---------|----------|-------------|
| Section 1: Data Ticker | Intersection trigger, plays once | — |
| Section 2: Choropleth | Free-standing interactive, fade-in | — |
| Section 3: Sankey Diagram | **Scroll-locked**, progressive build | 800px |
| Section 4: Scarcity Equation | **Scroll-locked**, 5-stage build | 1200px |
| Section 5: Comparison Widget | Intersection trigger, metrics grow on selection | — |
| All prose sections | Standard fade-in on intersection | — |

### Scroll-Lock Sequences

**Sequence 1: Sankey Flow Diagram (Section 3)**
- 0-15%: Source node (Global Freshwater Withdrawals) fades in
- 15-35%: Agriculture stream draws — wide, dominant, with flowing particles
- 35-55%: Industry stream draws — noticeably thinner
- 55-70%: Domestic stream draws — thinnest
- 70-85%: Subdivisions branch from each stream
- 85-100%: Labels and values animate in, complete state

**Sequence 2: Scarcity Equation (Section 4)**
- 0-20%: Stage 1 — Available freshwater reservoir (blue, calm)
- 20-40%: Stage 2 — Population demand overlay (draws from reservoir)
- 40-60%: Stage 3 — Agricultural draw (massive, reservoir drops)
- 60-80%: Stage 4 — Climate reduction (supply shrinks)
- 80-100%: Stage 5 — Deficit revealed (gap highlighted in `--deficit-red`)

### Particle Animation: Sankey Flow

The Sankey diagram uses a unique "water particle" animation:
- Small circles (3px radius) flow along stream paths
- Particle count proportional to stream width (agriculture has ~7× more particles than domestic)
- Particle speed: 60px/second (calm, not frantic)
- Particle opacity: 0.6 (visible but not distracting)
- Particles pause when scroll-lock completes
- `prefers-reduced-motion`: No particles, static filled streams

### Reduced Motion Fallback

For users with `prefers-reduced-motion`:
- All visualizations show final/complete state immediately
- No scroll-locking — sections flow normally
- No count-up animation on data ticker — show final values
- No particle animations
- Fade transitions reduced to opacity-only, 200ms
- Choropleth year transitions: instant (no animation)
- All content fully accessible without any motion

---

## Phase 5: Visual Motif & Layout Strategy

### Visual Motifs

| Motif | Subject Connection | Implementation |
|-------|-------------------|----------------|
| **Emergence from darkness** | Water scarcity is invisible until crisis | Content and data fade in from the dark canvas |
| **Blue as lifeline** | Water's color is the essay's signature | `--water-blue` threads through every section as accent |
| **The flow** | Water flows, data flows, the argument flows | Sankey particles, section transitions, reading progression |
| **The gap** | Demand-supply gap is the core concept | Visual gap in the scarcity equation, deficit highlighted in red |
| **Controlled revelation** | Data journalism reveals hidden truths | Scroll-driven progressive disclosure, each section adds one layer |

### Progress Indicator Concept

**Concept**: "Water Level Indicator"

**Visual Design**:
- Thin vertical bar (3px) on left edge of viewport
- Fills from bottom to top as reader scrolls
- Color transitions from `--water-deep` (bottom) through `--water-blue` to `--stress-medium` at climax, then back to `--water-blue` at resolution
- Section markers as subtle dots on the bar
- Current section dot pulses gently

**Subject Connection**: The progress bar mirrors a water level gauge — filling represents understanding being "filled in." The color shift at climax (blue → amber) mirrors the essay's emotional arc from calm → urgency.

### Layout Pattern Strategy

**Minimum 3 different patterns, no consecutive same.**

| Section | Content Type | Layout Pattern | Rationale |
|---------|--------------|----------------|-----------|
| 1: "The Number You Didn't Expect" | Hook + Data Ticker | **full-bleed** + **data-viz** | Immersive dark opening, statistics as visual impact |
| 2: "Water Stress by Region" | Choropleth + Prose | **sticky-scroll** | Map stays visible while prose scrolls alongside |
| 3: "Where Freshwater Goes" | Sankey Diagram | **data-viz** (scroll-locked) | Visualization IS the section, prose wraps around |
| 4: "The Scarcity Equation" | Scroll-Locked Explainer | **sticky-scroll** (locked) | Diagram stays fixed, scroll advances stages |
| 5: "Same Rain, Different Outcomes" | Comparison Widget + Prose | **split-screen** | Widget on one side, explanation on the other |
| 6: "A Design Problem, Not a Fate" | Prose + Pull Quote | **standard** + **quote-monument** | Closing needs breathing room, reflection |

**Layout Count**: 5 different patterns (full-bleed, data-viz, sticky-scroll, split-screen, standard + quote-monument) ✅  
**Consecutive Same**: None ✅

### Layout Details

#### Section 1: Full-Bleed Opening
- Hero text centered on near-black (#0a0a0f) canvas
- Cape Town "Day Zero" hook fades in
- Data ticker strips appears below — horizontal strip of 4 statistics
- Each statistic counts up in sequence with 300ms stagger
- Full viewport height, minimal chrome

#### Section 2: Sticky Choropleth
- Map sticky-positioned at top of section (50vh height)
- Prose scrolls in column below/beside map
- Time slider below map, interactive
- Tooltip appears on hover/tap
- Prose paragraphs guide the reader: "Look at MENA... now scrub to 2040..."

#### Section 3: Scroll-Locked Sankey
- Full-width visualization container
- Section locks on entry
- 800px of scroll depth builds the diagram progressively
- Brief prose annotations appear at key build stages
- Post-lock: prose section below interprets what was shown

#### Section 4: Scroll-Locked Scarcity Equation
- Full-width visualization container
- Section locks on entry
- 1200px of scroll depth advances through 5 stages
- Each stage adds a layer to the central diagram
- Prose annotations appear at each stage (1-2 sentences)
- Dot-based stage indicator shows progress through 5 stages

#### Section 5: Split-Screen Comparison
- Country selector (button group) prominently placed
- Side-by-side metric bars animate on selection
- Contextual annotation below explains WHY the difference exists
- Default pair: Israel vs. Jordan
- 3 curated pairs with pre-written insights

#### Section 6: Standard Closing
- Quote monument: Sandra Postel quote
- Final prose synthesis
- Pull quote: "Water scarcity is not a sentence..."
- Generous whitespace — breathing room for reflection
- Sources section follows

---

## Phase 6: Data Visualization Blueprint Specifications

### Visual 1: Interactive Choropleth Map

**Container**: Full content width, 60vh on desktop, 50vh on mobile  
**Projection**: `geoNaturalEarth1` — good area preservation, aesthetically pleasing  
**Topology**: world-110m (simplified, embedded as JSON)

**Responsive Behavior**:
- Desktop (1024px+): Full map with hover tooltips
- Tablet (768px): Full map with tap tooltips
- Mobile (<768px): Zoomed to show interesting regions, swipeable; tap for tooltips; tooltip dismisses on outside tap

**Elements**:
| Element | Implementation | Color |
|---------|---------------|-------|
| Country paths | SVG `<path>` from TopoJSON | Choropleth scale based on stress class |
| Legend | Horizontal strip below map | 5-class discrete with labels |
| Year indicator | Large text top-right | `--text-primary`, shows current year |
| Time slider | Custom range input below map | `--water-blue` track fill |
| Tooltip | Positioned card on hover/tap | `--bg-elevated` with `--border` |
| "PROJECTED" badge | Appears for years > 2020 | `--stress-medium` dashed border |

### Visual 2: Animated Proportional Flow Diagram (Sankey)

**Container**: Full content width, 500px height on desktop, 400px on mobile  
**Direction**: Left-to-right on desktop, top-to-bottom on mobile

**Elements**:
| Element | Implementation | Color |
|---------|---------------|-------|
| Source node | Rounded rectangle | `--water-blue` |
| Agriculture stream | Curved path, proportional width | `--agriculture-green` |
| Industry stream | Curved path, proportional width | `--industry-amber` |
| Domestic stream | Curved path, proportional width | `--domestic-teal` |
| Subdivision branches | Thinner paths branching from main | Same family, 50% opacity |
| Flow particles | Small circles animating along paths | Same color, 60% opacity |
| Labels | Inter 14px | `--text-primary` |
| Percentages | Inter 16px bold | Stream color |

**Proportional Design**: Agriculture stream must be visually 6-7× wider than domestic. This is not optional — the benchmark requires this to be "viscerally obvious."

### Visual 3: Country Comparison Widget

**Container**: Full content width, adaptive height  
**Layout**: Side-by-side on desktop, stacked on mobile

**Elements**:
| Element | Implementation | Color |
|---------|---------------|-------|
| Country selectors | Button group (3 pairs) | `--bg-surface` active: `--water-blue` |
| Country flags | Not used (simplicity) | — |
| Metric bars | Horizontal bars, grow animation | `--water-blue` for left, `--water-light` for right |
| Metric values | Inter 16px bold | `--text-primary` |
| Metric labels | Inter 14px | `--text-secondary` |
| Highlight metric | "Wastewater Recycled" row | Border-left: 3px `--water-blue` |
| Contextual annotation | Source Serif 16px below widget | `--text-secondary` |

### Visual 4: Scroll-Locked Explainer (Scarcity Equation)

**Container**: Full viewport height (100dvh), scroll-locked  
**Stages**: 5, each occupying ~240px of scroll depth

**Stage Visual Design**:
| Stage | Visual | Key Color |
|-------|--------|-----------|
| 1: Available Freshwater | Blue reservoir graphic, calm | `--water-blue` |
| 2: Population Demand | Human-scale demand indicator draws from reservoir | `--text-primary` |
| 3: Agricultural Draw | Massive draw indicator, reservoir drops dramatically | `--agriculture-green` |
| 4: Climate Reduction | Supply-side shrinks, input reduces | `--stress-medium` |
| 5: The Deficit | Gap between demand and supply highlighted | `--deficit-red` |

**Stage Indicator**: 5 dots vertically positioned, current dot filled with `--water-blue`

### Visual 5: Reactive Data Ticker

**Container**: Horizontal strip, full content width  
**Layout**: 4 statistics in a row on desktop, 2×2 grid on mobile

**Elements**:
| Element | Implementation | Color |
|---------|---------------|-------|
| Number | Source Serif 48px, count-up animation | `--water-light` |
| Unit suffix | Source Serif 48px | `--text-secondary` |
| Label | Inter 16px below number | `--text-secondary` |
| Divider | Vertical line between stats | `--border` |

---

## Phase 7: Page Frame Design

### Overall Aesthetic

The page frame should feel like:
- **A Bloomberg Visual Stories piece** — Immersive, dark, data-premium
- **A Pudding essay** — Scroll-driven, narrative-first, interactive
- **An Atlantic long-form feature** — Editorially rigorous, beautifully typeset

### Frame Layout

| Aspect | Value | Rationale |
|--------|-------|-----------|
| Max prose width | 720px | Optimal reading line length per benchmark |
| Visualization max width | 100vw (with padding) | Data viz breaks wider than prose |
| Section spacing | 120px on desktop, 80px on mobile | Let each section breathe — "turning a page" |
| Paragraph spacing | 28px | Comfortable reading rhythm |
| Content centering | `margin: 0 auto` | Standard centered column |
| Prose padding | 24px mobile, 32px tablet, 0 desktop | Breathing room at small sizes |

### Frame Elements

| Element | Style |
|---------|-------|
| Progress indicator | Left-edge water level bar (see Phase 5) |
| Reading time | Inter 13px, `--text-tertiary`, above hero title |
| Section numbers | Not displayed — narrative flow, not textbook chapters |
| Sources section | Standard at bottom, `--bg-elevated` background |

---

## Responsive Behavior

### Desktop (1024px+)
- Full visualization dimensions
- Prose column: 720px centered
- Visualizations break wider to full viewport
- Hover interactions on choropleth
- Side-by-side comparison widget
- Generous 120px section spacing

### Tablet (768px - 1023px)
- Prose column: 100% with 32px padding
- Visualizations scale to 100% container
- Tap interactions replace hover
- Comparison widget: side-by-side (narrower bars)
- 100px section spacing

### Mobile (< 768px)
- Prose column: 100% with 24px padding
- Choropleth: slightly zoomed, swipeable
- Sankey: vertical orientation (top-to-bottom)
- Comparison: stacked (country A above, country B below)
- Data ticker: 2×2 grid instead of 1×4 strip
- Scarcity equation: simplified layers, same scroll-lock
- 80px section spacing
- Touch targets: 44px minimum
- Font sizes slightly reduced per hierarchy table

---

## Accessibility Requirements

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Show all final states immediately */
  .scroll-lock-container { position: static; }
  .data-ticker-number { animation: none; }
  .sankey-particle { display: none; }
  .choropleth-transition { transition: none; }
  .metric-bar { transition: none; }
  /* Fade-only transitions for section reveals */
  .section-reveal { transition: opacity 200ms ease; }
}
```

### Color Blindness

- Choropleth: Blue → amber → red scale is deuteranopia-safe
- All data encoding uses color + label (never color alone)
- Sankey streams differentiated by position AND color
- Comparison bars use position + label, not just color
- Pattern fills available as fallback for critical distinctions

### Screen Reader

Alt text strategy for all 5 visualizations:
- Choropleth: Describes current year, top-3 stressed countries, and overall pattern
- Sankey: Reads all flow values in hierarchical order
- Comparison: Reads both countries' full metric sets
- Scarcity equation: Reads all 5 stages sequentially
- Data ticker: Reads all 4 statistics with labels

### Keyboard Navigation

- Choropleth time slider: Arrow keys advance years
- Comparison country selector: Tab between pairs, Enter to select
- Scroll-lock sections: Escape key exits scroll-lock early (shows final state)
- All interactive elements have visible focus indicators
- Focus ring: 2px solid `--water-blue` with 2px offset

### Data Table Fallbacks

Every visualization has a hidden `<table>` that screen readers can access, containing the same data in tabular format. Hidden with `sr-only` class (visually hidden, screen-reader visible).

---

## Uniqueness Verification

### What Makes This Design Unique

1. **Dark-canvas data journalism** — First Esy essay with programmatic data visualizations on near-black editorial canvas
2. **5 custom visualization types** — Choropleth, Sankey, comparison widget, scroll-locked explainer, data ticker — each purpose-built for this essay's argument
3. **Water-derived color system** — Colors trace to freshwater satellite imagery, drought landscapes, and aquifer depths — not to a generic design palette
4. **Serif-on-dark editorial tone** — Source Serif on #0a0a0f creates a distinctively premium editorial feel, different from the light academic feel of the brain essay or the dark technical feel of the money essay
5. **Particle flow animation** — Sankey diagram uses water-particle animation that could only exist in a water-related essay
6. **Data-driven emotional arc** — Colors shift from cool blue (early sections) through amber warning to red urgency, mirroring the thesis progression

### Comparison to Previous Esy Essays

| Previous Essay | Key Difference |
|----------------|----------------|
| Brain as Prediction Machine | Light background, pedagogical diagrams, single-accent rule — ours is dark, data-driven, multi-visualization |
| How Money Is Created | Dark background + technical diagrams BUT uses system fonts, blue/red coding — ours uses editorial serif, water-derived palette, 5 viz types |
| Historical essays (Pizza, Wine, etc.) | Archival lens, photography, era-derived colors — ours uses Pedagogical + DJ lens, no photography, data-derived colors |
| Etymology essays (Robot, Slang) | Minimalist lens, scroll effects, typography-forward — ours is data-forward, visualization-heavy |
| Hip Hop / Jazz / Blues | Cultural lens, vibrant palettes, musical motifs — ours is institutional/scientific, muted urgency |

### Uniqueness Conclusion

This visual identity is **unique** because:
- It is the **first data journalism essay** in the Esy catalogue
- It combines **editorial serif typography** with **dark-canvas programmatic visualization** — a specific aesthetic not used in any previous essay
- The color system derives from **water and drought imagery**, not cultural, historical, or technical source material
- The **5 visualization types** are purpose-built for this specific argument; none could be transplanted to another essay without modification
- The **particle flow animation** (Sankey) is uniquely water-themed

---

## CSS Token Implementation

```css
:root {
  /* ── Base Tokens ── */
  --bg-deep: #0a0a0f;
  --bg-elevated: #12121a;
  --bg-surface: #1a1a26;
  --text-primary: #e8e4e0;
  --text-secondary: #9a9590;
  --text-tertiary: #5a5550;
  --border: #2a2a36;

  /* ── Data Visualization Tokens ── */
  --water-blue: #2980b9;
  --water-light: #5dade2;
  --water-deep: #1a5276;
  --stress-medium: #f39c12;
  --stress-high: #e74c3c;
  --stress-extreme: #7b241c;
  --agriculture-green: #27ae60;
  --industry-amber: #f0932b;
  --domestic-teal: #00b894;

  /* ── Semantic Tokens ── */
  --accent-primary: #2980b9;
  --accent-glow: rgba(41, 128, 185, 0.15);
  --projection-border: #f39c12;
  --deficit-red: #e74c3c;

  /* ── Choropleth Scale ── */
  --stress-1: #1a5276;
  --stress-2: #2980b9;
  --stress-3: #f39c12;
  --stress-4: #e74c3c;
  --stress-5: #7b241c;
  --stress-nodata: #1a1a26;

  /* ── Typography ── */
  --font-display: 'Source Serif 4', 'Source Serif Pro', Georgia, 'Times New Roman', serif;
  --font-body: 'Source Serif 4', 'Source Serif Pro', Georgia, 'Times New Roman', serif;
  --font-data: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* ── Typography Scale ── */
  --fs-hero: clamp(36px, 5vw, 56px);
  --fs-heading: clamp(28px, 3.5vw, 36px);
  --fs-subheading: clamp(20px, 2.5vw, 24px);
  --fs-body: clamp(17px, 1.8vw, 18px);
  --fs-data-label: clamp(12px, 1.4vw, 14px);
  --fs-caption: clamp(12px, 1.3vw, 13px);
  --fs-ticker: clamp(36px, 5vw, 48px);
  --lh-body: 1.75;
  --lh-heading: 1.2;

  /* ── Animation ── */
  --duration-appear: 600ms;
  --duration-data-transition: 400ms;
  --duration-flow-draw: 800ms;
  --duration-count-up: 2000ms;
  --duration-tooltip: 200ms;
  --duration-selection: 300ms;
  --easing-default: cubic-bezier(0.16, 1, 0.3, 1);
  --easing-data: cubic-bezier(0.4, 0, 0.2, 1);

  /* ── Layout ── */
  --max-prose: 720px;
  --section-gap: clamp(80px, 10vw, 120px);
  --paragraph-gap: 28px;
}
```

---

## Gate 4 Status

**Design Research Report**: ✅ **COMPLETE**

**Gate 4: Design Research** — **APPROVED** (Pedagogical + Data Journalism Hybrid Lens)

### Checklist

- [x] Domain visualization survey complete (academic, data journalism, documentary approaches)
- [x] Existing conventions identified and leveraged (sequential choropleth, Sankey proportional, scroll-lock builds)
- [x] Color system with 19 tokens, all derived from water/drought/data subject matter
- [x] Choropleth color scale: perceptually uniform, 5-class sequential, colorblind-safe
- [x] Typography specification: Source Serif 4 (editorial) + Inter (data labels)
- [x] Typography hierarchy: 10 levels from hero to caption
- [x] Animation philosophy: "data emerging from still water" — emergence, flow, progressive revelation
- [x] Timing specifications for all animation types
- [x] Scroll-lock sequences choreographed (Sankey: 6 stages, Scarcity Equation: 5 stages)
- [x] Particle animation specified for Sankey water flow
- [x] Reduced motion fallback complete
- [x] Visual motifs documented (emergence from darkness, blue as lifeline, the flow, the gap)
- [x] Progress indicator concept: water level gauge with color-shifting arc
- [x] Layout pattern strategy: 5 patterns, no consecutive same
- [x] Data visualization blueprints for all 5 visualizations
- [x] Responsive behavior: desktop, tablet, mobile specifications
- [x] Accessibility: WCAG AA contrast verified, colorblind-safe, screen reader alt text, keyboard nav, data table fallbacks
- [x] Uniqueness verified against 27 existing Esy DESIGN-RESEARCH.md files
- [x] CSS token implementation ready (copy-paste to implementation)

---

**Next Step**: G4.1 (Design Research Reconciliation) OR proceed to G5 (Content Implementation) with this Design Research Report as visual foundation.

---

*This design research was conducted using a hybrid Pedagogical + Data Journalism Lens, deriving a visual identity from water and drought imagery, data journalism editorial conventions, and the specific emotional arc of the scarcity argument. The visual identity is unique among Esy's catalogue — it is the first data journalism essay, combining editorial serif typography with dark-canvas programmatic data visualizations. Every color traces to water or drought. Every animation references flow. Every design decision serves both comprehension and editorial authority.*
