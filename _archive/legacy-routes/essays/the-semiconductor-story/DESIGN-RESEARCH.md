# Design Research Report: The Semiconductor Story

> Created: December 18, 2025
> Status: Complete
> Gate: G4 (Design Research)

---

## Visual Archaeology Findings

### Primary Materials

The semiconductor industry's visual identity emerges from its physical materials:

1. **Silicon** — The foundation. Gray-silver crystalline material, highly reflective when polished into wafers
2. **Gold** — Bonding wires, contact points. The warm metallic accent in cold silicon
3. **Copper** — Interconnects and traces. Reddish-brown circuitry paths
4. **Cleanroom White** — The sterile manufacturing environment. Clinical, precise
5. **Deep Purple/Ultraviolet** — The wavelength of lithography. The light that draws circuits
6. **Neon Green/Teal** — The glow of phosphor screens, circuit board traces, the "tech" accent

### Historical Color Associations

| Era | Dominant Colors | Source |
|-----|-----------------|--------|
| 1947-1956 (Bell Labs) | Black, white, sepia, laboratory gray | B&W photography, lab coats, oscilloscopes |
| 1957-1968 (Silicon Valley Genesis) | Warm browns, California gold, sky blue | Kodachrome film, orchards, sunlight |
| 1968-1987 (Microprocessor Era) | Corporate blue, chip gold, PCB green | Intel branding, magazine photography |
| 1987-Present (Global/Modern) | Clinical white, silicon gray, process blue, data teal | Cleanrooms, wafer photography, data visualization |

### Recurring Visual Motifs

1. **The Wafer Circle** — Silicon wafers are circular; the die grid pattern is iconic
2. **The Trace Pattern** — Circuit traces, the "nervous system" of chips
3. **The Die Grid** — Rectangular chips arranged on circular wafers
4. **The Cleanroom Bunny Suit** — The white-suited technicians
5. **The Oscilloscope Wave** — Signal visualization, the proof of amplification
6. **The Logarithmic Scale** — Moore's Law visualization, exponential growth
7. **The Globe with Nodes** — Supply chain visualization, geopolitical maps

### Era-Specific Aesthetics

**Foundation Era (1947-1956)**
- Feel: Scientific discovery, institutional research
- Texture: Laboratory grain, paper documents, metal equipment
- Light: Fluorescent, harsh, documentary

**Silicon Valley Genesis (1957-1968)**
- Feel: Entrepreneurial optimism, California dream
- Texture: Wood-paneled offices, garage workshops, orchards
- Light: Golden California sunshine, warm and hopeful

**Microprocessor Revolution (1968-1987)**
- Feel: Corporate ascendance, technological progress
- Texture: Clean offices, trade show booths, magazine layouts
- Light: Professional photography, flash-lit portraits

**Modern Era (1987-Present)**
- Feel: Precision, scale, geopolitical weight
- Texture: Sterile cleanrooms, reflective wafers, complex machinery
- Light: Clinical lighting, blue-tinted, high contrast

---

## Proposed Color Palette

### Primary Colors

| Color | Hex | Derivation |
|-------|-----|------------|
| **Silicon Black** | `#0A0A0C` | The darkness of a chip's interior, the canvas |
| **Wafer Gray** | `#141419` | Polished silicon surface, elevated backgrounds |
| **Trace Teal** | `#00D4AA` | Circuit traces glowing, progress, the "on" state |
| **Plasma Orange** | `#FF6B35` | EUV tin plasma, molten transformation, heat |

### Secondary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Text Primary** | `#FFFFFF` at 95% | Main body text |
| **Text Secondary** | `#FFFFFF` at 65% | Supporting text, captions |
| **Era 1 Sepia** | `#D4C5A9` | Foundation era overlay |
| **Era 4 Blue** | `#00A3FF` | Modern cleanroom tint |
| **Risk Red** | `#FF4444` | Geopolitical tension, supply chain risk |
| **Progress Green** | `#22CC88` | Milestones, success states |

### Palette Justification

- **Silicon Black**: The interior of a chip is darkness; we're revealing light within
- **Trace Teal**: Circuit traces glow when active; this is the color of "on," of progress, of Moore's Law ascending
- **Plasma Orange**: EUV lithography creates light by vaporizing tin into plasma; this is transformation, the impossible made real
- **The contrast**: Cold silicon world with warm human moments (portraits, quotes)

---

## Typography Stack

### Display (Headlines)

**Font**: Inter, 700 weight
**Justification**: Engineered precision. Inter was designed for computer screens with mathematical rigor—appropriate for a story about the technology that makes screens possible. Its neutrality lets the content speak; its precision echoes chip design.

### Body Text

**Font**: Inter, 400 weight
**Justification**: Consistency with headlines, excellent readability, global language support (essential for a story spanning US, Taiwan, Korea, Japan, Netherlands). The font designed for interfaces telling the story of interface-enabling technology.

### Quotes

**Font**: Playfair Display, 400 italic
**Justification**: Contrast. The human voice against the machine context. Serif elegance for the words of Bardeen, Moore, Grove, Chang. Their wisdom deserves gravitas that sans-serif cannot provide.

### Technical/Data

**Font**: JetBrains Mono
**Justification**: Monospace for numbers, specifications, data points. This is a story full of transistor counts, process nodes, percentages. They deserve technical typography.

### Captions

**Font**: Inter, 500 weight at 0.85 size
**Justification**: Understated, informational, doesn't compete with body text.

---

## Animation Philosophy

### Overall Tempo: **Measured Precision**

