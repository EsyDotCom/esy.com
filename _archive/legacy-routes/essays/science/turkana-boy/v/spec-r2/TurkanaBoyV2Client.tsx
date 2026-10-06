'use client';

import React from 'react';
import Link from 'next/link';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ReferenceDot
} from 'recharts';
import { IMAGES, IMAGE_CREDITS, SOURCES } from './images';
import dynamic from 'next/dynamic';
import type { SpecimenEntry } from './SpecimenCabinet';

const SpecimenCabinet = dynamic(() => import('./SpecimenCabinet'), { ssr: false });

/* ═══════════════════════════════════════════════════
   COLORS & STYLE
   ═══════════════════════════════════════════════════ */

const COLORS = {
  strataDark: '#111317',
  fossilLab: '#1A1D24',
  boneIvory: '#E8DCC8',
  sedimentSand: '#C4A97D',
  turkanaBlue: '#3A8F9C',
  heatOchre: '#D4883A',
  basinEarth: '#8B7355',
  clinicalWhite: '#F0ECE4',
};

const tooltipStyle: React.CSSProperties = {
  backgroundColor: COLORS.fossilLab,
  border: `1px solid ${COLORS.basinEarth}`,
  borderRadius: 4,
  padding: '10px 14px',
  fontFamily: 'JetBrains Mono, Consolas, monospace',
  fontSize: 12,
  color: COLORS.boneIvory,
  lineHeight: 1.5,
};

/* ═══════════════════════════════════════════════════
   DATA — D14: 3D Specimen Cabinet
   ═══════════════════════════════════════════════════ */

const SPECIMEN_CABINET: SpecimenEntry[] = [
  {
    id: 'KNM-WT 15000 (mandible)',
    label: 'Turkana Boy Mandible',
    site: 'Nariokotome, West Turkana',
    age: '~1.53 Ma',
    meshUrl: IMAGES.mandibleGlb,
  },
  {
    id: 'KNM-WT 15000 (cranium)',
    label: 'Turkana Boy Cranium',
    site: 'Nariokotome, West Turkana',
    age: '~1.53 Ma',
    meshUrl: IMAGES.craniumGlb,
  },
  {
    id: 'KNM-ER 3733',
    label: 'H. erectus (female)',
    site: 'East Turkana, Kenya',
    age: '~1.75 Ma',
    meshUrl: IMAGES.er3733Glb,
  },
  {
    id: 'KNM-ER 3883',
    label: 'H. erectus (male)',
    site: 'East Turkana, Kenya',
    age: '~1.60 Ma',
    meshUrl: IMAGES.er3883Glb,
  },
  {
    id: 'KNM-ER 42700',
    label: 'H. erectus (young adult)',
    site: 'Ileret, East Turkana, Kenya',
    age: '~1.55 Ma',
    meshUrl: IMAGES.er42700Glb,
  },
  {
    id: 'OH 9',
    label: 'H. erectus (Olduvai)',
    site: 'Olduvai Gorge, Tanzania',
    age: '~1.4 Ma',
    meshUrl: IMAGES.oh9Glb,
  },
];

/* ═══════════════════════════════════════════════════
   DATA — D1: Skeletal Completeness
   ═══════════════════════════════════════════════════ */

const skeletalData = [
  { region: 'Cranium', recovered: 44, total: 60, percentage: 73 },
  { region: 'Mandible', recovered: 1, total: 1, percentage: 100 },
  { region: 'Cervical vert.', recovered: 6, total: 7, percentage: 86 },
  { region: 'Thoracic vert.', recovered: 12, total: 12, percentage: 100 },
  { region: 'Lumbar vert.', recovered: 5, total: 5, percentage: 100 },
  { region: 'Sacrum', recovered: 1, total: 1, percentage: 100 },
  { region: 'Ribs', recovered: 16, total: 24, percentage: 67 },
  { region: 'Clavicle', recovered: 1, total: 2, percentage: 50 },
  { region: 'Scapula', recovered: 1, total: 2, percentage: 50 },
  { region: 'Humerus', recovered: 2, total: 2, percentage: 100 },
  { region: 'Radius', recovered: 2, total: 2, percentage: 100 },
  { region: 'Ulna', recovered: 2, total: 2, percentage: 100 },
  { region: 'Hand', recovered: 4, total: 54, percentage: 7 },
  { region: 'Pelvis', recovered: 2, total: 2, percentage: 100 },
  { region: 'Femur', recovered: 2, total: 2, percentage: 100 },
  { region: 'Tibia', recovered: 2, total: 2, percentage: 100 },
  { region: 'Fibula', recovered: 1, total: 2, percentage: 50 },
  { region: 'Patella', recovered: 2, total: 2, percentage: 100 },
  { region: 'Foot', recovered: 1, total: 52, percentage: 2 },
];

/* ═══════════════════════════════════════════════════
   DATA — D2: Age Dispute
   ═══════════════════════════════════════════════════ */

const ageDisputeData = [
  { method: 'Dental eruption', dentalAge: 8.5, skeletalAge: null, researcher: 'Smith 1993' },
  { method: 'Dental micro-CT', dentalAge: 8.0, skeletalAge: null, researcher: 'Dean & Smith 2009' },
  { method: 'Skeletal maturation', dentalAge: null, skeletalAge: 11.5, researcher: 'Walker & Leakey 1993' },
  { method: 'Long bone length', dentalAge: null, skeletalAge: 11.0, researcher: 'Ruff & Walker 1993' },
];

/* ═══════════════════════════════════════════════════
   DATA — D3: Growth Trajectory
   ═══════════════════════════════════════════════════ */

const growthTrajectoryData = [
  { age: 0, modernHuman: 50, fastModel: 50, slowModel: 50 },
  { age: 1, modernHuman: 75, fastModel: 80, slowModel: 78 },
  { age: 2, modernHuman: 87, fastModel: 96, slowModel: 92 },
  { age: 3, modernHuman: 96, fastModel: 110, slowModel: 104 },
  { age: 4, modernHuman: 103, fastModel: 122, slowModel: 114 },
  { age: 5, modernHuman: 110, fastModel: 132, slowModel: 124 },
  { age: 6, modernHuman: 116, fastModel: 141, slowModel: 133 },
  { age: 7, modernHuman: 122, fastModel: 150, slowModel: 142 },
  { age: 8, modernHuman: 128, fastModel: 160, slowModel: 152 },
  { age: 9, modernHuman: 133, fastModel: 165, slowModel: 158 },
  { age: 10, modernHuman: 138, fastModel: 168, slowModel: 163 },
  { age: 11, modernHuman: 144, fastModel: 170, slowModel: 168 },
  { age: 12, modernHuman: 149, fastModel: 171, slowModel: 175 },
  { age: 13, modernHuman: 156, fastModel: 171, slowModel: 179 },
  { age: 14, modernHuman: 163, fastModel: 171, slowModel: 182 },
  { age: 15, modernHuman: 170, fastModel: 171, slowModel: 184 },
  { age: 16, modernHuman: 174, fastModel: 171, slowModel: 185 },
  { age: 17, modernHuman: 176, fastModel: 171, slowModel: 185 },
  { age: 18, modernHuman: 177, fastModel: 171, slowModel: 185 },
];

/* ═══════════════════════════════════════════════════
   DATA — D4: Body Proportions
   ═══════════════════════════════════════════════════ */

const bodyProportionData = [
  { species: 'A. afarensis (Lucy)', stature: 107, cruralIndex: 84, biiliac: 26.3 },
  { species: 'KNM-WT 15000', stature: 160, cruralIndex: 86, biiliac: 23 },
  { species: 'H. sapiens', stature: 170, cruralIndex: 84, biiliac: 28 },
];

/* ═══════════════════════════════════════════════════
   DATA — D5: Thermoregulation
   ═══════════════════════════════════════════════════ */

const thermoData = [
  { form: 'Cold-adapted', surfaceToMass: 0.80, heatDissipation: 60 },
  { form: 'Australopith', surfaceToMass: 0.88, heatDissipation: 72 },
  { form: 'KNM-WT 15000', surfaceToMass: 0.95, heatDissipation: 88 },
  { form: 'Modern tropical', surfaceToMass: 0.97, heatDissipation: 92 },
];

/* ═══════════════════════════════════════════════════
   DATA — D6: Locomotion
   ═══════════════════════════════════════════════════ */

const locomotionData = [
  { species: 'A. afarensis', strideLength: 0.72, costOfTransport: 4.8, femurLength: 28 },
  { species: 'KNM-WT 15000', strideLength: 1.12, costOfTransport: 3.2, femurLength: 43 },
  { species: 'H. sapiens', strideLength: 1.25, costOfTransport: 2.8, femurLength: 45 },
];

/* ═══════════════════════════════════════════════════
   DATA — D7: Brain Volume
   ═══════════════════════════════════════════════════ */

const brainVolumeData = [
  { species: 'A. afarensis', volume: 438, era: 'Pliocene' },
  { species: 'A. africanus', volume: 450, era: 'Pliocene' },
  { species: 'H. habilis', volume: 610, era: 'Early Pleistocene' },
  { species: 'H. ergaster (TB)', volume: 880, era: 'Early Pleistocene' },
  { species: 'H. erectus', volume: 950, era: 'Pleistocene' },
  { species: 'H. heidelb.', volume: 1200, era: 'Mid Pleistocene' },
  { species: 'H. neanderth.', volume: 1450, era: 'Late Pleistocene' },
  { species: 'H. sapiens', volume: 1400, era: 'Late Pleistocene' },
];

/* ═══════════════════════════════════════════════════
   DATA — D11: Excavation Timeline
   ═══════════════════════════════════════════════════ */

const excavationData = [
  { year: 1984, season: 1, cumulativeBones: 30, keyDiscovery: 'Cranial fragment (Kimeu); cranium, mandible, first postcranials' },
  { year: 1985, season: 2, cumulativeBones: 55, keyDiscovery: 'Additional vertebrae, ribs; both femora largely recovered' },
  { year: 1986, season: 3, cumulativeBones: 75, keyDiscovery: 'Both innominates (pelvis); tibiae' },
  { year: 1987, season: 4, cumulativeBones: 95, keyDiscovery: 'Humeral fragments, additional ribs, hand & foot elements' },
  { year: 1989, season: 5, cumulativeBones: 108, keyDiscovery: 'Final fragments at excavation margins' },
];

/* ═══════════════════════════════════════════════════
   DATA — D12: Comparative Dashboard
   ═══════════════════════════════════════════════════ */

const dashboardData = [
  { species: 'A. afarensis', stature: 107, mass: 29, ecv: 438, cruralIndex: 84, biiliac: 26.3, femurLength: 280, humFemIndex: 84.6, dateMa: 3.18 },
  { species: 'A. africanus', stature: 126, mass: 35, ecv: 450, cruralIndex: null, biiliac: null, femurLength: null, humFemIndex: null, dateMa: 2.7 },
  { species: 'H. habilis', stature: 118, mass: 34, ecv: 610, cruralIndex: null, biiliac: null, femurLength: null, humFemIndex: null, dateMa: 2.0 },
  { species: 'KNM-WT 15000', stature: 160, mass: 48, ecv: 880, cruralIndex: 86, biiliac: 23, femurLength: 432, humFemIndex: 74, dateMa: 1.53 },
  { species: 'H. erectus (Dmanisi)', stature: 155, mass: 45, ecv: 665, cruralIndex: 83, biiliac: null, femurLength: 395, humFemIndex: null, dateMa: 1.77 },
  { species: 'H. erectus (later)', stature: 172, mass: 58, ecv: 950, cruralIndex: 84, biiliac: null, femurLength: 455, humFemIndex: null, dateMa: 1.0 },
  { species: 'H. heidelbergensis', stature: 172, mass: 70, ecv: 1250, cruralIndex: 82, biiliac: 30, femurLength: 460, humFemIndex: 72, dateMa: 0.5 },
  { species: 'H. sapiens', stature: 171, mass: 70, ecv: 1400, cruralIndex: 84, biiliac: 28, femurLength: 455, humFemIndex: 72, dateMa: 0.15 },
];

