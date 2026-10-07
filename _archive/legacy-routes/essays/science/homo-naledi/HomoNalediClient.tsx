'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, CartesianGrid, ScatterChart, Scatter, Cell,
} from 'recharts';
import * as d3 from 'd3';
import dynamic from 'next/dynamic';
import { IMAGES, IMAGE_CREDITS, SOURCES } from './images';

const SpecimenViewer = dynamic(() => import('./SpecimenViewer'), { ssr: false });

const COLORS = {
  dinalediDark: '#0D0E12',
  caveCharcoal: '#1A1C22',
  boneIvory: '#E8DCC8',
  dolomiteGrey: '#6B7A8A',
  signalAmber: '#C4893A',
  ochreEarth: '#9B6B3C',
  flowstoneCream: '#C9BFA8',
  deepPassage: '#2A2D35',
};

const tooltipStyle: React.CSSProperties = {
  backgroundColor: COLORS.caveCharcoal,
  border: `1px solid ${COLORS.dolomiteGrey}`,
  borderRadius: 4,
  padding: '10px 14px',
  fontFamily: 'JetBrains Mono, Consolas, monospace',
  fontSize: 12,
  color: COLORS.boneIvory,
  lineHeight: 1.5,
};

/**
 * @diagram-contract
 * @diagram D3-brain-behaviour
 * @domain paleoanthropology
 *
 * @invariant X_AXIS_MEANING
 *   x_values: endocranial volume in cc
 *   validation: naledi plots at ~560cc, sapiens at ~1400cc
 *
 * @invariant Y_AXIS_MEANING
 *   y_values: behavioural complexity score (1-10 composite)
 *   validation: naledi scores 7 if disposal accepted, 3 if rejected
 *
 * @invariant SPECIES_DATA
 *   9 species plotted, naledi has two positions (toggle)
 *   sourced from Holloway et al. 2018, Berger et al. 2015
 */
const brainBehaviourData = [
  { species: 'A. afarensis', cc: 438, score: 2, color: COLORS.dolomiteGrey },
  { species: 'A. africanus', cc: 450, score: 2.5, color: COLORS.dolomiteGrey },
  { species: 'H. habilis', cc: 610, score: 4, color: COLORS.ochreEarth },
  { species: 'H. erectus', cc: 900, score: 6, color: COLORS.ochreEarth },
  { species: 'H. heidelbergensis', cc: 1200, score: 7, color: COLORS.ochreEarth },
  { species: 'H. neanderthalensis', cc: 1450, score: 8.5, color: COLORS.flowstoneCream },
  { species: 'H. sapiens', cc: 1400, score: 9.5, color: COLORS.boneIvory },
  { species: 'H. floresiensis', cc: 426, score: 5, color: COLORS.dolomiteGrey },
  { species: 'H. naledi (accepted)', cc: 560, score: 7, color: COLORS.signalAmber },
  { species: 'H. naledi (rejected)', cc: 560, score: 3, color: '#7A5A2A' },
];

/**
 * @diagram-contract
 * @diagram D10-body-proportions
 * @domain paleoanthropology
 *
 * @invariant DUAL_BAR_ENCODING
 *   bar1: stature in cm
 *   bar2: body mass in kg
 *   sourced from Garvin et al. 2017, McHenry 1992
 *
 * @invariant DATA_ACCURACY
 *   naledi: 144cm / 40kg, Lucy: 107cm / 29kg
 */
const bodyProportionData = [
  { species: 'H. naledi', stature: 144, mass: 40 },
  { species: 'A. afarensis', stature: 107, mass: 29 },
  { species: 'H. erectus', stature: 170, mass: 56 },
  { species: 'H. sapiens', stature: 170, mass: 70 },
  { species: 'H. floresiensis', stature: 106, mass: 30 },
  { species: 'A. sediba', stature: 130, mass: 33 },
];

/**
 * @diagram-contract
 * @diagram D4-dating-timeline
 * @domain geochronology
 *
 * @invariant TIME_RANGE
 *   x_values: thousands of years ago (ka)
 *   range: 500 ka to 0 ka, left = older, right = younger
 *
 * @invariant SPECIES_RANGES
 *   H. naledi: 335-236 ka (Dirks et al. 2017)
 *   H. sapiens (archaic): 315-present (Jebel Irhoud)
 *   H. erectus last: ~110 ka (Java)
 */
const datingData = [
  { species: 'H. naledi', start: 335, end: 236, color: COLORS.signalAmber },
  { species: 'H. sapiens (archaic)', start: 315, end: 0, color: COLORS.boneIvory },
  { species: 'H. heidelbergensis', start: 600, end: 200, color: COLORS.ochreEarth },
  { species: 'Neanderthals', start: 400, end: 40, color: COLORS.flowstoneCream },
  { species: 'H. erectus (late)', start: 500, end: 110, color: COLORS.dolomiteGrey },
  { species: 'Denisovans', start: 300, end: 50, color: '#8A7A6A' },
];

/**
 * @diagram-contract
 * @diagram D12-coexistence-timeline
 * @domain paleoanthropology
 *
 * @invariant GANTT_LAYOUT
 *   horizontal bars per species, x-axis in Ma
 *   naledi range highlighted with Signal Amber
 *   sourced from Dirks et al. 2017, Wood & Boyle 2016
 */
const coexistenceData = [
  { species: 'A. africanus', startMa: 3.0, endMa: 2.0, color: COLORS.dolomiteGrey },
  { species: 'A. sediba', startMa: 2.0, endMa: 1.8, color: COLORS.dolomiteGrey },
  { species: 'H. erectus', startMa: 1.9, endMa: 0.11, color: COLORS.ochreEarth },
  { species: 'H. naledi', startMa: 0.335, endMa: 0.236, color: COLORS.signalAmber },
  { species: 'H. heidelbergensis', startMa: 0.7, endMa: 0.2, color: COLORS.ochreEarth },
  { species: 'H. sapiens', startMa: 0.315, endMa: 0, color: COLORS.boneIvory },
  { species: 'P. robustus', startMa: 2.0, endMa: 1.0, color: '#8A7A6A' },
];

/**
 * @diagram-contract
 * @diagram D8-disposal-evidence
 * @domain taphonomy
 *
 * @invariant EVIDENCE_NODES
 *   9 evidence points, each with pro/counter assessment
 *   strength: strong/moderate/weak determines visual weight
 *   sourced from Dirks et al. 2015, Val 2016, Thackeray 2016
 */
