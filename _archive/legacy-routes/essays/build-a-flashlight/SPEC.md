# Build a Flashlight: Programmatic Process Essay Specification

> **Format**: Programmatic Process Essay (12-Section)
> **Status**: [DRAFT]
> **Created**: December 2025
> **Architect**: Interactive Experience Architect

---

## 1. Concept

An LED flashlight is one of the simplest complete electronic devices: a power source, a switch, a current-limiting resistor, and a light-emitting diode. In this programmatic process essay, readers will assemble a working flashlight through 10 interactive steps, making choices about LED color, battery configuration, resistor value, reflector type, and switch placement. By the end, they'll have a personalized digital flashlight and understand how component choices create engineering tradeoffs. Their configuration will determine three key metrics—brightness, battery life, and efficiency—demonstrating that you can't maximize everything. The final artifact card reveals the consequences of their decisions: a bright but short-lived torch, a dim but marathon runner, or a balanced everyday light.

---

## 2. Learning Objectives

After completing this essay, the reader will be able to:

1. **Explain** why an LED needs a resistor to limit current and what happens without one
2. **Calculate** the approximate resistor value needed for a target LED current using Ohm's Law
3. **Predict** whether a given battery can drive a given LED based on voltage requirements
4. **Compare** the tradeoffs between brightness and battery life when changing resistor values
5. **Identify** why efficiency decreases when battery voltage far exceeds LED forward voltage
6. **Justify** their component choices by articulating the tradeoffs they accepted
7. **Trace** the path of current through a simple series circuit
8. **Diagnose** why a flashlight might not work (voltage mismatch, open circuit)
9. **Select** appropriate components for a given use case (compact keychain vs. long-runtime emergency light)
10. **Recognize** that reflectors redistribute light rather than create it

---

## 3. Storyboard Outline

### Step 1: Meet the Components

**Narrative**: Every flashlight, from a child's toy to a firefighter's tool, contains the same four essential parts. We're going to build one from scratch, and every choice you make will shape how it performs.

**Interaction**: None (introduction)

**State Modified**: 
- `state.progress.currentStep` ← 1
- `state.progress.startedAt` ← Date.now()

**Visualization Shows**:
- Four components floating in space: battery, switch, resistor, LED
- Each labeled with name and role
- Gentle idle animation (slight float/pulse)

**"Notice This"**: A flashlight is just four parts—but choosing the right four parts is everything.

---

### Step 2: Choose Your Light (LED Selection)

**Narrative**: Light-emitting diodes come in many colors, and color isn't just about aesthetics—it determines how much voltage the LED needs to light up. Red LEDs are easy to power; white and blue demand more.

**Interaction**: 
- Type: Part Selection (radio buttons or clickable cards)
- Options: Red, Yellow, Green, Blue, White
- Preview: LED glows in selected color, specs appear

**State Modified**:
- `state.config.led.color` ← selected color
- `state.config.led.forwardVoltage` ← LED_SPECS[color].forwardVoltage
- `state.parts.led.selected` ← true

**Visualization**:
- LED component highlights
- Color preview in the LED
- Forward voltage displayed: "Needs at least X.XV"

**"Notice This"**: White and blue LEDs need ~3.2V. A single AA battery only provides 1.5V. Already, your color choice constrains your battery options.

**Fallback**: Static image showing all five LED colors with voltage requirements table.

---

### Step 3: Power Source (Battery Selection)

**Narrative**: Batteries provide the push that moves electrons through your circuit. More cells in series means higher voltage—but also more bulk. Your LED needs enough voltage to light up, with some left over for the resistor.

**Interaction**:
- Type: Part Selection (clickable cards)
- Options: 1×AA, 2×AA, 3×AA, CR2032, 9V
- Constraint: Warn if voltage < LED forward voltage
- Preview: Battery size comparison, voltage display

**State Modified**:
- `state.config.battery.type` ← selected type
- `state.config.battery.voltage` ← BATTERY_SPECS[type].voltage
- `state.config.battery.capacity` ← BATTERY_SPECS[type].capacity
- `state.parts.battery.selected` ← true

**Visualization**:
- Battery component highlights
- Size comparison visualization
- Voltage meter showing source voltage vs. LED requirement
- Warning indicator if voltage insufficient

**"Notice This"**: If your battery voltage is less than your LED's forward voltage, nothing will happen. The circuit won't work—not even dimly. It's a hard cutoff.

**Fallback**: Static compatibility matrix showing which batteries work with which LEDs.

---

### Step 4: The Sacrifice (Resistor Tuning)

**Narrative**: Here's the secret of the resistor: it exists to throw away energy. Your battery provides more voltage than your LED needs—the excess would destroy the LED as a surge of current. The resistor absorbs that excess as heat, converting "too much" into "just right."

**Interaction**:
- Type: Parameter Tuning (slider)
- Range: 47Ω to 1kΩ (logarithmic feel, discrete E12 values)
- Live feedback: Current (mA), brightness preview, estimated runtime
- Constraint: Warn if current > 30mA (LED max)

**State Modified**:
- `state.config.resistor.value` ← selected value
- `state.metrics.current` ← computed
- `state.metrics.brightness` ← computed
- `state.metrics.batteryLife` ← computed
- `state.parts.resistor.selected` ← true

**Visualization**:
- Resistor value display with color bands
- Live brightness preview (LED intensity changes)
- Dual bar chart: Brightness vs. Battery Life
- Heat indicator on resistor (more heat = more waste)

**"Notice This"**: Watch what happens as you slide: lower resistance means more current, which means brighter light—but the battery drains faster. This is the core tradeoff of flashlight design.

**Fallback**: Static diagram showing three resistor values and their resulting brightness/runtime.

---

### Step 5: The Tradeoff Explorer

**Narrative**: Let's visualize exactly what's happening. Every watt from your battery goes somewhere: either to useful light or to waste heat. The gap between your battery voltage and LED voltage determines how much you're losing.

**Interaction**:
- Type: Tradeoff Explorer (2D visualization)
- X-axis: Current (controlled by resistor)
- Y-axis: Efficiency (%)
- Display: Power split diagram (light vs. heat)

**State Modified**:
- `state.metrics.efficiency` ← computed
- `state.metrics.heat` ← computed

**Visualization**:
- Sankey diagram: Power in → Light out + Heat out
- Efficiency percentage prominently displayed
- Comparison: "X% of your battery's energy becomes light"

**"Notice This"**: If your LED needs 2V and your battery provides 4.5V, only ~44% of the energy becomes light. The rest heats your resistor. This is why voltage matching matters.

**Fallback**: Static power flow diagram with three example configurations.

---

### Step 6: Shaping the Beam (Reflector Selection)

**Narrative**: Your LED makes light, but without help, it sprays in all directions. A reflector catches that scattered light and redirects it forward. Different reflector shapes create different beam patterns—from a tight spotlight to a wide flood.

