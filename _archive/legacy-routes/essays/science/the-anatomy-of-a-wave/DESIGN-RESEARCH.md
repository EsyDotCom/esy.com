# Design Research Report: The Anatomy of a Wave

> **Gate**: G4 Design Research
> **Date**: February 9, 2026
> **Essay**: The Anatomy of a Wave
> **Researcher**: Design Research Agent
> **Status**: ✅ APPROVED

---

## Design Philosophy

**"The design IS the subject."** Waves are motion, rhythm, and interference. The visual identity must be derived from wave phenomena themselves — not applied as decoration. Every color, motion, and spatial relationship should feel like it emerged from the physics.

The essay progresses from **concrete to abstract** (ocean → sound → light → quantum). The design system mirrors this progression: rich, material textures in early sections dissolve into clean, mathematical precision by the end.

---

## Color Palette

### Subject Derivation

The palette is extracted from the physical phenomena each section describes:

| Token | Hex | Subject Connection | CSS Variable |
|-------|-----|-------------------|--------------|
| **Ocean Deep** | `#0a1929` | The deep ocean floor — the origin of waves | `--wave-ocean-deep` |
| **Ocean Blue** | `#1a6fa0` | The mid-ocean, where waves propagate | `--wave-ocean-blue` |
| **Foam White** | `#e8f1f8` | Ocean foam — the visible crest of a wave | `--wave-foam` |
| **Sound Amber** | `#d4872c` | The warmth of sound — fire, vibration, pressure energy | `--wave-sound-amber` |
| **Sound Bronze** | `#a06620` | Deeper resonance — bass frequencies, warmth | `--wave-sound-bronze` |
| **Spectrum Violet** | `#7b2ff7` | The short-wavelength end of visible light | `--wave-spectrum-violet` |
| **Spectrum Red** | `#e53935` | The long-wavelength end of visible light | `--wave-spectrum-red` |
| **Quantum Violet** | `#6b3fa0` | The mystery of quantum mechanics — deep, uncertain | `--wave-quantum-violet` |
| **Interference Cyan** | `#00bcd4` | The bright precision of wave interference | `--wave-interference-cyan` |
| **Constructive Green** | `#2ecc71` | Constructive interference — energy addition | `--wave-constructive` |
| **Destructive Rose** | `#e74c3c` | Destructive interference — energy cancellation | `--wave-destructive` |
| **Node Still** | `#4a6274` | The zero-displacement points — stillness in motion | `--wave-node` |

### Background System

```css
/* Progressive abstraction in background colors */
--wave-bg-ocean: linear-gradient(180deg, #0a1929 0%, #102a43 100%);    /* Sec 1-2 */
--wave-bg-sound: linear-gradient(180deg, #1a1000 0%, #2d1a00 100%);    /* Sec 3 */
--wave-bg-light: linear-gradient(180deg, #0d0024 0%, #1a0042 100%);    /* Sec 4 */
--wave-bg-super: linear-gradient(180deg, #001a2c 0%, #00314a 100%);    /* Sec 5-6 */
--wave-bg-standing: linear-gradient(180deg, #0a1929 0%, #1a3a5c 100%); /* Sec 7 */
--wave-bg-quantum: linear-gradient(180deg, #1a0033 0%, #2d0057 100%);  /* Sec 8 */
--wave-bg-synthesis: linear-gradient(180deg, #0a1929 0%, #0d2137 100%);/* Sec 9 */
```

### Differentiation from Other Esy Essays

| Dimension | Inside a Black Hole | The Anatomy of a Wave |
|-----------|--------------------|-----------------------|
| Primary hue | Gold/amber (EHT ring) | Ocean blue → quantum violet (progression) |
| Background | Single dark theme throughout | Progressive background shifts per section |
| Accent | Teal (horizon), Danger red | Cyan (interference), Green/Rose (construct/destruct) |
| Mood | Ominous, mysterious | Curious, building, revelatory |
| Texture | Glow, shadow, void | Flow, ripple, oscillation |

✅ **No aesthetic collision with existing essays.**

---

## Typography

### Font Selections

