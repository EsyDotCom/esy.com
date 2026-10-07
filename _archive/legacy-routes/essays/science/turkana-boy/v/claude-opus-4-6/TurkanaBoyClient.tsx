'use client';

import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList,
  Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { IMAGE_CREDITS, IMAGES, SOURCES } from './images';

/* ─── Design tokens (match CSS custom properties) ─── */
const C = {
  strata: '#0f1114',
  bone: '#ede2d0',
  sediment: '#b8a07a',
  lake: '#4a8c8c',
  heat: '#d4803a',
  charcoal: '#262b30',
  dust: '#f0e6d4',
  accent: '#c45a2d',
  muted: '#8a9199',
};

/* ─── Visualization Data ─── */

const BONE_REGIONS = [
  { id: 'cranium', label: 'Cranium', found: 30, total: 29, fill: C.lake, y: 0, h: 60 },
  { id: 'mandible', label: 'Mandible', found: 1, total: 1, fill: C.lake, y: 60, h: 25 },
  { id: 'vertebrae', label: 'Vertebrae', found: 16, total: 33, fill: C.heat, y: 90, h: 90 },
  { id: 'ribs', label: 'Ribs', found: 11, total: 24, fill: C.sediment, y: 100, h: 80 },
  { id: 'pelvis', label: 'Pelvis', found: 4, total: 6, fill: C.lake, y: 185, h: 40 },
  { id: 'arms', label: 'Upper limbs', found: 14, total: 60, fill: C.accent, y: 130, h: 100 },
  { id: 'legs', label: 'Lower limbs', found: 22, total: 60, fill: C.bone, y: 230, h: 130 },
  { id: 'hands-feet', label: 'Hands & feet', found: 10, total: 106, fill: C.muted, y: 340, h: 40 },
];

const AGE_DATA = {
  dental: { min: 7.6, max: 8.8, label: 'Dental age (ape-like eruption)' },
  skeletal: { min: 10, max: 11, label: 'Skeletal age (modern human standards)' },
  consensus: { mid: 8.5, label: 'Current consensus' },
};

const GROWTH_DATA = [
  { age: 0, human: 50, chimp: 48, turkana: null },
  { age: 1, human: 75, chimp: 60, turkana: null },
  { age: 2, human: 87, chimp: 70, turkana: null },
  { age: 3, human: 96, chimp: 76, turkana: null },
  { age: 4, human: 103, chimp: 82, turkana: null },
  { age: 5, human: 110, chimp: 88, turkana: null },
  { age: 6, human: 116, chimp: 93, turkana: null },
  { age: 7, human: 122, chimp: 98, turkana: null },
  { age: 8, human: 128, chimp: 103, turkana: 158 },
  { age: 9, human: 133, chimp: 107, turkana: 165 },
  { age: 10, human: 138, chimp: 112, turkana: 172 },
  { age: 11, human: 143, chimp: 115, turkana: 178 },
  { age: 12, human: 149, chimp: 118, turkana: 182 },
  { age: 13, human: 156, chimp: 121, turkana: 185 },
  { age: 14, human: 164, chimp: 124, turkana: null },
  { age: 15, human: 170, chimp: 127, turkana: null },
  { age: 16, human: 174, chimp: 129, turkana: null },
  { age: 17, human: 176, chimp: 131, turkana: null },
  { age: 18, human: 177, chimp: 132, turkana: null },
];

const BODY_PROPORTIONS = [
  { metric: 'Crural index', lucy: 85, turkana: 89, modern: 88, neanderthal: 80 },
  { metric: 'Rel. leg length', lucy: 63, turkana: 81, modern: 80, neanderthal: 73 },
  { metric: 'Rel. arm length', lucy: 73, turkana: 60, modern: 58, neanderthal: 61 },
];

const BRAIN_DATA = [
  { species: 'A. afarensis', volume: 425, color: C.sediment },
  { species: 'H. habilis', volume: 610, color: C.sediment },
  { species: 'Turkana Boy', volume: 880, color: C.heat },
  { species: 'H. naledi', volume: 513, color: C.muted },
  { species: 'H. erectus (avg)', volume: 950, color: C.lake },
  { species: 'H. sapiens', volume: 1350, color: C.bone },
];

// @diagram-contract: debate timeline with three phases (MacLarnon → Latimer/Ohman → Meyer/Haeusler), each toggling visible
const VOICE_EVENTS = [
  { year: 1993, author: 'MacLarnon', claim: 'Narrow thoracic canal → limited respiratory control → no speech', status: 'hypothesis' },
  { year: 2001, author: 'Latimer & Ohman', claim: 'Canal narrowness is pathological (skeletal dysplasia), not species-typical', status: 'correction' },
  { year: 2015, author: 'Meyer & Haeusler', claim: 'Confirmed dysplasia; other H. erectus specimens have normal canals', status: 'confirmation' },
];

