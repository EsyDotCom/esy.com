'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ScatterChart, Scatter, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { IMAGES, IMAGE_CREDITS, SOURCES } from './images';

/* ────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS
   ──────────────────────────────────────────────────────────────────────────── */

const COLORS = {
  ochreRed: '#C4572A',
  yellowOchre: '#C89B3C',
  savannaGold: '#B89E5A',
  glacialBlue: '#6B8FA4',
  riftSienna: '#8B5E3C',
  emberGlow: '#D4743B',
  boneIvory: '#E8DCC8',
  flintGrey: '#8A8477',
  stratumDark: '#1A1610',
  stratumMid: '#2C2519',
  ashCharcoal: '#3D3832',
};

/* ────────────────────────────────────────────────────────────────────────────
   CHART DATA
   ──────────────────────────────────────────────────────────────────────────── */

const brainVolumeData = [
  { species: 'S. tchadensis', mya: 7, cc: 350 },
  { species: 'A. ramidus', mya: 4.4, cc: 325 },
  { species: 'A. afarensis', mya: 3.4, cc: 438 },
  { species: 'A. africanus', mya: 2.5, cc: 450 },
  { species: 'P. boisei', mya: 1.75, cc: 510 },
  { species: 'H. habilis', mya: 1.9, cc: 600 },
  { species: 'H. rudolfensis', mya: 1.75, cc: 752 },
  { species: 'H. erectus (early)', mya: 1.5, cc: 850 },
  { species: 'H. erectus (late)', mya: 0.5, cc: 1050 },
  { species: 'H. heidelbergensis', mya: 0.5, cc: 1250 },
  { species: 'H. naledi', mya: 0.28, cc: 513 },
  { species: 'H. floresiensis', mya: 0.08, cc: 380 },
  { species: 'H. neanderthalensis', mya: 0.1, cc: 1450 },
  { species: 'H. sapiens', mya: 0.1, cc: 1350 },
];

const BRAIN_SCATTER_COLORS = [
  COLORS.riftSienna,
  COLORS.riftSienna,
  COLORS.savannaGold,
  COLORS.savannaGold,
  COLORS.yellowOchre,
  COLORS.emberGlow,
  COLORS.emberGlow,
  COLORS.ochreRed,
  COLORS.ochreRed,
  COLORS.glacialBlue,
  COLORS.glacialBlue,
  COLORS.flintGrey,
  COLORS.glacialBlue,
  COLORS.ochreRed,
];

const bodySizeData = [
  { species: 'A. afarensis', height: 128, mass: 37 },
  { species: 'H. habilis', height: 118, mass: 35 },
  { species: 'H. erectus', height: 170, mass: 54 },
  { species: 'H. heidelbergensis', height: 170, mass: 70 },
  { species: 'H. neanderthalensis', height: 163, mass: 73 },
  { species: 'H. floresiensis', height: 106, mass: 25 },
  { species: 'H. naledi', height: 146, mass: 48 },
  { species: 'H. sapiens', height: 170, mass: 65 },
];

const radarAxes = [
  'Brain Size',
  'Body Mass',
  'Tool Complexity',
  'Group Size',
  'Trade Networks',
  'Symbolic Behavior',
  'Diet Breadth',
  'Population Size',
];

const neanderthalScores = [90, 95, 60, 30, 20, 35, 55, 15];
const sapiensScores = [80, 70, 90, 85, 95, 95, 90, 80];

const radarData = radarAxes.map((axis, i) => ({
  axis,
  neanderthal: neanderthalScores[i],
  sapiens: sapiensScores[i],
}));

/* ────────────────────────────────────────────────────────────────────────────
   CUSTOM TOOLTIPS
   ──────────────────────────────────────────────────────────────────────────── */

const tooltipStyle: React.CSSProperties = {
  backgroundColor: COLORS.stratumMid,
  border: `1px solid ${COLORS.flintGrey}`,
  borderRadius: 4,
  padding: '10px 14px',
  fontFamily: 'Inter, Helvetica Neue, sans-serif',
  fontSize: 13,
  color: COLORS.boneIvory,
  lineHeight: 1.5,
};

/**
 * @diagram-contract
 * @diagram D1-brain-volume-scatter
 * @domain paleoanthropology
 *
 * @invariant X_AXIS_DIRECTION right-to-left
 *   x_values: MYA (millions of years ago), reversed so 7 MYA is left, 0 is right
 *   validation: older species appear left, younger species appear right
 *
 * @invariant Y_AXIS_SCALE linear
 *   y_values: cranial capacity in cubic centimeters (cc)
 *   range: 300-1500 cc
 *   validation: larger brains plot higher on the y-axis
 *
 * @invariant DATA_ACCURACY
 *   each point sourced from CITATIONS.md (Holloway et al. 2004, Rightmire 2004)
 *   validation: species cc values match DATASETS.md Dataset 2
 */
function BrainTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof brainVolumeData[number] }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <div style={{ fontStyle: 'italic', marginBottom: 4 }}>{d.species}</div>
      <div>{d.mya} million years ago</div>
      <div>{d.cc} cc cranial capacity</div>
    </div>
  );
}

/**
 * @diagram-contract
 * @diagram D2-body-size-comparison
 * @domain paleoanthropology
 *
 * @invariant DUAL_BAR_ENCODING
 *   bar1: height in centimeters (savanna-gold)
 *   bar2: mass in kilograms (rift-sienna)
 *   validation: taller species have larger height bars, heavier species have larger mass bars
 *
 * @invariant DATA_ACCURACY
 *   values sourced from DATASETS.md Dataset 3 (McHenry 1992, Antón et al. 2014)
 *   validation: H. floresiensis is smallest, H. heidelbergensis and H. neanderthalensis are heaviest
 */
function BodyTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ fontStyle: 'italic', marginBottom: 4 }}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.dataKey}>
          {entry.dataKey === 'height' ? 'Height' : 'Mass'}: {entry.value}
          {entry.dataKey === 'height' ? ' cm' : ' kg'}
        </div>
      ))}
    </div>
  );
}

