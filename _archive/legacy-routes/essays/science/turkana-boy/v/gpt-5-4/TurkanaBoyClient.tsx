'use client';

import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { IMAGE_CREDITS, IMAGES, SOURCES } from './images';

const COLORS = {
  strataDark: '#111317',
  boneIvory: '#E5D8C3',
  sedimentSand: '#B9A387',
  turkanaWater: '#5E8D97',
  heatOchre: '#C97A3D',
  charcoalLine: '#2A2F35',
  dustLight: '#F4EBDD',
  warningRust: '#A95A3A',
  softInk: '#69737c',
};

const completenessRegions = [
  {
    id: 'jaw',
    label: 'Jaw and teeth',
    recovered: 14,
    total: 18,
    x: 145,
    y: 58,
    width: 70,
    height: 28,
    detail:
      'The mandible and dentition carry the essay opening: eruption timing, lesion evidence, and the age dispute.',
  },
  {
    id: 'spine',
    label: 'Vertebrae and ribs',
    recovered: 31,
    total: 50,
    x: 132,
    y: 98,
    width: 96,
    height: 108,
    detail:
      'The trunk preserves enough of the vertebral column to raise questions about breathing control without settling them.',
  },
  {
    id: 'pelvis',
    label: 'Pelvis',
    recovered: 9,
    total: 12,
    x: 135,
    y: 212,
    width: 90,
    height: 34,
    detail:
      'Pelvic and trunk geometry help define the heat-dissipating, distance-friendly body plan.',
  },
  {
    id: 'arms',
    label: 'Upper limbs',
    recovered: 12,
    total: 34,
    x: 56,
    y: 126,
    width: 244,
    height: 96,
    detail:
      'The arms are far less central than the legs in this essay. They matter mainly as contrast.',
  },
  {
    id: 'legs',
    label: 'Lower limbs',
    recovered: 42,
    total: 58,
    x: 114,
    y: 252,
    width: 132,
    height: 188,
    detail:
      'This is the engine room: long femora, long lower limbs, and the anatomical argument for sustained terrestrial range.',
  },
] as const;

const ageMarkers = [
  {
    id: 'teeth',
    label: 'Dental age',
    value: 8.5,
    color: COLORS.turkanaWater,
    note: 'Tooth eruption suggests a child closer to eight or nine.',
  },
  {
    id: 'skeleton',
    label: 'Skeletal age',
    value: 11,
    color: COLORS.heatOchre,
    note: 'Postcranial maturation pushes some reconstructions toward eleven.',
  },
] as const;

const growthData = [
  { age: 8, chimpLike: 118, modernHuman: 127, turkanaProjection: 160 },
  { age: 9, chimpLike: 123, modernHuman: 132, turkanaProjection: 168 },
  { age: 10, chimpLike: 128, modernHuman: 137, turkanaProjection: 175 },
  { age: 11, chimpLike: 132, modernHuman: 143, turkanaProjection: 181 },
  { age: 12, chimpLike: 135, modernHuman: 149, turkanaProjection: 186 },
  { age: 13, chimpLike: 137, modernHuman: 156, turkanaProjection: 191 },
  { age: 14, chimpLike: 138, modernHuman: 163, turkanaProjection: 195 },
  { age: 15, chimpLike: 138, modernHuman: 169, turkanaProjection: 198 },
  { age: 16, chimpLike: 138, modernHuman: 173, turkanaProjection: 200 },
];

const bodyPlanData = [
  { body: 'Lucy', legShare: 46, trunkHeatLoad: 71 },
  { body: 'Turkana Boy', legShare: 53, trunkHeatLoad: 58 },
  { body: 'Recent human', legShare: 55, trunkHeatLoad: 55 },
];

const brainData = [
  { species: 'Lucy', cc: 438, fill: COLORS.sedimentSand },
  { species: 'H. habilis', cc: 610, fill: '#9ea3a9' },
  { species: 'Turkana Boy', cc: 880, fill: COLORS.turkanaWater },
  { species: 'Recent human', cc: 1350, fill: COLORS.heatOchre },
];

