# Design Research Report: Rwanda Genocide Visual Essay

## "Kwibuka: A Hundred Days of Darkness, A Generation of Light"

---

## Visual Archaeology Findings

### Primary Materials & Cultural Elements
- **Traditional Rwandan textiles**: Imigongo (cow dung art), geometric patterns
- **The Hills**: Rwanda's iconic thousand hills (*le pays des mille collines*)
- **Memorial flames**: The eternal Kwibuka flame at Kigali Genocide Memorial
- **Identity cards**: The colonial-era ethnic ID cards (instruments of death)
- **Machetes**: The weapon of genocide (500,000 imported)
- **Church architecture**: Red brick Catholic churches (sites of massacre and sanctuary)
- **Mass graves**: The bone repositories at memorial sites
- **Gacaca courts**: Community justice under trees

### Historical Color Associations
- **Pre-colonial**: Warm earth tones, vibrant greens of the hills
- **Colonial era**: Sepia, cold administrative blues, document yellows
- **Genocide period**: Stark black and white, blood red, ash grey
- **Aftermath**: Muted, desaturated, grey-brown
- **Reconciliation**: Gradual return of color—hope blues, healing greens
- **Modern Rwanda**: Clear sky blues, lush greens, progress gold

### Recurring Visual Motifs
- **The flame**: Memorial flames, Kwibuka candles
- **Hills**: The iconic terraced landscape
- **Identity cards**: Colonial classification documents
- **Machetes**: The ubiquitous weapon
- **Churches**: Both massacre sites and places of remembrance
- **Numbers**: 100 days, 1,000,000 victims, 10,000 per day
- **The gacaca circle**: Community seated in judgment

### Era-Specific Aesthetics
- **Pre-1897**: African kingdoms, royal regalia, warm tones
- **Colonial (1897-1962)**: European administrative photography, cold blacks/whites
- **Independence (1962-1993)**: Propaganda colors, false brightness
- **Genocide (1994)**: No color—stark B&W only, maximum contrast
- **Aftermath (1994-1996)**: Ash grey, desaturated
- **Modern (2000+)**: Full color returns, contemporary photography

---

## Proposed Color Palette

### Primary Colors
```css
--color-void-black: #0D0D0D;        /* Deep black - weight of genocide */
--color-elevated-black: #1A1A1A;     /* Elevated surfaces */
--color-memorial-gold: #B8860B;      /* Kwibuka flame, remembrance */
--color-hope-green: #228B22;         /* Rwanda's hills, rebirth */
```

### Secondary Colors
```css
--color-ash-grey: #696969;           /* Aftermath, exhaustion */
--color-blood-red: #8B0000;          /* Violence, warning - SPARINGLY */
--color-colonial-sepia: #704214;     /* Colonial era documentation */
--color-reconciliation-blue: #4169E1; /* Justice, future */
```

### Text Colors
```css
--color-text-primary: rgba(255, 255, 255, 0.92);
--color-text-secondary: rgba(255, 255, 255, 0.65);
--color-text-muted: rgba(255, 255, 255, 0.45);
```

### Semantic Colors
```css
--color-chapter-marker: #DAA520;     /* Golden chapter indicators */
--color-timeline-line: rgba(184, 134, 11, 0.4);
--color-quote-accent: #B8860B;
--color-data-positive: #228B22;      /* Growth, progress */
--color-data-negative: #8B0000;      /* Decline, violence */
```