/**
 * @diagram-contract
 * @diagram D3-species-comparison-radar
 * @domain paleoanthropology
 *
 * @invariant AXIS_SEMANTICS
 *   8 axes: Brain Size, Body Mass, Tool Complexity, Group Size, Trade Networks, Symbolic Behavior, Diet Breadth, Population Size
 *   values: normalized 0-100 scale for comparison
 *   validation: each axis represents a relative measure, not an absolute value
 *
 * @invariant SPECIES_ENCODING
 *   neanderthal: glacial-blue (#6B8FA4) — cold-adapted European species
 *   sapiens: ochre-red (#C4572A) — African-origin species
 *   validation: Neanderthals score higher on Brain Size and Body Mass; Sapiens score higher on Group Size, Trade Networks, and Population Size
 */
function RadarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ marginBottom: 4 }}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.name} style={{ color: entry.name === 'neanderthal' ? COLORS.glacialBlue : COLORS.ochreRed }}>
          {entry.name === 'neanderthal' ? 'Neanderthal' : 'Sapiens'}: {entry.value}
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   useInView HOOK
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

/* ────────────────────────────────────────────────────────────────────────────
   SMALL COMPONENTS
   ──────────────────────────────────────────────────────────────────────────── */

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="smy-progress">
      <div className="smy-progress__fill" style={{ height: `${progress}%` }} />
    </div>
  );
}

