'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ScatterChart, Scatter, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell,
  CartesianGrid,
} from 'recharts';
import * as d3 from 'd3';
import { IMAGES, IMAGE_CREDITS, SOURCES } from './images';

/* ────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS
   ──────────────────────────────────────────────────────────────────────────── */

const COLORS = {
  hadarDark: '#1C1610',
  strataBand: '#3D3028',
  boneIvory: '#E8DCC8',
  lucyAmber: '#C4893A',
  afarSienna: '#9B6B3C',
  ochreRed: '#C4572A',
  riftGreen: '#6B7A65',
  tuffGrey: '#8A8477',
  warmBlack: '#231D15',
};

const tooltipStyle: React.CSSProperties = {
  backgroundColor: COLORS.strataBand,
  border: `1px solid ${COLORS.tuffGrey}`,
  borderRadius: 4,
  padding: '10px 14px',
  fontFamily: 'Inter, Helvetica Neue, sans-serif',
  fontSize: 13,
  color: COLORS.boneIvory,
  lineHeight: 1.5,
};

/* ────────────────────────────────────────────────────────────────────────────
   CHART DATA
   ──────────────────────────────────────────────────────────────────────────── */

/**
 * @diagram-contract
 * @diagram D1-anatomical-comparison
 * @domain paleoanthropology
 *
 * @invariant SPECIES_TOGGLE
 *   3 species: Chimpanzee, A. afarensis, Modern Human
 *   validation: toggle controls show/hide columns, active species highlighted
 *
 * @invariant DATA_ACCURACY
 *   measurements sourced from DATASETS.md D1 (Holloway et al. 2004, Lovejoy 1981, Jungers 1982)
 *   validation: bicondylar angle 0° / 9° / 9-11° matches source data
 */
const anatomicalData = [
  { trait: 'Cranial capacity', unit: 'cc', chimp: '~393', lucy: '~438', human: '~1350' },
  { trait: 'Femoral bicondylar angle', unit: '\u00B0', chimp: '~0', lucy: '~9', human: '9\u201311' },
  { trait: 'Intermembral index', unit: '', chimp: '~108', lucy: '~88', human: '~72' },
  { trait: 'Pelvic inlet (AP/transverse)', unit: '', chimp: '~1.0', lucy: '~0.74', human: '~0.80' },
  { trait: 'Lumbar lordosis', unit: '', chimp: 'Absent', lucy: 'Partial', human: 'Present' },
  { trait: 'Foot longitudinal arch', unit: '', chimp: 'Absent', lucy: 'Present', human: 'Present' },
  { trait: 'Foramen magnum position', unit: '', chimp: 'Posterior', lucy: 'Anterior', human: 'Anterior' },
  { trait: 'Estimated stature', unit: 'cm', chimp: '100\u2013130', lucy: '~107', human: '162\u2013176' },
  { trait: 'Estimated body mass', unit: 'kg', chimp: '32\u201342', lucy: '~29', human: '62\u201378' },
];

/**
 * @diagram-contract
 * @diagram D2-pliocene-climate
 * @domain paleoclimatology
 *
 * @invariant X_AXIS_DIRECTION left-to-right
 *   x_values: Ma (millions of years ago), 5.0 on left, 2.0 on right
 *   validation: earlier ages appear left, younger ages appear right
 *
 * @invariant Y_AXIS_SCALE linear
 *   y_values: global temperature anomaly in °C vs present
 *   validation: warmer periods plot higher
 *
 * @invariant LUCY_MARKER
 *   vertical line at 3.2 Ma marks Lucy's time
 */
const climateData = [
  { ma: 5.0, temp: 3.0, co2: 400 },
  { ma: 4.8, temp: 3.2, co2: 410 },
  { ma: 4.5, temp: 2.8, co2: 390 },
  { ma: 4.2, temp: 2.5, co2: 380 },
  { ma: 4.0, temp: 2.8, co2: 390 },
  { ma: 3.8, temp: 2.5, co2: 380 },
  { ma: 3.6, temp: 2.3, co2: 375 },
  { ma: 3.4, temp: 2.5, co2: 380 },
  { ma: 3.2, temp: 2.8, co2: 400 },
  { ma: 3.0, temp: 2.3, co2: 370 },
  { ma: 2.8, temp: 1.8, co2: 350 },
  { ma: 2.7, temp: 1.2, co2: 320 },
  { ma: 2.5, temp: 1.0, co2: 300 },
  { ma: 2.3, temp: 0.8, co2: 290 },
  { ma: 2.0, temp: 0.5, co2: 280 },
];

const siteData = [
  { name: 'Hadar (Lucy)', lat: 11.10, lon: 40.58, specimens: 'AL 288-1, AL 333', age: '3.4\u20132.9 Ma' },
  { name: 'Dikika (Selam)', lat: 11.08, lon: 40.58, specimens: 'DIK-1-1', age: '~3.3 Ma' },
  { name: 'Laetoli', lat: -3.22, lon: 35.35, specimens: 'LH 4, footprints', age: '3.7\u20133.5 Ma' },
  { name: 'Sterkfontein', lat: -26.02, lon: 27.73, specimens: 'Sts 5, StW 573', age: '3.7\u20132.0 Ma' },
  { name: 'Lomekwi', lat: 3.95, lon: 35.85, specimens: 'KNM-WT 40000', age: '3.5\u20133.3 Ma' },
  { name: 'Woranso-Mille', lat: 11.37, lon: 40.45, specimens: 'BRT-VP-3/1', age: '3.5\u20133.3 Ma' },
  { name: 'Ledi-Geraru', lat: 11.12, lon: 40.45, specimens: 'LD 350-1', age: '~2.8 Ma' },
  { name: 'Bouri', lat: 10.27, lon: 40.38, specimens: 'BOU-VP-12/130', age: '~2.5 Ma' },
];

/**
 * @diagram-contract
 * @diagram D4-dietary-analysis
 * @domain stable-isotope-ecology
 *
 * @invariant X_AXIS_MEANING
 *   x_values: \u03B413C (per mil VPDB), more negative = more C3 (forest fruits/leaves)
 *   validation: chimpanzees plot furthest left (~-13), P. boisei plots furthest right (~-0.5)
 *
 * @invariant Y_AXIS_MEANING
 *   y_values: \u03B418O (per mil VPDB), more negative = wetter/cooler habitat
 *
 * @invariant SPECIES_GROUPING
 *   each species cluster occupies a distinct region of the isotope space
 */
const dietaryData = [
  { species: 'A. afarensis', d13c: -8.0, d18o: -2.5, n: 23, diet: 'Mixed C3/C4' },
  { species: 'A. africanus', d13c: -7.5, d18o: -3.0, n: 30, diet: 'Broad mixed' },
  { species: 'P. boisei', d13c: -0.5, d18o: -1.0, n: 24, diet: 'Heavy C4' },
  { species: 'P. robustus', d13c: -6.0, d18o: -2.5, n: 19, diet: 'Mixed, seasonal' },
  { species: 'Early Homo', d13c: -6.5, d18o: -2.0, n: 10, diet: 'Generalist' },
  { species: 'Chimpanzee', d13c: -13.0, d18o: -4.0, n: 15, diet: 'Pure C3' },
];

const dietaryColors: Record<string, string> = {
  'A. afarensis': COLORS.lucyAmber,
  'A. africanus': COLORS.afarSienna,
  'P. boisei': COLORS.ochreRed,
  'P. robustus': COLORS.tuffGrey,
  'Early Homo': COLORS.riftGreen,
  'Chimpanzee': '#7A9A6B',
};

/**
 * @diagram-contract
 * @diagram D5-body-size-dimorphism
 * @domain paleoanthropology
 *
 * @invariant DUAL_BAR_ENCODING
 *   bar1: female mass in kg (lucy-amber)
 *   bar2: male mass in kg (afar-sienna)
 *   validation: gorilla shows largest dimorphism, H. habilis shows smallest
 *
 * @invariant DATA_ACCURACY
 *   values sourced from McHenry 1992, Smith & Jungers 1997
 */
const bodySizeData = [
  { species: 'A. afarensis', femaleMass: 29, maleMass: 45, dimorphism: 1.55 },
  { species: 'A. africanus', femaleMass: 30, maleMass: 41, dimorphism: 1.37 },
  { species: 'P. boisei', femaleMass: 34, maleMass: 49, dimorphism: 1.44 },
  { species: 'H. habilis', femaleMass: 32, maleMass: 37, dimorphism: 1.16 },
  { species: 'H. sapiens', femaleMass: 62, maleMass: 78, dimorphism: 1.26 },
  { species: 'Chimpanzee', femaleMass: 32, maleMass: 42, dimorphism: 1.31 },
  { species: 'Gorilla', femaleMass: 72, maleMass: 170, dimorphism: 2.36 },
];

/**
 * @diagram-contract
 * @diagram D6-contemporary-species
 * @domain paleoanthropology
 *
 * @invariant TIME_BINS
 *   0.25 Ma bins from 4.0 to 2.0 Ma
 *   filled circle = present, empty = absent
 *
 * @invariant SPECIES_RANGES
 *   sourced from DATASETS.md D6; A. afarensis 3.9-2.9 Ma
 */
const speciesPresence = [
  { bin: '4.0\u20133.75', afarensis: true, africanus: false, kPlaytyops: false, deyiremeda: false, garhi: false, pAethiopicus: false, boisei: false, earlyHomo: false },
  { bin: '3.75\u20133.50', afarensis: true, africanus: false, kPlaytyops: true, deyiremeda: true, garhi: false, pAethiopicus: false, boisei: false, earlyHomo: false },
  { bin: '3.50\u20133.25', afarensis: true, africanus: true, kPlaytyops: true, deyiremeda: true, garhi: false, pAethiopicus: false, boisei: false, earlyHomo: false },
  { bin: '3.25\u20133.00', afarensis: true, africanus: true, kPlaytyops: false, deyiremeda: false, garhi: false, pAethiopicus: false, boisei: false, earlyHomo: false },
  { bin: '3.00\u20132.75', afarensis: true, africanus: true, kPlaytyops: false, deyiremeda: false, garhi: false, pAethiopicus: false, boisei: false, earlyHomo: true },
  { bin: '2.75\u20132.50', afarensis: false, africanus: true, kPlaytyops: false, deyiremeda: false, garhi: true, pAethiopicus: true, boisei: false, earlyHomo: true },
  { bin: '2.50\u20132.25', afarensis: false, africanus: true, kPlaytyops: false, deyiremeda: false, garhi: false, pAethiopicus: true, boisei: true, earlyHomo: true },
  { bin: '2.25\u20132.00', afarensis: false, africanus: true, kPlaytyops: false, deyiremeda: false, garhi: false, pAethiopicus: false, boisei: true, earlyHomo: true },
];

/**
 * @diagram-contract
 * @diagram D7-skeletal-completeness
 * @domain taphonomy
 *
 * @invariant BONE_COUNT
 *   47 elements recovered out of 206 total (~23% by count, ~40% functional)
 *   validation: click any bone region to see preservation details
 *
 * @invariant COLOR_ENCODING
 *   recovered bones: lucy-amber (fill), missing: strata-band (dashed outline)
 */
const skeletonBones = [
  { region: 'Cranium', recovered: 4, total: 22, key: 'Fragmentary skull + mandible with teeth', debate: 'Cranial capacity estimate, diet' },
  { region: 'Vertebrae', recovered: 8, total: 24, key: 'Cervical, thoracic, lumbar fragments', debate: 'Lumbar lordosis, T1 fracture' },
  { region: 'Ribs', recovered: 6, total: 24, key: 'Multiple fragments', debate: 'Thorax shape, rib fractures' },
  { region: 'Pelvis + Sacrum', recovered: 3, total: 4, key: 'Nearly complete left os coxa', debate: 'KEY: iliac blade shape proves bipedalism' },
  { region: 'Upper limbs', recovered: 6, total: 60, key: 'Both humeri, left ulna, right radius', debate: 'Fractures (death hypothesis), arm proportions' },
  { region: 'Hands', recovered: 5, total: 54, key: 'Several phalanges, some metacarpals', debate: 'Curved phalanges: arboreal debate' },
  { region: 'Lower limbs', recovered: 7, total: 8, key: 'Both femora, left tibia, left fibula', debate: 'KEY: valgus angle, bicondylar angle' },
  { region: 'Feet', recovered: 4, total: 52, key: 'Some pedal elements', debate: 'Foot arch evidence' },
  { region: 'Scapulae + Clavicles', recovered: 1, total: 4, key: 'Right scapula fragment', debate: 'Shoulder morphology, fracture' },
];

/**
 * @diagram-contract
 * @diagram D8-phylogenetic-position
 * @domain systematics
 *
 * @invariant THREE_MODELS
 *   model 1: Stem Species (traditional) — A. afarensis ancestral to Homo + Paranthropus
 *   model 2: Side Branch — A. afarensis is a cousin, not an ancestor
 *   model 3: Bush/Diversity — multiple lineages, no single stem
 *
 * @invariant TOGGLE_ANIMATION
 *   switching between models animates node positions over 800ms
 */
const phyloModels = [
  {
    id: 'stem',
    name: 'Stem Species',
    proponents: 'Johanson, White, Kimbel',
    description: 'A. afarensis is the last common ancestor of both Homo and Paranthropus.',
    nodes: [
      { id: 'anamensis', label: 'A. anamensis', x: 50, y: 10 },
      { id: 'afarensis', label: 'A. afarensis', x: 50, y: 30, highlight: true },
      { id: 'homo', label: 'Homo lineage', x: 25, y: 70 },
      { id: 'paranthr', label: 'Paranthropus', x: 75, y: 70 },
    ],
    links: [
      { source: 'anamensis', target: 'afarensis' },
      { source: 'afarensis', target: 'homo' },
      { source: 'afarensis', target: 'paranthr' },
    ],
  },
  {
    id: 'side',
    name: 'Side Branch',
    proponents: 'Strait & Grine 2004',
    description: 'A. afarensis has derived features absent in early Homo, making it a cousin, not an ancestor.',
    nodes: [
      { id: 'anamensis', label: 'A. anamensis', x: 50, y: 10 },
      { id: 'afarensis', label: 'A. afarensis', x: 75, y: 50, highlight: true },
      { id: 'unknown', label: '?', x: 40, y: 30 },
      { id: 'homo', label: 'Homo lineage', x: 25, y: 70 },
      { id: 'paranthr', label: 'Paranthropus', x: 55, y: 70 },
    ],
    links: [
      { source: 'anamensis', target: 'unknown' },
      { source: 'anamensis', target: 'afarensis' },
      { source: 'unknown', target: 'homo' },
      { source: 'unknown', target: 'paranthr' },
    ],
  },
  {
    id: 'bush',
    name: 'Diversity / Bush',
    proponents: 'Haile-Selassie, Wood',
    description: 'Multiple lineages coexisted. Identifying a single stem species may be impossible.',
    nodes: [
      { id: 'afarensis', label: 'A. afarensis', x: 20, y: 40, highlight: true },
      { id: 'kplat', label: 'K. platyops', x: 40, y: 35 },
      { id: 'deyi', label: 'A. deyiremeda', x: 55, y: 30 },
      { id: 'africanus', label: 'A. africanus', x: 35, y: 55 },
      { id: 'garhi', label: 'A. garhi', x: 65, y: 50 },
      { id: 'homo', label: 'Homo?', x: 50, y: 75 },
      { id: 'paranthr', label: 'Paranthropus', x: 80, y: 65 },
    ],
    links: [
      { source: 'afarensis', target: 'africanus' },
      { source: 'kplat', target: 'homo' },
      { source: 'deyi', target: 'garhi' },
      { source: 'garhi', target: 'paranthr' },
      { source: 'africanus', target: 'homo' },
    ],
  },
];

