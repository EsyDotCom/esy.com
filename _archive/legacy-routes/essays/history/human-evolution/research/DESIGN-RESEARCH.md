# Design Research: Human Evolution Visual Essay

> Compiled: December 2025
> Source: Independent external research (no existing essays referenced)
> Research Areas: Museum exhibitions, data visualization, deep time, accessibility, UI patterns

---

## EXECUTIVE SUMMARY

This design research synthesizes best practices from natural history museums, award-winning data journalism, accessibility standards, and innovative web interfaces to create a novel design system for visualizing 7 million years of human evolution.

### Key Design Principles Identified

1. **Tree-not-ladder visualization** - Use branching diagrams, not linear progressions
2. **Multi-scale deep time** - Logarithmic or nested timelines for comprehensibility
3. **No scroll-jacking** - Intersection Observer-based reveals, natural scroll control
4. **Progressive disclosure** - Layer complexity, reveal on demand
5. **Accessibility-first** - WCAG AA compliance, colorblind-safe palettes
6. **Mobile-first responsive** - Touch-friendly, stack-or-scrolly on small screens

---

## 1. MUSEUM EXHIBITION PATTERNS

### Smithsonian Human Origins

**Time Tunnel Entry:**
- Curved tunnel where visitors "travel back through time"
- Web adaptation: Scroll-triggered transition that visually shifts from present to deep past

**Interactive Timeline:**
- Correlates climate change with evolutionary milestones
- Computer interactives for examining skulls, comparing species

**Deep Time Hall:**
- Stories illustrated by chronologically ordered examples
- Coexisting species clustered together

### Natural History Museum London

**Reconstruction Labeling:**
- "Forensic paleoart" approach by Kennis brothers
- All reconstructions clearly labeled as interpretations
- Soft tissue features (skin, hair) acknowledged as "educated guesswork"

### AMNH Spitzer Hall

**Multi-Evidence Approach:**
- DNA evidence and fossil evidence on parallel angled walls
- Emphasizes converging lines of evidence
- Glass rotunda with evolutionary family tree featuring skull casts

### OneZoom Tree of Life

**Fractal Visualization:**
- 2.2 million species on single zoomable page
- Fractal geometry - same branching form repeats at different scales
- Google Maps-style zoom interface

---

## 2. DATA VISUALIZATION APPROACHES

### New York Times Graphics Principles

- **Simplicity over interactivity** - Many pieces are simple, static graphics
- **Annotation is critical** - Highlight relevant patterns, not just raw data
- **Mobile-first constraints** - Forces simpler, clearer design

### The Pudding Scrollytelling

**Sticky Graphic Pattern:**
- Main visualization remains fixed
- Narrative text scrolls alongside
- "Seamless, movie-like experience driven by reader's pace"

**Narrative Techniques:**
- Start with single data point, reveal full context
- Use scale as narrative tool

**Technical Implementation:**
- Scrollama library with IntersectionObserver
- No scroll hijacking - works with native scrolling

### National Geographic Paleoart

**Form Follows Function:**
- Reconstructions must show how creatures lived
- Collaborative process between artists and paleontologists
- Ponder geological period, climate, ecological niche

---

## 3. DEEP TIME VISUALIZATION

### Scale Representation Strategies

| Technique | Best For | Web Implementation |
|-----------|----------|-------------------|
| Logarithmic scale | Equal weight to distant and recent past | CSS transforms with variable spacing |
| Cosmic calendar | Making vast time relatable | Analogy text callouts |
| Nested timelines | Multiple resolutions | Zoomable sections or linked views |
| Physical metaphors | Embodied understanding | Interactive distance calculator |

### Recommended Hybrid Approach

1. **Overview level:** Compressed timeline showing 7 million years
2. **Era level:** Expanded sections for each major phase
3. **Specimen level:** Detailed cards for individual fossils/species
4. **Overlap visualization:** Horizontal bars showing species coexistence

### Deep Time Clock Analogy