**Interaction**:
- Type: Part Selection (clickable cards with preview)
- Options: None, Textured, Orange Peel, Smooth, TIR Optic
- Preview: Beam pattern visualization

**State Modified**:
- `state.config.reflector.type` ← selected type
- `state.config.reflector.beamAngle` ← REFLECTOR_SPECS[type].beamAngle
- `state.metrics.beamIntensity` ← computed
- `state.parts.reflector.selected` ← true

**Visualization**:
- Beam cone projection showing angle
- Intensity heat map (tighter = brighter center)
- Same total lumens, different distribution

**"Notice This"**: The reflector doesn't create more light—it focuses what's already there. A spot beam seems brighter because the same lumens hit a smaller area.

**Fallback**: Static beam pattern comparison diagram.

---

### Step 7: Control (Switch Selection)

**Narrative**: A switch is simple: it either completes the circuit or breaks it. But where you place it and how it operates affects usability. Tail switches allow one-handed operation; side switches are compact; twist-heads have no external moving parts.

**Interaction**:
- Type: Part Selection (clickable cards)
- Options: Side slide, Tail push, Momentary tail, Twist head
- Preview: Flashlight form factor changes

**State Modified**:
- `state.config.switch.type` ← selected type
- `state.config.switch.position` ← SWITCH_SPECS[type].position
- `state.parts.switch.selected` ← true

**Visualization**:
- Flashlight silhouette updates with switch position
- Animation showing switch operation

**"Notice This"**: The switch is the only moving part in most flashlights. Its placement determines how you hold and operate your light.

**Fallback**: Static diagram of four switch positions.

---

### Step 8: Assembly

**Narrative**: All your components are chosen. Now, let's put them together. In a real circuit, current flows from the battery's positive terminal, through the switch, through the resistor, through the LED, and back to the battery's negative terminal.

**Interaction**:
- Type: Exploded View Assembly (drag-and-drop)
- Action: Drag each component into position
- Validation: Components snap to correct positions
- Sequence: Battery → Switch → Resistor → LED → Complete

**State Modified**:
- `state.connections` ← updated as each part placed
- `state.progress.completedSteps` ← [..., "assembly"]

**Visualization**:
- Exploded view → Assembled view animation
- Current path highlighted as circuit completes
- "Circuit complete!" confirmation when all placed

**"Notice This"**: The order matters for understanding: current flows in a loop. The resistor must be between the battery and LED to limit current.

**Fallback**: Animated GIF of assembly sequence.

---

### Step 9: Test & Diagnose

**Narrative**: Let's turn it on. If everything is configured correctly, your LED will light. If not, we'll figure out why.

**Interaction**:
- Type: Diagnostic Mode (click to test)
- Action: "Turn on" button
- Outcome: LED lights (success) or stays dark (diagnose)
- If failure: Guided troubleshooting reveals the issue

**State Modified**:
- `state.config.tested` ← true
- `state.metrics.working` ← computed (boolean)

