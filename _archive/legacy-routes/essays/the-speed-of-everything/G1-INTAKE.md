# G1 Intake Document: The Speed of Everything

> **Date**: February 9, 2026  
> **Orchestrator**: Visual Essay Orchestrator (Conceptual Essay Mode)  
> **Status**: G1 — ✅ APPROVED

---

## Project Identification

| Field | Value |
|-------|-------|
| **Working Title** | The Speed of Everything |
| **Slug** | `the-speed-of-everything` |
| **Type** | Conceptual Visual Essay |
| **Mode** | Conceptual Essay (Scientific / Scale Visualization) |
| **Source Prompt** | Pipeline test candidate #13 from visual-essay-ideas.md |

---

## Core Thesis

**Speed is the invisible scaffolding of the universe — from the imperceptible drift of continents at 2.5 cm/year to the absolute cosmic speed limit of light at 299,792,458 m/s, every phenomenon in nature operates at a characteristic velocity, and understanding these speeds across 16 orders of magnitude reveals the deep structure of physical reality.**

This thesis must be reinforced throughout every section. Every visualization must make the reader *feel* the scale gap between speeds.

---

## Target Audience

| Attribute | Value |
|-----------|-------|
| **Level** | General reader (Quanta / Aeon / Kurzgesagt level) |
| **Profile** | Intellectually curious adult, no physics or engineering background required |
| **Prior Knowledge** | Intuitive sense of everyday speeds (walking, driving), awareness that light is fast |
| **Reading Level** | Accessible but scientifically rigorous — precise numbers, no hand-waving |

### Implicit Reader Question

> "How fast is fast? And how does the speed of the things I know compare to the speed of things I can't see?"

---

## Learning Objectives

After reading this essay, the reader should be able to:

1. **Grasp** that speeds in nature span roughly 16 orders of magnitude, from tectonic plate drift (~10⁻⁹ m/s) to the speed of light (~10⁸ m/s)
2. **Understand** why logarithmic scales are necessary to visualize phenomena that span extreme ranges
3. **Recognize** that human-scale speeds (walking, running, driving) occupy a remarkably narrow band in the full speed spectrum
4. **Explain** why the speed of light is not just "very fast" but a fundamental physical constant that shapes spacetime
5. **Appreciate** the characteristic speeds of key phenomena: continental drift, hair growth, sound, bullets, Earth's orbit, electrical signals, and light
6. **Reframe** speed from a single dimension into a cross-domain organizing principle that connects geology, biology, engineering, and fundamental physics

---

## Scope Definition

### In Scope

| Area | Details |
|------|---------|
| **Geological speeds** | Continental drift, erosion, glacier flow |
| **Biological speeds** | Hair/nail growth, nerve impulses, blood flow, animal locomotion |
| **Human-engineered speeds** | Walking, cycling, cars, trains, bullets, aircraft, rockets |
| **Atmospheric/oceanic** | Wind, ocean currents, sound |
| **Planetary/orbital** | Earth's rotation, orbital velocity, solar system motion |
| **Electromagnetic** | Electrical signals, radio waves, light |
| **Relativistic context** | Why c is the speed limit, time dilation (conceptual only) |
| **Logarithmic visualization** | The core visual metaphor — a single logarithmic axis spanning all speeds |

### Out of Scope

| Area | Reason |
|------|--------|
| Quantum speeds / phase velocity | Too abstract for general audience; risks confusion with group velocity |
| Detailed relativistic math | E=mc² derivations would break narrative flow |
| Speed records / Guinness trivia | Trivia undermines the scientific framing |
| Particle physics speeds (LHC protons) | Interesting but not essential to the conceptual arc |
| Speed of dark / speed of gravity (advanced) | Fascinating but would require its own essay |

---

## Emotional Arc

| Phase | Section | Emotion | Speed Range |
|-------|---------|---------|-------------|
| 1. **Anchor** | Speeds you know | Familiarity, comfort | 1–100 m/s |
| 2. **Slow down** | The imperceptibly slow | Wonder, surprise | 10⁻⁹–10⁻³ m/s |
| 3. **Speed up** | The engineered fast | Excitement, human ingenuity | 10²–10⁴ m/s |
| 4. **Go cosmic** | Planetary and orbital | Awe, scale vertigo | 10⁴–10⁵ m/s |
| 5. **Hit the wall** | The speed of light | Reverence, finality | 3×10⁸ m/s |
| 6. **Zoom out** | The logarithmic view | Integration, perspective | All at once |

---

## Key Visualizations (5–7 Interactive)

| # | Visualization | Type | Purpose |
|---|---------------|------|---------|
| 1 | **The Familiar Scale** | Animated comparison | Anchor: walking → car → plane side-by-side race |
| 2 | **The Logarithmic Ruler** | Interactive log-scale axis | Core metaphor: place any speed on a 16-order-of-magnitude ruler; user can scroll/zoom |
| 3 | **The Slow Parade** | Animated bar race | Geological/biological speeds shown at exaggerated time-lapse |
| 4 | **Sound vs. Light** | Distance-over-time animation | Classic lightning/thunder gap, scaled to planetary distances |
| 5 | **The Cosmic Speedometer** | Radial/gauge visualization | Earth's stacked velocities: rotation + orbit + solar system + galaxy |
| 6 | **Time Dilation Preview** | Interactive slider | As you approach c, clocks slow — simple conceptual demo |
| 7 | **The Full Spectrum** | Scroll-locked logarithmic infographic | Final payoff: every speed mentioned, placed on one unified log scale |

