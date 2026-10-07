# Scroll-Lock Implementation Research

> Research compiled: December 18, 2025
> Status: Comprehensive research complete

---

## Best-in-Class Examples

### 1. NYT - "Snow Fall: The Avalanche at Tunnel Creek"
**URL**: https://www.nytimes.com/projects/2012/snow-fall/

**Why It Works**:
- Pioneered "scrollytelling" format (2012), won 2013 Pulitzer
- 3.5 million page views in six days
- Seamless blend of text, video, animated graphics, audio

**Techniques**:
- Parallax with nested elements at different scroll rates
- Scroll-triggered animations (not scroll-jacked)
- Skiing path rendering driven by scroll position
- Used Remy Sharp's "inview" jQuery plugin

---

### 2. NYT - "The Coming California Megastorm"
**URL**: https://www.nytimes.com/interactive/2022/08/12/climate/california-mega-storm.html

**Why It Works**:
- Each paragraph paired with complementary visuals
- "Intense teamwork" between writers and visual journalists
- Animated satellite/radar imagery with audio testimony

**Techniques**:
- Multimedia parallax with animated satellite imagery
- Position-sensitive content based on scroll position
- Tight text-visual integration

---

### 3. The Pudding - "Colorism in High Fashion"
**URL**: https://pudding.cool/2020/10/vogue/

**Why It Works**:
- Takes readers through methodology before findings
- Single chart that transforms as you scroll
- Highly fluid reading experience

**Techniques**:
- Sticky graphic with transforming visualization
- Step-based scrollytelling using Scrollama.js
- Data-driven animations within single container

---

### 4. Bloomberg Graphics
**URL**: https://www.bloomberg.com/graphics

**Why It Works**:
- Smooth transitions between visualization states
- Scatter plots morph into bar charts
- Balances data density with narrative clarity

**Techniques**:
- Canvas rendering for large datasets (better than SVG)
- Svelte + D3 for smooth state transitions
- Scroll-triggered data visualization morphing

---

### 5. The Guardian - "NSA Files: Decoded"
**URL**: https://www.theguardian.com/world/interactive/2013/nov/01/snowden-nsa-files-surveillance-revelations-decoded

**Why It Works**:
- Interactive counter: "Since you began reading, NSA has selected X terabytes"
- Medium-agnostic: gifs, video, interactives blend seamlessly
- Story tells itself through visuals

**Techniques**:
- Real-time counters based on read time
- Mixed media integration
- Scroll-triggered content revelation

---

### 6. Washington Post - "Why Outbreaks Spread Exponentially"
**URL**: https://www.washingtonpost.com/graphics/2020/world/corona-simulator/

**Why It Works**:
- Most-read article in WaPo history
- Shared by President Obama (114M followers)
- Visualizes abstract concepts through simulation

**Techniques**:
- Interactive simulations run on scroll into view
- Particle-based animations showing spread
- Real-time parameter adjustment

---

### 7. Apple Product Pages
**URL**: https://www.apple.com/airpods-pro/

**Why It Works**:
- Products spin, fold, reveal features on scroll
- Frame-by-frame animation synchronized to scroll
- Premium feel matching brand

**Techniques**:
- Canvas-based image sequences
- `position: sticky` for keeping content in view
- `requestAnimationFrame()` for GPU-accelerated rendering
- ScrollMagic or custom scroll listeners

---

## Technical Implementation

### Recommended Stack

| Component | Primary | Alternative |
|-----------|---------|-------------|
| Scroll Engine | GSAP ScrollTrigger | Scrollama.js |
| Smooth Scroll | Lenis | Native CSS |
| Diagrams | SVG path animation | Lottie |
| Image Sequences | Canvas | Lottie scroll sync |
| Timeline | Native CSS scroll-driven | AOS Library |
| Maps | Mapbox Storytelling | D3 + TopoJSON |
| React | @gsap/react | react-scrollama |

---

### GSAP ScrollTrigger Best Practices

```javascript
// Basic scroll-triggered animation
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top center",
    end: "bottom center",
    scrub: 1, // 1-second catch-up delay
    pin: true,
    markers: false // remove in production
  },
  opacity: 1,
  y: 0
});
```

**Key Tips**:
1. Don't animate pinned elements directly - nest and animate children
2. Use numeric `scrub` values for smoother motion
3. Use CSS transforms over layout properties:
   - `width` → `transform: scaleX()`
   - `top` → `transform: translateY()`