const LANDMASSES: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { name: 'Africa' }, geometry: { type: 'Polygon', coordinates: [[[-17, 35], [51, 35], [51, -35], [10, -35], [-17, 5], [-17, 35]]] } },
    { type: 'Feature', properties: { name: 'Eurasia' }, geometry: { type: 'Polygon', coordinates: [[[-10, 35], [-10, 72], [180, 72], [180, 5], [95, 5], [60, 25], [25, 35], [-10, 35]]] } },
    { type: 'Feature', properties: { name: 'SE Asia' }, geometry: { type: 'Polygon', coordinates: [[[95, 8], [140, 8], [140, -10], [95, -10], [95, 8]]] } },
  ],
};

const MIGRATION_SITES = [
  { name: 'Nariokotome', lat: 4.1, lon: 35.9, date: '1.53 Ma', primary: true },
  { name: 'Dmanisi', lat: 41.3, lon: 44.3, date: '1.77 Ma', primary: false },
  { name: 'Trinil', lat: -7.4, lon: 111.3, date: '~0.9 Ma', primary: false },
  { name: 'Lantian', lat: 34.2, lon: 109.7, date: '~1.15 Ma', primary: false },
  { name: "'Ubeidiya", lat: 32.6, lon: 35.6, date: '~1.4 Ma', primary: false },
];

/* ─── Tooltip ─── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.charcoal, border: `1px solid ${C.muted}40`, borderRadius: 8, padding: '8px 12px', fontSize: '0.8rem' }}>
      <div style={{ color: C.bone, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, lineHeight: 1.6 }}>{p.name}: {p.value} cm</div>
      ))}
    </div>
  );
}

/* ─── Figure Components ─── */
function HeroFigure({ src, alt, caption, credit }: { src: string; alt: string; caption: string; credit: string }) {
  return (
    <figure className="tb-figure tb-figure-hero">
      <img src={src} alt={alt} className="tb-image" loading="eager" />
      <figcaption>{caption}<span className="tb-credit">{credit}</span></figcaption>
    </figure>
  );
}

function SideFigure({ src, alt, caption, credit }: { src: string; alt: string; caption: string; credit: string }) {
  return (
    <figure className="tb-figure tb-figure-side">
      <img src={src} alt={alt} className="tb-image" loading="lazy" />
      <figcaption>{caption}<span className="tb-credit">{credit}</span></figcaption>
    </figure>
  );
}

