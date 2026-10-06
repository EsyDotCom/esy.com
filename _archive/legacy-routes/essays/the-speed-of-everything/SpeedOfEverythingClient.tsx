'use client';

import { useState, useEffect, useRef } from 'react';
import './the-speed-of-everything.css';

/* ═══════════════════════════════════════════════════════════════════════════
   VISUALIZATION COMPONENTS (dedicated files in ./visualizations/)
   ═══════════════════════════════════════════════════════════════════════════ */
import FamiliarRaceViz from './visualizations/FamiliarRaceViz';
import SlowParadeViz from './visualizations/SlowParadeViz';
import SoundVsLightViz from './visualizations/SoundVsLightViz';
import CosmicSpeedometerViz from './visualizations/CosmicSpeedometerViz';
import TimeDilationViz from './visualizations/TimeDilationViz';
import LightDelayViz from './visualizations/LightDelayViz';
import LogarithmicRulerViz from './visualizations/LogarithmicRulerViz';

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════════════════════════ */

interface SpeedEntry {
  id: string;
  name: string;
  speed_ms: number;
  log10: number;
  display_speed: string;
  category: 'geological' | 'biological' | 'human' | 'atmospheric' | 'cosmic' | 'electromagnetic';
  section: number;
  description: string;
  source: string;
}

