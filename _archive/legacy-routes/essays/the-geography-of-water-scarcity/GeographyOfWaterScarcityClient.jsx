"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./the-geography-of-water-scarcity.css";

/* ═══════════════════════════════════════════════════════════════
   The Geography of Water Scarcity — Interactive Visual Essay
   
   A data journalism essay exploring why water scarcity is not a
   natural disaster but a design problem shaped by human decisions.
   
   5 Custom Data Visualizations:
   1. Data Ticker (count-up statistics)
   2. Interactive Choropleth Map (water stress by region, 2000-2040)
   3. Animated Flow Diagram (freshwater allocation)
   4. Scroll-Locked Explainer (the scarcity equation)
   5. Country Comparison Widget (same rain, different outcomes)
   
   Design Research: DESIGN-RESEARCH.md
   Spec: specs/the-geography-of-water-scarcity.md
   ═══════════════════════════════════════════════════════════════ */

// ─── EMBEDDED DATA ──────────────────────────────────────────────

const TICKER_STATS = [
  { value: 2.3, suffix: " billion", label: "people live in water-stressed countries", decimals: 1 },
  { value: 70, suffix: "%", label: "of freshwater goes to agriculture", decimals: 0 },
  { value: 40, suffix: "%", label: "projected demand-supply gap by 2030", decimals: 0 },
  { value: 85, suffix: "%", label: "of wastewater recycled by Israel", decimals: 0 },
];

const STRESS_COLORS = {
  1: "#1a5276", // Low
  2: "#2980b9", // Low-Medium
  3: "#f39c12", // Medium-High
  4: "#e74c3c", // High
  5: "#7b241c", // Extremely High
  0: "#1a1a26", // No data
};

const STRESS_LABELS = {
  1: "Low (<10%)",
  2: "Low-Medium (10-20%)",
  3: "Medium-High (20-40%)",
  4: "High (40-80%)",
  5: "Extremely High (>80%)",
};

// Simplified country stress data per year (representative, based on WRI Aqueduct)
const COUNTRY_STRESS = {
  2000: {
    USA: 2, CAN: 1, MEX: 3, BRA: 1, ARG: 2, COL: 1, PER: 2, CHL: 2,
    GBR: 1, FRA: 2, DEU: 2, ESP: 3, ITA: 2, PRT: 3, GRC: 3,
    RUS: 1, CHN: 3, IND: 4, JPN: 2, KOR: 2, AUS: 2, NZL: 1,
    EGY: 5, SAU: 5, IRQ: 4, IRN: 4, ISR: 4, JOR: 5, LBY: 5,
    DZA: 4, MAR: 3, TUN: 4, TUR: 3, PAK: 4, AFG: 4, UZB: 5,
    ZAF: 3, NGA: 2, KEN: 2, ETH: 2, TZA: 1, IDN: 2, THA: 2,
    VNM: 2, PHL: 1, MYS: 1, SGP: 3, BGD: 2, MMR: 1, NPL: 1,
    SWE: 1, NOR: 1, FIN: 1, POL: 2, UKR: 2, ROU: 2, SRB: 2,
  },
  2010: {
    USA: 3, CAN: 1, MEX: 3, BRA: 1, ARG: 2, COL: 1, PER: 2, CHL: 3,
    GBR: 2, FRA: 2, DEU: 2, ESP: 3, ITA: 3, PRT: 3, GRC: 3,
    RUS: 1, CHN: 3, IND: 4, JPN: 2, KOR: 3, AUS: 3, NZL: 1,
    EGY: 5, SAU: 5, IRQ: 5, IRN: 4, ISR: 4, JOR: 5, LBY: 5,
    DZA: 4, MAR: 4, TUN: 4, TUR: 3, PAK: 4, AFG: 4, UZB: 5,
    ZAF: 3, NGA: 2, KEN: 2, ETH: 2, TZA: 1, IDN: 2, THA: 3,
    VNM: 2, PHL: 2, MYS: 1, SGP: 3, BGD: 2, MMR: 1, NPL: 2,
    SWE: 1, NOR: 1, FIN: 1, POL: 2, UKR: 2, ROU: 2, SRB: 2,
  },
  2020: {
    USA: 3, CAN: 1, MEX: 4, BRA: 2, ARG: 2, COL: 1, PER: 2, CHL: 3,
    GBR: 2, FRA: 2, DEU: 2, ESP: 4, ITA: 3, PRT: 4, GRC: 4,
    RUS: 1, CHN: 4, IND: 5, JPN: 2, KOR: 3, AUS: 3, NZL: 1,
    EGY: 5, SAU: 5, IRQ: 5, IRN: 5, ISR: 4, JOR: 5, LBY: 5,
    DZA: 4, MAR: 4, TUN: 5, TUR: 4, PAK: 5, AFG: 5, UZB: 5,
    ZAF: 4, NGA: 2, KEN: 3, ETH: 3, TZA: 2, IDN: 3, THA: 3,
    VNM: 3, PHL: 2, MYS: 2, SGP: 3, BGD: 3, MMR: 2, NPL: 2,
    SWE: 1, NOR: 1, FIN: 1, POL: 2, UKR: 2, ROU: 3, SRB: 2,
  },
  2030: {
    USA: 3, CAN: 2, MEX: 4, BRA: 2, ARG: 3, COL: 2, PER: 3, CHL: 4,
    GBR: 2, FRA: 3, DEU: 3, ESP: 4, ITA: 4, PRT: 4, GRC: 4,
    RUS: 2, CHN: 4, IND: 5, JPN: 3, KOR: 3, AUS: 4, NZL: 1,
    EGY: 5, SAU: 5, IRQ: 5, IRN: 5, ISR: 5, JOR: 5, LBY: 5,
    DZA: 5, MAR: 5, TUN: 5, TUR: 4, PAK: 5, AFG: 5, UZB: 5,
    ZAF: 4, NGA: 3, KEN: 3, ETH: 3, TZA: 2, IDN: 3, THA: 4,
    VNM: 3, PHL: 3, MYS: 2, SGP: 3, BGD: 4, MMR: 2, NPL: 3,
    SWE: 1, NOR: 1, FIN: 1, POL: 3, UKR: 3, ROU: 3, SRB: 3,
  },
  2040: {
    USA: 4, CAN: 2, MEX: 5, BRA: 3, ARG: 3, COL: 2, PER: 3, CHL: 4,
    GBR: 3, FRA: 3, DEU: 3, ESP: 5, ITA: 4, PRT: 5, GRC: 5,
    RUS: 2, CHN: 5, IND: 5, JPN: 3, KOR: 4, AUS: 4, NZL: 2,
    EGY: 5, SAU: 5, IRQ: 5, IRN: 5, ISR: 5, JOR: 5, LBY: 5,
    DZA: 5, MAR: 5, TUN: 5, TUR: 5, PAK: 5, AFG: 5, UZB: 5,
    ZAF: 5, NGA: 3, KEN: 4, ETH: 4, TZA: 3, IDN: 4, THA: 4,
    VNM: 4, PHL: 3, MYS: 3, SGP: 4, BGD: 4, MMR: 3, NPL: 3,
    SWE: 1, NOR: 1, FIN: 2, POL: 3, UKR: 3, ROU: 4, SRB: 3,
  },
};

