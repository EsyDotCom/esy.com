// Simulation logic from research/FORMULAS.md
// Computes derived metrics from configuration state

import { LED_SPECS, BATTERY_SPECS, REFLECTOR_SPECS } from "./components";
import type { FlashlightState, Metrics } from "./state";

/**
 * Compute all metrics from the current configuration state.
 * Based on Ohm's Law and simplified physics models.
 * 
 * Key formulas:
 * - Current: I = (V_source - V_led) / R
 * - Power: P = V × I
 * - Efficiency: η = V_led / V_source
 * - Battery Life: t = Capacity / I
 */
export function computeMetrics(state: FlashlightState): Metrics {
  const { led, battery, resistor, reflector } = state.config;

  // Get component specifications
  const ledSpec = LED_SPECS[led.color];
  const batterySpec = BATTERY_SPECS[battery.type];
  const reflectorSpec = REFLECTOR_SPECS[reflector.type];

  const V_source = batterySpec.voltage;
  const V_led = ledSpec.forwardVoltage;
  const R = resistor.value;
  const capacity = batterySpec.capacity;

  // Check if circuit works (voltage must exceed LED forward voltage)
  if (V_source <= V_led) {
    return {
      current: 0,
      brightness: 0,
      batteryLife: Infinity,
      efficiency: 0,
      heat: 0,
      beamIntensity: 0,
      score: 0,
      working: false,
      error: `Insufficient voltage: ${V_source}V battery cannot drive ${V_led}V LED`,
    };
  }

  // Calculate current using Ohm's Law: I = (V_source - V_led) / R
  // Convert to mA for display
  const current = ((V_source - V_led) / R) * 1000;

  // Check for overcurrent (LED max is typically 30mA)
  const isOvercurrent = current > ledSpec.maxCurrent;
  const safeCurrent = Math.min(current, 50); // Cap for calculations

  // Brightness (0-100 scale)
  // Scales with current, adjusted by color factor (human eye sensitivity)
  const brightness = Math.min(100, (safeCurrent / 30) * ledSpec.colorFactor * 100);

  // Battery life in hours
  // Real-world factor of 0.75 accounts for voltage drop and internal resistance
  const batteryLife = current > 0 ? (capacity * 0.75) / current : Infinity;

  // Efficiency: ratio of LED voltage to source voltage
  // Higher efficiency means less power wasted in resistor
  const efficiency = (V_led / V_source) * 100;

  // Heat dissipation in resistor (mW)
  // P_resistor = (V_source - V_led) × I
  const heat = (V_source - V_led) * (current / 1000) * 1000;

  // Beam intensity: brightness × reflector concentration factor
  const beamIntensity = brightness * reflectorSpec.factor;

  // Overall score: weighted combination
  // Prioritizes balance between brightness, battery life, and efficiency
  const batteryLifeNorm = Math.min(100, (batteryLife / 100) * 100);
  const score =
    brightness * 0.3 +
    batteryLifeNorm * 0.3 +
    efficiency * 0.2 +
    Math.min(100, beamIntensity) * 0.2;

  return {
    current: Math.round(current * 10) / 10,
    brightness: Math.round(brightness),
    batteryLife: Math.round(batteryLife),
    efficiency: Math.round(efficiency),
    heat: Math.round(heat),
    beamIntensity: Math.round(beamIntensity),
    score: Math.round(score),
    working: current > 0 && !isOvercurrent,
    error: isOvercurrent
      ? `Overcurrent warning: ${current.toFixed(1)}mA exceeds LED maximum of ${ledSpec.maxCurrent}mA`
      : undefined,
  };
}

/**
 * Check if a battery can drive a specific LED color
 */
export function canDriveLED(
  batteryType: keyof typeof BATTERY_SPECS,
  ledColor: keyof typeof LED_SPECS
): { canDrive: boolean; margin: number; warning?: string } {
  const battery = BATTERY_SPECS[batteryType];
  const led = LED_SPECS[ledColor];

  const margin = battery.voltage - led.forwardVoltage;

  if (margin <= 0) {
    return {
      canDrive: false,
      margin,
      warning: `${battery.voltage}V is not enough to drive a ${led.forwardVoltage}V ${led.name}`,
    };
  }

  if (margin < 0.3) {
    return {
      canDrive: true,
      margin,
      warning: `Marginal: only ${margin.toFixed(1)}V headroom — LED will be dim`,
    };
  }

  return { canDrive: true, margin };
}

/**
 * Calculate the ideal resistor value for a target current
 */
export function calculateIdealResistor(
  batteryType: keyof typeof BATTERY_SPECS,
  ledColor: keyof typeof LED_SPECS,
  targetCurrentMA: number = 20
): number {
  const battery = BATTERY_SPECS[batteryType];
  const led = LED_SPECS[ledColor];

  const voltageDrop = battery.voltage - led.forwardVoltage;
  if (voltageDrop <= 0) return Infinity;

  return (voltageDrop / (targetCurrentMA / 1000)) ;
}

/**
 * Get a descriptive label based on the configuration's characteristics
 */
export function getConfigurationLabel(metrics: Metrics): string {
  if (!metrics.working) return "Not Working";

  const { brightness, batteryLife, efficiency } = metrics;

  // Determine dominant characteristic
  if (brightness >= 70 && batteryLife < 50) return "The Spotlight";
  if (batteryLife >= 150 && brightness < 40) return "The Marathon Runner";
  if (efficiency >= 70 && brightness >= 50) return "The Efficient";
  if (brightness >= 50 && batteryLife >= 80) return "The Balanced";
  if (brightness < 30) return "The Dim Survivor";

  return "Custom Build";
}