const SPEEDS: SpeedEntry[] = [
  { id: 'continental-drift', name: 'Continental Drift', speed_ms: 1e-9, log10: -9.0, display_speed: '~2.5 cm/year', category: 'geological', section: 2, description: 'North America drifts from Europe', source: 'USGS' },
  { id: 'fingernail-growth', name: 'Fingernail Growth', speed_ms: 1.2e-9, log10: -8.9, display_speed: '~3.8 cm/year', category: 'biological', section: 2, description: 'Human fingernail growth rate', source: 'Dermatology refs' },
  { id: 'hair-growth', name: 'Hair Growth', speed_ms: 5e-9, log10: -8.3, display_speed: '~15 cm/year', category: 'biological', section: 2, description: 'Human hair growth rate', source: 'Saitoh et al.' },
  { id: 'glacier', name: 'Glacier Flow', speed_ms: 3e-6, log10: -5.5, display_speed: '~100 m/year', category: 'geological', section: 2, description: 'Typical valley glacier', source: 'Cuffey & Paterson' },
  { id: 'capillary-blood', name: 'Blood (Capillary)', speed_ms: 1e-3, log10: -3.0, display_speed: '1 mm/s', category: 'biological', section: 2, description: 'Blood flow in capillaries', source: 'Guyton & Hall' },
  { id: 'snail', name: 'Garden Snail', speed_ms: 0.013, log10: -1.9, display_speed: '0.05 km/h', category: 'biological', section: 2, description: 'Maximum snail speed', source: 'General biology' },
  { id: 'walking', name: 'Human Walking', speed_ms: 1.4, log10: 0.15, display_speed: '5 km/h', category: 'human', section: 1, description: 'Average adult walking pace', source: 'Bohannon (1997)' },
  { id: 'aorta-blood', name: 'Blood (Aorta)', speed_ms: 1.0, log10: 0, display_speed: '3.6 km/h', category: 'biological', section: 2, description: 'Blood flow in the aorta', source: 'Guyton & Hall' },
  { id: 'usain-bolt', name: 'Usain Bolt (Peak)', speed_ms: 12.3, log10: 1.09, display_speed: '44.2 km/h', category: 'human', section: 1, description: 'Fastest recorded human sprint', source: 'Graubner & Nixdorf (2011)' },
  { id: 'highway', name: 'Highway Driving', speed_ms: 31, log10: 1.49, display_speed: '112 km/h', category: 'human', section: 1, description: 'Typical highway speed', source: 'NHTSA' },
  { id: 'cheetah', name: 'Cheetah (Peak)', speed_ms: 33.5, log10: 1.52, display_speed: '120 km/h', category: 'biological', section: 1, description: 'Fastest land animal', source: 'Hildebrand (1959)' },
  { id: 'terminal-velocity', name: 'Terminal Velocity', speed_ms: 55, log10: 1.74, display_speed: '198 km/h', category: 'human', section: 3, description: 'Human free-fall in spread-eagle', source: 'Physics of skydiving' },
  { id: 'nerve-impulse', name: 'Nerve Impulse', speed_ms: 120, log10: 2.08, display_speed: '432 km/h', category: 'biological', section: 3, description: 'Fast myelinated motor neuron', source: 'Purves et al.' },
  { id: 'commercial-jet', name: 'Commercial Jet', speed_ms: 250, log10: 2.4, display_speed: '900 km/h', category: 'human', section: 1, description: 'Typical cruising speed', source: 'FAA' },
  { id: 'sound-air', name: 'Sound in Air', speed_ms: 343, log10: 2.54, display_speed: 'Mach 1 (1,235 km/h)', category: 'atmospheric', section: 3, description: 'At 20 C, sea level', source: 'NIST / CRC' },
  { id: 'earth-rotation', name: 'Earth Rotation', speed_ms: 465, log10: 2.67, display_speed: '1,674 km/h', category: 'cosmic', section: 4, description: 'At the equator', source: 'NASA' },
  { id: 'bullet', name: 'Rifle Bullet', speed_ms: 940, log10: 2.97, display_speed: 'Mach 2.7 (3,384 km/h)', category: 'human', section: 3, description: '5.56mm NATO muzzle velocity', source: 'Carlucci & Jacobson' },
  { id: 'sound-water', name: 'Sound in Water', speed_ms: 1480, log10: 3.17, display_speed: '5,328 km/h', category: 'atmospheric', section: 3, description: '4.3x faster than in air', source: 'NOAA' },
  { id: 'sound-steel', name: 'Sound in Steel', speed_ms: 5960, log10: 3.78, display_speed: '21,456 km/h', category: 'atmospheric', section: 3, description: '17x faster than in air', source: 'CRC Handbook' },
  { id: 'iss', name: 'ISS Orbit', speed_ms: 7660, log10: 3.88, display_speed: '27,600 km/h', category: 'human', section: 3, description: '16 sunrises per day', source: 'NASA' },
  { id: 'escape-velocity', name: 'Escape Velocity', speed_ms: 11186, log10: 4.05, display_speed: '40,270 km/h', category: 'cosmic', section: 3, description: 'Leave Earth without return', source: 'Calculated' },
  { id: 'earth-orbit', name: 'Earth Orbital Speed', speed_ms: 29800, log10: 4.47, display_speed: '107,000 km/h', category: 'cosmic', section: 4, description: 'Around the Sun', source: 'NASA' },
  { id: 'parker-probe', name: 'Parker Solar Probe', speed_ms: 192000, log10: 5.28, display_speed: '692,000 km/h', category: 'human', section: 3, description: 'Fastest human-made object', source: 'NASA/JHU-APL' },
  { id: 'galactic-orbit', name: 'Solar System (Galactic)', speed_ms: 220000, log10: 5.34, display_speed: '792,000 km/h', category: 'cosmic', section: 4, description: 'Orbiting the Milky Way center', source: 'Reid et al. (2014)' },
  { id: 'milky-way-cmb', name: 'Milky Way (vs CMB)', speed_ms: 370000, log10: 5.57, display_speed: '1,332,000 km/h', category: 'cosmic', section: 4, description: 'Motion relative to cosmic microwave background', source: 'COBE/WMAP' },
  { id: 'electrical-signal', name: 'Electrical Signal', speed_ms: 2e8, log10: 8.3, display_speed: '2/3 the speed of light', category: 'electromagnetic', section: 5, description: 'In copper wire', source: 'Griffiths' },
  { id: 'speed-of-light', name: 'Speed of Light', speed_ms: 299792458, log10: 8.48, display_speed: '299,792,458 m/s', category: 'electromagnetic', section: 5, description: 'The universal speed limit', source: 'BIPM (defined)' },
];

const CATEGORY_COLORS: Record<string, string> = {
  geological: 'var(--soe-geo)',
  biological: 'var(--soe-bio)',
  human: 'var(--soe-human)',
  atmospheric: 'var(--soe-atmo)',
  cosmic: 'var(--soe-cosmic)',
  electromagnetic: 'var(--soe-em)',
};

/* ═══════════════════════════════════════════════════════════════════════════
   SVG CATEGORY ICONS
   ═══════════════════════════════════════════════════════════════════════════ */

