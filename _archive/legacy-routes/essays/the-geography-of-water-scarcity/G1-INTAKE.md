# G1 Intake Document: The Geography of Water Scarcity

> **Date**: February 8, 2026  
> **Orchestrator**: Conceptual Essay Orchestrator (Data Journalism Mode)  
> **Status**: G1 — ✅ APPROVED

---

## Project Identification

| Field | Value |
|-------|-------|
| **Working Title** | The Geography of Water Scarcity |
| **Slug** | `the-geography-of-water-scarcity` |
| **Type** | Data Journalism Visual Essay |
| **Mode** | Data Journalism (Conceptual Essay Orchestrator) |
| **Source Prompt** | Water Scarcity Benchmark Prompt |

---

## Core Thesis

**Water scarcity is not a natural disaster — it is a geographic, political, and infrastructural reality shaped by human decisions, and its trajectory is accelerating in predictable, preventable ways.**

This thesis must be reinforced throughout every section. Every data visualization must serve this argument.

---

## Target Audience

| Attribute | Value |
|-----------|-------|
| **Level** | General reader (Atlantic / Aeon / Works in Progress level) |
| **Profile** | Intellectually curious adult, no domain expertise in hydrology or water policy |
| **Prior Knowledge** | Basic geography, awareness that water is finite |
| **Reading Level** | Accessible but intellectually rigorous — no dumbing down |

### Implicit Reader Question

> "Why are we running out of water when the Earth is 70% water?"

---

## Learning Objectives

After reading this essay, the reader should be able to:

1. **Recognize** that water stress is a global phenomenon that touches wealthy nations, not just the developing world
2. **Understand** the freshwater allocation system (agriculture 70%, industrial 19%, domestic 11%) and why agriculture dominates
3. **Explain** why similar rainfall can produce radically different water outcomes based on policy and infrastructure choices
4. **Describe** the scarcity equation: how population demand, agricultural draw, and climate reduction interact to create deficit
5. **Reframe** water scarcity from "natural fate" to "design problem with levers"

---

## Emotional Arc

| Phase | Emotion | Section | Mechanism |
|-------|---------|---------|-----------|
| 1. Opening | **Disorientation** | Data Ticker / Opening | A striking data point challenges assumption that scarcity is "over there" |
| 2. Expansion | **Scale** | Choropleth Map | Reader grasps global footprint — this touches every continent |
| 3. Mechanism | **Understanding** | Flow Diagram + Explainer | Reader learns WHY — agriculture, population, climate, policy |
| 4. Trajectory | **Urgency** | Choropleth time scrubber (2000→2040) | Time-series reveals this is getting measurably worse |
| 5. Agency | **Hope via comparison** | Country Comparison Widget | Policy choices produce different outcomes from similar conditions |
| 6. Close | **Reframing** | Concluding prose | Water scarcity is a design problem, not a fate |

---

## Scope Definition

### Includes

- Global water stress patterns (geographic distribution, trends 2000–2040)
- Freshwater allocation system (agriculture/industrial/domestic breakdown)
- The scarcity equation (supply − demand, with contributing factors)
- Policy comparison case studies (Israel/Jordan, Singapore/Malaysia, Australia/South Africa)
- Infrastructure investment as an outcome lever
- Climate change as an accelerating factor
- Human stories embedded in data (brief, illustrative, not exploitative)

### Excludes