If 7 million years = 12 hours:
- 1 second = 162 years
- 1 minute = 9,722 years
- 1 hour = 583,333 years
- Modern humans (200,000 years) = last 20.5 minutes
- Recorded history (5,000 years) = last 31 seconds

---

## 4. ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 AA Compliance

| Requirement | Specification | Implementation |
|-------------|---------------|----------------|
| Color contrast (text) | 4.5:1 minimum | Dark text on light, verified palette |
| Color contrast (graphics) | 3:1 minimum | Test all chart elements |
| Never color alone | Dual encoding required | Patterns + labels + color |
| Alt text | All images | Descriptive text alternatives |
| Long descriptions | Complex graphics | Adjacent text or data tables |
| Keyboard navigation | Full support | Tab, arrow keys, Escape |
| Focus indicators | Visible | High-contrast outlines |
| Touch targets | 44x44px minimum | Padded interactive elements |
| Reduced motion | `prefers-reduced-motion` | Honor user preference |

### Colorblind-Safe Palette

**Recommended: Okabe-Ito Palette (8 colors)**
- Most widely recommended for scientific visualization
- Blue is safest anchor color
- Avoid red-green combinations

**For Geological/Temporal Coding:**
- Use ICS/CGMW standard colors where applicable
- Add pattern overlays for accessibility
- Always include text labels

### Screen Reader Support

- SVG charts: Use `role="img"` with `<title>` and `<desc>`
- Provide data tables as alternatives to complex visualizations
- Timeline navigation: Announce current position ("Item 3 of 12")
- Use `aria-live` regions for dynamic updates

### Cognitive Accessibility

- Plain language summaries (Flesch-Kincaid Grade 7-9)
- Progressive disclosure for complex content
- Glossary with accessible tooltips
- Step-by-step breakdowns of processes

---

## 5. UI PATTERN LIBRARY

### Scroll Interactions (No Scroll-Lock)

**Intersection Observer Animations:**
```javascript
// Elements start with opacity: 0, slight transform offset
// When 10-25% visible, add class triggering CSS transition
// Animations under 250ms
// Always respect prefers-reduced-motion
```

**Benefits:**
- User maintains full scroll control
- Works on mobile and desktop
- Gracefully degrades without JavaScript
- Performance optimized

### Navigation Patterns

**Sticky Section Header:**
- Shows current chapter + progress indicator
- Updates as user scrolls between sections
- Clickable chapter names for jump navigation

**Hub-and-Spoke:**
- Central landing with interactive species/era visualization
- Spokes for detailed exploration in any order
- Clear return path to hub

### Evidence Cards

**Specimen Cards:**
- Primary image/illustration
- Title and date/era
- Brief description (2-3 sentences)
- "Learn more" expansion

**Quote Cards:**
- Distinct visual treatment (quotation marks, different background)
- Attribution clearly visible
- Source link accessible but not intrusive

### Comparison Interfaces

**Before/After Slider:**
- Two images overlaid with draggable divider
- Arrow keys adjust when focused
- Screen reader alternative describes difference

**Side-by-Side Table:**
- Sticky header row with specimen names
- Attribute rows (brain size, tools, dates)
- First column frozen on mobile horizontal scroll

### Progressive Disclosure

**Native `<details>/<summary>`:**
- Built-in keyboard support
- Screen reader announces state
- Works without JavaScript

**Accordion Best Practices:**
- `aria-expanded` on buttons
- `aria-controls` pointing to content
- Arrow keys navigate headers

### Glossary Integration

**Toggletips (Click-Activated):**
- Dotted underline signals interactive term
- Click reveals popup definition
- Click again or Escape dismisses
- Touch-friendly (unlike hover-only tooltips)

**Implementation:**
- Button element wraps term
- `aria-describedby` links to definition
- Focus returns to term when closed

### Citation Patterns

**Superscript with Preview:**
- Superscript numbers in text
- Hover/focus shows brief preview
- Click scrolls to full reference

**Collapsible References:**
- Section-end accordion
- Defaults to collapsed
- Full bibliography on expand

---

## 6. TECHNICAL IMPLEMENTATION NOTES

### Libraries Recommended

