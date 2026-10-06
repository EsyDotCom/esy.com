---
gate: G4
artifact: DESIGN-RESEARCH
status: VERIFIED
date: 2026-02-25
---

# Design Research: Homo naledi — The Small-Brained Species That Buried Its Dead

## Design Philosophy

The visual identity of this essay emerges from the Rising Star Cave system — a place of total darkness, dolomite limestone, and fossilized bone illuminated only by headlamp. Where Lucy's design derives from Ethiopian strata and warm museum lighting, naledi's derives from subterranean absence: the absence of light, the absence of easy access, the absence of certainty about what these bones mean. The essay should feel like descending into the Dinaledi Chamber — each scroll taking the reader deeper, each section revealing something new from the dark.

The dominant visual relationship is bone against darkness. Naledi specimens were recovered from a chamber with zero natural light, ~30 metres below the surface, accessible only through a 25 cm-wide crawl and a 12-metre vertical chute. The photography and specimen presentation reflect this: warm ivory fossil bone floating on near-black backgrounds with cool blue-grey undertones — the colour of dolomite in headlamp light. The interface recedes into the cave walls. The specimens command attention.

As the second cluster essay in the paleoanthropology series (alongside Lucy), this essay inherits structural DNA from the parent — Source Serif 4 typography, the dark-background-forward approach, the same Bone Ivory for primary text. But the mood is fundamentally different. Lucy is warm amber strata under Ethiopian sun. Naledi is cool blue-grey rock in pitch darkness. Lucy's palette says "3.2 million years of geological time." Naledi's palette says "what is hiding in the dark, and what does it mean?"

## Subject Matter Analysis

The subject offers a visual vocabulary rooted in extremes. The Rising Star Cave system is a dolomite karst formation — grey-blue limestone dissolved by millennia of groundwater, producing chambers connected by passages as narrow as 18 cm. The Dinaledi Chamber itself is a confined, irregular space approximately 10 × 3 metres with ceilings as low as 1 metre. There is no natural light. Every photograph taken inside was lit by headlamp or portable LED, producing dramatic high-contrast images with warm foreground subjects against undefined black backgrounds. The fossils — over 1,550 specimens from at least 15 individuals — are mineralized bone in shades of cream and ivory, often photographed against neutral dark fields for publication in eLife. The surrounding geology features flowstones (layered calcite deposits used for uranium-thorium dating), dolomite walls with subtle blue-grey coloration, and sediment matrices ranging from dark clay to ochre-brown earth. Above ground, the Cradle of Humankind is South African highveld — rolling grassland over karst terrain, warm ochre and brown soil tones, the understated landscape that conceals extraordinary subterranean complexity.

## Color System

### Primary Palette

| Name | Hex | Source Derivation | Usage |
|------|-----|-------------------|-------|
| Dinaledi Dark | #0D0E12 | The Dinaledi Chamber in its natural state — near-black with a cool blue undertone from dolomite walls reflecting zero ambient light. Cooler than Lucy's Hadar Dark (#1C1610) because this is cave darkness, not geological darkness. | Primary background |
| Cave Charcoal | #1A1C22 | The dolomite cave walls in darkness — grey-blue limestone surfaces visible only in headlamp spill. A step lighter than Dinaledi Dark, used for elevated surfaces and cards. | Card backgrounds, section dividers, elevated surfaces |
| Bone Ivory | #E8DCC8 | Mineralized fossil bone — shared with Lucy and the parent essay. In Lucy it appears as bone against warm strata; here it appears as bone against darkness, changing its emotional register entirely. The same object in a different context. | Primary text, high-contrast elements |
| Dolomite Grey | #6B7A8A | The blue-grey limestone of the Cradle of Humankind caves — the specific colour of weathered dolomite in the Malmani Subgroup. Cooler and bluer than Lucy's Tuff Grey (#8A8477), reflecting South African cave geology rather than Ethiopian volcanic ash. | Secondary text, captions, data labels, cave-context UI elements |
| Signal Amber | #C4893A | The headlamp in the dark — a warm accent for interactive elements, data highlights, and points of emphasis. Shared hex with Lucy Amber but deployed differently: where Lucy uses it as specimen warmth suffusing the whole essay, naledi uses it as a focused beam cutting through darkness. Sparing use amplifies its signal. | Primary accent — interactive highlights, links, data emphasis |
| Ochre Earth | #9B6B3C | South African highveld soil — the red-brown earth of the Gauteng landscape above the caves. Grounds the essay in its geographic context. Close to Lucy's Afar Sienna (#9B6B3C) in value but identical in hex — a deliberate family connection representing different African soils. | Secondary accent, landscape sections, geographic context |
| Flowstone Cream | #C9BFA8 | The calcite flowstones that bracket the naledi fossils — layered, translucent cream-coloured deposits used for uranium-thorium dating. These formations gave naledi its age (236–335 ka) and their visual texture of laminated mineral layers informs data overlay treatments. | Annotation overlays, dating-section accents, chart secondary fills |
| Deep Passage | #2A2D35 | The intermediate darkness of cave passages — neither the total black of the Dinaledi Chamber nor the grey of weathered dolomite. The colour of the Superman's Crawl and the Dragon's Back as seen in peripheral headlamp light. | Gradient midpoints, tooltip backgrounds, overlay panels |