const disposalEvidence = [
  { id: 1, label: 'No alternative entrance', strength: 'strong', supports: true, detail: 'Geological survey confirmed single access route via Superman\'s Crawl' },
  { id: 2, label: 'No water-deposited sediment', strength: 'strong', supports: true, detail: 'Sedimentological analysis shows no fluvial transport indicators' },
  { id: 3, label: 'No carnivore marks', strength: 'strong', supports: true, detail: 'Zero tooth punctures or gnawing damage on any specimen' },
  { id: 4, label: 'No other large fauna', strength: 'moderate', supports: true, detail: 'Only owl bones and rodent fragments alongside naledi remains' },
  { id: 5, label: 'All age classes present', strength: 'moderate', supports: true, detail: 'Infants, juveniles, adults, elderly represented' },
  { id: 6, label: 'Partial articulation', strength: 'moderate', supports: true, detail: 'Bones partially connected, not scattered as in flood deposits' },
  { id: 7, label: 'Possible sealed entrance', strength: 'moderate', supports: false, detail: 'A second entrance may have existed and collapsed (Thackeray 2016)' },
  { id: 8, label: 'Death-trap scenario', strength: 'weak', supports: false, detail: 'Animals fell in over millennia; does not explain age-class distribution' },
  { id: 9, label: 'Small brain capacity', strength: 'weak', supports: false, detail: '560cc brain is below threshold traditionally assumed for symbolic behavior' },
];

const caveWaypoints = [
  { id: 'entrance', label: 'Entrance', depth: 0, x: 10, desc: 'Rising Star cave mouth' },
  { id: 'crawl', label: 'Superman\'s Crawl', depth: -8, x: 25, desc: '25 cm wide, 12 m long' },
  { id: 'dragon', label: 'Dragon\'s Back', depth: -15, x: 45, desc: 'Jagged dolomite ridge' },
  { id: 'chute', label: 'Vertical Chute', depth: -25, x: 60, desc: '12 m near-vertical drop' },
  { id: 'dinaledi', label: 'Dinaledi Chamber', depth: -30, x: 80, desc: '1,550+ specimens' },
];

const anatomicalTraits = [
  { region: 'Brain', classification: 'primitive', value: '~560 cc (gorilla-range)' },
  { region: 'Brow ridges', classification: 'primitive', value: 'Moderate supraorbital torus' },
  { region: 'Teeth', classification: 'derived', value: 'Small, simple crowns (Homo-like)' },
  { region: 'Shoulders', classification: 'primitive', value: 'Cranially oriented (australopith-like)' },
  { region: 'Trunk', classification: 'primitive', value: 'Funnel-shaped thorax' },
  { region: 'Hands (fingers)', classification: 'primitive', value: 'Curved proximal phalanges' },
  { region: 'Hands (thumb/wrist)', classification: 'derived', value: 'Long thumb, modern wrist' },
  { region: 'Pelvis', classification: 'primitive', value: 'Flared iliac blades' },
  { region: 'Legs', classification: 'derived', value: 'Long, modern proportions' },
  { region: 'Feet', classification: 'derived', value: 'Arch, adducted hallux (fully modern)' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
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

function Section({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`naledi-section ${visible ? 'naledi-section--visible' : ''}`}>
      {children}
    </div>
  );
}

function DatingTimelineViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref: containerRef, visible } = useInView(0.1);

  useEffect(() => {
    if (!visible || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700, height = 280, margin = { top: 20, right: 30, bottom: 40, left: 140 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const x = d3.scaleLinear().domain([600, 0]).range([0, innerW]);
    const y = d3.scaleBand().domain(datingData.map(d => d.species)).range([0, innerH]).padding(0.3);

    g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x).ticks(6).tickFormat(d => `${d} ka`))
      .selectAll('text').attr('fill', COLORS.dolomiteGrey).style('font-size', '10px');
    g.append('g').call(d3.axisLeft(y)).selectAll('text').attr('fill', COLORS.flowstoneCream).style('font-size', '11px');
    g.selectAll('.domain, .tick line').attr('stroke', COLORS.deepPassage);

    g.selectAll('rect.bar')
      .data(datingData)
      .join('rect')
      .attr('x', d => x(d.start))
      .attr('y', d => y(d.species)!)
      .attr('width', d => x(d.end) - x(d.start))
      .attr('height', y.bandwidth())
      .attr('fill', d => d.color)
      .attr('opacity', 0)
      .transition().duration(800).delay((_, i) => i * 100)
      .attr('opacity', 0.85);
  }, [visible]);

  return (
    <div ref={containerRef} className="naledi-viz">
      <div className="naledi-viz__title">D4 -- Dating Timeline (500 ka -- present)</div>
      <svg ref={svgRef} viewBox="0 0 700 280" style={{ width: '100%', height: 'auto' }} aria-label="Dating timeline showing temporal ranges for six hominin species from 600 to 0 thousand years ago" />
    </div>
  );
}

function CoexistenceTimelineViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref: containerRef, visible } = useInView(0.1);

  useEffect(() => {
    if (!visible || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700, height = 300, margin = { top: 20, right: 30, bottom: 40, left: 130 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const x = d3.scaleLinear().domain([3.2, 0]).range([0, innerW]);
    const y = d3.scaleBand().domain(coexistenceData.map(d => d.species)).range([0, innerH]).padding(0.25);

    g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x).ticks(8).tickFormat(d => `${d} Ma`))
      .selectAll('text').attr('fill', COLORS.dolomiteGrey).style('font-size', '10px');
    g.append('g').call(d3.axisLeft(y)).selectAll('text').attr('fill', COLORS.flowstoneCream).style('font-size', '10px');
    g.selectAll('.domain, .tick line').attr('stroke', COLORS.deepPassage);

    g.selectAll('rect.bar')
      .data(coexistenceData)
      .join('rect')
      .attr('x', d => x(d.startMa))
      .attr('y', d => y(d.species)!)
      .attr('width', d => x(d.endMa) - x(d.startMa))
      .attr('height', y.bandwidth())
      .attr('fill', d => d.color)
      .attr('rx', 2)
      .attr('opacity', 0)
      .transition().duration(600).delay((_, i) => i * 80)
      .attr('opacity', 0.85);
  }, [visible]);

  return (
    <div ref={containerRef} className="naledi-viz">
      <div className="naledi-viz__title">D12 -- Species Coexistence in Southern Africa (3.0 Ma -- present)</div>
      <svg ref={svgRef} viewBox="0 0 700 300" style={{ width: '100%', height: 'auto' }} aria-label="Species coexistence Gantt chart showing temporal ranges for seven hominin species in southern Africa" />
    </div>
  );
}

function DisposalEvidenceViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref: containerRef, visible } = useInView(0.1);

  useEffect(() => {
    if (!visible || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700, height = 400, margin = { top: 30, right: 20, bottom: 20, left: 20 };
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const innerW = width - margin.left - margin.right;

    const nodeHeight = 36;
    const gap = 6;

    disposalEvidence.forEach((d, i) => {
      const yPos = i * (nodeHeight + gap);
      const barWidth = d.strength === 'strong' ? innerW * 0.85 : d.strength === 'moderate' ? innerW * 0.65 : innerW * 0.45;
      const fillColor = d.supports ? COLORS.signalAmber : COLORS.dolomiteGrey;

      g.append('rect')
        .attr('x', 0).attr('y', yPos)
        .attr('width', 0).attr('height', nodeHeight)
        .attr('fill', fillColor)
        .attr('opacity', 0.2)
        .attr('rx', 3)
        .transition().duration(600).delay(i * 80)
        .attr('width', barWidth);

      g.append('text')
        .attr('x', 10).attr('y', yPos + nodeHeight / 2 + 4)
        .attr('fill', COLORS.boneIvory)
        .style('font-size', '12px')
        .style('font-family', 'JetBrains Mono, monospace')
        .text(`${d.supports ? '+' : '-'} ${d.label}`)
        .attr('opacity', 0)
        .transition().duration(400).delay(i * 80 + 300)
        .attr('opacity', 1);

      g.append('text')
        .attr('x', barWidth - 10).attr('y', yPos + nodeHeight / 2 + 4)
        .attr('text-anchor', 'end')
        .attr('fill', COLORS.dolomiteGrey)
        .style('font-size', '10px')
        .text(d.strength);
    });
  }, [visible]);

  return (
    <div ref={containerRef} className="naledi-viz">
      <div className="naledi-viz__title">D8 -- Disposal Evidence Assessment</div>
      <svg ref={svgRef} viewBox="0 0 700 400" style={{ width: '100%', height: 'auto' }} aria-label="Evidence assessment for deliberate body disposal hypothesis showing nine lines of taphonomic evidence" />
    </div>
  );
}

function CaveCrossSectionViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref: containerRef, visible } = useInView(0.1);

  useEffect(() => {
    if (!visible || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 700, height = 240;
    const g = svg.append('g');

    const xScale = d3.scaleLinear().domain([0, 100]).range([40, width - 40]);
    const yScale = d3.scaleLinear().domain([-35, 5]).range([height - 20, 20]);

    const pathData = caveWaypoints.map(w => [xScale(w.x), yScale(w.depth)] as [number, number]);
    const line = d3.line().curve(d3.curveMonotoneX);

    g.append('path')
      .attr('d', line(pathData)!)
      .attr('fill', 'none')
      .attr('stroke', COLORS.dolomiteGrey)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', function() { return (this as SVGPathElement).getTotalLength(); })
      .attr('stroke-dashoffset', function() { return (this as SVGPathElement).getTotalLength(); })
      .transition().duration(2000).ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    caveWaypoints.forEach((w, i) => {
      const cx = xScale(w.x), cy = yScale(w.depth);
      g.append('circle')
        .attr('cx', cx).attr('cy', cy).attr('r', 0)
        .attr('fill', w.id === 'dinaledi' ? COLORS.signalAmber : COLORS.flowstoneCream)
        .transition().duration(400).delay(400 + i * 300)
        .attr('r', w.id === 'dinaledi' ? 8 : 5);

      g.append('text')
        .attr('x', cx).attr('y', cy - 12)
        .attr('text-anchor', 'middle')
        .attr('fill', COLORS.boneIvory)
        .style('font-size', '11px')
        .text(w.label)
        .attr('opacity', 0)
        .transition().duration(300).delay(600 + i * 300)
        .attr('opacity', 1);

      g.append('text')
        .attr('x', cx).attr('y', cy + 20)
        .attr('text-anchor', 'middle')
        .attr('fill', COLORS.dolomiteGrey)
        .style('font-size', '9px')
        .text(w.desc)
        .attr('opacity', 0)
        .transition().duration(300).delay(700 + i * 300)
        .attr('opacity', 0.8);
    });
  }, [visible]);

  return (
    <div ref={containerRef} className="naledi-viz">
      <div className="naledi-viz__title">D1 -- Cave Cross-Section: Entrance to Dinaledi Chamber</div>
      <svg ref={svgRef} viewBox="0 0 700 240" style={{ width: '100%', height: 'auto' }} aria-label="Cross-section diagram of the Rising Star cave system showing five waypoints from entrance to Dinaledi Chamber at 30 metres depth" />
    </div>
  );
}

/**
 * @diagram-contract
 * @diagram D11-phylogenetic-position
 * @domain systematics
 *
 * @invariant THREE_MODELS
 *   Model A: Basal Homo, Model B: Sister to erectus, Model C: Independent lineage
 *   naledi position changes between models
 *   sourced from Dembo et al. 2016
 */
function PhylogeneticViz() {
  const [model, setModel] = useState<'A' | 'B' | 'C'>('A');
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref: containerRef, visible } = useInView(0.1);

  const trees: Record<string, { nodes: { id: string; x: number; y: number; highlight?: boolean }[]; edges: [string, string][] }> = {
    A: {
      nodes: [
        { id: 'LCA', x: 350, y: 30 },
        { id: 'H. naledi', x: 100, y: 200, highlight: true },
        { id: 'H. habilis', x: 220, y: 200 },
        { id: 'H. erectus', x: 340, y: 200 },
        { id: 'H. sapiens', x: 500, y: 200 },
        { id: 'A. sediba', x: 600, y: 200 },
      ],
      edges: [['LCA', 'H. naledi'], ['LCA', 'H. habilis'], ['LCA', 'H. erectus'], ['LCA', 'H. sapiens'], ['LCA', 'A. sediba']],
    },
    B: {
      nodes: [
        { id: 'LCA', x: 350, y: 30 },
        { id: 'H. habilis', x: 120, y: 140 },
        { id: 'erectus-clade', x: 350, y: 100 },
        { id: 'H. naledi', x: 250, y: 200, highlight: true },
        { id: 'H. erectus', x: 450, y: 200 },
        { id: 'H. sapiens', x: 560, y: 200 },
        { id: 'A. sediba', x: 600, y: 140 },
      ],
      edges: [['LCA', 'H. habilis'], ['LCA', 'erectus-clade'], ['erectus-clade', 'H. naledi'], ['erectus-clade', 'H. erectus'], ['LCA', 'H. sapiens'], ['LCA', 'A. sediba']],
    },
    C: {
      nodes: [
        { id: 'LCA', x: 350, y: 30 },
        { id: 'H. naledi', x: 80, y: 200, highlight: true },
        { id: 'H. habilis', x: 230, y: 200 },
        { id: 'H. erectus', x: 380, y: 200 },
        { id: 'H. sapiens', x: 530, y: 200 },
        { id: 'A. sediba', x: 150, y: 140 },
      ],
      edges: [['LCA', 'H. naledi'], ['LCA', 'H. habilis'], ['LCA', 'H. erectus'], ['LCA', 'H. sapiens'], ['LCA', 'A. sediba']],
    },
  };

  useEffect(() => {
    if (!visible || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const tree = trees[model];
    const nodeMap = new Map(tree.nodes.map(n => [n.id, n]));

    tree.edges.forEach(([from, to]) => {
      const a = nodeMap.get(from)!, b = nodeMap.get(to)!;
      svg.append('line')
        .attr('x1', a.x).attr('y1', a.y).attr('x2', b.x).attr('y2', b.y)
        .attr('stroke', COLORS.deepPassage).attr('stroke-width', 1.5);
    });

    tree.nodes.forEach(n => {
      if (n.id === 'LCA' || n.id === 'erectus-clade') {
        svg.append('circle').attr('cx', n.x).attr('cy', n.y).attr('r', 4).attr('fill', COLORS.dolomiteGrey);
        return;
      }
      svg.append('circle')
        .attr('cx', n.x).attr('cy', n.y).attr('r', n.highlight ? 8 : 5)
        .attr('fill', n.highlight ? COLORS.signalAmber : COLORS.flowstoneCream);
      svg.append('text')
        .attr('x', n.x).attr('y', n.y + 22).attr('text-anchor', 'middle')
        .attr('fill', n.highlight ? COLORS.signalAmber : COLORS.boneIvory)
        .style('font-size', '10px').style('font-style', 'italic')
        .text(n.id);
    });
  }, [visible, model]);

  return (
    <div ref={containerRef} className="naledi-viz">
      <div className="naledi-viz__title">D11 -- Phylogenetic Position (3 competing models)</div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['A', 'B', 'C'] as const).map(m => (
          <button key={m} onClick={() => setModel(m)} style={{
            padding: '4px 12px', borderRadius: 3, border: `1px solid ${model === m ? COLORS.signalAmber : COLORS.deepPassage}`,
            background: model === m ? 'rgba(196,137,58,0.15)' : 'transparent',
            color: model === m ? COLORS.signalAmber : COLORS.dolomiteGrey, cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
          }}>
            Model {m}: {m === 'A' ? 'Basal Homo' : m === 'B' ? 'Sister to erectus' : 'Independent lineage'}
          </button>
        ))}
      </div>
      <svg ref={svgRef} viewBox="0 0 700 240" style={{ width: '100%', height: 'auto' }} aria-label="Phylogenetic tree showing three competing models for Homo naledi placement" />
    </div>
  );
}

