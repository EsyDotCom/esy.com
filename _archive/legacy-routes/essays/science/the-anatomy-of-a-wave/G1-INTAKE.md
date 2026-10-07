# G1 Intake Document: The Anatomy of a Wave

> **Date**: February 9, 2026
> **Orchestrator**: Visual Essay Orchestrator
> **Status**: G1 — APPROVED
> **Run ID**: run_20260209T135938917Z_the-anatomy-of-a-wave_l8ud24

---

## Project Identification

| Field | Value |
|-------|-------|
| **Working Title** | The Anatomy of a Wave |
| **Slug** | `the-anatomy-of-a-wave` |
| **Type** | Visual Essay |
| **Category** | Science |
| **Subcategory** | Physics |
| **Route** | `/essays/science/the-anatomy-of-a-wave` |
| **Artifact Path** | `src/app/essays/science/the-anatomy-of-a-wave/` |

---

## Topic & Core Thesis

**Waves are a single phenomenon expressed across radically different scales — from the ocean to sound to quantum mechanics — and understanding any one of them unlocks the pattern behind all of them.**

The essay progressively abstracts from physical, tangible waves (ocean) through invisible-but-intuitive waves (sound) to mathematically abstract waves (quantum), showing that the same anatomy — wavelength, frequency, amplitude, superposition, interference — governs all of them.

---

## Target Audience

| Attribute | Value |
|-----------|-------|
| **Level** | Beginner to intermediate (no physics background required) |
| **Profile** | Curious adults who watch Veritasium/3Blue1Brown but haven't studied physics formally |
| **Prior Knowledge** | Everyone has seen ocean waves; most understand "sound waves" vaguely; quantum waves are mysterious |
| **Reading Level** | Accessible with earned complexity — starts simple, ramps up gradually |

### Implicit Reader Question

> "What actually IS a wave? And why do physicists keep saying everything is waves?"

---

## Learning Objectives

After reading this essay, the reader should be able to:

1. **Define** a wave as an energy transfer without matter transfer, and explain why that distinction matters
2. **Identify** wavelength, frequency, amplitude, and phase — the four parameters that describe any wave
3. **Explain** superposition and interference using visual intuition (constructive/destructive)
4. **Recognize** standing waves as a fundamental pattern in nature (from guitar strings to atomic orbitals)
5. **Understand** why quantum wave functions are "waves" (probability amplitude) without needing the math

---

## Scope Definition

### Includes

- Ocean/water waves as the physical anchor
- Sound waves — pressure, frequency, the Doppler effect
- Light as electromagnetic waves — the visible spectrum, wavelength = color
- Superposition and interference (double-slit as the capstone)
- Standing waves — how they create structure (strings, drums, atoms)
- The wave equation as a conceptual bridge (show the shape, not the math)
- Quantum wave functions — probability, not certainty (conceptual only)

### Excludes

- Full electromagnetic spectrum deep dive (keep it to visible light)
- Maxwell's equations or Schrödinger equation in symbolic form
- Signal processing / Fourier transforms
- Detailed quantum mechanics beyond wave-particle duality
- Seismology (earthquakes) — mentioned in passing at most
- Radio/communications engineering

---

## Tone & Style Constraints

### Required Tone

- Wonder-driven but grounded — the aesthetic of a great science museum exhibit
- Confident and precise — no hedging on established physics
- Progressive complexity — each section earns the right to be slightly more abstract

### Text Constraints

- Short paragraphs (2-4 sentences, max 5)
- Define every physics term before using it
- No unexplained jargon or acronyms
- Use "you" and direct address sparingly but effectively
- No math notation — convey equations through visual analogies and diagrams

### Must-Includes (Editorial POV)

- The "a wave is not the water" insight — the most common misconception, addressed head-on in Section 1
- Standing waves create structure — this is the bridge to quantum (the guitar string → the electron)
- The double-slit experiment as the essay's climax — the moment waves become strange

### What It's NOT

- Not a physics textbook chapter
- Not a history of wave theory (no Huygens vs. Newton narrative)
- Not about tsunamis, earthquakes, or natural disasters
- Not about music theory (though guitar strings make an appearance)

---

## Visual Requirements

### Visualization Approach

This essay's visualizations should progress from **concrete to abstract**, mirroring the content arc:

1. **Ocean wave cross-section** — physical, tangible, animated (water particles in circular motion)
2. **Sound wave pressure visualization** — invisible made visible (particle density, pressure graph)
3. **Electromagnetic spectrum strip** — color-mapped wavelength → frequency relationship
4. **Superposition playground** — interactive: two waves combine, user controls frequency/amplitude
5. **Interference patterns** — ripple tank simulation (two point sources, constructive/destructive)
6. **Standing wave builder** — fundamental + harmonics on a string, progressing to 2D drumhead
7. **Double-slit finale** — the pattern emerges from particles, scroll-triggered revelation

### Visualization Tiers (per Visualization Quality Standard)

| Viz | Name | Tier | Type | Notes |
|-----|------|------|------|-------|
| D1 | Ocean Wave Anatomy | Tier 2 | Annotated SVG + animation | Circular particle motion, wavelength/amplitude labels |
| D2 | Sound Pressure | Tier 2 | Animated SVG | Compression/rarefaction visualization |
| D3 | Light Spectrum | Tier 1 | Styled HTML/CSS | Color gradient with wavelength scale |
| D4 | Superposition | Tier 3 | Interactive SVG/Canvas | Two-wave combiner with sliders |
| D5 | Interference (Ripple Tank) | Tier 3 | Canvas/WebGL | Two-source ripple simulation |
| D6 | Standing Waves | Tier 2 | Animated SVG | Harmonic series on string, maybe 2D drumhead |
| D7 | Double-Slit | Tier 3 | Scroll-triggered Canvas | Pattern emergence as particle count increases |