/**
 * @diagram-contract
 * @diagram D9-cause-of-death
 * @domain taphonomy
 *
 * @invariant DUAL_HYPOTHESIS
 *   view 1: Kappelman fall hypothesis (fractures from vertical deceleration)
 *   view 2: Taphonomic counter-argument (post-mortem sediment compression)
 *   validation: toggle switches interpretation labels
 *
 * @invariant FRACTURE_SITES
 *   9 documented fracture sites mapped to skeleton regions
 */
const fractureData = [
  { id: 1, bone: 'Right proximal humerus', type: 'Compressive, 4-part', fall: 'Outstretched arm impact during vertical fall', taphonomic: 'Post-mortem sediment compression' },
  { id: 2, bone: 'Left proximal humerus', type: 'Similar compressive', fall: 'Bilateral pattern = simultaneous impact', taphonomic: 'Taphonomic damage can be bilateral' },
  { id: 3, bone: 'Right distal radius', type: 'Greenstick-type', fall: 'Wrist impact (Colles\u2019-like fracture)', taphonomic: 'Common post-mortem break pattern' },
  { id: 4, bone: 'Left proximal femur', type: 'Femoral neck compression', fall: 'Vertical deceleration impact', taphonomic: 'Weight of overlying sediment' },
  { id: 5, bone: 'First thoracic vertebra', type: 'Compression', fall: 'Axial loading from vertical impact', taphonomic: 'Sediment compression, common in vertebrae' },
  { id: 6, bone: 'Left os coxa', type: 'Superior pubic ramus', fall: 'High-energy pelvic impact', taphonomic: 'Extremely common in any fossil' },
  { id: 7, bone: 'Right scapula', type: 'Glenoid fracture', fall: 'Shoulder-first impact', taphonomic: 'Scapulae are thin, break easily' },
  { id: 8, bone: 'Sacrum', type: 'Multiple fractures', fall: 'Vertical impact loading', taphonomic: 'Taphonomic' },
  { id: 9, bone: 'Multiple ribs', type: 'Fractures', fall: 'Thoracic compression from fall', taphonomic: 'Ribs are fragile, almost always broken' },
];

/**
 * @diagram-contract
 * @diagram D10-bipedalism-biomechanics
 * @domain functional-morphology
 *
 * @invariant THREE_SPECIES_COMPARISON
 *   columns: Chimpanzee, A. afarensis, Modern Human
 *   progression: left-to-right shows increasing bipedal adaptation
 *
 * @invariant GAIT_PARAMETERS
 *   10 biomechanical parameters from Lovejoy 1988, Crompton et al. 1998
 */
const biomechanicsData = [
  { param: 'Femoral bicondylar angle', chimp: '~0\u00B0', lucy: '~9\u00B0', human: '9\u201311\u00B0' },
  { param: 'Pelvic shape', chimp: 'Tall, narrow', lucy: 'Short, broad', human: 'Short, broad' },
  { param: 'Knee flexion at midstance', chimp: '~40\u00B0 (bent)', lucy: '~10\u201315\u00B0', human: '~5\u00B0 (extended)' },
  { param: 'Hip extension range', chimp: 'Limited', lucy: 'Moderate', human: 'Full' },
  { param: 'Gluteus medius function', chimp: 'Extensor', lucy: 'Abductor', human: 'Abductor' },
  { param: 'Heel strike', chimp: 'Absent', lucy: 'Present', human: 'Present' },
  { param: 'Longitudinal foot arch', chimp: 'Absent', lucy: 'Present', human: 'Present' },
  { param: 'Stride/leg-length ratio', chimp: '~0.7', lucy: '~0.9\u20131.0', human: '~1.2' },
  { param: 'Relative locomotion cost', chimp: '~4\u00D7 human', lucy: '~1.5\u20132\u00D7', human: '1\u00D7 (baseline)' },
];

const stratData = [
  { member: 'Basal Member', age: '~3.80\u20133.42 Ma', thickness: 45, lithology: 'Lacustrine clays, silts', environment: 'Deep lake', fossils: 'Few hominin fossils', tuff: 'BKT-1 (3.42 Ma)', highlight: false },
  { member: 'Sidi Hakoma Member', age: '~3.42\u20133.22 Ma', thickness: 60, lithology: 'Fluvial sands, silts, tuffs', environment: 'River floodplain', fossils: 'First A. afarensis', tuff: 'SHT (3.42 Ma)', highlight: false },
  { member: 'Denen Dora Member', age: '~3.22\u20133.18 Ma', thickness: 25, lithology: 'Fine silts, clays', environment: 'Floodplain, marshy', fossils: 'AL 288-1 (Lucy), AL 333', tuff: 'DD-2', highlight: true },
  { member: 'Kada Hadar Member', age: '~3.18\u20132.95 Ma', thickness: 40, lithology: 'Coarse fluvial sands', environment: 'Braided river system', fossils: 'Later A. afarensis', tuff: 'KHT (2.96 Ma)', highlight: false },
];

/**
 * @diagram-contract
 * @diagram D12-species-trait-radar
 * @domain comparative-morphology
 *
 * @invariant AXIS_SEMANTICS
 *   6 axes: Cranial Capacity, Body Mass, Molar Area, EQ, Range Size, Dimorphism
 *   values normalized 0-100
 *
 * @invariant SPECIES_TOGGLE
 *   default: A. afarensis + H. habilis; user can add/remove species
 */
const radarAxes = ['Cranial Cap.', 'Body Mass', 'Molar Area', 'EQ', 'Range', 'Dimorphism'];

const radarSpecies = [
  { name: 'A. afarensis', color: COLORS.lucyAmber, values: [14, 38, 31, 40, 100, 100] },
  { name: 'A. africanus', color: COLORS.afarSienna, values: [24, 25, 37, 60, 11, 54] },
  { name: 'P. aethiopicus', color: COLORS.ochreRed, values: [0, 100, 100, 0, 33, 62] },
  { name: 'H. habilis', color: COLORS.riftGreen, values: [100, 0, 14, 100, 56, 0] },
];

const radarData = radarAxes.map((axis, i) => {
  const point: Record<string, string | number> = { axis };
  radarSpecies.forEach(s => { point[s.name] = s.values[i]; });
  return point;
});

/* ────────────────────────────────────────────────────────────────────────────
   HOOKS
   ──────────────────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

/* ────────────────────────────────────────────────────────────────────────────
   SECTION WRAPPER
   ──────────────────────────────────────────────────────────────────────────── */

function Section({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={`lucy-section ${isVisible ? 'lucy-section--visible' : ''}`}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   CUSTOM TOOLTIPS
   ──────────────────────────────────────────────────────────────────────────── */

function DietTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof dietaryData[number] }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <div style={{ fontStyle: 'italic', marginBottom: 4 }}>{d.species}</div>
      <div>{'\u03B4\u00B9\u00B3C'}: {d.d13c}\u2030</div>
      <div>{'\u03B4\u00B9\u2078O'}: {d.d18o}\u2030</div>
      <div>n = {d.n} specimens</div>
      <div style={{ color: COLORS.lucyAmber, marginTop: 4 }}>{d.diet}</div>
    </div>
  );
}

function BodySizeTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ fontStyle: 'italic', marginBottom: 4 }}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.dataKey}>
          {entry.dataKey === 'femaleMass' ? 'Female' : 'Male'}: {entry.value} kg
        </div>
      ))}
    </div>
  );
}

function RadarTooltipCustom({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ marginBottom: 4 }}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   PHYLOGENETIC TREE (D8) — D3-powered SVG
   ──────────────────────────────────────────────────────────────────────────── */

function PhyloTree({ model }: { model: typeof phyloModels[number] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const w = 400, h = 300;

    model.links.forEach(link => {
      const s = model.nodes.find(n => n.id === link.source);
      const t = model.nodes.find(n => n.id === link.target);
      if (!s || !t) return;
      svg.append('line')
        .attr('x1', (s.x / 100) * w).attr('y1', (s.y / 100) * h)
        .attr('x2', (t.x / 100) * w).attr('y2', (t.y / 100) * h)
        .attr('stroke', COLORS.tuffGrey).attr('stroke-width', 1.5)
        .attr('opacity', 0).transition().duration(800)
        .attr('opacity', 0.6);
    });

    model.nodes.forEach(node => {
      const cx = (node.x / 100) * w;
      const cy = (node.y / 100) * h;
      const g = svg.append('g');

      g.append('circle')
        .attr('cx', cx).attr('cy', cy).attr('r', 0)
        .attr('fill', node.highlight ? COLORS.lucyAmber : COLORS.afarSienna)
        .transition().duration(600).delay(200)
        .attr('r', node.highlight ? 8 : 5);

      g.append('text')
        .attr('x', cx).attr('y', cy - 14)
        .attr('text-anchor', 'middle')
        .attr('fill', node.highlight ? COLORS.lucyAmber : COLORS.boneIvory)
        .attr('font-size', node.highlight ? 12 : 11)
        .attr('font-family', 'Inter, sans-serif')
        .attr('font-style', node.label.startsWith('A.') || node.label.startsWith('K.') ? 'italic' : 'normal')
        .text(node.label)
        .attr('opacity', 0).transition().duration(600).delay(400)
        .attr('opacity', 1);
    });
  }, [model]);

  return <svg ref={svgRef} viewBox="0 0 400 300" style={{ width: '100%', maxWidth: 500 }} />;
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════════ */