function StratumDivider() {
  return (
    <div className="smy-divider">
      <div className="smy-divider__line" />
    </div>
  );
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={`smy-section ${isVisible ? 'smy-section--visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function EraBadge({ text }: { text: string }) {
  return (
    <div className="smy-narrative__era-badge">
      <span className="smy-narrative__era-dot" />
      {text}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────────────────────────── */

export default function SevenMillionYearsClient() {
  return (
    <article className="smy-essay">
      <ProgressBar />

      {/* ── HERO ── */}
      <header className="smy-hero">
        <div className="smy-hero__number">7,000,000</div>
        <h1 className="smy-hero__title">Seven Million Years</h1>
        <p className="smy-hero__subtitle">
          That is how long this story has been running. At least twenty-one
          species of human have walked the Earth. We are the only one left.
        </p>
        <div className="smy-hero__scroll-cue">
          <span>Scroll to begin</span>
        </div>
      </header>

      <StratumDivider />

      {/* ── SECTION 1: The Deep Divergence ── */}
      <Section>
        <div className="smy-narrative">
          <EraBadge text="7&ndash;4.4 million years ago &mdash; The Miocene" />
          <h2 className="smy-narrative__heading">The Deep Divergence</h2>

          <p>
            Somewhere between seven and six million years ago, in the forests of
            central or eastern Africa, a population of great apes split. One
            lineage would produce chimpanzees and bonobos. The other would
            produce us. We do not know what that common ancestor looked like, how
            it moved, or what it ate. We do not even know, with certainty, where
            it lived. What we have instead are fragments&mdash;a scattering of
            teeth, a partial cranium, a handful of limb bones&mdash;pulled from
            sediments in Chad, Kenya, and Ethiopia that collectively represent
            the deepest roots of the hominin family tree.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.toumai}
              alt="The Touma&iuml; cranium (TM 266-01-060-1), Sahelanthropus tchadensis, discovered in Chad in 2001"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              The Touma&iuml; cranium (<em>Sahelanthropus tchadensis</em>), dated
              to approximately 6&ndash;7 million years ago. Discovered in the
              Djurab Desert of Chad by Michel Brunet&rsquo;s team in 2001.
            </div>
          </div>

          <p>
            The oldest candidate is{' '}
            <em className="smy-narrative__species-name">Sahelanthropus tchadensis</em>,
            known from a single crushed cranium called Touma&iuml;&mdash;&ldquo;hope
            of life&rdquo; in the Goran language&mdash;unearthed in 2001 from
            the Djurab Desert of Chad, 2,500 kilometres west of the East African
            Rift Valley where most paleoanthropologists had expected to find our
            earliest ancestors. Its foramen magnum, the hole where the spinal
            cord exits the skull, sits beneath the cranium rather than behind
            it&mdash;a signature of upright posture. Its brain was roughly 350
            cubic centimetres, comparable to a modern chimpanzee. The combination
            is disorienting: bipedalism, it seems, arrived long before the
            expansion of the brain.
          </p>

          <p>
            From the Tugen Hills of Kenya came{' '}
            <em className="smy-narrative__species-name">Orrorin tugenensis</em>,
            dated to roughly six million years ago. Only thirteen fragments
            survive: pieces of femur, jaw, and finger bones. But the femoral
            neck shows a cortical bone distribution consistent with habitual
            bipedalism, and the finger bones curve in a way that suggests
            tree-climbing had not been abandoned. These creatures lived in a
            mosaic of forest and open woodland, apparently comfortable in both
            worlds.
          </p>

          <p>
            Then, in the Middle Awash of Ethiopia, Tim White and his colleagues
            recovered <em className="smy-narrative__species-name">Ardipithecus ramidus</em>,
            a 4.4-million-year-old female nicknamed Ardi. Published in 2009
            after fifteen years of painstaking reconstruction, Ardi rewrote
            expectations. She had an opposable big toe for grasping branches, yet
            the shape of her pelvis indicated she walked upright on the ground.
            She was not a knuckle-walker. She was not a creature of the
            savanna. She lived in closed woodland, eating fruits, nuts, and
            leaves. The old narrative&mdash;that bipedalism evolved on the
            grasslands, as a response to a drying climate&mdash;could no longer
            hold.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.ardi}
              alt="Skeleton cast of Ardipithecus ramidus, a 4.4-million-year-old hominin from Ethiopia"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              <em>Ardipithecus ramidus</em> skeleton cast. The 4.4-million-year-old
              female nicknamed Ardi, recovered from the Middle Awash of Ethiopia.
            </div>
          </div>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 2: The Australopith Explosion ── */}
      <Section>
        <div className="smy-narrative">
          <EraBadge text="4.4&ndash;2 million years ago &mdash; The Pliocene" />
          <h2 className="smy-narrative__heading">The Australopith Explosion</h2>

          <p>
            By four million years ago the hominin lineage had diversified into a
            radiation of upright-walking primates collectively known as
            australopiths. They were small&mdash;most stood between 1.0 and 1.5
            metres tall&mdash;and their brains remained modest, hovering around
            400 to 500 cubic centimetres. But they had committed to a life on two
            legs, and that commitment would open every ecological niche that
            followed.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.lucy}
              alt="Lucy (AL 288-1), a partial skeleton of Australopithecus afarensis"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              Lucy (AL 288-1), <em>Australopithecus afarensis</em>.
              Discovered at Hadar, Ethiopia, by Donald Johanson in 1974.
              Approximately 3.2 million years old.
            </div>
          </div>

          <p>
            The most celebrated of them is <Link href="/essays/science/lucy" className="smy-narrative__link">Lucy</Link>&mdash;AL 288-1&mdash;a
            3.2-million-year-old partial skeleton of{' '}
            <em className="smy-narrative__species-name">Australopithecus afarensis</em>{' '}
            found at Hadar, Ethiopia, in 1974 by Donald Johanson and Tom Gray.
            Forty percent of her skeleton survived, an extraordinary proportion
            for a hominin fossil. Her pelvis was broad and bowl-shaped, her knee
            angled inward, her gait unmistakably bipedal. The team named her
            after &ldquo;Lucy in the Sky with Diamonds,&rdquo; which was playing
            at their camp that night. In Amharic she is called Dinkinesh:
            &ldquo;you are marvellous.&rdquo;
          </p>

          <p>
            A year after Lucy&rsquo;s discovery, Mary Leakey&rsquo;s team found
            something equally stunning 1,500 kilometres to the south: a trail of
            hominin footprints preserved in volcanic ash at Laetoli, Tanzania,
            dated to 3.66 million years ago. Two individuals&mdash;and possibly a
            third&mdash;had walked side by side across a fresh fall of tuff from
            the Sadiman volcano.             Their prints show a heel strike, a longitudinal
            arch, and a forward push-off from the big toe. They walked as we
            walk, more than three million years before the genus <em>Homo</em>{' '}
            would appear.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.laetoli}
              alt="Replica of the Laetoli hominin footprints, preserved in volcanic ash 3.66 million years ago in Tanzania"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              Replica of the Laetoli footprints, 3.66 million years old. Two
              hominins walked side by side across fresh volcanic ash at Laetoli,
              Tanzania.
            </div>
          </div>

          <p>
            Not all australopiths remained gracile. By 2.7 million years ago a
            robust lineage had emerged&mdash;the genus <em>Paranthropus</em>&mdash;characterized
            by massive jaws, enormous molars, and a sagittal crest anchoring
            powerful chewing muscles.{' '}
            <em className="smy-narrative__species-name">Paranthropus boisei</em>,
            nicknamed &ldquo;Nutcracker Man&rdquo; when Mary Leakey found the
            type specimen at Olduvai Gorge in 1959, had a face built for
            mechanical force. Isotope analysis reveals a diet dominated by C4
            plants&mdash;grasses and sedges&mdash;rather than the hard nuts its
            morphology seemed designed to crack. <em>Paranthropus</em> would
            persist for over a million years, coexisting with early <em>Homo</em>,
            before vanishing without descendants around 1.2 million years ago.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.paranthropusBoisei}
              alt="Skull of Paranthropus boisei, showing massive jaw and sagittal crest"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              <em>Paranthropus boisei</em> skull, the &ldquo;Nutcracker Man.&rdquo;
              Note the sagittal crest and massive zygomatic arches for anchoring
              powerful chewing muscles.
            </div>
          </div>
        </div>

        {/* Brain Volume Chart */}
        <div className="smy-chart">
          <div className="smy-chart__title">Cranial Capacity Across the Hominin Lineage</div>
          <div className="smy-chart__subtitle">
            Brain volume in cubic centimetres, plotted against time (millions of years ago)
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <XAxis
                dataKey="mya"
                type="number"
                domain={[0, 7.5]}
                reversed
                name="MYA"
                tick={{ fill: COLORS.flintGrey, fontFamily: 'Inter', fontSize: 12 }}
                axisLine={{ stroke: COLORS.flintGrey, strokeOpacity: 0.3 }}
                tickLine={{ stroke: COLORS.flintGrey, strokeOpacity: 0.3 }}
                label={{
                  value: 'Millions of years ago',
                  position: 'insideBottom',
                  offset: -10,
                  fill: COLORS.flintGrey,
                  fontFamily: 'Inter',
                  fontSize: 12,
                }}
              />
              <YAxis
                dataKey="cc"
                type="number"
                domain={[200, 1600]}
                name="cc"
                tick={{ fill: COLORS.flintGrey, fontFamily: 'Inter', fontSize: 12 }}
                axisLine={{ stroke: COLORS.flintGrey, strokeOpacity: 0.3 }}
                tickLine={{ stroke: COLORS.flintGrey, strokeOpacity: 0.3 }}
                label={{
                  value: 'Cranial capacity (cc)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                  fill: COLORS.flintGrey,
                  fontFamily: 'Inter',
                  fontSize: 12,
                }}
              />
              <Tooltip content={<BrainTooltip />} />
              <Scatter data={brainVolumeData} fill={COLORS.ochreRed}>
                {brainVolumeData.map((_, i) => (
                  <Cell key={i} fill={BRAIN_SCATTER_COLORS[i]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="smy-chart__source">
            Sources: Holloway et al. 2004, &ldquo;The Human Fossil Record: Brain Endocasts&rdquo;; Herries et al. 2020
          </div>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 3: The First Humans ── */}
      <Section>
        <div className="smy-narrative">
          <EraBadge text="2.8&ndash;1 million years ago &mdash; The Early Pleistocene" />
          <h2 className="smy-narrative__heading">The First Humans</h2>

          <p>
            The boundary between australopiths and the genus <em>Homo</em> is one
            of the most contested lines in paleoanthropology. A fragmentary
            mandible from Ledi-Geraru, Ethiopia, dated to 2.8 million years ago,
            represents the oldest known specimen assigned to our genus. Its teeth
            are smaller and more symmetrical than those of any australopith, yet
            its jaw still retains primitive proportions. The transition was not a
            sudden event but a long, messy gradient played out across eastern and
            southern Africa.
          </p>

          <p>
            <em className="smy-narrative__species-name">Homo habilis</em>&mdash;&ldquo;handy
            man&rdquo;&mdash;appeared around 2.4 million years ago and is associated
            with the Oldowan stone tool industry: simple cobbles struck to
            produce sharp flakes. Louis Leakey named the species in 1964,
            convinced that toolmaking was the defining trait of humanity. With a
            brain averaging 600 cubic centimetres, <em>H. habilis</em> occupied
            a cognitive no-man&rsquo;s-land between the australopiths and the
            larger-brained hominins that followed. Some researchers argue it is
            not <em>Homo</em> at all but rather a late australopith with a
            misleading label.
          </p>

          <p>
            There is no such ambiguity about{' '}
            <em className="smy-narrative__species-name">Homo erectus</em>. Appearing
            in Africa by 1.9 million years ago, <em>H. erectus</em> was a
            genuine departure: tall, long-legged, narrow-hipped, with a brain
            ranging from 600 to over 1,000 cubic centimetres across its
            1.5-million-year tenure as a species. The skeleton known as{' '}
            <Link href="/essays/science/turkana-boy" className="smy-narrative__link">Turkana
            Boy</Link> (KNM-WT 15000), discovered by Kamoya Kimeu at Nariokotome,
            Kenya, in 1984, died at roughly eight to eleven years of age and
            already stood 1.6 metres. Had he reached adulthood, he might have
            exceeded 1.85 metres. His body proportions are essentially
            modern&mdash;built for endurance walking and running in open,
            tropical landscapes.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.turkanaboy}
              alt="Turkana Boy (KNM-WT 15000), the most complete Homo erectus skeleton ever found"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              Turkana Boy (KNM-WT 15000), <em>Homo erectus</em>. Discovered at
              Nariokotome, Kenya, in 1984. Died at roughly 8&ndash;11 years of
              age, yet already stood 1.6 metres tall.
            </div>
          </div>

          <p>
            And then <em>H. erectus</em> did what no hominin had done before: it
            left Africa. By 1.8 million years ago, a population had reached
            Dmanisi in the Republic of Georgia, where five remarkably complete
            skulls have been recovered from beneath the ruins of a medieval
            fortress. The Dmanisi hominins were small-brained (546&ndash;730 cc)
            and short, yet they had crossed thousands of kilometres of varied
            terrain. They carried Oldowan tools, not the more sophisticated
            Acheulean hand axes that would appear later. The implication is
            stark: you did not need a large brain or advanced technology to
            colonise a continent. You needed legs and persistence.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.dmanisiSkull}
              alt="Dmanisi skull, approximately 1.8 million years old, one of the earliest hominin specimens found outside Africa"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              Dmanisi skull, Republic of Georgia, approximately 1.8 million
              years old. One of five remarkably complete skulls recovered from
              beneath a medieval fortress.
            </div>
          </div>
        </div>

        <div className="smy-data">
          <div className="smy-data__header">
            <div className="smy-data__title">Milestones of Early <em>Homo</em></div>
          </div>
          <div className="smy-data__grid">
            <div className="smy-data__card">
              <div className="smy-data__value">1.9 MYA</div>
              <div className="smy-data__label"><em>Homo erectus</em> appears in East Africa</div>
            </div>
            <div className="smy-data__card">
              <div className="smy-data__value">1.8 MYA</div>
              <div className="smy-data__label">First hominin outside Africa (Dmanisi, Georgia)</div>
            </div>
            <div className="smy-data__card">
              <div className="smy-data__value">1.76 MYA</div>
              <div className="smy-data__label">Acheulean hand axes invented</div>
            </div>
            <div className="smy-data__card">
              <div className="smy-data__value">1.0 MYA</div>
              <div className="smy-data__label">Controlled use of fire</div>
            </div>
          </div>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 4: Out of Africa — Quote Monument ── */}
      <Section>
        <div className="smy-quote">
          <p className="smy-quote__text">
            &ldquo;The question is not why the Neanderthals went extinct. The
            question is how they managed to survive for 300,000 years.&rdquo;
          </p>
          <div className="smy-quote__attribution">
            <span>&mdash;</span> Clive Finlayson, <em>The Humans Who Went Extinct</em>, 2009
          </div>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 5: The Great Diversification ── */}
      <Section>
        <div className="smy-narrative">
          <EraBadge text="800&ndash;130 thousand years ago &mdash; The Middle Pleistocene" />
          <h2 className="smy-narrative__heading">The Great Diversification</h2>

          <p>
            By 800,000 years ago, <em>Homo</em> populations were scattered
            across Africa, Europe, and much of Asia&mdash;and they were diverging.
            The Middle Pleistocene is the most tangled chapter of hominin
            evolution, a period when at least five distinct lineages occupied
            overlapping ranges and the fossil record offers just enough evidence
            to provoke argument but not enough to settle it. At the centre of
            this radiation stands{' '}
            <em className="smy-narrative__species-name">Homo heidelbergensis</em>,
            a species defined by the Mauer mandible found near Heidelberg,
            Germany, in 1907. With brains ranging from 1,100 to 1,400 cubic
            centimetres and robust builds adapted to cold climates, these
            hominins hunted large game cooperatively, built shelters, and
            controlled fire with increasing sophistication.
          </p>

          <p>
            At the site of Sch&ouml;ningen in northern Germany, archaeologists
            recovered eight wooden spears dated to approximately 300,000 years
            ago&mdash;the oldest known throwing weapons. Each was carved from a
            single spruce trunk, with the centre of gravity placed one-third of
            the way from the tip, exactly as in modern javelins. These were not
            opportunistic stakes. They were engineered projectiles, products of
            foresight and accumulated technical knowledge. Their makers killed
            horses at a lakeside ambush and butchered them on the spot. The site
            preserves no symbolic artefacts, no ochre, no beads&mdash;but the
            planning depth is unmistakable.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.handAxe}
              alt="Acheulean biface hand axe from Saint-Acheul, France — the defining tool of Homo erectus and its descendants"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              Acheulean hand axe from Saint-Acheul, France. This symmetrical
              biface technology persisted for over a million years&mdash;the
              longest-lasting tool tradition in human history.
            </div>
          </div>

          <p>
            Fire transformed everything. Evidence from Wonderwerk Cave in South
            Africa pushes controlled combustion back to at least one million
            years ago, but by the Middle Pleistocene fire use was habitual and
            widespread. Cooking softened food, unlocking more calories from the
            same intake and reducing the metabolic cost of digestion. Richard
            Wrangham&rsquo;s &ldquo;cooking hypothesis&rdquo; argues that this
            caloric surplus was the primary driver of brain expansion in{' '}
            <em>Homo</em>&mdash;not toolmaking, not sociality, but fire and the
            kitchen it created. The archaeological record does not yet confirm
            every link in that chain, but the correlation between habitual fire
            use and accelerating encephalization is difficult to dismiss.
          </p>

          <p>
            By the end of this period, multiple hominin species occupied the Old
            World simultaneously. In Africa, archaic populations that would
            eventually give rise to <em>Homo sapiens</em> were evolving a suite
            of modern skeletal features. In Europe, cold-adapted populations were
            becoming Neanderthals. In eastern Asia, the mysterious Denisovans
            were leaving their genetic signature in mountain caves. On the island
            of Flores, a diminutive hominin with a 380-cc brain was crafting
            stone tools and hunting pygmy elephants. The tree of human evolution
            was not a ladder. It was a bramble.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.homoNalediDH1}
              alt="Holotype cranium of Homo naledi (DH1) from the Rising Star Cave system, South Africa"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              <em>Homo naledi</em> holotype cranium (DH1), from the Dinaledi
              Chamber of the Rising Star cave system, South Africa. With a brain
              of just 513 cc, this species coexisted with <em>Homo sapiens</em>.
            </div>
          </div>
        </div>

        {/* Body Size Comparison Chart */}
        <div className="smy-chart">
          <div className="smy-chart__title">Body Size Across the Genus</div>
          <div className="smy-chart__subtitle">
            Estimated height (cm) and body mass (kg) for selected hominin species
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={bodySizeData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <XAxis
                dataKey="species"
                tick={{ fill: COLORS.flintGrey, fontFamily: 'Inter', fontSize: 11 }}
                axisLine={{ stroke: COLORS.flintGrey, strokeOpacity: 0.3 }}
                tickLine={false}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fill: COLORS.flintGrey, fontFamily: 'Inter', fontSize: 12 }}
                axisLine={{ stroke: COLORS.flintGrey, strokeOpacity: 0.3 }}
                tickLine={{ stroke: COLORS.flintGrey, strokeOpacity: 0.3 }}
              />
              <Tooltip content={<BodyTooltip />} />
              <Legend
                wrapperStyle={{ fontFamily: 'Inter', fontSize: 12, color: COLORS.flintGrey }}
              />
              <Bar dataKey="height" name="Height (cm)" fill={COLORS.savannaGold} radius={[2, 2, 0, 0]} />
              <Bar dataKey="mass" name="Mass (kg)" fill={COLORS.riftSienna} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="smy-chart__source">
            Sources: Grabowski et al. 2015; Will &amp; Stock 2015; Pontzer et al. 2012
          </div>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 6: Our Closest Kin ── */}
      <Section>
        <div className="smy-narrative">
          <EraBadge text="400&ndash;40 thousand years ago" />
          <h2 className="smy-narrative__heading">Our Closest Kin</h2>
          <h3 className="smy-narrative__subheading">The Neanderthals</h3>

          <p>
            No extinct hominin has been as thoroughly studied&mdash;or as
            persistently caricatured&mdash;as{' '}
            <em className="smy-narrative__species-name">Homo neanderthalensis</em>.
            For a century after their recognition in the 1860s, Neanderthals were
            depicted as slouching, dim-witted brutes: the evolutionary dead end
            that <em>Homo sapiens</em> had rightly replaced. That image was wrong
            in virtually every particular. Neanderthals had brains averaging
            1,450 cubic centimetres&mdash;larger than our own. They were
            powerfully built, barrel-chested, with bones so thick their
            cross-sections resemble those of Olympic             weight-lifters. They endured
            Ice Age Europe for more than 300,000 years, tracking mammoths and
            woolly rhinoceroses through boreal forests and tundra in conditions
            that would kill an unequipped modern human in hours.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.neanderthal}
              alt="Homo neanderthalensis cranium showing the distinctive long, low braincase and prominent brow ridge"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              <em>Homo neanderthalensis</em> cranium. The long, low braincase
              housed an average of 1,450 cc of brain&mdash;larger than that of
              modern <em>Homo sapiens</em>.
            </div>
          </div>

          <p>
            Their technology was sophisticated. The Levallois technique&mdash;a
            prepared-core method of flint-knapping that requires the knapper to
            hold a three-dimensional mental template of the desired flake
            before striking&mdash;dominated Neanderthal assemblages across Europe
            and western Asia. They hafted stone points onto wooden shafts using
            birch-bark pitch, a thermoplastic adhesive whose manufacture demands
            precise temperature control (340&ndash;400 &deg;C) in an
            oxygen-reduced environment. Experimental archaeologists have
            struggled to replicate the process reliably.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.levalloisFlake}
              alt="Levallois flake from Nesher Ramla, Israel, demonstrating the prepared-core technique used by Neanderthals"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              A Levallois flake from Nesher Ramla, Israel. The prepared-core
              method requires holding a three-dimensional mental template of the
              desired flake before striking.
            </div>
          </div>

          <p>
            They used ochre pigments
            at sites like Maastricht-Belvd&egrave;re. At Bruniquel Cave in
            southwestern France, deep inside a chamber 336 metres from the
            entrance, they constructed ring-shaped structures from broken
            stalagmites 176,000 years ago&mdash;the oldest known deliberate
            constructions in the subterranean world.
          </p>

          <p>
            They also buried their dead. At Shanidar Cave in Iraqi Kurdistan,
            Ralph Solecki excavated Neanderthal skeletons in the 1950s and 1960s,
            one of which appeared to be surrounded by flower pollen&mdash;a
            finding that spawned the romantic image of the &ldquo;flower
            burial.&rdquo; More recent excavations at the same site by Graeme
            Barker&rsquo;s team have confirmed deliberate burial but cast doubt
            on the flowers. What is not in doubt is that Neanderthals cared for
            their injured and infirm. The Shanidar 1 individual had survived
            severe crushing injuries to the left side of his skull, withering of
            his right arm, and damage to both legs&mdash;injuries that would have
            required sustained assistance from others over months or years.
          </p>

          <p>
            And yet they disappeared. Between 45,000 and 40,000 years ago,
            Neanderthal populations across Europe contracted and vanished, a
            process that took roughly five millennia&mdash;an eye-blink in
            geological time but several hundred generations of lived experience.
            Their final refugia appear to have been the Iberian Peninsula and
            possibly the southern Balkans. The exact mechanism of their
            extinction remains one of the most intensely debated questions in
            palaeoanthropology. Climate instability, competition with incoming
            sapiens populations, demographic fragility in small groups, disease
            transfer&mdash;all have been proposed, and none alone suffices.
          </p>

          <p>
            What the genomic evidence has made clear is that Neanderthals did not
            simply vanish. They were partially absorbed. Between 1 and 4 percent
            of the genome of every living non-African human derives from
            Neanderthal ancestors, the product of interbreeding events that
            occurred when sapiens populations moved into western Asia and Europe.
            Neanderthal alleles persist in us today, influencing traits from
            immune function to skin and hair pigmentation to the shape of our
            skulls. They are gone as a species, but they endure as a ghostly
            fraction of our biology.
          </p>
        </div>

        {/* Species Comparison Radar Chart */}
        <div className="smy-chart">
          <div className="smy-chart__title">Neanderthals vs. Sapiens: A Trait Comparison</div>
          <div className="smy-chart__subtitle">
            Relative scores across eight dimensions (scale: 0&ndash;100)
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke={COLORS.flintGrey} strokeOpacity={0.15} />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: COLORS.flintGrey, fontFamily: 'Inter', fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Neanderthal"
                dataKey="neanderthal"
                stroke={COLORS.glacialBlue}
                fill={COLORS.glacialBlue}
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Radar
                name="Sapiens"
                dataKey="sapiens"
                stroke={COLORS.ochreRed}
                fill={COLORS.ochreRed}
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Legend
                wrapperStyle={{ fontFamily: 'Inter', fontSize: 12, color: COLORS.flintGrey }}
              />
              <Tooltip content={<RadarTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="smy-chart__source">
            Comparative framework adapted from Finlayson 2004; Stringer 2012; Wynn &amp; Coolidge 2012
          </div>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 7: The Rise of Sapiens ── */}
      <Section>
        <div className="smy-narrative">
          <EraBadge text="315 thousand years ago" />
          <h2 className="smy-narrative__heading">The Rise of Sapiens</h2>

          <p>
            In 2017, Jean-Jacques Hublin and his team published a redating of
            fossils from Jebel Irhoud, a collapsed cave in the hills west of
            Marrakech, Morocco. The skulls, originally excavated in the 1960s and
            dismissed as anomalous Neanderthals, turned out to be 315,000 years
            old&mdash;the earliest known{' '}
            <em className="smy-narrative__species-name">Homo sapiens</em>. Their
            faces were flat and retracted, essentially modern; their braincases
            were elongated and archaic. The find pushed the origin of our species
            back by 100,000 years and, critically, placed it in North Africa
            rather than East Africa.             Combined with similarly archaic-modern
            mosaics from Florisbad in South Africa (259 kya) and Omo Kibish in
            Ethiopia (233 kya), the picture that emerged was of a pan-African
            origin: sapiens did not evolve in a single Eden but across the
            continent, in populations connected by intermittent gene flow across
            a patchwork of habitable corridors.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.jebelIrhoud}
              alt="Reconstruction of the Jebel Irhoud Homo sapiens skull, the earliest known specimen of our species at 315,000 years old"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              <em>Homo sapiens</em> from Jebel Irhoud, Morocco. Redated to
              315,000 years ago in 2017, these are the earliest known fossils of
              our species.
            </div>
          </div>

          <p>
            The earliest sapiens were anatomically transitional but not yet
            behaviourally modern in the archaeological sense. Perforated shell
            beads appear at Blombos Cave in South Africa by 75,000 years ago;
            ochre crayons with geometric cross-hatchings are older still, dated
            to 100,000 years. In the Kalahari, crystal collections and pigment
            processing date to 105,000 years ago at Ga-Mohana Hill. Symbolic
            thought&mdash;the capacity to let one thing stand for another&mdash;was
            not a sudden mutation. It accumulated in fragments over tens of
            thousands of years, expressed differently in different populations,
            flickering in and out of the archaeological record like a signal that
            only slowly resolved into something continuous.
          </p>

          <div className="smy-specimen">
            <img
              className="smy-specimen__image"
              src={IMAGES.lionMan}
              alt="The Lion Man of Hohlenstein-Stadel, a 40,000-year-old ivory figurine — one of the oldest known examples of figurative art"
              loading="lazy"
            />
            <div className="smy-specimen__caption">
              The Lion Man of Hohlenstein-Stadel, carved from mammoth ivory
              roughly 40,000 years ago. At 31 cm tall, it is one of the oldest
              known works of figurative art&mdash;evidence of a mind capable of
              imagining things that do not exist.
            </div>
          </div>

          <div className="smy-narrative__highlight">
            The critical advantage may not have been any single cognitive
            trait but the capacity for <strong>cultural cumulation</strong>&mdash;the
            ratchet effect by which each generation preserves the innovations of
            the last and adds to them, so that the collective knowledge of a
            population exceeds what any individual could invent in a lifetime.
            Neanderthals had culture. What sapiens had, perhaps uniquely, was
            culture that reliably accumulated.
          </div>

          <p>
            By 70,000 years ago, sapiens populations in southern Africa were
            manufacturing backed microliths&mdash;tiny stone blades intended to
            be hafted in composite tools&mdash;at Pinnacle Point and Sibudu Cave.
            The technology required planning across multiple stages: selecting raw
            material, heat-treating silcrete to improve its flaking properties,
            knapping the blanks, shaping the elements, preparing mastic adhesive,
            and assembling the finished implement. Each step drew on transmitted
            knowledge. Alone, none of these operations is beyond Neanderthal
            capability. Chained together, they represent a density of cultural
            transmission that appears to have no parallel in the Neanderthal
            record.
          </p>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 8: The Coexistence ── */}
      <Section>
        <div className="smy-narrative">
          <EraBadge text="130&ndash;40 thousand years ago" />
          <h2 className="smy-narrative__heading">The Coexistence</h2>

          <p>
            For most of hominin history, multiple species shared the planet. But
            the period between 130,000 and 40,000 years ago represents the last
            great age of coexistence, a stretch during which at least five
            distinct lineages overlapped in time and, in some cases, in space.{' '}
            <em>Homo sapiens</em> occupied Africa and the Levant.{' '}
            <em>Homo neanderthalensis</em> ranged across Europe and western Asia.
            The Denisovans, known almost entirely from DNA extracted from
            finger bones and teeth in a Siberian cave, inhabited a vast arc from
            the Altai Mountains to Southeast Asia. <em>Homo floresiensis</em>,
            the &ldquo;Hobbit,&rdquo; persisted on the island of Flores until
            at least 60,000 years ago. And{' '}
            <Link href="/essays/science/homo-naledi" className="smy-narrative__link"><em>Homo naledi</em></Link>,
            with its small brain and surprisingly modern hands and feet, was depositing its dead
            in the Rising Star cave system of South Africa as recently as 236,000
            years ago.
          </p>

          <div className="smy-specimen smy-specimen--pair">
            <div className="smy-specimen__pair-item">
              <img
                className="smy-specimen__image"
                src={IMAGES.homoFloresiensis}
                alt="Skull of Homo floresiensis, the diminutive hominin from the island of Flores, Indonesia"
                loading="lazy"
              />
              <div className="smy-specimen__caption">
                <em>Homo floresiensis</em> skull. With a brain of just 380 cc,
                this diminutive hominin crafted stone tools and hunted pygmy
                elephants on Flores until at least 60,000 years ago.
              </div>
            </div>
            <div className="smy-specimen__pair-item">
              <img
                className="smy-specimen__image"
                src={IMAGES.homoNaledi}
                alt="Homo naledi skeletal specimens from the Rising Star cave system, South Africa"
                loading="lazy"
              />
              <div className="smy-specimen__caption">
                <em>Homo naledi</em> skeletal specimens from the Rising Star
                cave system, South Africa. A small-brained hominin with
                surprisingly modern hands and feet.
              </div>
            </div>
          </div>

          <p>
            These species did not merely coexist. They interbred. The sequencing
            of ancient DNA&mdash;pioneered by Svante P&auml;&auml;bo and his
            team at the Max Planck Institute in Leipzig, work that earned the
            2022 Nobel Prize in Physiology or Medicine&mdash;revealed gene flow
            between sapiens and Neanderthals, between sapiens and Denisovans, and
            between Denisovans and Neanderthals. A single bone fragment from
            Denisova Cave (Denisova 11) belonged to a first-generation hybrid: a
            girl whose mother was Neanderthal and whose father was Denisovan.
            The old metaphor of a family tree fails entirely. A braided stream is
            closer to the truth.
          </p>
        </div>

        <div className="smy-data">
          <div className="smy-data__header">
            <div className="smy-data__title">Genetic Admixture in Living Humans</div>
          </div>
          <div className="smy-data__grid">
            <div className="smy-data__card">
              <div className="smy-data__value">1&ndash;4%</div>
              <div className="smy-data__label">Neanderthal DNA in non-African populations</div>
            </div>
            <div className="smy-data__card">
              <div className="smy-data__value">3&ndash;6%</div>
              <div className="smy-data__label">Denisovan DNA in Melanesian populations</div>
            </div>
            <div className="smy-data__card">
              <div className="smy-data__value">~0.3%</div>
              <div className="smy-data__label">Neanderthal DNA in sub-Saharan African populations</div>
            </div>
          </div>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 9: Why We Survived ── */}
      <Section>
        <div className="smy-narrative">
          <h2 className="smy-narrative__heading">Why We Survived</h2>

          <p>
            Of more than twenty hominin species that have existed since the
            divergence from our last common ancestor with chimpanzees, exactly
            one persists. The question of why <em>Homo sapiens</em> alone
            survived is not settled, and any honest answer must accommodate
            uncertainty. But decades of research across genetics, archaeology,
            ecology, and climate science have converged on a set of factors that,
            taken together, provide a plausible framework.
          </p>

          <p>
            First, <strong>social networks</strong>. Sapiens maintained larger
            and more interconnected social groups than any contemporary hominin.
            Neanderthal groups rarely exceeded 15&ndash;25 individuals, based on
            site-occupation signatures and genetic diversity estimates. Sapiens
            bands were comparable in size but were embedded in wider networks of
            exchange and alliance that linked hundreds or thousands of
            individuals across regions. These networks transmitted information,
            buffered local resource failures, and provided mating partners who
            prevented the inbreeding depression that plague small, isolated
            populations.
          </p>

          <p>
            Second, <strong>language</strong>&mdash;though its role is the most
            difficult to assess from the archaeological record. Neanderthals
            possessed a hyoid bone consistent with speech and shared with sapiens
            the <em>FOXP2</em> gene variant associated with language capacity.
            Whether their communication was fully syntactic or more limited
            remains unknown. What the demographic and technological record
            suggests is that sapiens were better at encoding, storing, and
            transmitting complex procedural knowledge across generations&mdash;a
            capability that depends on the precision and flexibility of language.
          </p>

          <p>
            Third, <strong>dietary flexibility</strong>. Isotope analyses reveal
            that Neanderthals were apex predators whose diets were dominated by
            large herbivores&mdash;mammoth, bison, horse, deer. Sapiens exploited
            a broader spectrum: shellfish, fish, birds, small mammals, seeds,
            tubers, insects. When large-game populations collapsed during climatic
            oscillations, Neanderthal populations starved. Sapiens switched menus.
            Fourth, the <strong>ratchet of cultural cumulation</strong> described
            above: each sapiens generation reliably inherited and built upon the
            innovations of the last. Fifth, <strong>demographic
            advantage</strong>&mdash;sapiens populations in Africa were larger,
            more genetically diverse, and better buffered against extinction.
            And sixth, an element that no theory can fully account
            for: <strong>luck</strong>. Volcanic winters, disease events, and
            stochastic population crashes likely eliminated hominin groups
            irrespective of their adaptations. Survival at the species level is
            not always a verdict on fitness. Sometimes it is a coin flip.
          </p>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 10: The Migration ── */}
      <Section>
        <div className="smy-narrative">
          <h2 className="smy-narrative__heading">The Migration</h2>

          <p>
            <em>Homo sapiens</em> left Africa multiple times. An early dispersal
            reached the Levant by 177,000 years ago (Misliya Cave, Israel), but
            that population apparently did not persist. The sustained expansion
            began around 70,000&ndash;60,000 years ago, likely via the southern
            route across the Bab el-Mandeb strait into the Arabian Peninsula.
            From there, the colonization of the globe proceeded with astonishing
            speed. Within 50,000 years&mdash;a fraction of a percent of total
            hominin history&mdash;sapiens had reached every major landmass except
            Antarctica.
          </p>

          <p>
            The feat demanded maritime technology (to reach Australia and the
            Pacific islands), cold-weather adaptation (to survive Arctic Siberia),
            and the cognitive capacity to inhabit radically different ecosystems
            within a few thousand years. No other primate has accomplished
            anything comparable. No other hominin came close.
          </p>
        </div>

        <div className="smy-data">
          <div className="smy-data__header">
            <div className="smy-data__title">Global Colonization</div>
          </div>
          <div className="smy-data__grid">
            <div className="smy-data__card">
              <div className="smy-data__value">65 kya</div>
              <div className="smy-data__label">Sapiens reach Australia</div>
            </div>
            <div className="smy-data__card">
              <div className="smy-data__value">45 kya</div>
              <div className="smy-data__label">Sapiens enter Europe</div>
            </div>
            <div className="smy-data__card">
              <div className="smy-data__value">15 kya</div>
              <div className="smy-data__label">Sapiens enter the Americas</div>
            </div>
          </div>
        </div>
      </Section>

      <StratumDivider />

      {/* ── SECTION 11: The Last Ones Standing ── */}
      <Section>
        <div className="smy-quote">
          <p className="smy-quote__text">
            &ldquo;We are walking archives of ancestral wisdom.&rdquo;
          </p>
          <div className="smy-quote__attribution">
            <span>&mdash;</span> Helena Cronin
          </div>
        </div>

        <div className="smy-narrative">
          <h2 className="smy-narrative__heading">The Last Ones Standing</h2>

          <p>
            For approximately 40,000 years, <em>Homo sapiens</em> has been the
            sole surviving member of a lineage that once numbered at least
            twenty-one species. We are accustomed to this solitude&mdash;it is the
            only condition any living human has known&mdash;but in the deep
            context of hominin history, it is the exception. For most of the
            seven million years covered by this essay, multiple human species
            shared the planet. They occupied different niches, adapted to
            different climates, invented different tools, and in some cases
            recognized one another well enough to interbreed. The world they
            inhabited was richer in human diversity than anything we can
            experience today. Their extinction impoverished the Earth in ways we
            cannot fully measure.
          </p>

          <p>
            We carry their legacy in our genomes. Every person of non-African
            descent bears Neanderthal alleles that influence the structure of
            their immune system, the keratin in their hair, and their
            susceptibility to certain diseases. Melanesian and Aboriginal
            Australian populations carry Denisovan variants that help them
            metabolize oxygen at high altitude and resist tropical pathogens.
            African populations, long assumed to have no archaic admixture, have
            been shown to carry fragments of DNA from at least one unknown
            hominin lineage that diverged from our own more than 500,000 years
            ago. We are not purely sapiens. We are composites&mdash;braided
            streams of genetic information drawn from branches of the human
            family that no longer exist as independent species. The dead walk
            with us in every cell.
          </p>
        </div>
      </Section>

      <StratumDivider />

      {/* ── Sources & Further Reading ── */}
      <Section>
        <div className="smy-sources">
          <h2 className="smy-sources__title">Sources &amp; Further Reading</h2>

          <ul className="smy-sources__list">
            {SOURCES.map((source) => (
              <li key={source.id} className="smy-sources__item">
                <span className="smy-sources__id">{source.id}.</span>
                {source.text}
              </li>
            ))}
          </ul>

          <div className="smy-sources__credits">
            <h3 className="smy-sources__credits-title">Image Credits</h3>
            <ul className="smy-sources__credits-list">
              {IMAGE_CREDITS.map((credit) => (
                <li key={credit.subject} className="smy-sources__credits-item">
                  <a
                    href={credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {credit.subject}
                  </a>
                  {' \u2014 '}
                  {credit.attribution}
                </li>
              ))}
            </ul>
          </div>

          <p className="smy-sources__note">
            All images sourced from Wikimedia Commons under Creative Commons or
            Public Domain licenses. Cranial capacity and body size data drawn
            from Holloway et al. (2004), Grabowski et al. (2015), and
            Ant&oacute;n et al. (2014). Comparative trait scores are normalized
            estimates adapted from the frameworks of Finlayson (2004), Stringer
            (2012), and Wynn &amp; Coolidge (2012).
          </p>

          <div className="smy-sources__further-reading">
            <h3 className="smy-sources__credits-title">Further Reading</h3>
            <ul className="smy-sources__credits-list">
              <li className="smy-sources__credits-item">
                <Link href="/essays/science/lucy" className="smy-narrative__link">
                  Lucy: Before the Genus Homo
                </Link>
                {' \u2014 '}
                A deep-dive visual essay on AL 288-1, the 3.2-million-year-old{' '}
                <em>Australopithecus afarensis</em> skeleton that transformed our
                understanding of bipedalism and human origins.
              </li>
              <li className="smy-sources__credits-item">
                <Link href="/essays/science/turkana-boy" className="smy-narrative__link">
                  Turkana Boy: The Skeleton That Redefined Human Evolution
                </Link>
                {' \u2014 '}
                KNM-WT 15000, the most complete early human skeleton ever found.
                A visual essay on the 1.5-million-year-old <em>Homo erectus</em> youth
                who revealed the modern body plan and Africa&rsquo;s role in the
                origin of long-distance locomotion.
              </li>
              <li className="smy-sources__credits-item">
                <Link href="/essays/science/homo-naledi" className="smy-narrative__link">
                  Homo naledi: The Small-Brained Species That Buried Its Dead
                </Link>
                {' \u2014 '}
                1,500 bones, 560 cubic centimetres, and the question of what makes
                us human. A visual essay on the Rising Star Cave discovery that
                challenges the link between brain size and behavioural complexity.
              </li>
              <li className="smy-sources__credits-item">
                <Link href="/infographics/seven-million-years-homo" className="smy-narrative__link">
                  Infographic: How Our Brains Grew Over 7 Million Years
                </Link>
                {' \u2014 '}
                Cranial capacity comparison across 8 hominid species, from{' '}
                <em>Sahelanthropus</em> (350 cc) to <em>Homo sapiens</em> (1,350 cc).
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </article>
  );
}
