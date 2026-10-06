// Component specifications from research
// Source: research/COMPONENT-DATA.md

export const LED_SPECS = {
  red: {
    id: "red",
    name: "Red LED",
    forwardVoltage: 2.0,
    maxCurrent: 30,
    typicalCurrent: 20,
    colorFactor: 0.7,
    wavelength: "625nm",
    hexColor: "#FF3333",
    description: "Classic red — lowest voltage requirement, works with most batteries",
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
    description: "Warm yellow — good visibility, low voltage requirement",
  },
  green: {
    id: "green",
    name: "Green LED",
    forwardVoltage: 2.2,
    maxCurrent: 30,
    typicalCurrent: 20,
    colorFactor: 1.0,
    wavelength: "565nm",
    hexColor: "#33FF33",
    description: "Bright green — human eye most sensitive, appears brightest",
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
    description: "Cool blue — needs higher voltage, distinctive color",
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
    description: "Pure white — most practical, needs higher voltage",
  },
} as const;

export const BATTERY_SPECS = {
  "1xAA": {
    id: "1xAA",
    name: "Single AA",
    voltage: 1.5,
    capacity: 2500,
    formFactor: "cylindrical",
    dimensions: { length: 50, diameter: 14 },
    weight: 23,
    description: "Compact but low voltage — only works with red/yellow LEDs",
  },
  "2xAA": {
    id: "2xAA",
    name: "2× AA (Series)",
    voltage: 3.0,
    capacity: 2500,
    formFactor: "cylindrical",
    dimensions: { length: 100, diameter: 14 },
    weight: 46,
    description: "Common flashlight config — works with most LEDs",
  },
  "3xAA": {
    id: "3xAA",
    name: "3× AA (Series)",
    voltage: 4.5,
    capacity: 2500,
    formFactor: "cylindrical",
    dimensions: { length: 150, diameter: 14 },
    weight: 69,
    description: "High voltage headroom — best efficiency with white/blue LEDs",
  },
  CR2032: {
    id: "CR2032",
    name: "CR2032 Coin Cell",
    voltage: 3.0,
    capacity: 220,
    formFactor: "disc",
    dimensions: { diameter: 20, thickness: 3.2 },
    weight: 3,
    description: "Ultra compact — short runtime but very small form factor",
  },
  "9V": {
    id: "9V",
    name: "9V Battery",
    voltage: 9.0,
    capacity: 550,
    formFactor: "rectangular",
    dimensions: { length: 48, width: 26, height: 17 },
    weight: 46,
    description: "High voltage — significant power lost in resistor",
  },
} as const;

export const RESISTOR_VALUES = [47, 68, 100, 150, 220, 330, 470, 680, 1000] as const;

export const REFLECTOR_SPECS = {
  none: {
    id: "none",
    name: "No Reflector",
    factor: 0.3,
    beamAngle: 120,
    description: "Raw LED output — very wide, unfocused beam",
  },
  textured: {
    id: "textured",
    name: "Textured Reflector",
    factor: 0.6,
    beamAngle: 60,
    description: "Flood pattern — even light distribution for close work",
  },
  orangePeel: {
    id: "orangePeel",
    name: "Orange Peel",
    factor: 1.0,
    beamAngle: 30,
    description: "Balanced beam — good spot with smooth edges",
  },
  smooth: {
    id: "smooth",
    name: "Smooth Parabolic",
    factor: 1.8,
    beamAngle: 10,
    description: "Tight spot — maximum throw distance, focused beam",
  },
  tir: {
    id: "tir",
    name: "TIR Optic Lens",
    factor: 2.0,
    beamAngle: 15,
    description: "High efficiency optic — crisp beam, minimal spill",
  },
} as const;

export const SWITCH_SPECS = {
  slideBody: {
    id: "slideBody",
    name: "Side Slide Switch",
    position: "body" as const,
    type: "latching" as const,
    currentRating: 1.0,
    description: "Simple on/off — slide to toggle",
  },
  pushTail: {
    id: "pushTail",
    name: "Tail Push Button",
    position: "tail" as const,
    type: "latching" as const,
    currentRating: 2.0,
    description: "Tactical style — click on, click off",
  },
  momentaryTail: {
    id: "momentaryTail",
    name: "Momentary Tail",
    position: "tail" as const,
    type: "momentary" as const,
    currentRating: 2.0,
    description: "Signaling mode — on only while pressed",
  },
  twistHead: {
    id: "twistHead",
    name: "Twist Head",
    position: "head" as const,
    type: "latching" as const,
    currentRating: 3.0,
    description: "Simple twist action — no moving parts exposed",
  },
} as const;

export type LEDColor = keyof typeof LED_SPECS;
export type BatteryType = keyof typeof BATTERY_SPECS;
export type ReflectorType = keyof typeof REFLECTOR_SPECS;
export type SwitchType = keyof typeof SWITCH_SPECS;














