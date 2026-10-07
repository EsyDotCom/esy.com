"use client";

import { Metrics } from "../lib/state";

interface TradeoffExplorerProps {
  metrics: Metrics;
}

/**
 * Visual tradeoff explorer showing the relationship between
 * brightness, battery life, and efficiency.
 */
export function TradeoffExplorer({ metrics }: TradeoffExplorerProps) {
  const { brightness, batteryLife, efficiency, score, working } = metrics;

  // Normalize battery life to 0-100 scale (cap at 200 hours)
  const batteryNorm = Math.min(100, (batteryLife / 200) * 100);

  return (
    <div className="fb-interaction">
      <div className="fb-interaction-label">
        <span>Configuration Tradeoffs</span>
        <span className="fb-interaction-value">Score: {score}/100</span>
      </div>

      {!working ? (
        <div
          style={{
            padding: "var(--fb-spacing-xl)",
            textAlign: "center",
            color: "var(--fb-text-muted)",
          }}
        >
          <p>Complete your circuit to see tradeoffs</p>
        </div>
      ) : (
        <>
          {/* Triangle visualization */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "200px",
              marginBottom: "var(--fb-spacing-lg)",
            }}
          >
            <svg viewBox="0 0 200 180" style={{ width: "100%", height: "100%" }}>
              {/* Triangle outline */}
              <path d="M 100 10 L 190 170 L 10 170 Z" fill="none" stroke="var(--fb-border-color)" strokeWidth="2" />

              {/* Triangle fill based on metrics */}
              <path
                d={`M 100 ${10 + (100 - efficiency) * 1.6} 
                    L ${100 + (brightness / 100) * 90} ${170 - (batteryNorm / 100) * 80} 
                    L ${100 - (brightness / 100) * 90} ${170 - (batteryNorm / 100) * 80} Z`}
                fill="rgba(79, 209, 197, 0.3)"
                stroke="var(--fb-accent-primary)"
                strokeWidth="2"
              />

              {/* Labels */}
              <text x="100" y="5" textAnchor="middle" fill="var(--fb-accent-primary)" fontSize="10">
                EFFICIENCY
              </text>
              <text x="195" y="180" textAnchor="end" fill="var(--fb-accent-secondary)" fontSize="10">
                BRIGHTNESS
              </text>
              <text x="5" y="180" textAnchor="start" fill="var(--fb-accent-success)" fontSize="10">
                BATTERY LIFE
              </text>

              {/* Center dot */}
              <circle cx="100" cy="120" r="4" fill="var(--fb-text-primary)" />
            </svg>
          </div>

          {/* Metric bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--fb-spacing-md)" }}>
            {/* Brightness */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "var(--fb-spacing-xs)",
                  fontSize: "0.75rem",
                }}
              >
                <span style={{ color: "var(--fb-accent-secondary)" }}>Brightness</span>
                <span style={{ fontFamily: "var(--fb-font-mono)", color: "var(--fb-accent-secondary)" }}>
                  {brightness}%
                </span>
              </div>
              <div
                style={{
                  height: "8px",
                  background: "var(--fb-bg-tertiary)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${brightness}%`,
                    height: "100%",
                    background: "var(--fb-accent-secondary)",
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>

            {/* Battery Life */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "var(--fb-spacing-xs)",
                  fontSize: "0.75rem",
                }}
              >
                <span style={{ color: "var(--fb-accent-success)" }}>Battery Life</span>
                <span style={{ fontFamily: "var(--fb-font-mono)", color: "var(--fb-accent-success)" }}>
                  {batteryLife}h
                </span>
              </div>
              <div
                style={{
                  height: "8px",
                  background: "var(--fb-bg-tertiary)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${batteryNorm}%`,
                    height: "100%",
                    background: "var(--fb-accent-success)",
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>

            {/* Efficiency */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "var(--fb-spacing-xs)",
                  fontSize: "0.75rem",
                }}
              >
                <span style={{ color: "var(--fb-accent-primary)" }}>Efficiency</span>
                <span style={{ fontFamily: "var(--fb-font-mono)", color: "var(--fb-accent-primary)" }}>
                  {efficiency}%
                </span>
              </div>
              <div
                style={{
                  height: "8px",
                  background: "var(--fb-bg-tertiary)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${efficiency}%`,
                    height: "100%",
                    background: "var(--fb-accent-primary)",
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="fb-notice" style={{ marginTop: "var(--fb-spacing-lg)", marginBottom: 0 }}>
            <div className="fb-notice-label">The Engineering Reality</div>
            <p>
              {brightness >= 70 && batteryLife < 50
                ? "You've optimized for brightness. Great for short bursts, but keep spare batteries handy."
                : batteryLife >= 100 && brightness < 40
                  ? "You've prioritized runtime. Perfect for emergencies or camping where brightness matters less."
                  : efficiency >= 70
                    ? "Your circuit is highly efficient — minimal power wasted as heat in the resistor."
                    : "A balanced configuration. Jack of all trades, master of none — sometimes that's exactly right."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default TradeoffExplorer;














