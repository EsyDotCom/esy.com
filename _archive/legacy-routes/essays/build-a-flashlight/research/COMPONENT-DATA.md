# Component Data Reference

> Research Phase: LED Flashlight Process Essay
> Purpose: Concrete values for state model and simulation

---

## LED Options

For the process essay, readers choose from these LED configurations:

### LED Color Choices

```typescript
const LED_SPECS = {
  red: {
    id: "red",
    name: "Red LED",
    forwardVoltage: 2.0,      // Volts
    maxCurrent: 30,            // mA
    typicalCurrent: 20,        // mA
    colorFactor: 0.7,          // Relative brightness perception
    wavelength: "625nm",
    hexColor: "#FF3333",
    description: "Classic red - lowest voltage requirement, works with single AA"
  },
  yellow: {
    id: "yellow", 
    name: "Yellow LED",
    forwardVoltage: 2.1,
    maxCurrent: 30,
    typicalCurrent: 20,
    colorFactor: 0.85,
    wavelength: "590nm",
    hexColor: "#FFCC00",
    description: "Warm yellow - good visibility, low voltage"
  },
  green: {
    id: "green",
    name: "Green LED",
    forwardVoltage: 2.2,
    maxCurrent: 30,
    typicalCurrent: 20,
    colorFactor: 1.0,          // Human eye most sensitive to green
    wavelength: "565nm",
    hexColor: "#33FF33",
    description: "Bright green - peak eye sensitivity, appears brightest"
  },
  blue: {
    id: "blue",
    name: "Blue LED",
    forwardVoltage: 3.2,
    maxCurrent: 30,
    typicalCurrent: 20,
    colorFactor: 0.5,
    wavelength: "470nm",
    hexColor: "#3366FF",
    description: "Cool blue - needs higher voltage, unique color"
  },
  white: {
    id: "white",
    name: "White LED",
    forwardVoltage: 3.2,
    maxCurrent: 30,
    typicalCurrent: 20,
    colorFactor: 0.9,
    wavelength: "broad",
    hexColor: "#FFFFFF",
    description: "Pure white - most practical, needs higher voltage"
  }
};
```

---

## Battery Options

```typescript
const BATTERY_SPECS = {
  "1xAA": {
    id: "1xAA",
    name: "Single AA",
    voltage: 1.5,
    capacity: 2500,           // mAh
    formFactor: "cylindrical",
    dimensions: { length: 50, diameter: 14 },
    weight: 23,               // grams
    description: "Compact but low voltage - only works with red/yellow LEDs"
  },
  "2xAA": {
    id: "2xAA",
    name: "2× AA (Series)",
    voltage: 3.0,
    capacity: 2500,           // Same capacity, higher voltage
    formFactor: "cylindrical",
    dimensions: { length: 100, diameter: 14 },
    weight: 46,
    description: "Common flashlight config - works with most LEDs"
  },
  "3xAA": {
    id: "3xAA",
    name: "3× AA (Series)",
    voltage: 4.5,
    capacity: 2500,
    formFactor: "cylindrical",
    dimensions: { length: 150, diameter: 14 },
    weight: 69,
    description: "High voltage headroom - most efficient with white/blue LEDs"
  },
  "CR2032": {
    id: "CR2032",
    name: "CR2032 Coin Cell",
    voltage: 3.0,
    capacity: 220,
    formFactor: "disc",
    dimensions: { diameter: 20, thickness: 3.2 },
    weight: 3,
    description: "Ultra compact - short runtime but very small form factor"
  },
  "9V": {
    id: "9V",
    name: "9V Battery",
    voltage: 9.0,
    capacity: 550,
    formFactor: "rectangular",
    dimensions: { length: 48, width: 26, height: 17 },
    weight: 46,
    description: "High voltage - significant power lost in resistor"
  }
};
```

---

## Resistor Options

Standard E12 series values commonly available:

```typescript
const RESISTOR_VALUES = [
  // Low resistance (high current, brighter)
  { value: 47, label: "47Ω", current_at_2V_drop: 43 },
  { value: 68, label: "68Ω", current_at_2V_drop: 29 },
  { value: 100, label: "100Ω", current_at_2V_drop: 20 },
  { value: 150, label: "150Ω", current_at_2V_drop: 13 },
  { value: 220, label: "220Ω", current_at_2V_drop: 9 },
  { value: 330, label: "330Ω", current_at_2V_drop: 6 },
  { value: 470, label: "470Ω", current_at_2V_drop: 4 },
  // High resistance (low current, dimmer but longer life)
  { value: 680, label: "680Ω", current_at_2V_drop: 3 },
  { value: 1000, label: "1kΩ", current_at_2V_drop: 2 },
];

// Power ratings
const RESISTOR_POWER_RATINGS = {
  "1/8W": 0.125,
  "1/4W": 0.25,   // Standard for LED circuits
  "1/2W": 0.5,
  "1W": 1.0
};
```

### Resistor Selection Guide