export default function LucyClient() {
  const progress = useScrollProgress();
  const [activeSpeciesD1, setActiveSpeciesD1] = useState<string[]>(['chimp', 'lucy', 'human']);
  const [fractureView, setFractureView] = useState<'fall' | 'taphonomic'>('fall');
  const [phyloModel, setPhyloModel] = useState(0);
  const [activeRadarSpecies, setActiveRadarSpecies] = useState<string[]>(['A. afarensis', 'H. habilis']);
  const [activeBone, setActiveBone] = useState<number | null>(null);

  const toggleRadarSpecies = useCallback((name: string) => {
    setActiveRadarSpecies(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  }, []);

  return (
    <article className="lucy-essay">
      <div className="lucy-progress">
        <div className="lucy-progress__fill" style={{ height: `${progress}%` }} />
      </div>

  {/* ═══════════════════════════════════════════════════════════════════════
      HERO
      ═══════════════════════════════════════════════════════════════════════ */}
  <header className="lucy-hero">
    <div className="lucy-hero__bg">
      <img src={IMAGES.lucyBlackBg} alt="AL 288-1, the Lucy skeleton, photographed against a dark background under directional museum lighting" />
    </div>
    <div className="lucy-hero__content">
      <p className="lucy-hero__specimen">AL 288-1 &middot; Australopithecus afarensis &middot; 3.2 Ma</p>
      <h1 className="lucy-hero__title">Lucy: Before the Genus Homo</h1>
      <p className="lucy-hero__subtitle">The Fossil That Rewrote the Story of Walking Upright</p>
      <div className="lucy-hero__meta">
        <span>35 min</span>
        <span>24 sources</span>
        <span>12 visualizations</span>
      </div>
    </div>
  </header>

  {/* ═══════════════════════════════════════════════════════════════════════
      SECTION 1 — THE AFAR
      ═══════════════════════════════════════════════════════════════════════ */}
  <Section>
    <div className="lucy-content">
      <h2>The Afar</h2>

      <p>
        The <span className="term">Afar Triangle</span> is one of the most geologically violent
        places on Earth. Wedged between the Ethiopian Plateau, the Somali Plateau, and the Red
        Sea coast, it sits at the triple junction where three tectonic plates are pulling apart
        in slow motion, tearing the African continent along a rift that has been widening for
        roughly 25 million years. The land sinks as the crust thins. In the Danakil Depression,
        the surface drops to more than 100 meters below sea level, making it one of the lowest
        and hottest inhabited regions on the planet. Daytime temperatures routinely exceed 50
        degrees Celsius. Sulphurous hot springs bubble through salt flats. Basalt flows from
        Erta Ale, one of the few volcanoes on Earth with a permanent lava lake, creep across a
        landscape that looks more like another planet than another country.
      </p>

      <p>
        It is precisely this tectonic violence that makes the Afar indispensable to
        paleoanthropology. Rifting does two things that fossil hunters require above all else:
        it creates basins where sediment accumulates and preserves organic remains, and then,
        millions of years later, it uplifts and erodes those sediments back to the surface.
        The Hadar Formation, exposed in the badlands along the lower Awash River in
        Ethiopia&rsquo;s Afar Region, is one such gift of deep time. Its strata span roughly a
        million years of Pliocene history, from about 3.8 to 2.9 million years ago, and within
        those layers lies one of the richest records of early hominin life ever assembled.
      </p>

      <div className="lucy-photo lucy-photo--wide">
        <img src={IMAGES.afarDepression} alt="Satellite view of the Afar Depression, showing the arid rift landscape of northeastern Ethiopia" loading="lazy" />
        <p className="lucy-photo__caption">
          The Afar Depression as seen from the ASTER satellite instrument. Three tectonic plates
          diverge here, creating the rift system that preserved millions of years of sedimentary
          history.
        </p>
      </div>

      <p>
        But 3.2 million years ago, the Hadar region looked nothing like the blasted furnace it
        is today. <span className="term">Paleoenvironmental</span> reconstructions, built from
        fossil pollen, stable isotope ratios in ancient soil carbonates, and the species
        composition of fossilized animal communities, paint a picture of a landscape in mosaic.
        A paleo-Awash river system, fed by seasonal rains from the Ethiopian highlands, wound
        through the lowlands carrying silt that built broad floodplains on either side.
        <span className="term">Gallery forests</span>&mdash;ribbons of closed-canopy woodland
        that hug riverbanks in otherwise open country&mdash;lined the channel, providing shade,
        fruit, and refuge from predators. Beyond the gallery forests, the land opened into
        mixed grassland and scrubland, with patches of Acacia woodland and seasonal wetlands
        where the river overflowed during the rains.
      </p>

      <p>
        This was not a single habitat but a patchwork, and its occupants reflected that
        diversity. Fossilized bones from the Hadar Formation include bovids (ancestral
        antelopes), suids (ancient pigs), proboscideans (elephant relatives), hippopotamids,
        crocodilians, various cercopithecid monkeys, and&mdash;critically&mdash;hominins. The
        same sediments that preserved a three-toed horse also preserved the partial skeleton of
        a small-bodied, upright-walking primate that would, half a century later, become the
        most famous fossil in the world.
      </p>

      <div className="lucy-photo">
        <img src={IMAGES.hadar} alt="The Hadar badlands in Ethiopia, showing layered sedimentary strata exposed by erosion" loading="lazy" />
        <p className="lucy-photo__caption">
          The Hadar badlands today. Millions of years of sedimentary history are exposed in the
          eroded gullies and ridgelines of this arid landscape along the lower Awash River.
        </p>
      </div>

      <p>
        What gives the Hadar Formation its extraordinary chronological precision is volcanic
        ash. The <span className="term">tuff</span> bands&mdash;layers of fine-grained volcanic
        debris ejected during eruptions from the nearby rift volcanoes&mdash;are scattered
        through the sedimentary column like bookmarks. Each tuff contains radioactive
        potassium-40, which decays into argon-40 at a known rate. By measuring the ratio of
        these isotopes in a tuff sample, geochronologists can determine when the eruption
        occurred, and therefore the age of the sediments immediately above and below it. This
        technique, known as <span className="term">potassium-argon dating</span> (and its more
        refined descendant, argon-argon dating), is the reason we can say with confidence that
        the skeleton catalogued as <span className="specimen-id">AL 288-1</span> is
        approximately 3.18 million years old. She was buried in the Denen Dora Member of the
        Hadar Formation, bracketed above and below by datable tuff horizons.
      </p>

      <p>
        The formation is divided into four members, stacked oldest to youngest, each recording
        a different chapter in the environmental history of the Hadar basin. The Basal Member
        preserves a deep lake. The Sidi Hakoma Member records the transition to a river
        floodplain, and it is here that the first <span className="term">Australopithecus
        afarensis</span> fossils appear. The Denen Dora Member, thinner and finer-grained,
        represents a period of marshy floodplain&mdash;and it is in this member that Lucy was
        found. Above it, the Kada Hadar Member records a shift to a higher-energy braided river
        system, with coarser sands and the last of the Hadar&rsquo;s afarensis fossils.
      </p>

      <h3>Stratigraphic Column &mdash; Hadar Formation</h3>

      <div className="lucy-viz">
        <p className="lucy-viz__title">D11: Hadar Formation Stratigraphic Column</p>
        <p className="lucy-viz__subtitle">
          Four members spanning ~3.80&ndash;2.95 Ma. Tuff bands provide radiometric age anchors.
          The Denen Dora Member (highlighted) yielded AL 288-1.
        </p>

        <div className="lucy-strat">
          {stratData.slice().reverse().map((layer, i) => (
            <div
              key={i}
              className={`lucy-strat__layer${layer.highlight ? ' lucy-strat__layer--highlight' : ''}`}
              style={{ minHeight: `${layer.thickness * 1.2}px` }}
            >
              <span className="lucy-strat__age">{layer.age}</span>
              <span className="lucy-strat__name">
                {layer.member}
                {layer.highlight && <> &mdash; <strong>Lucy found here</strong></>}
              </span>
              <span className="lucy-strat__note">{layer.tuff}</span>
            </div>
          ))}
        </div>

        <div className="lucy-viz__legend" style={{ marginTop: '1rem' }}>
          <div className="lucy-viz__legend-item">
            <span className="lucy-viz__legend-swatch" style={{ backgroundColor: COLORS.lucyAmber }} />
            <span>AL 288-1 recovery horizon</span>
          </div>
          <div className="lucy-viz__legend-item">
            <span className="lucy-viz__legend-swatch" style={{ backgroundColor: COLORS.afarSienna }} />
            <span>Sedimentary member</span>
          </div>
        </div>
      </div>

      <p>
        Understanding this stratigraphic context is essential to understanding Lucy. She is not
        a fossil plucked from undifferentiated rock. She is embedded in a precisely dated,
        environmentally characterized, faunal-community-documented slice of the Pliocene. The
        sediment that buried her tells us what the world around her looked like. The animal
        bones found in the same deposits tell us who her neighbors were. The tuff that
        brackets her tells us when she lived. Before the first bone of{' '}
        <span className="specimen-id">AL 288-1</span> was ever described anatomically, the
        geology had already established the stage.
      </p>

      <h3>Key Fossil Sites</h3>

      <div className="lucy-viz">
        <p className="lucy-viz__title">Australopithecus afarensis and Related Hominin Sites</p>
        <p className="lucy-viz__subtitle">
          Major localities across eastern and southern Africa where A. afarensis and
          contemporary hominin species have been recovered.
        </p>
        <table className="lucy-table">
          <thead>
            <tr>
              <th>Site</th>
              <th>Lat</th>
              <th>Lon</th>
              <th>Key Specimens</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {siteData.map((site, i) => (
              <tr key={i}>
                <td>{site.name}</td>
                <td>{site.lat.toFixed(2)}</td>
                <td>{site.lon.toFixed(2)}</td>
                <td><span className="specimen-id">{site.specimens}</span></td>
                <td>{site.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="lucy-divider" />
    </div>
  </Section>

  {/* ═══════════════════════════════════════════════════════════════════════
      SECTION 2 — NOVEMBER 24, 1974
      ═══════════════════════════════════════════════════════════════════════ */}
  <Section>
    <div className="lucy-content">
      <h2>November 24, 1974</h2>

      <p>
        By late November, the field season at Hadar was winding down. Donald Johanson, a young
        paleoanthropologist from Case Western Reserve University, and his graduate student Tom
        Gray had spent weeks surveying the eroded badlands of locality 162, cataloguing fossil
        fragments of ancient fauna&mdash;an antelope jaw here, a horse tooth there. The work
        was painstaking and, most days, uneventful. The Afar heat was relentless. By early
        afternoon, the air above the exposed sediment shimmered, and the impulse to retreat to
        camp was strong.
      </p>

      <p>
        On this particular morning, Johanson and Gray drove out to a different area&mdash;Hadar
        locality 288, an unremarkable gully system that had not yielded anything significant in
        previous surveys. They arrived before the worst of the heat and began the slow,
        methodical walk-through that constitutes surface survey: eyes down, scanning the ground
        for anything that looks organic against the mineral background of sand and silt. Fossil
        bone, mineralized and heavy, catches light differently than rock. After years of field
        experience, the eye learns to find it. But most of the time, there is nothing to find.
      </p>

      <p>
        They mapped the area through the morning. By midday, with the temperature climbing past
        40 degrees Celsius, Johanson suggested heading back. But something drew him to take one
        more look at a small gully they had already passed. It was there, lying on the surface
        among the eroded pebbles and sun-baked silt, that he spotted what looked like a piece
        of arm bone&mdash;a fragment of a proximal ulna. The shape was right. The size was
        small but not too small. It was hominin.
      </p>

      <p>
        And then there was more. A few meters away, a fragment of the back of a skull. Then a
        piece of femur. Then vertebrae. Rib fragments. A piece of pelvis. The bones were not
        scattered randomly over a wide area, as they would be if a carnivore had dismembered a
        carcass and dispersed the remains. They were concentrated, clustered in the sediment of
        a single eroding slope, as though they had been buried together and were only now
        washing out. Johanson and Gray stood in the gully, looking at the accumulating evidence
        on the ground around them, and began to understand what they were seeing: not a
        fragmentary jaw, not a single tooth, not an isolated limb bone, but pieces of a single
        skeleton.
      </p>

      <p>
        This almost never happens. The hominin fossil record is overwhelmingly composed of
        fragments&mdash;isolated teeth, broken jawbones, partial crania. The chances of any
        individual dying in the right place, being buried quickly enough to escape scavengers
        and weathering, remaining undisturbed for millions of years, and then eroding back to
        the surface at the exact moment and location where a trained scientist happens to be
        walking are astronomically small. To find multiple elements of a single individual
        together&mdash;enough to reconstruct a body, to determine sex, to assess stature, to
        analyze gait&mdash;was something that had essentially not happened before for a hominin
        this old.
      </p>

      <blockquote className="lucy-quote">
        <p>
          &ldquo;We realized this was part of a skeleton, something only rarely found in
          human evolution. Normally, we&rsquo;re lucky to find a jawbone, a few teeth.
          Here, we had a knee, ribs, vertebrae, part of a pelvis&mdash;all from a single
          individual.&rdquo;
        </p>
        <cite className="lucy-quote__attribution">
          &mdash; Donald Johanson, recounting the discovery of AL 288-1
        </cite>
      </blockquote>

      <p>
        They marked the site, collected the surface finds, and drove back to camp in a state of
        barely contained exhilaration. Word spread through the expedition within minutes. That
        evening, as the team gathered to celebrate what was already clearly the most important
        find of the season&mdash;possibly the most important find of their careers&mdash;someone
        put a Beatles tape on the camp&rsquo;s portable cassette player. &ldquo;Lucy in the
        Sky with Diamonds&rdquo; drifted through the desert night air. Someone, in the euphoria
        of the moment, called the skeleton Lucy. The name stuck, the way nicknames do when they
        are born at precisely the right emotional pitch. The formal catalogue number would
        be <span className="specimen-id">AL 288-1</span>&mdash;Afar Locality 288, specimen
        1&mdash;but to the world, she would always be Lucy.
      </p>

      <div className="lucy-photo">
        <img src={IMAGES.lucy} alt="The Lucy skeleton (AL 288-1) displayed at the National Museum of Anthropology, Mexico City" loading="lazy" />
        <p className="lucy-photo__caption">
          AL 288-1 &mdash; &ldquo;Lucy.&rdquo; Approximately 47 bone fragments representing
          roughly 40% of a single adult female Australopithecus afarensis, recovered from the
          Denen Dora Member of the Hadar Formation, Ethiopia.
        </p>
      </div>

      <p>
        Over the following three weeks, the team returned to locality 288 day after day,
        sieving the sediment, crawling on hands and knees across the slope, recovering every
        fragment they could find. The bones were fragile and mineralized, stained the dark
        brown of the surrounding sediment. Some were barely larger than a fingernail. Each
        piece was plotted on a site map, bagged, and numbered. By the end of the excavation,
        they had recovered several hundred fragments that, when assembled, represented the
        partial skeleton of a single small-bodied, adult hominin. No duplicate elements were
        found&mdash;no second left femur, no extra mandible&mdash;confirming that all the
        fragments belonged to one individual.
      </p>

      <p>
        The pelvis told them the individual was female. The degree of dental wear and the state
        of epiphyseal fusion told them she was an adult, probably in her twenties. The overall
        morphology&mdash;small brain, large face, curved finger bones, but a pelvis and femur
        adapted for upright walking&mdash;placed her firmly outside the genus Homo. She was
        something older, something different, something that forced a rethinking of the human
        family tree that is still ongoing half a century later.
      </p>

      <hr className="lucy-divider" />
    </div>
  </Section>

  {/* ═══════════════════════════════════════════════════════════════════════
      SECTION 3 — FORTY PERCENT
      ═══════════════════════════════════════════════════════════════════════ */}
  <Section>
    <div className="lucy-content">
      <h2>Forty Percent</h2>

      <p>
        The human skeleton contains 206 bones. Of Lucy&rsquo;s skeleton, 47 elements were
        recovered&mdash;approximately 23% by raw count. But that number is deceptive. Many of
        the &ldquo;missing&rdquo; bones are small, repetitive elements: individual hand
        phalanges, foot bones, wrist carpals. In terms of the major functional regions of the
        body&mdash;the skull, the vertebral column, the rib cage, the pelvis, the upper and
        lower limbs&mdash;Lucy is approximately 40% complete. At the time of her discovery in
        1974, this made her the most complete early hominin skeleton ever found, by a
        considerable margin.
      </p>

      <p>
        To appreciate what this means, you have to understand the baseline. Before Lucy, the
        hominin fossil record older than two million years consisted almost entirely of cranial
        fragments, isolated teeth, and occasional limb bones. The famous{' '}
        <span className="specimen-id">Taung Child</span>, discovered in 1924, was a
        face and <span className="term">endocast</span>&mdash;extraordinary, but it told
        you about the head, not the body. The robust australopithecines from Olduvai Gorge
        and Swartkrans were known from skulls and jaws. <span className="term">Postcranial</span>{' '}
        bones&mdash;the skeleton below the skull&mdash;were rare, fragmentary, and usually
        impossible to assign to a specific individual. You might have a femur from one site
        and a pelvis from another, with no way to know whether they represented the same
        species, the same sex, or the same body size.
      </p>

      <p>
        Lucy changed that. Because her bones came from a single individual, every measurement
        could be cross-referenced with every other measurement. Her femur length could be
        compared to her humerus length to calculate an <span className="term">intermembral
        index</span>&mdash;the ratio of arm to leg length that distinguishes climbers from
        walkers. Her pelvic dimensions could be correlated with her femoral anatomy to
        reconstruct her gait. Her vertebral column, though incomplete, preserved enough
        lumbar vertebrae to assess whether she had the lordotic curvature that bipeds require
        for balance. For the first time, paleoanthropologists could study an early hominin
        not as a collection of isolated parts but as an integrated organism&mdash;a body
        that had moved through the world in a specific way.
      </p>

      <div className="lucy-photo">
        <img src={IMAGES.lucySkeleton} alt="Articulated skeleton of AL 288-1, Lucy, showing the 47 recovered bone elements" loading="lazy" />
        <p className="lucy-photo__caption">
          The recovered elements of AL 288-1 laid out in anatomical position. The brown-stained
          bones represent approximately 40% of the functional skeleton of an adult female
          Australopithecus afarensis.
        </p>
      </div>

      <p>
        The distribution of preserved elements is itself informative. The pelvis is nearly
        complete&mdash;a stroke of extraordinary luck, since the pelvis is the single most
        diagnostic element for determining both locomotion and sex. Both femora survived, along
        with portions of the tibia and fibula, giving a nearly complete picture of the lower
        limb. The upper limbs are also well represented: both humeri, a left ulna, and a right
        radius. Several vertebrae from the cervical, thoracic, and lumbar regions were
        recovered, along with multiple rib fragments. The cranium is more fragmentary&mdash;a
        few skull vault pieces and a partial mandible with teeth&mdash;but enough to estimate
        cranial capacity and dental morphology.
      </p>

      <p>
        What is missing is also telling. The hands and feet are poorly represented, preserving
        only scattered phalanges and a few metacarpals and metatarsals. This is not unusual in
        taphonomic terms&mdash;small bones are more easily carried away by water or scavengers,
        and more easily overlooked during excavation&mdash;but it is frustrating, because hand
        and foot morphology are central to the ongoing debate about how much time Lucy&rsquo;s
        species spent in the trees. The curved <span className="term">phalanges</span> that
        were recovered have fueled decades of argument. Were they functional adaptations for
        climbing, retained from an arboreal ancestor and still in active use? Or were they
        evolutionary baggage&mdash;ancestral features that had not yet been erased by natural
        selection because there was no cost to keeping them?
      </p>

      <p>
        The skeleton&rsquo;s preservation also raised questions about how she died and how she
        came to be buried. The bones show no carnivore tooth marks, no evidence of gnawing or
        scattering by predators. This suggests she was buried relatively quickly after death,
        perhaps by a seasonal flood depositing silt over her remains on the Denen Dora
        floodplain. The question of what killed her&mdash;whether she fell from a tree, as one
        dramatic 2016 hypothesis proposes, or simply died and was buried by ordinary
        geological processes&mdash;remains one of the most debated topics in the Lucy
        literature.
      </p>

      <h3>Skeletal Inventory</h3>

      <div className="lucy-viz">
        <p className="lucy-viz__title">D7: Skeletal Completeness of AL 288-1</p>
        <p className="lucy-viz__subtitle">
          47 of 206 skeletal elements recovered (~40% functional completeness). Select a body
          region to see preservation details and ongoing debates.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          fontFamily: 'Inter, Helvetica Neue, sans-serif',
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: COLORS.lucyAmber }}>47</span>
          <span style={{ fontSize: '0.85rem', color: COLORS.tuffGrey }}>/</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: COLORS.tuffGrey }}>206</span>
          <span style={{ fontSize: '0.85rem', color: COLORS.tuffGrey, marginLeft: '0.5rem' }}>
            elements recovered
          </span>
        </div>

        <div className="lucy-skeleton-viz">
          <div className="lucy-skeleton-viz__svg">
            {skeletonBones.map((bone, i) => (
              <div
                key={i}
                onClick={() => setActiveBone(activeBone === i ? null : i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.75rem',
                  cursor: 'pointer',
                  borderRadius: '3px',
                  borderLeft: `3px solid ${activeBone === i ? COLORS.lucyAmber : 'transparent'}`,
                  backgroundColor: activeBone === i ? `rgba(196, 137, 58, 0.1)` : 'transparent',
                  transition: 'all 200ms ease',
                  fontFamily: 'Inter, Helvetica Neue, sans-serif',
                }}
              >
                <div style={{
                  width: '2.5rem',
                  textAlign: 'center',
                }}>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: COLORS.lucyAmber,
                  }}>
                    {bone.recovered}
                  </span>
                  <span style={{
                    fontSize: '0.7rem',
                    color: COLORS.tuffGrey,
                  }}>
                    /{bone.total}
                  </span>
                </div>
                <div style={{
                  flex: 1,
                  fontSize: '0.85rem',
                  color: COLORS.boneIvory,
                }}>
                  {bone.region}
                </div>
                <span style={{
                  fontFamily: 'Inter, Helvetica Neue, sans-serif',
                  fontSize: '0.75rem',
                  color: COLORS.lucyAmber,
                  minWidth: '3.5rem',
                  textAlign: 'right',
                }}>
                  {bone.recovered}/{bone.total}
                </span>
              </div>
            ))}
          </div>

          <div className="lucy-skeleton-viz__info">
            {activeBone !== null ? (
              <div style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}>
                <h4 style={{
                  fontFamily: 'Inter, Helvetica Neue, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: COLORS.lucyAmber,
                  margin: '0 0 0.75rem',
                }}>
                  {skeletonBones[activeBone].region}
                </h4>
                <p style={{
                  fontSize: '0.8rem',
                  color: COLORS.boneIvory,
                  margin: '0 0 0.5rem',
                  lineHeight: 1.6,
                }}>
                  <strong>Key elements:</strong> {skeletonBones[activeBone].key}
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: COLORS.tuffGrey,
                  margin: '0 0 0.5rem',
                  lineHeight: 1.6,
                }}>
                  <strong style={{ color: COLORS.ochreRed }}>Debate:</strong>{' '}
                  {skeletonBones[activeBone].debate}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: COLORS.tuffGrey,
                  margin: '0',
                }}>
                  {skeletonBones[activeBone].recovered} of {skeletonBones[activeBone].total} elements
                  recovered ({Math.round((skeletonBones[activeBone].recovered / skeletonBones[activeBone].total) * 100)}%)
                </p>
              </div>
            ) : (
              <div style={{
                fontFamily: 'Inter, Helvetica Neue, sans-serif',
                fontSize: '0.8rem',
                color: COLORS.tuffGrey,
                lineHeight: 1.6,
                padding: '1rem 0',
              }}>
                Select a body region to view preserved elements, key anatomical features, and
                the scientific debates each region informs.
              </div>
            )}
          </div>
        </div>
      </div>

      <p>
        Despite the gaps, the skeleton that Johanson and his team pieced together remains one
        of the most important single fossils in the history of the discipline. In the decades
        since her discovery, other early hominins have been found that rival or exceed her
        completeness&mdash;the 4.4-million-year-old <span className="specimen-id">ARA-VP-6/500</span>{' '}
        (&ldquo;Ardi&rdquo;), the 3.3-million-year-old <span className="specimen-id">DIK-1-1</span>{' '}
        (&ldquo;Selam&rdquo;), the 3.67-million-year-old <span className="specimen-id">StW 573</span>{' '}
        (&ldquo;Little Foot&rdquo;). But in 1974, nothing remotely comparable existed. Lucy
        was, for years, the only window into what an early hominin body actually looked like as
        a whole. That window opened onto a creature that walked upright but had a brain the
        size of a chimpanzee&rsquo;s, arms proportioned somewhere between ape and human, and a
        pelvis that told a story the scientific community was not yet ready to fully absorb.
      </p>

      <hr className="lucy-divider" />
    </div>
  </Section>

  {/* ═══════════════════════════════════════════════════════════════════════
      SECTION 4 — BUILT TO WALK
      ═══════════════════════════════════════════════════════════════════════ */}
  <Section>
    <div className="lucy-content">
      <h2>Built to Walk</h2>

      <p>
        The argument that Lucy walked upright does not rest on a single bone or a single
        measurement. It rests on an integrated suite of anatomical features, each of which
        independently points toward <span className="term">obligate bipedalism</span>&mdash;a
        body built not merely to walk on two legs occasionally, as chimpanzees sometimes do,
        but to walk on two legs as the primary and habitual mode of locomotion. The case was
        made most forcefully by C. Owen Lovejoy, a functional morphologist at Kent State
        University, who analyzed Lucy&rsquo;s postcrania in a series of landmark papers through
        the 1970s and 1980s. His argument was anatomical, biomechanical, and comparative, and
        it changed the way the field understood the origins of upright walking.
      </p>

      <p>
        The pelvis is the smoking gun. In quadrupedal apes, the <span className="term">ilium</span>&mdash;the
        large, wing-shaped bone that forms the upper part of the pelvis&mdash;is tall and
        narrow, oriented in the sagittal plane (front to back). This configuration is efficient
        for a body that is held horizontally: the gluteal muscles, attached to the outer
        surface of the ilium, act primarily as hip extensors, pulling the thigh backward during
        climbing and quadrupedal walking. In humans, the ilium has been dramatically reshaped.
        It is short and broad, flared laterally, reorienting the gluteal musculature from
        extensors to <span className="term">abductors</span>. This is the critical
        biomechanical shift. When you walk upright, you spend half of each stride balanced on
        one leg. Without strong hip abductors&mdash;muscles that pull laterally to prevent the
        pelvis from dropping on the unsupported side&mdash;you would topple sideways with every
        step. The short, broad human ilium is the structural solution to this problem.
      </p>

      <p>
        Lucy&rsquo;s pelvis is short and broad. Not as short or as broad as a modern
        human&rsquo;s&mdash;she retains some ancestral features, including a relatively wider
        pelvic inlet&mdash;but unmistakably reorganized for bipedal locomotion. The{' '}
        <span className="term">iliac blade</span> is laterally flared, the{' '}
        <span className="term">sacroiliac joint</span> is broadened, and the attachment sites
        for the gluteus medius and gluteus minimus&mdash;the primary hip abductors&mdash;are
        repositioned in a way that only makes biomechanical sense if the owner of this pelvis
        habitually walked on two legs. Lovejoy was emphatic on this point: the pelvis of{' '}
        <span className="specimen-id">AL 288-1</span> is a bipedal pelvis. There is no
        quadrupedal reading of this anatomy that is mechanically viable.
      </p>

      <div className="lucy-photo">
        <img src={IMAGES.lucyReconstruction} alt="Reconstruction of Australopithecus afarensis based on the Lucy skeleton, showing the full body in an upright bipedal posture" loading="lazy" />
        <p className="lucy-photo__caption">
          Reconstruction of Australopithecus afarensis based on AL 288-1 and other Hadar
          specimens. The short, broad pelvis and angled femur are visible indicators of
          habitual bipedal locomotion.
        </p>
      </div>

      <p>
        The femur tells the same story from a different angle&mdash;literally. In apes that
        walk quadrupedally, the femoral shaft drops nearly vertically from the hip to the knee.
        The <span className="term">bicondylar angle</span>&mdash;the angle between the
        femoral shaft and a line perpendicular to the knee joint surface&mdash;is close to
        zero. In humans, the femur angles inward from hip to knee, creating a bicondylar angle
        of approximately 9 to 11 degrees. This <span className="term">valgus angle</span>{' '}
        brings the knees closer to the body&rsquo;s midline, directly beneath the center of
        gravity, so that each step does not require a lurching lateral weight shift.
        Lucy&rsquo;s bicondylar angle is approximately 9 degrees&mdash;well within the modern
        human range, and dramatically different from any quadruped.
      </p>

      <p>
        Above the pelvis, further evidence accumulates. Lucy&rsquo;s <span className="term">foramen
        magnum</span>&mdash;the hole in the base of the skull through which the spinal cord
        passes&mdash;is positioned anteriorly, beneath the skull rather than behind it. In
        quadrupeds, the foramen magnum faces posteriorly, because the skull is held in front of
        the body and the spine enters from behind. In bipeds, the skull sits atop the spine,
        and the foramen magnum has migrated to the base. Lucy&rsquo;s cranial base, though
        fragmentary, preserves enough to confirm this anterior positioning. Her head sat on top
        of her spine, not in front of it.
      </p>

      <p>
        The vertebral column adds more. Several of Lucy&rsquo;s lumbar vertebrae were
        recovered, and they show features consistent with <span className="term">lumbar
        lordosis</span>&mdash;the inward curvature of the lower back that is a hallmark of
        bipedal posture. This curvature positions the upper body&rsquo;s center of mass
        directly above the hips, an essential adaptation for efficient bipedal balance.
        Chimpanzees lack this curvature; their spines form a single C-shaped arc. Lucy&rsquo;s
        vertebrae suggest her lower back was at least partially lordotic&mdash;not to the
        degree seen in modern humans, but clearly differentiated from the ape condition.
      </p>

      <p>
        The foot, though poorly preserved in Lucy herself, has been illuminated by other{' '}
        <span className="term">A. afarensis</span> specimens. A complete fourth metatarsal
        recovered from Hadar in 2011 (specimen <span className="specimen-id">AL 333-160</span>)
        shows evidence of both transverse and longitudinal arches&mdash;the spring-loaded
        architecture that stores and releases elastic energy during bipedal walking and
        running. The foot of A. afarensis was not a flat, grasping appendage like a
        chimpanzee&rsquo;s. It was an arched, stiffened lever built for propulsive push-off
        during the stance phase of bipedal gait.
      </p>

      <h3>Anatomical Comparison</h3>

      <div className="lucy-viz">
        <p className="lucy-viz__title">D1: Anatomical Comparison Across Species</p>
        <p className="lucy-viz__subtitle">
          Key morphological traits compared across Chimpanzee, A. afarensis (Lucy), and Modern
          Human. Toggle species columns on or off.
        </p>
        <div className="lucy-viz__controls">
          {[
            { key: 'chimp', label: 'Chimpanzee' },
            { key: 'lucy', label: 'A. afarensis' },
            { key: 'human', label: 'Modern Human' },
          ].map((species) => (
            <button
              key={species.key}
              className={`lucy-viz__btn${activeSpeciesD1.includes(species.key) ? ' lucy-viz__btn--active' : ''}`}
              onClick={() =>
                setActiveSpeciesD1((prev: string[]) =>
                  prev.includes(species.key)
                    ? prev.filter((s: string) => s !== species.key)
                    : [...prev, species.key]
                )
              }
            >
              {species.label}
            </button>
          ))}
        </div>
        <table className="lucy-table">
          <thead>
            <tr>
              <th>Trait</th>
              <th>Unit</th>
              {activeSpeciesD1.includes('chimp') && <th>Chimpanzee</th>}
              {activeSpeciesD1.includes('lucy') && (
                <th style={{ color: COLORS.lucyAmber }}>A. afarensis</th>
              )}
              {activeSpeciesD1.includes('human') && <th>Modern Human</th>}
            </tr>
          </thead>
          <tbody>
            {anatomicalData.map((row, i) => (
              <tr key={i}>
                <td>{row.trait}</td>
                <td>{row.unit}</td>
                {activeSpeciesD1.includes('chimp') && <td>{row.chimp}</td>}
                {activeSpeciesD1.includes('lucy') && (
                  <td style={{ color: COLORS.lucyAmber, fontWeight: 500 }}>{row.lucy}</td>
                )}
                {activeSpeciesD1.includes('human') && <td>{row.human}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        But the most vivid evidence for afarensis bipedalism comes not from bones at all. It
        comes from footprints. In 1978, Mary Leakey&rsquo;s team at Laetoli in Tanzania
        uncovered a trail of hominin footprints preserved in a layer of volcanic ash dated to
        approximately 3.66 million years ago. Two individuals&mdash;possibly three&mdash;had
        walked across a fresh ashfall from the Sadiman volcano, and their footprints had been
        preserved when the ash hardened. The prints show a clear heel strike, a longitudinal
        arch, a medial weight transfer, and a strong big-toe push-off&mdash;the signature of
        human-like bipedal gait. There is no divergent hallux, no evidence of grasping. These
        are the footprints of a creature that walked the way you walk.
      </p>

      <p>
        The Laetoli prints are older than Lucy by roughly half a million years, but they are
        attributed to <span className="term">Australopithecus afarensis</span> on the basis
        of contemporaneous fossils from the same site. They confirm, from an entirely
        independent line of evidence, what Lucy&rsquo;s pelvis and femur had already argued:
        by at least 3.7 million years ago, hominins were committed bipeds. They walked upright
        across an open volcanic landscape with a gait that, at the level of footprint
        morphology, is indistinguishable from our own.
      </p>

      <div className="lucy-photo">
        <img src={IMAGES.laetoliFootprints} alt="Replica of the Laetoli footprint trail, showing hominin footprints preserved in 3.66-million-year-old volcanic ash" loading="lazy" />
        <p className="lucy-photo__caption">
          Replica of the Laetoli footprints (3.66 Ma), attributed to Australopithecus
          afarensis. The prints show a modern-like heel strike, arch, and toe-off
          pattern&mdash;direct evidence of habitual bipedal gait half a million years before
          Lucy.
        </p>
      </div>

      <h3>Biomechanical Parameters</h3>

      <div className="lucy-viz">
        <p className="lucy-viz__title">D10: Bipedalism Biomechanics Comparison</p>
        <p className="lucy-viz__subtitle">
          Gait and locomotor parameters across Chimpanzee, A. afarensis, and Modern Human,
          showing the progressive adaptation to obligate bipedalism.
        </p>
        <table className="lucy-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Chimpanzee</th>
              <th style={{ color: COLORS.lucyAmber }}>A. afarensis</th>
              <th>Modern Human</th>
            </tr>
          </thead>
          <tbody>
            {biomechanicsData.map((row, i) => (
              <tr key={i}>
                <td>{row.param}</td>
                <td>{row.chimp}</td>
                <td style={{ color: COLORS.lucyAmber, fontWeight: 500 }}>{row.lucy}</td>
                <td>{row.human}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lucy-viz__legend">
          <div className="lucy-viz__legend-item">
            <span className="lucy-viz__legend-swatch" style={{ backgroundColor: COLORS.tuffGrey }} />
            <span>Quadrupedal / arboreal baseline</span>
          </div>
          <div className="lucy-viz__legend-item">
            <span className="lucy-viz__legend-swatch" style={{ backgroundColor: COLORS.lucyAmber }} />
            <span>A. afarensis (transitional)</span>
          </div>
          <div className="lucy-viz__legend-item">
            <span className="lucy-viz__legend-swatch" style={{ backgroundColor: COLORS.boneIvory }} />
            <span>Modern human bipedal optimum</span>
          </div>
        </div>
      </div>

      <p>
        What the biomechanical data makes clear is that Lucy was not an awkward, shuffling
        biped experimenting with uprightness. Her anatomy represents millions of years of
        selection for bipedal efficiency. The valgus angle, the abductor-configured pelvis, the
        anterior foramen magnum, the arched foot, the heel-strike gait pattern preserved at
        Laetoli&mdash;these are not the features of an animal that occasionally stands up. They
        are the features of an animal that has been walking upright long enough for natural
        selection to have fine-tuned the entire postcranial skeleton for the task. The remaining
        questions&mdash;and they are significant&mdash;concern not whether Lucy walked upright,
        but how efficiently, how exclusively, and how much time her species still spent in the
        trees. Those questions would produce some of the most heated debates in paleoanthropology,
        and they remain unresolved today.
      </p>

      <hr className="lucy-divider" />
    </div>
  </Section>

  {/* ─── Section 5: Or Built to Climb? ─── */}
  <Section>
    <div className="lucy-content">
      <h3>The Locomotion Debate</h3>
      <h2>Or Built to Climb?</h2>

      <p>
        The case for Lucy as an upright walker seemed strong — but not everyone was
        convinced. In 1983, Jack Stern and Randall Susman published a landmark paper that
        challenged the emerging orthodoxy of obligate bipedalism. Their argument was
        anatomical and precise: Lucy{'\u2019'}s hands and feet told a different story from
        her pelvis and knees. Her <span className="term">manual phalanges</span> — the
        finger bones — were curved in a manner typical of primates that spend significant
        time gripping branches. Her <span className="term">pedal phalanges</span>, the toe
        bones, showed the same curvature. These were not the straight, flattened digits of
        an animal that had fully abandoned the trees. They were the fingers and toes of a
        climber.
      </p>

      <p>
        The shoulder told a similar story. Lucy{'\u2019'}s{' '}
        <span className="term">scapular morphology</span> revealed a{' '}
        <span className="term">cranially oriented glenoid fossa</span> — the socket where
        the arm bone meets the shoulder blade pointed upward rather than laterally, as in
        modern humans. This orientation suggests regular overhead arm use, the kind demanded
        by climbing vertically through a forest canopy. In a creature that only walked on
        the ground, this feature would be unnecessary, even maladaptive. Stern and Susman
        argued that it was evidence of a creature that still spent significant time above
        ground level.
      </p>

      <p>
        Then there was the question of proportions. Lucy{'\u2019'}s{' '}
        <span className="term">intermembral index</span> — the ratio of arm length to leg
        length — sat at approximately 88. Modern humans, with their elongated legs built for
        striding, have an index around 72. Chimpanzees, with long arms for swinging and
        climbing, come in around 108. Lucy fell squarely between them, her limb proportions
        suggesting a body that was neither fully committed to the ground nor wholly at home
        in the canopy. She was, Stern and Susman proposed, a{' '}
        <span className="term">facultative biped</span>: an animal that walked upright when
        traveling on the ground but retained significant arboreal capability.
      </p>

      <p>
        The debate that followed lasted decades. On one side stood the{' '}
        {'\u201C'}terrestrial bipedalists,{'\u201D'} led by Owen Lovejoy and Tim White, who
        argued that the curved phalanges were evolutionary leftovers — retained primitive
        features that no longer served a functional purpose. On the other side, Stern, Susman,
        and their allies maintained that natural selection does not preserve energetically
        expensive anatomy without reason. Curved finger bones require robust flexor muscles.
        Upward-facing shoulder sockets demand a different configuration of the rotator cuff.
        These were not vestigial ornaments. They were working adaptations.
      </p>

      <div className="lucy-photo">
        <img
          src={IMAGES.afarensisReconstruction}
          alt="Forensic reconstruction of Australopithecus afarensis based on fossil evidence"
          loading="lazy"
        />
        <div className="lucy-photo__caption">
          Reconstruction of <em>A. afarensis</em>, showing the mosaic of ape-like and
          human-like features that fueled decades of debate about locomotion.
        </div>
      </div>

      <p>
        The evidence continued to accumulate on both sides. In 2012, David Green and
        Zeresenay Alemseged brought a new witness into the argument: the Dikika child,
        known as <span className="specimen-id">Selam (DIK-1-1)</span>. This remarkably
        complete juvenile skeleton, dated to approximately 3.3 million years ago, belonged
        to a young <em>A. afarensis</em> — a child of roughly three years old. Green and
        Alemseged studied the shoulder blade in detail and found that it resembled a young
        gorilla{'\u2019'}s far more closely than a young human{'\u2019'}s. In modern human
        children, the scapula remodels early in development as the infant begins to use its
        arms for reaching and manipulation rather than climbing. The Dikika child{'\u2019'}s
        scapula had not made that transition. It was built for the canopy.
      </p>

      <p>
        Then, in 2016, John Kappelman and his colleagues at the University of Texas
        performed high-resolution CT scans of Lucy{'\u2019'}s original fossils — the first
        time the bones had been subjected to this level of scrutiny. What they found was
        startling. Multiple bones showed fracture patterns consistent with a high-energy
        vertical deceleration event — in plain language, a fall from a considerable height.
        The proximal humerus was shattered in a pattern that orthopedic surgeons recognized
        immediately: it was the kind of break that occurs when a person extends their arms to
        brace against the ground during a fall. The pattern was bilateral, affecting both
        arms, suggesting a simultaneous impact. Kappelman estimated that Lucy had fallen from
        a tree at least twelve meters tall.
      </p>

      <p>
        The finding was controversial — some researchers argued the fractures were
        post-mortem, caused by millions of years of sediment compression rather than a living
        fall. But the implication was profound. If Lucy died falling from a tree, she was in a
        tree. And if she was in a tree, then the facultative biped model was not merely a
        theoretical possibility but a lived reality. The truth, as it so often does in
        paleoanthropology, may lie in a synthesis: Lucy was a capable, habitual biped who also
        slept in trees, foraged in the canopy, and fled predators by climbing. She did not
        choose between ground and sky. She inhabited both.
      </p>

      <hr className="lucy-divider" />
    </div>
  </Section>

  {/* ─── Section 6: The Pliocene World ─── */}
  <Section>
    <div className="lucy-content">
      <h3>The Environment</h3>
      <h2>The Pliocene World</h2>

      <p>
        To understand Lucy, you must understand her world — and her world was not ours. At
        3.2 million years ago, the Earth was in the midst of the{' '}
        <span className="term">mid-Pliocene warm period</span>, a climatic phase when global
        temperatures ran roughly 2.5 to 3 degrees Celsius warmer than the present day.
        Atmospheric carbon dioxide hovered between 380 and 420 parts per million — a range
        that modern civilization has only recently re-entered after millions of years. The
        polar ice caps were smaller. Sea levels stood perhaps 15 to 25 meters higher than
        today. The planet, in its broad strokes, was a warmer and wetter place.
      </p>

      <p>
        But the broad strokes are deceptive. East Africa in the Pliocene was undergoing a
        transformation that would ultimately reshape the trajectory of human evolution. The{' '}
        <span className="term">East African Rift System</span> — a tectonic fracture running
        thousands of kilometers from the Afar Triangle in the north to Mozambique in the
        south — was actively tearing the continent apart. As the rift widened and its margins
        rose into highlands, they created a <span className="term">rain shadow</span> that
        fundamentally altered the climate of the eastern lowlands. Moisture-laden air from
        the Congo Basin, which had once swept freely across the continent, was now intercepted
        by rising escarpments. The forests on the eastern side began to thin, fragment, and
        retreat.
      </p>

      <p>
        What replaced them was not the open savanna of popular imagination. The Hadar region
        where Lucy lived was a complex environmental{' '}
        <span className="term">mosaic</span> — a patchwork of habitats that shifted across
        relatively short distances. Along the river courses,{' '}
        <span className="term">gallery forests</span> persisted, their canopies providing
        shade, fruit, and refuge from predators. Beyond the riparian corridors, the land
        opened into grassland floodplains dotted with seasonal wetlands that expanded during
        the rains and contracted to mudflats during the dry months. Between forest and
        grassland lay transitional zones of bushland and open woodland, where scattered trees
        provided both food and emergency escape routes.
      </p>

      <div className="lucy-photo lucy-photo--wide">
        <img
          src={IMAGES.dallolLandscape}
          alt="The stark volcanic landscape of the Dallol region in the modern Afar Depression"
          loading="lazy"
        />
        <div className="lucy-photo__caption">
          The Dallol landscape in the modern Afar Depression. Three million years ago, this
          region was wetter and more vegetated, but the same tectonic forces were already
          reshaping the terrain.
        </div>
      </div>

      <p>
        The fauna of Lucy{'\u2019'}s world reflected this ecological complexity. Ancestral
        elephants — proboscideans of the genus <em>Deinotherium</em>, with their
        downward-curving tusks — browsed in the woodland margins. Three-toed horses of the
        genus <em>Hipparion</em>, smaller and more gracile than their modern relatives,
        grazed the open plains alongside herds of antelope. Giant pigs, some exceeding the
        size of modern hippos, rooted through the undergrowth. In the rivers and wetlands,
        crocodiles waited, some reaching lengths that dwarfed any living species. And in the
        shadows of the gallery forests, <span className="term">saber-toothed cats</span> of
        the genus <em>Dinofelis</em> hunted — ambush predators whose elongated canines were
        designed for puncturing the hides of slow-moving prey.
      </p>

      <p>
        This was not a landscape that rewarded specialists. It demanded versatility — the
        ability to find food in multiple habitats, to read shifting seasonal cues, to flee
        into trees when a predator appeared on the open plain and to cross open ground when
        the forest offered nothing. It was a world that favored exactly the kind of creature
        Lucy appears to have been: a generalist, comfortable in the margins between worlds,
        able to exploit the full breadth of a mosaic environment that was itself in constant
        flux.
      </p>

      <div className="lucy-photo">
        <img
          src={IMAGES.afarLakeKarum}
          alt="Lake Karum in the Afar Depression, Ethiopia, showing salt flats and arid terrain"
          loading="lazy"
        />
        <div className="lucy-photo__caption">
          Lake Karum in the Afar Depression today — a harsh reminder of the tectonic forces
          that have continued to reshape this landscape over millions of years.
        </div>
      </div>

      <div className="lucy-viz">
        <div className="lucy-viz__title">Pliocene Climate Timeline</div>
        <div className="lucy-viz__subtitle">
          Global temperature anomaly relative to present, from 5.0 to 2.0 million years ago.
          The amber marker indicates Lucy{'\u2019'}s time at 3.2 Ma.
        </div>
        <div className="lucy-viz__chart">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={climateData} margin={{ top: 30, right: 20, bottom: 25, left: 10 }}>
              <defs>
                <linearGradient id="climateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.ochreRed} stopOpacity={0.55} />
                  <stop offset="100%" stopColor={COLORS.ochreRed} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.tuffGrey} opacity={0.15} />
              <XAxis
                dataKey="ma"
                type="number"
                reversed
                domain={[2.0, 5.0]}
                tick={{ fill: COLORS.tuffGrey, fontSize: 11 }}
                stroke={COLORS.tuffGrey}
                tickFormatter={(v: number) => `${v.toFixed(1)} Ma`}
              />
              <YAxis
                tick={{ fill: COLORS.tuffGrey, fontSize: 11 }}
                stroke={COLORS.tuffGrey}
                domain={[0, 4]}
                tickFormatter={(v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}\u00B0C`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value: number) => [`${value > 0 ? '+' : ''}${value.toFixed(1)}\u00B0C`, 'Temp anomaly']}
                labelFormatter={(label: number) => `${label.toFixed(1)} Ma`}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke={COLORS.ochreRed}
                strokeWidth={2}
                fill="url(#climateGradient)"
                dot={(dotProps: any) => {
                  const { cx, cy, payload, index } = dotProps;
                  if (payload.ma === 3.2) {
                    return (
                      <g key={`lucy-marker-${index}`}>
                        <line
                          x1={cx} y1={25} x2={cx} y2={310}
                          stroke={COLORS.lucyAmber}
                          strokeDasharray="5 3"
                          strokeWidth={1.5}
                          opacity={0.75}
                        />
                        <text
                          x={cx}
                          y={18}
                          fill={COLORS.lucyAmber}
                          fontSize={11}
                          textAnchor="middle"
                          fontFamily="Inter, sans-serif"
                          fontWeight={600}
                        >
                          Lucy — 3.2 Ma
                        </text>
                        <circle
                          cx={cx} cy={cy} r={5}
                          fill={COLORS.lucyAmber}
                          stroke={COLORS.hadarDark}
                          strokeWidth={1.5}
                        />
                      </g>
                    );
                  }
                  return <circle key={`climate-dot-${index}`} cx={cx} cy={cy} r={0} fill="none" />;
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="lucy-viz__legend">
          <span className="lucy-viz__legend-item">
            <span className="lucy-viz__legend-swatch" style={{ backgroundColor: COLORS.ochreRed }} />
            Temperature anomaly vs. present
          </span>
          <span className="lucy-viz__legend-item">
            <span className="lucy-viz__legend-swatch" style={{ backgroundColor: COLORS.lucyAmber }} />
            Lucy{'\u2019'}s time (3.2 Ma)
          </span>
        </div>
      </div>

      <p>
        The cooling trend visible in the final stretch of this timeline would accelerate
        dramatically. By 2.8 million years ago, global temperatures had dropped substantially,
        carbon dioxide levels were falling toward 280 ppm, and the grasslands of East Africa
        were expanding at the expense of forest. This cooling would trigger the onset of
        Northern Hemisphere glaciation and mark the beginning of the Pleistocene ice ages.
        Lucy{'\u2019'}s species, <em>Australopithecus afarensis</em>, would disappear from
        the fossil record around 2.9 million years ago — right as the world began its long
        descent into cold.
      </p>

      <hr className="lucy-divider" />
    </div>
  </Section>

  {/* ─── Section 7: What She Ate ─── */}
  <Section>
    <div className="lucy-content">
      <h3>Diet and Ecology</h3>
      <h2>What She Ate</h2>

      <p>
        We cannot watch Lucy eat. We cannot follow her through the gallery forests or observe
        her scanning the floodplain for edible sedges. But locked within her bones and teeth
        is a chemical archive that speaks with remarkable precision about what she consumed
        during her lifetime. The method is called{' '}
        <span className="term">stable carbon isotope analysis</span>, and it exploits a
        fundamental difference in how plants capture carbon from the atmosphere.
      </p>

      <p>
        Plants that use the <span className="term">C3 photosynthetic pathway</span> — which
        includes most trees, shrubs, and forest-floor herbs — preferentially incorporate the
        lighter carbon-12 isotope, producing tissues with distinctly negative{' '}
        <span className="term">{'\u03B4\u00B9\u00B3C'}</span> values. Plants that use the{' '}
        <span className="term">C4 pathway</span> — primarily tropical grasses and sedges —
        discriminate less against the heavier carbon-13, yielding values closer to zero. When
        an animal eats these plants, the isotopic signature passes into its bones and tooth
        enamel, preserved for millions of years in the mineral lattice of{' '}
        <span className="term">bioapatite</span>. By measuring the {'\u03B4\u00B9\u00B3C'}{' '}
        values in fossil teeth, researchers can reconstruct the broad dietary categories of
        animals that have been dead for geological ages.
      </p>

      <p>
        The results for <em>Australopithecus afarensis</em> are telling. With a mean{' '}
        {'\u03B4\u00B9\u00B3C'} value of approximately {'\u2212'}8.0 per mil, Lucy{'\u2019'}s
        species falls squarely in the middle of the isotopic spectrum. Pure forest dwellers
        like chimpanzees, which eat almost exclusively C3 foods — fruits, leaves, bark, and
        pith — show values around {'\u2212'}13 per mil. At the other extreme,{' '}
        <em>Paranthropus boisei</em>, the hyper-robust {'\u201C'}Nutcracker Man{'\u201D'} of
        the East African Plio-Pleistocene, records values near {'\u2212'}0.5 per mil,
        indicating a diet overwhelmingly dominated by C4 resources — probably papyrus sedges
        and grasses. Lucy sits between these poles: she ate mostly forest foods but
        supplemented with meaningful quantities of resources from open, grassy environments.
      </p>

      <p>
        Her teeth corroborate this picture. The molars of <em>A. afarensis</em> are large
        relative to body size, with thick enamel — a combination that resists the wear and
        fracture associated with hard or tough foods.{' '}
        <span className="term">Dental microwear analysis</span>, which examines the
        microscopic scratches and pits left on tooth surfaces by the last meals consumed
        before death, reveals a mixed signal: fine parallel scratches consistent with soft
        fruit consumption, interspersed with deeper pitting that suggests harder fallback
        foods like nuts, seeds, or tough underground storage organs such as tubers and corms.
      </p>

      <p>
        The dietary picture that emerges is one of flexible opportunism. Lucy was not a
        specialist. She did not rely on a single food source or a single habitat. She moved
        between forest and open ground, between the canopy and the floodplain, taking what
        each environment offered as the seasons turned. In the wet months, when the gallery
        forests bore fruit and the understory was rich with young leaves, she may have spent
        most of her time in the trees. In the dry season, when the forests contracted and the
        woodland margins offered little, she ventured onto the open floodplain to dig for
        tubers and harvest the seeds of C4 grasses.
      </p>

      <blockquote className="lucy-quote">
        {'\u201C'}The isotopic data suggest <em>A. afarensis</em> was already exploiting
        open-country resources — but had not abandoned the trees.{'\u201D'}
        <span className="lucy-quote__attribution">Cerling et al., 2013</span>
      </blockquote>

      <p>
        This dietary flexibility was not trivial. It was, in evolutionary terms, a key
        adaptation — perhaps as important as bipedalism itself. In a landscape where
        environments shifted across short distances and where seasonal variation was
        pronounced, the ability to switch food sources was the difference between survival
        and extinction. The more specialized hominin species that came later — the
        massive-jawed <em>Paranthropus</em> lineage that committed so heavily to C4 foods —
        would ultimately go extinct when their preferred habitats vanished. Lucy{'\u2019'}s
        kind, the generalists, the in-between creatures, would give rise to the lineage that
        survived.
      </p>

      <div className="lucy-viz">
        <div className="lucy-viz__title">Dietary Isotope Landscape</div>
        <div className="lucy-viz__subtitle">
          Stable carbon ({'\u03B4\u00B9\u00B3C'}) and oxygen ({'\u03B4\u00B9\u2078O'})
          isotope values for hominin and primate species. More negative{' '}
          {'\u03B4\u00B9\u00B3C'} indicates greater reliance on C3 forest foods.
        </div>
        <div className="lucy-viz__chart">
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.tuffGrey} opacity={0.15} />
              <XAxis
                dataKey="d13c"
                type="number"
                name={'\u03B4\u00B9\u00B3C'}
                domain={[-15, 1]}
                tick={{ fill: COLORS.tuffGrey, fontSize: 11 }}
                stroke={COLORS.tuffGrey}
                label={{
                  value: '\u03B4\u00B9\u00B3C (\u2030) \u2014 more C3 \u2190 \u2192 more C4',
                  position: 'insideBottom',
                  offset: -18,
                  fill: COLORS.tuffGrey,
                  fontSize: 11,
                }}
              />
              <YAxis
                dataKey="d18o"
                type="number"
                name={'\u03B4\u00B9\u2078O'}
                domain={[-5, 0]}
                tick={{ fill: COLORS.tuffGrey, fontSize: 11 }}
                stroke={COLORS.tuffGrey}
                label={{
                  value: '\u03B4\u00B9\u2078O (\u2030)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                  fill: COLORS.tuffGrey,
                  fontSize: 11,
                }}
              />
              <Tooltip content={<DietTooltip />} />
              <Scatter data={dietaryData} name="Species">
                {dietaryData.map((entry, i) => (
                  <Cell
                    key={`diet-${i}`}
                    fill={dietaryColors[entry.species]}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="lucy-viz__legend">
          {Object.entries(dietaryColors).map(([species, color]) => (
            <span key={species} className="lucy-viz__legend-item">
              <span
                className="lucy-viz__legend-swatch"
                style={{ backgroundColor: color }}
              />
              <em>{species}</em>
            </span>
          ))}
        </div>
      </div>

      <hr className="lucy-divider" />
    </div>
  </Section>

  {/* ─── Section 8: Among Her Kind ─── */}
  <Section>
    <div className="lucy-content">
      <h3>Sexual Dimorphism and Social Structure</h3>
      <h2>Among Her Kind</h2>

      <p>
        Lucy was small. At roughly 107 centimeters tall and an estimated 29 kilograms, she
        would have stood barely to the chest of a modern adult human. Her bones are gracile,
        her joints modest, her frame — even by the standards of her species — diminutive. For
        decades, researchers assumed her small size simply represented what{' '}
        <em>A. afarensis</em> looked like. Then the{' '}
        <span className="specimen-id">AL 333</span> site told a different story.
      </p>

      <p>
        The <span className="specimen-id">AL 333</span> locality, known informally as the{' '}
        {'\u201C'}First Family{'\u201D'} site, lies in the same Hadar Formation that yielded
        Lucy, but in slightly different stratigraphic layers. When Donald Johanson and his
        team excavated it between 1975 and 1977, they recovered the remains of at least
        thirteen individual <em>A. afarensis</em> — males, females, and juveniles of various
        ages, all found within a relatively confined area. The preservation was fragmentary
        but the sample was unprecedented: for the first time, researchers had enough
        individuals from a single species, found in a single deposit, to begin asking
        questions about population-level variation.
      </p>

      <p>
        What they found was striking. The largest specimens — presumed males on the basis of
        size and robusticity — suggested individuals standing approximately 151 centimeters
        tall and weighing perhaps 45 kilograms. This gives a{' '}
        <span className="term">sexual dimorphism</span> ratio of roughly 1.55, calculated as
        male body mass divided by female body mass. To put that number in context: modern
        humans have a dimorphism ratio of about 1.26. Chimpanzees are similar, around 1.31.
        But gorillas — whose massive silverback males can weigh more than twice as much as
        adult females — register at approximately 2.36. Lucy{'\u2019'}s species fell between
        humans and gorillas, substantially more dimorphic than we are, though not as extreme
        as the great apes.
      </p>

      <div className="lucy-photo">
        <img
          src={IMAGES.afarensisSkull}
          alt="Cast of an Australopithecus afarensis skull at the Senckenberg Museum"
          loading="lazy"
        />
        <div className="lucy-photo__caption">
          A cast of an <em>A. afarensis</em> skull. The relatively small braincase and
          prominent brow ridges are characteristic of the species.
        </div>
      </div>

      <p>
        What does this level of dimorphism imply about social organization? In living
        primates, the correlation between body size dimorphism and mating system is well
        documented, though imperfect. Species with high dimorphism tend toward{' '}
        <span className="term">polygynous</span> mating systems — social arrangements in
        which a single dominant male maintains reproductive access to multiple females, and
        male-male competition for mates drives selection for larger male body size. Gorillas
        are the textbook example: a silverback controls a harem, and his massive frame is
        both weapon and advertisement. Species with low dimorphism, by contrast, tend toward
        monogamy or multi-male, multi-female groups where male competition is less intense.
      </p>

      <p>
        If the dimorphism estimates for <em>A. afarensis</em> are correct, they suggest a
        social structure closer to the gorilla model than to the human one: small groups
        organized around a dominant male, with intense male-male competition and limited
        pair-bonding. But this interpretation has not gone unchallenged. In 2003, Philip Reno
        and colleagues published a statistical reanalysis of the{' '}
        <span className="specimen-id">AL 333</span> sample and argued that previous studies
        had overestimated the dimorphism by conflating specimens from different time periods
        and possibly different species. When they restricted their analysis to the AL 333
        assemblage alone, they found dimorphism levels closer to those of modern humans —
        around 1.2 to 1.3. If Reno is right, the social implications change dramatically:
        less male competition, possibly more cooperative group structures, perhaps even the
        earliest glimmers of pair-bonding.
      </p>

      <p>
        The debate remains unresolved, in part because the fossil sample, while unusually
        large for paleoanthropology, is still small by the standards of population biology.
        Thirteen individuals is not a census. The methods used to estimate body mass from
        fragmentary postcranial bones carry wide margins of error. And the assumption that
        primate dimorphism maps cleanly onto mating systems has itself come under scrutiny,
        with some researchers arguing that ecological factors — predation pressure, dietary
        competition, substrate use — can drive dimorphism independently of mating behavior.
      </p>

      <p>
        What the <span className="specimen-id">AL 333</span> site does tell us
        unambiguously is that these individuals died together. The{' '}
        <span className="term">taphonomic</span> evidence — the condition of the bones,
        their spatial distribution, the sedimentary context — is consistent with a single
        catastrophic event, most likely a flash flood that swept a group of{' '}
        <em>A. afarensis</em> from the riverbank and buried them in the same deposit. This
        is direct evidence of group living. Whatever the precise social structure, Lucy did
        not wander the Pliocene landscape alone. She lived among her kind, in groups that
        included adults of both sexes and juveniles of various ages. When disaster struck,
        they were together.
      </p>

      <div className="lucy-viz">
        <div className="lucy-viz__title">Body Size and Sexual Dimorphism</div>
        <div className="lucy-viz__subtitle">
          Estimated female and male body mass (kg) across hominin and extant primate species.
          Higher disparity between bars indicates greater sexual dimorphism.
        </div>
        <div className="lucy-viz__chart">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={bodySizeData} margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.tuffGrey} opacity={0.15} />
              <XAxis
                dataKey="species"
                tick={{ fill: COLORS.tuffGrey, fontSize: 10 }}
                stroke={COLORS.tuffGrey}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={55}
              />
              <YAxis
                tick={{ fill: COLORS.tuffGrey, fontSize: 11 }}
                stroke={COLORS.tuffGrey}
                label={{
                  value: 'Body mass (kg)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                  fill: COLORS.tuffGrey,
                  fontSize: 11,
                }}
              />
              <Tooltip content={<BodySizeTooltip />} />
              <Bar dataKey="femaleMass" name="Female" fill={COLORS.lucyAmber} radius={[2, 2, 0, 0]} />
              <Bar dataKey="maleMass" name="Male" fill={COLORS.afarSienna} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lucy-viz__legend">
          <span className="lucy-viz__legend-item">
            <span
              className="lucy-viz__legend-swatch"
              style={{ backgroundColor: COLORS.lucyAmber }}
            />
            Female mass
          </span>
          <span className="lucy-viz__legend-item">
            <span
              className="lucy-viz__legend-swatch"
              style={{ backgroundColor: COLORS.afarSienna }}
            />
            Male mass
          </span>
        </div>
      </div>

      <hr className="lucy-divider" />
    </div>
  </Section>

{/* ════════════════════════════════════════════════════════════════════════════
    SECTION 9 — THE FALL
    ════════════════════════════════════════════════════════════════════════════ */}

<Section>
  <div className="lucy-content">
    <h2>The Fall</h2>

    <p>
      For decades after her discovery, the question of how Lucy died remained unanswerable.
      Fossils preserve anatomy, not biography. Bones record the shape of a life but rarely
      the manner of its ending. Then, in 2016, John Kappelman and his colleagues at the
      University of Texas published a paper in <em>Nature</em> that changed the conversation
      entirely. Using high-resolution computed tomography — scanning Lucy's bones at a
      resolution finer than a grain of sand — they claimed to have found something no one
      had seen before: the signature of her death, written into the fractures themselves.
    </p>

    <p>
      The CT scans revealed <span className="term">compressive fractures</span> across
      multiple skeletal elements. Both humeri were fractured. The right distal radius was
      broken. The left proximal femur showed compression at the neck. The first thoracic
      vertebra, the sacrum, several ribs, the left os coxa, and the right scapula — all
      bore evidence of traumatic damage. Kappelman's team argued that the pattern was not
      random. It was not the kind of diffuse, directionless breakage that sediment
      compression produces over three million years. It was systematic, consistent, and
      anatomically coherent: the fracture signature of a body that had hit the ground
      from a great height.
    </p>

    <p>
      The key evidence lay in the right proximal humerus. The fracture was a sharp,
      clean, four-part compressive break with bone fragments still preserved in their
      original position — not displaced, not scattered, not abraded by the slow grinding
      of geological time. In modern clinical orthopedics, this pattern has a specific
      name and a specific cause. It is what emergency physicians see when a patient
      arrives after a fall from a roof or a ladder: the <span className="term">proximal
      humeral fracture</span> produced when a conscious person throws out their arms
      to break a fall, and the full force of vertical deceleration drives through the
      outstretched limb. The humerus shatters not at the weakest point, but at the
      point of greatest compressive load.
    </p>

    <p>
      The proposed scenario was startlingly specific. Lucy fell from a height of at least
      twelve meters — roughly the height of a four-story building, or the canopy of an
      acacia tree. She may have been sleeping in the branches, as chimpanzees do, or
      foraging for fruit in the upper canopy. The bilateral nature of the humeral
      fractures suggested that she extended both arms simultaneously, a reflexive
      response that implies consciousness at the moment of impact. She was not dead
      when she hit the ground. She was awake, and she tried to save herself.
    </p>

    <p>
      Kappelman speculated that Lucy may have survived the initial impact for a brief,
      terrible interval. The fracture pattern in the pelvis and femur suggested a
      secondary impact — her body crumpling after the arms failed to absorb the full
      force. The rib fractures and vertebral compression pointed to thoracic collapse.
      Death would not have been instantaneous but it would not have been long delayed.
      She would have lain at the base of the tree, broken and unable to move, her
      small body folding in on itself.
    </p>

    <blockquote className="lucy-quote">
      &ldquo;We can see that she broke her arm by throwing out her hand to break her
      fall — a Loss of consciousness and death would have followed swiftly.&rdquo;
      <span className="lucy-quote__attribution">
        — John Kappelman, University of Texas at Austin, 2016
      </span>
    </blockquote>

    <p>
      The counter-argument was fierce, and it came from the taphonomists — the
      scientists who study what happens to bones after death, during the long transit
      from organism to fossil. Their objection was fundamental. Three point two million
      years is an almost inconceivable span of time. During those millions of years,
      Lucy's bones were buried under meters of sediment, compressed by the weight of
      accumulating rock, saturated with groundwater, fractured by mineral crystallization,
      and warped by tectonic forces. The taphonomists argued that virtually every fossil
      hominin ever recovered shows fracture patterns indistinguishable from those Kappelman
      attributed to a fall. Sediment compression routinely produces sharp, clean,
      compressive breaks. Post-mortem fracturing can be bilateral. Ribs and scapulae,
      being thin and fragile, break in almost every specimen regardless of cause of death.
    </p>

    <p>
      The methodological critique cut deeper still. Critics charged that Kappelman's
      team had engaged in a form of confirmation bias — selecting the fractures that
      supported the fall hypothesis while downplaying or ignoring the many fractures
      that did not fit the narrative. In any fossil as old as <span className="specimen-id">
      AL 288-1</span>, the bones are a palimpsest of damage accumulated over geological
      time. Cherry-picking from that record to construct a coherent death scene is, the
      critics argued, not science but storytelling — compelling, evocative, but
      ultimately unfalsifiable. The debate remains unresolved. The fractures are real.
      Their meaning is not.
    </p>

    <div className="lucy-viz">
      <h3 className="lucy-viz__title">Fracture Analysis: Competing Interpretations</h3>
      <p className="lucy-viz__subtitle">
        Nine documented fracture sites on AL 288-1. Toggle between the fall hypothesis
        and the taphonomic counter-argument.
      </p>

      <div className="lucy-viz__controls">
        <button
          className={`lucy-viz__btn ${fractureView === 'fall' ? 'lucy-viz__btn--active' : ''}`}
          onClick={() => setFractureView('fall')}
        >
          Fall Hypothesis
        </button>
        <button
          className={`lucy-viz__btn ${fractureView === 'taphonomic' ? 'lucy-viz__btn--active' : ''}`}
          onClick={() => setFractureView('taphonomic')}
        >
          Taphonomic Counter
        </button>
      </div>

      <div className="lucy-viz__chart">
        <table className="lucy-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Bone</th>
              <th>Fracture Type</th>
              <th>{fractureView === 'fall' ? 'Fall Interpretation' : 'Taphonomic Interpretation'}</th>
            </tr>
          </thead>
          <tbody>
            {fractureData.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.bone}</td>
                <td>{row.type}</td>
                <td>{fractureView === 'fall' ? row.fall : row.taphonomic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lucy-viz__legend">
        <span className="lucy-viz__legend-item">
          <span className="lucy-viz__legend-swatch" style={{ backgroundColor: COLORS.lucyAmber }} />
          Kappelman et al. 2016, <em>Nature</em> 537
        </span>
      </div>
    </div>

    <p>
      What is not in dispute is the strangeness of finding a story in stone — of reading,
      in the fracture lines of a three-million-year-old humerus, the last seconds of an
      individual life. Whether Lucy fell from a tree or whether her bones were broken by
      the slow, impersonal weight of time, the very fact that we can ask the question
      speaks to something remarkable about her preservation, and about the lengths to
      which science will go to recover a single, fleeting moment from the abyss of
      deep time.
    </p>
  </div>
</Section>

<hr className="lucy-divider" />

{/* ════════════════════════════════════════════════════════════════════════════
    SECTION 10 — HER CONTEMPORARIES
    ════════════════════════════════════════════════════════════════════════════ */}

<Section>
  <div className="lucy-content">
    <h2>Her Contemporaries</h2>

    <p>
      It is tempting to imagine Lucy alone — a solitary figure on an empty landscape,
      the sole representative of the human lineage in her time. This is the image that
      popular accounts have reinforced for decades: a single line of ancestors, each
      giving rise to the next, a chain of improvement leading inevitably to us. But the
      fossil record tells a radically different story. Lucy was not alone. Between four
      million and two million years ago, East and South Africa hosted a remarkable,
      almost bewildering diversity of hominin species — a proliferation of evolutionary
      experiments in bipedalism, diet, brain size, and ecological strategy that makes
      the human family tree look less like a tree and more like a bush.
    </p>

    <p>
      At 3.5 million years ago — just three hundred thousand years before Lucy lived — at
      least three hominin species walked the landscapes of eastern Africa simultaneously.{' '}
      <em>Australopithecus afarensis</em> occupied the Ethiopian Rift, ranging from Hadar
      in the north to Laetoli in present-day Tanzania. But she shared the continent
      with <em>Kenyanthropus platyops</em>, a flat-faced hominin discovered by Meave Leakey
      and colleagues at Lomekwi on the western shore of Lake Turkana in 2001. And in 2015,
      Yohannes Haile-Selassie and his team announced the discovery of yet another species,{' '}
      <em>Australopithecus deyiremeda</em>, from the Woranso-Mille area — just fifty
      kilometers from Hadar, and dating to the same time period as Lucy's species. Three
      species of bipedal hominins, living in overlapping ranges, at the same moment in
      geological time.
    </p>

    <div className="lucy-photo">
      <img src={IMAGES.taungChild} alt="The Taung Child skull, the type specimen of Australopithecus africanus, discovered in South Africa in 1924" loading="lazy" />
      <p className="lucy-photo__caption">
        The Taung Child — type specimen of <em>Australopithecus africanus</em>, discovered
        by Raymond Dart in 1924. This juvenile skull from South Africa represents one of
        several hominin species that lived alongside or shortly after <em>A. afarensis</em>.
      </p>
    </div>

    <p>
      Further south, in the limestone caves of the Cradle of Humankind near Johannesburg,{' '}
      <em>Australopithecus africanus</em> had established itself by at least 3.3 million
      years ago. The <span className="specimen-id">Taung Child</span>, discovered by
      Raymond Dart in 1924, was the first australopithecine ever recognized — decades
      before Lucy would be found. <em>A. africanus</em> had a slightly larger brain
      than <em>A. afarensis</em>, a more rounded cranium, and smaller front teeth, but
      it retained the same basic body plan: small, bipedal, with arms still adapted for
      climbing. Whether it descended from Lucy's species or represented an independent
      lineage remains debated.
    </p>

    <p>
      By 2.5 million years ago, the cast of characters had expanded further.{' '}
      <em>Australopithecus garhi</em>, discovered at the Bouri Formation in Ethiopia's
      Middle Awash, appeared with a surprising combination of features — large teeth set
      in a relatively gracile skull, and an association with some of the earliest stone
      tools and cut-marked animal bones. To the north and east, the robust lineage had
      begun its own experiment: <em>Paranthropus aethiopicus</em>, the earliest of the
      so-called robust australopithecines, had evolved massive jaws, enormous molar
      teeth, and a sagittal crest — a ridge of bone along the skull's midline for
      anchoring powerful chewing muscles. This was a species built to process tough,
      fibrous plant foods, a dietary specialist in a world of generalists.
    </p>

    <div className="lucy-photo">
      <img src={IMAGES.paranthropusBoisei} alt="Skull of Paranthropus boisei, a robust australopithecine with massive jaw and sagittal crest" loading="lazy" />
      <p className="lucy-photo__caption">
        <em>Paranthropus boisei</em> — the hyper-robust &ldquo;Nutcracker Man.&rdquo;
        Its enormous molars and powerful jaw represent one of the most extreme dietary
        specializations in hominin evolution. It lived alongside early <em>Homo</em> in
        East Africa between 2.3 and 1.2 million years ago.
      </p>
    </div>

    <p>
      And then there was <em>Homo</em>. By 2.8 million years ago, at the site of
      Ledi-Geraru — less than thirty kilometers from where Lucy was found — a partial
      mandible designated <span className="specimen-id">LD 350-1</span> records the
      earliest known member of our own genus. The jaw is slim, the teeth are small, and
      the chin shows features that foreshadow the direction human evolution would take
      over the next three million years. The emergence of <em>Homo</em> overlapped with
      the final populations of <em>A. afarensis</em>. For a brief window, Lucy's
      descendants — if they were her descendants — walked the same valleys as the
      first members of the lineage that would eventually produce us.
    </p>

    <p>
      This is not a ladder. It is not a march of progress. It is a radiation — an
      adaptive explosion of forms, each exploring a different solution to the challenges
      of Pliocene Africa. Some invested in massive jaws and specialized diets.
      Others remained generalists. At least one lineage began to expand its brain and
      refine its stone tools. Most went extinct. The bush was pruned, again and again,
      by climate shifts, habitat fragmentation, and competition, until only a single
      twig remained. We are that twig, and the diversity that surrounded Lucy is a
      reminder of how contingent our survival was.
    </p>

    <div className="lucy-viz">
      <h3 className="lucy-viz__title">Hominin Species Presence, 4.0 &ndash; 2.0 Ma</h3>
      <p className="lucy-viz__subtitle">
        Time bins of 0.25 million years. Filled circles indicate species presence in
        the fossil record; open circles indicate absence.
      </p>

      <div className="lucy-viz__chart" style={{ overflowX: 'auto' }}>
        <table className="lucy-table">
          <thead>
            <tr>
              <th>Time Bin (Ma)</th>
              <th><em>A. afarensis</em></th>
              <th><em>A. africanus</em></th>
              <th><em>K. platyops</em></th>
              <th><em>A. deyiremeda</em></th>
              <th><em>A. garhi</em></th>
              <th><em>P. aethiopicus</em></th>
              <th><em>P. boisei</em></th>
              <th>Early <em>Homo</em></th>
            </tr>
          </thead>
          <tbody>
            {speciesPresence.map(row => (
              <tr key={row.bin}>
                <td>{row.bin}</td>
                <td style={{ textAlign: 'center' }}>{row.afarensis ? '\u25CF' : '\u25CB'}</td>
                <td style={{ textAlign: 'center' }}>{row.africanus ? '\u25CF' : '\u25CB'}</td>
                <td style={{ textAlign: 'center' }}>{row.kPlaytyops ? '\u25CF' : '\u25CB'}</td>
                <td style={{ textAlign: 'center' }}>{row.deyiremeda ? '\u25CF' : '\u25CB'}</td>
                <td style={{ textAlign: 'center' }}>{row.garhi ? '\u25CF' : '\u25CB'}</td>
                <td style={{ textAlign: 'center' }}>{row.pAethiopicus ? '\u25CF' : '\u25CB'}</td>
                <td style={{ textAlign: 'center' }}>{row.boisei ? '\u25CF' : '\u25CB'}</td>
                <td style={{ textAlign: 'center' }}>{row.earlyHomo ? '\u25CF' : '\u25CB'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lucy-viz__legend">
        <span className="lucy-viz__legend-item">
          <span style={{ fontSize: '1rem' }}>{'\u25CF'}</span> Present in fossil record
        </span>
        <span className="lucy-viz__legend-item">
          <span style={{ fontSize: '1rem' }}>{'\u25CB'}</span> Absent / not yet documented
        </span>
      </div>
    </div>

    <p>
      The species presence table above makes the pattern starkly visible. At 3.5 million
      years ago, three species coexisted. By 2.5 million years, the number had risen to
      five or more, spanning from the Ethiopian Rift to the South African caves. The
      robust australopithecines and early <em>Homo</em> appeared almost simultaneously,
      emerging from a background of diversity that Lucy's generation helped to seed. The
      old metaphor of the &ldquo;missing link&rdquo; — a single chain with a single gap —
      is not merely outdated. It is the wrong shape entirely.
    </p>

    <div className="lucy-viz">
      <h3 className="lucy-viz__title">Comparative Morphology Radar</h3>
      <p className="lucy-viz__subtitle">
        Normalized trait profiles (0&ndash;100) across six morphological dimensions.
        Toggle species to compare body plans.
      </p>

      <div className="lucy-viz__controls">
        {radarSpecies.map(sp => (
          <button
            key={sp.name}
            className={`lucy-viz__btn ${activeRadarSpecies.includes(sp.name) ? 'lucy-viz__btn--active' : ''}`}
            onClick={() => toggleRadarSpecies(sp.name)}
            style={
              activeRadarSpecies.includes(sp.name)
                ? { backgroundColor: sp.color, borderColor: sp.color, color: COLORS.hadarDark }
                : {}
            }
          >
            <em>{sp.name}</em>
          </button>
        ))}
      </div>

      <div className="lucy-viz__chart">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke={COLORS.tuffGrey} strokeOpacity={0.3} />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: COLORS.boneIvory, fontSize: 11, fontFamily: 'Inter, sans-serif' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: COLORS.tuffGrey, fontSize: 10 }}
              axisLine={false}
            />
            {radarSpecies
              .filter(sp => activeRadarSpecies.includes(sp.name))
              .map(sp => (
                <Radar
                  key={sp.name}
                  name={sp.name}
                  dataKey={sp.name}
                  stroke={sp.color}
                  fill={sp.color}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              ))}
            <Tooltip content={<RadarTooltipCustom />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="lucy-viz__legend">
        {radarSpecies
          .filter(sp => activeRadarSpecies.includes(sp.name))
          .map(sp => (
            <span key={sp.name} className="lucy-viz__legend-item">
              <span className="lucy-viz__legend-swatch" style={{ backgroundColor: sp.color }} />
              <em>{sp.name}</em>
            </span>
          ))}
      </div>
    </div>
  </div>
</Section>

<hr className="lucy-divider" />

{/* ════════════════════════════════════════════════════════════════════════════
    SECTION 11 — WHERE SHE SITS
    ════════════════════════════════════════════════════════════════════════════ */}

<Section>
  <div className="lucy-content">
    <h2>Where She Sits</h2>

    <p>
      In 1978, when Donald Johanson and Tim White formally described{' '}
      <em>Australopithecus afarensis</em>, they made a bold claim — one that would define
      the field for a generation. Lucy's species, they argued, was the{' '}
      <span className="term">last common ancestor</span> of all later hominins. She sat
      at the trunk of the human family tree, the single stem from which every subsequent
      branch diverged: the gracile australopithecines, the robust <em>Paranthropus</em>{' '}
      lineage, and our own genus <em>Homo</em>. In their model, <em>A. afarensis</em>{' '}
      was not merely an early relative. She was the root — the species from which all of
      us, ultimately, descend.
    </p>

    <p>
      This &ldquo;Stem Species&rdquo; model was elegant, parsimonious, and enormously
      influential. It rested on two pillars. First, <em>A. afarensis</em> was the
      oldest well-documented hominin at the time of the proposal, predating all other
      known australopithecines and early <em>Homo</em> by at least several hundred
      thousand years. Second, her anatomy appeared to be generalized — lacking the
      extreme specializations that characterized later lineages. She had neither the
      massive jaws of <em>Paranthropus</em> nor the enlarged brain of <em>Homo</em>.
      She seemed, in the language of cladistics, to be <span className="term">
      plesiomorphic</span> — retaining ancestral features from which both specialized
      lineages could plausibly have evolved. For Johanson, White, and their colleague
      William Kimbel, this was the strongest kind of phylogenetic argument: the simplest
      explanation that fit all the available evidence.
    </p>

    <p>
      But cladistics is a demanding discipline, and not all of the evidence pointed in
      the same direction. Through the 1990s and early 2000s, a series of detailed
      morphological analyses began to identify features in <em>A. afarensis</em> that
      appeared to be <span className="term">derived</span> — specialized traits shared
      with later australopithecines but absent in early <em>Homo</em>. The shape of
      the mandibular ramus, certain features of the dental arcade, aspects of the
      facial architecture — these suggested that <em>A. afarensis</em> might not be the
      ancestor of <em>Homo</em> at all, but rather a close relative on a parallel branch.
      Daniel Strait and Frederick Grine published a landmark cladistic analysis in 2004
      that placed <em>A. afarensis</em> on its own branch — a cousin to the lineage
      leading to humans, not a direct ancestor. In this &ldquo;Side Branch&rdquo; model,
      the true ancestor of <em>Homo</em> was an unknown species, perhaps one that has
      not yet been discovered.
    </p>

    <p>
      Then the bush got thicker. The discovery of <em>Kenyanthropus platyops</em> in 2001,
      followed by <em>Australopithecus deyiremeda</em> in 2015, demonstrated that the
      middle Pliocene hosted far more hominin diversity than anyone had imagined when
      Johanson and White first proposed their stem-species hypothesis. If three, four, or
      even five species coexisted between 3.8 and 3.0 million years ago, then the
      probability of correctly identifying any single one as <em>the</em> ancestor of all
      later hominins becomes vanishingly small. Bernard Wood and Yohannes Haile-Selassie
      have been the most prominent advocates of this third view — the &ldquo;Bush&rdquo;
      or &ldquo;Diversity&rdquo; model — which holds that the hominin family tree in the
      middle Pliocene was a radiation, not a sequence, and that our attempts to draw clean
      lines of descent through it may reflect our desire for narrative order more than the
      biological reality.
    </p>

    <div className="lucy-viz">
      <h3 className="lucy-viz__title">Phylogenetic Position of <em>A. afarensis</em></h3>
      <p className="lucy-viz__subtitle">
        Three competing models for Lucy&rsquo;s place in the hominin family tree.
        Select a model to view its proposed topology.
      </p>

      <div className="lucy-viz__controls">
        {['Stem Species', 'Side Branch', 'Bush / Diversity'].map((label, i) => (
          <button
            key={label}
            className={`lucy-viz__btn ${phyloModel === i ? 'lucy-viz__btn--active' : ''}`}
            onClick={() => setPhyloModel(i)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="lucy-viz__chart">
        <PhyloTree model={phyloModels[phyloModel]} />
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: 'rgba(196, 137, 58, 0.08)',
        borderRadius: 4,
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        lineHeight: 1.6,
        color: COLORS.boneIvory,
      }}>
        <div style={{ color: COLORS.lucyAmber, fontWeight: 600, marginBottom: '0.4rem' }}>
          {phyloModels[phyloModel].name}
        </div>
        <div style={{ color: COLORS.tuffGrey, fontSize: '0.8rem', marginBottom: '0.4rem' }}>
          Proponents: {phyloModels[phyloModel].proponents}
        </div>
        <div>{phyloModels[phyloModel].description}</div>
      </div>
    </div>

    <p>
      The debate is not merely academic. The question of where <em>A. afarensis</em> sits
      in our family tree is, at root, a question about the nature of human evolution itself.
      If the Stem Species model is correct, then evolution was relatively orderly — a
      single trunk giving rise to branches in a pattern we can, in principle, reconstruct.
      If the Bush model is correct, then our origins were chaotic, contingent, and far more
      complex than any simple tree can represent. The truth almost certainly lies somewhere
      in the deeply uncomfortable middle: we know enough to see the complexity, but not
      yet enough to resolve it.
    </p>

    <p>
      What is remarkable is that all three models agree on one point. Whatever her exact
      phylogenetic position, <em>Australopithecus afarensis</em> occupies a critical
      zone in hominin evolution — the interval between 4.0 and 3.0 million years ago
      when the fundamental hominin body plan was established. She walked upright. She
      had small canines and a parabolic dental arcade. She lived in social groups. She
      exploited a range of habitats from woodlands to open floodplains. Whether she was
      our direct ancestor or our evolutionary cousin, she represents the kind of animal
      from which all later hominins — including us — emerged. Her significance does not
      depend on a line drawn on a cladogram. It depends on what she was.
    </p>
  </div>
</Section>

<hr className="lucy-divider" />

{/* ════════════════════════════════════════════════════════════════════════════
    SECTION 12 — DINKINESH
    ════════════════════════════════════════════════════════════════════════════ */}

<Section>
  <div className="lucy-content">
    <h2>Dinkinesh</h2>

    <p>
      In Ethiopia, Lucy is not called Lucy. She is <strong>Dinkinesh</strong> — an
      Amharic word that means &ldquo;you are marvelous.&rdquo; The name was given to
      her by the Ethiopian members of the expedition team, and it captures something
      that the catalogue number <span className="specimen-id">AL 288-1</span> cannot:
      the astonishment of encountering a creature who lived 3.2 million years ago and
      who, against every statistical probability, left behind enough of herself to be
      known.
    </p>

    <p>
      Lucy is the most famous fossil in the world. This is not because she is the oldest
      hominin — <em>Ardipithecus ramidus</em>, at 4.4 million years, predates her by more
      than a million years, and <em>Sahelanthropus tchadensis</em> may reach back nearly
      seven million. It is not because she is the most complete — the <em>Ardipithecus</em>{' '}
      skeleton and the astonishing <span className="specimen-id">StW 573</span> specimen
      from Sterkfontein both preserve more of the skeleton than Lucy does. She is famous
      because she arrived at exactly the right moment in the history of paleoanthropology
      to transform the field, and because she arrived with a story that the public could
      understand.
    </p>

    <div className="lucy-photo">
      <img src={IMAGES.lucyReconstruction} alt="Full-body reconstruction of Lucy (Australopithecus afarensis) showing a small, upright-walking hominin with ape-like facial features" loading="lazy" />
      <p className="lucy-photo__caption">
        A life reconstruction of <em>Australopithecus afarensis</em>, based on the
        skeletal evidence from AL 288-1 and other Hadar specimens. She stood roughly
        107 centimeters tall and weighed about 29 kilograms — small by any human standard,
        but fully committed to a bipedal life.
      </p>
    </div>

    <p>
      Before Lucy, the reigning paradigm in human evolution held that the brain led the
      way. The so-called &ldquo;cerebral Rubicon&rdquo; hypothesis, inherited from the
      early twentieth century, assumed that what made humans human was intelligence —
      that our ancestors first developed large brains, and that bipedalism, tool use,
      and all the other hallmarks of humanity followed as consequences of cognitive
      superiority. This was a deeply flattering narrative. It placed the mind at the
      center of human evolution and made everything else secondary.
    </p>

    <p>
      Lucy destroyed that narrative. Her brain was approximately 438 cubic centimeters —
      barely larger than a chimpanzee's, firmly within the range of a great ape, and
      less than a third the size of a modern human brain. Yet her pelvis was unmistakably
      adapted for bipedal locomotion. Her femur angled inward at the knee. Her foot had
      a longitudinal arch. She walked upright — not clumsily, not tentatively, but as
      her primary mode of locomotion — with a brain no larger than a softball. The
      inversion was total and irreversible. Bipedalism came first. The brain came later —
      at least two million years later. Our ancestors were upright walkers long before
      they were thinkers, and Lucy was the proof.
    </p>

    <p>
      This insight did more than revise a scientific hypothesis. It reshaped how the public
      understood what it means to be human. Before Lucy, human evolution was an abstraction —
      a subject for specialists, illustrated by fragments of skull and dense jargon. Lucy gave
      the story a protagonist. She had a name. She had a height (107 centimeters), a weight
      (about 29 kilograms), and an estimated age (young adult). She had a sex, a species,
      and — if Kappelman is right — a death. She was not a diagram or a phylogenetic node.
      She was an individual, and the public responded to her with an intensity that
      no fossil had ever provoked.
    </p>

    <p>
      When Lucy toured American museums in the mid-2000s, hundreds of thousands of people
      lined up to see her — not a cast, but the actual bones, 3.2 million years old, laid
      out under glass. Ethiopian officials debated fiercely whether the bones should travel
      at all, and the controversy itself underscored how deeply Lucy had been woven into
      Ethiopian national identity. She belongs to Ethiopia. She was found in Ethiopian soil,
      she is housed in the Ethiopian National Museum in Addis Ababa, and her Amharic
      name — Dinkinesh — is the one her discoverers heard first.
    </p>

    <p>
      In 2023, NASA launched a spacecraft to study the Trojan asteroids of Jupiter.
      They named it <em>Lucy</em> — after the fossil, who was named after the Beatles
      song, which was playing in camp on the night of her discovery. The mission patch
      includes a diamond, a nod to the song's title. It is a strange and beautiful
      chain of references: from a Pliocene hominin in the Afar Triangle, to a pop
      song recorded in Abbey Road Studios in 1967, to a robotic explorer sailing past
      the orbit of Mars. The connections are arbitrary and human, which is to say they
      are exactly the kind of meaning-making that distinguishes us from every other
      primate — and from the small, long-dead creature who helped us understand why.
    </p>

    <blockquote className="lucy-quote">
      &ldquo;She is 3.2 million years old, and she has changed the way we think about
      ourselves. She showed us that we walked before we thought — that the human story
      begins not with the mind, but with the body, moving across a landscape, upright
      and free.&rdquo;
      <span className="lucy-quote__attribution">
        — Donald Johanson
      </span>
    </blockquote>

    <p>
      Dinkinesh. You are marvelous. A small body, a small brain, a set of bones scattered
      across a hillside in the Afar depression, and a legacy that reaches from the deep
      Pliocene to the outer solar system. She is a bridge between the alien world of deep
      time and the intimate reality of a single life lived and lost — three million years
      of silence, broken by the sound of a knee joint being lifted, for the first time,
      out of the sediment.
    </p>
  </div>
</Section>

<hr className="lucy-divider" />

{/* ════════════════════════════════════════════════════════════════════════════
    SOURCES & FURTHER READING
    ════════════════════════════════════════════════════════════════════════════ */}

<div className="lucy-sources">
  <h2 className="lucy-sources__title">Sources &amp; Further Reading</h2>

  <ol className="lucy-sources__list">
    {SOURCES.map(source => (
      <li key={source.id} className="lucy-sources__item">
        <span className="lucy-sources__id">{source.id}.</span>
        <span>{source.text}</span>
      </li>
    ))}
  </ol>

  <h3 className="lucy-sources__credits-title">Image Credits</h3>

  <ul className="lucy-sources__credits-list">
    {IMAGE_CREDITS.map((credit, i) => (
      <li key={i} className="lucy-sources__credits-item">
        <a href={credit.url} target="_blank" rel="noopener noreferrer">
          {credit.subject}
        </a>
        {' '}&mdash; {credit.attribution}
      </li>
    ))}
  </ul>

  <p className="lucy-sources__note">
    All images sourced from Wikimedia Commons under Creative Commons or Public Domain
    licenses. Anatomical and isotopic data drawn from cited primary literature.
  </p>

  <h3 className="lucy-sources__credits-title">Further Reading</h3>
  <ul className="lucy-sources__credits-list">
    <li className="lucy-sources__credits-item">
      <Link href="/essays/science/turkana-boy">
        Turkana Boy: The Skeleton That Redefined Human Evolution
      </Link>
      {' \u2014 '}
      KNM-WT 15000, the most complete early human skeleton ever found. An interactive
      visual essay on the 1.5-million-year-old <em>Homo erectus</em> youth with 3D
      fossil specimens from the Turkana Basin.
    </li>
    <li className="lucy-sources__credits-item">
      <Link href="/essays/science/homo-naledi">
        Homo naledi: The Small-Brained Species That Buried Its Dead
      </Link>
      {' \u2014 '}
      1,500 bones, 560 cubic centimetres, and the question of what makes us human.
      The Rising Star Cave discovery that challenges the link between brain size
      and behavioural complexity.
    </li>
    <li className="lucy-sources__credits-item">
      <Link href="/essays/science/seven-million-years">
        Seven Million Years: The Complete Visual History of Our Kind
      </Link>
      {' \u2014 '}
      From <em>Sahelanthropus</em> to <em>Homo sapiens</em> &mdash; the complete
      arc of hominin evolution in one visual essay.
    </li>
    <li className="lucy-sources__credits-item">
      <Link href="/infographics/seven-million-years-homo">
        Infographic: How Our Brains Grew Over 7 Million Years
      </Link>
      {' \u2014 '}
      Cranial capacity comparison across 8 hominid species, from{' '}
      <em>Sahelanthropus</em> (350 cc) to <em>Homo sapiens</em> (1,350 cc).
    </li>
  </ul>
</div>

    </article>
  );
}