function CategoryIcon({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] || 'var(--soe-text-muted)';
  const style = { color } as React.CSSProperties;

  switch (category) {
    case 'geological':
      return (
        <svg className="soe-cat-icon" viewBox="0 0 16 16" fill="none" style={style} aria-hidden="true">
          <path d="M2 14L8 3l6 11H2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M4.5 14L8 6.5 11.5 14" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      );
    case 'biological':
      return (
        <svg className="soe-cat-icon" viewBox="0 0 16 16" fill="none" style={style} aria-hidden="true">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.4" />
        </svg>
      );
    case 'human':
      return (
        <svg className="soe-cat-icon" viewBox="0 0 16 16" fill="none" style={style} aria-hidden="true">
          <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="5" x2="8" y2="11" stroke="currentColor" strokeWidth="1.2" />
          <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case 'atmospheric':
      return (
        <svg className="soe-cat-icon" viewBox="0 0 16 16" fill="none" style={style} aria-hidden="true">
          <path d="M1 8c2-3 4-3 6 0s4 3 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 11c2-2 4-2 6 0s4 2 6 0" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        </svg>
      );
    case 'cosmic':
      return (
        <svg className="soe-cat-icon" viewBox="0 0 16 16" fill="none" style={style} aria-hidden="true">
          <circle cx="8" cy="8" r="2" fill="currentColor" />
          <ellipse cx="8" cy="8" rx="6" ry="3" stroke="currentColor" strokeWidth="1.2" transform="rotate(-20 8 8)" />
        </svg>
      );
    case 'electromagnetic':
      return (
        <svg className="soe-cat-icon" viewBox="0 0 16 16" fill="none" style={style} aria-hidden="true">
          <path d="M9.5 1L6 8h4.5L6.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <span className="soe-cat-icon-dot" style={{ backgroundColor: color as string }} />;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function ProgressBar() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      setScrollPct((window.scrollY / docH) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="soe-progress-bar" role="progressbar" aria-valuenow={Math.round(scrollPct)} aria-valuemin={0} aria-valuemax={100}>
      <div className="soe-progress-fill" style={{ width: `${scrollPct}%` }} />
    </div>
  );
}

function SpeedCard({ entry, delay = 0 }: { entry: SpeedEntry; delay?: number }) {
  const { ref, isVisible } = useInView(0.15);

  return (
    <div
      ref={ref}
      className={`soe-speed-card ${isVisible ? 'soe-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, borderLeftColor: CATEGORY_COLORS[entry.category] } as React.CSSProperties}
      role="listitem"
    >
      <div className="soe-speed-card-icon">
        <CategoryIcon category={entry.category} />
      </div>
      <div className="soe-speed-card-body">
        <div className="soe-speed-card-name">{entry.name}</div>
        <div className="soe-speed-card-desc">{entry.description}</div>
      </div>
      <div className="soe-speed-card-value" style={{ color: CATEGORY_COLORS[entry.category] }}>
        <span className="soe-mono">{entry.display_speed}</span>
      </div>
    </div>
  );
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`soe-section ${className}`}>{children}</section>;
}

function Transition({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useInView(0.5);
  return (
    <div ref={ref} className={`soe-transition ${isVisible ? 'soe-visible' : ''}`}>
      <p className="soe-transition-text">{children}</p>
    </div>
  );
}

function Bibliography() {
  return (
    <footer className="soe-bibliography">
      <h2>Sources</h2>
      <div className="soe-bib-columns">
        <div className="soe-bib-group">
          <h3>Government &amp; Institutional</h3>
          <ul>
            <li>USGS, &ldquo;Understanding plate motions&rdquo; &mdash; pubs.usgs.gov</li>
            <li>NASA Earth Fact Sheet; NASA ISS Fact Sheet; NASA Solar System Exploration</li>
            <li>NOAA Ocean Acoustics &mdash; oceanexplorer.noaa.gov</li>
            <li>NIST Fundamental Physical Constants &mdash; physics.nist.gov</li>
            <li>BIPM &mdash; Definition of the metre (17th CGPM, 1983)</li>
          </ul>
        </div>
        <div className="soe-bib-group">
          <h3>Academic Textbooks</h3>
          <ul>
            <li>Griffiths, D.J. <em>Introduction to Electrodynamics</em> (4th ed.), Cambridge University Press</li>
            <li>Purves, D. et al. <em>Neuroscience</em> (6th ed.), Sinauer Associates</li>
            <li>Guyton, A.C. &amp; Hall, J.E. <em>Textbook of Medical Physiology</em> (13th ed.)</li>
            <li>Cuffey, K.M. &amp; Paterson, W.S.B. <em>The Physics of Glaciers</em> (4th ed.), Academic Press</li>
            <li>Carlucci, D.E. &amp; Jacobson, S.S. <em>Ballistics: Theory and Design</em> (2nd ed.), CRC Press</li>
          </ul>
        </div>
        <div className="soe-bib-group">
          <h3>Peer-Reviewed Journals</h3>
          <ul>
            <li>Bohannon, R.W. (1997). &ldquo;Comfortable and maximum walking speed of adults.&rdquo; <em>Age and Ageing</em>, 26(1), 15&ndash;19</li>
            <li>Reid, M.J. et al. (2014). &ldquo;Trigonometric Parallaxes of High Mass Star Forming Regions.&rdquo; <em>ApJ</em>, 783(2), 130</li>
            <li>Graubner, R. &amp; Nixdorf, E. (2011). &ldquo;Biomechanical Analysis of Sprint Events.&rdquo; <em>IAAF New Studies in Athletics</em></li>
            <li>Saitoh, M. et al. (1970). Rate of hair growth. <em>J. Investigative Dermatology</em></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function SpeedOfEverythingClient() {
  return (
    <article className="soe-essay">
      <ProgressBar />

      {/* Hero */}
      <header className="soe-section soe-hero">
        <span className="soe-hero-reading-time">12 min read &middot; Science</span>
        <h1 className="soe-hero-title">The Speed of Everything</h1>
        <p className="soe-hero-subtitle">
          A logarithmic journey through velocity &mdash; from the imperceptible drift
          of continents to the absolute cosmic speed limit of light.
        </p>
        <div className="soe-hero-range soe-mono" aria-label="Speed range covered in this essay">
          <span className="soe-hero-range-slow">10&#x207B;&#x2079; m/s</span>
          <span className="soe-hero-range-divider">&mdash;</span>
          <span className="soe-hero-range-fast">10&#x2078;&#xB7;&#x2075; m/s</span>
        </div>
      </header>

      {/* Section 1: Speeds You Know */}
      <Section>
        <div className="soe-prose">
          <h2>Speeds You Know</h2>
          <p>
            You are an expert on speed. You&apos;ve been calibrating your internal
            speedometer since birth &mdash; the rhythm of a walk, the lurch of acceleration,
            the blur outside a car window. But your expertise covers a vanishingly
            small slice of reality.
          </p>
        </div>

        <div className="soe-speed-list" role="list">
          {SPEEDS.filter(s => s.section === 1 && ['walking', 'usain-bolt', 'highway', 'commercial-jet'].includes(s.id)).map((s, i) => (
            <SpeedCard key={s.id} entry={s} delay={i * 100} />
          ))}
        </div>

        <FamiliarRaceViz />

        <div className="soe-prose">
          <p>
            Walking to flying. <span className="soe-mono">1.4</span> to <span className="soe-mono">250</span> m/s.
            That&apos;s your entire lived experience of speed &mdash; roughly <strong>two orders of magnitude</strong>.
            The universe operates across seventeen.
          </p>
        </div>
      </Section>

      {/* Section 2: The Imperceptibly Slow */}
      <Transition>
        Now let&apos;s go the other direction. Below walking speed, below crawling speed,
        below anything you can see happening &mdash; the universe is full of motion so slow it&apos;s invisible.
      </Transition>

      <Section>
        <div className="soe-prose">
          <h2>The Imperceptibly Slow</h2>
          <p>
            Your hair grows at five nanometers per second. While you read this sentence,
            each strand on your head extended by roughly the width of a DNA molecule.
            And here&apos;s the strange part: that&apos;s almost exactly the speed at which
            North America is drifting away from Europe.
          </p>
        </div>

        <div className="soe-speed-list" role="list">
          {SPEEDS.filter(s => s.section === 2).sort((a, b) => a.log10 - b.log10).map((s, i) => (
            <SpeedCard key={s.id} entry={s} delay={i * 80} />
          ))}
        </div>

        <SlowParadeViz />

        <div className="soe-prose">
          <p>
            These processes shaped the planet. Continental drift at 2.5 cm/year has moved
            entire oceans over 200 million years. Slow doesn&apos;t mean unimportant &mdash;
            it means patient.
          </p>
        </div>
      </Section>

      {/* Section 3: Breaking Barriers */}
      <Transition>
        Humans are not content with the speeds nature gave us. We&apos;ve spent centuries
        engineering our way past every limit.
      </Transition>

      <Section>
        <div className="soe-prose">
          <h2>Breaking Barriers</h2>
          <p>
            In 1947, Chuck Yeager flew the Bell X-1 past Mach 1 &mdash; <span className="soe-mono">343 m/s</span> &mdash; and
            broke the sound barrier. Since then, we&apos;ve built bullets that travel at Mach 2.7,
            spacecraft that orbit at <span className="soe-mono">7,660 m/s</span>, and a solar
            probe that holds the speed record for any human-made object.
          </p>
        </div>

        <div className="soe-speed-list" role="list">
          {SPEEDS.filter(s => s.section === 3).sort((a, b) => a.log10 - b.log10).map((s, i) => (
            <SpeedCard key={s.id} entry={s} delay={i * 80} />
          ))}
        </div>

        <SoundVsLightViz />

        <div className="soe-prose">
          <p>
            The Parker Solar Probe &mdash; humanity&apos;s speed record at <span className="soe-mono">192,000 m/s</span> &mdash;
            is still only <strong>0.064%</strong> of the speed of light. Even our fastest creation
            is a rounding error compared to what the universe considers ordinary.
          </p>
        </div>
      </Section>

      {/* Section 4: Cosmic Velocities */}
      <Transition>
        Here&apos;s a secret: you are not sitting still. You have never been sitting still.
        You are, right now, hurtling through space at hundreds of kilometers per second.
      </Transition>

      <Section>
        <div className="soe-prose">
          <h2>Cosmic Velocities</h2>
          <p>
            The Earth rotates at <span className="soe-mono">465 m/s</span> at the equator. It orbits the
            Sun at <span className="soe-mono">29,800 m/s</span>. The solar system orbits the galaxy at
            <span className="soe-mono"> 220,000 m/s</span>. And the Milky Way itself is moving toward the
            Great Attractor at <span className="soe-mono">~600,000 m/s</span> relative to the cosmic
            microwave background.
          </p>
        </div>

        <CosmicSpeedometerViz />

        <div className="soe-prose">
          <p>
            &ldquo;How fast am I going?&rdquo; has no single answer. All motion is relative &mdash; your
            speed depends on your reference frame. You&apos;re simultaneously sitting still
            and hurtling at 600 km/s. Both are true.
          </p>
        </div>
      </Section>

      {/* Section 5: The Speed of Light */}
      <Transition>
        There is a speed that nothing with mass can ever reach. It is not merely fast &mdash;
        it is the speed limit of causality itself.
      </Transition>

      <Section>
        <div className="soe-prose">
          <h2>The Speed of Light</h2>
          <p>
            Since 1983, the metre is defined by this number: <span className="soe-mono soe-highlight">299,792,458 m/s</span>.
            The speed of light is not just very fast &mdash; it is the absolute maximum speed at which
            information, energy, or causality can propagate through space. Nothing with mass can
            reach it; approaching it requires infinite energy.
          </p>
          <p>
            And yet, at cosmic scales, even light is frustratingly slow. We see the Sun as it was
            8 minutes ago. The nearest star is 4.24 light-years away. We never see the universe in
            real time.
          </p>
        </div>

        <LightDelayViz />

        <div className="soe-speed-list" role="list">
          <SpeedCard entry={SPEEDS.find(s => s.id === 'electrical-signal')!} />
          <SpeedCard entry={SPEEDS.find(s => s.id === 'speed-of-light')!} delay={100} />
        </div>

        <TimeDilationViz />
      </Section>

      {/* Section 6: The Full Spectrum */}
      <Transition>
        Now step back. All the way back. Let&apos;s see everything at once.
      </Transition>

      <Section className="soe-section-ruler">
        <div className="soe-prose">
          <h2>The Full Spectrum</h2>
          <p>
            A logarithmic scale is the only way to see the full picture. On a normal (linear)
            scale, continental drift would be an invisible dot, and the speed of light would be
            miles off the edge of your screen. On a log scale, each equal step is a multiplication
            by 10 &mdash; and every speed finds its place.
          </p>
          <p className="soe-ruler-instruction">
            <strong>Scroll to travel through 17 orders of magnitude</strong>
          </p>
        </div>

        <LogarithmicRulerViz speeds={SPEEDS} />

        <div className="soe-prose soe-prose-final">
          <p>
            You live in two orders of magnitude out of seventeen. Your body, your cars, your
            planes &mdash; they occupy a tiny, arbitrary band in a spectrum so vast that seeing it
            requires a scale where each step is ten times the last.
          </p>
          <p>
            Speed is not a line from slow to fast. It is a spectrum so vast that we
            perceive less than 12% of it. And yet, from the patient drift of continents to the
            absolute finality of light, every speed tells us something about the structure
            of reality.
          </p>
        </div>
      </Section>

      <Bibliography />
    </article>
  );
}