4. Use Intersection Observer, not scroll event listeners
5. Clean up ScrollTriggers on component unmount

---

### Mobile Best Practices

**Critical Issues**:
- Smaller screens make scrolljacks longer/disorienting
- Poor connections cause delayed loading
- Users can't find exit points when confused

**Solutions**:
1. Avoid pure scrolljacking - use "piggybacking" instead
2. Keep navigation visible during scroll experiences
3. Provide skip options for locked sections
4. Test extensively on real devices

**Don't Use CSS `vh` Units**:
Mobile browsers toggle navigation bars, changing viewport height.

```javascript
// Calculate height in JavaScript instead
function resize() {
  const height = window.innerHeight;
  d3.selectAll('.step').style('height', `${height}px`);
}
```

---

### Accessibility Requirements

**Reduced Motion Support**:
```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0s !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
  }
}
```

**React Implementation**:
```javascript
import { useReducedMotion } from 'framer-motion';

function Component() {
  const prefersReducedMotion = useReducedMotion();
  // Conditionally apply animations
}
```

**Skip Buttons**:
- Provide visible "Skip to Content" links
- Don't hide with `display:none`
- Ensure keyboard focus follows activation

---

## Patterns for Semiconductor Story

### 1. Transistor Explanation (Technical Diagram Reveal)

**Approach**: SVG path drawing + step-based revelation

```javascript
// Get path length
const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

// Animate based on scroll progress
function updatePath(progress) {
  path.style.strokeDashoffset = pathLength * (1 - progress);
}
```

**Pattern**:
- Step 1: Draw base structure outline
- Step 2: Reveal gate, source, drain labels
- Step 3: Animate electron flow when "on"
- Step 4: Show depletion region when "off"
- Use sticky positioning to keep diagram visible

---

### 2. Manufacturing Process (Image Sequence)

**Approach**: Apple-style canvas sequence

```javascript
const frameCount = 147;
const images = [];
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `frame_${i.toString().padStart(4, '0')}.jpg`;
  images.push(img);
}

function updateImage(progress) {
  const frameIndex = Math.floor(progress * (frameCount - 1));
  context.drawImage(images[frameIndex], 0, 0);
}
```

**Pattern**:
1. Silicon wafer stage (rotating wafer view)
2. Lithography step (mask overlay animation)
3. Etching process (progressive removal)
4. Doping visualization (ion implantation particles)
5. Metal deposition (layer building)

---

### 3. Moore's Law Timeline

**Approach**: Native CSS scroll-driven animations

```css
.timeline-item {
  animation: fadeSlideIn 1s ease-out;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Pattern**:
- Central vertical line draws on scroll
- Nodes pulse/animate on viewport entry
- Side panels with images fade in
- Year markers with progressive reveal

---

### 4. Global Manufacturing Map

**Approach**: Mapbox Storytelling Template

```javascript
const config = {
  chapters: [
    {
      id: 'taiwan',
      title: 'TSMC Fabrication Plants',
      location: {
        center: [120.9605, 24.8138],
        zoom: 12,
        pitch: 45,
        bearing: -40
      },
      onChapterEnter: [
        { layer: 'fab-plants', opacity: 1 }
      ]
    }
  ]
};
```

**Pattern**:
1. Global view showing chip manufacturing locations
2. Zoom to Taiwan (TSMC dominance)
3. Animated supply chain routes
4. Zoom to specific fabs
5. Return to global view showing vulnerabilities

---

## Performance Checklist

- [ ] Use Intersection Observer, not scroll events
- [ ] Animate transforms only (not width/height/top/left)
- [ ] Disable animations when not in viewport
- [ ] Lazy-load heavy assets
- [ ] Test on real mobile devices (Safari iOS, Chrome Android)
- [ ] Provide reduced motion alternatives
- [ ] Include skip affordances for locked sections
- [ ] Clean up listeners/observers on unmount
- [ ] Use `will-change` sparingly
- [ ] Target 60fps in DevTools Performance panel

---

## Sources

- [Shorthand - Introduction to Scrollytelling](https://shorthand.com/the-craft/an-introduction-to-scrollytelling/index.html)
- [Pudding - How to Implement Scrollytelling](https://pudding.cool/process/how-to-implement-scrollytelling/)
- [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [CSS-Tricks - Apple Scrolling Animations](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/)
- [MDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [NN/g - Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- [Smashing Magazine - CSS Scroll-Driven Animations](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/)
- [Mapbox Storytelling Template](https://github.com/mapbox/storytelling)
