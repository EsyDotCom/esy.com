"use client";

import { FlashlightState } from "../lib/state";
import { LED_SPECS, BATTERY_SPECS, REFLECTOR_SPECS, SWITCH_SPECS } from "../lib/components";

interface DigitalTwinProps {
  state: FlashlightState;
  isOn?: boolean;
}

/**
 * SVG-based digital twin visualization of the flashlight.
 * Updates programmatically based on configuration state.
 */
export function DigitalTwin({ state, isOn = false }: DigitalTwinProps) {
  const { config, parts, metrics } = state;
  const led = LED_SPECS[config.led.color];
  const battery = BATTERY_SPECS[config.battery.type];
  const reflector = REFLECTOR_SPECS[config.reflector.type];
  const switchSpec = SWITCH_SPECS[config.switch.type];

  // Calculate visual properties
  const ledGlowRadius = isOn && metrics.working ? 20 + metrics.brightness * 0.3 : 0;
  const ledGlowOpacity = isOn && metrics.working ? 0.2 + metrics.brightness * 0.005 : 0;

  return (
    <svg
      viewBox="0 0 400 300"
      className="fb-digital-twin"
      role="img"
      aria-label={`Digital twin of your flashlight: ${led.name}, ${battery.name}, ${reflector.name}`}
    >
      {/* Background */}
      <rect x="0" y="0" width="400" height="300" className="fb-twin-bg" rx="12" />

      {/* Grid lines for technical feel */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(79, 209, 197, 0.05)" strokeWidth="0.5" />
        </pattern>
        {/* LED glow gradient */}
        <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={led.hexColor} stopOpacity={ledGlowOpacity} />
          <stop offset="100%" stopColor={led.hexColor} stopOpacity="0" />
        </radialGradient>
        {/* Battery gradient */}
        <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a4a52" />
          <stop offset="50%" stopColor="#3a3a42" />
          <stop offset="100%" stopColor="#2a2a32" />
        </linearGradient>
        {/* Reflector gradient */}
        <linearGradient id="reflectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#888" />
          <stop offset="50%" stopColor="#aaa" />
          <stop offset="100%" stopColor="#888" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#grid)" />

      {/* Flashlight body container */}
      <g transform="translate(50, 100)">
        {/* BATTERY HOUSING */}
        <g className={`fb-twin-part ${parts.battery.assembled ? "assembled" : "ghosted"}`}>
          <rect
            x="20"
            y="40"
            width={battery.formFactor === "disc" ? 60 : 120}
            height="50"
            rx="8"
            fill="url(#batteryGrad)"
            stroke="#555"
            strokeWidth="2"
          />
          {/* Battery terminals */}
          <rect x="10" y="55" width="10" height="20" rx="2" fill="#666" />
          {battery.formFactor !== "disc" && (
            <rect x="140" y="55" width="10" height="20" rx="2" fill="#666" />
          )}
          {/* Battery label */}
          <text x="75" y="70" textAnchor="middle" className="fb-twin-annotation">
            {battery.voltage}V
          </text>
        </g>

        {/* RESISTOR */}
        <g
          className={`fb-twin-part ${parts.resistor.assembled ? "assembled" : "ghosted"}`}
          transform="translate(160, 50)"
        >
          <rect x="0" y="10" width="40" height="20" rx="4" fill="#1a1a22" stroke="#555" strokeWidth="1" />
          {/* Resistor color bands (simplified) */}
          <rect x="8" y="10" width="4" height="20" fill="#8b4513" />
          <rect x="16" y="10" width="4" height="20" fill="#000" />
          <rect x="24" y="10" width="4" height="20" fill="#ff0000" />
          <rect x="32" y="10" width="4" height="20" fill="#ffd700" />
          {/* Value annotation */}
          <text x="20" y="-2" textAnchor="middle" className="fb-twin-annotation">
            {config.resistor.value}Ω
          </text>
        </g>

        {/* LED */}
        <g
          className={`fb-twin-part ${parts.led.assembled ? "assembled" : "ghosted"}`}
          transform="translate(220, 40)"
        >
          {/* LED glow effect */}
          {isOn && metrics.working && (
            <circle cx="25" cy="25" r={ledGlowRadius} fill="url(#ledGlow)" />
          )}
          {/* LED dome */}
          <ellipse
            cx="25"
            cy="25"
            rx="20"
            ry="25"
            fill={isOn && metrics.working ? led.hexColor : "#2a2a35"}
            stroke={led.hexColor}
            strokeWidth="2"
            style={{
              filter: isOn && metrics.working ? `drop-shadow(0 0 10px ${led.hexColor})` : "none",
              transition: "all 0.3s ease",
            }}
          />
          {/* LED base */}
          <rect x="10" y="45" width="30" height="10" rx="2" fill="#555" />
          {/* Color annotation */}
          <text x="25" y="-8" textAnchor="middle" className="fb-twin-annotation">
            {led.name}
          </text>
        </g>

        {/* REFLECTOR */}
        <g
          className={`fb-twin-part ${parts.reflector.assembled ? "assembled" : "ghosted"}`}
          transform="translate(245, 10)"
        >
          {/* Parabolic reflector shape */}
          <path
            d="M 0 30 Q 30 -10 60 30 L 60 70 Q 30 110 0 70 Z"
            fill="none"
            stroke="url(#reflectorGrad)"
            strokeWidth="3"
          />
          {/* Inner surface lines */}
          <path d="M 5 35 Q 30 5 55 35" fill="none" stroke="#666" strokeWidth="1" />
          <path d="M 5 65 Q 30 95 55 65" fill="none" stroke="#666" strokeWidth="1" />
          {/* Beam angle indicator */}
          <text x="30" y="105" textAnchor="middle" className="fb-twin-annotation">
            {reflector.beamAngle}°
          </text>
        </g>

        {/* SWITCH */}
        <g
          className={`fb-twin-part ${parts.switch.assembled ? "assembled" : "ghosted"}`}
          transform={`translate(${switchSpec.position === "tail" ? -10 : switchSpec.position === "body" ? 70 : 280}, ${switchSpec.position === "body" ? 100 : 50})`}
        >
          {switchSpec.id === "pushTail" || switchSpec.id === "momentaryTail" ? (
            <>
              {/* Push button */}
              <circle cx="15" cy="15" r="12" fill="#333" stroke="#555" strokeWidth="2" />
              <circle cx="15" cy="15" r="8" fill={isOn ? "#4fd1c5" : "#222"} />
            </>
          ) : switchSpec.id === "slideBody" ? (
            <>
              {/* Slide switch */}
              <rect x="0" y="0" width="30" height="15" rx="3" fill="#333" stroke="#555" strokeWidth="1" />
              <rect x={isOn ? 15 : 2} y="2" width="13" height="11" rx="2" fill={isOn ? "#4fd1c5" : "#555"} />
            </>
          ) : (
            <>
              {/* Twist head indicator */}
              <circle cx="15" cy="15" r="10" fill="none" stroke="#555" strokeWidth="2" strokeDasharray="3 2" />
              <path d="M 10 15 L 20 15 M 15 10 L 15 20" stroke={isOn ? "#4fd1c5" : "#555"} strokeWidth="2" />
            </>
          )}
        </g>

        {/* CIRCUIT CONNECTIONS (wires) */}
        <g className="fb-twin-wires">
          {/* Battery to Resistor */}
          <path
            d="M 150 65 L 160 65"
            className={`fb-twin-wire ${parts.battery.assembled && parts.resistor.assembled ? "complete" : ""}`}
          />
          {/* Resistor to LED */}
          <path
            d="M 200 65 L 220 65"
            className={`fb-twin-wire ${parts.resistor.assembled && parts.led.assembled ? "complete" : ""}`}
          />
          {/* LED to Switch (return path) */}
          <path
            d="M 245 90 L 245 120 L 20 120 L 20 75"
            className={`fb-twin-wire ${parts.led.assembled && parts.switch.assembled ? "complete" : ""}`}
          />
        </g>
      </g>

      {/* STATUS INDICATOR */}
      <g transform="translate(20, 20)">
        <circle cx="8" cy="8" r="6" fill={metrics.working ? "#69db7c" : "#ff6b6b"} />
        <text x="22" y="12" fill={metrics.working ? "#69db7c" : "#ff6b6b"} fontSize="10" fontFamily="monospace">
          {metrics.working ? "CIRCUIT OK" : "INCOMPLETE"}
        </text>
      </g>

      {/* CURRENT FLOW INDICATOR (when on) */}
      {isOn && metrics.working && (
        <g transform="translate(330, 20)">
          <text textAnchor="end" fill="#ffd43b" fontSize="12" fontFamily="monospace">
            {metrics.current}mA
          </text>
          <text y="16" textAnchor="end" fill="#666" fontSize="9" fontFamily="monospace">
            flowing
          </text>
        </g>
      )}
    </svg>
  );
}

export default DigitalTwin;