const LANDMASSES = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Africa' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-18, 35], [5, 37], [25, 34], [35, 31], [43, 12], [51, 11],
          [45, -10], [31, -35], [12, -35], [-1, -25], [-8, -5], [-15, 12],
          [-18, 35],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Eurasia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-10, 35], [10, 44], [32, 46], [46, 43], [60, 50], [85, 54],
          [110, 50], [125, 42], [140, 36], [145, 28], [120, 18], [98, 12],
          [80, 9], [60, 14], [45, 25], [30, 35], [10, 40], [-10, 35],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Arabia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [34, 31], [42, 29], [49, 22], [56, 18], [53, 12], [43, 12], [36, 18], [34, 31],
        ]],
      },
    },
  ],
} as const;

const migrationSites = [
  { name: 'West Turkana', lon: 35.9, lat: 4.1, color: COLORS.heatOchre },
  { name: 'Dmanisi', lon: 44.34, lat: 41.33, color: COLORS.turkanaWater },
  { name: 'Java', lon: 110.4, lat: -7.2, color: COLORS.sedimentSand },
  { name: 'Lantian', lon: 109.4, lat: 34.1, color: COLORS.boneIvory },
] as const;

const migrationRoutes = [
  ['West Turkana', 'Dmanisi'],
  ['West Turkana', 'Java'],
  ['West Turkana', 'Lantian'],
] as const;

const tooltipStyle = {
  backgroundColor: '#1b2026',
  border: `1px solid ${COLORS.charcoalLine}`,
  borderRadius: 14,
  padding: '10px 12px',
  color: COLORS.boneIvory,
  fontSize: 12,
};

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div style={tooltipStyle}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map((entry) => (
        <div key={`${label}-${entry.name}`} style={{ color: entry.color || COLORS.boneIvory }}>
          {entry.name}: {entry.value}
        </div>
      ))}
    </div>
  );
}

/**
 * @diagram-contract
 * @diagram D1-skeletal-completeness
 * @domain paleoanthropology
 *
 * @invariant REGION_WEIGHTING
 *   each region percentage = recovered / total for that region
 *   validation: jaw 14/18 is denser than arms 12/34
 *
 * @invariant LEG_PRIORITY
 *   lower limbs must read as the strongest preserved movement evidence
 *   validation: legs have the highest recovered count and the warmest emphasis
 */