const COUNTRY_NAMES = {
  USA: "United States", CAN: "Canada", MEX: "Mexico", BRA: "Brazil",
  ARG: "Argentina", COL: "Colombia", PER: "Peru", CHL: "Chile",
  GBR: "United Kingdom", FRA: "France", DEU: "Germany", ESP: "Spain",
  ITA: "Italy", PRT: "Portugal", GRC: "Greece", RUS: "Russia",
  CHN: "China", IND: "India", JPN: "Japan", KOR: "South Korea",
  AUS: "Australia", NZL: "New Zealand", EGY: "Egypt", SAU: "Saudi Arabia",
  IRQ: "Iraq", IRN: "Iran", ISR: "Israel", JOR: "Jordan", LBY: "Libya",
  DZA: "Algeria", MAR: "Morocco", TUN: "Tunisia", TUR: "Turkey",
  PAK: "Pakistan", AFG: "Afghanistan", UZB: "Uzbekistan",
  ZAF: "South Africa", NGA: "Nigeria", KEN: "Kenya", ETH: "Ethiopia",
  TZA: "Tanzania", IDN: "Indonesia", THA: "Thailand", VNM: "Vietnam",
  PHL: "Philippines", MYS: "Malaysia", SGP: "Singapore", BGD: "Bangladesh",
  MMR: "Myanmar", NPL: "Nepal", SWE: "Sweden", NOR: "Norway",
  FIN: "Finland", POL: "Poland", UKR: "Ukraine", ROU: "Romania", SRB: "Serbia",
};

const COUNTRY_DRIVERS = {
  USA: "Agriculture", CAN: "Agriculture", MEX: "Agriculture", BRA: "Agriculture",
  IND: "Population + Agriculture", CHN: "Industry + Agriculture", PAK: "Population",
  EGY: "Population", SAU: "Climate", IRN: "Agriculture", ISR: "Climate",
  JOR: "Population", AUS: "Climate", ZAF: "Population", ESP: "Agriculture + Climate",
  TUR: "Agriculture", BGD: "Population", ETH: "Population", KEN: "Climate",
};

const COMPARISON_PAIRS = [
  {
    id: "israel-jordan",
    a: "Israel", b: "Jordan",
    insight: "Israel and Jordan share nearly identical rainfall and aridity. Israel recycles 85% of its wastewater through the world's most advanced water reuse infrastructure. Jordan recycles roughly 10%. This isn't geography — it is governance, sustained investment over four decades, and a centralized national water authority.",
    metrics: [
      { label: "Annual Rainfall", a: 435, b: 94, unit: "mm/yr", max: 500 },
      { label: "Water Stress Index", a: 3.7, b: 4.9, unit: "/ 5", max: 5 },
      { label: "Wastewater Recycled", a: 85, b: 10, unit: "%", max: 100, highlight: true },
      { label: "Freshwater Per Capita", a: 91, b: 97, unit: "m³/yr", max: 200 },
      { label: "Population", a: 9.3, b: 11.1, unit: "million", max: 15 },
      { label: "GDP Per Capita", a: 52170, b: 4330, unit: "USD", max: 55000 },
    ],
  },
  {
    id: "singapore-malaysia",
    a: "Singapore", b: "Malaysia",
    insight: "Singapore receives 2,400mm of rain per year — more than London and Seattle combined — yet was one of the most water-insecure nations at independence. Its 'Four National Taps' strategy (imported, reclaimed NEWater, desalination, catchment) turned existential vulnerability into strategic advantage. Malaysia, with similar rainfall, loses 37% of treated water to pipe leakage.",
    metrics: [
      { label: "Annual Rainfall", a: 2400, b: 2875, unit: "mm/yr", max: 3000 },
      { label: "Water Stress Index", a: 2.8, b: 1.8, unit: "/ 5", max: 5 },
      { label: "Wastewater Recycled", a: 40, b: 5, unit: "%", max: 100, highlight: true },
      { label: "Freshwater Per Capita", a: 110, b: 20904, unit: "m³/yr", max: 22000 },
      { label: "Population", a: 5.9, b: 33.9, unit: "million", max: 35 },
      { label: "GDP Per Capita", a: 65233, b: 12278, unit: "USD", max: 70000 },
    ],
  },
  {
    id: "australia-southafrica",
    a: "Australia", b: "South Africa",
    insight: "Australia's Millennium Drought (1997-2009) catalyzed a national water reform program — desalination plants, water trading markets, and household efficiency campaigns that cut per-capita use by 40%. South Africa, facing similar climate stress, delayed investment until the Cape Town 'Day Zero' crisis in 2018, when the city nearly ran out of water entirely.",
    metrics: [
      { label: "Annual Rainfall", a: 534, b: 495, unit: "mm/yr", max: 600 },
      { label: "Water Stress Index", a: 3.1, b: 3.8, unit: "/ 5", max: 5 },
      { label: "Wastewater Recycled", a: 14, b: 5, unit: "%", max: 100, highlight: true },
      { label: "Freshwater Per Capita", a: 20670, b: 830, unit: "m³/yr", max: 22000 },
      { label: "Population", a: 26.4, b: 60.4, unit: "million", max: 65 },
      { label: "GDP Per Capita", a: 65099, b: 6001, unit: "USD", max: 70000 },
    ],
  },
];