- Ocean desalination as a comprehensive solution (acknowledge but don't overweight)
- Water chemistry or hydrological cycle science (not a science explainer)
- Country-by-country exhaustive analysis (use curated comparisons)
- Geopolitical water conflict narratives (acknowledge tension, don't center war)
- Specific policy recommendations (essay argues scarcity is a design problem — reader draws own conclusions about solutions)

---

## Tone & Style Constraints

### Required Tone

- **The Atlantic / Aeon**: Intellectually rigorous but never dry
- Narrative journalism — tell human stories, not textbook facts
- Calm authority — let data speak through visualization
- Non-sensationalist — urgency through precision, not fear

### Text Constraints

- Minimum 1,500 words of original prose
- Short-to-medium paragraphs (2-5 sentences)
- Pull quotes at key argumentative turns
- Minimum 6 inline citations (UN Water, WRI, WHO, FAO, World Bank, IPCC)
- Prose does what visuals cannot: context, human stories, "so what"
- Every section transition should feel inevitable

---

## Visual Requirements

### Primary Medium

**Programmatic Data Visualizations** — This is a data journalism essay where interactive visualizations do the argumentative work.

### Required Visualizations (5)

| # | Type | Title | Purpose |
|---|------|-------|---------|
| 1 | Interactive Choropleth Map | "Water Stress by Region" | Show global stress patterns with time scrubber (2000–2040) |
| 2 | Animated Proportional Flow Diagram | "Where Freshwater Goes" | Sankey showing agriculture/industrial/domestic allocation |
| 3 | Country Comparison Widget | "Same Rain, Different Outcomes" | Side-by-side policy outcome comparison |
| 4 | Scroll-Locked Explainer Sequence | "The Scarcity Equation" | Progressive diagram building the demand-supply gap |
| 5 | Reactive Data Ticker | Key Statistics Strip | Count-up animation for 4-6 headline statistics |

### Design System

| Element | Specification |
|---------|--------------|
| **Background** | Deep near-black (#0a0a0f) — content emerges from darkness |
| **Primary text** | Off-white (#e8e4e0), line-height 1.7–1.8, serif typeface |
| **Accent color** | Water-evocative blue-teal spectrum — data encoding + highlights |
| **Typography** | 4+ distinct levels: display headings, subheads, body, captions |
| **Content width** | ~720px prose, visuals break wider to full viewport |
| **Whitespace** | Generous vertical spacing between sections |
| **Interactions** | Subtle hover states, 200–300ms easing, no jarring animations |
| **Mobile** | Fully responsive, charts adapt/simplify, touch-friendly |

### Accessibility

- Perceptually uniform color scales (no rainbow)
- Colorblind-safe palette
- Reduced motion support
- Screen reader labels for all interactive elements
- Touch targets ≥44px

---

## Data Sources (Expected)

| Source | Data | Used In |
|--------|------|---------|
| WRI Aqueduct | Water stress index by country/region (2000–2040) | Choropleth Map |
| FAO AQUASTAT | Freshwater withdrawal by sector (agriculture/industrial/domestic) | Flow Diagram |
| UN Water / WHO-UNICEF JMP | Population in water-stressed areas | Data Ticker, prose |
| World Bank | Infrastructure investment, GDP, water recycling rates | Country Comparison |
| IPCC AR6 | Climate projections affecting water availability | Projections, time series |
| National water agencies | Country-specific metrics (Israel Water Authority, PUB Singapore, etc.) | Country Comparison |

---

## Research Requirements

Based on Conceptual Research Profile + Data Journalism Research Profile, G2 must produce:

### Standard Conceptual Deliverables

| Deliverable | Purpose |
|-------------|---------|
| `CONCEPTS.md` | Core concepts (water stress, freshwater allocation, scarcity equation, infrastructure impact) |
| `SEQUENCE.md` | Learning progression matching emotional arc |
| `DEFINITIONS.md` | Key terms (water stress index, water scarcity, freshwater, virtual water, etc.) |
| `ANALOGIES.md` | "Scarcity as design flaw" and other concrete comparisons |
| `MISCONCEPTIONS.md` | "Only affects dry/poor countries," "There isn't enough water," etc. |
| `CLAIMS.md` | Verified factual claims with Tier 1-2 sources |

### Data Journalism Extension Deliverables

| Deliverable | Purpose |
|-------------|---------|
| `DATASETS.md` | Curated datasets (WRI Aqueduct, FAO AQUASTAT, World Bank) with methodology and licensing |
| `STATISTICS.md` | Key statistics verified against Tier 1-2 sources (2.3B in stress, 70% agriculture, 40% gap by 2030) |
| `COMPARISONS.md` | Entity comparison data (Israel/Jordan, Singapore/Malaysia, Australia/South Africa) with normalization |
| `PROJECTIONS.md` | Future projections (2030/2040 demand-supply gap) with model sources and confidence intervals |

---

## Design Research Requirements

Based on the Diagram Design Profile (Pedagogical Lens), G4 must conduct full design research.

### G4 Research Activities (Required)

| Activity | Purpose |
|----------|---------|
| **Domain Visualization Survey** | How do Reuters Graphics, The Pudding, NYT Visuals treat water/geographic data? |
| **Data Visualization Best Practices** | Choropleth projection choices, Sankey proportional encoding, comparison widget design |
| **Color Research** | Blue-teal palette for water, perceptually uniform scales for choropleth |
| **Typography Research** | Editorial serif for prose, clear sans for data labels |
| **Animation Philosophy Development** | How should scroll-driven reveals serve comprehension? |

### G4 Deliverables (Required)

| Deliverable | Purpose |
|-------------|---------|
| Pedagogical Design Research Report | Design system with research-backed rationale |
| Data Visualization Specification | Projection, encoding, interaction specs for all 5 visualizations |
| Color Token CSS | Implementation-ready color system |
| Animation Sequences | Scroll-lock choreography for explainer sequence |

---

## Technical Architecture

| Constraint | Value |
|-----------|-------|
| **Format** | Single .jsx file, self-contained React component with default export |
| **Styling** | Tailwind CSS |
| **Allowed Libraries** | Recharts, D3, Lodash, Lucide React |
| **State Management** | React hooks (useState, useEffect, useRef, useCallback) |
| **Scroll Detection** | IntersectionObserver |
| **Animations** | GPU-accelerated (transform, opacity) |
| **Data** | Embedded (no external API calls) |
| **Accessibility** | WCAG 2.1 AA |

---

## Quality Gates Overview

| Gate | Name | Owner | Deliverable |
|------|------|-------|-------------|
| G1 | Intake Approval | Conceptual Essay Orchestrator | This document |
| G2 | Concept Research Complete | Concept Research Agent | research/ package (10 files) |
| G3 | Spec Approval | Conceptual Essay Orchestrator | specs/the-geography-of-water-scarcity.md |
| G4 | Design Research (Pedagogical) | Design Researcher | DESIGN-RESEARCH.md |
| G4.5 | Diagram + Data Viz Specification | Design Researcher + Data Viz Architect | SVG/chart blueprints |
| G5 | Content Complete | Production Orchestrator | Implementation |
| G5.5 | Bibliography Implementation | Bibliography Orchestrator | Sources section |
| G6 | Accuracy Audit | Accuracy Audit Agent | Certification |
| **G6.1** | **Data Integrity Audit** ★ | **Data Accuracy Auditor** | **Data-to-visual fidelity certification** |
| G6.5 | Pedagogy Audit | Pedagogy Audit Agent | Certification |
| G7 | Diagram Clarity Audit | Diagram Clarity Auditor | Certification |
| G7.5 | Scroll Certification | Scrolling Auditor | Certification |
| G8 | Publication Certification | Publish Artifact Orchestrator | GO/NO-GO |
| G9 | Publication Approval | Conceptual Essay Orchestrator | Sign-off |

★ = Data Journalism mode gate

---

## Estimated Scope

| Metric | Estimate |
|--------|----------|
| Read Time | 12-18 minutes |
| Sections | 6 (matching emotional arc) |
| Major Visualizations | 5 interactive |
| Word Count | 1,500-2,500 words |
| Code Lines | 1,500+ (single .jsx file) |
| Complexity | High (data viz + editorial prose + interaction design) |

---

## G1 Approval Checklist

- [x] Topic is viable for conceptual essay treatment
- [x] Core thesis is clear and argumentative
- [x] Target audience is well-defined
- [x] Learning objectives are specific and testable
- [x] Scope boundaries are clear (includes/excludes)
- [x] Emotional arc aligns with learning sequence
- [x] Visual requirements are specified (5 visualizations)
- [x] Data sources identified (WRI, FAO, UN, World Bank, IPCC)
- [x] Research requirements identified (10 deliverables)
- [x] Design research requirements identified
- [x] Technical architecture constraints specified
- [x] Data Journalism mode activated (thesis is data-supported argument)
- [x] User has approved scope

---

## Approval

**G1 Status**: ✅ APPROVED

**Next Step**: Invoke Concept Research Agent for G2 (with both Conceptual Research Profile and Data Journalism Research Profile).

---

*This intake document captures the complete scope and requirements for "The Geography of Water Scarcity" data journalism visual essay. All subsequent gates reference this document as the source of truth for project scope.*