**Visualization**:
- LED lights up (or doesn't)
- If working: Brightness shown, metrics displayed
- If not working: Diagnostic overlay
  - "Voltage too low" (Vsource < Vled)
  - "Circuit incomplete" (missing connection)

**"Notice This"**: Debugging is part of engineering. When something doesn't work, the answer is in the physics—usually a voltage mismatch.

**Fallback**: Static success/failure outcome images with explanation.

---

### Step 10: Your Flashlight (Artifact Card)

**Narrative**: You built a flashlight. Not just any flashlight—your flashlight, shaped by your choices. Here's what you made.

**Interaction**:
- Type: Completion (read-only summary)
- Actions: Save/share configuration, reset to start over

**State Modified**:
- `state.progress.completedSteps` ← [..., "complete"]
- `state.progress.completedAt` ← Date.now()

**Visualization**:
- Final flashlight render (full assembly)
- Artifact Card with:
  - Configuration summary (LED color, battery, resistor, reflector, switch)
  - Metrics: Brightness (X/100), Battery Life (X hours), Efficiency (X%)
  - Overall Score (0-100)
  - Comparison to reference configurations
  - "What you optimized for" label (brightness/runtime/balance)

**"Notice This"**: Every engineering project is a series of tradeoffs. You can't maximize everything—but you chose what mattered most to you.

**Fallback**: Static artifact card template with "example" values.

---

## 4. Scene Templates

### Template 1: Part Selection

**Description**: Reader chooses one option from a set of mutually exclusive parts.

**Inputs**:
- `options`: Array of `{ id, name, specs, preview }` objects
- `currentSelection`: Currently selected option ID (or null)
- `constraints`: Validation rules (e.g., "requires voltage > X")

**Output Visuals**:
- Grid or list of selectable cards
- Selected card highlighted
- Preview panel showing specs of hovered/selected option
- Warning badge if constraints violated

**State Changes**:
- `state.config[partType]` ← selected option
- `state.parts[partType].selected` ← true

**Failure/Fallback**:
- Static comparison table of all options
- Text indicating "interactive selection unavailable"

**Best Used For**:
- LED color selection
- Battery selection
- Reflector selection
- Switch selection

---

### Template 2: Parameter Tuning

**Description**: Reader adjusts a continuous or discrete parameter using a slider.

**Inputs**:
- `min`, `max`: Parameter range
- `step`: Increment size (or array of discrete values)
- `currentValue`: Current parameter value
- `derivedMetrics`: Functions to compute dependent values
- `constraints`: Min/max warnings

**Output Visuals**:
- Slider with current value display
- Live-updating metric displays
- Visual indicator on the digital twin (e.g., LED brightness)
- Warning indicators at constraint boundaries

**State Changes**:
- `state.config[parameter]` ← new value
- `state.metrics[dependent]` ← recomputed

**Failure/Fallback**:
- Static diagram showing 3 example values
- Table of parameter → result mappings

**Best Used For**:
- Resistor value tuning
- Any parameter with continuous tradeoffs

---

### Template 3: Tradeoff Explorer

**Description**: Interactive 2D visualization showing relationship between two variables and a dependent outcome.

**Inputs**:
- `xAxis`: { label, range, currentValue }
- `yAxis`: { label, computed from state }
- `outcomeMetric`: What's being visualized
- `currentPosition`: Reader's current configuration

**Output Visuals**:
- 2D chart/heatmap
- Current position marker ("You are here")
- Optimal region indication (if applicable)
- Sankey/flow diagram for power distribution

**State Changes**:
- None directly (reads from existing state)
- May update `state.metrics` for display

**Failure/Fallback**:
- Static 2D chart with pre-computed example points
- Text explanation of the relationship

**Best Used For**:
- Efficiency visualization
- Brightness vs. battery life tradeoff
- Any competing constraint pair

---

### Template 4: Exploded View Assembly

**Description**: Reader drags components from an exploded view into their assembled positions.

**Inputs**:
- `parts`: Array of draggable part objects with target positions
- `assemblyOrder`: Required sequence (or null for any order)
- `currentAssembly`: Which parts are already placed

**Output Visuals**:
- Exploded view showing all parts separated
- Drop zones indicating where each part goes
- Parts snap into place when dropped correctly
- Connection lines appear as parts are placed
- Progress indicator

**State Changes**:
- `state.connections` ← updated per placement
- `state.parts[id].assembled` ← true

**Failure/Fallback**:
- Animated GIF of assembly sequence
- Step-by-step static images

**Best Used For**:
- Final assembly step
- Understanding physical arrangement
- Teaching connection topology

---

### Template 5: Diagnostic Mode

**Description**: Interactive troubleshooting when the configuration doesn't work.

**Inputs**:
- `testResult`: Boolean (working/not working)
- `failureReasons`: Array of possible issues with detection logic
- `currentState`: Full configuration state

**Output Visuals**:
- Success: LED lights up, celebration micro-animation
- Failure: LED stays dark, diagnostic panel appears
- Diagnostic panel: Checklist of potential issues
- Fix suggestions with links back to relevant steps

**State Changes**:
- `state.config.tested` ← true
- `state.metrics.working` ← testResult

**Failure/Fallback**:
- Static flowchart for debugging
- Text-based decision tree

**Best Used For**:
- Post-assembly validation
- Teaching debugging mindset
- Reinforcing physics concepts through failure

---

### Template 6: Artifact Card

**Description**: Final summary card showing the reader's completed build and its metrics.

**Inputs**:
- `configuration`: Complete state.config
- `metrics`: Computed performance metrics
- `comparisons`: Reference configurations for context

**Output Visuals**:
- Hero image of completed flashlight
- Stats panel: Brightness, Battery Life, Efficiency, Score
- Configuration summary (all choices)
- Comparison bars against reference builds
- Shareable badge/label ("The Marathon Runner", "The Spotlight", etc.)

**State Changes**:
- `state.progress.completedAt` ← Date.now()

**Failure/Fallback**:
- Static template with "example" values
- Text summary of configuration

**Best Used For**:
- Final step of process essay
- Sharing/social features
- Sense of accomplishment

---

## 5. State Model

### TypeScript Schema

```typescript
interface FlashlightState {
  // Parts inventory and status
  parts: {
    battery: { id: string; selected: boolean; assembled: boolean };
    led: { id: string; selected: boolean; assembled: boolean };
    resistor: { id: string; selected: boolean; assembled: boolean };
    reflector: { id: string; selected: boolean; assembled: boolean };
    switch: { id: string; selected: boolean; assembled: boolean };
  };

  // Configuration choices
  config: {
    led: {
      color: 'red' | 'yellow' | 'green' | 'blue' | 'white';
      forwardVoltage: number;
    };
    battery: {
      type: '1xAA' | '2xAA' | '3xAA' | 'CR2032' | '9V';
      voltage: number;
      capacity: number;
    };
    resistor: {
      value: number; // Ohms
    };
    reflector: {
      type: 'none' | 'textured' | 'orangePeel' | 'smooth' | 'tir';
      beamAngle: number;
    };
    switch: {
      type: 'slideBody' | 'pushTail' | 'momentaryTail' | 'twistHead';
      position: 'body' | 'tail' | 'head';
    };
    tested: boolean;
  };

  // Connections between parts (circuit topology)
  connections: Array<{
    from: string;
    to: string;
    type: 'wire' | 'contact';
    complete: boolean;
  }>;

  // Computed metrics
  metrics: {
    current: number;        // mA
    brightness: number;     // 0-100 scale
    batteryLife: number;    // hours
    efficiency: number;     // percentage
    heat: number;           // mW dissipated in resistor
    beamIntensity: number;  // relative
    score: number;          // 0-100 overall
    working: boolean;       // circuit functions
  };

  // Progress tracking
  progress: {
    currentStep: number;
    completedSteps: string[];
    startedAt: number | null;
    completedAt: number | null;
  };

  // User preferences
  preferences: {
    reducedMotion: boolean;
    highContrast: boolean;
  };
}
```

### Example Instance

```json
{
  "parts": {
    "battery": { "id": "battery-1", "selected": true, "assembled": true },
    "led": { "id": "led-1", "selected": true, "assembled": true },
    "resistor": { "id": "resistor-1", "selected": true, "assembled": true },
    "reflector": { "id": "reflector-1", "selected": true, "assembled": true },
    "switch": { "id": "switch-1", "selected": true, "assembled": true }
  },
  "config": {
    "led": { "color": "white", "forwardVoltage": 3.2 },
    "battery": { "type": "3xAA", "voltage": 4.5, "capacity": 2500 },
    "resistor": { "value": 68 },
    "reflector": { "type": "orangePeel", "beamAngle": 30 },
    "switch": { "type": "pushTail", "position": "tail" },
    "tested": true
  },
  "connections": [
    { "from": "battery-pos", "to": "switch-in", "type": "wire", "complete": true },
    { "from": "switch-out", "to": "resistor-in", "type": "wire", "complete": true },
    { "from": "resistor-out", "to": "led-anode", "type": "wire", "complete": true },
    { "from": "led-cathode", "to": "battery-neg", "type": "wire", "complete": true }
  ],
  "metrics": {
    "current": 19.1,
    "brightness": 77,
    "batteryLife": 98,
    "efficiency": 71,
    "heat": 25,
    "beamIntensity": 77,
    "score": 76,
    "working": true
  },
  "progress": {
    "currentStep": 10,
    "completedSteps": ["intro", "led", "battery", "resistor", "tradeoff", "reflector", "switch", "assembly", "test", "complete"],
    "startedAt": 1702656000000,
    "completedAt": 1702657200000
  },
  "preferences": {
    "reducedMotion": false,
    "highContrast": false
  }
}
```

---

## 6. Simulation/Logic Model

### Simplified Model Explanation

A flashlight circuit is a series circuit: current flows from the battery, through the switch (when closed), through the resistor, through the LED, and back to the battery. The current is the same everywhere in this loop.

The LED has a property called "forward voltage" (Vf)—the minimum voltage it needs to light up. If your battery voltage is below this, no current flows. If it's above, the excess voltage must be "dropped" across the resistor.

The resistor's job is to limit current to a safe level for the LED. Using Ohm's Law, we calculate: current = (battery voltage - LED voltage) / resistance. More resistance means less current, which means a dimmer (but longer-lasting) light.

### Derived Metrics

| Metric | Formula | Units | Range |
|--------|---------|-------|-------|
| Current | `(V_batt - V_led) / R × 1000` | mA | 0–50 |
| Brightness | `(current / 30) × colorFactor × 100` | 0–100 | 0–100 |
| Battery Life | `(capacity × 0.75) / current` | hours | 1–500 |
| Efficiency | `(V_led / V_batt) × 100` | % | 20–95 |
| Heat | `(V_batt - V_led) × current` | mW | 0–200 |
| Beam Intensity | `brightness × reflectorFactor` | relative | 0–200 |

### Pseudocode

```javascript
function computeMetrics(state) {
  const { battery, led, resistor, reflector } = state.config;
  
  // Get specs
  const V_batt = battery.voltage;
  const V_led = led.forwardVoltage;
  const R = resistor.value;
  const capacity = battery.capacity;
  
  // Check if circuit works
  if (V_batt <= V_led) {
    return {
      current: 0,
      brightness: 0,
      batteryLife: Infinity,
      efficiency: 0,
      heat: 0,
      beamIntensity: 0,
      score: 0,
      working: false
    };
  }
  
  // Calculate current (Ohm's Law)
  const current = ((V_batt - V_led) / R) * 1000; // mA
  
  // Clamp current for safety calculation
  const safeCurrent = Math.min(current, 50);
  
  // Brightness (scales with current, adjusted by color)
  const colorFactors = {
    red: 0.7, yellow: 0.85, green: 1.0, blue: 0.5, white: 0.9
  };
  const brightness = Math.min(100, (safeCurrent / 30) * colorFactors[led.color] * 100);
  
  // Battery life
  const batteryLife = current > 0 ? (capacity * 0.75) / current : Infinity;
  
  // Efficiency
  const efficiency = (V_led / V_batt) * 100;
  
  // Heat dissipation in resistor
  const heat = (V_batt - V_led) * (current / 1000) * 1000; // mW
  
  // Beam intensity
  const reflectorFactors = {
    none: 0.3, textured: 0.6, orangePeel: 1.0, smooth: 1.8, tir: 2.0
  };
  const beamIntensity = brightness * reflectorFactors[reflector.type];
  
  // Overall score
  const batteryLifeNorm = Math.min(100, (batteryLife / 100) * 100);
  const score = (brightness * 0.3) + (batteryLifeNorm * 0.3) + 
                (efficiency * 0.2) + (Math.min(100, beamIntensity) * 0.2);
  
  return {
    current: Math.round(current * 10) / 10,
    brightness: Math.round(brightness),
    batteryLife: Math.round(batteryLife),
    efficiency: Math.round(efficiency),
    heat: Math.round(heat),
    beamIntensity: Math.round(beamIntensity),
    score: Math.round(score),
    working: current > 0 && current <= 50
  };
}
```

### Uncertainty/Variability (Optional)

For added realism, component tolerances can introduce variation:
- Resistors: ±5% or ±10% tolerance
- LEDs: ±0.2V forward voltage variance
- Batteries: Voltage decreases over discharge

```javascript
function addVariability(metrics, toleranceLevel = 0.05) {
  const vary = (value) => value * (1 + (Math.random() - 0.5) * toleranceLevel * 2);
  return {
    ...metrics,
    current: vary(metrics.current),
    brightness: vary(metrics.brightness),
    // batteryLife and efficiency stay deterministic for learning clarity
  };
}
```

---

## 7. Visual System Spec

### Rendering Approach

- **Primary**: SVG with React components for each part
- **Coordinate System**: Origin at center, Y-up, 400×300 viewBox
- **Viewport**: Responsive, maintains aspect ratio, max-width 600px

### SVG Structure

```xml
<svg viewBox="0 0 400 300" class="flashlight-twin">
  <!-- Layer 0: Background grid (optional) -->
  <g id="layer-bg" opacity="0.1">...</g>
  
  <!-- Layer 1: Ghost parts (unselected) -->
  <g id="layer-ghost" opacity="0.3">...</g>
  
  <!-- Layer 2: Assembled parts -->
  <g id="layer-assembled">
    <g id="part-battery">...</g>
    <g id="part-switch">...</g>
    <g id="part-resistor">...</g>
    <g id="part-led">...</g>
    <g id="part-reflector">...</g>
  </g>
  
  <!-- Layer 3: Connections (wires) -->
  <g id="layer-connections">
    <path id="wire-1" class="wire" />
    <path id="wire-2" class="wire" />
  </g>
  
  <!-- Layer 4: Active part (being manipulated) -->
  <g id="layer-active">...</g>
  
  <!-- Layer 5: Annotations -->
  <g id="layer-annotations">
    <text class="label">...</text>
    <line class="dimension">...</line>
  </g>
  
  <!-- Layer 6: Current flow animation -->
  <g id="layer-current" class="current-flow">
    <circle class="electron" />
  </g>
</svg>
```

### Part Naming Convention

| Part | SVG ID | Group ID | Z-Index |
|------|--------|----------|---------|
| Battery | `#part-battery` | `#group-power` | 10 |
| Switch | `#part-switch` | `#group-control` | 20 |
| Resistor | `#part-resistor` | `#group-circuit` | 30 |
| LED | `#part-led` | `#group-output` | 40 |
| Reflector | `#part-reflector` | `#group-optics` | 50 |

### Rendering States

| State | Opacity | Stroke | Fill | Animation |
|-------|---------|--------|------|-----------|
| **Ghosted** | 30% | 1px dashed #666 | none | none |
| **Available** | 100% | 1px solid #888 | muted color | `pulse 2s infinite` |
| **Hover** | 100% | 2px solid #4A9 | saturated color | `glow 0.3s` |
| **Selected** | 100% | 2px solid #2D7 | full color | `selected-glow` |
| **Assembled** | 100% | 1px solid #444 | full color | none |
| **Active (dragging)** | 90% | 2px solid #FD0 | full color | follows cursor |
| **Error** | 100% | 2px solid #F44 | original + red tint | `shake 0.3s` |
| **Working (LED on)** | 100% | — | LED color | `glow-pulse` |

### Connection Rendering

```css
.wire {
  stroke: #444;
  stroke-width: 2;
  fill: none;
}

.wire.complete {
  stroke: #2A2;
}

.wire.current-flowing {
  stroke: #4F4;
  filter: drop-shadow(0 0 3px #4F4);
}

/* Current flow animation */
.electron {
  fill: #FF0;
  r: 3;
  animation: flow 1s linear infinite;
}

@keyframes flow {
  from { offset-distance: 0%; }
  to { offset-distance: 100%; }
}
```

### Animation Principles

- **Assembly**: Parts ease-out into position (300ms)
- **State Change**: Cross-fade between states (200ms)
- **LED glow**: Radial gradient + blur filter, intensity tied to brightness metric
- **Current flow**: Small circles following wire paths when circuit is complete
- **Reduced motion**: All animations become instant transitions

---

## 8. Implementation Architecture

### File Structure

```
src/app/essays/build-a-flashlight/
├── page.tsx                      # Next.js page wrapper
├── FlashlightBuilderClient.tsx   # Main client component ("use client")
├── flashlight-builder.css        # Custom styles + CSS variables
├── components/
│   ├── FlashlightSVG.tsx         # Digital twin renderer
│   ├── MetricsDisplay.tsx        # Live metrics panel
│   ├── ArtifactCard.tsx          # Final summary card
│   ├── scenes/
│   │   ├── IntroScene.tsx        # Step 1
│   │   ├── LEDSelectionScene.tsx # Step 2
│   │   ├── BatterySelectionScene.tsx
│   │   ├── ResistorTuningScene.tsx
│   │   ├── TradeoffExplorerScene.tsx
│   │   ├── ReflectorSelectionScene.tsx
│   │   ├── SwitchSelectionScene.tsx
│   │   ├── AssemblyScene.tsx
│   │   ├── DiagnosticScene.tsx
│   │   └── CompletionScene.tsx   # Step 10
│   └── controls/
│       ├── PartSelector.tsx      # Reusable part selection grid
│       ├── ParameterSlider.tsx   # Reusable parameter slider
│       ├── DragDropZone.tsx      # Drag-and-drop assembly
│       └── ProgressIndicator.tsx # Step progress bar
├── lib/
│   ├── state.ts                  # State types, initial state, reducer
│   ├── simulation.ts             # computeMetrics function
│   ├── components.ts             # LED_SPECS, BATTERY_SPECS, etc.
│   └── persistence.ts            # localStorage save/load
├── research/                     # Research files (already created)
│   ├── TECHNICAL-SPECS.md
│   ├── FORMULAS.md
│   ├── COMPONENT-DATA.md
│   └── SYNTHESIS.md
└── SPEC.md                       # This file
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│ FlashlightBuilderClient.tsx                                          │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ StateProvider (useReducer)                                       │ │
│ │   state ─────────────────────────────┐                          │ │
│ │   dispatch ──────────────────────────┼──┐                       │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                        │  │                         │
│ ┌──────────────────────────────────────▼──▼────────────────────────┐│
│ │ Sticky Viewport (position: sticky)                               ││
│ │ ┌──────────────────────────────────────────────────────────────┐ ││
│ │ │ FlashlightSVG.tsx                                             │ ││
│ │ │ - Receives: state.parts, state.config, state.metrics          │ ││
│ │ │ - Renders: Digital twin with all parts                        │ ││
│ │ │ - Updates: On every state change                              │ ││
│ │ └──────────────────────────────────────────────────────────────┘ ││
│ │ ┌──────────────────────────────────────────────────────────────┐ ││
│ │ │ MetricsDisplay.tsx (brightness, battery life, efficiency)     │ ││
│ │ └──────────────────────────────────────────────────────────────┘ ││
│ └──────────────────────────────────────────────────────────────────┘│
│                                                                     │
│ ┌──────────────────────────────────────────────────────────────────┐│
│ │ Scrollytelling Content                                           ││
│ │ ┌────────────┐ ┌────────────┐ ┌────────────┐                    ││
│ │ │ Scene 1    │ │ Scene 2    │ │ Scene 3    │  ...               ││
│ │ │ (Intro)    │ │ (LED)      │ │ (Battery)  │                    ││
│ │ │            │ │            │ │            │                    ││
│ │ │ Receives:  │ │ Receives:  │ │ Receives:  │                    ││
│ │ │ - state    │ │ - state    │ │ - state    │                    ││
│ │ │ - dispatch │ │ - dispatch │ │ - dispatch │                    ││
│ │ │ - isActive │ │ - isActive │ │ - isActive │                    ││
│ │ └────────────┘ └────────────┘ └────────────┘                    ││
│ └──────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### State Management

```typescript
// lib/state.ts
import { FlashlightState } from './types';

const initialState: FlashlightState = {
  parts: {
    battery: { id: 'battery-1', selected: false, assembled: false },
    led: { id: 'led-1', selected: false, assembled: false },
    resistor: { id: 'resistor-1', selected: false, assembled: false },
    reflector: { id: 'reflector-1', selected: false, assembled: false },
    switch: { id: 'switch-1', selected: false, assembled: false },
  },
  config: {
    led: { color: 'white', forwardVoltage: 3.2 },
    battery: { type: '2xAA', voltage: 3.0, capacity: 2500 },
    resistor: { value: 100 },
    reflector: { type: 'orangePeel', beamAngle: 30 },
    switch: { type: 'pushTail', position: 'tail' },
    tested: false,
  },
  connections: [],
  metrics: { /* computed */ },
  progress: { currentStep: 1, completedSteps: [], startedAt: null, completedAt: null },
  preferences: { reducedMotion: false, highContrast: false },
};

type Action =
  | { type: 'SELECT_LED'; color: string }
  | { type: 'SELECT_BATTERY'; batteryType: string }
  | { type: 'SET_RESISTOR'; value: number }
  | { type: 'SELECT_REFLECTOR'; reflectorType: string }
  | { type: 'SELECT_SWITCH'; switchType: string }
  | { type: 'ASSEMBLE_PART'; partId: string }
  | { type: 'TEST_CIRCUIT' }
  | { type: 'ADVANCE_STEP' }
  | { type: 'RESET' }
  | { type: 'SET_PREFERENCES'; preferences: Partial<FlashlightState['preferences']> };

function reducer(state: FlashlightState, action: Action): FlashlightState {
  // Handle each action type...
}
```

### Persistence

```typescript
// lib/persistence.ts
const STORAGE_KEY = 'esy-flashlight-builder';

export function saveState(state: FlashlightState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

export function loadState(): FlashlightState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
}

export function exportState(state: FlashlightState): string {
  return JSON.stringify(state, null, 2);
}

export function importState(json: string): FlashlightState {
  return JSON.parse(json);
}
```

### Testing Strategy

| Test Type | Tool | Focus |
|-----------|------|-------|
| State transitions | Vitest | Reducer produces correct state for each action |
| Metric calculations | Vitest | `computeMetrics` returns accurate values |
| Component rendering | React Testing Library | Scenes render correctly for various states |
| Interactions | Playwright | Drag-drop, sliders work end-to-end |
| Visual regression | Playwright screenshots | SVG renders consistently |
| Accessibility | axe-core | No accessibility violations |

### Performance Notes

- Throttle scroll handlers to 16ms (60fps)
- Use `useMemo` for expensive metric computations
- SVG updates via React reconciliation (not direct DOM)
- Lazy-load scenes below fold with Intersection Observer
- `will-change: transform` on draggable elements
- Reduced motion: Skip all transition/animation durations

---

## 9. Essay Text (Steps 1-3)

### Step 1: Meet the Components

Every flashlight—from a child's toy to a rescue worker's lifeline—contains the same four essential parts. A power source that pushes electrons. A switch that opens and closes the circuit. A resistor that limits the flow. And a light-emitting diode that converts electrical energy into photons.

We're going to build one from scratch. Not a simulation of a flashlight—a working digital twin whose behavior follows the same physics as the real thing. Every choice you make in the next ten minutes will shape how it performs.

These four components are floating in front of you now. The battery, storing chemical energy waiting to be released. The switch, a simple gate between "off" and "on." The resistor, a deliberate bottleneck. And the LED, a tiny semiconductor that turns current into light.

> **Your task**: Explore each component. Hover to see what it does. When you're ready, we'll start making choices.

*Notice this: A flashlight is just four parts—but choosing the right four parts is everything.*

---

### Step 2: Choose Your Light

Light-emitting diodes glow in many colors, and this isn't just about aesthetics. The color of an LED determines what semiconductor material it's made from—and that determines how much voltage it needs to produce light.

Red LEDs are forgiving. Made from aluminum gallium arsenide, they light up at just 2 volts. You could power one with a couple of AA batteries and have voltage to spare.

White LEDs are demanding. They're actually blue LEDs (made from indium gallium nitride) coated with a phosphor that converts some blue light to yellow. The combination looks white to our eyes. But that blue core needs around 3.2 volts to shine.

This matters because your LED's voltage requirement constrains everything else. Pick a high-voltage LED, and you'll need more batteries. Pick a low-voltage LED, and a single cell might suffice.

> **Your task**: Select an LED color. Watch how your choice affects the "minimum voltage required" indicator.

*Notice this: White and blue LEDs need about 3.2V. A single AA battery provides only 1.5V. Your color choice has already constrained your battery options.*

---

### Step 3: Power Source

Batteries are voltage sources. They maintain a consistent electrical pressure—a "push" that moves electrons through your circuit. The voltage printed on a battery tells you how hard it pushes.

A single AA cell pushes at 1.5 volts. Stack two in series—positive to negative—and you get 3 volts. Three in series: 4.5 volts. This is one of the beautiful simplicities of electronics: voltages add in series.

But there's a constraint. Your LED won't light unless the battery voltage exceeds the LED's forward voltage. Not "barely equals"—exceeds. If you chose a white LED (3.2V) and you're looking at two AA batteries (3.0V), the math doesn't work. The circuit won't light up—not dimly, not flickeringly. It simply won't function.

Choose wisely. More batteries mean more voltage and a larger flashlight. Fewer batteries mean compact design but limited LED options.

> **Your task**: Select a battery configuration. If your battery voltage is below your LED's requirement, you'll see a warning. You can go back and change your LED, or pick a higher-voltage battery.

*Notice this: If V_battery < V_LED, nothing happens. This isn't a gradual dimming—it's a hard cutoff. The physics is binary here.*

---

## 10. Working Scene Prototype

### Scene: Resistor Tuning (Step 4)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resistor Tuning - Flashlight Builder Prototype</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a0a0f;
      color: #e8e8e8;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }
    
    h1 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    
    .subtitle {
      color: #888;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }
    
    .container {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 900px;
    }
    
    /* SVG Digital Twin */
    .twin-container {
      background: #111118;
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid #2a2a35;
    }
    
    #flashlight-svg {
      width: 300px;
      height: 200px;
    }
    
    /* Resistor visualization */
    .resistor-body {
      fill: #d4a574;
      transition: fill 0.3s;
    }
    
    .resistor-band {
      transition: fill 0.3s;
    }
    
    /* LED glow effect */
    .led-glow {
      transition: opacity 0.3s, r 0.3s;
    }
    
    /* Heat indicator */
    .heat-indicator {
      transition: opacity 0.3s;
    }
    
    /* Controls Panel */
    .controls {
      background: #111118;
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid #2a2a35;
      min-width: 280px;
    }
    
    .control-group {
      margin-bottom: 1.5rem;
    }
    
    .control-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
    }
    
    .control-label span:first-child {
      color: #888;
    }
    
    .control-value {
      color: #4fd;
      font-family: 'SF Mono', monospace;
      font-weight: 600;
    }
    
    /* Slider styling */
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: #2a2a35;
      outline: none;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #4fd;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }
    
    input[type="range"]:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px rgba(68, 255, 221, 0.3);
    }
    
    /* Metrics display */
    .metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .metric {
      background: #1a1a22;
      border-radius: 8px;
      padding: 0.75rem;
      text-align: center;
    }
    
    .metric-value {
      font-size: 1.5rem;
      font-weight: 600;
      font-family: 'SF Mono', monospace;
    }
    
    .metric-value.brightness { color: #ffd43b; }
    .metric-value.battery { color: #69db7c; }
    .metric-value.efficiency { color: #74c0fc; }
    .metric-value.current { color: #ff8787; }
    
    .metric-label {
      font-size: 0.7rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 0.25rem;
    }
    
    /* Tradeoff bar */
    .tradeoff-bar {
      height: 8px;
      background: #2a2a35;
      border-radius: 4px;
      margin-top: 1rem;
      overflow: hidden;
      display: flex;
    }
    
    .tradeoff-brightness {
      background: linear-gradient(90deg, #ffd43b, #ff922b);
      transition: width 0.3s;
    }
    
    .tradeoff-battery {
      background: linear-gradient(90deg, #69db7c, #40c057);
      transition: width 0.3s;
    }
    
    .tradeoff-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: #666;
      margin-top: 0.25rem;
    }
    
    /* Summary */
    #summary {
      margin-top: 1rem;
      padding: 1rem;
      background: #1a1a22;
      border-radius: 8px;
      font-size: 0.8rem;
      color: #aaa;
      font-family: 'SF Mono', monospace;
    }
    
    /* Reset button */
    #reset {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid #444;
      border-radius: 6px;
      color: #888;
      cursor: pointer;
      font-size: 0.8rem;
      transition: all 0.2s;
    }
    
    #reset:hover {
      border-color: #666;
      color: #ccc;
    }
    
    #reset:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(68, 255, 221, 0.3);
    }
    
    /* Accessibility: Focus visible */
    :focus-visible {
      outline: 2px solid #4fd;
      outline-offset: 2px;
    }
    
    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
        animation: none !important;
      }
    }
  </style>
</head>
<body>
  <h1>The Sacrifice: Resistor Tuning</h1>
  <p class="subtitle">Drag the slider to balance brightness and battery life</p>
  
  <div class="container">
    <!-- SVG Digital Twin -->
    <div class="twin-container">
      <svg id="flashlight-svg" viewBox="0 0 300 200" aria-label="Flashlight circuit diagram">
        <!-- Background -->
        <rect fill="#0d0d12" width="300" height="200"/>
        
        <!-- Battery -->
        <g id="battery" transform="translate(30, 80)">
          <rect x="0" y="0" width="40" height="60" rx="3" fill="#333" stroke="#555" stroke-width="1"/>
          <rect x="12" y="-5" width="16" height="8" rx="2" fill="#555"/>
          <text x="20" y="35" text-anchor="middle" fill="#888" font-size="10">3V</text>
          <text x="20" y="48" text-anchor="middle" fill="#666" font-size="8">2×AA</text>
        </g>
        
        <!-- Wire: Battery to Resistor -->
        <path d="M 70 95 L 100 95" stroke="#4a4a55" stroke-width="2" fill="none"/>
        
        <!-- Resistor -->
        <g id="resistor" transform="translate(100, 80)">
          <rect class="resistor-body" x="0" y="10" width="50" height="20" rx="3"/>
          <!-- Color bands will be dynamic -->
          <rect class="resistor-band band-1" x="8" y="10" width="6" height="20" fill="#8B4513"/>
          <rect class="resistor-band band-2" x="18" y="10" width="6" height="20" fill="#000"/>
          <rect class="resistor-band band-3" x="28" y="10" width="6" height="20" fill="#8B4513"/>
          <rect class="resistor-band band-4" x="38" y="10" width="6" height="20" fill="#FFD700"/>
          <!-- Heat glow -->
          <ellipse class="heat-indicator" cx="25" cy="20" rx="30" ry="15" fill="url(#heatGradient)" opacity="0"/>
        </g>
        
        <!-- Wire: Resistor to LED -->
        <path d="M 150 95 L 180 95" stroke="#4a4a55" stroke-width="2" fill="none"/>
        
        <!-- LED -->
        <g id="led" transform="translate(180, 70)">
          <!-- LED body (triangle) -->
          <polygon points="0,25 30,10 30,40" fill="#2a2a35" stroke="#555" stroke-width="1"/>
          <line x1="30" y1="10" x2="30" y2="40" stroke="#555" stroke-width="2"/>
          <!-- LED glow -->
          <circle class="led-glow" cx="15" cy="25" r="20" fill="url(#ledGlow)" opacity="0.5"/>
          <!-- Light rays -->
          <g class="led-rays" opacity="0.3">
            <line x1="35" y1="25" x2="55" y2="25" stroke="#fff" stroke-width="1"/>
            <line x1="35" y1="15" x2="50" y2="5" stroke="#fff" stroke-width="1"/>
            <line x1="35" y1="35" x2="50" y2="45" stroke="#fff" stroke-width="1"/>
          </g>
        </g>
        
        <!-- Wire: LED back to Battery -->
        <path d="M 210 120 L 210 160 L 50 160 L 50 140" stroke="#4a4a55" stroke-width="2" fill="none"/>
        
        <!-- Current direction indicator -->
        <text x="130" y="85" fill="#4fd" font-size="9" id="current-label">→ 20 mA</text>
        
        <!-- Gradient definitions -->
        <defs>
          <radialGradient id="ledGlow">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="heatGradient">
            <stop offset="0%" stop-color="#ff4400" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#ff4400" stop-opacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
    
    <!-- Controls -->
    <div class="controls">
      <div class="control-group">
        <div class="control-label">
          <span>Resistor Value</span>
          <span class="control-value" id="resistor-display">100Ω</span>
        </div>
        <!-- 
          Accessibility: Slider has aria-label, aria-valuemin/max/now
          Keyboard: Arrow keys adjust value
        -->
        <input 
          type="range" 
          id="resistor-slider" 
          min="0" 
          max="8" 
          value="2" 
          step="1"
          aria-label="Resistor value in ohms"
          aria-valuemin="47"
          aria-valuemax="1000"
          aria-valuenow="100"
        />
        <div class="tradeoff-labels">
          <span>47Ω (bright)</span>
          <span>1kΩ (long life)</span>
        </div>
      </div>
      
      <div class="metrics" role="region" aria-label="Performance metrics">
        <div class="metric">
          <div class="metric-value current" id="current-value">20.0</div>
          <div class="metric-label">Current (mA)</div>
        </div>
        <div class="metric">
          <div class="metric-value brightness" id="brightness-value">67</div>
          <div class="metric-label">Brightness</div>
        </div>
        <div class="metric">
          <div class="metric-value battery" id="battery-value">94</div>
          <div class="metric-label">Battery (hrs)</div>
        </div>
        <div class="metric">
          <div class="metric-value efficiency" id="efficiency-value">67</div>
          <div class="metric-label">Efficiency %</div>
        </div>
      </div>
      
      <div class="tradeoff-bar" aria-hidden="true">
        <div class="tradeoff-brightness" id="tradeoff-brightness" style="width: 50%"></div>
        <div class="tradeoff-battery" id="tradeoff-battery" style="width: 50%"></div>
      </div>
      <div class="tradeoff-labels">
        <span>⚡ Brightness</span>
        <span>🔋 Battery Life</span>
      </div>
      
      <div id="summary" aria-live="polite">
        R=100Ω → I=20.0mA → 67% brightness, 94hr runtime
      </div>
      
      <button id="reset" aria-label="Reset to default values">Reset to Default</button>
    </div>
  </div>

  <script>
    // =========================================
    // STATE
    // =========================================
    const RESISTOR_VALUES = [47, 68, 100, 150, 220, 330, 470, 680, 1000];
    
    const state = {
      battery: { voltage: 3.0, capacity: 2500 }, // 2×AA
      led: { color: 'white', forwardVoltage: 2.0, colorFactor: 0.9 }, // Using red Vf for demo
      resistor: { value: 100 }
    };
    
    // =========================================
    // SIMULATION LOGIC
    // =========================================
    function computeMetrics(state) {
      const V_batt = state.battery.voltage;
      const V_led = state.led.forwardVoltage;
      const R = state.resistor.value;
      const capacity = state.battery.capacity;
      
      // Ohm's Law
      const current = ((V_batt - V_led) / R) * 1000; // mA
      
      // Brightness (0-100)
      const brightness = Math.min(100, (current / 30) * state.led.colorFactor * 100);
      
      // Battery life (hours)
      const batteryLife = (capacity * 0.75) / current;
      
      // Efficiency
      const efficiency = (V_led / V_batt) * 100;
      
      // Heat (mW)
      const heat = (V_batt - V_led) * (current / 1000) * 1000;
      
      return {
        current: Math.round(current * 10) / 10,
        brightness: Math.round(brightness),
        batteryLife: Math.round(batteryLife),
        efficiency: Math.round(efficiency),
        heat: Math.round(heat)
      };
    }
    
    // =========================================
    // RENDER FUNCTION
    // =========================================
    function render() {
      const metrics = computeMetrics(state);
      
      // Update text displays
      document.getElementById('resistor-display').textContent = state.resistor.value + 'Ω';
      document.getElementById('current-value').textContent = metrics.current.toFixed(1);
      document.getElementById('brightness-value').textContent = metrics.brightness;
      document.getElementById('battery-value').textContent = metrics.batteryLife;
      document.getElementById('efficiency-value').textContent = metrics.efficiency;
      
      // Update summary
      document.getElementById('summary').textContent = 
        `R=${state.resistor.value}Ω → I=${metrics.current.toFixed(1)}mA → ${metrics.brightness}% brightness, ${metrics.batteryLife}hr runtime`;
      
      // Update SVG: LED glow intensity
      const ledGlow = document.querySelector('.led-glow');
      const glowOpacity = (metrics.brightness / 100) * 0.8;
      const glowRadius = 15 + (metrics.brightness / 100) * 25;
      ledGlow.setAttribute('opacity', glowOpacity);
      ledGlow.setAttribute('r', glowRadius);
      
      // Update LED rays opacity
      const ledRays = document.querySelector('.led-rays');
      ledRays.setAttribute('opacity', (metrics.brightness / 100) * 0.6);
      
      // Update heat indicator
      const heatIndicator = document.querySelector('.heat-indicator');
      const heatOpacity = Math.min(0.8, metrics.heat / 100);
      heatIndicator.setAttribute('opacity', heatOpacity);
      
      // Update current label
      document.getElementById('current-label').textContent = `→ ${metrics.current.toFixed(0)} mA`;
      
      // Update tradeoff bar
      const brightnessWidth = metrics.brightness;
      const batteryWidth = Math.min(100, metrics.batteryLife / 2); // Normalize
      const total = brightnessWidth + batteryWidth;
      document.getElementById('tradeoff-brightness').style.width = (brightnessWidth / total * 100) + '%';
      document.getElementById('tradeoff-battery').style.width = (batteryWidth / total * 100) + '%';
      
      // Update ARIA
      const slider = document.getElementById('resistor-slider');
      slider.setAttribute('aria-valuenow', state.resistor.value);
    }
    
    // =========================================
    // EVENT HANDLERS
    // =========================================
    const slider = document.getElementById('resistor-slider');
    
    slider.addEventListener('input', (e) => {
      const index = parseInt(e.target.value, 10);
      state.resistor.value = RESISTOR_VALUES[index];
      render();
    });
    
    // Keyboard accessibility: Arrow keys fine-tune
    slider.addEventListener('keydown', (e) => {
      // Default behavior handles arrows, but we log for demonstration
      // No custom handling needed - native slider handles it
    });
    
    document.getElementById('reset').addEventListener('click', () => {
      state.resistor.value = 100;
      slider.value = 2; // Index of 100Ω
      render();
    });
    
    // =========================================
    // INITIALIZATION
    // =========================================
    render();
    
    // Announce to screen readers on load
    // (In production, this would be more sophisticated)
    console.log('Resistor Tuning Scene loaded. Use slider to adjust resistance.');
  </script>
</body>
</html>
```

**To test**: Save as `prototype-resistor-tuning.html` and open in browser.

---

## 11. Esy Fit Notes

### Authoring Workflow

1. **Subject Selection** (Human): Choose a build subject with clear parts, parameters, and tradeoffs
2. **Research Phase** (AI + Human review): Gather technical specs, formulas, component data
3. **Spec Construction** (AI): Generate 12-section specification from template
4. **Prototype Scene** (AI): Build one working scene to validate interaction model
5. **Human Review**: Verify technical accuracy, refine tone, polish interactions
6. **Full Production** (AI + Human): Implement all scenes using established patterns
7. **Audit**: State integrity, accessibility, simulation accuracy, fallbacks

### AI vs. Human Division

| Task | AI-Generated | Human-Refined |
|------|--------------|---------------|
| Technical research | ✅ Initial gathering | Review for accuracy |
| State model schema | ✅ Complete | Validate edge cases |
| Simulation formulas | ✅ Draft | Verify against real physics |
| Scene templates | ✅ Structure | Polish interactions |
| Essay prose (steps 1-3) | ✅ Draft | Voice, tone, clarity editing |
| SVG digital twin | ✅ Basic structure | Visual polish, animation refinement |
| Working prototype | ✅ Functional | UX refinement |
| Accessibility | ✅ ARIA, keyboard | Real assistive tech testing |
| Fallbacks | ✅ Structure | Content completeness |

### Maintainability

- **Scene templates** (`PartSelector`, `ParameterSlider`, etc.) are reusable React components
- **State patterns** (parts, config, connections, metrics) are consistent across process essays
- **Simulation logic** is isolated in `lib/simulation.ts`—easy to update formulas
- **Component specs** live in `lib/components.ts`—single source of truth
- **Fallbacks** are separate static images—independent of JS implementation

### Scaling to Future Process Essays

With this flashlight as the flagship, future process essays can reuse:

```
src/components/process-essay/
├── PartSelector.tsx          # From flashlight
├── ParameterSlider.tsx       # From flashlight
├── TradeoffExplorer.tsx      # From flashlight
├── ExplodedAssembly.tsx      # From flashlight
├── DiagnosticMode.tsx        # From flashlight
├── ArtifactCard.tsx          # From flashlight
└── DigitalTwinSVG.tsx        # Base component, customized per subject
```

New process essays need:
1. Subject-specific component specs (`lib/components.ts`)
2. Subject-specific simulation logic (`lib/simulation.ts`)
3. Subject-specific SVG digital twin
4. Subject-specific essay prose

The interaction patterns, state management, and scene templates transfer directly.

---

## 12. Extensions

### Near-Term (Next 2 Process Essays)

1. **Multiple LED Mode**: Add parallel LED configuration, showing how current splits and total brightness increases

2. **Voltage Meter Visualization**: Real-time display showing voltage drops across each component (battery → switch → resistor → LED → ground)

### Medium-Term (Format Maturity)

3. **Comparison Mode**: Side-by-side view of two configurations, highlighting differences in metrics

4. **"What If" Scenarios**: "What if you had chosen 3×AA instead?" counterfactual exploration without resetting

5. **Challenge Mode**: "Build a flashlight that lasts 100+ hours" with constraints, gamifying the tradeoff exploration

6. **Component Failure Simulation**: "Your resistor burned out—why?" Teaching diagnostic skills through simulated failures

### Long-Term (Platform Evolution)

7. **AR Mode**: Point phone camera at desk, see digital flashlight components placed in physical space

8. **Physical Kit Integration**: "Order these exact components" link to Adafruit/SparkFun, build the real thing

9. **Adaptive Tutoring**: Track where readers struggle (e.g., voltage matching), offer additional explanations

10. **Collaborative Builds**: Two readers configure the same flashlight remotely, negotiating tradeoffs together

11. **Community Gallery**: Share configurations, see what others built, vote on creative solutions

12. **Export to Simulation**: Generate a SPICE netlist or Falstad circuit link for readers who want to go deeper

---

## Specification Status

**Status**: ✅ COMPLETE (12/12 Sections)

| Section | Status |
|---------|--------|
| 1. Concept | ✅ |
| 2. Learning Objectives | ✅ |
| 3. Storyboard (10 steps) | ✅ |
| 4. Scene Templates (6) | ✅ |
| 5. State Model | ✅ |
| 6. Simulation Logic | ✅ |
| 7. Visual System Spec | ✅ |
| 8. Implementation Architecture | ✅ |
| 9. Essay Text (Steps 1-3) | ✅ |
| 10. Working Prototype | ✅ |
| 11. Esy Fit Notes | ✅ |
| 12. Extensions | ✅ |

---

**Ready for Phase 4: Production**

This specification can now be handed to the Production Orchestrator for implementation, with the Interactive Experience Architect available for consultation on state management and interaction design.