function SkeletalCompletenessViz() {
  const [activeRegion, setActiveRegion] = useState<(typeof completenessRegions)[number]>(
    completenessRegions[4]
  );

  return (
    <section className="tb-viz-card" aria-labelledby="tb-skeleton-title">
      <div className="tb-viz-header">
        <div>
          <p className="tb-kicker">Visualization 1</p>
          <h3 id="tb-skeleton-title">Recovered body, missing body</h3>
        </div>
        <p className="tb-viz-note">108 bones turned a fragmentary fossil into an anatomical argument.</p>
      </div>
      <div className="tb-skeleton-grid">
        <svg viewBox="0 0 320 470" className="tb-skeleton-svg" role="img" aria-label="Schematic skeleton showing recovered regions">
          <circle cx="160" cy="44" r="26" className="tb-skeleton-outline" />
          <line x1="160" y1="72" x2="160" y2="114" className="tb-skeleton-outline" />
          <line x1="160" y1="114" x2="160" y2="212" className="tb-skeleton-outline" />
          <line x1="160" y1="212" x2="160" y2="252" className="tb-skeleton-outline" />
          <line x1="112" y1="140" x2="208" y2="140" className="tb-skeleton-outline" />
          <line x1="112" y1="140" x2="78" y2="206" className="tb-skeleton-outline" />
          <line x1="208" y1="140" x2="242" y2="206" className="tb-skeleton-outline" />
          <line x1="146" y1="252" x2="124" y2="440" className="tb-skeleton-outline" />
          <line x1="174" y1="252" x2="196" y2="440" className="tb-skeleton-outline" />

          {completenessRegions.map((region) => {
            const pct = region.recovered / region.total;
            const isActive = activeRegion.id === region.id;
            return (
              <g key={region.id}>
                <rect
                  x={region.x}
                  y={region.y}
                  width={region.width}
                  height={region.height}
                  rx={10}
                  className={isActive ? 'tb-region-active' : 'tb-region'}
                  style={{ opacity: 0.2 + pct * 0.65 }}
                  onMouseEnter={() => setActiveRegion(region)}
                  onFocus={() => setActiveRegion(region)}
                />
                <text
                  x={region.x + region.width / 2}
                  y={region.y + region.height / 2 + 4}
                  textAnchor="middle"
                  className="tb-region-label"
                >
                  {region.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="tb-skeleton-panel">
          <div className="tb-region-stat">
            <span>Active region</span>
            <strong>{activeRegion.label}</strong>
          </div>
          <div className="tb-region-stat">
            <span>Recovered</span>
            <strong>
              {activeRegion.recovered} / {activeRegion.total}
            </strong>
          </div>
          <div className="tb-region-stat">
            <span>Density</span>
            <strong>{Math.round((activeRegion.recovered / activeRegion.total) * 100)}%</strong>
          </div>
          <p>{activeRegion.detail}</p>
          <ul className="tb-mini-list">
            {completenessRegions.map((region) => (
              <li key={region.id}>
                <button
                  type="button"
                  className={region.id === activeRegion.id ? 'tb-mini-button is-active' : 'tb-mini-button'}
                  onClick={() => setActiveRegion(region)}
                >
                  <span>{region.label}</span>
                  <span>
                    {region.recovered}/{region.total}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * @diagram-contract
 * @diagram D2-age-discrepancy
 * @domain developmental-anatomy
 *
 * @invariant SCALE_DIRECTION
 *   age scale increases left to right from 7 to 13 years
 *   validation: skeletal marker sits to the right of dental marker
 *
 * @invariant DUAL_EVIDENCE
 *   teeth and postcranial evidence must remain visually separate
 *   validation: two tracks, one marker each, distinct colors
 */
function AgeDiscrepancyViz() {
  const min = 7;
  const max = 13;
  const width = 700;
  const scale = d3.scaleLinear().domain([min, max]).range([70, width - 50]);

  return (
    <section className="tb-viz-card" aria-labelledby="tb-age-title">
      <div className="tb-viz-header">
        <div>
          <p className="tb-kicker">Visualization 2</p>
          <h3 id="tb-age-title">Teeth say younger. Bones say older.</h3>
        </div>
        <p className="tb-viz-note">The disagreement matters because height and adult projection depend on it.</p>
      </div>
      <svg viewBox={`0 0 ${width} 220`} className="tb-age-svg" role="img" aria-label="Comparison of dental age and skeletal age estimates">
        {[7, 8, 9, 10, 11, 12, 13].map((tick) => (
          <g key={tick}>
            <line x1={scale(tick)} y1="42" x2={scale(tick)} y2="180" className="tb-age-tick" />
            <text x={scale(tick)} y="198" textAnchor="middle" className="tb-age-tick-label">
              {tick}
            </text>
          </g>
        ))}

        <line x1={scale(min)} y1="78" x2={scale(max)} y2="78" className="tb-age-axis teeth" />
        <line x1={scale(min)} y1="138" x2={scale(max)} y2="138" className="tb-age-axis bones" />

        <text x="10" y="83" className="tb-age-track-label">Dental eruption</text>
        <text x="10" y="143" className="tb-age-track-label">Skeletal maturity</text>

        {ageMarkers.map((marker, index) => (
          <g key={marker.id}>
            <circle
              cx={scale(marker.value)}
              cy={index === 0 ? 78 : 138}
              r="10"
              fill={marker.color}
            />
            <line
              x1={scale(marker.value)}
              y1={index === 0 ? 88 : 128}
              x2={scale(marker.value)}
              y2={index === 0 ? 116 : 106}
              className="tb-age-connector"
            />
            <text
              x={scale(marker.value)}
              y={index === 0 ? 126 : 96}
              textAnchor="middle"
              className="tb-age-marker-label"
            >
              {marker.label}: {marker.value}
            </text>
          </g>
        ))}
      </svg>
      <div className="tb-dual-notes">
        {ageMarkers.map((marker) => (
          <div key={marker.id} className="tb-dual-note">
            <span className="tb-color-chip" style={{ backgroundColor: marker.color }} />
            <strong>{marker.label}</strong>
            <p>{marker.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * @diagram-contract
 * @diagram D3-growth-projection
 * @domain ontogeny
 *
 * @invariant CURVE_ORDER
 *   chimpLike < modernHuman < turkanaProjection through the plotted range
 *   validation: Turkana projection is highest line at every x value
 *
 * @invariant AGE_WINDOW
 *   x-axis spans the disputed adolescent years
 *   validation: chart begins at age 8 and ends at age 16
 */
function GrowthProjectionViz() {
  return (
    <section className="tb-viz-card" aria-labelledby="tb-growth-title">
      <div className="tb-viz-header">
        <div>
          <p className="tb-kicker">Visualization 3</p>
          <h3 id="tb-growth-title">An interrupted growth curve</h3>
        </div>
        <p className="tb-viz-note">Turkana Boy died before adulthood, so every projection is a model, not an observation.</p>
      </div>
      <div className="tb-chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={growthData} margin={{ top: 18, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={COLORS.charcoalLine} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="age" stroke={COLORS.softInk} tickLine={false} axisLine={false} />
            <YAxis stroke={COLORS.softInk} tickLine={false} axisLine={false} width={52} />
            <Tooltip content={<ChartTooltip />} />
            <ReferenceLine x={11} stroke={COLORS.warningRust} strokeDasharray="4 4" />
            <Area type="monotone" dataKey="chimpLike" stroke={COLORS.sedimentSand} fill={`${COLORS.sedimentSand}33`} name="Chimp-like" />
            <Area type="monotone" dataKey="modernHuman" stroke={COLORS.turkanaWater} fill={`${COLORS.turkanaWater}22`} name="Modern human-like" />
            <Area type="monotone" dataKey="turkanaProjection" stroke={COLORS.heatOchre} fill={`${COLORS.heatOchre}22`} name="Turkana projection" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/**
 * @diagram-contract
 * @diagram D4-body-proportions
 * @domain locomotion
 *
 * @invariant LEG_SHARE_ORDER
 *   Lucy < Turkana Boy < recent human for legShare
 *   validation: bars increase across those taxa
 *
 * @invariant HEAT_LOAD_DROP
 *   Turkana Boy should show lower trunkHeatLoad than Lucy
 *   validation: Turkana value is numerically smaller than Lucy
 */
function BodyPlanViz() {
  return (
    <section className="tb-viz-card" aria-labelledby="tb-body-title">
      <div className="tb-viz-header">
        <div>
          <p className="tb-kicker">Visualization 4</p>
          <h3 id="tb-body-title">The body turns into a range machine</h3>
        </div>
        <p className="tb-viz-note">Longer lower limbs and a narrower trunk make heat and distance part of the same story.</p>
      </div>
      <div className="tb-chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={bodyPlanData} margin={{ top: 14, right: 14, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={COLORS.charcoalLine} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="body" stroke={COLORS.softInk} tickLine={false} axisLine={false} />
            <YAxis stroke={COLORS.softInk} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="legShare" name="Leg share index" fill={COLORS.turkanaWater} radius={[8, 8, 0, 0]} />
            <Bar dataKey="trunkHeatLoad" name="Trunk heat load index" fill={COLORS.heatOchre} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/**
 * @diagram-contract
 * @diagram D5-brain-volume
 * @domain comparative-anatomy
 *
 * @invariant TURKANA_POSITION
 *   Turkana Boy sits above Lucy and below recent human
 *   validation: 880 is between 438 and 1350
 */
function BrainVolumeViz() {
  return (
    <section className="tb-viz-card" aria-labelledby="tb-brain-title">
      <div className="tb-viz-header">
        <div>
          <p className="tb-kicker">Visualization 5</p>
          <h3 id="tb-brain-title">880 cc: important, but not the whole story</h3>
        </div>
        <p className="tb-viz-note">The skull matters, but this fossil's deeper claim is postcranial.</p>
      </div>
      <div className="tb-chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={brainData} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid stroke={COLORS.charcoalLine} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="species" stroke={COLORS.softInk} tickLine={false} axisLine={false} />
            <YAxis stroke={COLORS.softInk} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="cc" radius={[8, 8, 0, 0]} name="Endocranial volume">
              {brainData.map((entry) => (
                <Cell key={entry.species} fill={entry.fill} />
              ))}
              <LabelList dataKey="cc" position="top" fill={COLORS.boneIvory} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/**
 * @diagram-contract
 * @diagram D6-voice-debate
 * @domain evidence-evaluation
 *
 * @invariant TWO_SIDED_ARGUMENT
 *   both claims must remain visible in the component
 *   validation: constraint and caution states each retain a title and evidence summary
 */
function VoiceDebateViz() {
  const [mode, setMode] = useState<'constraint' | 'caution'>('constraint');

  const config = {
    constraint: {
      title: 'Older argument',
      color: COLORS.warningRust,
      header: 'Narrowed thoracic canal could imply weaker breathing control.',
      bullets: [
        'Some vertebral measurements looked too small for modern-style respiratory control.',
        'That opened a cautious argument against fully modern speech capacity.',
      ],
    },
    caution: {
      title: 'Later reassessment',
      color: COLORS.turkanaWater,
      header: 'The anatomy may not support such a strong conclusion.',
      bullets: [
        'Later work questioned the reconstruction assumptions and sample comparisons.',
        'The safest reading is not silence, but uncertainty.',
      ],
    },
  } as const;

  const active = config[mode];

  return (
    <section className="tb-viz-card" aria-labelledby="tb-voice-title">
      <div className="tb-viz-header">
        <div>
          <p className="tb-kicker">Visualization 6</p>
          <h3 id="tb-voice-title">What the vertebrae refuse to settle</h3>
        </div>
        <div className="tb-toggle">
          <button
            type="button"
            className={mode === 'constraint' ? 'tb-toggle-button is-active' : 'tb-toggle-button'}
            onClick={() => setMode('constraint')}
          >
            Constraint
          </button>
          <button
            type="button"
            className={mode === 'caution' ? 'tb-toggle-button is-active' : 'tb-toggle-button'}
            onClick={() => setMode('caution')}
          >
            Caution
          </button>
        </div>
      </div>
      <div className="tb-voice-layout">
        <svg viewBox="0 0 340 220" className="tb-voice-svg" role="img" aria-label="Thoracic canal debate explainer">
          <rect x="42" y="24" width="96" height="162" rx="22" className="tb-voice-column muted" />
          <rect x="202" y="24" width="96" height="162" rx="22" className="tb-voice-column muted" />
          <rect
            x={mode === 'constraint' ? 42 : 202}
            y="24"
            width="96"
            height="162"
            rx="22"
            fill={active.color}
            opacity="0.35"
          />
          <line x1="170" y1="24" x2="170" y2="186" className="tb-voice-divider" />
          <text x="90" y="204" textAnchor="middle" className="tb-voice-label">constraint reading</text>
          <text x="250" y="204" textAnchor="middle" className="tb-voice-label">caution reading</text>
        </svg>
        <div className="tb-voice-copy">
          <p className="tb-mode-title" style={{ color: active.color }}>{active.title}</p>
          <p>{active.header}</p>
          <ul className="tb-mini-list plain">
            {active.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * @diagram-contract
 * @diagram D7-migration-map
 * @domain biogeography
 *
 * @invariant ROUTE_ORIGIN
 *   every dispersal route starts at West Turkana
 *   validation: all line segments share the same origin point
 *
 * @invariant SITE_PLOTTING
 *   site coordinates must be projected through d3-geo
 *   validation: points derive from geoNaturalEarth1 projection, not hand-placed CSS
 */
function MigrationMapViz() {
  const projection = useMemo(
    () => d3.geoNaturalEarth1().fitSize([760, 420], LANDMASSES as never),
    []
  );
  const pathBuilder = useMemo(() => d3.geoPath(projection), [projection]);

  const pointMap = useMemo(() => {
    const map = new Map<string, [number, number]>();
    migrationSites.forEach((site) => {
      const projected = projection([site.lon, site.lat]);
      if (projected) {
        map.set(site.name, projected as [number, number]);
      }
    });
    return map;
  }, [projection]);

  return (
    <section className="tb-viz-card" aria-labelledby="tb-map-title">
      <div className="tb-viz-header">
        <div>
          <p className="tb-kicker">Visualization 7</p>
          <h3 id="tb-map-title">The body opens the map</h3>
        </div>
        <p className="tb-viz-note">Turkana Boy does not prove the migration by himself. He explains how it became plausible.</p>
      </div>
      <svg viewBox="0 0 760 420" className="tb-map-svg" role="img" aria-label="Migration route map from East Africa to Eurasia">
        {LANDMASSES.features.map((feature) => (
          <path
            key={feature.properties.name}
            d={pathBuilder(feature as never) || ''}
            className="tb-landmass"
          />
        ))}
        {migrationRoutes.map(([from, to]) => {
          const a = pointMap.get(from);
          const b = pointMap.get(to);
          if (!a || !b) return null;
          return (
            <path
              key={`${from}-${to}`}
              d={`M ${a[0]} ${a[1]} Q ${(a[0] + b[0]) / 2} ${Math.min(a[1], b[1]) - 55} ${b[0]} ${b[1]}`}
              className="tb-route"
            />
          );
        })}
        {migrationSites.map((site) => {
          const point = pointMap.get(site.name);
          if (!point) return null;
          return (
            <g key={site.name}>
              <circle cx={point[0]} cy={point[1]} r="6" fill={site.color} />
              <text x={point[0] + 10} y={point[1] - 10} className="tb-site-label">
                {site.name}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

function FigureBlock({
  src,
  alt,
  caption,
  credit,
}: {
  src: string;
  alt: string;
  caption: string;
  credit: string;
}) {
  return (
    <figure className="tb-figure">
      <img src={src} alt={alt} className="tb-image" loading="lazy" />
      <figcaption>
        <strong>{caption}</strong>
        <span>{credit}</span>
      </figcaption>
    </figure>
  );
}

function HeroFigure({
  src,
  alt,
  caption,
  credit,
}: {
  src: string;
  alt: string;
  caption: string;
  credit: string;
}) {
  return (
    <figure className="tb-figure tb-figure-hero">
      <img src={src} alt={alt} className="tb-image" loading="eager" />
      <figcaption>
        <strong>{caption}</strong>
        <span>{credit}</span>
      </figcaption>
    </figure>
  );
}

function SideFigure({
  src,
  alt,
  caption,
  credit,
}: {
  src: string;
  alt: string;
  caption: string;
  credit: string;
}) {
  return (
    <figure className="tb-figure tb-figure-side">
      <img src={src} alt={alt} className="tb-image" loading="lazy" />
      <figcaption>
        <strong>{caption}</strong>
        <span>{credit}</span>
      </figcaption>
    </figure>
  );
}

export default function TurkanaBoyClient() {
  return (
    <article className="tb-essay">
      <section className="tb-hero">
        <div className="tb-hero-copy">
          <p className="tb-kicker">Science / Paleoanthropology</p>
          <h1>Turkana Boy and the first body built for range</h1>
          <p className="tb-dek">
            The case begins with a wound in the jaw. From that lesion, the essay widens into a larger claim:
            by 1.53 million years ago, our lineage had produced a body that no longer looked like a compromise
            between climbing and walking. It looked engineered for heat, distance, and open ground.
          </p>
          <div className="tb-stat-row">
            <div>
              <span>Age</span>
              <strong>1.53 million years</strong>
            </div>
            <div>
              <span>Recovered bones</span>
              <strong>108</strong>
            </div>
            <div>
              <span>Age at death</span>
              <strong>8 to 11 years</strong>
            </div>
            <div>
              <span>Place</span>
              <strong>West Turkana, Kenya</strong>
            </div>
          </div>
        </div>
        <HeroFigure
          src={IMAGES.turkanaBoyReconstruction}
          alt="Museum reconstruction of Turkana Boy"
          caption="The most complete early Homo skeleton is famous because it lets anatomy become argument."
          credit="Neanderthal Museum / Wikimedia Commons"
        />
      </section>

      <section className="tb-section">
        <div className="tb-section-heading">
          <p className="tb-section-index">01</p>
          <div>
            <h2>The abscess is the right beginning</h2>
            <p>
              The fossil does not open with triumph. It opens with pathology. A lesion below the first molar gives
              the essay its tone: clinical, exact, and restrained. We can describe the damage confidently. We can only
              cautiously infer how much pain it caused or whether it contributed directly to death. That asymmetry is
              the whole discipline in miniature.
            </p>
          </div>
        </div>
        <div className="tb-two-column">
          <p>
            Turkana Boy matters because he compresses multiple questions into one specimen. Age, growth, heat
            adaptation, stride length, migration, and even the limits of speech all become visible through a skeleton
            that is both unusually complete and still unfinished by development. He died before adulthood. The fossil
            is therefore a body and an interrupted future at the same time.
          </p>
          <p>
            That is why this essay keeps returning to confidence boundaries. The jaw lesion is strong evidence. A
            single exact cause of death is not. The lower limbs strongly support modern-style range walking. A fully
            modern life history does not. Good paleoanthropology keeps the claims narrow where the evidence is narrow.
          </p>
        </div>
      </section>

      <AgeDiscrepancyViz />
      <GrowthProjectionViz />

      <section className="tb-section">
        <div className="tb-section-heading">
          <p className="tb-section-index">02</p>
          <div>
            <h2>The age dispute changes every later sentence</h2>
            <p>
              Public summaries often flatten the age question into a single number. The fossil does not cooperate.
              Teeth and bones are not measuring the same process, and they do not reach the same conclusion. If the
              dental estimate is closer to the truth, then Turkana Boy was younger and even more developmentally
              precocious in body form. If the skeletal estimate is stronger, then some later reconstructions become less
              surprising. Either way, the disagreement forces humility.
            </p>
          </div>
        </div>
        <FigureBlock
          src={IMAGES.lakeTurkana}
          alt="Lake Turkana landscape"
          caption="The open basin matters because body plan and climate belong in the same sentence."
          credit="AdamPG / Wikimedia Commons"
        />
      </section>

      <SkeletalCompletenessViz />
      <BodyPlanViz />

      <section className="tb-section">
        <div className="tb-section-heading">
          <p className="tb-section-index">03</p>
          <div>
            <h2>The body is the breakthrough</h2>
            <p>
              Lucy made upright walking undeniable. Turkana Boy makes another transition legible: the emergence of a
              tall, narrow, long-limbed body that treats open equatorial terrain as home rather than hazard. Long legs
              lengthen stride. A narrower trunk reduces heat burden. The same anatomy that helps with thermoregulation
              also makes distance cheaper.
            </p>
          </div>
        </div>
        <div className="tb-two-column">
          <p>
            This is why the essay keeps insisting on the phrase "modern body" while still resisting easy equivalence.
            Turkana Boy is not simply a recent human in old sediment. But he is the first fossil in the cluster that
            lets the ecological logic of our own build come into focus. The body is no longer merely bipedal. It is
            organized for range.
          </p>
          <p>
            That claim depends less on a single glamorous metric than on a package of relations: limb proportions,
            trunk form, stature, and the way those features change the cost of moving through heat. The fossil matters
            because the package appears together.
          </p>
        </div>
      </section>

      <BrainVolumeViz />
      <VoiceDebateViz />

      <section className="tb-section">
        <div className="tb-section-heading">
          <p className="tb-section-index">04</p>
          <div>
            <h2>Not a brain story alone</h2>
            <p>
              An endocranial volume near 880 cc is significant, but the temptation is to let that number dominate the
              narrative. It should not. Turkana Boy matters because the head and the body no longer tell separate
              stories. The skull is intermediate. The postcranial skeleton is already deeply consequential. This is a
              fossil where anatomy below the neck does most of the historical work.
            </p>
          </div>
        </div>
        <div className="tb-two-column">
          <p>
            The same caution applies to speech. Older arguments about the thoracic canal asked whether the skeleton
            lacked the breathing control needed for modern speech. Later reassessments argued that the inference was too
            strong. The proper lesson is not that the debate is solved; it is that fossil evidence has scale, and claims
            should not outrun it.
          </p>
          <p>
            In other words: this skeleton tells us a great deal about movement and body form. It tells us much less
            securely about language. The essay should let those different levels of certainty remain visible.
          </p>
        </div>
      </section>

      <section className="tb-section tb-image-row">
        <SideFigure
          src={IMAGES.acheuleanHandaxe}
          alt="Acheulean handaxe"
          caption="The handaxe belongs to the species-level world Turkana Boy inhabited, not to a personal biography we cannot prove."
          credit="Portable Antiquities Scheme / Wikimedia Commons"
        />
        <SideFigure
          src={IMAGES.ergasterSkullReplica}
          alt="Replica of Homo ergaster skull"
          caption="The skull gives context, but the postcranial body carries the essay's central force."
          credit="Johnbod / Wikimedia Commons"
        />
      </section>

      <section className="tb-section">
        <div className="tb-section-heading">
          <p className="tb-section-index">05</p>
          <div>
            <h2>Technology and terrain frame the child</h2>
            <p>
              Acheulean tools appear in this essay not as props but as ecological context. Large cutting tools imply
              planning, repetition, and a species operating confidently in open landscapes. We cannot say that KNM-WT
              15000 held one particular handaxe. We can say that his body belongs to the same expanding world in which
              such tools matter.
            </p>
          </div>
        </div>
        <div className="tb-two-column">
          <p>
            Lake Turkana is not backdrop. It is one of the essay's key explanatory surfaces: exposed sediment, open
            horizons, strong light, dry air, and the environmental demand for efficient cooling. The design research for
            this project correctly kept returning to brightness and basin scale because the argument lives there.
          </p>
          <p>
            The lesson is that body plan, climate, and technology are braided. A taller, more heat-adapted body is not
            an isolated novelty. It is part of a lineage becoming more capable in exposed terrain over large distances.
          </p>
        </div>
      </section>

      <MigrationMapViz />

      <section className="tb-section">
        <div className="tb-section-heading">
          <p className="tb-section-index">06</p>
          <div>
            <h2>The map opens because the anatomy changes</h2>
            <p>
              Turkana Boy does not personally walk to Dmanisi or Java. But the skeleton helps explain why members of
              early Homo could leave Africa at all. The lower limbs, trunk shape, stature, and overall body economy turn
              dispersal into a biomechanical possibility rather than a narrative abstraction.
            </p>
          </div>
        </div>
        <FigureBlock
          src={IMAGES.lakeTurkanaMap}
          alt="Map of Lake Turkana"
          caption="The fossil's geography is not incidental. East Africa is the launchpoint for the essay's larger spatial claim."
          credit="Nicolas Eynaud / Wikimedia Commons"
        />
      </section>

      <section className="tb-section">
        <div className="tb-section-heading">
          <p className="tb-section-index">07</p>
          <div>
            <h2>Discovery returns the story to people</h2>
            <p>
              Kamoya Kimeu's discovery in 1984 reminds us that scientific revolutions often begin with field attention,
              not abstract theory. The skeleton became famous later. First it had to be noticed, excavated patiently,
              and reconstructed across seasons. Five field seasons and 108 bones turned a locality into a benchmark.
            </p>
          </div>
        </div>
        <div className="tb-two-column">
          <p>
            This matters for tone as much as for history. The essay starts with a jaw lesion and ends with inheritance,
            but discovery sits in the middle as a human hinge. Evidence is never just sitting there. Someone had to see
            it, pick it out from the slope, and recognize what it might become.
          </p>
          <p>
            That is the emotional arc hidden inside the forensic one. A child's remains, preserved incompletely, become
            one of the clearest windows onto our own body plan. Precision and pathos are not enemies here. They are the
            same story told at different scales.
          </p>
        </div>
      </section>

      <section className="tb-section tb-image-row">
        <FigureBlock
          src={IMAGES.lakeTurkanaEliye}
          alt="View over Lake Turkana from Eliye Springs"
          caption="The essay's horizon line should feel open, bright, and dry, not cave-dark or theatrical."
          credit="Wikimedia Commons"
        />
        <FigureBlock
          src={IMAGES.ergasterSkullDiagram}
          alt="Diagram of Homo ergaster skull"
          caption="Comparative anatomy belongs in service of the body-plan argument, not as free-floating taxonomy."
          credit="Jose-Manuel Benito / Wikimedia Commons"
        />
      </section>

      <section className="tb-section tb-conclusion">
        <div className="tb-section-heading">
          <p className="tb-section-index">08</p>
          <div>
            <h2>The first draft still walking</h2>
            <p>
              What makes Turkana Boy moving is not simply the tragedy of a child who died young. It is the compression
              of familiarity into deep time. His body is still different from ours in meaningful ways. But the overall
              design no longer feels alien. When the essay lands, it should make the reader notice their own stride.
            </p>
          </div>
        </div>
        <p>
          Lucy shows that walking upright begins before large brains. Homo naledi shows that small brains do not prevent
          surprising behavior. Turkana Boy marks a different threshold: the moment the body itself begins to look
          unmistakably pointed toward ours. Not complete. Not final. But already organized for the open world we still
          inhabit.
        </p>
      </section>

      <section className="tb-section tb-sources">
        <div className="tb-section-heading">
          <p className="tb-section-index">09</p>
          <div>
            <h2>Sources</h2>
            <p>
              The essay is built from primary fossil description, growth-model debates, locomotor analysis, and museum
              or archive image records consolidated in `SOURCES` and `IMAGE_CREDITS`.
            </p>
          </div>
        </div>
        <div className="tb-source-columns">
          <ol className="tb-source-list">
            {SOURCES.map((source) => (
              <li key={source.id}>
                <span className="tb-source-id">[{source.id}]</span>
                <span>{source.text}</span>
              </li>
            ))}
          </ol>
          <ul className="tb-credit-list">
            {IMAGE_CREDITS.map((credit) => (
              <li key={credit.url}>
                <strong>{credit.subject}</strong>
                <span>{credit.attribution}</span>
                <a href={credit.url} target="_blank" rel="noreferrer">
                  Archive record
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