/* ═══════════════════════════════════════════════════
   DATA — D13: Cluster Context (Radar)
   ═══════════════════════════════════════════════════ */

const clusterContextData = [
  { axis: 'Body plan modernity', lucy: 3, turkanaBoy: 8, naledi: 5 },
  { axis: 'Tool complexity', lucy: 0, turkanaBoy: 6, naledi: 3 },
  { axis: 'Brain size (rel.)', lucy: 3, turkanaBoy: 6, naledi: 4 },
  { axis: 'Temporal depth', lucy: 9, turkanaBoy: 7, naledi: 3 },
  { axis: 'Preservation quality', lucy: 6, turkanaBoy: 10, naledi: 8 },
];

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */

export default function TurkanaBoyV2Client() {
  return (
    <article className="turkana-v2-essay">

      {/* ── Hero ── */}
      <div className="turkana-v2-hero">
        <img
          className="turkana-v2-hero__image"
          src={IMAGES.fullSkeletonFront}
          alt="Life reconstruction of Turkana Boy at the Neanderthal Museum"
          loading="eager"
        />
        <h1 className="turkana-v2-hero__title">
          Turkana Boy: The First Modern Body
        </h1>
        <p className="turkana-v2-hero__subtitle">
          108 Bones, a Hole in the Jaw, and the Child Who Carried Our Body Plan Into the Open World
        </p>
        <div className="turkana-v2-hero__meta">
          <span>~1.53 Ma</span>
          <span>108 bones</span>
          <span>8–11 years old</span>
          <span>West Turkana, Kenya</span>
        </div>
      </div>

      {/* ── Section 1: The Abscess ── */}
      <section className="turkana-v2-section" id="section-1">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">1</span>
          <h2>The Abscess</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;You can read a skeleton the way a coroner reads a body.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            Below the left first molar of specimen KNM-WT 15000, there is a hole in the jawbone.
            It is roughly the size of a fingertip — a cavity of remodelled bone surrounding the
            root apex, where infection had eaten through the mandibular cortex and established a
            draining sinus. The bone around it is thickened and irregular, the telltale signature
            of chronic periapical abscess: the body had mounted an inflammatory response, laid down
            new bone to wall off the infection, and sustained that defense long enough for the
            reaction to become architecturally visible 1.53 million years later.
          </p>
          <p>
            This is where the story begins — not with a species or an epoch, but with a lesion.
            Alan Walker, who led the anatomical analysis of the skeleton across nearly a decade of
            study, described the infection as severe and chronic. The remodelled bone indicated weeks
            or months of active disease. Whether the abscess contributed to death is debatable;
            Walker himself acknowledged that the causal chain from infection to mortality cannot be
            established from bone alone. What the lesion does establish, with descriptive certainty,
            is that this individual was in pain. The left side of the mandible carried the evidence
            of sustained suffering — a biological fact readable from the morphology of the bone
            itself, independent of any interpretive framework.
          </p>
          <p>
            The distinction matters. Paleopathology — the study of disease in ancient remains —
            operates within a strict hierarchy of inference. At the base sits description: the hole
            is there, the bone is remodelled, the dimensions are measurable. One step up sits
            diagnosis: the pattern is consistent with periapical abscess secondary to dental
            infection. Further up, and the ground becomes less certain: was this the cause of death?
            Did sepsis spread from the jaw to the bloodstream? Did the infection compromise his
            ability to eat, weakening him over weeks? These are plausible inferences, not
            demonstrated facts. Brown and colleagues, in their original 1985 description in
            <em>Nature</em>, reported the lesion alongside the specimen&rsquo;s geological context and
            taxonomic assignment but stopped short of causal claims about mortality. Walker,
            writing in the 1993 monograph, went further in characterizing the infection&rsquo;s severity
            but maintained the same epistemic boundary: we can describe what we see; we cannot
            narrate what we cannot observe.
          </p>

          {IMAGES.mandibleAbscess && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.mandibleAbscess}
              alt="KNM-WT 15000 mandible showing the periapical abscess below the left first molar"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              The mandible of KNM-WT 15000 with visible abscess cavity below the left M1.
              The remodelled bone indicates chronic infection lasting weeks to months.
            </figcaption>
          </figure>
          )}

          <p>
            Beginning with the abscess is a deliberate narrative choice. Most accounts of Turkana
            Boy open with triumph — the most complete early <em>Homo</em> skeleton ever found, 108
            bones from a single individual, a specimen that transformed paleoanthropology. That
            framing is accurate but incomplete. It places the skeleton in the story of science
            rather than in the story of a life. The abscess reverses the emphasis. Before this
            skeleton was a dataset, it was a child with an infected jaw. Before it answered
            questions about human evolution, it carried the evidence of an individual experience —
            pain, inflammation, the slow biological response of bone to bacterial invasion.
          </p>
          <p>
            The essay that follows will move from this forensic starting point outward through
            anatomy, development, ecology, cognition, and dispersal. But the method established
            here — describe first, interpret carefully, acknowledge what remains unknown — will
            govern every section. When we reach questions about adult stature, growth rate, speech
            capacity, or locomotor efficiency, the same hierarchy applies. The skeleton tells us
            what it tells us. Our job is to read it honestly, not to make it say more than it can.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.fullSkeletonFront}
              alt="Life reconstruction of Turkana Boy (KNM-WT 15000) at the Neanderthal Museum, showing what this juvenile Homo ergaster may have looked like"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Life reconstruction of Turkana Boy at the Neanderthal Museum, Mettmann.
              Based on the 108 recovered skeletal elements, this model depicts the juvenile <em>Homo ergaster</em> as
              he may have appeared at the time of death — approximately 160 cm tall and adapted for life in open savanna.
            </figcaption>
          </figure>

          {/* D1: Skeletal Completeness */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Skeletal Completeness by Region</h3>
              <span className="turkana-v2-viz-source">
                Data: Walker &amp; Leakey 1993; Brown et al. 1985
              </span>
            </div>
            <ResponsiveContainer width="100%" height={520}>
              <BarChart
                data={skeletalData}
                layout="vertical"
                margin={{ top: 8, right: 30, left: 100, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.basinEarth + '33'} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <YAxis
                  dataKey="region"
                  type="category"
                  tick={{ fill: COLORS.boneIvory, fontSize: 11 }}
                  width={95}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number, name: string, props: { payload: typeof skeletalData[number] }) => {
                    const d = props.payload;
                    return [`${d.recovered}/${d.total} elements (${value}%)`, 'Recovery'];
                  }}
                />
                <Bar dataKey="percentage" fill={COLORS.turkanaBlue} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;The skeleton was unlike anything we had seen from that time period. Not just in
              preservation — in completeness. We had a cranium, a mandible, vertebrae, ribs,
              pelvis, limb bones. For the first time we had a whole person.&rdquo;
            </p>
            <cite>— Frank Brown, <em>Nature</em>, 1985</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 2: The Age ── */}
      <section className="turkana-v2-section" id="section-2">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">2</span>
          <h2>The Age</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;The teeth say one thing, the bones say another.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            How old was he when he died? The answer depends on which clock you read. The skeleton
            of KNM-WT 15000 carries two independent chronometers — dental development and skeletal
            maturation — and they disagree by roughly three years. That discrepancy is not a
            footnote. It is the intellectual fulcrum on which nearly every downstream claim about
            this specimen pivots: projected adult height, body mass, brain-to-body ratio, metabolic
            requirements, and the growth schedule of his entire species.
          </p>
          <p>
            Holly Smith, in her 1993 analysis of the specimen&rsquo;s dentition, established the
            framework that still governs the debate. The second molars were in the process of
            erupting. The third molars had not yet begun their descent. By modern human standards,
            this pattern corresponds to an age of approximately eleven years. But Smith recognized
            that modern human developmental timing might be the wrong yardstick. If early
            <em>Homo ergaster</em> matured on a schedule closer to the great apes — as growing
            evidence from dental microstructure suggested — then the same eruption pattern would
            correspond to an age of approximately eight years, perhaps slightly less. The same
            teeth, read against different calibration standards, produced two fundamentally
            different ages.
          </p>
          <p>
            The skeletal evidence, analyzed by Christopher Ruff and Alan Walker, pointed toward
            the older estimate. Long bone lengths, when compared to modern human growth charts,
            suggested a boy of eleven to twelve. Epiphyseal fusion status — the degree to which
            the growth plates at the ends of the bones had closed — was consistent with a
            pre-adolescent on a modern human timeline. But Ruff and Walker were explicit about the
            circularity: if the species matured faster than modern humans, then the same bone
            lengths and fusion status could belong to a younger individual who was simply larger
            for his age.
          </p>

          {IMAGES.dentalArcade && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.dentalArcade}
              alt="Dental arcade of KNM-WT 15000 showing mixed dentition with erupting second molars"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              The dental arcade of KNM-WT 15000. The mixed dentition — with second molars
              mid-eruption and third molars unerupted — anchors the age-at-death debate.
            </figcaption>
          </figure>
          )}

          <p>
            In 2009, M. Christopher Dean and Holly Smith revisited the question using dental
            histology — the microscopic growth lines preserved in tooth enamel called perikymata.
            Each perikymata line represents approximately one week of enamel deposition, providing
            a direct biological clock independent of comparative eruption schedules. Their analysis
            indicated that dental formation in KNM-WT 15000 proceeded significantly faster than in
            modern humans, supporting an age at death closer to eight years. The developmental
            pattern was intermediate between apes and humans but closer to the ape end of the
            spectrum. This was not simply a matter of choosing between two ages. It was a finding
            about the species itself: the prolonged childhood that we consider essentially human
            had not yet evolved by 1.5 million years ago.
          </p>
          <p>
            The consequences cascade. If he was eight, he was near the end of his growth — a
            large juvenile approaching adult size on a fast maturation schedule. If he was eleven,
            he had years of growth remaining and would have become extraordinarily tall. Every
            estimate of adult stature, body mass, encephalization quotient, and energetic budget
            depends on which age you adopt. The skeleton does not contain a single individual; it
            contains a developmental argument. And that argument remains genuinely unresolved.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.craniumFrontal}
              alt="Frontal view of the KNM-WT 15000 cranium"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Frontal view of the KNM-WT 15000 cranium. Endocranial volume measured at approximately
              880 cc — the relationship of this value to adult capacity depends on which age model
              is applied.
            </figcaption>
          </figure>

          {/* D2: Age Dispute */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>The Age Dispute: Dental vs. Skeletal Estimates</h3>
              <span className="turkana-v2-viz-source">
                Data: Smith 1993; Dean &amp; Smith 2009; Walker &amp; Leakey 1993; Ruff &amp; Walker 1993
              </span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={ageDisputeData}
                margin={{ top: 12, right: 30, left: 20, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.basinEarth + '33'} />
                <XAxis
                  dataKey="method"
                  tick={{ fill: COLORS.boneIvory, fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={55}
                />
                <YAxis
                  domain={[0, 14]}
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                  label={{
                    value: 'Age (years)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: COLORS.sedimentSand,
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number | null) => value !== null ? [`${value} years`] : ['—']}
                />
                <Legend
                  wrapperStyle={{ color: COLORS.boneIvory, fontSize: 12 }}
                />
                <Bar
                  dataKey="dentalAge"
                  name="Dental age estimate"
                  fill={COLORS.turkanaBlue}
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="skeletalAge"
                  name="Skeletal age estimate"
                  fill={COLORS.heatOchre}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;The teeth say one thing, the bones say another. If we age him by dental
              eruption using modern human standards, he was about eleven. If we calibrate for
              faster development — closer to the great-ape pattern — he was eight, perhaps nine.
              The difference is not trivial. It changes the entire reconstruction.&rdquo;
            </p>
            <cite>— Holly Smith, in Walker &amp; Leakey (eds.), 1993</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 3: The Growth ── */}
      <section className="turkana-v2-section" id="section-3">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">3</span>
          <h2>The Growth</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;At 160 centimeters he was already taller than many adult australopiths.
          But his skeleton was unfinished.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            At approximately 160 centimeters — five feet three inches — KNM-WT 15000 was already
            taller at death than any adult <em>Australopithecus afarensis</em> ever measured, taller
            than the reconstructed stature of most <em>Homo habilis</em> specimens, and within
            the range of adult stature estimates for the Dmanisi <em>Homo erectus</em> population
            that had already dispersed to the Caucasus. He was a child who had outgrown adults of
            earlier species. And he was not finished growing.
          </p>
          <p>
            The unfused epiphyses — the growth plates at the ends of his long bones — confirm that
            active growth was still underway at death. The question is how much growth remained,
            and the answer depends entirely on the age model adopted in the previous section.
            Christopher Ruff and Alan Walker, using modern human growth curves and the older
            skeletal age estimate of eleven to twelve years, projected an adult stature of
            approximately 185 centimeters — over six feet tall. Under this slow-maturation model,
            Turkana Boy still had an adolescent growth spurt ahead of him, and his projected
            adult body mass would have reached 62 to 68 kilograms.
          </p>
          <p>
            The fast-maturation model tells a different story. If dental histology is correct and
            he was approximately eight years old, then his growth curve was far steeper than a
            modern child&rsquo;s, and he was already approaching the asymptote. Dean and Smith&rsquo;s
            analysis, combined with Ruff and Burgess&rsquo;s 2015 reassessment, suggests that under
            rapid maturation the projected adult stature falls to roughly 163 to 170 centimeters —
            tall by Pleistocene standards, but not the giant implied by the slow model. An
            intermediate model, splitting the difference, yields something around 175 to 180
            centimeters.
          </p>

          {IMAGES.growthTrajectory && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.growthTrajectory}
              alt="Comparative growth trajectories for hominin species"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Comparative growth trajectories. KNM-WT 15000 at 160 cm sits at the intersection
              of competing models — each projecting a fundamentally different adult outcome.
            </figcaption>
          </figure>
          )}

          <p>
            The uncertainty is not a failure of the evidence. It is the evidence. The skeleton
            captures a moment in a growth trajectory whose tempo was neither fully human nor fully
            ape-like, but something intermediate — a developmental schedule that had begun to
            decelerate relative to great apes but had not yet acquired the prolonged adolescence
            characteristic of modern humans. That intermediate growth tempo is itself one of the
            most important findings about <em>Homo ergaster</em>. It tells us that the evolution
            of human childhood — the long, slow developmental period that allows extended learning
            and neural maturation — was still in progress at 1.53 million years ago.
          </p>

          {/* D3: Growth Trajectory */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Projected Growth Trajectories</h3>
              <span className="turkana-v2-viz-source">
                Data: Ruff &amp; Walker 1993; Dean &amp; Smith 2009; Ruff &amp; Burgess 2015; WHO 2006
              </span>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <LineChart
                data={growthTrajectoryData}
                margin={{ top: 12, right: 30, left: 20, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.basinEarth + '33'} />
                <XAxis
                  dataKey="age"
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                  label={{
                    value: 'Age (years)',
                    position: 'insideBottom',
                    offset: -2,
                    fill: COLORS.sedimentSand,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  domain={[40, 200]}
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                  label={{
                    value: 'Stature (cm)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: COLORS.sedimentSand,
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number, name: string) => {
                    const labels: Record<string, string> = {
                      modernHuman: 'Modern H. sapiens',
                      fastModel: 'Fast maturation (ape-like)',
                      slowModel: 'Slow maturation (human-like)',
                    };
                    return [`${value} cm`, labels[name] || name];
                  }}
                />
                <Legend
                  wrapperStyle={{ color: COLORS.boneIvory, fontSize: 11 }}
                  formatter={(value: string) => {
                    const labels: Record<string, string> = {
                      modernHuman: 'Modern H. sapiens',
                      fastModel: 'Fast maturation (ape-like)',
                      slowModel: 'Slow maturation (human-like)',
                    };
                    return labels[value] || value;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="modernHuman"
                  stroke={COLORS.sedimentSand}
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="6 3"
                />
                <Line
                  type="monotone"
                  dataKey="fastModel"
                  stroke={COLORS.heatOchre}
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="slowModel"
                  stroke={COLORS.turkanaBlue}
                  strokeWidth={2.5}
                  dot={false}
                />
                <ReferenceDot
                  x={8}
                  y={160}
                  r={6}
                  fill={COLORS.heatOchre}
                  stroke={COLORS.boneIvory}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;If his growth followed the modern human pattern, he was an eleven-year-old
              boy who would have been over six feet tall. If he grew like an ape, he was eight
              and already close to his adult size. The answer changes everything downstream —
              adult body mass estimates, brain-to-body ratios, energetics.&rdquo;
            </p>
            <cite>— Christopher Ruff &amp; Alan Walker, 1993</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 4: The Body ── */}
      <section className="turkana-v2-section" id="section-4">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">4</span>
          <h2>The Body</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;This body dissipates heat like a radiator.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            Place Lucy&rsquo;s skeleton next to Turkana Boy&rsquo;s and you are not simply
            looking at a bigger version of the same animal. You are looking at a different
            engineering solution to a different ecological problem. <em>Australopithecus
            afarensis</em>, represented most famously by the 3.18-million-year-old partial skeleton
            AL 288-1, stood roughly 107 centimeters tall, weighed approximately 29 kilograms, and
            carried a body built for compromise — short legs still suited for arboreal climbing,
            wide flaring ilia providing attachment surfaces for muscles that stabilized a pelvis
            not yet fully committed to the mechanical demands of habitual bipedalism. Her bi-iliac
            breadth relative to stature was approximately 0.25 — a wide, compact body that retained
            heat efficiently and maximized stability in a mixed woodland-savanna environment.
          </p>
          <p>
            KNM-WT 15000 is a different architecture. Even at his juvenile stature of 160
            centimeters, his proportions had shifted categorically. His bi-iliac breadth — the
            width across the hip bones — was approximately 23 centimeters, giving a
            breadth-to-stature ratio of roughly 0.14. This is dramatically narrower than any
            australopith, narrower than the average modern human ratio of 0.16, and comparable to
            the proportions seen today in the tallest, most linear tropical populations such as
            the Nilotic peoples of South Sudan. His crural index — the ratio of tibial length to
            femoral length, a reliable indicator of limb segment proportionality and climatic
            adaptation — was approximately 86, squarely within the range of modern equatorial
            Africans and well above the values recorded for <em>A. afarensis</em>.
          </p>
          <p>
            Peter Wheeler, in a pair of landmark papers published in 1991 and 1993, provided the
            mechanistic explanation for why these proportions matter. A tall, narrow body standing
            upright in equatorial sun presents a minimal cross-section to overhead solar radiation.
            The high surface-area-to-mass ratio maximizes convective heat loss — the body sheds
            heat more efficiently because there is proportionally more skin surface through which
            excess thermal energy can escape. Wheeler calculated that a body built like Turkana
            Boy&rsquo;s would gain approximately 30% less solar heat and require roughly 30% less
            water to maintain thermal balance compared to a shorter, wider body of equivalent mass
            under the same equatorial conditions. In a hot, dry, open landscape — precisely the
            habitat that the Turkana Basin represented at 1.53 million years ago — that is not a
            marginal advantage. It is the difference between sustainable ranging and heat death.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.bodyProportionSilhouettes}
              alt="Body proportion silhouettes comparing Australopithecus, Homo ergaster, and modern humans"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Body plan comparison across hominin species. The shift from Lucy&rsquo;s compact,
              wide-bodied form to Turkana Boy&rsquo;s narrow, elongated proportions represents
              a thermoregulatory revolution.
            </figcaption>
          </figure>

          <p>
            This is Allen&rsquo;s Rule made visible in the fossil record. First articulated in
            1877, Allen&rsquo;s Rule observes that endothermic animals in hot climates tend toward
            longer extremities and more linear body forms, while those in cold climates tend toward
            shorter limbs and more compact bodies — maximizing heat dissipation in the first case,
            minimizing it in the second. The rule describes a pattern observed across dozens of
            mammalian species, from foxes to rabbits to humans. In modern <em>Homo sapiens</em>,
            the pattern is clearly visible: Nilotic East Africans have the highest crural indices
            and most linear body forms, while Arctic-adapted populations like the Inuit have the
            lowest crural indices and most compact builds. Turkana Boy represents the first
            appearance of this heat-adapted body plan in the hominin fossil record — the moment
            when our lineage abandoned the arboreal-terrestrial compromise body and committed to
            an open-country thermoregulatory design.
          </p>

          {IMAGES.pelvis && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.pelvis}
              alt="Homo erectus pelvis showing the narrow bi-iliac breadth characteristic of the species"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              The pelvis of <em>Homo erectus</em>. The narrow bi-iliac breadth of KNM-WT 15000
              (~23 cm) contrasts sharply with Lucy&rsquo;s wide, flaring ilia (~26.3 cm) despite
              his much greater stature.
            </figcaption>
          </figure>
          )}

          {/* D4: Body Proportions */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Body Proportion Comparison</h3>
              <span className="turkana-v2-viz-source">
                Data: Ruff &amp; Walker 1993; Jungers 1988; WHO 2006
              </span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={bodyProportionData}
                margin={{ top: 12, right: 30, left: 20, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.basinEarth + '33'} />
                <XAxis
                  dataKey="species"
                  tick={{ fill: COLORS.boneIvory, fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: COLORS.boneIvory, fontSize: 11 }} />
                <Bar dataKey="stature" name="Stature (cm)" fill={COLORS.turkanaBlue} radius={[3, 3, 0, 0]} />
                <Bar dataKey="cruralIndex" name="Crural Index" fill={COLORS.heatOchre} radius={[3, 3, 0, 0]} />
                <Bar dataKey="biiliac" name="Bi-iliac breadth (cm)" fill={COLORS.sedimentSand} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* D5: Thermoregulation */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Thermoregulation: Surface-to-Mass Ratio &amp; Heat Dissipation</h3>
              <span className="turkana-v2-viz-source">
                Data: Wheeler 1991, 1993; Ruff 1991
              </span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={thermoData}
                margin={{ top: 12, right: 30, left: 20, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.basinEarth + '33'} />
                <XAxis
                  dataKey="form"
                  tick={{ fill: COLORS.boneIvory, fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                  label={{
                    value: 'Relative efficiency',
                    angle: -90,
                    position: 'insideLeft',
                    fill: COLORS.sedimentSand,
                    fontSize: 12,
                  }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: COLORS.boneIvory, fontSize: 11 }} />
                <Bar dataKey="surfaceToMass" name="Surface:Mass ratio" fill={COLORS.turkanaBlue} radius={[3, 3, 0, 0]} />
                <Bar dataKey="heatDissipation" name="Heat dissipation (%)" fill={COLORS.heatOchre} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;When you compare his skeleton to Lucy&rsquo;s, you are not just seeing a
              bigger animal. You are seeing a different solution to a different problem.
              Lucy&rsquo;s body was a compromise between the ground and the trees. This
              boy&rsquo;s body has resolved the compromise. The trees are gone from his
              anatomy.&rdquo;
            </p>
            <cite>— Alan Walker, <em>The Nariokotome Homo erectus Skeleton</em>, 1993</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 5: The Legs ── */}
      <section className="turkana-v2-section" id="section-5">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">5</span>
          <h2>The Legs</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;When you look at those femora, you stop thinking about walking and
          start thinking about ranging.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            Lucy walked. There is no serious debate about that — the Laetoli footprints, the
            valgus angle of her knee, the anterior position of her foramen magnum all confirm
            habitual bipedal locomotion in <em>Australopithecus afarensis</em> by at least 3.6
            million years ago. But Lucy walked with a body that retained significant arboreal
            compromises: relatively short legs, curved phalanges on both hands and feet, a wide
            pelvis that required pronounced lateral pelvic tilt during swing phase. Her bipedalism
            was real, but it was expensive. The cost of transport — the metabolic energy required
            to move one kilogram of body mass over one meter of ground — was substantially higher
            than in modern humans, perhaps 50% higher by some estimates.
          </p>
          <p>
            Turkana Boy&rsquo;s legs tell a different story. His femoral length of approximately
            432 millimeters at death was already within 5% of the average adult modern human male
            value of 455 millimeters — remarkable given that he was a juvenile with unfused
            epiphyses. His tibia was proportionally long, yielding a crural index of approximately
            86, indicating that the distal limb segment had elongated relative to the proximal
            segment in exactly the pattern predicted by Allen&rsquo;s Rule for a heat-adapted,
            open-country biped. His femoral head was 41 millimeters in diameter, reflecting the
            increased joint loading associated with a larger, heavier body traveling farther
            distances. His bicondylar angle — the angle of the femoral shaft relative to the
            condyles at the knee — was approximately 11 degrees, within the modern human range
            and indicating fully committed valgus alignment for efficient bipedal weight transfer.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.femurTibia}
              alt="Femur and tibia of KNM-WT 15000 showing long limb proportions"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              The lower limb elements of KNM-WT 15000. Femoral length (~432 mm) at death was
              already within 5% of the adult modern human male average.
            </figcaption>
          </figure>

          <p>
            Herman Pontzer, in his 2012 analysis of ecological energetics in early <em>Homo</em>,
            quantified the implications. Longer legs and a more efficient gait reduced the cost of
            transport in <em>Homo ergaster/erectus</em> by roughly 50% compared to australopiths.
            A body like Turkana Boy&rsquo;s could cover the same distance as Lucy&rsquo;s at half
            the metabolic cost — or, more relevantly, could cover twice the distance for the same
            caloric expenditure. This is not an abstract biomechanical calculation. It is the
            energetic foundation of a new ecological strategy. Australopiths were local foragers,
            tied to relatively small home ranges in mosaic woodland-savanna environments. A body
            with Turkana Boy&rsquo;s locomotor efficiency could range widely across open landscapes,
            accessing dispersed food resources — including animal carcasses — that would have been
            energetically unreachable for earlier hominins.
          </p>
          <p>
            The stride length difference captures this in a single metric. Lucy&rsquo;s estimated
            stride length was approximately 0.72 to 0.85 meters. Turkana Boy&rsquo;s, even as a
            juvenile, was in the range of 1.1 to 1.5 meters — approaching the modern human average
            of 1.4 to 1.6 meters. Each stride covered more ground; each stride cost less energy.
            The compounding effect across a day of walking is enormous. This is the body that made
            the Out-of-Africa dispersal — documented at Dmanisi in Georgia by 1.77 million years
            ago — biomechanically and metabolically feasible. The legs came first. The continent
            followed.
          </p>

          {IMAGES.limbRatioComparison && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.limbRatioComparison}
              alt="Limb ratio comparison across hominin species"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Limb proportions across hominins, after Ruff &amp; Walker 1993. The progressive
              elongation of the lower limb relative to the upper limb tracks the transition
              from arboreal-terrestrial compromise to committed open-country bipedalism.
            </figcaption>
          </figure>
          )}

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.lucySkeleton}
              alt="Lucy (AL 288-1) skeleton for comparison"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Lucy (AL 288-1), <em>Australopithecus afarensis</em>, ~3.18 Ma. At 107 cm
              with short legs and wide pelvis, she represents the locomotor baseline from which
              Turkana Boy&rsquo;s proportions departed.
            </figcaption>
          </figure>

          {/* D6: Locomotion */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Locomotion Biomechanics</h3>
              <span className="turkana-v2-viz-source">
                Data: Pontzer 2012; Ruff &amp; Walker 1993; Jungers 1988
              </span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={locomotionData}
                margin={{ top: 12, right: 30, left: 20, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.basinEarth + '33'} />
                <XAxis
                  dataKey="species"
                  tick={{ fill: COLORS.boneIvory, fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number, name: string) => {
                    const units: Record<string, string> = {
                      strideLength: 'm',
                      costOfTransport: 'J/kg/m',
                      femurLength: 'cm',
                    };
                    return [`${value} ${units[name] || ''}`, name];
                  }}
                />
                <Legend
                  wrapperStyle={{ color: COLORS.boneIvory, fontSize: 11 }}
                  formatter={(value: string) => {
                    const labels: Record<string, string> = {
                      strideLength: 'Stride length (m)',
                      costOfTransport: 'Cost of transport (J/kg/m)',
                      femurLength: 'Femur length (cm)',
                    };
                    return labels[value] || value;
                  }}
                />
                <Bar dataKey="strideLength" name="strideLength" fill={COLORS.turkanaBlue} radius={[3, 3, 0, 0]} />
                <Bar dataKey="costOfTransport" name="costOfTransport" fill={COLORS.heatOchre} radius={[3, 3, 0, 0]} />
                <Bar dataKey="femurLength" name="femurLength" fill={COLORS.sedimentSand} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;Longer legs and a more efficient gait reduced the cost of transport in
              early <em>Homo</em> by roughly fifty percent compared to australopiths. That
              efficiency is what made long-distance ranging — and eventually continental
              dispersal — metabolically feasible.&rdquo;
            </p>
            <cite>— Herman Pontzer, <em>Current Anthropology</em>, 2012</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 6: The Brain ── */}
      <section className="turkana-v2-section" id="section-6">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">6</span>
          <h2>The Brain</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;The brain was getting bigger, but it wasn&rsquo;t yet the engine of change.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            The endocranial volume of KNM-WT 15000 has been measured at approximately 880 cubic
            centimeters. Given that hominin brain growth is roughly 95 to 97 percent complete by
            the equivalent of age seven to eight in modern humans, the projected adult cranial
            capacity falls in the range of 900 to 910 cc — substantially larger than any
            australopith (Lucy&rsquo;s species averaged around 438 cc), larger than
            <em>Homo habilis</em> (averaging approximately 610 cc), but well below the volumes
            recorded for later <em>Homo erectus</em> specimens from Asia (up to 1,100 cc) and
            dramatically below the modern human mean of approximately 1,400 cc.
          </p>
          <p>
            It is tempting to place this number on a progress chart — to draw a line from 438 to
            880 to 1,400 and call it the march of encephalization. But that line obscures more
            than it reveals. The brain of <em>Homo ergaster</em> was growing, yes, but the body
            was growing faster. Turkana Boy&rsquo;s postcranial skeleton had modernized far more
            dramatically than his endocranium. His limb proportions, his pelvic geometry, his
            thermoregulatory architecture — all were within or approaching the modern human range.
            His brain was not. The encephalization quotient — brain size relative to expected brain
            size for a mammal of equivalent body mass — was elevated compared to australopiths but
            remained substantially below the modern human value. This is a body story first and a
            brain story second.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.craniumFrontal}
              alt="KNM-WT 15000 cranium, frontal view"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              The cranium of KNM-WT 15000 with an endocranial volume of ~880 cc. Larger than
              any australopith, but the postcranium had modernized far more dramatically than
              the endocranium.
            </figcaption>
          </figure>

          <p>
            The range of endocranial volumes across <em>Homo erectus</em> sensu lato is itself
            instructive. Susan Antón, in her comprehensive 2003 review, documented a span from
            approximately 600 cc at Dmanisi to over 1,100 cc in later Asian specimens. Turkana
            Boy sits comfortably in the middle of this enormous range — a highly variable species
            in which brain size alone cannot distinguish populations, let alone predict behavioral
            capacity. The Dmanisi hominins, with their smaller brains, had already dispersed out
            of Africa. Larger brains did not appear to be a prerequisite for continental-scale
            movement.
          </p>
          <p>
            The most provocative cross-reference comes from a species that postdates Turkana Boy
            by over a million years. <em>Homo naledi</em>, dated to approximately 236,000 to
            335,000 years ago in the Rising Star cave system of South Africa, had an endocranial
            volume of only 465 to 560 cc — smaller than many australopiths, far smaller than
            Turkana Boy, and yet the species was found in a context that suggests deliberate body
            disposal in a difficult-to-access underground chamber. If the mortuary behavior
            interpretation survives scrutiny, it means that a hominin with a brain smaller than
            Turkana Boy&rsquo;s was engaged in symbolic or proto-symbolic activity nearly a million
            years later. Brain size alone does not determine cognitive capacity. Organization,
            connectivity, and developmental context all matter — and none of these can be read
            from a cranial volume measurement.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.craniumLateral}
              alt="KNM-WT 15000 cranium replica, lateral view showing endocranial contours"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Lateral view of a KNM-WT 15000 skull replica (Senckenberg Museum). The low
              cranial vault and prominent brow ridge are characteristic of <em>Homo ergaster</em>.
            </figcaption>
          </figure>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.brainSizeLineup}
              alt="Cranial lineup showing brain size progression across hominin species"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Brain size across the hominin lineage. The progression appears linear but masks
              enormous variation within species and a disconnect between volume and behavioral
              complexity.
            </figcaption>
          </figure>

          {/* D7: Brain Volume */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Endocranial Volume Across Hominin Species</h3>
              <span className="turkana-v2-viz-source">
                Data: Holloway et al. 2004; Walker &amp; Leakey 1993; Antón 2003
              </span>
            </div>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart
                data={brainVolumeData}
                margin={{ top: 12, right: 30, left: 20, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.basinEarth + '33'} />
                <XAxis
                  dataKey="species"
                  tick={{ fill: COLORS.boneIvory, fontSize: 10 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  domain={[0, 1600]}
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                  label={{
                    value: 'Volume (cc)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: COLORS.sedimentSand,
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number, _name: string, props: { payload: typeof brainVolumeData[number] }) => [
                    `${value} cc (${props.payload.era})`,
                    'Endocranial volume',
                  ]}
                />
                <Bar
                  dataKey="volume"
                  radius={[3, 3, 0, 0]}
                >
                  {brainVolumeData.map((entry, index) => (
                    <rect
                      key={`cell-${index}`}
                      fill={entry.species === 'H. ergaster (TB)' ? COLORS.heatOchre : COLORS.turkanaBlue}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;The range of endocranial volumes across <em>Homo erectus</em> sensu lato
              is enormous — from about 600 cubic centimeters at Dmanisi to over 1,100 in later
              Asian specimens. Turkana Boy at 880 sits comfortably in the middle of a highly
              variable species.&rdquo;
            </p>
            <cite>— Susan Antón, <em>Yearbook of Physical Anthropology</em>, 2003</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 7: The Voice ── */}
      <section className="turkana-v2-section" id="section-7">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">7</span>
          <h2>The Voice</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;The question is not whether he could speak. The question is what the skeleton
          can and cannot tell us about it.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            There is a narrow canal running through the thoracic vertebrae of KNM-WT 15000 — the
            vertebral canal, the bony conduit that houses the spinal cord and its branching nerves.
            In the thoracic region, spinal nerves exit through the intervertebral foramina to become
            the intercostal nerves, which innervate the muscles between the ribs. These intercostal
            muscles do something that appears simple but is biomechanically extraordinary: they
            modulate exhalation. Not the gross inflation and deflation of breathing at rest, but the
            fine, graded control of airflow that allows a human being to sustain a vowel, vary
            the volume of a consonant, hold a phrase across a controlled breath, and — in the most
            complex manifestation — produce spoken language.
          </p>
          <p>
            In 1999, Ann MacLarnon and Gwen Hewitt published a landmark analysis of the thoracic
            vertebral canal in KNM-WT 15000. Their finding was striking: the canal was significantly
            narrower than in modern humans, particularly in the upper and mid-thoracic regions
            where intercostal innervation is densest. MacLarnon and Hewitt argued that a narrower
            canal implied fewer nerve fibers passing through it, which in turn implied reduced motor
            innervation of the intercostal muscles. If the intercostal muscles received less neural
            input, they could not achieve the fine motor control of exhalation necessary for the
            sustained, modulated airflow that speech requires. The conclusion was carefully stated
            but widely cited: KNM-WT 15000 likely lacked the respiratory infrastructure for complex
            spoken language. The body was modern; the voice was not yet there.
          </p>
          <p>
            The argument was elegant, anatomically grounded, and — as subsequent work would
            demonstrate — potentially flawed. In 2015, Marc Meyer and Martin Haeusler re-examined
            the vertebral canal dimensions using a substantially larger comparative sample of modern
            humans and fossil hominins. Their central finding challenged MacLarnon and Hewitt on
            two fronts. First, when measured against a broader range of modern human variation, the
            canal dimensions of KNM-WT 15000 fell within the lower end of the normal modern range
            rather than below it. Second, and more fundamentally, Meyer and Haeusler drew attention
            to the pathological condition of several of Turkana Boy&rsquo;s vertebrae. Bruce Latimer
            and James Ohman had documented in 2001 that KNM-WT 15000 suffered from a form of axial
            dysplasia — a developmental abnormality of the vertebral column that affected vertebral
            body shape and canal dimensions. If pathology had distorted the canal, then measurements
            taken from the specimen could not be treated as representative of the species.
          </p>

          {IMAGES.vertebralColumn && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.vertebralColumn}
              alt="Vertebral column elements of KNM-WT 15000 showing thoracic vertebrae"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Thoracic vertebral elements of KNM-WT 15000. The width of the vertebral canal in
              this region became the focus of a two-decade debate about speech capability in
              early <em>Homo</em>.
            </figcaption>
          </figure>
          )}

          <p>
            The disagreement between these two analyses is not merely technical. It illustrates a
            principle that governs much of paleoanthropology: the distance between a measurement
            and an inference is often greater than it appears. MacLarnon and Hewitt measured the
            canal. They inferred nerve count from canal width. They inferred motor control from
            nerve count. They inferred speech capacity from motor control. Each step is plausible;
            the chain is long. Meyer and Haeusler did not need to refute the logic — they only
            needed to question the first measurement, and the entire chain loosened. This is how
            science works when the sample size is one. A single specimen carrying a pathological
            condition can generate an inference about an entire species that survives for sixteen
            years before the measurement itself is reconsidered.
          </p>
          <p>
            Neither analysis settles the question. MacLarnon and Hewitt may be correct that
            <em>Homo ergaster</em> lacked the respiratory control for fully modern speech, even
            if their specific measurement was compromised by pathology — other evidence, including
            the relatively small size of the hypoglossal canal and the apparently high position
            of the larynx inferred from basicranial morphology, points in the same direction.
            Meyer and Haeusler may be correct that the vertebral canal alone cannot bear the
            inferential weight placed upon it. The honest summary is that speech in early
            <em>Homo</em> remains an open question, constrained by the limits of what bone can
            tell us about soft tissue, neural wiring, and behavior.
          </p>
          <p>
            What the debate teaches, regardless of its resolution, is something about the nature
            of skeletal evidence. A vertebral canal is a channel for nerves. Nerves control muscles.
            Muscles produce movement, including the movement of air through a vocal tract. But the
            canal does not contain the nerves; they decomposed 1.53 million years ago. What remains
            is the housing, and from the housing we infer the contents, and from the contents we
            infer the capacity, and from the capacity we infer the behavior. At each step, certainty
            diminishes. The skeleton speaks — but in whispers, not declarations.
          </p>

          {/* D8: Vertebral Canal Debate */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>The Vertebral Canal Debate</h3>
              <span className="turkana-v2-viz-source">
                MacLarnon &amp; Hewitt 1999 vs. Meyer &amp; Haeusler 2015
              </span>
            </div>
            <div className="turkana-v2-debate">
              <div className="turkana-v2-debate-column turkana-v2-debate-left">
                <h4>MacLarnon &amp; Hewitt (1999)</h4>
                <ul>
                  <li>Thoracic vertebral canal narrower than modern humans</li>
                  <li>Reduced innervation of intercostal muscles</li>
                  <li>Limited fine motor control of exhalation</li>
                  <li>Complex speech requires precise breathing control</li>
                  <li>Conclusion: speech capabilities were limited</li>
                </ul>
              </div>
              <div className="turkana-v2-debate-column turkana-v2-debate-right">
                <h4>Meyer &amp; Haeusler (2015)</h4>
                <ul>
                  <li>Re-examined vertebral measurements with larger sample</li>
                  <li>Canal width falls within modern human variation</li>
                  <li>Pathological vertebrae may have distorted original analysis</li>
                  <li>KNM-WT 15000 had vertebral anomalies (Latimer &amp; Ohman 2001)</li>
                  <li>Conclusion: original inference may overreach</li>
                </ul>
              </div>
            </div>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;The thoracic vertebral canal of KNM-WT 15000 is significantly smaller than
              that of modern <em>Homo sapiens</em>. This implies reduced innervation of the
              intercostal muscles and, consequently, a more limited capacity for the fine
              respiratory control associated with spoken language.&rdquo;
            </p>
            <cite>— Ann MacLarnon &amp; Gwen Hewitt, <em>American Journal of Physical
            Anthropology</em>, 1999</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 8: The Tools ── */}
      <section className="turkana-v2-section" id="section-8">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">8</span>
          <h2>The Tools</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;A handaxe is a theory of shape held in the hand.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            In 2011, Christopher Lepre and colleagues published a finding that reset the
            chronology of stone tool technology. At the site of Kokiselei, on the western shore
            of Lake Turkana — roughly 50 kilometers from the spot where Kamoya Kimeu would find
            KNM-WT 15000 — they recovered a collection of large bifacially flaked tools from
            sediments dated by paleomagnetic methods to approximately 1.76 million years ago.
            These were not the simple, irregular flakes of the Oldowan tradition. They were
            Acheulean handaxes — large, symmetrically shaped, bifacially worked stones that
            require a fundamentally different manufacturing process from anything that preceded
            them. The Kokiselei discovery pushed the origin of the Acheulean back by roughly
            350,000 years, placing the earliest known handaxes in the West Turkana Basin at
            a date contemporary with the Dmanisi hominins in Georgia and roughly 230,000 years
            before KNM-WT 15000 walked the same landscape.
          </p>
          <p>
            The distinction between Oldowan and Acheulean technology is not merely typological —
            it is cognitive. Oldowan tools, first described from Olduvai Gorge in Tanzania and
            now documented as far back as 2.6 million years ago at Gona in Ethiopia, are produced
            by striking a hammerstone against a core to detach sharp-edged flakes. The process
            requires spatial coordination and an understanding of conchoidal fracture, but the
            resulting tools are irregular and show limited evidence of a predetermined form. The
            toolmaker is exploiting the physics of stone fracture; the shape emerges from the
            material rather than from a plan.
          </p>
          <p>
            Acheulean handaxes are different. A finished handaxe displays bilateral symmetry —
            the tool is shaped to a template that exists, in some form, before the knapping begins.
            The toolmaker must rotate the core, remove flakes from alternating faces in a planned
            sequence, maintain proportionality between length and width, and correct asymmetries
            as they emerge. Dietrich Stout and colleagues, in a series of neuroimaging studies
            conducted between 2008 and 2015, demonstrated that Acheulean handaxe production
            activates prefrontal cortical regions associated with hierarchical action planning —
            regions that are not significantly activated during Oldowan flaking. The transition
            from Oldowan to Acheulean, in other words, tracks an increase not merely in manual
            skill but in the cognitive architecture supporting planned, multi-step, goal-directed
            behavior.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.acheuleanHandaxe}
              alt="Acheulean handaxe showing characteristic bilateral symmetry"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              An Acheulean handaxe displaying the bilateral symmetry that defines the tradition.
              Producing this shape requires a mental template and hierarchical planning —
              cognitive demands absent from earlier Oldowan flaking.
            </figcaption>
          </figure>

          <p>
            It would be tempting to place a handaxe in Turkana Boy&rsquo;s hand. The Acheulean
            tradition was well established in West Turkana by 1.53 million years ago; <em>Homo
            ergaster</em> is the most likely maker; KNM-WT 15000 lived in the right place at the
            right time. But the temptation should be resisted. No tools were found in direct
            association with the skeleton. The Nariokotome site yielded the individual but not
            his toolkit. To assign specific technological competence to a specific fossil
            individual is to cross from population-level inference to individual biography, and
            the evidence does not support that crossing. What we can say is that the species to
            which KNM-WT 15000 belonged was the first to produce artifacts requiring a mental
            template — that the cognitive world his species inhabited included the capacity to
            impose planned, symmetrical form on raw stone. The handaxe is a theory of shape held
            in the hand. By 1.76 million years ago, that theory existed in West Turkana.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.oldowanVsAcheulean}
              alt="Comparison of Oldowan cores and Acheulean handaxes"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Oldowan cores (left) versus Acheulean handaxes (right). The shift from irregular
              flaking to planned bilateral symmetry represents a cognitive threshold in hominin
              technology.
            </figcaption>
          </figure>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.handaxeSymmetry}
              alt="Detailed view of handaxe bilateral symmetry"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Bilateral symmetry in an Acheulean handaxe. Neuroimaging studies show that producing
              this symmetry activates prefrontal regions associated with hierarchical action
              planning.
            </figcaption>
          </figure>

          <p>
            The broader technological context stretches both deeper into the past and further
            across the continent. At Lomekwi 3, also in West Turkana, Sonia Harmand and
            colleagues announced in 2015 the discovery of stone tools dated to 3.3 million years
            ago — the Lomekwian industry, predating even the Oldowan and potentially associated
            with a pre-<em>Homo</em> toolmaker. At Konso-Gardula in Ethiopia, Yonas Beyene and
            colleagues documented Acheulean handaxes at 1.75 million years ago, independently
            confirming the early emergence of the tradition in East Africa. The Acheulean would
            persist, with remarkable conservatism, for over a million years — the longest-lived
            technological tradition in human history, not superseded until the Middle Stone Age
            industries appeared after roughly 300,000 years ago. Turkana Boy lived at the front
            end of this extraordinary cultural persistence, in a landscape where the cognitive
            revolution encoded in bilateral symmetry was newly underway.
          </p>

          {/* D9: Tool Technology Timeline */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Stone Tool Technology Timeline</h3>
              <span className="turkana-v2-viz-source">
                Data: Lepre et al. 2011; Harmand et al. 2015; Beyene et al. 2013
              </span>
            </div>
            <div className="turkana-v2-timeline">
              {[
                { date: '3.3 Ma', site: 'Lomekwi 3', type: 'Lomekwian' },
                { date: '2.6 Ma', site: 'Gona, Ethiopia', type: 'Oldowan' },
                { date: '2.3 Ma', site: 'Lokalalei, Kenya', type: 'Oldowan' },
                { date: '1.76 Ma', site: 'Kokiselei, West Turkana', type: 'Earliest Acheulean', highlight: true },
                { date: '1.75 Ma', site: 'Konso-Gardula, Ethiopia', type: 'Acheulean' },
                { date: '1.53 Ma', site: 'KNM-WT 15000', type: 'Temporal context', highlight: true },
                { date: '1.2 Ma', site: 'Olorgesailie, Kenya', type: 'Acheulean' },
                { date: '0.3 Ma', site: 'Late Acheulean', type: 'Final phase' },
              ].map((entry, i) => (
                <div key={i} className={`turkana-v2-timeline-entry ${entry.highlight ? 'turkana-v2-highlight' : ''}`}>
                  <span className="turkana-v2-timeline-date">{entry.date}</span>
                  <span className="turkana-v2-timeline-site">{entry.site}</span>
                  <span className="turkana-v2-timeline-type">{entry.type}</span>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;The Acheulian has now been shown to extend to 1.76 million years ago in
              West Turkana. This is substantially earlier than previously documented and indicates
              that the transition to large cutting tool technology was underway soon after the
              emergence of <em>Homo erectus</em> in East Africa.&rdquo;
            </p>
            <cite>— Christopher Lepre et al., <em>Nature</em>, 2011</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 9: The Walk ── */}
      <section className="turkana-v2-section" id="section-9">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">9</span>
          <h2>The Walk</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;They did not need boats. They needed legs and heat tolerance and time.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            In 1991, a team led by Leo Gabunia and Abesalom Vekua recovered a mandible from
            the medieval ruins of Dmanisi in the Republic of Georgia. Within a decade, the site
            would yield five hominin crania and an extraordinary collection of postcranial
            remains, all dating to approximately 1.77 million years ago. Dmanisi is not in Africa.
            It is in the southern Caucasus, at the crossroads of Europe and Asia, perched above
            the confluence of the Mashavera and Pinezauri rivers at an elevation of roughly 800
            meters. Its hominins — classified as early <em>Homo erectus</em> or <em>Homo
            georgicus</em> depending on the taxonomist — represent the earliest confirmed
            presence of our genus outside the African continent. They arrived roughly 240,000
            years before KNM-WT 15000 was born.
          </p>
          <p>
            The postcranial material from Dmanisi, published by David Lordkipanidze and colleagues
            in 2007, provides the critical comparison. The D4167 partial skeleton — comprising
            vertebrae, clavicle, humerus, ulna, portions of the os coxa, and a nearly complete
            tibia — displays body proportions that fall within the range documented for African
            <em>Homo ergaster</em>. Estimated stature ranged from 145 to 166 centimeters depending
            on the regression method applied to the tibial length. Limb proportions were modern in
            their fundamental geometry: relatively long legs, relatively short arms, a linear body
            plan consistent with open-country bipedalism and efficient thermoregulation. The
            Dmanisi hominins were not identical to Turkana Boy — their brains were smaller (the
            smallest cranium, D4500, has an endocranial volume of roughly 546 cc, the largest
            about 730 cc), and their stature may have been somewhat shorter on average — but they
            shared the same fundamental body architecture. The engineering solution documented in
            KNM-WT 15000&rsquo;s skeleton was already in place, in functional form, a quarter-million
            years earlier and 5,000 kilometers to the northeast.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.dmanisiPostcranial}
              alt="Postcranial fossils from Dmanisi, Georgia showing body proportions similar to African Homo ergaster"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Postcranial material from Dmanisi, Georgia (~1.77 Ma). The D4167 skeleton displays
              body proportions consistent with African <em>Homo ergaster</em> — long legs, linear
              build, and modern-type bipedal gait.
            </figcaption>
          </figure>

          <p>
            The mechanism of dispersal does not require extraordinary explanation. It requires
            only legs, heat tolerance, and generational time. A home range expansion of 20
            kilometers per generation — modest by the standards of large-bodied mammalian
            carnivores — would carry a population from East Africa to the Caucasus in roughly
            25,000 years, a span that is archaeologically invisible and biologically trivial.
            The body plan documented in KNM-WT 15000 — the long stride, the efficient cost of
            transport, the thermoregulatory architecture optimized for sustained movement in
            hot, open environments — was the infrastructure of this dispersal. The hominins did
            not decide to leave Africa. They expanded their ranges in response to ecological
            opportunity, and their ranges eventually extended beyond the continent. The dispersal
            was not an event; it was a gradient.
          </p>
          <p>
            Further evidence of early <em>Homo</em> outside Africa comes from the site of
            &apos;Ubeidiya in the Jordan Valley of Israel, where Acheulean tools and fragmentary
            hominin remains date to approximately 1.4 million years ago. The tools at &apos;Ubeidiya
            share typological characteristics with East African Acheulean assemblages, suggesting
            that the technological tradition traveled with the populations. By 1.0 million years
            ago, <em>Homo erectus</em> populations are documented across a vast swath of the Old
            World — from Java to northern China to southern Europe. The body plan that first
            appears clearly in the fossil record with specimens like KNM-WT 15000 proved to be
            one of the most successful anatomical designs in mammalian evolution, persisting with
            only modest variation for more than a million years across three continents.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.lakeTurkanaAerial}
              alt="Satellite view of Lake Turkana, the landscape where KNM-WT 15000 lived"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Lake Turkana from orbit (NASA STS-059). The Nariokotome site lies on the western
              shore. This basin was one starting point for a dispersal that reached the Caucasus
              by 1.77 Ma.
            </figcaption>
          </figure>

          <p>
            The Dmanisi connection is particularly illuminating because it decouples brain size
            from dispersal ability. The Dmanisi hominins had cranial capacities well below
            Turkana Boy&rsquo;s — yet they had already completed the journey. Whatever cognitive
            threshold continental dispersal requires, it had been met at 600 cc. The body, not
            the brain, was the primary enabling factor. Long legs that reduced the cost of
            transport. A narrow pelvis and linear build that shed heat across equatorial and
            subtropical landscapes. A stride length that could cover 30 to 40 kilometers in a
            day without extraordinary metabolic expenditure. These are not cultural innovations.
            They are anatomical facts, written in bone and readable in KNM-WT 15000, that made
            the first great human migration not just possible but, in hindsight, predictable.
          </p>

          {/* D10: Migration Map */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Early <em>Homo</em> Dispersal: Key Sites</h3>
              <span className="turkana-v2-viz-source">
                Data: Lordkipanidze et al. 2007; Lepre et al. 2011; Bar-Yosef &amp; Goren-Inbar 1993
              </span>
            </div>
            <div className="turkana-v2-migration-map">
              <div className="turkana-v2-map-site turkana-v2-map-origin">
                <div className="turkana-v2-map-dot" />
                <div className="turkana-v2-map-label">
                  <strong>Nariokotome, East Africa</strong>
                  <span>1.53 Ma — KNM-WT 15000</span>
                  <span>160 cm stature, crural index 86</span>
                </div>
              </div>
              <div className="turkana-v2-map-route">&rarr;</div>
              <div className="turkana-v2-map-site">
                <div className="turkana-v2-map-dot" />
                <div className="turkana-v2-map-label">
                  <strong>Dmanisi, Georgia</strong>
                  <span>1.77 Ma — D4167 postcranial</span>
                  <span>145-166 cm stature, similar proportions</span>
                </div>
              </div>
              <div className="turkana-v2-map-route">&rarr;</div>
              <div className="turkana-v2-map-site">
                <div className="turkana-v2-map-dot" />
                <div className="turkana-v2-map-label">
                  <strong>&apos;Ubeidiya, Israel</strong>
                  <span>1.4 Ma — Acheulean tools</span>
                </div>
              </div>
            </div>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;The Dmanisi postcranial evidence demonstrates that body proportions
              associated with modern-type locomotion and thermoregulation were established in
              early <em>Homo</em> well before the major increase in brain size seen in later
              <em>Homo erectus</em>. The body came first.&rdquo;
            </p>
            <cite>— David Lordkipanidze et al., <em>Nature</em>, 2007</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 10: The Finder ── */}
      <section className="turkana-v2-section" id="section-10">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">10</span>
          <h2>The Finder</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;He just picked it up. A fragment smaller than a matchbox. That was all
          it took.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            On Sunday morning, August 23, 1984, Kamoya Kimeu walked along a dry erosion gully
            near the Nariokotome River on the western shore of Lake Turkana. The area had been
            surveyed before. The team, led by Richard Leakey and Alan Walker, was prospecting for
            fossils in the Nachukui Formation — Plio-Pleistocene sediments exposed by the slow
            erosional retreat of ancient lake deposits. Kimeu was not looking for anything in
            particular. He was doing what he had done nearly every working day for over two
            decades: walking with his eyes on the ground, scanning the surface gravels for the
            distinctive texture and color of fossilized bone against a background of sedimentary
            debris. It is monotonous, physically demanding work that requires sustained attention
            over hours of equatorial heat. Most days yield nothing. Many weeks yield nothing.
            The entire enterprise depends on a form of expertise that resists formal description
            — an acquired perceptual skill, honed over thousands of hours, that allows certain
            individuals to detect the signal of bone in the noise of stone.
          </p>
          <p>
            Kimeu spotted a small fragment of cranial bone lying on the slope of the gully. It
            was smaller than a matchbox — a piece of frontal bone, dark and mineralized, with the
            distinctive curvature and cortical thickness of a hominin cranium. He collected it and
            brought it to Leakey. The team returned to the spot. Within days, further surface
            collection and preliminary excavation revealed additional cranial fragments, and then
            a mandible, and then — astonishingly — postcranial elements: vertebrae, ribs, portions
            of the pelvis and limb bones. The scatter of bone extended across the hillslope in a
            pattern consistent with a single burial event followed by gradual erosional exposure.
            It became clear within the first field season that this was not a handful of fragments.
            This was a skeleton. An early <em>Homo</em> skeleton, the most complete one ever found
            by a factor that rendered comparisons meaningless.
          </p>

          {IMAGES.kamoyaKimeu && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.kamoyaKimeu}
              alt="Kamoya Kimeu, the fossil hunter who discovered KNM-WT 15000"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Kamoya Kimeu, whose career spanned more than four decades of fieldwork in East Africa.
              His discovery of KNM-WT 15000 in August 1984 transformed the study of early
              <em> Homo</em>.
            </figcaption>
          </figure>
          )}

          <p>
            Kamoya Kimeu is among the most accomplished fossil hunters in the history of
            paleoanthropology. Born near Kangundo in eastern Kenya around 1940, he began
            working with Louis Leakey in 1960 and went on to serve as field crew chief for both
            Richard Leakey and Meave Leakey across decades of expeditions in the Turkana Basin,
            at Olduvai Gorge, and at Laetoli. His discoveries include not only KNM-WT 15000 but
            also KNM-ER 1808 (a pathological <em>Homo erectus</em> femur from Koobi Fora),
            significant specimens of <em>Homo habilis</em> and <em>Paranthropus boisei</em>,
            and numerous other finds that collectively form a substantial fraction of the East
            African hominin fossil record. In 1985, the National Geographic Society awarded him
            the LaGorce Gold Medal — the first time the honor had been given for work in
            paleontology and only the second time it had been awarded to an African.
          </p>

          {IMAGES.originalFragment && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.originalFragment}
              alt="The original cranial fragment of KNM-WT 15000 found by Kamoya Kimeu"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              The initial cranial fragment that began the discovery. Smaller than a matchbox,
              it was the visible surface expression of the most complete early <em>Homo</em>{' '}
              skeleton ever recovered.
            </figcaption>
          </figure>
          )}

          <p>
            The story of discovery matters because it restores contingency to a process that
            textbooks often present as inevitable. KNM-WT 15000 was not found by remote sensing,
            geochemical survey, or algorithmic prediction. It was found because one person, on
            one morning, glanced at the right patch of ground. Had Kimeu walked ten meters to the
            left, the fragment might have eroded away in the next rainy season, washing into the
            Nariokotome River and eventually into Lake Turkana, where it would have been
            unrecoverable. The most consequential fossil find in the study of early <em>Homo</em>{' '}
            depended on an act of attention that was irreducible to method — a moment of
            perception by a trained eye in the right place at the right time.
          </p>
          <p>
            This is not to diminish the systematic fieldwork that placed Kimeu at that location.
            Richard Leakey had selected the Nariokotome area based on geological mapping and
            prior reconnaissance. The team was working within a research framework that identified
            the Nachukui Formation as a promising fossiliferous horizon. But within that framework,
            the discovery itself was irreducibly human — an individual&rsquo;s attention transforming
            an eroding scrap of bone into the pivot point of an entire scientific field. After
            eleven sections of anatomy, biomechanics, energetics, and cognitive inference, this
            is worth pausing to acknowledge: scientific revolutions sometimes begin not with
            hypotheses but with attention.
          </p>

          {IMAGES.nariokotomeSite && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.nariokotomeSite}
              alt="The Nariokotome III excavation site on the western shore of Lake Turkana"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              The Nariokotome III site, western shore of Lake Turkana. The dry gully where
              Kimeu found the initial fragment is visible in the foreground.
            </figcaption>
          </figure>
          )}

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;Kamoya has a gift for finding things. I don&rsquo;t know how he does it
              — none of us do, really. He just sees bone where the rest of us see rock. That
              morning he picked up a little scrap of cranium no bigger than a matchbox. That
              scrap turned out to be the most complete early human skeleton ever found.&rdquo;
            </p>
            <cite>— Richard Leakey, <em>Origins Reconsidered</em>, 1992</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 11: The Excavation ── */}
      <section className="turkana-v2-section" id="section-11">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">11</span>
          <h2>The Excavation</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;Five seasons. Fifteen hundred cubic meters. One skeleton.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            The discovery of a cranial fragment in August 1984 was the beginning, not the end, of
            the work. What followed was one of the most intensive and methodologically rigorous
            excavations in the history of paleoanthropology — five field seasons stretching from
            1984 to 1989, during which the team led by Richard Leakey and Alan Walker systematically
            dismantled a hillslope to recover the remains of a single individual. The scale of the
            effort is difficult to convey without numbers: approximately 1,500 cubic meters of
            sediment were excavated and screened; every bucket of earth passed through wire mesh to
            capture fragments as small as tooth enamel chips; the excavation area eventually
            extended well beyond the initial scatter, following the geological logic of erosion and
            redeposition to locate elements that had migrated downslope.
          </p>
          <p>
            The first season in 1984 established the scope of the find. The cranial fragments that
            Kimeu had spotted on the surface led the team to a concentration of bone eroding from
            a layer of fine-grained tuffaceous siltstone within the Nachukui Formation. By the end
            of the season, the team had recovered the cranium in multiple fragments, the mandible
            with its telltale abscess, and the first postcranial elements — cervical and thoracic
            vertebrae, several ribs, and portions of the upper limb. The realization that these
            all belonged to a single individual came from the congruence of size, developmental
            stage, and taphonomic context: every bone showed the same degree of mineralization,
            the same sedimentary matrix adhering to its surface, and the same juvenile
            developmental status.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.richardLeakey}
              alt="Richard Leakey, who co-directed the Nariokotome excavation"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Richard Leakey, co-director of the Nariokotome excavation. The five-season project
              he led with Alan Walker set new standards for the systematic recovery of a single
              hominin individual.
            </figcaption>
          </figure>

          <p>
            The second and third seasons, in 1985 and 1986, yielded the bulk of the postcranial
            skeleton. Both femora were recovered largely intact — extraordinary finds given that
            long bones are among the most fragile elements in a juvenile skeleton, their unfused
            epiphyses vulnerable to post-mortem breakage and erosion. The tibiae, fibulae, and
            both innominate bones of the pelvis were recovered across these seasons, providing
            the critical material for the body proportion and locomotor analyses that would follow.
            The vertebral column was recovered in near-complete sequence: all twelve thoracic
            vertebrae, all five lumbar vertebrae, six of seven cervical vertebrae, and the sacrum.
            This degree of vertebral completeness is nearly unique in the hominin fossil record
            and made possible the vertebral canal analyses that would fuel the speech debate for
            the next two decades.
          </p>
          <p>
            The fourth and fifth seasons, in 1987 and 1989, extended the excavation to its
            geological limits. Additional rib fragments, humeral pieces, and the few hand and
            foot elements that were recovered came from these later seasons. The final tally was
            108 bones — representing approximately 40 percent of the complete skeleton. The
            missing elements followed a predictable taphonomic pattern: hands and feet, which
            are composed of numerous small bones loosely connected by soft tissue, are the most
            vulnerable to disarticulation and dispersal after death. The 54 bones of each hand
            and the 52 bones of each foot were almost entirely absent, likely scattered by
            scavengers or fluvial processes before burial was complete.
          </p>

          {IMAGES.alanWalker && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.alanWalker}
              alt="Alan Walker, who led the anatomical analysis of KNM-WT 15000"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Alan Walker, who led the anatomical analysis of KNM-WT 15000 and co-edited the
              definitive 1993 monograph. His decade-long study of the skeleton established the
              evidential framework still used today.
            </figcaption>
          </figure>
          )}

          {IMAGES.excavationTeam && (
          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.excavationTeam}
              alt="The Nariokotome excavation team at work"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              The excavation team at Nariokotome. Over five seasons, approximately 1,500 cubic
              meters of sediment were screened to recover 108 skeletal elements from a single
              individual.
            </figcaption>
          </figure>
          )}

          <p>
            The resulting monograph — <em>The Nariokotome Homo erectus Skeleton</em>, edited by
            Walker and Leakey and published by Harvard University Press in 1993 — remains one of
            the most comprehensive analyses of a single fossil specimen ever produced. Its chapters,
            written by specialists across anatomy, developmental biology, paleontology, and
            geology, established the evidential baselines against which every subsequent study of
            KNM-WT 15000 has been measured. The monograph did not resolve every question — the
            age debate persists, the speech question remains open, the projected adult stature is
            still disputed — but it established the standard of documentation that makes resolution
            possible. It transformed a collection of bones into a permanent scientific resource,
            accessible to any researcher willing to engage the evidence on its own terms. This is
            how a skeleton becomes a benchmark: not through the drama of its discovery but through
            the discipline of its analysis.
          </p>

          {/* D11: Excavation Timeline */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Excavation Progress: Cumulative Bone Recovery (1984–1989)</h3>
              <span className="turkana-v2-viz-source">
                Data: Walker &amp; Leakey 1993
              </span>
            </div>
            <ResponsiveContainer width="100%" height={340}>
              <AreaChart
                data={excavationData}
                margin={{ top: 12, right: 30, left: 20, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.basinEarth + '33'} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: COLORS.boneIvory, fontSize: 11 }}
                  label={{
                    value: 'Field Season',
                    position: 'insideBottom',
                    offset: -2,
                    fill: COLORS.sedimentSand,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  domain={[0, 120]}
                  tick={{ fill: COLORS.sedimentSand, fontSize: 11 }}
                  label={{
                    value: 'Cumulative bones recovered',
                    angle: -90,
                    position: 'insideLeft',
                    fill: COLORS.sedimentSand,
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number, _name: string, props: { payload: typeof excavationData[number] }) => [
                    `${value} bones — ${props.payload.keyDiscovery}`,
                    `Season ${props.payload.season}`,
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="cumulativeBones"
                  stroke={COLORS.turkanaBlue}
                  fill={COLORS.turkanaBlue + '44'}
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;When all the bones were catalogued and laid out, what we had was
              unprecedented: 108 elements from a single juvenile <em>Homo erectus</em>
              individual. Most hominin species are known from fragments — a jaw here, a
              femur there. This was a person. We could read his body the way you read a
              book — from top to bottom, system by system.&rdquo;
            </p>
            <cite>— Alan Walker, <em>The Nariokotome Homo erectus Skeleton</em>, 1993</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 12: The Inheritance ── */}
      <section className="turkana-v2-section" id="section-12">
        <div className="turkana-v2-section-header">
          <span className="turkana-v2-section-number">12</span>
          <h2>The Inheritance</h2>
        </div>
        <blockquote className="turkana-v2-epigraph">
          &ldquo;You are the living draft of an architecture that was drawn 1.5 million
          years ago.&rdquo;
        </blockquote>

        <div className="turkana-v2-content">
          <p>
            Look down at your own legs. The femur running from your hip to your knee is
            approximately 45 centimeters long in an average adult male, 43 in an average adult
            female. Turkana Boy&rsquo;s was 43.2 centimeters — and he was a child with years of
            growth remaining, on even the most conservative model. Your tibia is proportionally
            long relative to your femur, giving you a crural index of approximately 83 to 85.
            His was 86. Your pelvis is narrow relative to your stature — a design optimized not
            for the wide, flaring stability of a body that still climbed trees, but for the
            efficient rotation of long legs beneath a vertically balanced trunk. His pelvis was
            narrower still. The architecture of your lower body — the long stride, the narrow
            waist, the high surface-area-to-mass ratio that keeps you from overheating on a
            summer run — was drafted 1.53 million years ago in a body that walked the western
            shore of Lake Turkana.
          </p>
          <p>
            This is not a metaphor. It is a morphological claim, and a carefully bounded one. The
            body plan that first appears in the hominin fossil record with <em>Homo ergaster</em> —
            the linear, heat-adapted, long-legged, narrow-hipped design documented in KNM-WT
            15000 — is, in its fundamental proportions, the body plan you are currently using to
            sit in a chair and read this essay. Your brain is three times larger. Your teeth are
            smaller. Your face is retracted beneath the frontal bone rather than projecting forward
            beneath a heavy brow ridge. But from the neck down, the distance between your body and
            Turkana Boy&rsquo;s is far smaller than the distance between his body and Lucy&rsquo;s.
            The postcranial revolution — the transition from a compact, arboreal-terrestrial
            compromise body to an elongated, open-country, thermoregulatory design — was largely
            complete by 1.5 million years ago. What followed, in the subsequent 1.5 million years,
            was primarily a cranial story: brain expansion, facial reduction, the development of
            a chin, the reshaping of the vocal tract. The body had already arrived at a design
            that would prove durable enough to carry our lineage across continents, through ice
            ages, and into the Holocene.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.bodyProportionSilhouettes}
              alt="Body proportion comparison from Australopithecus through modern Homo sapiens"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              Body plan evolution across the hominin lineage. The postcranial shift from Lucy to
              Turkana Boy is more dramatic than the shift from Turkana Boy to modern humans.
            </figcaption>
          </figure>

          <p>
            The claim is narrow but powerful: the ecological logic of the modern human body is
            already present in KNM-WT 15000. Not the full cognitive suite, not the symbolic
            capacity, not the language, not the social complexity — but the physical chassis.
            The legs that carry a modern marathon runner over 42 kilometers in two hours are
            operating the same biomechanical system that carried <em>Homo ergaster</em> across
            the savannas of the Turkana Basin. The thermoregulatory design that allows a human
            being to run in equatorial heat without fatal hyperthermia — the combination of
            eccrine sweating, low body hair, and high surface-area-to-mass ratio — was functional
            by 1.5 million years ago. We are running on inherited hardware.
          </p>
          <p>
            The cross-references complete the picture. Lucy, at 3.18 million years ago, represents
            the ancestral condition: a committed biped, yes, but one still tethered to arboreal
            refuges, still carrying a compact body adapted to heat retention in a mosaic
            environment, still limited in ranging capacity by short legs and a high cost of
            transport. <em>Homo naledi</em>, at roughly 300,000 years ago, represents a cautionary
            footnote: a species with a tiny brain that may have engaged in complex behavior,
            reminding us that the relationship between anatomy and capability is never as simple
            as a progress chart implies. And Turkana Boy, at 1.53 million years ago, represents
            the pivot — the moment when the hominin body reached a configuration so effective that
            natural selection would largely conserve it, with only minor refinements, for the next
            1.5 million years and counting. Your body is his body, modified but not revolutionized.
            The draft he carried is the draft you inhabit.
          </p>

          <figure className="turkana-v2-figure">
            <img
              src={IMAGES.nalediSkeleton}
              alt="Homo naledi skeletal specimens from the Rising Star cave system"
              loading="lazy"
              className="turkana-v2-image"
            />
            <figcaption>
              <em>Homo naledi</em> skeletal specimens (~236–335 ka). With an endocranial volume
              of just 465–560 cc, this species complicates any simple equation between brain size
              and behavioral complexity.
            </figcaption>
          </figure>

          <p>
            The dashboard below assembles the comparative data that has accumulated across the
            preceding sections — stature, mass, endocranial volume, crural index, femur length,
            humero-femoral index — for every species referenced in this essay. It is not a
            progress chart. It is a data table, and the honest reader will notice that progress
            is not what it shows. It shows variation, convergence, and the occasional surprise.
            It shows that the Dmanisi hominins reached Georgia with brains smaller than Turkana
            Boy&rsquo;s. It shows that <em>Homo heidelbergensis</em> was heavier but not
            necessarily taller. It shows that the crural index — a measure of heat adaptation —
            peaked in KNM-WT 15000 and has not been exceeded since. The body we inherited is not
            the product of steady improvement. It is the product of ecological logic, applied once,
            decisively, at the boundary between the Pliocene world and the Pleistocene.
          </p>

          {/* D12: Comparative Dashboard */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Comparative Dashboard: Hominin Body Plan Data</h3>
              <span className="turkana-v2-viz-source">
                Data compiled from Walker &amp; Leakey 1993; Ruff &amp; Walker 1993; Lordkipanidze
                et al. 2007; Antón 2003; Holloway et al. 2004; Berger et al. 2015
              </span>
            </div>
            <div className="turkana-v2-dashboard">
              <div style={{ overflowX: 'auto' }}>
                <table className="turkana-v2-dashboard-table">
                  <thead>
                    <tr>
                      <th>Species</th>
                      <th>Stature (cm)</th>
                      <th>Mass (kg)</th>
                      <th>ECV (cc)</th>
                      <th>Crural Index</th>
                      <th>Femur (cm)</th>
                      <th>HF Index</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.map((row, i) => (
                      <tr
                        key={i}
                        className={row.species === 'KNM-WT 15000' ? 'turkana-v2-highlight-row' : ''}
                      >
                        <td><strong>{row.species}</strong></td>
                        <td>{row.stature}</td>
                        <td>{row.mass}</td>
                        <td>{row.ecv}</td>
                        <td>{row.cruralIndex ?? '—'}</td>
                        <td>{row.femurLength ? (row.femurLength / 10).toFixed(1) : '—'}</td>
                        <td>{row.humFemIndex ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* D13: Cluster Context Radar */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Cluster Context: Lucy — Turkana Boy — <em>Homo naledi</em></h3>
              <span className="turkana-v2-viz-source">
                Relative scoring (0–10) across five comparative axes
              </span>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={clusterContextData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke={COLORS.basinEarth + '55'} />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: COLORS.boneIvory, fontSize: 11 }}
                />
                <PolarRadiusAxis
                  domain={[0, 10]}
                  tick={{ fill: COLORS.sedimentSand, fontSize: 10 }}
                  axisLine={false}
                />
                <Radar
                  name="Lucy (A. afarensis)"
                  dataKey="lucy"
                  stroke={COLORS.sedimentSand}
                  fill={COLORS.sedimentSand}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Radar
                  name="Turkana Boy (H. ergaster)"
                  dataKey="turkanaBoy"
                  stroke={COLORS.heatOchre}
                  fill={COLORS.heatOchre}
                  fillOpacity={0.2}
                  strokeWidth={2.5}
                />
                <Radar
                  name="Homo naledi"
                  dataKey="naledi"
                  stroke={COLORS.turkanaBlue}
                  fill={COLORS.turkanaBlue}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Legend
                  wrapperStyle={{ color: COLORS.boneIvory, fontSize: 11, paddingTop: 12 }}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* D14: 3D Specimen Cabinet */}
          <div className="turkana-v2-viz-container">
            <div className="turkana-v2-viz-label">
              <h3>Homo erectus Specimen Cabinet</h3>
              <span className="turkana-v2-viz-source">
                3D scans &middot; African Fossils / National Museums of Kenya, CC BY-NC-SA
              </span>
            </div>
            <SpecimenCabinet
              specimens={SPECIMEN_CABINET}
              fallbackImage={IMAGES.craniumLateral}
              fallbackAlt="KNM-WT 15000 cranium, lateral view"
            />
          </div>

          <p>
            There is a temptation, at the end of an essay like this, to reach for triumph.
            To declare Turkana Boy the ancestor, the prototype, the blueprint. But the evidence
            does not support triumphalism any more than it supports a simple progress narrative.
            KNM-WT 15000 was not your ancestor — not in any direct genealogical sense. He was a
            child who died of infection on the shore of a Pleistocene lake, and his lineage
            may well have ended without descendants. What he was, demonstrably and without
            interpretive overreach, is a member of the species that first assembled the body plan
            you currently inhabit. Not the mind, not the culture, not the language — the body.
            The long legs, the narrow waist, the heat-shedding surface, the stride that can
            cross a continent in generations. That architecture was his, and it is yours, and the
            connection between those two facts is not metaphorical. It is skeletal, measurable,
            and written in the proportions of bone.
          </p>
          <p>
            He was eight years old, or eleven, depending on which clock you read. He stood 160
            centimeters tall. He had an infected jaw. He walked a landscape of open savanna and
            seasonal rivers under an equatorial sun, in a body built to dissipate heat across
            every square centimeter of its linear, long-limbed surface. His species made handaxes,
            though we cannot place one in his hand. His species may or may not have had language,
            and the skeleton cannot resolve the question. What the skeleton can tell us — what
            108 bones recovered across five field seasons from a hillside near the Nariokotome
            River do tell us, with the weight of measurement behind every claim — is that the
            human body, in its essential ecological design, was already here. Already walking.
            Already adapted. Already, in the deepest biomechanical sense, us.
          </p>

          <blockquote className="turkana-v2-quote">
            <p>
              &ldquo;The shift in body proportions from <em>Australopithecus</em> to early
              <em> Homo</em> is the single most dramatic morphological transition in the
              hominin postcranial record. By the time of KNM-WT 15000, the essential
              architecture of the modern human body was in place — not the brain, not the
              face, but the body. The legs, the pelvis, the thermoregulatory design. We are
              still walking on that blueprint.&rdquo;
            </p>
            <cite>— Synthesis from Walker &amp; Leakey 1993; Ruff 2010; Pontzer 2012;
            Holliday 2012</cite>
          </blockquote>
        </div>
      </section>

      {/* ── Sources ── */}
      <section className="turkana-v2-section turkana-v2-sources" id="sources">
        <h2>Sources</h2>
        <ol className="turkana-v2-sources-list">
          {SOURCES.map(source => (
            <li key={source.id}>{source.text}</li>
          ))}
        </ol>
      </section>

      {/* ── Image Credits ── */}
      <section className="turkana-v2-section turkana-v2-credits" id="credits">
        <h2>Image Credits</h2>
        <ul className="turkana-v2-credits-list">
          {IMAGE_CREDITS.map((credit, i) => (
            <li key={i}>
              <strong>{credit.subject}</strong> — {credit.attribution}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Related Infographics ── */}
      <section className="turkana-v2-section turkana-v2-sources" id="related-infographics">
        <h2>Related Infographics</h2>
        <ul className="turkana-v2-sources-list" style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <Link href="/infographics/seven-million-years-homo">
              How Our Brains Grew Over 7 Million Years
            </Link>
            {' \u2014 '}
            Cranial capacity comparison across 8 hominid species, from{' '}
            <em>Sahelanthropus</em> (350 cc) to <em>Homo sapiens</em> (1,350 cc).
          </li>
        </ul>
      </section>

      {/* ── Cluster Navigation ── */}
      <nav className="turkana-v2-cluster-nav">
        <h3>Explore the Cluster</h3>
        <div className="turkana-v2-cluster-links">
          <Link href="/essays/science/lucy" className="turkana-v2-cluster-link">
            <span className="turkana-v2-cluster-label">Previous</span>
            <span className="turkana-v2-cluster-title">Lucy: Before the Genus Homo</span>
          </Link>
          <Link href="/essays/science/seven-million-years" className="turkana-v2-cluster-link">
            <span className="turkana-v2-cluster-label">Parent</span>
            <span className="turkana-v2-cluster-title">Seven Million Years</span>
          </Link>
          <Link href="/essays/science/homo-naledi" className="turkana-v2-cluster-link">
            <span className="turkana-v2-cluster-label">Next</span>
            <span className="turkana-v2-cluster-title">Homo naledi: The Small-Brained Species</span>
          </Link>
        </div>
      </nav>

    </article>
  );
}
