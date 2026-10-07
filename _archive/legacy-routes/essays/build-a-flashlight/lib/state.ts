// State model for the Flashlight Builder
// Based on SPEC.md Section 5: State Model

import type { LEDColor, BatteryType, ReflectorType, SwitchType } from "./components";
import { computeMetrics } from "./simulation";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface PartState {
  id: string;
  selected: boolean;
  assembled: boolean;
}

export interface LEDConfig {
  color: LEDColor;
  forwardVoltage: number;
}

export interface BatteryConfig {
  type: BatteryType;
  voltage: number;
  capacity: number;
}

export interface ResistorConfig {
  value: number;
}

export interface ReflectorConfig {
  type: ReflectorType;
  beamAngle: number;
}

export interface SwitchConfig {
  type: SwitchType;
  position: "body" | "tail" | "head";
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  type: "wire" | "contact";
  complete: boolean;
}

export interface Metrics {
  current: number;
  brightness: number;
  batteryLife: number;
  efficiency: number;
  heat: number;
  beamIntensity: number;
  score: number;
  working: boolean;
  error?: string;
}

export interface Progress {
  currentStep: number;
  completedSteps: string[];
  startedAt: number | null;
  completedAt: number | null;
}

export interface Preferences {
  reducedMotion: boolean;
  highContrast: boolean;
}

