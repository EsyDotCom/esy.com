---
gate: G4
status: PASS
essay: lucy
date: 2026-02-24
---

# Design Research: Lucy — Before the Genus Homo

## Design Philosophy

The visual identity of this essay emerges entirely from Lucy's material world — Ethiopian earth, fossilized bone, the Afar Depression, geological strata. AL 288-1 is not an abstraction; she is a physical object, a collection of 47 bones recovered from Pliocene sediment in the Hadar Formation of Ethiopia. Every design decision traces back to the materiality of that discovery: the warm amber of mineralized bone against dark volcanic matrix, the layered umber and sienna of exposed badlands, the grey bands of volcanic tuff that gave her an age.

The essay should feel like entering the most intimate gallery of a world-class natural history museum — dramatic specimen lighting, the sense of profound age and significance, the hush that settles when you stand before something 3.2 million years old. The interface recedes. The specimen commands attention. Typography carries authority without ornamentation. Color is restrained, derived from sediment and bone, never decorative. Animation serves a single purpose: to teach — to reveal anatomical relationships, temporal sequences, or spatial information that static presentation cannot convey.

As a cluster essay derived from Seven Million Years, Lucy inherits the parent's visual language — Bone Ivory, Ochre Red, the dark-background-forward approach, the serif-dominant typographic hierarchy. But where the parent essay spans the full sweep of hominin evolution (cool, vast, geological in temperament), Lucy narrows to a single specimen, a single site, a single set of questions. The voice is warmer. The palette shifts toward brown and amber. The design contracts from panoramic to intimate, from survey to monograph.

## Subject Matter Analysis

The subject offers a rich and specific visual vocabulary. Fossilized bone — warm amber and tan against dark sedimentary matrix — provides the primary contrast relationship. The Hadar sediments are layered in horizontal bands of umber, sienna, and terra cotta, creating a natural stratigraphy that informs section transitions and background treatment. The Afar Depression itself is a vast desert badland of exposed geological strata, eroded gullies, and bleached earth under harsh equatorial light. Volcanic tuff — grey, ashy, fine-grained — appears as chronological marker bands within the sediment column and provides a natural source for secondary/neutral tones. The Ethiopian highlands loom in the background context, green and elevated, a contrast to the arid depression below. Museum specimen lighting — directional, warm, high-contrast — provides the dominant lighting paradigm. Discovery photographs from 1974 (Johanson, Gray, the expedition camp) offer archival texture. Anatomical comparison imagery (chimp pelvis vs. Lucy pelvis vs. modern human pelvis) demands clinical precision and neutral framing. The Pliocene gallery forest environment — riparian woodland along ancient rivers in an otherwise open landscape — introduces muted greens that are otherwise absent from the palette.

## Color System

### Primary Palette

| Name | Hex | Source Derivation | Usage |
|------|-----|-------------------|-------|
| Hadar Dark | #1C1610 | Volcanic basalt and deep sediment at the base of the Hadar Formation | Primary background |
| Bone Ivory | #E8DCC8 | The bleached surface of mineralized bone — inherited from parent | Primary text, high-contrast elements |
| Lucy Amber | #C4893A | The specific warm amber of the AL 288-1 specimen, photographed under museum lighting | Primary accent — interactive highlights, links, emphasis |
| Afar Sienna | #9B6B3C | Sun-baked Hadar sediment, the exposed Denen Dora Member | Secondary accent, section borders |
| Ochre Red | #C4572A | Iron-rich laterite in Ethiopian soil — inherited from parent | Warning/emphasis, debate sections |
| Rift Grey-Green | #6B7A65 | Pliocene vegetation — the gallery forest that lined ancient rivers | Ecology sections, environment context |
| Tuff Grey | #8A8477 | Volcanic tuff bands that serve as chronological markers | Secondary text, captions, data labels |
| Strata Band | #3D3028 | Elevated sedimentary layers in cross-section | Card backgrounds, section dividers |

### Relationship to Parent