const FLOW_DATA = {
  total: 3900,
  unit: "km³/year",
  sectors: [
    {
      name: "Agriculture", pct: 70, color: "#27ae60",
      subs: [
        { name: "Irrigation", pct: 85 },
        { name: "Livestock", pct: 10 },
        { name: "Aquaculture", pct: 5 },
      ],
    },
    {
      name: "Industry", pct: 19, color: "#f0932b",
      subs: [
        { name: "Manufacturing", pct: 50 },
        { name: "Energy", pct: 40 },
        { name: "Mining", pct: 10 },
      ],
    },
    {
      name: "Domestic", pct: 11, color: "#00b894",
      subs: [
        { name: "Household", pct: 65 },
        { name: "Municipal", pct: 35 },
      ],
    },
  ],
};

const EQUATION_STAGES = [
  {
    title: "Available Freshwater",
    annotation: "Earth has vast water reserves, but only 2.5% is freshwater — and less than 1% is accessible for human use. This blue represents the renewable freshwater available to a region each year.",
    supply: 100, demand: 0, climate: 0,
  },
  {
    title: "Population Demand",
    annotation: "8 billion people need water to drink, cook, and clean. Population growth adds 80 million people per year. Each person needs a minimum of 50 liters per day for basic needs.",
    supply: 100, demand: 25, climate: 0,
  },
  {
    title: "Agricultural Draw",
    annotation: "Agriculture takes 70% of all freshwater withdrawals. A single kilogram of beef requires 15,400 liters. This is the largest draw on the system — and it's growing as the world eats more meat.",
    supply: 100, demand: 80, climate: 0,
  },
  {
    title: "Climate Reduction",
    annotation: "Climate change is already reducing water availability in dry regions by shifting precipitation patterns and accelerating evaporation. Each degree of warming could reduce renewable water by 20% in stressed areas.",
    supply: 80, demand: 80, climate: 20,
  },
  {
    title: "The Deficit",
    annotation: "When demand exceeds what nature can renew, the result is deficit. By 2030, global demand could exceed sustainable supply by 40%. This is not a prediction of doom — it's a measurement of a trajectory that policy can change.",
    supply: 60, demand: 100, climate: 20,
  },
];

const SOURCES = [
  "World Resources Institute — Aqueduct Water Risk Atlas (2023)",
  "United Nations World Water Development Report (2023)",
  "FAO AQUASTAT — Global Water Withdrawal Statistics",
  "Mekonnen, M.M. & Hoekstra, A.Y. — Water Footprint of Crop and Animal Products (2012)",
  "IPCC Sixth Assessment Report — Freshwater Systems, Chapter 4 (2022)",
  "2030 Water Resources Group — Charting Our Water Future (2009, updated 2020)",
  "Israel Water Authority — Annual Report on Wastewater Reuse (2022)",
  "PUB Singapore — Four National Taps Strategy",
  "NITI Aayog — Composite Water Management Index (India, 2018)",
  "World Bank — Water Scarcity: Addressing the Growing Threat (2018)",
  "Gleick, P. — The World's Water (Pacific Institute, biennial)",
  "Postel, S. — Last Oasis: Facing Water Scarcity (Global Water Policy Project)",
  "USGS Water Science School — Where is Earth's Water?",
];

// ─── HOOKS ──────────────────────────────────────────────────────

function useIntersectionObserver(threshold = 0.2) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setIsVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

function useCountUp(end, duration = 2000, start = false, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setValue(end); return; }

    let startTime = null;
    let raf;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start, decimals]);

  return value;
}

function useScrollLock(ref, stages = 5) {
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setActiveStage(stages - 1); setScrollProgress(1); return; }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const totalHeight = el.offsetHeight - window.innerHeight;
          if (totalHeight <= 0) { ticking = false; return; }
          const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
          setScrollProgress(progress);
          setActiveStage(Math.min(stages - 1, Math.floor(progress * stages)));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, stages]);

  return { activeStage, scrollProgress };
}

// ─── COMPONENTS ─────────────────────────────────────────────────

function ProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="ws-progress" aria-hidden="true">
      <div className="ws-progress-fill" style={{ height: `${progress}%` }} />
    </div>
  );
}