All non-trivial visualizations (Tier 2+) require a research brief per the [Visualization Quality Standard](../../../../orchestration/standards/visualization-quality-standard.md).

---

## Section Architecture (Preliminary)

| # | Section | Key Concept | Anchor Visualization |
|---|---------|-------------|---------------------|
| 1 | What Is a Wave? | Energy transfer, not matter transfer | D1: Ocean Wave Anatomy |
| 2 | The Language of Waves | Wavelength, frequency, amplitude, phase | Annotated overlay on D1 |
| 3 | Waves You Can't See | Sound as pressure wave | D2: Sound Pressure |
| 4 | Waves You Can See | Light, EM spectrum, wavelength = color | D3: Light Spectrum |
| 5 | When Waves Meet | Superposition principle | D4: Superposition Playground |
| 6 | The Ripple Tank | Interference patterns | D5: Ripple Tank Simulation |
| 7 | Waves That Stand Still | Standing waves, resonance, harmonics | D6: Standing Wave Builder |
| 8 | The Strangest Wave | Quantum wave functions, double-slit | D7: Double-Slit Finale |
| 9 | Everything Is Waves | Synthesis — the universal pattern | Conceptual recap |

---

## Research Requirements

### Research Profile: Conceptual

This is a physics explainer — use the **Conceptual Profile**:
- **Source-tracking**: `CLAIMS.md` (verified facts with sources + expert quotes)
- **Recommended files**: CONCEPTS.md, SEQUENCE.md, DEFINITIONS.md, ANALOGIES.md, MISCONCEPTIONS.md

### Key Research Questions

1. What is the precise physical mechanism of energy transfer in ocean waves? (Circular particle orbits)
2. How does sound propagate — longitudinal compression waves in air (speed, frequency perception)?
3. What determines the visible light spectrum? Wavelength ranges for each color?
4. How does the superposition principle work mathematically and intuitively?
5. What is the physics of interference — constructive and destructive? Path difference?
6. How do standing waves form? What determines the harmonic series?
7. What is a quantum wave function, really? What does "probability amplitude" mean?
8. How does the double-slit experiment demonstrate wave-particle duality?
9. What are the most common misconceptions about waves? ("The water moves with the wave")

### Source Requirements

| Tier | Target |
|------|--------|
| Tier 1 (Textbooks, primary physics sources) | ≥ 60% |
| Tier 2 (Quality science journalism, encyclopedias) | ≤ 30% |
| Tier 3 (Popular science, blogs) | ≤ 10% |
| **Minimum total** | 10 sources (standard depth) |

---

## Design Research Requirements

- **Subject-derived palette**: Ocean blues → sound purples → light spectrum → quantum violet/indigo
- **Progressive abstraction**: Visual style should become more abstract as the essay progresses
- **Motion as meaning**: Waves ARE motion — animation isn't decorative, it's definitional
- **No static wave diagrams**: Every wave visualization should move. A static sine curve is a dead wave.

---

## Estimated Scope

| Metric | Estimate |
|--------|----------|
| Read Time | 18-25 minutes |
| Sections | 9 |
| Major Visualizations | 7 |
| Word Count | 3,000-4,500 words |
| Complexity | Medium-High (progressive abstraction, no math) |

---

## Pipeline Tests This Essay Exercises

Per `ideas/visual-essay-ideas.md`:

- **Physics visualization across scales** — from macro (ocean) to micro (quantum)
- **Mathematical abstraction** — conveying equations through visual metaphors
- **Wave mechanics accuracy** — established physics that must be precisely correct
- **Progressive complexity** — audience ramp from beginner to "quantum is less scary now"
- **Interactive visualizations** — D4 (Superposition) and D5 (Ripple Tank) require user interaction
- **Tier 3 visualizations** — first test of WebGL/Canvas-based interactive simulations at this scale

---

## G1 Approval Checklist

- [x] Topic is viable for visual essay treatment
- [x] Core thesis is clear and coherent
- [x] Target audience is well-defined
- [x] Learning objectives are specific and testable
- [x] Scope boundaries are clear (includes/excludes)
- [x] Section architecture aligns with learning sequence
- [x] Visual requirements are specified with tier classifications
- [x] Research requirements identified (conceptual profile)
- [x] Design research requirements identified (subject-derived)
- [x] Follows intake quality principles (5-signal model)

---

## Approval

**G1 Status**: ✅ APPROVED

**Rationale**: The topic is a natural fit for the visual essay format — waves are inherently visual and dynamic. The progressive abstraction arc (ocean → sound → light → quantum) provides a clear pedagogical throughline. The visualization set is ambitious but achievable, with three Tier 3 interactive diagrams that will stress-test the pipeline's production capabilities. The essay addresses a genuinely universal physics concept accessible to the target audience.

**Next Step**: Invoke Research Orchestrator for G2 (Conceptual Profile, standard depth).

---

*This intake document captures the complete scope and requirements for "The Anatomy of a Wave" visual essay. All subsequent gates reference this document as the source of truth for project scope.*