Hadar Dark (#1C1610) is warmer than the parent's Stratum Dark (#1A1610) — shifted slightly toward brown to reflect the specific geology of the Hadar Formation rather than generic deep-time darkness. Bone Ivory (#E8DCC8) and Ochre Red (#C4572A) are directly inherited from Seven Million Years, maintaining family continuity in the two most structurally important roles (primary text and emphasis). Lucy Amber (#C4893A) is entirely new — unique to this essay, derived from the specimen itself. It replaces Yellow Ochre (#C89B3C) from the parent palette, shifting from a geological gold toward a warmer, more organic amber that evokes mineralized bone under warm lighting. Rift Grey-Green (#6B7A65) is also new, introducing a vegetation tone absent from the parent. This reflects Lucy's specific ecological context — the Pliocene gallery forest — and gives the ecology sections (6, 7) a distinct visual register. Afar Sienna (#9B6B3C) refines the parent's Rift Sienna (#8B5E3C), pulling slightly warmer and more orange to match Hadar-specific sediment.

### Color Usage Rules

- Background gradient: Hadar Dark → Strata Band for section transitions
- Interactive states: Lucy Amber for hover/active, reduced opacity for inactive
- Debate sections (5, 9): Ochre Red accent to signal contested territory
- Ecology sections (6, 7): Rift Grey-Green undertones
- Specimen photography: ALWAYS on Hadar Dark backgrounds
- Data visualizations: Lucy Amber as primary series, never Bone Ivory (reserve for labels/annotations)
- Text hierarchy: Bone Ivory for body, Tuff Grey for secondary/caption text

## Typography

### Type Scale

| Role | Font Direction | Weight | Character |
|------|---------------|--------|-----------|
| Display (H1/Hero) | Serif (Freight Display Pro or Source Serif 4) | 700 | Authoritative, archaeological gravitas |
| Section Titles (H2) | Serif | 600 | Clear hierarchy, museum placard feel |
| Body Text | Serif (Source Serif 4 or similar) | 400 | Long-form reading comfort, scientific register |
| Researcher Quotes | Serif Italic | 400 | Distinguished from body, attributed voice |
| Anatomical Terms | Sans-serif (Inter or IBM Plex Sans) | 500 | Clinical precision, first-use definitions |
| Specimen IDs | Monospace (JetBrains Mono or IBM Plex Mono) | 400 | AL 288-1, DIK-1-1, KNM-WT 17000 |
| Data Labels | Sans-serif | 400 | Chart axes, legends, annotations |
| Captions | Sans-serif | 400, smaller | Image captions, source attribution |

### Typography Philosophy

Serif-forward for authority — this is deep-time science, not a startup. The choice of a high-contrast serif for display and body text anchors the essay in the tradition of scientific publishing and museum exhibition design. Source Serif 4 (or Freight Display Pro for display sizes) carries the weight of the subject without the decorative excess of more ornamental serifs.

Monospace for specimen identifiers creates a taxonomic register that is immediately visually distinct from surrounding prose. When the reader encounters `AL 288-1` or `KNM-WT 17000`, the shift to monospace signals: this is a catalogued object, a specific thing in a specific collection. This convention mirrors how specimen IDs appear in the paleoanthropological literature.

Sans-serif is reserved for data and UI contexts — chart labels, anatomical term definitions on first use, captions, and interface elements. It never appears as body text. The first-use anatomical definition pattern (e.g., "bipedalism" rendered in sans-serif medium weight with a subtle Lucy Amber underline) visually distinguishes technical vocabulary from narrative flow, serving readers who may be encountering these terms for the first time.

## Animation Philosophy

### Core Principle

Every animation teaches. Motion is never decorative — it reveals anatomical relationships, temporal sequences, or spatial information that static presentation cannot convey. If an animation does not make the science clearer, it is removed.

### Scroll-Lock Zones (4)

1. **Hero** (0–100% of hero viewport): Bone assembly sequence — individual bones of AL 288-1 drift into anatomical position from scattered arrangement. Scale comparison fades in (Lucy silhouette against modern human). Pelvis highlights as the key diagnostic element. Title resolves over assembled skeleton.
2. **Skeletal Tour** (Section 3, D7): Guided bone-by-bone reveal — each bone group highlights in sequence with accompanying anatomical annotation. User can also navigate manually.
3. **Biomechanics** (Section 4, D10): Gait cycle animation — chimpanzee, Lucy, and modern human walking cycles rendered side by side. Pelvis, femur angle, and center-of-gravity overlays toggle on/off.
4. **Species Time Map** (Section 10, D6): Animated species ranges appearing across the African continent as the timeline advances, showing the radiation and overlap of hominin species from 4 Ma to 1 Ma.

### Transition Specifications

| Type | Duration | Easing | Notes |
|------|----------|--------|-------|
| Section reveals | 600ms | ease-out | IntersectionObserver, fade + slight upward translate (12px) |
| Chart transitions | 800ms | ease-in-out | D3 data updates, toggle between states |
| Scroll-lock progression | continuous | linear | Tied to scroll position, not time |
| Hover states | 200ms | ease-out | Quick response for interactive elements |
| Guided tour steps | 400ms | ease-in-out | D7/D10 step transitions |
| Phylogeny tree toggle | 1000ms | ease-in-out | D8 animated tree restructuring — needs time for clarity |
| Skeleton assembly | 1200ms per bone group | ease-out | Hero sequence, staggered entry |

### Parallax System

- Background sediment texture: 0.3x scroll rate
- Mid-layer section backgrounds: 0.5x scroll rate
- Content layer: 1.0x (normal)
- Foreground overlays: 1.2x (subtle, specimen frames only)

### Reduced Motion

All animations respect `prefers-reduced-motion: reduce`. Scroll-lock zones still lock but skip animation — they show the final state immediately. Parallax is disabled entirely. The D10 gait animation shows a static comparison frame with all three species visible simultaneously instead of animating through the walking cycle. Chart transitions snap to final state. Hover states remain (200ms is below the threshold for motion sensitivity).

## Photography Treatment

### Specimen Photography

- Always on Hadar Dark (#1C1610) background
- High contrast, museum-quality lighting (directional, warm)
- No busy backgrounds, no contextual clutter
- Border: none (specimens float on dark)
- Caption in Tuff Grey, sans-serif, below specimen

### Landscape Photography

- Full-bleed, edge-to-edge
- Warm desaturation — shift toward the Afar palette (sienna, umber, muted greens)
- No oversaturated "National Geographic" color — this is science, not tourism
- Overlay gradient from Hadar Dark at bottom edge for text legibility when needed

### Anatomical Comparisons

- Clinical neutral background (light grey or white)
- This is the ONE context where dark backgrounds are NOT used
- Side-by-side framing with consistent scale and alignment
- Annotation overlays in Lucy Amber
- Scale bars present in every comparison image

### Archival/Discovery Photographs

- Preserved as-is with minimal grading
- Slight warm shift to integrate with overall palette
- Presented as historical documents, not modernized
- Date and attribution in caption, always

## Visualization Design Tokens

### Chart Colors

- Primary data series: Lucy Amber (#C4893A)
- Secondary series: Afar Sienna (#9B6B3C)
- Tertiary series: Rift Grey-Green (#6B7A65)
- Quaternary+: rotate through Tuff Grey, Ochre Red, muted versions of primary
- Background: Strata Band (#3D3028)
- Grid lines: Tuff Grey at 20% opacity
- Axis labels: Tuff Grey (#8A8477)
- Annotations: Bone Ivory (#E8DCC8)

### Interactive States

- Default: 80% opacity
- Hover: 100% opacity + Lucy Amber border/highlight
- Active/Selected: 100% opacity + Ochre Red accent
- Disabled: 40% opacity
- Focus: 2px Lucy Amber outline (keyboard navigation)

### Map Colors (D3, D6)

- Land: Strata Band (#3D3028)
- Water: #1C2830 (Hadar Dark with blue shift)
- Borders: Tuff Grey at 30% opacity
- Species ranges: semi-transparent fills using chart color series
- Lucy's range: Lucy Amber fill at 40% opacity
- Site markers: Bone Ivory circles with Lucy Amber stroke

## Responsive Adaptations

### Mobile (< 768px)

- Scroll-lock zones shortened (60% of desktop duration)
- D10 gait animation simplified (one species at a time, swipe to compare)
- D1 anatomical comparison becomes swipe carousel instead of side-by-side
- Maps reduce to static renders with tap-to-expand
- Photography: maintain full-bleed, reduce height
- Typography: display size reduces but maintains serif hierarchy
- Parallax disabled on mobile for performance

### Tablet (768–1024px)

- Full experience with minor layout adjustments
- Side-by-side comparisons maintained
- Map interactions preserved
- Scroll-lock zones at 80% of desktop duration

### Desktop (> 1024px)

- Full experience as designed
- Maximum content width: 1200px for prose sections
- Full-bleed elements break out of content column
- Scroll-lock zones at full duration

## Accessibility

- All images: descriptive alt text referencing specimen IDs and anatomical significance
- All charts: hidden data tables for screen readers
- All interactives: ARIA labels, keyboard navigation, focus management
- Color: all data-encoding passes WCAG 2.1 AA contrast against Hadar Dark
- Bone Ivory on Hadar Dark: contrast ratio ~12.5:1 (AAA)
- Lucy Amber on Hadar Dark: contrast ratio ~5.8:1 (AA for large text, verified)
- Focus indicators: Lucy Amber outline (2px), visible on all interactive elements
- Skip links for scroll-lock zones (allow keyboard users to bypass)
- All animations: `prefers-reduced-motion` support as specified above

## Anti-Collision Audit (Cluster-Specific)

### vs. Seven Million Years (Parent)

- **SHARED**: Bone Ivory, Ochre Red (intentional family inheritance)
- **DIFFERENTIATED**: Hadar Dark (warmer than Stratum Dark), Lucy Amber (unique), Rift Grey-Green (unique)
- **RISK**: Low — cluster essays are EXPECTED to share family language
- **VERDICT**: ✅ No collision — intentional inheritance with sufficient differentiation

### vs. Inside a Black Hole

- **SHARED**: Dark backgrounds (but different warmth — Hadar Dark is warm, Black Hole is cool/neutral)
- **DIFFERENTIATED**: Entirely different accent palette, different typography rationale
- **VERDICT**: ✅ No collision

### vs. The Anatomy of a Wave

- **SHARED**: Nothing significant
- **VERDICT**: ✅ No collision