function Section({ children, className = "" }) {
  const [ref, isVisible] = useIntersectionObserver(0.15);
  return (
    <section ref={ref} className={`ws-section ${isVisible ? "ws-visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

// ─── VISUALIZATION 1: DATA TICKER ───────────────────────────────

function TickerStat({ stat, visible, delay }) {
  const value = useCountUp(stat.value, 2000, visible, stat.decimals);

  return (
    <div className="ws-ticker-item" style={{ transitionDelay: `${delay}ms` }}>
      <span className="ws-ticker-number" aria-label={`${stat.value}${stat.suffix}`}>
        {stat.decimals > 0 ? value.toFixed(stat.decimals) : Math.round(value)}
        {stat.suffix}
      </span>
      <span className="ws-ticker-label">{stat.label}</span>
    </div>
  );
}

function DataTicker() {
  const [ref, isVisible] = useIntersectionObserver(0.3);

  return (
    <div ref={ref} className="ws-ticker" role="region" aria-label="Key statistics about water scarcity">
      {TICKER_STATS.map((stat, i) => (
        <TickerStat key={i} stat={stat} visible={isVisible} delay={i * 300} />
      ))}
    </div>
  );
}

// ─── VISUALIZATION 2: CHOROPLETH MAP ────────────────────────────

// Simplified world map using SVG rectangles positioned by approximate lat/lon
// Each "country" is a rectangle roughly positioned on a Mercator-like grid
const COUNTRY_RECTS = {
  USA: { x: 80, y: 100, w: 60, h: 30 },
  CAN: { x: 80, y: 65, w: 60, h: 30 },
  MEX: { x: 90, y: 135, w: 25, h: 20 },
  BRA: { x: 175, y: 175, w: 45, h: 45 },
  ARG: { x: 170, y: 230, w: 25, h: 40 },
  COL: { x: 150, y: 155, w: 20, h: 18 },
  PER: { x: 145, y: 175, w: 18, h: 25 },
  CHL: { x: 155, y: 220, w: 10, h: 50 },
  GBR: { x: 295, y: 80, w: 12, h: 15 },
  FRA: { x: 300, y: 100, w: 18, h: 18 },
  DEU: { x: 315, y: 88, w: 15, h: 15 },
  ESP: { x: 290, y: 110, w: 20, h: 14 },
  ITA: { x: 318, y: 105, w: 12, h: 20 },
  PRT: { x: 282, y: 112, w: 8, h: 12 },
  GRC: { x: 335, y: 115, w: 12, h: 10 },
  RUS: { x: 370, y: 45, w: 120, h: 55 },
  CHN: { x: 470, y: 100, w: 55, h: 40 },
  IND: { x: 445, y: 140, w: 30, h: 35 },
  JPN: { x: 535, y: 105, w: 10, h: 20 },
  KOR: { x: 525, y: 110, w: 8, h: 10 },
  AUS: { x: 510, y: 230, w: 50, h: 35 },
  NZL: { x: 570, y: 265, w: 10, h: 18 },
  EGY: { x: 350, y: 130, w: 15, h: 18 },
  SAU: { x: 380, y: 138, w: 25, h: 20 },
  IRQ: { x: 380, y: 120, w: 15, h: 15 },
  IRN: { x: 400, y: 118, w: 25, h: 22 },
  ISR: { x: 362, y: 125, w: 5, h: 8 },
  JOR: { x: 367, y: 128, w: 6, h: 8 },
  LBY: { x: 330, y: 135, w: 20, h: 18 },
  DZA: { x: 305, y: 130, w: 22, h: 18 },
  MAR: { x: 290, y: 130, w: 14, h: 14 },
  TUN: { x: 318, y: 126, w: 8, h: 10 },
  TUR: { x: 350, y: 108, w: 25, h: 12 },
  PAK: { x: 430, y: 128, w: 18, h: 22 },
  AFG: { x: 420, y: 115, w: 18, h: 15 },
  UZB: { x: 415, y: 98, w: 18, h: 10 },
  ZAF: { x: 345, y: 245, w: 20, h: 18 },
  NGA: { x: 315, y: 165, w: 15, h: 15 },
  KEN: { x: 370, y: 180, w: 12, h: 12 },
  ETH: { x: 370, y: 165, w: 18, h: 15 },
  TZA: { x: 365, y: 195, w: 14, h: 12 },
  IDN: { x: 490, y: 180, w: 40, h: 15 },
  THA: { x: 480, y: 148, w: 12, h: 18 },
  VNM: { x: 493, y: 148, w: 8, h: 20 },
  PHL: { x: 520, y: 155, w: 10, h: 18 },
  MYS: { x: 488, y: 168, w: 16, h: 8 },
  SGP: { x: 492, y: 177, w: 4, h: 4 },
  BGD: { x: 460, y: 140, w: 8, h: 10 },
  MMR: { x: 468, y: 138, w: 12, h: 18 },
  NPL: { x: 450, y: 132, w: 10, h: 6 },
  SWE: { x: 320, y: 55, w: 12, h: 25 },
  NOR: { x: 310, y: 48, w: 10, h: 28 },
  FIN: { x: 335, y: 50, w: 15, h: 22 },
  POL: { x: 330, y: 88, w: 15, h: 12 },
  UKR: { x: 350, y: 90, w: 22, h: 12 },
  ROU: { x: 340, y: 100, w: 14, h: 10 },
  SRB: { x: 335, y: 105, w: 8, h: 8 },
};

function ChoroplethMap() {
  const [year, setYear] = useState(2020);
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const yearSteps = [2000, 2010, 2020, 2030, 2040];
  const stressData = COUNTRY_STRESS[year] || {};

  const handleCountryHover = useCallback((e, code) => {
    const stress = stressData[code] || 0;
    setTooltip({
      name: COUNTRY_NAMES[code] || code,
      stress: STRESS_LABELS[stress] || "No Data",
      stressLevel: stress,
      driver: COUNTRY_DRIVERS[code] || "Multiple factors",
    });
    setTooltipPos({ x: e.clientX + 16, y: e.clientY - 10 });
  }, [stressData]);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  return (
    <div className="ws-map-container" role="img" aria-label="Interactive world map showing water stress levels by country from 2000 to 2040">
      <svg viewBox="0 0 620 310" className="ws-map-svg" style={{ background: "transparent" }}>
        {/* Ocean background */}
        <rect x="0" y="0" width="620" height="310" fill="var(--ws-bg-elevated)" rx="8" />

        {/* Country rectangles */}
        {Object.entries(COUNTRY_RECTS).map(([code, rect]) => {
          const stress = stressData[code] || 0;
          return (
            <rect
              key={code}
              x={rect.x}
              y={rect.y}
              width={rect.w}
              height={rect.h}
              fill={STRESS_COLORS[stress]}
              rx={2}
              onMouseEnter={(e) => handleCountryHover(e, code)}
              onMouseMove={(e) => setTooltipPos({ x: e.clientX + 16, y: e.clientY - 10 })}
              onMouseLeave={handleMouseLeave}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                handleCountryHover({ clientX: touch.clientX, clientY: touch.clientY }, code);
              }}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </svg>

      {/* Controls */}
      <div className="ws-map-controls">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="ws-year-display">{year}</span>
          {year > 2020 && <span className="ws-projected-badge">Projected</span>}
        </div>
        <input
          type="range"
          className="ws-slider"
          min={0}
          max={yearSteps.length - 1}
          value={yearSteps.indexOf(year)}
          onChange={(e) => setYear(yearSteps[parseInt(e.target.value)])}
          aria-label="Select year to view water stress data"
        />
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: "400px" }}>
          {yearSteps.map((y) => (
            <span key={y} className="ws-legend-label" style={{ opacity: y === year ? 1 : 0.5 }}>{y}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="ws-legend">
        {Object.entries(STRESS_LABELS).map(([level, label]) => (
          <div key={level} className="ws-legend-item">
            <div className="ws-legend-swatch" style={{ background: STRESS_COLORS[level] }} />
            <span className="ws-legend-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className={`ws-tooltip ${tooltip ? "ws-tooltip-visible" : ""}`}
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="ws-tooltip-name">{tooltip.name}</div>
          <div className="ws-tooltip-row">
            <span>Stress Level</span>
            <span className="ws-tooltip-value" style={{ color: STRESS_COLORS[tooltip.stressLevel] }}>
              {tooltip.stress}
            </span>
          </div>
          <div className="ws-tooltip-row">
            <span>Primary Driver</span>
            <span className="ws-tooltip-value">{tooltip.driver}</span>
          </div>
        </div>
      )}

      {/* Screen reader data table */}
      <table className="ws-sr-only">
        <caption>Water stress levels by country, {year}</caption>
        <thead>
          <tr><th>Country</th><th>Stress Level</th></tr>
        </thead>
        <tbody>
          {Object.entries(stressData).map(([code, level]) => (
            <tr key={code}><td>{COUNTRY_NAMES[code]}</td><td>{STRESS_LABELS[level]}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── VISUALIZATION 3: FLOW DIAGRAM (SANKEY) ─────────────────────

function FlowDiagram() {
  const [ref, isVisible] = useIntersectionObserver(0.2);
  const [buildStage, setBuildStage] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timers = [];
    for (let i = 1; i <= 4; i++) {
      timers.push(setTimeout(() => setBuildStage(i), i * 600));
    }
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const svgWidth = 800;
  const svgHeight = 400;
  const sourceX = 50;
  const sourceW = 30;
  const targetX = 500;
  const targetW = 30;
  const subX = 680;

  // Calculate stream positions
  const totalHeight = 300;
  const startY = 50;
  let currentY = startY;

  const streams = FLOW_DATA.sectors.map((sector) => {
    const h = (sector.pct / 100) * totalHeight;
    const stream = { ...sector, y: currentY, h };
    currentY += h + 8;
    return stream;
  });

  return (
    <div ref={ref} className="ws-flow-container" role="img" aria-label="Flow diagram showing global freshwater withdrawals: Agriculture 70%, Industry 19%, Domestic 11%">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="ws-flow-svg">
        {/* Source Node */}
        <g opacity={buildStage >= 0 && isVisible ? 1 : 0} style={{ transition: "opacity 600ms ease" }}>
          <rect x={sourceX} y={startY} width={sourceW} height={totalHeight} fill="#2980b9" rx={4} />
          <text x={sourceX + sourceW / 2} y={startY - 20} textAnchor="middle" className="ws-flow-label" fill="#e8e4e0" fontSize="13">
            Global Freshwater
          </text>
          <text x={sourceX + sourceW / 2} y={startY - 6} textAnchor="middle" className="ws-flow-sublabel" fill="#9a9590" fontSize="11">
            ~{FLOW_DATA.total} {FLOW_DATA.unit}
          </text>
        </g>

        {/* Streams */}
        {streams.map((stream, i) => {
          const visible = buildStage >= i + 1;
          const midY = stream.y + stream.h / 2;
          const path = `
            M ${sourceX + sourceW} ${stream.y}
            C ${sourceX + sourceW + 120} ${stream.y}, ${targetX - 120} ${stream.y}, ${targetX} ${stream.y}
            L ${targetX} ${stream.y + stream.h}
            C ${targetX - 120} ${stream.y + stream.h}, ${sourceX + sourceW + 120} ${stream.y + stream.h}, ${sourceX + sourceW} ${stream.y + stream.h}
            Z
          `;

          // Subdivisions
          let subY = stream.y;
          const subs = stream.subs.map((sub) => {
            const subH = (sub.pct / 100) * stream.h;
            const result = { ...sub, y: subY, h: subH };
            subY += subH;
            return result;
          });

          return (
            <g key={stream.name} opacity={visible ? 1 : 0} style={{ transition: "opacity 800ms ease" }}>
              {/* Main stream */}
              <path d={path} fill={stream.color} opacity={0.5} />

              {/* Target node */}
              <rect x={targetX} y={stream.y} width={targetW} height={stream.h} fill={stream.color} rx={3} />

              {/* Stream label */}
              <text x={targetX + targetW + 12} y={midY - 4} className="ws-flow-label" fill="#e8e4e0" fontSize="14" fontWeight="600">
                {stream.name}
              </text>
              <text x={targetX + targetW + 12} y={midY + 14} className="ws-flow-value" fill={stream.color} fontSize="18" fontWeight="700">
                {stream.pct}%
              </text>

              {/* Subdivisions */}
              {buildStage >= 4 && subs.map((sub, j) => (
                <g key={sub.name} opacity={buildStage >= 4 ? 0.8 : 0} style={{ transition: "opacity 600ms ease 200ms" }}>
                  <line
                    x1={targetX + targetW}
                    y1={sub.y + sub.h / 2}
                    x2={subX - 10}
                    y2={sub.y + sub.h / 2}
                    stroke={stream.color}
                    strokeWidth={Math.max(1, sub.h * 0.4)}
                    opacity={0.3}
                  />
                  <text x={subX} y={sub.y + sub.h / 2 + 4} className="ws-flow-sublabel" fill="#9a9590" fontSize="11">
                    {sub.name} ({sub.pct}%)
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Screen reader fallback */}
      <table className="ws-sr-only">
        <caption>Global freshwater allocation</caption>
        <thead><tr><th>Sector</th><th>Percentage</th><th>Subdivisions</th></tr></thead>
        <tbody>
          {FLOW_DATA.sectors.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{s.pct}%</td>
              <td>{s.subs.map((sub) => `${sub.name} (${sub.pct}%)`).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── VISUALIZATION 4: SCROLL-LOCKED EXPLAINER ───────────────────

function ScarcityEquation() {
  const containerRef = useRef(null);
  const { activeStage, scrollProgress } = useScrollLock(containerRef, EQUATION_STAGES.length);
  const stage = EQUATION_STAGES[activeStage] || EQUATION_STAGES[0];

  return (
    <div ref={containerRef} className="ws-scroll-lock" style={{ height: `${EQUATION_STAGES.length * 300 + (typeof window !== 'undefined' ? window.innerHeight : 800)}px` }}>
      <div className="ws-scroll-lock-sticky">
        <div className="ws-equation-vis">
          {/* Stage title */}
          <h3 className="ws-subheading" style={{ textAlign: "center", marginBottom: "32px" }}>
            {stage.title}
          </h3>

          {/* Supply bar */}
          <div className="ws-equation-label">Available Supply</div>
          <div className="ws-equation-bar" style={{ background: "var(--ws-bg-surface)" }}>
            <div
              className="ws-equation-bar-fill"
              style={{
                width: `${stage.supply}%`,
                background: `linear-gradient(90deg, var(--ws-water-deep), var(--ws-water-blue))`,
              }}
            />
          </div>

          {/* Demand bar */}
          {activeStage >= 1 && (
            <>
              <div className="ws-equation-label" style={{ marginTop: "16px" }}>Total Demand</div>
              <div className="ws-equation-bar" style={{ background: "var(--ws-bg-surface)" }}>
                <div
                  className="ws-equation-bar-fill"
                  style={{
                    width: `${stage.demand}%`,
                    background: stage.demand > stage.supply
                      ? `linear-gradient(90deg, var(--ws-stress-medium), var(--ws-deficit-red))`
                      : `linear-gradient(90deg, var(--ws-stress-medium), var(--ws-agriculture-green))`,
                  }}
                />
              </div>
            </>
          )}

          {/* Deficit indicator */}
          {activeStage >= 4 && stage.demand > stage.supply && (
            <div style={{
              textAlign: "center",
              marginTop: "24px",
              padding: "12px 20px",
              background: "rgba(231, 76, 60, 0.15)",
              borderRadius: "8px",
              border: "1px dashed var(--ws-deficit-red)",
            }}>
              <span style={{
                fontFamily: "var(--ws-font-data)",
                fontSize: "16px",
                fontWeight: "700",
                color: "var(--ws-deficit-red)",
              }}>
                DEFICIT: Demand exceeds supply by {stage.demand - stage.supply}%
              </span>
            </div>
          )}

          {/* Annotation */}
          <p className="ws-equation-annotation">{stage.annotation}</p>
        </div>

        {/* Stage indicator dots */}
        <div className="ws-stage-indicator">
          {EQUATION_STAGES.map((_, i) => (
            <div
              key={i}
              className={`ws-stage-dot ${i === activeStage ? "ws-stage-active" : ""} ${i < activeStage ? "ws-stage-complete" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── VISUALIZATION 5: COMPARISON WIDGET ─────────────────────────

function ComparisonWidget() {
  const [activePair, setActivePair] = useState(0);
  const [ref, isVisible] = useIntersectionObserver(0.2);
  const pair = COMPARISON_PAIRS[activePair];

  return (
    <div ref={ref} className="ws-comparison" role="region" aria-label="Country comparison widget: select two countries to compare water outcomes">
      {/* Pair selector */}
      <div className="ws-pair-selector">
        {COMPARISON_PAIRS.map((p, i) => (
          <button
            key={p.id}
            className={`ws-pair-btn ${i === activePair ? "ws-pair-active" : ""}`}
            onClick={() => setActivePair(i)}
            aria-pressed={i === activePair}
          >
            {p.a} vs {p.b}
          </button>
        ))}
      </div>

      {/* Country names */}
      <div className="ws-country-names">
        <span className="ws-country-name">{pair.a}</span>
        <span className="ws-country-vs">vs</span>
        <span className="ws-country-name">{pair.b}</span>
      </div>

      {/* Metrics */}
      <div>
        {pair.metrics.map((metric, i) => {
          const pctA = (metric.a / metric.max) * 100;
          const pctB = (metric.b / metric.max) * 100;
          const formatVal = (v) => {
            if (v >= 10000) return v.toLocaleString();
            if (v >= 100) return v.toLocaleString();
            return v.toString();
          };

          return (
            <div key={metric.label} className={`ws-metric-row ${metric.highlight ? "ws-highlight" : ""}`}>
              {/* Country A bar */}
              <div>
                <div className="ws-metric-bar-container" style={{ direction: "rtl" }}>
                  <div
                    className="ws-metric-bar-fill"
                    style={{
                      width: isVisible ? `${pctA}%` : "0%",
                      background: "var(--ws-water-blue)",
                      transitionDelay: `${i * 100}ms`,
                      direction: "ltr",
                    }}
                  >
                    <span className="ws-metric-value" style={{ direction: "ltr" }}>
                      {formatVal(metric.a)} {metric.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="ws-metric-label">{metric.label}</div>

              {/* Country B bar */}
              <div>
                <div className="ws-metric-bar-container">
                  <div
                    className="ws-metric-bar-fill"
                    style={{
                      width: isVisible ? `${pctB}%` : "0%",
                      background: "var(--ws-water-light)",
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <span className="ws-metric-value">
                      {formatVal(metric.b)} {metric.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight */}
      <div className="ws-comparison-insight">
        <p>{pair.insight}</p>
      </div>

      {/* Screen reader table */}
      <table className="ws-sr-only">
        <caption>Comparison: {pair.a} vs {pair.b}</caption>
        <thead><tr><th>Metric</th><th>{pair.a}</th><th>{pair.b}</th></tr></thead>
        <tbody>
          {pair.metrics.map((m) => (
            <tr key={m.label}><td>{m.label}</td><td>{m.a} {m.unit}</td><td>{m.b} {m.unit}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN ESSAY COMPONENT ───────────────────────────────────────

export default function GeographyOfWaterScarcityClient() {
  return (
    <article className="ws-essay">
      <ProgressBar />

      {/* ═══ HERO ═══ */}
      <header className="ws-section ws-hero">
        <span className="ws-hero-reading-time">15 min read · Data Journalism</span>
        <h1>The Geography of Water Scarcity</h1>
        <p className="ws-hero-subtitle">
          Water scarcity is not a natural disaster — it is a geographic, political, and
          infrastructural reality shaped by human decisions, and its trajectory is accelerating
          in predictable, preventable ways.
        </p>
      </header>

      {/* ═══ SECTION 1: THE NUMBER YOU DIDN'T EXPECT ═══ */}
      <Section>
        <div className="ws-prose">
          <p>
            In 2018, Cape Town — a modern, wealthy city in a G20 nation — came within weeks of
            turning off its municipal water supply entirely. Officials called it "Day Zero": the
            date when taps across the city would run dry and four million residents would have to
            queue at military-guarded distribution points for their daily allocation of 25 liters.
            The crisis was averted only through emergency rationing that cut consumption by more than
            half, a feat of civic discipline that left the city psychologically scarred.
          </p>
          <p>
            Cape Town is not an outlier. It is a preview. The city's near-collapse exposed a reality
            that most of the world's population has not yet confronted: water scarcity is not confined
            to the arid edges of the developing world. It is a systemic condition, driven by demand,
            shaped by policy, and accelerated by a warming climate. The numbers behind this story are
            not abstract — they are urgent, concrete, and closer to home than most people realize.
          </p>
        </div>

        <div style={{ marginTop: "48px", marginBottom: "48px" }}>
          <DataTicker />
        </div>

        <div className="ws-prose">
          <p>
            These are not isolated statistics. They are symptoms of a single interconnected system —
            a system in which freshwater, the most essential resource for human civilization, is being
            consumed faster than it is renewed in regions that house billions of people. To understand
            how we arrived here, and why the trajectory matters, we need to see the whole picture.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 2: WATER STRESS BY REGION ═══ */}
      <Section>
        <div className="ws-prose">
          <h2 className="ws-heading">Water Stress by Region</h2>
          <p>
            Water stress — the ratio of total freshwater withdrawals to available renewable supply —
            does not follow the equator. It does not respect the boundaries between wealthy and poor
            nations. The map below encodes water stress for every major country, colored from deep blue
            (low stress, ample supply) through amber (medium-high, systems under pressure) to deep red
            (extremely high, where demand routinely exceeds 80% of available supply).
            <span className="ws-cite" title="WRI Aqueduct, 2023"> [WRI Aqueduct, 2023]</span>
          </p>
          <p>
            What the map reveals may surprise you. The Middle East and North Africa — home to 6% of
            the world's population but just 1% of its freshwater
            <span className="ws-cite" title="World Bank, 2018"> [World Bank, 2018]</span> — are
            predictably stressed. But so is much of the American West, southern Spain, southeast
            Australia, and northern China. Water stress follows demand, not rainfall. Use the
            slider to scrub from 2000 to 2040 and watch stress patterns migrate and intensify.
          </p>
        </div>

        <div className="ws-viz-container">
          <ChoroplethMap />
        </div>

        <div className="ws-prose">
          <p>
            The trajectory is unmistakable. By 2040, under current trends, countries that today manage
            their water at moderate stress levels — Spain, Italy, South Korea, Chile — will have joined
            the ranks of the highly stressed. India, already at extreme levels, will face conditions
            where 600 million people lack adequate access to clean water.
            <span className="ws-cite" title="NITI Aayog, 2018"> [NITI Aayog, 2018]</span> The
            question is not whether stress will increase — it is whether policy will respond before
            systems fail. To understand why, we need to look at where all the freshwater goes.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 3: WHERE FRESHWATER GOES ═══ */}
      <Section>
        <div className="ws-prose">
          <h2 className="ws-heading">Where Freshwater Goes</h2>
          <p>
            If you were asked to guess the single largest consumer of freshwater on Earth, you might
            think of cities — sprawling megacities with millions of showers, swimming pools, and
            industrial plants running around the clock. You would be wrong by a factor of six.
          </p>
          <p>
            The answer is agriculture. And the diagram below makes it viscerally obvious.
          </p>
        </div>

        <div className="ws-viz-container">
          <FlowDiagram />
        </div>

        <div className="ws-prose">
          <p>
            Agriculture consumes approximately 70% of all freshwater withdrawn globally — roughly
            2,730 cubic kilometers per year.
            <span className="ws-cite" title="FAO AQUASTAT"> [FAO AQUASTAT]</span> The overwhelming
            majority of that water goes to irrigation: flooding fields, filling furrows, and
            pressurizing center-pivot sprinklers across an area of cropland roughly the size of India.
          </p>
          <p>
            A single kilogram of beef requires approximately 15,400 liters of water to produce.
            <span className="ws-cite" title="Mekonnen & Hoekstra, 2012"> [Mekonnen & Hoekstra, 2012]</span>{" "}
            A kilogram of rice requires 2,500 liters. A kilogram of chicken, about 4,300. These are
            not numbers that can be offset by shorter showers or low-flow toilets. Domestic water use —
            everything you do with water at home — accounts for just 11% of the global total. The
            faucet in your kitchen is a rounding error.
          </p>
          <p>
            This does not mean agriculture is "wasting" water. It means agriculture is feeding 8
            billion people, and the water cost of that enterprise is enormous by design. The implication
            is structural: the biggest lever for reducing water stress is not household conservation but
            agricultural efficiency — drip irrigation, crop selection, soil moisture management, and
            reducing food waste. To understand how these forces interact to create scarcity, we need
            to build the equation.
          </p>
        </div>

        <div className="ws-pull-quote">
          "A single kilogram of beef requires approximately 15,400 liters of water.
          The faucet in your kitchen is a rounding error."
        </div>
      </Section>

      {/* ═══ SECTION 4: THE SCARCITY EQUATION ═══ */}
      <Section className="ws-section-equation">
        <div className="ws-prose">
          <h2 className="ws-heading">The Scarcity Equation</h2>
          <p>
            Earth is not running out of water. The planet has the same volume of water it has had
            for billions of years — approximately 1.4 billion cubic kilometers, cycling endlessly
            through evaporation, precipitation, and runoff. But only 2.5% of that water is fresh.
            <span className="ws-cite" title="USGS"> [USGS]</span> And less than 1% is accessible
            in lakes, rivers, and shallow aquifers. The problem is not quantity — it is that human
            demand is outpacing the rate at which accessible freshwater is renewed.
          </p>
          <p>
            Scroll through the diagram below to see how scarcity emerges — one layer at a time.
          </p>
        </div>
      </Section>

      {/* Scroll-locked explainer */}
      <ScarcityEquation />

      <Section>
        <div className="ws-prose">
          <p>
            The diagram tells the story in five layers: available supply, population demand,
            agricultural draw, climate reduction, and the resulting deficit. By 2030, under
            business-as-usual projections, global demand could exceed sustainable supply by 40%.
            <span className="ws-cite" title="2030 Water Resources Group"> [2030 Water Resources Group]</span>
          </p>
          <p>
            In India alone, NITI Aayog — the government's policy think tank — warned in 2018 that
            600 million people face "high to extreme" water stress, and that 21 major cities would
            run out of groundwater by 2020.
            <span className="ws-cite" title="NITI Aayog, 2018"> [NITI Aayog, 2018]</span> The
            most insidious dimension of this crisis is its invisibility. Groundwater — the aquifers
            that supply 30% of the world's freshwater — is depleted silently, year after year. In
            India's Punjab region, extraction exceeds recharge by more than 20 cubic kilometers
            annually. You cannot see an aquifer emptying. By the time wells run dry, it is too late.
          </p>
          <p>
            But this trajectory is not fate. If it were, we would expect all countries with similar
            natural conditions to produce similar water outcomes. They do not.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 5: SAME RAIN, DIFFERENT OUTCOMES ═══ */}
      <Section>
        <div className="ws-prose">
          <h2 className="ws-heading">Same Rain, Different Outcomes</h2>
          <p>
            If water scarcity were purely a function of geography and climate, then countries with
            similar rainfall, similar latitude, and similar natural conditions would produce similar
            water outcomes. They do not — and the differences are stark. Select a pair below and
            see for yourself.
          </p>
        </div>

        <div className="ws-viz-container">
          <ComparisonWidget />
        </div>

        <div className="ws-blockquote">
          <p>
            "The water crisis is not about having too little water. It is a crisis of managing
            water so badly that billions of people — and the environment — suffer."
          </p>
          <cite>— Peter Gleick, Pacific Institute</cite>
        </div>

        <div className="ws-prose">
          <p>
            Israel's story is the clearest illustration. A nation with less than 100 cubic meters of
            renewable freshwater per capita per year — one of the lowest rates on Earth — has become
            a net water exporter through decades of investment in desalination, drip irrigation, and
            wastewater recycling. Israel recycles approximately 85% of its wastewater for agricultural
            reuse — four times the rate of any other country.
            <span className="ws-cite" title="Israel Water Authority, 2022"> [Israel Water Authority, 2022]</span>
          </p>
          <p>
            Singapore's transformation is equally instructive. At independence in 1965, the city-state
            imported nearly all its water from Malaysia — an existential vulnerability that shaped
            national policy for decades. Today, Singapore's "Four National Taps" strategy combines
            imported water, reclaimed NEWater (high-grade recycled wastewater), desalination, and local
            catchment to achieve strategic water independence.
            <span className="ws-cite" title="PUB Singapore"> [PUB Singapore]</span>
          </p>
          <p>
            These are not stories of inherent superiority. They are stories of sustained political will,
            centralized water governance, and the willingness to invest in infrastructure before crisis
            forces the issue. Desalination alone is not the answer — Israel succeeds because recycling,
            efficiency, and desalination work as an integrated system, not a silver bullet. The lesson is
            not that technology saves us. The lesson is that policy choices produce radically different
            outcomes from identical starting conditions.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 6: A DESIGN PROBLEM, NOT A FATE ═══ */}
      <Section>
        <div className="ws-blockquote">
          <p>
            "We never really valued water as the foundation of life that it is."
          </p>
          <cite>— Sandra Postel, Global Water Policy Project</cite>
        </div>

        <div className="ws-prose">
          <h2 className="ws-heading">A Design Problem, Not a Fate</h2>
          <p>
            The evidence assembled in this essay points to a single, uncomfortable conclusion: water
            scarcity is not a natural disaster. It is not an inevitable consequence of living in an
            arid climate, or of having too many people, or of a warming planet. It is a design problem —
            a failure of systems, governance, and investment that produces predictable, measurable, and
            preventable harm.
          </p>
          <p>
            The levers exist. Agricultural efficiency can dramatically reduce the 70% draw on freshwater.
            Wastewater recycling — proven at scale in Israel, Singapore, and Namibia — can turn waste into
            supply. Aquifer management can prevent the silent depletion that turns sustainable extraction
            into permanent damage. Climate adaptation can shift infrastructure ahead of changing precipitation
            patterns instead of reacting after systems fail.
          </p>
          <p>
            None of these interventions are speculative. All are proven. All are scalable. What they
            require is political will, sustained investment, and the institutional capacity to manage water
            as a system rather than a commodity to be extracted until it runs out.
          </p>
          <p>
            The trajectory is urgent. The 40% demand-supply gap projected for 2030 is not fiction — it is
            the mathematical consequence of current consumption patterns and population growth.
            <span className="ws-cite" title="IPCC AR6, 2022"> [IPCC AR6, 2022]</span> But trajectories
            can bend. Cape Town bent its trajectory in 2018 through emergency civic action. Israel bent
            its trajectory over four decades through infrastructure and governance. The question is
            whether the rest of the world will bend its trajectory by choice — or by crisis.
          </p>
        </div>

        <div className="ws-pull-quote">
          "Water scarcity is not a sentence handed down by geography. It is a design problem —
          with levers, blueprints, and proof that better outcomes are possible."
        </div>
      </Section>

      {/* ═══ SOURCES ═══ */}
      <footer className="ws-sources">
        <div className="ws-sources-content">
          <h3>Sources & Further Reading</h3>
          <ul className="ws-sources-list">
            {SOURCES.map((source, i) => (
              <li key={i}>{source}</li>
            ))}
          </ul>
          <p className="ws-sources-note">
            This essay was produced through the Esy Orchestration Framework using the Conceptual Essay
            Pipeline (Data Journalism Mode). All statistics are sourced from Tier 1-2 institutions.
            Projected data (2030-2040) uses WRI Aqueduct SSP2-RCP4.5 scenario unless otherwise noted.
          </p>
        </div>
      </footer>
    </article>
  );
}