Semiconductors are made with atomic-level precision over long timescales. The animation tempo should reflect this:
- Not rushed or frenetic (this isn't a gaming site)
- Not sluggish (technology moves forward)
- Deliberate, confident, precise

### Reveal Style: **The Assembly**

Chips are built layer by layer, component by component. Reveals should feel like **construction**:
- Elements build into view, not just fade
- SVG paths draw like circuit traces being printed
- Data visualizations populate point by point
- The progress bar fills like a wafer being processed

### Parallax Intensity: **Subtle to Moderate**

Cleanrooms are flat, sterile spaces. Parallax should suggest depth without overwhelming:
- Background: 0.2x (distant, atmospheric)
- Mid-ground: 0.5x (supporting context)
- Subject: 1.0x (primary focus)
- Ambient: 1.5x (floating particles, electrons)

### Special Effects

1. **Electron Particles**: Floating points of light suggesting the electrons that make semiconductors work
2. **Circuit Trace Drawing**: SVG stroke animation for technical explanations
3. **Era Transitions**: Color grading shifts as we move through time
4. **Data Counter Animations**: Numbers ticking up for Moore's Law visualization
5. **Map Flow Lines**: Animated paths showing supply chain movement

### Scroll-Lock Philosophy

Lock duration proportional to content importance:
- Hero sequence: Long (establishing the stakes)
- Technical explanations (transistor, EUV): Medium-long (educational priority)
- Timeline milestones: Short (rhythm and pacing)
- Quote monuments: Brief pause (emphasis)

---

## Visual Motifs

### Decorative Elements

1. **Die Grid Pattern**: Subtle background texture suggesting chip die arrangement
2. **Circuit Trace Lines**: Thin lines connecting sections, suggesting interconnection
3. **Wafer Circle**: Progress indicator shaped as circular wafer with die blocks
4. **Electron Dots**: Floating ambient particles, subtle movement

### Section Transitions

Transitions evoke the **lithography process**:
- Content "exposes" into view like photoresist
- Old section "etches" away as new one appears
- Sense of layered construction

### Progress Indicator Concept

**The Silicon Wafer**
- Circular wafer outline (left edge, vertical orientation on desktop)
- Die blocks fill as chapters complete
- Current chapter "processes" with subtle glow
- Hover reveals chapter title
- Click navigates to chapter

---

## Differentiation Verification

### Comparison to Recent Esy Scrollytelling

This design is distinct from other Esy visual essays because:

1. **Color Palette**: Silicon black + trace teal + plasma orange is unique. Not warm food colors, not historical sepia, not cultural patterns.

2. **Typography**: Inter throughout (except quotes) gives a technical, engineered feel different from serif-heavy historical pieces.

3. **Animation Philosophy**: "Assembly" reveal style is unique—elements construct rather than simply fade or slide.

4. **Progress Indicator**: Wafer-shaped progress bar is subject-specific. No other topic would use this.

5. **Motifs**: Circuit trace lines and electron particles are semiconductor-specific.

### The Forcing Question

> "What interactive element in this story could ONLY exist in a story about semiconductors?"

**Answer**: The "How a Transistor Works" scroll-lock sequence—an SVG diagram that builds as you scroll, showing gate, source, drain, and electron flow. This educational animation could ONLY exist in a semiconductor story. It's not decoration; it's core education.

Secondary: The Moore's Law interactive timeline where transistor counts tick up exponentially as you scroll through decades. The numbers themselves are the content.

### Visual Identity Test

If all text were removed, would someone guess this is about semiconductors?
- **Yes**: The color palette (silicon gray, trace teal, plasma orange), the circuit motifs, the wafer progress bar, and the data visualizations all signal "technology/chips" without needing words.

---

## Mobile-First Design Notes

### Portrait Priority

- All scroll-lock sequences designed for portrait viewing
- Data visualizations use vertical orientation
- Timeline is vertical (not horizontal)
- Full-bleed images respect safe areas

### Touch Targets

- Skip buttons: 48px minimum
- Progress bar chapters: 44px tap targets
- Navigation elements in thumb zone

### Performance Constraints

- Max 3 simultaneous animations per viewport
- Parallax limited to 2 layers on mobile
- Electron particles reduced/disabled on low-power mode
- All scroll-lock sequences have skip affordance

---

## Design Research Summary

| Element | Derivation | Subject Connection |
|---------|------------|-------------------|
| Silicon Black background | Chip interior darkness | We're looking inside the machine |
| Trace Teal accent | Glowing circuit traces | The "on" state, progress, Moore's Law |
| Plasma Orange accent | EUV tin plasma | Transformation, impossible engineering |
| Inter typography | Screen-first design | Technology for technology story |
| Assembly reveals | Layer-by-layer chip fabrication | How chips are actually made |
| Wafer progress bar | Silicon wafer shape | The physical object being discussed |
| Electron particles | Electron flow in semiconductors | The fundamental physics |
| Circuit trace motifs | PCB and chip interconnects | The visual language of electronics |

---

## Gate 4 Status: ✅ APPROVED

**Approval Date**: December 18, 2025
**Approved By**: Production Orchestrator

**Notes**:
- Unique visual identity derived from semiconductor materials and manufacturing
- Color palette distinct from all other Esy visual essays
- Animation philosophy matches subject nature (precision, assembly, construction)
- Subject-specific interactive elements identified (transistor diagram, Moore's Law timeline)
- Mobile-first considerations documented
- Ready to proceed to content creation and implementation

---

## Next Steps

1. **Content Creation**: Draft full narrative content for all 9 chapters
2. **Technical Implementation**: Build React components with design system
3. **SVG Creation**: Transistor diagram, circuit motifs, wafer progress bar
4. **Data Visualizations**: Moore's Law chart, manufacturing share map, supply chain
5. **Mobile Testing**: Real device testing on iOS and Android