| Voltage Drop | Target 20mA | Target 10mA | Target 5mA |
|--------------|-------------|-------------|------------|
| 1.0V | 47Ω | 100Ω | 220Ω |
| 1.5V | 68Ω | 150Ω | 330Ω |
| 2.0V | 100Ω | 220Ω | 470Ω |
| 2.5V | 120Ω | 270Ω | 560Ω |
| 3.0V | 150Ω | 330Ω | 680Ω |

---

## Reflector Options

```typescript
const REFLECTOR_SPECS = {
  none: {
    id: "none",
    name: "No Reflector",
    factor: 0.3,
    beamAngle: 120,
    description: "Raw LED output - very wide, unfocused beam"
  },
  textured: {
    id: "textured",
    name: "Textured Reflector",
    factor: 0.6,
    beamAngle: 60,
    description: "Flood pattern - even light distribution, close work"
  },
  orangePeel: {
    id: "orangePeel",
    name: "Orange Peel Reflector",
    factor: 1.0,
    beamAngle: 30,
    description: "Balanced beam - good spot with smooth edges"
  },
  smooth: {
    id: "smooth",
    name: "Smooth Parabolic",
    factor: 1.8,
    beamAngle: 10,
    description: "Tight spot - maximum throw distance, focused beam"
  },
  tir: {
    id: "tir",
    name: "TIR Optic Lens",
    factor: 2.0,
    beamAngle: 15,
    description: "High efficiency optic - crisp beam, minimal spill"
  }
};
```

---

## Switch Options

```typescript
const SWITCH_SPECS = {
  slideBody: {
    id: "slideBody",
    name: "Side Slide Switch",
    position: "body",
    type: "latching",
    currentRating: 1.0,       // Amps
    description: "Simple on/off - slide to toggle"
  },
  pushTail: {
    id: "pushTail",
    name: "Tail Push Button",
    position: "tail",
    type: "latching",
    currentRating: 2.0,
    description: "Tactical style - click on, click off"
  },
  momentaryTail: {
    id: "momentaryTail",
    name: "Momentary Tail Button",
    position: "tail",
    type: "momentary",
    currentRating: 2.0,
    description: "Signaling mode - on only while pressed"
  },
  twistHead: {
    id: "twistHead",
    name: "Twist Head",
    position: "head",
    type: "latching",
    currentRating: 3.0,
    description: "Simple twist action - no moving parts exposed"
  }
};
```

---

## Valid Configurations

Not all combinations work. Here's the compatibility matrix:

### Battery + LED Compatibility

| Battery | Red (2.0V) | Yellow (2.1V) | Green (2.2V) | Blue (3.2V) | White (3.2V) |
|---------|------------|---------------|--------------|-------------|--------------|
| 1×AA (1.5V) | ❌ | ❌ | ❌ | ❌ | ❌ |
| 2×AA (3.0V) | ✅ | ✅ | ✅ | ⚠️ Dim | ⚠️ Dim |
| 3×AA (4.5V) | ✅ | ✅ | ✅ | ✅ | ✅ |
| CR2032 (3.0V) | ✅ | ✅ | ✅ | ⚠️ Dim | ⚠️ Dim |
| 9V | ✅ | ✅ | ✅ | ✅ | ✅ |

**Note**: "⚠️ Dim" means the voltage is barely above Vf, so the LED will light but very dimly.

### Minimum Resistor by Configuration

To avoid overcurrent (>30mA), minimum resistor values:

| Battery | Red LED | White LED |
|---------|---------|-----------|
| 2×AA (3.0V) | 33Ω | ~0Ω (barely works) |
| 3×AA (4.5V) | 82Ω | 43Ω |
| 9V | 230Ω | 193Ω |

---

## Example Configurations

### Configuration A: "Compact Keychain"
- Battery: CR2032
- LED: Red
- Resistor: 47Ω
- Reflector: None
- Switch: Side slide

**Metrics**:
- Current: 21mA
- Brightness: 49/100
- Battery Life: 8 hours
- Efficiency: 67%

### Configuration B: "Practical Everyday"
- Battery: 2×AA
- LED: White
- Resistor: 100Ω
- Reflector: Orange peel
- Switch: Tail push

**Metrics**:
- Current: ~0mA (won't work well - Vsource ≈ Vled)
- *Need 3×AA for white LED*

### Configuration C: "Efficient White"
- Battery: 3×AA
- LED: White
- Resistor: 68Ω
- Reflector: TIR optic
- Switch: Tail push

**Metrics**:
- Current: 19mA
- Brightness: 77/100
- Battery Life: 99 hours
- Efficiency: 71%

### Configuration D: "Long Runtime"
- Battery: 2×AA
- LED: Green
- Resistor: 220Ω
- Reflector: Textured
- Switch: Twist head

**Metrics**:
- Current: 4mA
- Brightness: 13/100
- Battery Life: 469 hours
- Efficiency: 73%

---

## Data Sources

- LED specs: Vishay, Cree, Kingbright datasheets
- Battery specs: Energizer, Duracell technical data
- Resistor values: E12 standard series (IEC 60063)
- General electronics: "The Art of Electronics" by Horowitz & Hill

---

## Status

✅ Complete - All component data ready for state model implementation