export default function HomoNalediClient() {
  const progress = useScrollProgress();
  const [disposalView, setDisposalView] = useState(true);

  return (
    <article className="naledi-essay">
      <div className="naledi-progress"><div className="naledi-progress__fill" style={{ height: `${progress}%` }} /></div>

{/* HERO */}
<div className="naledi-hero">
  <img className="naledi-hero__cranium" src={IMAGES.dh7Skull} alt="DH7 cranium of Homo naledi, frontal view, showing the small braincase and supraorbital morphology" loading="eager" />
  <h1 className="naledi-hero__title"><em>Homo naledi</em>: The Small-Brained Species That Buried Its Dead</h1>
  <p className="naledi-hero__subtitle">1,500 Bones, 560 Cubic Centimetres, and the Question of What Makes Us Human</p>
  <div className="naledi-hero__meta">
    <span>38 min read</span>
    <span>24 sources</span>
    <span>14 visualizations</span>
  </div>
</div>

<hr className="naledi-divider" />

{/* SECTION 1 -- THE RECRUITMENT */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">2013</div>
    <h2>The Recruitment</h2>
    <div className="naledi-metaphor">&ldquo;The ad that broke every rule.&rdquo;</div>

    <p>
      In October 2013, Lee Berger posted a message on Facebook. He was looking for scientists. Not senior researchers
      with decades of fieldwork experience, but small-bodied individuals willing to work in dangerous conditions deep
      underground, in spaces so confined that most adults could not physically enter them. The post was short, informal,
      and unprecedented in a discipline that had never recruited via social media. Within days, sixty applications arrived.
    </p>

    <p>
      From that pool, Berger selected six women, all early-career researchers: Marina Elliott, Becca Peixotto,
      Alia Gurtov, Elen Feuerriegel, K. Lindsay Hunter, and Hannah Morris. He called them the &ldquo;underground
      astronauts&rdquo; &mdash; a name that captured both the physical extremity of their task and the strangeness
      of sending people into a space that no human being had entered in geological time. They would descend into
      the Rising Star cave system, navigate a 25-centimetre-wide passage that most adult males cannot fit through,
      climb over a jagged dolomite ridge called the Dragon&rsquo;s Back, and lower themselves down a near-vertical
      chute into a chamber that had not seen natural light in at least hundreds of thousands of years.
    </p>

    <div className="naledi-photo">
      <img src={IMAGES.peixottoAndElliott} alt="Becca Peixotto and Marina Elliott during the Rising Star expedition, two of the six underground astronauts who excavated Homo naledi specimens" loading="lazy" />
      <p className="naledi-photo__caption">Becca Peixotto and Marina Elliott during the Rising Star expedition. The six &ldquo;underground astronauts&rdquo; were recruited via social media &mdash; a first in paleoanthropology.</p>
    </div>

    <p>
      The paleoanthropology establishment reacted with skepticism. Berger had a complicated reputation: brilliant,
      media-savvy, polarizing. His discovery of <em>Australopithecus sediba</em> at Malapa in 2008 had been
      both celebrated and contested. The social-media recruitment struck traditionalists as a stunt.
      But the bones that the underground astronauts would bring to the surface over the next two years
      would force even the most skeptical critics to engage.
    </p>

    <blockquote className="naledi-quote">
      &ldquo;The question was not whether we could get scientists down there. The question was whether we could get them back out.&rdquo;
      <span className="naledi-quote__attribution">&mdash; Lee Berger</span>
    </blockquote>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 2 -- THE CAVE */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">Rising Star Cave System, South Africa</div>
    <h2>The Cave</h2>
    <div className="naledi-metaphor">&ldquo;A cathedral of darkness.&rdquo;</div>

    <p>
      The Rising Star cave system lies within the Cradle of Humankind, a UNESCO World Heritage Site in Gauteng
      province, South Africa, roughly 50 kilometres northwest of Johannesburg. The cave opens in a dolomite hillside
      &mdash; limestone dissolved over millions of years by mildly acidic groundwater, creating a labyrinth of
      passages, chambers, and vertical shafts. It is this geology that makes the Cradle the richest single
      concentration of hominin fossil sites on Earth. Within a radius of 15 kilometres, the caves of Sterkfontein,
      Swartkrans, Kromdraai, Drimolen, and Malapa have yielded <em>Australopithecus africanus</em>,
      <em>Paranthropus robustus</em>, <em>Australopithecus sediba</em>, early <em>Homo</em>, and now <em>Homo naledi</em>.
    </p>

    <CaveCrossSectionViz />

    <p>
      The journey to the Dinaledi Chamber is a physical ordeal. From the cave entrance, cavers descend through
      Superman&rsquo;s Crawl &mdash; a passage only <span className="measurement">25 cm</span> wide in places and
      <span className="measurement">12 m</span> long, navigable only by individuals who can compress their bodies
      to fit through a slot narrower than a standard laptop. Beyond this lies the Dragon&rsquo;s Back, a jagged ridge
      of exposed dolomite that must be climbed and then descended on the far side. Finally, a near-vertical chute
      drops <span className="measurement">12 m</span> into the Dinaledi Chamber itself &mdash; a confined space
      approximately <span className="measurement">10 x 3 m</span> with ceilings as low as one metre.
    </p>

    <div className="naledi-photo">
      <img src={IMAGES.caveExploration} alt="Scientists exploring the Rising Star cave system during the 2013-2014 expedition" loading="lazy" />
      <p className="naledi-photo__caption">The Rising Star cave system during excavation. Live video feeds relayed from underground to a surface command tent allowed senior scientists to direct the work in real time.</p>
    </div>

    <p>
      Total darkness. No natural light has reached the Dinaledi Chamber in geological time. Every photograph,
      every observation, every millimetre of excavation was performed by headlamp. The underground astronauts
      worked in shifts, communicating with the surface via live video relay, receiving instructions from Berger
      and senior team members who could not physically access the chamber themselves. Specimens were passed hand
      to hand through the chute and along the narrow passages in padded bags &mdash; a logistics chain designed
      to move fossils without damaging material that had survived hundreds of thousands of years in darkness.
    </p>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 3 -- THE HAUL */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">2013--2015</div>
    <h2>The Haul</h2>
    <div className="naledi-metaphor">&ldquo;More bones than entire species.&rdquo;</div>

    <p>
      Over two field seasons, the underground astronauts recovered over <span className="measurement">1,550</span> fossil
      specimens from the Dinaledi Chamber, representing at least <span className="measurement">15</span> individuals
      spanning infants, juveniles, adults, and elderly. This made the Dinaledi assemblage one of the largest
      single-species hominin collections in the history of African paleoanthropology. For context: many hominin species
      are known from a single jawbone or partial skull. <em>Homo rudolfensis</em> was described from a single cranium.
      <em>Kenyanthropus platyops</em> rests on one distorted skull. Naledi offered an embarrassment of riches &mdash;
      crania, mandibles, vertebrae, ribs, pelves, long bones, hands, and feet, enough material to describe a
      species in extraordinary anatomical detail.
    </p>

    <div className="naledi-photo">
      <img src={IMAGES.skeletalSpecimens} alt="Homo naledi skeletal specimens from the Dinaledi Chamber showing the range of preserved elements including crania, vertebrae, pelves, and limb bones" loading="lazy" />
      <p className="naledi-photo__caption">The Dinaledi skeletal assemblage. Over 1,550 fossil elements were recovered from at least 15 individuals &mdash; one of the largest single-species hominin collections in Africa.</p>
    </div>

    <p>
      The scale of the find was itself an anomaly. In most fossil sites, bones accumulate through a combination
      of predation, flooding, and chance &mdash; a leopard dragging a carcass into a cave, a river washing remains
      into a sinkhole. Such processes produce mixed assemblages: the bones of many species, scattered and fragmentary.
      The Dinaledi Chamber contained almost exclusively <em>Homo naledi</em>. No antelope. No predator remains.
      No evidence of the processes that normally explain how bones arrive in caves. This absence was the first
      hint that something unusual had happened in this chamber &mdash; a question that would dominate the
      scientific debate for the next decade.
    </p>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 4 -- THE MOSAIC BODY */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">Anatomy</div>
    <h2>The Mosaic Body</h2>
    <div className="naledi-metaphor">&ldquo;A body assembled from two different eras.&rdquo;</div>

    <p>
      <em>Homo naledi</em> is not a transitional form. It is a mosaic &mdash; a species that combines anatomical
      features separated by millions of years in other lineages, assembled into a body plan that is stable, functional,
      and without clear precedent. The hands have curved proximal phalanges suited to tree-climbing alongside a long
      thumb and modern wrist morphology capable of precision grip and, potentially, tool manufacture. The feet are
      virtually modern &mdash; arched, with an adducted hallux, built for committed bipedal locomotion. The shoulders
      are primitive, oriented cranially in a configuration more similar to australopiths than to any species of <em>Homo</em>.
      The pelvis shows flared iliac blades reminiscent of <em>Australopithecus</em>. The teeth are small and simple,
      more <em>Homo</em>-like than australopith. And the brain &mdash; the brain is the crux of everything &mdash;
      is approximately <span className="measurement">560 cc</span>, within the range of a gorilla.
    </p>

    <div className="naledi-viz">
      <div className="naledi-viz__title">D2 -- Anatomical Mosaic: Primitive vs. Derived Traits</div>
      <table className="naledi-data-table" aria-label="Anatomical trait classification for Homo naledi showing which features are primitive and which are derived">
        <thead>
          <tr><th>Region</th><th>Classification</th><th>Details</th></tr>
        </thead>
        <tbody>
          {anatomicalTraits.map(t => (
            <tr key={t.region}>
              <td style={{ color: COLORS.boneIvory }}>{t.region}</td>
              <td style={{ color: t.classification === 'derived' ? COLORS.signalAmber : COLORS.dolomiteGrey }}>
                {t.classification}
              </td>
              <td>{t.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="naledi-comparison">
      <div className="naledi-comparison__item">
        <img src={IMAGES.handDorsal} alt="Homo naledi right hand in dorsal view showing curved proximal phalanges" loading="lazy" />
        <div className="naledi-comparison__label">Hand (dorsal) -- curved fingers</div>
      </div>
      <div className="naledi-comparison__item">
        <img src={IMAGES.handComplete} alt="Homo naledi complete right hand showing long thumb and modern wrist bones" loading="lazy" />
        <div className="naledi-comparison__label">Hand (composite) -- modern thumb</div>
      </div>
      <div className="naledi-comparison__item">
        <img src={IMAGES.foot} alt="Homo naledi foot composite showing human-like arch and adducted hallux" loading="lazy" />
        <div className="naledi-comparison__label">Foot -- virtually modern</div>
      </div>
    </div>

    <p>
      The combination is significant because it resists easy classification. Naledi is not an early <em>Homo</em> on
      its way to becoming something more modern. It is not a late australopith clinging to ancestral features. It is
      a distinct configuration &mdash; a species that assembled traits from different evolutionary eras into a body
      plan that persisted, successfully, for an unknown but potentially very long period. As John Hawks observed:
      &ldquo;It&rsquo;s as if evolution assembled this creature from a parts bin spanning three million years.&rdquo;
    </p>

    <SpecimenViewer
      meshUrl={IMAGES.handMeshGlb}
      fallbackImage={IMAGES.phalangealCurvature}
      fallbackAlt="Phalangeal curvature comparison in Homo naledi showing primitive curved finger bones alongside modern thumb morphology"
      fallbackCaption="Phalangeal curvature in H. naledi — the spatial paradox of primitive fingers and a modern thumb."
      label="D14 — Naledi Hand Composite · MorphoSource CC-BY"
      autoRotate
    />
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 5 -- THE BRAIN PROBLEM */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">Cognition</div>
    <h2>The Brain Problem</h2>
    <div className="naledi-metaphor">&ldquo;Gorilla-sized and yet.&rdquo;</div>

    <p>
      <span className="measurement">560 cc</span>. The average endocranial volume of <em>Homo naledi</em>,
      based on measurements from multiple specimens (range: approximately <span className="measurement">465--610 cc</span>).
      For context: a modern gorilla averages about <span className="measurement">500 cc</span>. <em>Homo erectus</em>,
      the species most commonly associated with the first major expansion of brain size in the genus <em>Homo</em>,
      averages approximately <span className="measurement">900 cc</span>. Modern humans average roughly
      <span className="measurement">1,400 cc</span>. Naledi&rsquo;s brain is one-third the size of ours, and
      smaller than most australopiths.
    </p>

    <div className="naledi-viz">
      <div className="naledi-viz__title">D3 -- Brain Size vs. Behavioural Complexity</div>
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.deepPassage} />
          <XAxis dataKey="cc" type="number" domain={[300, 1600]} name="Endocranial Volume"
            label={{ value: 'Endocranial Volume (cc)', position: 'bottom', offset: 20, fill: COLORS.dolomiteGrey, fontSize: 11 }}
            tick={{ fill: COLORS.dolomiteGrey, fontSize: 10 }} stroke={COLORS.deepPassage} />
          <YAxis dataKey="score" type="number" domain={[0, 10]} name="Behavioural Complexity"
            label={{ value: 'Complexity Score', angle: -90, position: 'insideLeft', offset: -10, fill: COLORS.dolomiteGrey, fontSize: 11 }}
            tick={{ fill: COLORS.dolomiteGrey, fontSize: 10 }} stroke={COLORS.deepPassage} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v: number, name: string) => [v, name === 'cc' ? 'Volume (cc)' : 'Score']}
            labelFormatter={() => ''} />
          <Scatter data={brainBehaviourData} name="Species">
            {brainBehaviourData.map((entry, i) => (
              <Cell key={i} fill={entry.color} r={entry.species.startsWith('H. naledi') ? 8 : 5} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <p style={{ fontSize: '0.75rem', color: COLORS.dolomiteGrey, marginTop: '0.5rem' }}>
        <em>H. naledi</em> appears twice: if deliberate disposal is accepted (score 7) or rejected (score 3).
        The species is an outlier either way &mdash; its brain size predicts far less behavioural complexity than it may have exhibited.
      </p>
    </div>

    <SpecimenViewer
      meshUrl={IMAGES.skullMeshGlb}
      fallbackImage={IMAGES.dh7Skull}
      fallbackAlt="DH7 Homo naledi cranium showing small braincase, approximately 560 cubic centimetres"
      fallbackCaption="DH1/DH3 composite cranium of H. naledi — approximately 560 cc endocranial volume."
      label="D13 — DH1 Cranium Reconstruction · MorphoSource CC-BY"
      autoRotate
    />

    <p>
      But endocranial volume is not the whole story. Holloway and colleagues (2018) examined virtual endocasts
      of naledi and found that despite the small volume, the frontal lobe organization resembles that of <em>Homo</em>
      rather than australopiths. The brain is not merely a scaled-down ape brain &mdash; it shows structural
      reorganization in regions associated with planning, social cognition, and possibly language precursors.
      This does not prove that naledi was capable of complex behaviour. But it suggests that
      volume alone is not the right metric for assessing cognitive potential.
    </p>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 6 -- THE DATING BOMBSHELL */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">2017</div>
    <h2>The Dating Bombshell</h2>
    <div className="naledi-metaphor">&ldquo;Three million years too young.&rdquo;</div>

    <p>
      When <em>Homo naledi</em> was announced in 2015, no dates were published. The primitive morphology
      led most specialists to assume the species was ancient &mdash; perhaps 2 million years old or more,
      contemporary with early <em>Homo habilis</em> or late australopiths. The small brain, the australopith-like
      shoulders and pelvis, the curved fingers &mdash; everything about the anatomy suggested deep time.
    </p>

    <p>
      In 2017, Dirks and colleagues published the results of three independent dating methods applied to the
      Dinaledi Chamber deposits. Uranium-thorium dating of flowstones bracketing the fossils. Electron spin
      resonance (ESR) dating of three naledi teeth. Palaeomagnetic analysis of the sediment sequence. All three
      methods converged on a single, startling answer: <span className="measurement">236,000--335,000</span> years ago.
      Not two million years. Not even one million. Naledi was a contemporary of archaic <em>Homo sapiens</em>.
    </p>

    <DatingTimelineViz />

    <p>
      The implications were immediate and profound. A species with a brain one-third the size of ours, with
      a body plan mixing features from vastly different evolutionary eras, was alive in southern Africa at the
      same time as the earliest members of our own species. The landscape of the mid-Pleistocene was not
      a simple progression from primitive to modern. It was a mosaic of coexisting lineages &mdash; big-brained
      and small-brained, archaic and derived, living side by side in a small patch of southern African dolomite.
    </p>

    <blockquote className="naledi-quote">
      &ldquo;When the dates came back, nobody believed them. We ran them again. Same answer.&rdquo;
      <span className="naledi-quote__attribution">&mdash; Paul Dirks</span>
    </blockquote>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 7 -- THE DISPOSAL DEBATE */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">The Core Question</div>
    <h2>The Disposal Debate</h2>
    <div className="naledi-metaphor">&ldquo;The chamber that admits no easy answer.&rdquo;</div>

    <p>
      The central question of the naledi story is not anatomical but behavioural: how did over 1,500 bones
      from at least 15 individuals end up in a chamber that is nearly impossible to reach? The taphonomic
      evidence &mdash; the study of what happens to organisms after death &mdash; eliminates most conventional
      explanations. No predator tooth marks. No water-transported sediment. No other large fauna. No
      evidence of a mass death event. No alternative entrance. What remains, by elimination, is the
      hypothesis that the bodies were placed there deliberately.
    </p>

    <DisposalEvidenceViz />

    <p>
      The word &ldquo;disposal&rdquo; matters. Berger&rsquo;s team is careful to distinguish deliberate body
      disposal from burial. Burial implies grave-digging, grave goods, ritual intent &mdash; behaviours
      associated exclusively with large-brained species. Disposal means only that bodies were intentionally
      carried to this location and deposited. The cave itself is the container. No grave was dug. No objects
      were placed with the remains. The claim is modest in its specifics but revolutionary in its implications:
      a species with a <span className="measurement">560 cc</span> brain may have engaged in a community-level
      practice of dealing with its dead.
    </p>

    <p>
      The counter-arguments are serious. Thackeray (2016) proposed that a second entrance may have existed
      and subsequently collapsed, eliminating the need for a deliberate journey through the existing passages.
      Others have suggested death-trap scenarios: animals falling in one at a time over millennia. The representation
      of all age classes (infants through elderly) is consistent with deliberate disposal but could also result
      from a long-duration death trap. The scientific community remains divided, and the debate is far from
      settled.
    </p>

    <blockquote className="naledi-quote">
      &ldquo;We are not claiming ritual. We are claiming that these bodies were placed here. The cave itself is the evidence.&rdquo;
      <span className="naledi-quote__attribution">&mdash; Lee Berger</span>
    </blockquote>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 8 -- NEO AND LESEDI */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">2017</div>
    <h2>Neo and Lesedi</h2>
    <div className="naledi-metaphor">&ldquo;The confirmation.&rdquo;</div>

    <p>
      In 2017, Hawks and colleagues announced the discovery of a second deposit of <em>Homo naledi</em> remains
      in the Lesedi Chamber &mdash; a separate part of the Rising Star cave system, accessed by a different
      (equally difficult) route. The Lesedi assemblage included the most complete naledi skull ever found, nicknamed
      &ldquo;Neo&rdquo; (Sesotho for &ldquo;a gift&rdquo;), along with postcranial elements from at least three individuals.
    </p>

    <div className="naledi-photo">
      <img src={IMAGES.caveSystemMap} alt="Map of the Rising Star cave system showing the positions of both the Dinaledi and Lesedi chambers" loading="lazy" />
      <p className="naledi-photo__caption">The Rising Star cave system, showing both the Dinaledi and Lesedi Chambers. Two independent deposits of <em>H. naledi</em> in isolated chambers strengthens the deliberate disposal hypothesis.</p>
    </div>

    <p>
      Same species. Different chamber. Same apparent depositional pattern: bodies in an isolated, nearly
      inaccessible space with no other large fauna. The discovery of a second deposit was significant precisely
      because it demonstrated a pattern. One chamber might be explained by unusual circumstances. Two chambers,
      in different parts of the same cave system, both containing only naledi remains, both accessed only through
      extreme physical difficulty &mdash; that looks less like accident and more like intent.
    </p>

    <blockquote className="naledi-quote">
      &ldquo;Finding them once is extraordinary. Finding them twice, in the same way, in a different part of the cave &mdash; that&rsquo;s a pattern.&rdquo;
      <span className="naledi-quote__attribution">&mdash; Marina Elliott</span>
    </blockquote>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 9 -- FIRE AND ENGRAVINGS */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">2023</div>
    <h2>Fire and Engravings</h2>
    <div className="naledi-metaphor">&ldquo;The claim too far?&rdquo;</div>

    <p>
      In 2023, Berger&rsquo;s team announced two additional findings from the Rising Star system: evidence
      of controlled fire use (hearths, soot deposits on cave ceilings, charred bone fragments) and geometric
      markings on cave walls (cross-hatch patterns incised into dolomite surfaces). If confirmed, these claims
      would place <em>Homo naledi</em> among the very few species known to have used fire and produced symbolic
      markings &mdash; behaviours previously associated only with large-brained hominins.
    </p>

    <p>
      The scientific community&rsquo;s response was largely skeptical. The results were announced via preprint
      and a Netflix documentary before surviving full peer review, a sequence that drew sharp criticism from
      researchers who argued that extraordinary claims demand extraordinary scrutiny. Tim White, a prominent
      paleoanthropologist, noted that the evidence presented did not meet the threshold required to overturn
      established models of cognitive evolution. The hearth evidence, in particular, has been questioned on
      taphonomic grounds: soot deposits in caves can result from natural fires, and the spatial association
      between charred material and naledi remains has not been established to the satisfaction of most specialists.
    </p>

    <p>
      What would need to be true for these claims to hold: if a <span className="measurement">560 cc</span> brain
      produced controlled fire, geometric marking, and deliberate body disposal, then virtually every existing
      model linking brain size to behavioural complexity would require fundamental revision. That threshold
      has not yet been crossed. The fire and engraving claims remain contested, and the scientific process
      continues.
    </p>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 10 -- OPEN SCIENCE */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">Methods, 2013--present</div>
    <h2>The Open Science Revolution</h2>
    <div className="naledi-metaphor">&ldquo;The fossil that belonged to everyone.&rdquo;</div>

    <p>
      Beyond the bones themselves, the naledi project disrupted the practice of paleoanthropology. Berger&rsquo;s
      team published in <em>eLife</em> (open-access) rather than <em>Nature</em> or <em>Science</em> (paywalled),
      making all data freely available on the day of publication. Every specimen was digitized and the 3D surface
      scans released on MorphoSource under open-access educational licensing &mdash; meaning any researcher on
      Earth could study naledi without visiting South Africa, without requesting permission, without waiting years
      for access that might never come.
    </p>

    <div className="naledi-photo">
      <img src={IMAGES.museumReconstruction} alt="Full museum reconstruction of Homo naledi at the Trento Science Museum, showing the complete body plan" loading="lazy" />
      <p className="naledi-photo__caption">Museum reconstruction of <em>Homo naledi</em> at the Trento Science Museum (MUSE). Open-access 3D scans have enabled museums worldwide to produce accurate reconstructions.</p>
    </div>

    <p>
      The turnaround was historically fast. From initial excavation in 2013 to species description in 2015 &mdash;
      roughly two years. In a field where some fossil discoveries have taken decades to reach publication (the
      <em>Ardipithecus</em> remains found in 1994 were not fully published until 2009), this pace was
      extraordinary and controversial. Traditionalists accused Berger of rushing to publish, of prioritizing
      media attention over scientific rigour. Supporters countered that open access and rapid publication
      served science better than decade-long embargoes that kept fossils locked in vaults.
    </p>

    <blockquote className="naledi-quote">
      &ldquo;If you lock fossils in a vault, they belong to one scientist. If you put them online, they belong to the species.&rdquo;
      <span className="naledi-quote__attribution">&mdash; Lee Berger</span>
    </blockquote>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 11 -- WHERE DOES NALEDI FIT? */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">Phylogenetics</div>
    <h2>Where Does Naledi Fit?</h2>
    <div className="naledi-metaphor">&ldquo;Three trees, one species, no consensus.&rdquo;</div>

    <p>
      The phylogenetic position of <em>Homo naledi</em> remains unresolved. Bayesian analyses by Dembo and
      colleagues (2016) placed naledi in three plausible positions, none of which can be confidently excluded
      on current evidence. Model A positions naledi as basal <em>Homo</em> &mdash; branching off near the root
      of the genus, a very early experiment in the <em>Homo</em> body plan. Model B places naledi as sister to
      <em>Homo erectus</em> &mdash; sharing a recent common ancestor with the lineage that eventually led to us.
      Model C treats naledi as an independent long-surviving lineage with no close living relatives, evolving
      in parallel for potentially millions of years.
    </p>

    <PhylogeneticViz />

    <div className="naledi-viz">
      <div className="naledi-viz__title">D10 -- Body Proportion Comparison</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bodyProportionData} margin={{ top: 10, right: 20, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.deepPassage} />
          <XAxis dataKey="species" tick={{ fill: COLORS.dolomiteGrey, fontSize: 10 }} stroke={COLORS.deepPassage} angle={-20} textAnchor="end" height={60} />
          <YAxis tick={{ fill: COLORS.dolomiteGrey, fontSize: 10 }} stroke={COLORS.deepPassage} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11, color: COLORS.dolomiteGrey }} />
          <Bar dataKey="stature" name="Stature (cm)" fill={COLORS.signalAmber} radius={[2, 2, 0, 0]} />
          <Bar dataKey="mass" name="Mass (kg)" fill={COLORS.ochreEarth} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="naledi-photo">
      <img src={IMAGES.gautengMap} alt="Map of Gauteng province, South Africa, showing the location of the Cradle of Humankind" loading="lazy" />
      <p className="naledi-photo__caption">Gauteng province, South Africa. The Cradle of Humankind &mdash; home to Rising Star, Sterkfontein, Swartkrans, Malapa, and Drimolen &mdash; occupies an area smaller than the city of London.</p>
    </div>

    <p>
      The comparison with <em>Australopithecus sediba</em> is instructive. Sediba, also discovered by Berger
      (at Malapa, 2008), is another mosaic species that resists easy classification &mdash; dated to
      approximately <span className="measurement">1.98 Ma</span>, combining australopith and <em>Homo</em>
      features in proportions that have generated similar phylogenetic debate. Two mosaic species from
      the same researcher, in the same region, both defying neat categorization: pattern or coincidence?
      The honest answer is that we do not know. The South African cave record is revealing a
      hominin diversity that the traditional family tree cannot easily accommodate.
    </p>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SECTION 12 -- WHAT THE SMALL BRAIN MEANS */}
<Section>
  <div className="naledi-content">
    <div className="naledi-when">Synthesis</div>
    <h2>What the Small Brain Means</h2>
    <div className="naledi-metaphor">&ldquo;The reckoning.&rdquo;</div>

    <p>
      If <span className="measurement">560 cc</span> can carry its dead through pitch-dark passages and deposit
      them in remote chambers, then brain size is not the threshold for complex behaviour we assumed it was.
      This is the proposition that naledi forces upon us. It does not require accepting every claim Berger&rsquo;s
      team has made &mdash; the fire and engraving evidence remains contested, the disposal hypothesis is debated,
      the phylogenetic position is unresolved. Even the most conservative reading of the evidence raises questions
      that have no comfortable answers.
    </p>

    <CoexistenceTimelineViz />

    <p>
      The metric is wrong. Endocranial volume, treated for a century as the primary proxy for cognitive capacity
      in hominins, captures only one dimension of a multidimensional phenomenon. Brain organization, neural
      connectivity, life history, social complexity, ecological context &mdash; all of these shape what a species
      can do. Holloway&rsquo;s endocast work on naledi shows a reorganized frontal lobe in a small braincase.
      The assumption that bigger always means smarter was convenient but may have been misleading.
    </p>

    <p>
      The thread connects backward to Lucy. <em>Australopithecus afarensis</em> walked upright at
      <span className="measurement">438 cc</span> &mdash; bipedalism did not require a big brain. Now naledi
      suggests that mortuary behaviour may not require one either. The &ldquo;big brain first&rdquo; narrative
      keeps failing. Each new discovery erodes the assumption that our brain is what made us special, that
      cognition was the engine and everything else followed.
    </p>

    <div className="naledi-photo">
      <img src={IMAGES.facialReconstruction} alt="Forensic facial reconstruction of Homo naledi using coherent anatomical deformation technique" loading="lazy" />
      <p className="naledi-photo__caption">Facial reconstruction of <em>Homo naledi</em>, produced using the coherent anatomical deformation technique. A face from 300,000 years ago &mdash; contemporary with the first members of our own species.</p>
    </div>

    <p>
      What does &ldquo;human&rdquo; mean if brain size is not the dividing line? The question naledi poses is not
      yet answered. The fire claims remain unresolved. The phylogenetic position is debated. New chambers in
      the Rising Star system may still hold discoveries that rewrite the story again. What is certain is that
      a small-brained species with a mosaic body lived in southern Africa at the same time as early <em>Homo sapiens</em>,
      and that explaining how 1,500 of its bones ended up in an unreachable chamber remains one of the most
      compelling puzzles in paleoanthropology.
    </p>

    <blockquote className="naledi-quote">
      &ldquo;We have been telling ourselves a story about big brains for a hundred years. Naledi asks whether we were listening to the wrong story.&rdquo;
      <span className="naledi-quote__attribution">&mdash; Lee Berger</span>
    </blockquote>
  </div>
</Section>

<hr className="naledi-divider" />

{/* SOURCES */}
<div className="naledi-sources">
  <h2 className="naledi-sources__title">Sources &amp; Further Reading</h2>

  <ol className="naledi-sources__list">
    {SOURCES.map(source => (
      <li key={source.id} className="naledi-sources__item">
        <span className="naledi-sources__id">{source.id}.</span>
        <span>{source.text}</span>
      </li>
    ))}
  </ol>

  <h3 className="naledi-sources__credits-title">Image Credits</h3>

  <ul className="naledi-sources__credits-list">
    {IMAGE_CREDITS.map((credit, i) => (
      <li key={i} className="naledi-sources__credits-item">
        <a href={credit.url} target="_blank" rel="noopener noreferrer">
          {credit.subject}
        </a>
        {' '}&mdash; {credit.attribution}
      </li>
    ))}
  </ul>

  <p className="naledi-sources__note">
    All images sourced from Wikimedia Commons under Creative Commons or Public Domain
    licenses. Specimen photographs from eLife publications (CC-BY 4.0). Anatomical and
    dating data drawn from cited primary literature.
  </p>

  <div className="naledi-sources__further-reading">
    <h3 className="naledi-sources__credits-title">Further Reading</h3>
    <ul className="naledi-sources__credits-list">
      <li className="naledi-sources__credits-item">
        <Link href="/essays/science/seven-million-years" className="naledi-link">
          Seven Million Years: The Complete Visual History of Our Kind
        </Link>
        {' \u2014 '}
        The parent essay covering seven million years of hominin evolution, from{' '}
        <em>Sahelanthropus tchadensis</em> to <em>Homo sapiens</em>, with naledi&rsquo;s
        place in the wider story.
      </li>
      <li className="naledi-sources__credits-item">
        <Link href="/essays/science/turkana-boy" className="naledi-link">
          Turkana Boy: The Skeleton That Redefined Human Evolution
        </Link>
        {' \u2014 '}
        KNM-WT 15000, the most complete early human skeleton ever found. An interactive
        visual essay on the 1.5-million-year-old <em>Homo erectus</em> youth with 3D
        fossil specimens from the Turkana Basin.
      </li>
      <li className="naledi-sources__credits-item">
        <Link href="/essays/science/lucy" className="naledi-link">
          Lucy: Before the Genus Homo
        </Link>
        {' \u2014 '}
        A deep-dive visual essay on AL 288-1, the 3.2-million-year-old{' '}
        <em>Australopithecus afarensis</em> skeleton that rewrote the story of
        walking upright.
      </li>
      <li className="naledi-sources__credits-item">
        <Link href="/infographics/seven-million-years-homo" className="naledi-link">
          Infographic: How Our Brains Grew Over 7 Million Years
        </Link>
        {' \u2014 '}
        Cranial capacity comparison across 8 hominid species, from{' '}
        <em>Sahelanthropus</em> (350 cc) to <em>Homo sapiens</em> (1,350 cc).
      </li>
    </ul>
  </div>
</div>

    </article>
  );
}