| Purpose | Library | Notes |
|---------|---------|-------|
| Scroll triggers | Scrollama | IntersectionObserver-based, no hijacking |
| Phylogenetic trees | phylotree.js / OneZoom | D3-based, zoomable |
| Timeline | vis.js Timeline | Zoomable, accessible |
| Comparison slider | img-comparison-slider | Accessible, touch-friendly |
| Animations | CSS scroll-driven | Native (Chrome/Firefox), polyfill available |

### Performance Guidelines

- Animate only `transform` and `opacity` (GPU-accelerated)
- Use `observer.unobserve()` after one-time animations
- Lazy-load images below fold
- Provide static fallbacks for complex interactives

### Mobile-First Approach

**Scrollytelling Options:**
1. **Keep it scrolly** - Preserve experience, reduce complexity
2. **Stack it** - Simpler vertical layout with static graphics

**Touch Considerations:**
- All hover effects have tap equivalents
- Single-pointer alternatives for complex gestures
- 44x44px minimum touch targets

---

## 7. VISUAL DESIGN DIRECTION

### Color Philosophy

**Earth Tone Foundation:**
- Deep browns, grays, sandy tones, ochres
- Evokes excavation sites and prehistoric landscapes
- Neutral backgrounds for specimens

**Recommended Base Palette:**
| Color | Hex | Use |
|-------|-----|-----|
| Bone | #E1D6C1 | Backgrounds |
| Sediment | #BFAF8A | Cards |
| Stone | #8C7B5B | Borders |
| Earth | #5B4B3A | Secondary text |
| Depth | #3A2A1D | Primary text |
| Accent | #2563EB | Links, CTAs |

### Typography

- Serif for body (evokes scholarly/natural history)
- Clear hierarchy with consistent sizing
- High contrast for readability
- Accessible typefaces (x-height, distinct letterforms)

### Imagery Guidelines

- All reconstructions labeled as such
- Prefer photographs of actual specimens
- Use diagrams for anatomical comparisons
- Avoid dramatized "caveman" imagery

---

## 8. DESIGN SYSTEM COMPONENTS

### Core Components

1. **TimelineViewer** - Multi-scale zoomable timeline
2. **SpeciesCard** - Fossil/species evidence display
3. **QuoteCard** - Researcher quotes with attribution
4. **ComparisonSlider** - Before/after image comparison
5. **GlossaryTerm** - Inline definition toggletip
6. **ChapterNav** - Sticky navigation with progress
7. **EvidenceGrid** - Responsive card grid
8. **CitationRef** - Superscript with preview
9. **ExpandSection** - Accordion/details disclosure
10. **MapTimeline** - Linked geographic/temporal view

### Layout Patterns

1. **Hero with Scale Context** - Opening with deep time framing
2. **Narrative with Sticky Graphic** - Scrollytelling sections
3. **Evidence Gallery** - Grid of specimen cards
4. **Comparison View** - Side-by-side or slider
5. **Timeline Scroll** - Horizontal bar visualization
6. **Hub Landing** - Non-linear navigation center

---

## SOURCES

### Museums & Exhibitions
- Smithsonian Human Origins Program (humanorigins.si.edu)
- David H. Koch Hall of Human Origins
- Natural History Museum London Human Evolution Gallery
- AMNH Hall of Human Origins
- OneZoom Tree of Life Explorer

### Data Visualization
- The Pudding scrollytelling methodology
- NYT Graphics design principles
- Information is Beautiful Awards 2024
- National Geographic paleoart process

### Deep Time
- ChronoZoom (UC Berkeley/Microsoft)
- DeepTime.info interactive
- USGS Geologic Time Scale
- Institute of Human Origins Timeline

### Accessibility
- W3C WCAG 2.1
- WebAIM keyboard accessibility
- W3C ARIA Authoring Practices
- Inclusive Components (Heydon Pickering)

### UI Patterns
- CSS-Tricks scroll animation tutorials
- Stripe documentation patterns
- Carbon Design System
- NN/g progressive disclosure research

---

*This design research informs the visual essay production without referencing any existing Esy essays.*