/* ─────────────────────────────────────────────── */
/*  VISUALIZATION 1: Skeletal Completeness         */
/* ─────────────────────────────────────────────── */
// @diagram-contract: interactive SVG showing 8 bone regions with found/total counts, clickable for detail
function SkeletalCompletenessViz() {
  const [active, setActive] = useState<string | null>(null);
  const totalFound = BONE_REGIONS.reduce((s, r) => s + r.found, 0);

  return (
    <div className="tb-viz-container">
      <div className="tb-viz-title">108 Bones: What Survived 1.53 Million Years</div>
      <div className="tb-skeleton-grid">
        <div className="tb-skeleton-legend">
          {BONE_REGIONS.map(r => (
            <div
              key={r.id}
              className="tb-skeleton-legend-item"
              onMouseEnter={() => setActive(r.id)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="tb-skeleton-swatch" style={{ background: r.fill }} />
              <span style={{ color: active === r.id ? C.bone : C.muted }}>
                {r.label}: {r.found}/{r.total}
              </span>
            </div>
          ))}
          <div style={{ marginTop: '0.75rem', fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: C.sediment }}>
            Total: {totalFound} fragments recovered
          </div>
        </div>
        <svg viewBox="0 0 300 400" style={{ width: '100%', maxWidth: 300 }}>
          {BONE_REGIONS.map(r => {
            const pct = r.found / r.total;
            return (
              <g key={r.id} opacity={active && active !== r.id ? 0.25 : 1} style={{ transition: 'opacity 0.2s' }}>
                <rect x={50} y={r.y} width={200} height={r.h} rx={4} fill={C.charcoal} stroke={C.muted} strokeWidth={0.5} strokeOpacity={0.3} />
                <rect x={50} y={r.y} width={200 * pct} height={r.h} rx={4} fill={r.fill} opacity={0.6} />
                <text x={155} y={r.y + r.h / 2 + 4} textAnchor="middle" fill={C.bone} fontSize={11} fontFamily="sans-serif">
                  {r.label} ({Math.round(pct * 100)}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="tb-viz-caption">
        The skeleton is 40% complete — extraordinary for a 1.53 million-year-old specimen. The limb bones and cranium are well-represented; hands and feet are mostly missing.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  VISUALIZATION 2: Age Discrepancy               */
/* ─────────────────────────────────────────────── */
// @diagram-contract: D3 horizontal range chart with dental (7.6–8.8) and skeletal (10–11) ranges, consensus marker at 8.5
function AgeDiscrepancyViz() {
  const width = 700;
  const height = 140;
  const margin = { left: 200, right: 40, top: 20, bottom: 30 };
  const scale = d3.scaleLinear().domain([6, 12]).range([margin.left, width - margin.right]);

  return (
    <div className="tb-viz-container">
      <div className="tb-viz-title">How Old Was He? Teeth and Bones Disagree</div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%' }}>
        <line x1={margin.left} x2={width - margin.right} y1={height - margin.bottom} y2={height - margin.bottom} stroke={C.muted} strokeOpacity={0.3} />
        {[6, 7, 8, 9, 10, 11, 12].map(v => (
          <g key={v}>
            <line x1={scale(v)} x2={scale(v)} y1={height - margin.bottom} y2={height - margin.bottom + 4} stroke={C.muted} strokeOpacity={0.5} />
            <text x={scale(v)} y={height - margin.bottom + 18} textAnchor="middle" fill={C.muted} fontSize={11}>{v} yr</text>
          </g>
        ))}

        {/* Dental range */}
        <rect x={scale(AGE_DATA.dental.min)} y={margin.top} width={scale(AGE_DATA.dental.max) - scale(AGE_DATA.dental.min)} height={28} rx={4} fill={C.lake} opacity={0.7} />
        <text x={margin.left - 8} y={margin.top + 18} textAnchor="end" fill={C.lake} fontSize={12} fontFamily="sans-serif">{AGE_DATA.dental.label}</text>

        {/* Skeletal range */}
        <rect x={scale(AGE_DATA.skeletal.min)} y={margin.top + 42} width={scale(AGE_DATA.skeletal.max) - scale(AGE_DATA.skeletal.min)} height={28} rx={4} fill={C.heat} opacity={0.7} />
        <text x={margin.left - 8} y={margin.top + 60} textAnchor="end" fill={C.heat} fontSize={12} fontFamily="sans-serif">{AGE_DATA.skeletal.label}</text>

        {/* Consensus marker */}
        <line x1={scale(AGE_DATA.consensus.mid)} x2={scale(AGE_DATA.consensus.mid)} y1={margin.top - 4} y2={margin.top + 78} stroke={C.accent} strokeWidth={2} strokeDasharray="4 3" />
        <text x={scale(AGE_DATA.consensus.mid)} y={margin.top - 8} textAnchor="middle" fill={C.accent} fontSize={10} fontWeight={600}>~8.5 yr consensus</text>
      </svg>
      <div className="tb-viz-caption">
        If his teeth erupted on an ape-like schedule, he was about 8. If on a modern human schedule, he was 11. The gap reveals a developmental pattern halfway between — the human pattern of extended childhood was beginning but not yet complete.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  VISUALIZATION 3: Growth Projection             */
/* ─────────────────────────────────────────────── */
// @diagram-contract: Recharts AreaChart with three series (human, chimp, turkana projected), Turkana as dashed/partial
function GrowthProjectionViz() {
  return (
    <div className="tb-viz-container">
      <div className="tb-viz-title">Height-for-Age: A Body Growing Faster Than Any Living Primate</div>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.muted} strokeOpacity={0.15} />
          <XAxis dataKey="age" stroke={C.muted} tick={{ fill: C.muted, fontSize: 12 }} label={{ value: 'Age (years)', position: 'insideBottom', offset: -5, fill: C.muted, fontSize: 12 }} />
          <YAxis stroke={C.muted} tick={{ fill: C.muted, fontSize: 12 }} label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft', fill: C.muted, fontSize: 12 }} domain={[40, 200]} />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="human" name="Modern human" stroke={C.bone} fill={C.bone} fillOpacity={0.1} strokeWidth={2} dot={false} connectNulls />
          <Area type="monotone" dataKey="chimp" name="Chimpanzee" stroke={C.muted} fill={C.muted} fillOpacity={0.05} strokeWidth={2} dot={false} connectNulls />
          <Area type="monotone" dataKey="turkana" name="Turkana Boy (projected)" stroke={C.heat} fill={C.heat} fillOpacity={0.15} strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: C.heat, r: 3 }} connectNulls />
          <ReferenceLine y={160} stroke={C.accent} strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: '160 cm at death', fill: C.accent, fontSize: 10, position: 'right' }} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 12, color: C.muted }} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="tb-viz-caption">
        At approximately 8 years old, Turkana Boy was already 160 cm (5&apos;3&quot;) — taller than the average modern 14-year-old. His projected adult height of 185 cm would have made him one of the tallest hominins in the fossil record.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  VISUALIZATION 4: Body Proportions              */
/* ─────────────────────────────────────────────── */
// @diagram-contract: Recharts grouped BarChart with 4 species × 3 metrics
function BodyProportionViz() {
  return (
    <div className="tb-viz-container">
      <div className="tb-viz-title">A Different Machine: Body Proportions Compared</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={BODY_PROPORTIONS} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.muted} strokeOpacity={0.15} />
          <XAxis dataKey="metric" stroke={C.muted} tick={{ fill: C.muted, fontSize: 11 }} />
          <YAxis stroke={C.muted} tick={{ fill: C.muted, fontSize: 11 }} domain={[50, 100]} />
          <Tooltip contentStyle={{ background: C.charcoal, border: `1px solid ${C.muted}40`, borderRadius: 8, fontSize: '0.8rem' }} />
          <Bar dataKey="lucy" name="Lucy (A. afarensis)" fill={C.sediment} radius={[3, 3, 0, 0]} />
          <Bar dataKey="turkana" name="Turkana Boy" fill={C.heat} radius={[3, 3, 0, 0]} />
          <Bar dataKey="modern" name="Modern human" fill={C.bone} radius={[3, 3, 0, 0]} />
          <Bar dataKey="neanderthal" name="Neanderthal" fill={C.muted} radius={[3, 3, 0, 0]} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11, color: C.muted }} />
        </BarChart>
      </ResponsiveContainer>
      <div className="tb-viz-caption">
        Turkana Boy&apos;s proportions — long legs, short arms, narrow hips — match modern tropical Africans almost exactly. Lucy&apos;s proportions match nothing alive today. This is not a gradual shift. It is a new body plan.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  VISUALIZATION 5: Brain Volume                  */
/* ─────────────────────────────────────────────── */
// @diagram-contract: Recharts horizontal BarChart, Turkana Boy highlighted, H. sapiens as reference ceiling
function BrainVolumeViz() {
  return (
    <div className="tb-viz-container">
      <div className="tb-viz-title">880 Cubic Centimetres: Two-Thirds of the Way</div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={BRAIN_DATA} layout="vertical" margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.muted} strokeOpacity={0.15} horizontal={false} />
          <XAxis type="number" stroke={C.muted} tick={{ fill: C.muted, fontSize: 11 }} domain={[0, 1500]} label={{ value: 'Endocranial volume (cc)', position: 'insideBottom', offset: -5, fill: C.muted, fontSize: 11 }} />
          <YAxis type="category" dataKey="species" stroke={C.muted} tick={{ fill: C.muted, fontSize: 11 }} width={100} />
          <Tooltip contentStyle={{ background: C.charcoal, border: `1px solid ${C.muted}40`, borderRadius: 8, fontSize: '0.8rem' }} formatter={(v: number) => `${v} cc`} />
          <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
            {BRAIN_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
            <LabelList dataKey="volume" position="right" fill={C.muted} fontSize={11} formatter={(v: number) => `${v} cc`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="tb-viz-caption">
        Turkana Boy&apos;s brain was 65% of the modern human average — and he was still growing. Note that Homo naledi, living over a million years later, had a brain barely larger than an australopith&apos;s.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  VISUALIZATION 6: Voice Debate                  */
/* ─────────────────────────────────────────────── */
// @diagram-contract: annotated SVG timeline with three events, toggling detail on click
function VoiceDebateViz() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const statusColors: Record<string, string> = { hypothesis: C.lake, correction: C.heat, confirmation: C.accent };

  return (
    <div className="tb-viz-container">
      <div className="tb-viz-title">Could He Speak? A Debate in Three Acts</div>
      <svg viewBox="0 0 700 160" style={{ width: '100%' }}>
        <line x1={60} x2={640} y1={50} y2={50} stroke={C.muted} strokeOpacity={0.3} strokeWidth={2} />
        {VOICE_EVENTS.map((evt, i) => {
          const x = 60 + i * 280;
          const isExpanded = expanded === i;
          return (
            <g key={i} onClick={() => setExpanded(isExpanded ? null : i)} style={{ cursor: 'pointer' }}>
              <circle cx={x} cy={50} r={8} fill={statusColors[evt.status]} />
              <text x={x} y={30} textAnchor="middle" fill={C.bone} fontSize={13} fontWeight={600}>{evt.year}</text>
              <text x={x} y={75} textAnchor="middle" fill={C.muted} fontSize={11}>{evt.author}</text>
              {isExpanded && (
                <foreignObject x={x - 130} y={85} width={260} height={60}>
                  <div style={{ fontSize: 10, color: C.sediment, lineHeight: 1.4, textAlign: 'center', padding: '4px 8px' }}>
                    {evt.claim}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
      <div className="tb-viz-caption">
        Click each event to see the argument. The narrow vertebral canal was pathological, not typical — so this specimen cannot tell us whether Homo ergaster could speak. The question remains open.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  VISUALIZATION 7: Migration Map                 */
/* ─────────────────────────────────────────────── */
// @diagram-contract: D3-geo Natural Earth projection, simplified landmasses, 5 dispersal sites with connecting arcs
function MigrationMapViz() {
  const projection = useMemo(
    () => d3.geoNaturalEarth1().center([45, 20]).scale(280).translate([380, 210]),
    []
  );
  const pathGen = useMemo(() => d3.geoPath(projection), [projection]);

  return (
    <div className="tb-viz-container">
      <div className="tb-viz-title">The First Walk Out of Africa</div>
      <svg viewBox="0 0 760 420" style={{ width: '100%' }}>
        {/* Landmasses */}
        {LANDMASSES.features.map((f, i) => (
          <path key={i} d={pathGen(f) || ''} fill={C.charcoal} stroke={C.muted} strokeWidth={0.5} strokeOpacity={0.3} />
        ))}

        {/* Dispersal arcs from Nariokotome */}
        {MIGRATION_SITES.filter(s => !s.primary).map((site, i) => {
          const origin = projection([35.9, 4.1]);
          const dest = projection([site.lon, site.lat]);
          if (!origin || !dest) return null;
          const mx = (origin[0] + dest[0]) / 2;
          const my = Math.min(origin[1], dest[1]) - 30;
          return (
            <path
              key={i}
              d={`M ${origin[0]} ${origin[1]} Q ${mx} ${my} ${dest[0]} ${dest[1]}`}
              fill="none"
              stroke={C.heat}
              strokeWidth={1.5}
              strokeDasharray="5 3"
              opacity={0.6}
            />
          );
        })}

        {/* Sites */}
        {MIGRATION_SITES.map((site, i) => {
          const pos = projection([site.lon, site.lat]);
          if (!pos) return null;
          return (
            <g key={i}>
              <circle cx={pos[0]} cy={pos[1]} r={site.primary ? 6 : 4} fill={site.primary ? C.accent : C.lake} />
              <text x={pos[0]} y={pos[1] - 10} textAnchor="middle" fill={C.bone} fontSize={10} fontWeight={site.primary ? 700 : 400}>
                {site.name}
              </text>
              <text x={pos[0]} y={pos[1] + 16} textAnchor="middle" fill={C.muted} fontSize={9}>
                {site.date}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="tb-viz-caption">
        Homo ergaster/erectus dispersed from East Africa to Georgia, the Levant, Java, and China. Crucially, the Dmanisi hominins left Africa 240,000 years before Turkana Boy was born — and with a less modern body. The walk out of Africa didn&apos;t require the finished blueprint.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  MAIN ESSAY COMPONENT                           */
/* ─────────────────────────────────────────────── */
export default function TurkanaBoyClient() {
  return (
    <article className="tb-essay">
      {/* ─── Hero ─── */}
      <section className="tb-hero">
        <p className="tb-hero-epigraph">
          &ldquo;When you look at KNM-WT 15000, you are looking at the first draft of your own body.&rdquo;
        </p>
        <HeroFigure
          src={IMAGES.turkanaBoyReconstruction}
          alt="Museum reconstruction of Turkana Boy, a Homo ergaster youth, at the Neanderthal Museum"
          caption="The most complete early Homo skeleton ever found — 108 bone fragments recovered from the west shore of Lake Turkana, Kenya."
          credit="Neanderthal Museum, Mettmann / Wikimedia Commons"
        />
      </section>

      {/* ─── 1. The Abscess ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Abscess</h2>
        <p className="tb-section-subtitle">A molar, a fever, and the end of a short life</p>
        <div className="tb-prose">
          <p className="tb-lead">
            He died because of a tooth. A deciduous molar on the left side of his mandible had become infected — the bone around it was resorbing, dissolving under the pressure of bacterial invasion. The abscess had opened a cavity in the jaw. Whether the infection spread to septicemia, or whether the fever and dehydration simply dropped him near the swamp, the outcome was the same. Sometime around 1.53 million years ago, on the western shore of what we now call Lake Turkana, a child lay down in the sediment and did not stand up.
          </p>
          <p>
            He was between eight and eleven years old. He stood about 160 centimetres tall — five foot three — which is extraordinary for a child of that age by any modern standard. His body was lean, narrow-hipped, long-legged: a body built not for climbing or brachiation but for covering ground in open, hot country. He had a brain of roughly 880 cubic centimetres — two-thirds the size of yours — housed in a skull with heavy brow ridges and a receding forehead.
          </p>
          <p>
            He was not Homo sapiens. He was almost certainly Homo ergaster — the African variant of what some researchers fold into Homo erectus. But when you look at his postcranial skeleton, at the geometry of his limbs and trunk, at the proportions that relate his legs to his torso and his arms to his frame, you are looking at something unmistakable. You are looking at the first body in our lineage that is built the way you are built.
          </p>
        </div>
      </section>

      <SideFigure
        src={IMAGES.lakeTurkana}
        alt="The jade-green waters of Lake Turkana in Kenya's Rift Valley"
        caption="Lake Turkana, Kenya. The western shore, near the Nariokotome III excavation site, is some of the most fossil-rich terrain on Earth."
        credit="Wikimedia Commons"
      />

      <hr className="tb-divider" />

      {/* ─── 2. The Age ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Age</h2>
        <p className="tb-section-subtitle">Teeth say one thing. Bones say another.</p>
        <div className="tb-prose">
          <p>
            The central forensic puzzle of KNM-WT 15000 is not how he died but how old he was when he died. Holly Smith, in her 1993 analysis, established the discrepancy that has defined the debate ever since. If you assess his dental development against modern human eruption schedules, his second molars were coming in — suggesting an age of roughly eleven. But if his teeth were erupting on a faster, ape-like schedule, those same molars place him at seven or eight.
          </p>
          <p>
            This is not a minor dating quibble. It is the key to understanding how fast early Homo grew. If he was eight and already five foot three, he was growing at a rate no living primate matches. His projected adult height — around 185 centimetres, or six foot one — would have been reached on a compressed, ape-like timetable: grow fast, mature early, die young. If he was eleven, the picture shifts: his growth was more prolonged, more human-like, and the extended childhood that defines our species was already underway.
          </p>
          <p>
            The current consensus, informed by perikymata counts on tooth enamel (microscopic growth lines that mark daily deposition), places him at approximately 8 to 9 years old. The human pattern of slow childhood had not yet arrived. But neither was he growing on a purely ape schedule. He was caught between.
          </p>
        </div>
        <AgeDiscrepancyViz />
      </section>

      <hr className="tb-divider" />

      {/* ─── 3. The Growth ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Growth</h2>
        <p className="tb-section-subtitle">What his height tells us about when childhood changed</p>
        <div className="tb-prose">
          <p>
            Place Turkana Boy on a modern growth chart and he is off the scale. At eight years old, he was the height of an average modern fourteen-year-old. The chimpanzee comparison is even more stark: an eight-year-old male chimp stands about 103 centimetres. Turkana Boy was more than half a metre taller.
          </p>
          <p>
            The growth curve comparison tells a story about developmental pace. Modern humans grow slowly through childhood, then surge in the adolescent growth spurt — a pattern unique among primates, linked to our extended period of brain development and social learning. Chimpanzees grow more steadily and reach adult size faster. Turkana Boy appears to have been on a trajectory that was rapid but not quite finished — his growth plates were still open, his vertebral column still fusing. He was, in the language of developmental biology, still in the game.
          </p>
        </div>
        <GrowthProjectionViz />
      </section>

      <hr className="tb-divider" />

      {/* ─── 4. The Body ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Body</h2>
        <p className="tb-section-subtitle">Long legs, narrow trunk, and the thermoregulatory logic of open country</p>
        <div className="tb-prose">
          <p>
            Lucy had a wide pelvis, relatively short legs, and arms that retained significant length — a body that was bipedal but still geometrically anchored to a world that included trees. Her proportions have no close analog among living humans. Turkana Boy&apos;s proportions, by contrast, fall squarely within the range of modern tropical East Africans.
          </p>
          <p>
            The crural index — the ratio of tibia length to femur length — measures how much of the leg is in the lower segment. High values correlate with tropical adaptation: longer tibiae are mechanically efficient for walking and increase the body&apos;s surface area for heat dissipation. Turkana Boy&apos;s crural index matches modern Dinka and Turkana populations. His bi-iliac breadth, the width across the hip bones, is narrow relative to stature — the opposite of Lucy&apos;s flaring pelvis.
          </p>
          <p>
            Peter Wheeler&apos;s thermoregulation models explain why. A tall, narrow body in equatorial sun intercepts less solar radiation (smaller cross-section to overhead light), loses heat more efficiently (greater surface-area-to-volume ratio), and requires approximately 30% less water than a shorter, wider body of the same mass. This body is an engineering answer to a specific ecological problem: how do you range across open savanna at midday without overheating?
          </p>
        </div>
        <BodyProportionViz />
      </section>

      <SideFigure
        src={IMAGES.lakeTurkanaEliye}
        alt="View of Lake Turkana from the western shore near Eliye Springs"
        caption="The western shore of Lake Turkana — arid, volcanic, and blisteringly hot. This is the landscape that shaped the Turkana Boy body plan."
        credit="Wikimedia Commons"
      />

      <hr className="tb-divider" />

      {/* ─── 5. The Brain ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Brain</h2>
        <p className="tb-section-subtitle">880 cubic centimetres and counting</p>
        <div className="tb-prose">
          <p>
            KNM-WT 15000&apos;s endocranial volume — the internal capacity of the braincase — measures approximately 880 cubic centimetres. For a juvenile, this is substantial. Adult Homo erectus ranged from about 600 to 1,100 cc across their geographic and temporal span; modern humans average roughly 1,350 cc.
          </p>
          <p>
            At 880 cc, Turkana Boy&apos;s brain was about 65% of the modern human mean. Had he reached adulthood, the figure would likely have climbed to 900 or 1,000 cc — but this depends on how much postnatal brain growth he had left. In modern humans, the brain reaches approximately 90% of adult volume by age six. If early Homo followed a similar trajectory, most of Turkana Boy&apos;s brain growth was already complete.
          </p>
          <p>
            The comparison with Homo naledi is instructive. Naledi, living over a million years later, had a brain of just 465 to 560 cc — barely larger than an australopith&apos;s — yet appears to have practiced deliberate body disposal. Brain size alone does not dictate behavioral complexity. But it does track, roughly, with the metabolic demands of cognition and the capacity for technological innovation. By the time of Turkana Boy, the Acheulean handaxe — a tool requiring planning, bilateral symmetry, and multi-step production — was part of the technological repertoire.
          </p>
        </div>
        <BrainVolumeViz />
      </section>

      <hr className="tb-divider" />

      {/* ─── 6. The Voice ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Voice</h2>
        <p className="tb-section-subtitle">A narrow spinal canal, a congenital anomaly, and the limits of inference</p>
        <div className="tb-prose">
          <p>
            In 1993, Ann MacLarnon measured the thoracic vertebral canal of KNM-WT 15000 and found it narrower than expected for a hominin of this body size. The thoracic canal houses the spinal nerves that control the intercostal muscles — the muscles that govern fine respiratory control during speech. MacLarnon hypothesized that Homo erectus lacked the neural infrastructure for spoken language.
          </p>
          <p>
            The hypothesis was elegant and widely cited. It was also, as it turned out, based on pathology rather than taxonomy. In 2001, Bruce Latimer and James Ohman published a detailed reanalysis showing that Turkana Boy had skeletal dysplasia — a congenital developmental anomaly that narrowed his vertebral canal independent of any species-level trait. The narrow canal was his, not his species&apos;.
          </p>
          <p>
            In 2015, Marc Meyer and Martin Haeusler confirmed the dysplasia diagnosis and demonstrated that other Homo erectus specimens have vertebral canal dimensions within the normal human range. The speech question for the species remains genuinely open. What we can say is that this particular skeleton — the most famous early Homo specimen in the world — cannot answer it.
          </p>
        </div>
        <VoiceDebateViz />
      </section>

      <hr className="tb-divider" />

      {/* ─── 7. The Walk ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Walk</h2>
        <p className="tb-section-subtitle">From Nariokotome to Dmanisi, Java, and the edge of the known world</p>
        <div className="tb-prose">
          <p>
            The body plan that Turkana Boy embodies — long-legged, narrow-trunked, metabolically efficient — is the body plan that walked out of Africa. Homo ergaster/erectus is the first hominin to appear on multiple continents: at Dmanisi in Georgia by 1.77 million years ago, at &apos;Ubeidiya in Israel by 1.4 Ma, at Sangiran in Java by 1.0 Ma, at Lantian in China by 1.15 Ma.
          </p>
          <p>
            But there is a complication. The Dmanisi hominins, the earliest known outside Africa, were smaller-brained (around 630 cc) and slightly more primitive in their postcranial proportions than Turkana Boy. They left Africa 240,000 years before Turkana Boy was born. This means the dispersal did not require the &ldquo;finished&rdquo; Turkana Boy body plan. It required something less: upright posture, efficient locomotion, perhaps the cognitive flexibility to exploit new environments — but not necessarily the full package of tropical adaptations.
          </p>
          <p>
            Turkana Boy, then, is not the cause of the migration. He is the clearest expression of the body that made it possible. He is the proof of concept, fully realized.
          </p>
        </div>
        <MigrationMapViz />
      </section>

      <hr className="tb-divider" />

      {/* ─── 8. The Finder ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Finder</h2>
        <p className="tb-section-subtitle">Kamoya Kimeu and the fragment on the hillside</p>
        <div className="tb-prose">
          <p>
            On August 22, 1984, Kamoya Kimeu was walking a systematic transect on an eroded slope at Nariokotome III, on the western shore of Lake Turkana. Kimeu — a Kenyan fossil hunter who had worked with the Leakey family for decades — spotted a small cranial fragment among the pebbles. It was matchbook-sized, dark with mineralization, and unmistakably hominin.
          </p>
          <p>
            Kimeu had discovered more hominin fossils than any other individual in history. He found KNM-ER 1813 (a Homo habilis skull), KNM-ER 3733 (one of the finest Homo erectus crania ever recovered), and now KNM-WT 15000. His method was deceptively simple: walk slowly, look down, notice what doesn&apos;t belong. The science of human origins depends, at its foundation, on someone being willing to walk the transect one more time.
          </p>
          <p>
            Richard Leakey&apos;s team spent five field seasons — 1984 through 1988 — excavating the site. They screened 1,500 tonnes of sediment from an area of roughly 28 square metres. When they finished, they had 108 bone fragments belonging to a single individual. No other early Homo specimen comes close to this level of completeness.
          </p>
        </div>
      </section>

      <section className="tb-section tb-image-row">
        <SideFigure
          src={IMAGES.acheuleanHandaxe}
          alt="An Acheulean handaxe — the tool tradition associated with Homo ergaster"
          caption="An Acheulean bifaced handaxe. The technology requires forward planning, bilateral symmetry, and dozens of controlled strikes — a cognitive leap beyond earlier Oldowan choppers."
          credit="Portable Antiquities Scheme / Wikimedia Commons"
        />
        <SideFigure
          src={IMAGES.ergasterSkullReplica}
          alt="Replica of a Homo ergaster skull at the World Museum Liverpool"
          caption="A museum-quality replica of a Homo ergaster cranium. The heavy brow ridges and receding forehead distinguish it from modern Homo sapiens; the brain volume does not."
          credit="Johnbod / Wikimedia Commons"
        />
      </section>

      <hr className="tb-divider" />

      {/* ─── 9. The Completeness ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Completeness</h2>
        <p className="tb-section-subtitle">What 108 fragments tell us that no other specimen can</p>
        <div className="tb-prose">
          <p>
            The reason Turkana Boy matters as much as he does is not any single measurement but the fact that so many measurements exist. With 40% of the skeleton preserved, researchers can study the relationship between limb proportions, vertebral anatomy, pelvic geometry, and cranial capacity in a single individual. Most hominin fossils are a jaw fragment, or a femur, or a skullcap. KNM-WT 15000 is a body.
          </p>
          <p>
            The Walker and Leakey monograph of 1993 contains sixteen specialist chapters, each written by a different anatomist, each focused on a different system. There is a chapter on the teeth, a chapter on the vertebral column, a chapter on the pelvis, a chapter on the long bones. The completeness of the specimen made possible a kind of integrative anatomy that is simply unavailable for any other early Homo individual.
          </p>
        </div>
        <SkeletalCompletenessViz />
      </section>

      <hr className="tb-divider" />

      {/* ─── 10. The Inheritance ─── */}
      <section className="tb-section">
        <h2 className="tb-section-heading">The Inheritance</h2>
        <p className="tb-section-subtitle">When you look at this skeleton, you are looking at the first draft of your own body</p>
        <div className="tb-prose">
          <p>
            Every body has a history. Yours is the product of 1.53 million years of refinement since Turkana Boy walked the shore of that lake. Your legs are long for the same thermodynamic reasons his were. Your trunk is narrow for the same radiative geometry. Your growth is slower — the extended childhood his developmental schedule was only beginning to hint at has fully arrived in your species — but the scaffold is the same.
          </p>
          <p>
            He was not human. He could not have learned language the way you learned language, or planned the way you plan, or grieved the way you grieve. But his body was pointed unmistakably in your direction. In the fossil record, there is a before and an after. Before Turkana Boy, hominin bodies are compromises — partially arboreal, partially terrestrial, geometrically ambiguous. After him, the design is clear. The legs are for distance. The trunk is for heat. The arms are freed. The body is a machine for open country, and everything that follows — tools, fire, language, art, migration — happens inside that machine.
          </p>
          <p>
            A child died by a lake in Kenya because of an infected tooth. He left behind 108 fragments of bone and one damaged jaw. And in those fragments, pressed into the sediment of a vanished shore, is the first recognizable draft of the body that would carry our species to every continent on Earth.
          </p>
        </div>
      </section>

      <SideFigure
        src={IMAGES.ergasterSkullDiagram}
        alt="Anatomical diagram of a Homo ergaster skull"
        caption="The cranial architecture of Homo ergaster: pronounced brow ridges, a low forehead, and a braincase that, while smaller than ours, was already large enough to sustain Acheulean technology and long-range planning."
        credit="Jose-Manuel Benito / Wikimedia Commons"
      />

      <figure className="tb-figure tb-figure-side">
        <img src={IMAGES.lakeTurkanaMap} alt="Geographic map of Lake Turkana in the East African Rift" className="tb-image" loading="lazy" />
        <figcaption>
          Lake Turkana sits in Kenya&apos;s Rift Valley — the geological seam that has produced more hominin fossils than anywhere else on Earth.
          <span className="tb-credit">Nicolas Eynaud / Wikimedia Commons</span>
        </figcaption>
      </figure>

      {/* ─── Sources ─── */}
      <section className="tb-sources">
        <h2>Sources</h2>
        <ol className="tb-sources-list">
          {SOURCES.map(s => (
            <li key={s.id} data-num={`[${s.id}]`}>
              {s.text}
              {'doi' in s && s.doi && (
                <> — <a href={`https://doi.org/${s.doi}`} target="_blank" rel="noopener noreferrer" style={{ color: C.lake }}>{s.doi}</a></>
              )}
            </li>
          ))}
        </ol>
        <div className="tb-image-credits">
          <h3>Image Credits</h3>
          <ul className="tb-sources-list">
            {IMAGE_CREDITS.map((ic, i) => (
              <li key={i} data-num={`[img]`}>
                {ic.subject} — {ic.attribution}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