### Relationship to Lucy (Palette Differentiation)

| Aspect | Lucy | Naledi | Reason |
|--------|------|--------|--------|
| Primary background | Hadar Dark #1C1610 (warm, brown-shifted) | Dinaledi Dark #0D0E12 (cool, blue-shifted) | Ethiopian sediment is warm volcanic earth; South African cave is cool dolomite |
| Secondary background | Strata Band #3D3028 (warm umber) | Cave Charcoal #1A1C22 (cool blue-grey) | Geological strata vs. cave walls |
| Primary text | Bone Ivory #E8DCC8 (shared) | Bone Ivory #E8DCC8 (shared) | Family continuity — fossil bone is fossil bone |
| Primary accent | Lucy Amber #C4893A (warm, pervasive) | Signal Amber #C4893A (warm, focused) | Same hue, different deployment: amber suffusion vs. amber signal |
| Secondary accent | Afar Sienna #9B6B3C | Ochre Earth #9B6B3C | Different soils, same earth-tone register |
| Secondary text | Tuff Grey #8A8477 (warm grey) | Dolomite Grey #6B7A8A (cool grey) | Volcanic ash vs. limestone |
| Unique to essay | Rift Grey-Green #6B7A65 (Pliocene vegetation) | Flowstone Cream #C9BFA8 (dating flowstones) | Lucy's ecology vs. naledi's geology |
| Unique to essay | — | Deep Passage #2A2D35 (cave transitions) | Naledi's cave-descent visual system has no Lucy parallel |

The fundamental shift is temperature: Lucy's palette is warm (Ethiopian, geological, sunlit excavation), naledi's is cool (South African, subterranean, headlamp-lit). Both share Bone Ivory and the amber accent, maintaining series family identity while being immediately visually distinct.

### Color Usage Rules

- Background gradient: Dinaledi Dark → Cave Charcoal → Deep Passage for section transitions (simulating depth changes in the cave)
- Interactive states: Signal Amber for hover/active, reduced opacity for inactive
- Debate sections (7, 9): Signal Amber used more aggressively to signal contested territory
- Dating sections (6): Flowstone Cream accent for U-Th / ESR method callouts
- Specimen photography: ALWAYS on Dinaledi Dark backgrounds — bone floating in darkness
- Data visualizations: Signal Amber as primary series; Flowstone Cream as secondary; never Bone Ivory (reserved for labels/annotations)
- Text hierarchy: Bone Ivory for body, Dolomite Grey for secondary/caption text
- 3D viewers: Dinaledi Dark environment with subtle ambient occlusion; Signal Amber annotation hotspots
- Cave-journey sections (2): Deep Passage backgrounds with Dolomite Grey rock-texture overlays

## Typography

### Type Scale

| Role | Font | Weight | Character |
|------|------|--------|-----------|
| Display (H1/Hero) | Source Serif 4 | 600 | Authoritative but slightly lighter than Lucy's 700 — the cave demands measured presence, not geological grandeur |
| Section Titles (H2) | Source Serif 4 | 600 | Clear hierarchy, consistent with Lucy for series continuity |
| Body Text | Source Serif 4 | 400 | Long-form reading comfort; scientific register; same as Lucy |
| Researcher Quotes | Source Serif 4 Italic | 400 | Distinguished from body, attributed voice |
| Specimen IDs | JetBrains Mono | 400 | DH1, U.W. 101-1321, LES1 — catalogued objects require monospace |
| Data Labels | JetBrains Mono | 400 | Chart axes, legends, measurements, dates (236 ka, 560 cc) |
| Captions | Source Serif 4 Italic | 400 | Image captions, source attribution — italic distinguishes from body |