| Role | Font | Rationale |
|------|------|-----------|
| **Headings** | System serif (`Georgia, 'Times New Roman', serif`) | Scientific authority — evokes textbook heritage without being stuffy. Georgia's generous x-height ensures readability on screens. |
| **Body** | System sans-serif (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`) | Clean, modern, accessible. The scientific content needs maximum legibility. |
| **Labels/Equations** | System monospace (`'SF Mono', 'Fira Code', 'Courier New', monospace`) | Precision — wavelength values, frequency labels, and equation components use mono to signal "this is a measurement." |
| **Section Numbers** | Thin weight sans-serif | Section numbers (01, 02…) in large, light-weight type — scientific document aesthetic. |

### Typographic Scale

```css
--wave-font-hero: clamp(2.5rem, 6vw, 4.5rem);      /* Hero title */
--wave-font-section: clamp(1.75rem, 4vw, 2.75rem);  /* Section headings */
--wave-font-subtitle: clamp(1.1rem, 2.5vw, 1.5rem); /* Section subtitles */
--wave-font-body: clamp(1rem, 1.1vw, 1.125rem);     /* Body text */
--wave-font-label: 0.75rem;                           /* Diagram labels */
--wave-font-caption: 0.8125rem;                       /* Figure captions */
```

---

## Animation Philosophy

### Core Principle

**Waves ARE motion.** A static wave diagram is a contradiction. Every visualization of a wave must move — or show evidence of having moved (trailing paths, frozen mid-oscillation with motion blur).

### Motion Language

| Motion Type | Meaning | Used For |
|-------------|---------|----------|
| **Sinusoidal oscillation** | The fundamental wave motion | Particle orbits, string vibrations, sound compressions |
| **Propagation (left-to-right)** | Energy transfer | Wave crests traveling, sound spreading |
| **Fade-in (opacity)** | Attention arrival | Section entry, labels appearing |
| **Scale pulse** | Resonance / emphasis | Amplitude annotations, constructive interference peaks |
| **Accumulation** | Building pattern | Double-slit particles, standing wave buildup |

### Easing Functions

```css
/* The wave function as the easing curve */
--wave-ease-sine: cubic-bezier(0.37, 0, 0.63, 1);    /* Sinusoidal — primary */
--wave-ease-enter: cubic-bezier(0.0, 0.0, 0.2, 1.0);  /* Material enter */
--wave-ease-exit: cubic-bezier(0.4, 0.0, 1.0, 1.0);   /* Material exit */
```

### Scroll-Triggered Behavior

- **Threshold**: `IntersectionObserver` with `threshold: 0.3` (30% visible to trigger)
- **Entry**: Elements animate in with `wave-ease-enter` over 600ms
- **Continuous animations**: Start when in view, pause when out of view (performance)
- **Reduced motion**: Show static frame at t=0, no continuous animation

---

## Visual Motifs

### Subject-Derived Decorative Elements

1. **Sine wave dividers**: Section separators are animated sine waves (not horizontal rules). The frequency increases subtly with each section — matching the content's progression from low-frequency ocean waves to high-frequency quantum phenomena.

2. **Circular particle ghosts**: In ocean sections (1-2), faint circular orbit traces appear as background decoration — ghost paths of water particles.

3. **Compression bands**: In the sound section (3), background uses subtle vertical density variation — areas of slight brightness (compression) and darkness (rarefaction).

4. **Spectrum bleed**: In the light section (4), section edges have a subtle prismatic gradient — white light entering, spectrum colors emerging.

5. **Node markers**: In the standing wave section (7), key structural elements (headings, callouts) are positioned at visual "nodes" — reinforcing the concept through layout.

---

## Interaction Design

### Interactive Visualizations (D4, D5, D7)

| Control | Design | Touch Target |
|---------|--------|-------------|
| **Frequency slider** | Horizontal slider with wave preview above it | 44px height, full width |
| **Amplitude slider** | Vertical slider alongside wave | 44px width, 200px height |
| **Phase slider** | Circular dial (optional, D4 only) | 56px diameter |
| **Source drag** (D5) | Touch-draggable point sources in ripple tank | 48px touch target |
| **Harmonic toggle** (D6) | Numbered buttons (1-5) | 44px × 44px each |

### States

```
Default → Hover (desktop) → Active (touch/click) → Animating
```

All interactive states must have visible focus indicators (keyboard accessibility).

---

## Visualization Style Guide

### D1: Ocean Wave Anatomy
- **Background**: `--wave-bg-ocean`
- **Water surface**: Gradient from `--wave-ocean-blue` (surface) to `--wave-ocean-deep` (floor)
- **Particle orbits**: `--wave-foam` with 40% opacity, animated circles
- **Labels**: `--wave-foam` mono text, leader lines

### D2: Sound Pressure
- **Background**: `--wave-bg-sound`
- **Particles**: Circles colored `--wave-sound-amber`, size varies with density
- **Pressure graph**: `--wave-sound-amber` stroke on `--wave-sound-bronze` axis

### D3: Light Spectrum
- **Background**: `--wave-bg-light`
- **Spectrum strip**: Real CSS gradient from `--wave-spectrum-violet` through ROYGBIV to `--wave-spectrum-red`
- **Labels**: White mono on dark background, positioned below spectrum

### D4: Superposition Playground
- **Background**: `--wave-bg-super`
- **Wave A**: `--wave-interference-cyan`
- **Wave B**: `--wave-sound-amber`
- **Combined wave**: White when constructive, `--wave-destructive` pulse when destructive
- **Sliders**: Themed to match their wave's color

### D5: Ripple Tank
- **Background**: `--wave-bg-super` (same as D4 — same conceptual domain)
- **Wavefronts**: Concentric rings with `--wave-interference-cyan` at 30% opacity
- **Constructive bands**: Bright `--wave-constructive` glow
- **Destructive bands**: Dark — near background

### D6: Standing Wave Builder
- **Background**: `--wave-bg-standing`
- **String**: `--wave-foam` stroke, animated displacement
- **Nodes**: `--wave-node` circles, fixed position
- **Antinodes**: `--wave-constructive` pulse animation at peaks
- **Harmonic number**: Large mono text, `--wave-ocean-blue`

### D7: Double-Slit Experiment
- **Background**: `--wave-bg-quantum`
- **Barrier with slits**: Dark gray with two narrow gaps
- **Individual particles**: Small dots in `--wave-quantum-violet`
- **Accumulated pattern**: Interference bands emerge — `--wave-quantum-violet` intensity maps to particle density
- **Counter**: Particle count in upper-right, mono text

---

## Responsiveness

### Mobile-First Layout

```
Mobile (< 768px):
├── Full-width visualizations (100vw for immersive feel)
├── Text max-width: 90% with auto margins
├── Sliders are horizontal, full-width
├── Stacked sections (no side-by-side)
└── Touch targets ≥ 44px

Tablet (768-1199px):
├── Visualizations: 90% width, centered
├── Text max-width: 680px
├── Some side-by-side layouts (text + small diagram)
└── Sliders can be horizontal or vertical

Desktop (≥ 1200px):
├── Max content width: 1100px
├── Visualizations: 900px max-width
├── Generous margins, comfortable reading rhythm
└── Interactive controls beside visualizations
```

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-09 | Initial design research — palette, typography, animation, motifs, interaction design, visualization style guide |