---

## Research Requirements

### Conceptual Research Profile (Primary)

| Deliverable | Target |
|-------------|--------|
| **CLAIMS.md** | 15–20 verified speed claims with precise values and units |
| **CONCEPTS.md** | Key concepts: logarithmic scale, orders of magnitude, speed of light as constant, relative motion |
| **SEQUENCE.md** | Pedagogical sequence from familiar → extreme |
| **DEFINITIONS.md** | Precise definitions: velocity vs speed, m/s conversions, c, Mach numbers |
| **ANALOGIES.md** | Scale analogies (e.g., "if continental drift were walking speed, light would be...") |
| **MISCONCEPTIONS.md** | Common misconceptions: "nothing is faster than light" (expansion of space), "speed of sound is fixed" (medium-dependent) |
| **STATISTICS.md** | Key statistics with verified sources |
| **CITATIONS.md** | 8+ authoritative sources (textbooks, NASA, USGS, peer-reviewed) |

### Data Requirements

| Dataset | Source | Purpose |
|---------|--------|---------|
| Speed values for ~20 phenomena | Physics textbooks, NIST, NASA | Core data for all visualizations |
| Continental drift rates | USGS, geological surveys | Geological speed anchor |
| Speed of sound in various media | Physics references | Sound section |
| Orbital velocities | NASA/JPL | Cosmic section |
| Speed of light history | Historical physics papers | Light section context |

---

## Technical Architecture

| Aspect | Specification |
|--------|---------------|
| **Framework** | Next.js (App Router) |
| **Component** | Single client component (SpeedOfEverythingClient.tsx) |
| **CSS** | Single CSS file (the-speed-of-everything.css) |
| **State Management** | React hooks (useState, useEffect, useRef, useCallback) |
| **Scroll Detection** | IntersectionObserver |
| **Animations** | GPU-accelerated (transform, opacity); requestAnimationFrame for continuous animations |
| **Data** | Embedded constants (no external API calls) |
| **Accessibility** | WCAG 2.1 AA |
| **Log Scale Rendering** | CSS/JS computed positions on logarithmic axis |

---

## Quality Gates Overview

| Gate | Name | Owner | Deliverable |
|------|------|-------|-------------|
| G1 | Intake Approval | Visual Essay Orchestrator | This document |
| G2 | Research Complete | Research Orchestrator | research/ package |
| G3 | Spec Approval | Visual Essay Orchestrator | 6-layer specification |
| G4 | Design Research | Design Researcher | DESIGN-RESEARCH.md |
| G4.1 | Design Research Reconciliation | Reconciliation Agent | Thematic verification |
| G4.5 | Image Sourcing | Image Sourcing Agent | Image audit/migration |
| G5 | Content Complete | Production Agent | page.tsx + CSS |
| G5.2 | Design Fidelity Audit | Design Fidelity Auditor | Integration check |
| G5.3 | Diagram-Code Reconciliation | Reconciliation Agent | SVG/diagram verification |
| G5.5 | Bibliography Implementation | Bibliography Agent | Sources section |
| G6 | Citation Audit | Citation Auditor | Certification |
| G7 | Scroll Certification | Scroll Auditor | Certification |
| G8 | Publication Certification | Publication Agent | GO/NO-GO |
| G9 | Publication Approval | Visual Essay Orchestrator | Sign-off |

---

## Estimated Scope

| Metric | Estimate |
|--------|----------|
| Read Time | 10–15 minutes |
| Sections | 6 (matching emotional arc) |
| Major Visualizations | 5–7 interactive |
| Word Count | 1,200–2,000 words |
| Code Lines | 1,500+ (single client component) |
| Complexity | High (logarithmic scale viz + multi-domain data + animation) |

---

## G1 Approval Checklist

- [x] Topic is viable for conceptual visual essay treatment
- [x] Core thesis is clear and argumentative
- [x] Target audience is well-defined
- [x] Learning objectives are specific and testable
- [x] Scope boundaries are clear (includes/excludes)
- [x] Emotional arc aligns with learning sequence
- [x] Visual requirements are specified (5–7 visualizations)
- [x] Data sources identified (NIST, NASA, USGS, physics textbooks)
- [x] Research requirements identified (8 deliverables)
- [x] Design research requirements identified
- [x] Technical architecture constraints specified
- [x] Logarithmic scale is the core visual metaphor — verified as achievable in CSS/JS

---

## Approval

**G1 Status**: ✅ APPROVED

**Next Step**: Invoke Research Orchestrator for G2 (Conceptual Research Profile with emphasis on verified speed data and scale analogies).

---

*This intake document captures the complete scope and requirements for "The Speed of Everything" conceptual visual essay. All subsequent gates reference this document as the source of truth for project scope.*