export interface FlashlightState {
  parts: {
    battery: PartState;
    led: PartState;
    resistor: PartState;
    reflector: PartState;
    switch: PartState;
  };
  config: {
    led: LEDConfig;
    battery: BatteryConfig;
    resistor: ResistorConfig;
    reflector: ReflectorConfig;
    switch: SwitchConfig;
    tested: boolean;
  };
  connections: Connection[];
  metrics: Metrics;
  progress: Progress;
  preferences: Preferences;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

// Create initial state with computed metrics
const createInitialState = (): FlashlightState => {
  const baseState: FlashlightState = {
    parts: {
      battery: { id: "battery-1", selected: false, assembled: false },
      led: { id: "led-1", selected: false, assembled: false },
      resistor: { id: "resistor-1", selected: false, assembled: false },
      reflector: { id: "reflector-1", selected: false, assembled: false },
      switch: { id: "switch-1", selected: false, assembled: false },
    },
    config: {
    led: { color: "green", forwardVoltage: 2.2 },
    battery: { type: "2xAA", voltage: 3.0, capacity: 2500 },
      resistor: { value: 100 },
      reflector: { type: "orangePeel", beamAngle: 30 },
      switch: { type: "pushTail", position: "tail" },
      tested: false,
    },
    connections: [],
    metrics: {
      current: 0,
      brightness: 0,
      batteryLife: 0,
      efficiency: 0,
      heat: 0,
      beamIntensity: 0,
      score: 0,
      working: false,
    },
    progress: {
      currentStep: 1,
      completedSteps: [],
      startedAt: null,
      completedAt: null,
    },
    preferences: {
      reducedMotion: false,
      highContrast: false,
    },
  };
  
  // Compute initial metrics based on default config
  return {
    ...baseState,
    metrics: computeMetrics(baseState),
  };
};

export const initialState: FlashlightState = createInitialState();

// ============================================================================
// ACTIONS
// ============================================================================

export type Action =
  | { type: "SELECT_LED"; color: LEDColor; forwardVoltage: number }
  | { type: "SELECT_BATTERY"; batteryType: BatteryType; voltage: number; capacity: number }
  | { type: "SET_RESISTOR"; value: number }
  | { type: "SELECT_REFLECTOR"; reflectorType: ReflectorType; beamAngle: number }
  | { type: "SELECT_SWITCH"; switchType: SwitchType; position: "body" | "tail" | "head" }
  | { type: "ASSEMBLE_PART"; partId: keyof FlashlightState["parts"] }
  | { type: "ADD_CONNECTION"; connection: Connection }
  | { type: "TEST_CIRCUIT" }
  | { type: "SET_STEP"; step: number }
  | { type: "COMPLETE_STEP"; stepId: string }
  | { type: "SET_PREFERENCES"; preferences: Partial<Preferences> }
  | { type: "RESET" }
  | { type: "RESTORE"; state: FlashlightState };

// ============================================================================
// REDUCER
// ============================================================================

export function reducer(state: FlashlightState, action: Action): FlashlightState {
  let newState: FlashlightState;

  switch (action.type) {
    case "SELECT_LED":
      newState = {
        ...state,
        parts: {
          ...state.parts,
          led: { ...state.parts.led, selected: true },
        },
        config: {
          ...state.config,
          led: { color: action.color, forwardVoltage: action.forwardVoltage },
        },
      };
      break;

    case "SELECT_BATTERY":
      newState = {
        ...state,
        parts: {
          ...state.parts,
          battery: { ...state.parts.battery, selected: true },
        },
        config: {
          ...state.config,
          battery: {
            type: action.batteryType,
            voltage: action.voltage,
            capacity: action.capacity,
          },
        },
      };
      break;

    case "SET_RESISTOR":
      newState = {
        ...state,
        parts: {
          ...state.parts,
          resistor: { ...state.parts.resistor, selected: true },
        },
        config: {
          ...state.config,
          resistor: { value: action.value },
        },
      };
      break;

    case "SELECT_REFLECTOR":
      newState = {
        ...state,
        parts: {
          ...state.parts,
          reflector: { ...state.parts.reflector, selected: true },
        },
        config: {
          ...state.config,
          reflector: { type: action.reflectorType, beamAngle: action.beamAngle },
        },
      };
      break;

    case "SELECT_SWITCH":
      newState = {
        ...state,
        parts: {
          ...state.parts,
          switch: { ...state.parts.switch, selected: true },
        },
        config: {
          ...state.config,
          switch: { type: action.switchType, position: action.position },
        },
      };
      break;

    case "ASSEMBLE_PART":
      newState = {
        ...state,
        parts: {
          ...state.parts,
          [action.partId]: { ...state.parts[action.partId], assembled: true },
        },
      };
      break;

    case "ADD_CONNECTION":
      newState = {
        ...state,
        connections: [...state.connections, action.connection],
      };
      break;

    case "TEST_CIRCUIT":
      newState = {
        ...state,
        config: { ...state.config, tested: true },
      };
      break;

    case "SET_STEP":
      newState = {
        ...state,
        progress: {
          ...state.progress,
          currentStep: action.step,
          startedAt: state.progress.startedAt || Date.now(),
        },
      };
      break;

    case "COMPLETE_STEP":
      newState = {
        ...state,
        progress: {
          ...state.progress,
          completedSteps: state.progress.completedSteps.includes(action.stepId)
            ? state.progress.completedSteps
            : [...state.progress.completedSteps, action.stepId],
        },
      };
      break;

    case "SET_PREFERENCES":
      newState = {
        ...state,
        preferences: { ...state.preferences, ...action.preferences },
      };
      break;

    case "RESET":
      newState = {
        ...initialState,
        preferences: state.preferences, // Preserve user preferences
      };
      break;

    case "RESTORE":
      newState = action.state;
      break;

    default:
      newState = state;
  }

  // Always recompute metrics after state change
  return {
    ...newState,
    metrics: computeMetrics(newState),
  };
}

// ============================================================================
// PERSISTENCE
// ============================================================================

const STORAGE_KEY = "esy-flashlight-builder";

export function saveState(state: FlashlightState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.warn("Could not save state to localStorage");
  }
}

export function loadState(): FlashlightState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}

export function exportState(state: FlashlightState): string {
  return JSON.stringify(state, null, 2);
}

export function importState(json: string): FlashlightState | null {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// ============================================================================
// STEP DEFINITIONS
// ============================================================================

// Note: Assembly step (drag-drop) is planned for v2
// Current implementation has 9 steps
export const STEPS = [
  { id: "intro", number: 1, title: "Meet the Components" },
  { id: "led", number: 2, title: "Choose Your Light" },
  { id: "battery", number: 3, title: "Power Source" },
  { id: "resistor", number: 4, title: "The Sacrifice" },
  { id: "tradeoff", number: 5, title: "The Tradeoff Explorer" },
  { id: "reflector", number: 6, title: "Shaping the Beam" },
  { id: "switch", number: 7, title: "Control" },
  { id: "test", number: 8, title: "Test & Diagnose" },
  { id: "complete", number: 9, title: "Your Flashlight" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