### Typography Philosophy

Source Serif 4 is shared with Lucy for series consistency — these are companion essays in the same paleoanthropological series, and the reader encountering both should feel typographic kinship. The serif-forward approach anchors both essays in the tradition of scientific publishing.

JetBrains Mono serves a dual role: specimen identifiers (`DH1`, `U.W. 101-1321`, `KNM-ER 3733`) and quantitative data (`560 cc`, `236 ka`, `25 cm`). In a cave-science essay dense with measurements, dating ranges, and specimen catalogues, monospace creates a clear taxonomic register that separates data from narrative. This is more pronounced than in Lucy, where measurements appear less frequently — naledi's story is fundamentally about numbers (1,550 specimens, 15 individuals, 560 cc, 236–335 ka, 25 cm passage, 12 m chute).

Captions use Source Serif 4 Italic rather than sans-serif (diverging from Lucy's sans-serif captions). The rationale: naledi has 38 photographs and 14 visualizations, and the high density of captioned elements benefits from italic serif (which reads as a register shift within the same typeface family) rather than a full typeface switch. This also reduces the total number of font loads.

### Responsive Type Scale

Same clamp-based responsive approach as Lucy:

| Role | Min (mobile) | Max (desktop) | Clamp |
|------|-------------|---------------|-------|
| Display | 2.0rem | 3.5rem | `clamp(2rem, 5vw, 3.5rem)` |
| H2 | 1.5rem | 2.25rem | `clamp(1.5rem, 3.5vw, 2.25rem)` |
| Body | 1.0rem | 1.125rem | `clamp(1rem, 1.5vw, 1.125rem)` |
| Caption | 0.8rem | 0.875rem | `clamp(0.8rem, 1.2vw, 0.875rem)` |
| Mono (data) | 0.8rem | 0.9rem | `clamp(0.8rem, 1.2vw, 0.9rem)` |

## Animation Philosophy

### Core Principle: "Descent into Darkness"

Every animation in this essay is an emergence from darkness. Content does not slide in from below (Lucy's sediment-layer metaphor); it materializes from opacity 0 → 1, as if a headlamp has found it in the cave. The metaphor is descent — the reader is going deeper, and each section is a new chamber revealed.

This is deliberately slower than Lucy. The cave demands patience. Where Lucy's section reveals use 600ms ease-out, naledi uses 800ms ease-out. The extra 200ms creates a perceptible shift in tempo — the reader should feel the difference between walking through an Ethiopian excavation site and descending through narrow, dark passages.

### Scroll Behavior: Progress as Descent

The progress indicator is styled as a vertical descent line — a visual inversion of Lucy's strata-rising fill. In Lucy, progress fills upward (geological layers accumulating). In naledi, progress fills downward (the reader descending deeper into the cave system). The metaphor is reinforced by the section numbering: Section 1 (entrance) → Section 12 (deepest chamber of meaning).

### Transition Specifications

| Type | Duration | Easing | Notes |
|------|----------|--------|-------|
| Section reveals | 800ms | ease-out | IntersectionObserver, opacity fade only (no translate) — content emerges from dark |
| Chart transitions | 1000ms | ease-in-out | D3 data updates; 200ms slower than Lucy to maintain cave tempo |
| Scroll-lock progression | continuous | linear | Tied to scroll position |
| Hover states | 200ms | ease-out | Quick response for interactives (same as Lucy — responsiveness should not suffer) |
| 3D viewer entrance | 1200ms | ease-out | Fade in with subtle 15° rotation from dark — the specimen turns as the headlamp finds it |
| 3D annotation reveal | 400ms | ease-in-out | Hotspot labels appear on click/hover |
| Tooltip appearance | 300ms | ease-out | Slightly slower than Lucy's 200ms |
| Cave cross-section journey | 1500ms per waypoint | ease-in-out | D1 animated journey mode — slow enough to register each passage |
| Phylogeny tree toggle | 1200ms | ease-in-out | D11 tree restructuring — complex topology needs time to read |
| Evidence flowchart expand | 600ms | ease-out | D8 evidence nodes expanding on click |

### 3D Viewer Animations

The 3D specimen viewers (D13, D14) are the first WebGL elements in the essay series. Their entrance animation is distinct:

1. Viewer container fades from opacity 0 → 1 over 1200ms
2. Simultaneously, the mesh rotates 15° on the Y-axis (as if turning to face the reader)
3. Ambient light ramps from 0 to full intensity over 800ms (headlamp finding the specimen)
4. Annotation hotspots appear sequentially (200ms stagger) after the model stabilizes

On subsequent scroll-away and scroll-back, the viewer holds its last rotation state — no repeat of the entrance animation.

### Reduced Motion

All animations respect `prefers-reduced-motion: reduce`:

- Section reveals: instant opacity snap (0 → 1, no transition)
- Chart transitions: snap to final state
- 3D viewers: appear at full opacity with no rotation; static default angle
- Progress indicator: static position marker (no animated descent)
- Cave cross-section journey: all waypoints visible simultaneously
- Hover states remain (200ms is below motion sensitivity threshold)
- Parallax: disabled entirely

## Photography Treatment

### Specimen Photography

- Always on Dinaledi Dark (#0D0E12) backgrounds
- High-contrast, dramatic lighting — directional, mimicking headlamp illumination
- Stronger shadows than Lucy's museum lighting — specimens emerge from genuine darkness
- No background gradient or vignette — pure black surround
- Border: none (bone floats in the void)
- Caption in Dolomite Grey, Source Serif 4 Italic, below specimen

### Cave Photography

- Full-bleed, edge-to-edge
- Preserve the inherent darkness — do NOT brighten cave images to "readable" levels
- High contrast: dark shadows, bright headlamp pools, dramatic falloff
- The reader should feel the claustrophobia and the scale
- Overlay gradient from Dinaledi Dark at bottom edge for text legibility where needed

### Landscape Photography (Cradle of Humankind)

- Warm treatment — the above-ground world is warmer than the cave
- Subtle desaturation toward Ochre Earth / Flowstone Cream tones
- Provides contrast with the dominant cave-darkness mood
- Full-bleed, used sparingly (opening and closing sections)

### Comparative Anatomy

- Clinical neutral background — this is the ONE context where dark backgrounds may be lightened
- Side-by-side framing with consistent scale (normalized to a shared anatomical landmark)
- Annotation overlays in Signal Amber
- Scale bars present in every comparison
- Species labels in JetBrains Mono

## Visualization Design Tokens

### Chart Colors

- Primary data series: Signal Amber (#C4893A)
- Secondary series: Ochre Earth (#9B6B3C)
- Tertiary series: Dolomite Grey (#6B7A8A)
- Quaternary+: Flowstone Cream (#C9BFA8), then muted variants
- Background: Cave Charcoal (#1A1C22)
- Grid lines: Dolomite Grey at 15% opacity
- Axis labels: Dolomite Grey (#6B7A8A)
- Annotations: Bone Ivory (#E8DCC8)
- Naledi highlight: Signal Amber with 2px glow — naledi is always the brightest point on any chart

### Interactive States

- Default: 70% opacity (slightly more muted than Lucy's 80% — the cave is darker)
- Hover: 100% opacity + Signal Amber border/highlight
- Active/Selected: 100% opacity + Signal Amber fill at 30%
- Disabled: 35% opacity
- Focus: 2px Signal Amber outline (keyboard navigation)

### 3D Viewer Tokens

- Environment: Dinaledi Dark (#0D0E12)
- Ambient light: warm white, low intensity (simulating distant headlamp)
- Directional light: Signal Amber tint, 45° angle (the primary headlamp)
- Mesh material: Bone Ivory base color with subtle roughness (PBR)
- Annotation hotspot: Signal Amber circle (pulsing, 2s cycle) → click expands to Bone Ivory label
- Hotspot connector line: Dolomite Grey, 1px, dashed

### Map Colors (D9)

- Land: Cave Charcoal (#1A1C22)
- Water: #0D1218 (Dinaledi Dark with slight blue shift)
- Borders: Dolomite Grey at 25% opacity
- Site markers: Signal Amber circles with Bone Ivory labels
- Rising Star: larger marker, pulsing Signal Amber glow
- Other Cradle sites: Flowstone Cream circles
- Distance radius rings: Dolomite Grey at 15% opacity

## Differentiation from Lucy — Summary

| Aspect | Lucy | Naledi |
|--------|------|--------|
| Primary background | Hadar Dark #1C1610 (warm) | Dinaledi Dark #0D0E12 (cool) |
| Emotional register | Ethiopian strata, amber warmth, geological deep time | Subterranean, blue-grey coolness, claustrophobic mystery |
| Accent deployment | Lucy Amber pervasive — warm glow throughout | Signal Amber focused — headlamp beam in darkness |
| Progress indicator | Vertical fill rising (strata accumulating) | Vertical fill descending (cave descent) |
| Section reveal | 600ms ease-out, fade + 12px upward translate | 800ms ease-out, opacity only (emerge from dark) |
| Photograph treatment | Warm, earthy, museum lighting | Dark, high-contrast, dramatic headlamp |
| Animation speed | 0.6s base | 0.8s base |
| Typography weight (display) | 700 (geological authority) | 600 (measured subterranean presence) |
| Caption style | Sans-serif, 400 | Serif Italic, 400 |
| Unique visual element | None (standard 2D visualizations) | 3D specimen viewers (WebGL via React Three Fiber) |
| Cave metaphor | None (surface excavation) | Pervasive — descent, darkness, revelation |
| Monospace density | Low (occasional specimen IDs) | High (measurements, dates, specimen IDs throughout) |

## Responsive Adaptations

### Mobile (< 768px)

- Section reveals: same 800ms opacity fade (performs well on mobile)
- 3D viewers: simplified mesh (further decimation to ~300KB); single-finger rotate, pinch zoom
- D1 cave cross-section: vertical scroll rather than horizontal; waypoints as stacked cards
- Maps (D9): static render with tap-to-expand site details
- Photography: maintain full-bleed; reduce height; preserve darkness (do not brighten for mobile)
- Typography: display size reduces per clamp scale; serif hierarchy maintained
- Progress indicator: hidden on mobile (screen real estate)
- Parallax: disabled

### Tablet (768–1024px)

- Full experience with minor layout adjustments
- 3D viewers: full interaction preserved
- Side-by-side comparisons maintained
- Section reveals at full duration

### Desktop (> 1024px)

- Full experience as designed
- Maximum content width: 1200px for prose sections
- Full-bleed elements (photography, D1 cross-section, D9 map) break out of content column
- 3D viewers at maximum resolution with full annotation system

## Accessibility

- All images: descriptive alt text referencing specimen IDs and anatomical significance
- All charts: hidden data tables for screen readers
- All interactives: ARIA labels, keyboard navigation, focus management
- 3D viewers: static fallback images with detailed alt text for screen readers and devices without WebGL
- Color: all data-encoding passes WCAG 2.1 AA contrast against Dinaledi Dark
- Bone Ivory (#E8DCC8) on Dinaledi Dark (#0D0E12): contrast ratio ~14.2:1 (AAA)
- Signal Amber (#C4893A) on Dinaledi Dark (#0D0E12): contrast ratio ~6.4:1 (AA for large text, AAA for UI components)
- Dolomite Grey (#6B7A8A) on Dinaledi Dark (#0D0E12): contrast ratio ~4.8:1 (AA for large text; pair with Bone Ivory for small text)
- Focus indicators: Signal Amber outline (2px), visible on all interactive elements
- Skip links for 3D viewer sections (allow keyboard users to bypass WebGL content)
- All animations: `prefers-reduced-motion` support as specified above

## Anti-Collision Audit (Cluster-Specific)

### vs. Lucy (Sibling Cluster Essay)

- **SHARED**: Bone Ivory (#E8DCC8), Signal Amber / Lucy Amber (#C4893A), Ochre Earth / Afar Sienna (#9B6B3C), Source Serif 4, JetBrains Mono — intentional family inheritance
- **DIFFERENTIATED**: Dinaledi Dark (cool) vs. Hadar Dark (warm); Cave Charcoal vs. Strata Band; Dolomite Grey vs. Tuff Grey; Flowstone Cream (unique); Deep Passage (unique); animation speed (0.8s vs. 0.6s); 3D viewers (unique to naledi); progress direction (descent vs. ascent)
- **RISK**: Low — these are companion essays and SHOULD feel related. The warm/cool temperature shift is immediately perceptible.
- **VERDICT**: ✅ No collision — intentional family continuity with clear differentiation

### vs. Seven Million Years (Parent)

- **SHARED**: Bone Ivory, dark-background-forward approach
- **DIFFERENTIATED**: Entirely different accent deployment; cave-specific mood; 3D viewer system
- **VERDICT**: ✅ No collision

### vs. Other Essays

- **Inside a Black Hole**: Both use very dark backgrounds, but Black Hole is neutral/cosmic; naledi is cool/geological. Different accent palettes. No collision.
- **VERDICT**: ✅ No collision across the portfolio