### Color Derivation Justification
- **Memorial Gold (#B8860B)**: Derived from the eternal flame at Kigali Genocide Memorial—the Kwibuka flame that burns for the victims
- **Hope Green (#228B22)**: The lush green of Rwanda's thousand hills—the landscape that witnessed horror and now witnesses rebirth
- **Blood Red (#8B0000)**: Used only for content warnings and sparingly for violence indicators—never decoratively
- **Ash Grey (#696969)**: The color of aftermath, mass graves, the grey exhaustion of survival
- **Void Black (#0D0D0D)**: The weight of genocide, the darkness of the hundred days

---

## Typography Stack

### Display/Headlines
**Font**: Playfair Display, 700 weight
**Justification**: Solemn, classical serif that conveys gravitas appropriate to genocide remembrance. Used for The New York Times and other serious publications. Not flashy—dignified.

### Body Text
**Font**: Source Serif Pro, 400/600 weight
**Justification**: Highly readable serif designed for long-form reading. The story demands sustained attention; typography must support, not fatigue. Clean, modern interpretation of classical forms.

### Quotes & Testimony
**Font**: Crimson Pro, italic
**Justification**: Personal, intimate quality appropriate for survivor testimony and historical quotes. Softer than headlines, more human. Distinguished from body text to signal primary sources.

### Data & Statistics
**Font**: IBM Plex Mono, 400 weight
**Justification**: The monospace font evokes documentation, bureaucracy—the systematic nature of genocide. Numbers typed on IBM machines processed the victims. The font carries historical weight.

### Captions & Dates
**Font**: Source Sans Pro, 300 weight, letter-spaced
**Justification**: Clean sans-serif for factual, documentary information. Does not compete with narrative text. Professional, archival feel.

### Kinyarwanda Terms
**Style**: Body font, italic, with translation in parentheses
**Justification**: Honors the Rwandan language; genocide is called by its Rwandan commemoration name (Kwibuka). Italics distinguish foreign terms while keeping them integrated in narrative flow.

---

## Animation Philosophy

### Overall Tempo: **Slow to Medium**
**Justification**: This is genocide remembrance, not entertainment. Animations must be solemn, deliberate, never bouncy or playful. The pacing honors the weight of the subject matter. Users should feel they are in a memorial, not a theme park.

### Reveal Style: **Fade with Subtle Rise**
- Elements fade in with slight upward movement (20-40px)
- Transition duration: 600-800ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` — smooth, never bouncy
- **NO bounce, NO overshoot, NO spring effects**

### Parallax Intensity: **Subtle**
- Background: 0.3x scroll speed
- Midground: 0.6x scroll speed
- Foreground: 1.0x scroll speed
- Overlay (text): 1.2x scroll speed
- Ambient (flames): 1.5x scroll speed

### Scroll-Lock Behavior
- Lock zones: 800-1200px depth
- Percentage-based choreography (following spec)
- Always provide skip affordance (bottom-right)
- Smooth easing on lock/unlock transitions

### Special Effects
- **Memorial flame flicker**: Subtle CSS animation on progress indicator
- **Name scroll**: Continuous scroll of victim names (never fast enough to read them all)
- **Era transitions**: Color grading shifts as user moves through timeline
- **The Silence**: 3-second enforced pause on certain images—no scroll progress

### Color Transition Animation
```css
/* Era-based color treatment transitions */
.genocide-era {
  filter: grayscale(100%) contrast(1.2);
  transition: filter 1.2s ease-in-out;
}

.modern-era {
  filter: grayscale(0%) contrast(1);
  transition: filter 1.2s ease-in-out;
}
```

---

## Visual Motifs

### Decorative Elements
- **The Kwibuka Flame**: Progress indicator, section markers, chapter transitions
- **Terraced Hills Silhouette**: Background element, footer, transitions
- **Identity Card Shape**: Frames for colonial-era content
- **Gacaca Circle**: For reconciliation sections

### Section Transitions
- Sections fade in from void black
- Era transitions marked by color treatment shifts
- Flame icons ignite at chapter boundaries
- Hills silhouette appears at reconstruction chapters

### Progress Indicator Concept
**"The Memorial Flame"**
- Single flame at start, grows and multiplies as progress increases
- At chapter markers, additional flames ignite
- Final state: circle of flames around "Kwibuka"
- Subtle flicker animation responds to scroll velocity
- Position: Fixed left edge, vertical orientation

---

## Differentiation Check

### How This Differs from Other Esy Scrollytelling
- **Color palette**: Memorial gold and hope green—not used in any other Esy essay
- **Progress indicator**: Flame-based (not linear bar, not chain reaction, not timeline)
- **Era-based visual treatment**: Dynamic grayscale/color transitions driven by scroll
- **Enforced pauses**: "The Silence" mechanic for solemn moments
- **Name scroll**: Continuous scroll of victim names (unique interaction)
- **Gacaca sequence**: Interactive village-level justice narrative (unique to this subject)

### What Makes This Design Unmistakably "About Rwanda"
1. The Kwibuka flame is THE symbol of Rwandan genocide remembrance
2. The thousand hills silhouette is Rwanda's defining landscape
3. The colonial identity card frame is specific to Rwandan (and Burundian) history
4. The Gacaca court imagery is uniquely Rwandan justice
5. The color journey (vibrant → B&W → grey → color returning) mirrors Rwanda's actual arc
6. Kinyarwanda terminology integrated throughout

---

## Mobile-First Specifications

### Typography Scale (Mobile Base)
```css
--font-size-hero: 2.5rem;
--font-size-h1: 2rem;
--font-size-h2: 1.5rem;
--font-size-body: 18px;
--line-height-body: 1.7;
--max-width-text: 100%;
--padding-text: 1.25rem;
```

### Desktop Enhancement
```css
@media (min-width: 768px) {
  --font-size-hero: 4rem;
  --font-size-h1: 2.5rem;
  --font-size-h2: 1.75rem;
  --font-size-body: 20px;
  --max-width-text: 720px;
  --padding-text: 2rem;
}
```

### Touch Targets
- All interactive elements: minimum 48px
- Skip button: prominent, always accessible
- Chapter navigation: bottom-positioned for thumb reach

### Safe Areas
```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
min-height: 100dvh;
```

---

## Layout Pattern Plan

| Section | Content Type | Layout Pattern | Notes |
|---------|--------------|----------------|-------|
| Hero | Opening | full-bleed | Ntarama Church, dramatic |
| Ch 1 | Pre-colonial | timeline | Kingdoms, culture |
| Ch 2 | Colonial | sticky-scroll | ID card reveal |
| Ch 3 | Independence | split-screen | Exile, violence |
| Ch 4 | Arusha | quote-monument | Radio broadcasts |
| Ch 5 | Genocide | full-bleed + data | The 100 days |
| Ch 6 | International | comparison | UN failure |
| Ch 7 | Liberation | split-screen | RPF advance |
| Ch 8 | Exodus | horizontal-scroll | Refugee column |
| Ch 9 | Justice | sticky-scroll | Gacaca process |
| Ch 10 | Rising | data-viz | Transformation metrics |
| Memorial | Closing | full-bleed | Kwibuka flame |

**Layout Count**: full-bleed(3), timeline(1), sticky-scroll(2), split-screen(2), quote-monument(1), comparison(1), horizontal-scroll(1), data-viz(1)

**Consecutive Same**: ❌ None — ✅ APPROVED

---

## Ethical Design Guidelines

### Photography Selection
1. Never use images that degrade victims
2. Prioritize photographs that restore humanity
3. Include perpetrators facing justice, not celebrating violence
4. Document international failure explicitly
5. End with transformation—not to minimize, but to complete the arc

### Animation Restraint
- No flashy effects during genocide sections
- No bounce or spring animations anywhere
- Solemn transitions throughout
- Horror speaks for itself—design does not embellish

### Content Warnings
- Entry warning: Cannot be bypassed
- Chapter-specific warnings: Chapter 5, Chapter 8
- Crisis resources in footer

---

## Design Research Sign-Off

**Researcher**: Production Orchestrator (Design Research Phase)
**Date**: December 2024
**Subject**: Rwanda Genocide - Kwibuka Visual Essay

**Verification**:
- [x] Color palette derived from subject matter (memorial flame, hills, colonial documents)
- [x] Typography justified by era and gravitas requirements
- [x] Animation philosophy matches solemn nature of subject
- [x] No overlap with previous Esy visual essay designs
- [x] Mobile-first specifications complete
- [x] Layout diversity verified (8+ unique patterns)
- [x] Ethical guidelines documented

**Status**: APPROVED FOR IMPLEMENTATION

---

*This design research ensures the Rwanda Genocide visual essay has a unique visual identity derived entirely from the subject matter itself—the Kwibuka flame, the thousand hills, the colonial documents, and the journey from darkness to reconstruction. No elements are borrowed from previous Esy essays.*

