"use client";

import React, { useEffect, useRef, useState } from "react";
import "./synthetic-sweetness.css";

// ============================================================================
// SYNTHETIC SWEETNESS - Visual Essay Client Component
// ============================================================================
// Design Research: Subject-derived palette from sweetener packaging
// Color Palette: Pink (saccharin), Blue (aspartame), Yellow (sucralose), Green (stevia)
// Typography: Freight Big Pro (headlines), Source Serif Pro (body), JetBrains Mono (data)
// Animation: Crystallization reveals, documentary pacing, era-based photo processing
// ============================================================================

// ==================== CUSTOM HOOKS ====================

const useIntersectionReveal = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useGlobalScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const newProgress = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// ==================== PROGRESS BAR ====================

const SweetnessProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      className="ss-progress-bar"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="ss-progress-fill"
        style={{ height: `${progress * 100}%` }}
      />
      <div
        className="ss-progress-marker"
        style={{ bottom: `${progress * 100}%` }}
      />
    </div>
  );
};

// ==================== REVEAL WRAPPER ====================

const RevealSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => {
  const { ref, isVisible } = useIntersectionReveal();

  return (
    <div
      ref={ref}
      className={`ss-reveal ${isVisible ? 'visible' : ''} ${delay ? `ss-reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// ==================== QUOTE BLOCK ====================

const QuoteBlock: React.FC<{
  quote: string;
  author: string;
  title?: string;
  year?: string;
}> = ({ quote, author, title, year }) => {
  return (
    <blockquote className="ss-quote-block">
      <p className="ss-quote-text">{quote}</p>
      <footer className="ss-quote-attribution">
        <strong>{author}</strong>
        {title && <span>, {title}</span>}
        {year && <span> ({year})</span>}
      </footer>
    </blockquote>
  );
};

// ==================== FIGURE PROFILE ====================

interface FigureProfileProps {
  name: string;
  title: string;
  details: string[];
  quote?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const FigureProfile: React.FC<FigureProfileProps> = ({
  name,
  title,
  details,
  quote,
  imageSrc,
  imageAlt
}) => {
  return (
    <div className="ss-figure-profile">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt || name}
          className="ss-figure-image ss-photo-scientific"
        />
      )}
      <div className="ss-figure-content">
        <h4 className="ss-figure-name">{name}</h4>
        <p className="ss-figure-title">{title}</p>
        <ul className="ss-figure-details">
          {details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
        {quote && (
          <p className="ss-figure-quote">&ldquo;{quote}&rdquo;</p>
        )}
      </div>
    </div>
  );
};

// ==================== CHAPTER COMPONENT ====================

interface ChapterProps {
  number: number;
  title: string;
  era: string;
  metaphor: string;
  children: React.ReactNode;
}

const Chapter: React.FC<ChapterProps> = ({ number, title, era, metaphor, children }) => {
  return (
    <section className="ss-chapter ss-section">
      <div className="ss-container ss-narrow">
        <RevealSection>
          <header className="ss-chapter-header">
            <p className="ss-chapter-number">Chapter {number}</p>
            <h2 className="ss-headline ss-headline-lg ss-chapter-title">{title}</h2>
            <p className="ss-chapter-era">{era}</p>
          </header>
          <div className="ss-chapter-metaphor">
            <em>{metaphor}</em>
          </div>
        </RevealSection>
        {children}
      </div>
    </section>
  );
};

// ==================== SWEETENER PACKET DISPLAY ====================

const SweetenerPackets: React.FC = () => {
  const packets = [
    { name: "Saccharin", brand: "Sweet\u2019N Low", sweetness: "300x", color: "pink" },
    { name: "Aspartame", brand: "Equal", sweetness: "200x", color: "blue" },
    { name: "Sucralose", brand: "Splenda", sweetness: "600x", color: "yellow" },
    { name: "Stevia", brand: "Truvia", sweetness: "200-300x", color: "green" },
  ];

  return (
    <div className="ss-packet-grid">
      {packets.map((packet) => (
        <div key={packet.name} className="ss-packet">
          <div className={`ss-packet-icon ss-packet-${packet.color}`} />
          <p className="ss-packet-name">{packet.name}</p>
          <p className="ss-packet-brand">{packet.brand}</p>
          <p className="ss-packet-sweetness">{packet.sweetness} sweeter than sugar</p>
        </div>
      ))}
    </div>
  );
};

// ==================== TIMELINE COMPONENT ====================

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="ss-timeline">
      {events.map((event, i) => (
        <RevealSection key={i} delay={(i % 4) + 1}>
          <div className="ss-timeline-item">
            <p className="ss-timeline-year">{event.year}</p>
            <h4 className="ss-timeline-title">{event.title}</h4>
            <p className="ss-timeline-description">{event.description}</p>
          </div>
        </RevealSection>
      ))}
    </div>
  );
};

// ==================== CONSUMPTION CHART ====================

const ConsumptionChart: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.3);

  const data = [
    { year: "1970", value: 122, color: "#8B5A2B" },
    { year: "1980", value: 124, color: "#C9B037" },
    { year: "1990", value: 137, color: "#E85D75" },
    { year: "1999", value: 154, color: "#CD5C5C", label: "PEAK" },
    { year: "2010", value: 132, color: "#4A90D9" },
    { year: "2023", value: 124, color: "#4CAF50" },
  ];

  const maxValue = 160;

  return (
    <div ref={ref} className="ss-chart-container">
      <h3 className="ss-chart-title">US Per Capita Sweetener Consumption</h3>
      <p className="ss-chart-subtitle">Pounds per year (all caloric sweeteners)</p>

      <div className="ss-bar-chart">
        {data.map((item) => (
          <div key={item.year} className="ss-bar-row">
            <span className="ss-bar-label">{item.year}</span>
            <div className="ss-bar-track">
              <div
                className="ss-bar-fill"
                style={{
                  width: isVisible ? `${(item.value / maxValue) * 100}%` : '0%',
                  backgroundColor: item.color,
                }}
              />
            </div>
            <span className="ss-bar-value">
              {item.value} {item.label && <strong>({item.label})</strong>}
            </span>
          </div>
        ))}
      </div>

      <p className="ss-chart-source">Source: USDA Economic Research Service</p>
    </div>
  );
};

// ==================== FAQ SECTION ====================

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Are artificial sweeteners safe?",
      answer: "Current regulatory consensus says yes, at levels within established ADIs (Acceptable Daily Intakes). However, the WHO\u2019s 2023 guideline recommends against using them for weight control, and scientific debate continues."
    },
    {
      question: "How was saccharin discovered?",
      answer: "In June 1878, chemist Constantine Fahlberg noticed a sweet taste on his fingers at dinner after working in Ira Remsen\u2019s laboratory at Johns Hopkins. He traced it to a compound he\u2019d synthesized—saccharin, 300 times sweeter than sugar."
    },
    {
      question: "Why is cyclamate banned in the US but legal in Europe?",
      answer: "The US banned cyclamate in 1969 based on a rat study showing bladder tumors. The mechanism causing those tumors doesn\u2019t apply to humans. Most other countries have re-evaluated the evidence and approved cyclamate."
    },
    {
      question: "Is stevia really \u2018natural\u2019?",
      answer: "Stevia comes from a plant, but commercial products are highly processed extracts involving water extraction, chemical precipitation, and crystallization. \u2018Natural\u2019 describes origin, not production method."
    },
    {
      question: "When did US sweetener consumption peak?",
      answer: "US per capita sweetener consumption peaked in 1999 at 153.6 pounds per year. By 2023, it had declined 19.6% to 123.5 pounds—still historically unprecedented, but down from the peak."
    },
    {
      question: "What did the WHO say about artificial sweeteners in 2023?",
      answer: "In May 2023, the WHO recommended against using non-sugar sweeteners for weight control, citing lack of long-term benefit evidence. This was a conditional recommendation based on systematic review."
    },
    {
      question: "How many Diet Cokes would I need to drink to exceed the ADI for aspartame?",
      answer: "For a 70kg adult, roughly 14 cans per day to exceed the JECFA ADI of 40 mg/kg. The FDA\u2019s ADI is slightly higher at 50 mg/kg."
    },
    {
      question: "What is the most potent sweetener?",
      answer: "Advantame, approved by the FDA in 2014, is 20,000 times sweeter than sugar—the most potent high-intensity sweetener approved for use."
    },
  ];

  return (
    <section className="ss-section ss-section-elevated">
      <div className="ss-container ss-narrow">
        <RevealSection>
          <h2 className="ss-headline ss-headline-md" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Frequently Asked Questions
          </h2>
        </RevealSection>

        <div className="ss-faq">
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={(i % 4) + 1}>
              <div className="ss-faq-item">
                <h3 className="ss-faq-question">{faq.question}</h3>
                <p className="ss-faq-answer">{faq.answer}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

export default function SyntheticSweetnessClient() {
  const progress = useGlobalScrollProgress();

  const discoveryTimeline: TimelineEvent[] = [
    { year: "1878", title: "Saccharin Discovered", description: "Constantine Fahlberg notices sweet taste on his fingers after working in Ira Remsen\u2019s lab at Johns Hopkins." },
    { year: "1937", title: "Cyclamate Discovered", description: "Michael Sveda puts a cigarette on his lab bench, tastes it on his fingers when he picks it up." },
    { year: "1965", title: "Aspartame Discovered", description: "James Schlatter licks his finger while picking up papers, discovers the sweet compound." },
    { year: "1967", title: "Acesulfame-K Discovered", description: "Karl Clauss at Hoechst AG licks his fingers to pick up paper, notices intense sweetness." },
    { year: "1976", title: "Sucralose Discovered", description: "Shashikant Phadnis mishears \u2018test\u2019 as \u2018taste,\u2019 discovers sucralose by accident." },
  ];

  const regulatoryTimeline: TimelineEvent[] = [
    { year: "1958", title: "Food Additives Amendment", description: "Requires premarket approval; Delaney Clause bans any carcinogenic substance." },
    { year: "1969", title: "Cyclamate GRAS Removed", description: "FDA removes cyclamate from GRAS list after rat bladder tumor studies." },
    { year: "1970", title: "Cyclamate Banned", description: "Total cyclamate ban takes effect in August. Remains banned in US today." },
    { year: "1977", title: "Saccharin Near-Ban", description: "FDA announces intent to ban; Congress passes moratorium requiring warning labels instead." },
    { year: "1981", title: "Aspartame Approved", description: "FDA Commissioner Hayes overrules PBOI, approves aspartame for dry foods." },
    { year: "1998", title: "Sucralose Approved", description: "FDA approves sucralose; Splenda launches the following year." },
    { year: "2008", title: "Stevia GRAS", description: "FDA issues GRAS notices for high-purity steviol glycosides." },
    { year: "2023", title: "WHO Guideline", description: "WHO recommends against NSS for weight control; IARC classifies aspartame as \u2018possibly carcinogenic.\u2019" },
  ];

  return (
    <article className="synthetic-sweetness">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="ss-skip-link">Skip to main content</a>

      {/* Progress bar */}
      <SweetnessProgressBar progress={progress} />

      {/* Hero Section */}
      <header className="ss-hero">
        <div className="ss-hero-background">
          {/* Placeholder for hero image */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
          }} />
        </div>
        <div className="ss-hero-overlay" />
        <div className="ss-hero-content" id="main-content">
          <p className="ss-hero-tagline">A Visual Essay</p>
          <h1 className="ss-headline ss-headline-xl ss-hero-title">
            Synthetic Sweetness
          </h1>
          <p className="ss-hero-subtitle">
            How Chemistry Changed the Taste of America
          </p>
        </div>
        <div className="ss-scroll-indicator">
          <span>Scroll to explore</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </header>

      {/* Introduction */}
      <section className="ss-section">
        <div className="ss-container ss-narrow">
          <RevealSection>
            <p className="ss-body" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              Every day, 600 million Americans sweeten their coffee, their tea, their soda.
              Pink packets, blue packets, yellow packets, green. Zero calories, no sugar,
              still sweet.
            </p>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="ss-body">
              For 145 years, we\u2019ve tried to keep the sweetness and lose the calories.
              Every major artificial sweetener—saccharin, cyclamate, aspartame, sucralose,
              acesulfame-K—was discovered by accident, when a chemist tasted something
              they shouldn\u2019t have.
            </p>
          </RevealSection>
          <RevealSection delay={2}>
            <p className="ss-body">
              This is the story of how we engineered our way around sugar\u2019s consequences—
              and whether we succeeded.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Chapter 1: The Evolutionary Trap */}
      <Chapter
        number={1}
        title="The Evolutionary Trap"
        era="Deep Time"
        metaphor="Sweetness is the oldest bribe in nature."
      >
        <RevealSection>
          <p className="ss-body">
            Our craving for sweetness is older than humanity itself. Primates evolved to
            seek sugary fruits—ripeness signals nutrition, energy, survival. The sweet
            taste receptor on the human tongue connects directly to the brain\u2019s pleasure
            centers, releasing dopamine with the same efficiency as addictive drugs.
          </p>
        </RevealSection>
        <RevealSection delay={1}>
          <p className="ss-body">
            For millions of years, this worked. Sweetness was rare. Fruit appeared
            seasonally. Honey was guarded by stinging defenders. The calories we craved
            were hard to obtain.
          </p>
        </RevealSection>
        <RevealSection delay={2}>
          <p className="ss-body">
            Then we learned to cultivate. Sugar cane, first domesticated around 8000 BCE
            in New Guinea, was humanity\u2019s first attempt to hack our own reward system.
            We found a plant that produced sweetness on demand and spent the next 10,000
            years figuring out how to grow more of it.
          </p>
        </RevealSection>
        <RevealSection delay={3}>
          <p className="ss-body">
            The trap was set. We didn\u2019t evolve to handle unlimited access to our deepest craving.
          </p>
        </RevealSection>
      </Chapter>

      {/* Chapter 2: From Jungle to Commodity */}
      <Chapter
        number={2}
        title="From Jungle to Commodity"
        era="8000 BCE – 1500 CE"
        metaphor="Sugar crystallization was alchemy that changed the world."
      >
        <RevealSection>
          <p className="ss-body">
            For thousands of years, sugar cane was chewed for pleasure but couldn\u2019t travel.
            The breakthrough came around 500 CE in India: crystallization. By boiling cane
            juice and letting it cool slowly, the sweet essence could be captured in solid
            form. Traders called it \u201Csharkara\u201D—Sanskrit for gravel or grit. The word became
            \u201Csugar.\u201D
          </p>
        </RevealSection>
        <RevealSection delay={1}>
          <p className="ss-body">
            Suddenly, sweetness could be stored. It could be shipped. It could be sold.
          </p>
        </RevealSection>
        <RevealSection delay={2}>
          <p className="ss-body">
            The Arabs encountered this marvel during Islamic expansion and became its
            greatest promoters. By the time Crusaders reached the Middle East in 1099,
            they discovered \u201Ca most precious product...very useful and healthy.\u201D They
            brought it home.
          </p>
        </RevealSection>
        <RevealSection delay={3}>
          <p className="ss-body">
            In medieval Europe, sugar was exotic medicine, sold by apothecaries in tiny
            quantities. In 1319, a pound of sugar in London cost 2 shillings—equivalent
            to roughly $100 today. Only kings and bishops tasted it regularly.
          </p>
        </RevealSection>
      </Chapter>

      {/* The Accidental Discovery Pattern */}
      <section className="ss-section ss-section-elevated">
        <div className="ss-container ss-narrow">
          <RevealSection>
            <h2 className="ss-headline ss-headline-md" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              The Accidental Pattern
            </h2>
            <p className="ss-body" style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--ss-text-secondary)' }}>
              Every major artificial sweetener was discovered the same way
            </p>
          </RevealSection>

          <Timeline events={discoveryTimeline} />

          <RevealSection>
            <QuoteBlock
              quote="God looks after damn fools, children and chemists."
              author="Michael Sveda"
              title="Discoverer of cyclamate"
              year="on the accidental discovery"
            />
          </RevealSection>
        </div>
      </section>

      {/* Chapter 5: Saccharin Discovery */}
      <Chapter
        number={5}
        title="The First Accident"
        era="1878–1879"
        metaphor="Every artificial sweetener was discovered by someone who tasted something they shouldn\u2019t have."
      >
        <RevealSection>
          <p className="ss-body">
            In June 1878, in a cramped laboratory at Johns Hopkins University, a
            Russian-born chemist named Constantine Fahlberg was working on coal tar
            derivatives. The research was mundane—oxidizing toluene compounds for
            his supervisor, Professor Ira Remsen.
          </p>
        </RevealSection>
        <RevealSection delay={1}>
          <p className="ss-body">
            That evening, Fahlberg sat down to dinner without washing his hands. When
            he picked up a piece of bread, he noticed something strange: it tasted sweet.
            Intensely sweet. He licked his fingers. Sweet. He tasted his napkin where
            he\u2019d wiped his hands. Sweet.
          </p>
        </RevealSection>
        <RevealSection delay={2}>
          <p className="ss-body">
            He rushed back to the laboratory and tasted every beaker and flask until
            he found the source: a white crystalline compound produced by his afternoon\u2019s
            work. He named it \u201Csaccharin\u201D from the Latin <em>saccharum</em>—sugar.
          </p>
        </RevealSection>
        <RevealSection delay={3}>
          <p className="ss-body">
            Saccharin was 300 times sweeter than sugar. It had no calories. It didn\u2019t
            rot teeth. It passed through the body unchanged.
          </p>
        </RevealSection>

        <RevealSection>
          <FigureProfile
            name="Constantine Fahlberg"
            title="Discoverer of Saccharin"
            details={[
              "Born December 22, 1850, Tambov, Russia",
              "Discovered saccharin\u2019s sweet taste June 1878",
              "Patented without crediting Remsen",
              "Built saccharin factory in Magdeburg, Germany (1886)",
              "Died August 15, 1910"
            ]}
          />
        </RevealSection>

        <RevealSection>
          <FigureProfile
            name="Ira Remsen"
            title="The Uncredited Co-Discoverer"
            details={[
              "First Professor of Chemistry, Johns Hopkins (1876-1913)",
              "President of Johns Hopkins University (1901-1913)",
              "Published saccharin discovery with Fahlberg (February 1879)"
            ]}
            quote="Fahlberg is a scoundrel. It nauseates me to hear my name mentioned in the same breath with him."
          />
        </RevealSection>
      </Chapter>

      {/* Roosevelt Quote Section */}
      <section className="ss-section">
        <div className="ss-container ss-narrow">
          <RevealSection>
            <QuoteBlock
              quote="Anybody who says saccharin is injurious to health is an idiot."
              author="Theodore Roosevelt"
              title="26th President of the United States"
              year="1907"
            />
          </RevealSection>
          <RevealSection delay={1}>
            <p className="ss-body" style={{ textAlign: 'center' }}>
              Roosevelt personally used saccharin on his doctor\u2019s orders. When Harvey
              Wiley, the father of the FDA, tried to ban it, the president shut him down.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Regulatory Timeline */}
      <section className="ss-section ss-section-elevated">
        <div className="ss-container ss-narrow">
          <RevealSection>
            <h2 className="ss-headline ss-headline-md" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              The Regulatory Pendulum
            </h2>
            <p className="ss-body" style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--ss-text-secondary)' }}>
              A pattern of approval, concern, investigation, and (usually) reaffirmation
            </p>
          </RevealSection>

          <Timeline events={regulatoryTimeline} />
        </div>
      </section>

      {/* Sweetener Packets Display */}
      <section className="ss-section">
        <div className="ss-container ss-narrow">
          <RevealSection>
            <h2 className="ss-headline ss-headline-md" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              The Color Language of Sweetness
            </h2>
            <p className="ss-body" style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--ss-text-secondary)' }}>
              Each packet color became synonymous with its sweetener
            </p>
          </RevealSection>

          <RevealSection>
            <SweetenerPackets />
          </RevealSection>
        </div>
      </section>

      {/* Consumption Data */}
      <section className="ss-section ss-section-elevated">
        <div className="ss-container ss-narrow">
          <RevealSection>
            <h2 className="ss-headline ss-headline-md" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Peak and Decline
            </h2>
          </RevealSection>

          <ConsumptionChart />

          <RevealSection>
            <p className="ss-body" style={{ marginTop: '2rem' }}>
              In 1999, American per capita sweetener consumption peaked at 153.6 pounds
              per year. By 2023, it had declined to 123.5 pounds—a 19.6% drop. High-fructose
              corn syrup, once hailed as sugar\u2019s cheap replacement, fell 40% from its 2000 peak.
            </p>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="ss-body">
              Yet even at the reduced level, Americans consume far more sweetness than
              any previous generation. We\u2019ve stepped back from the cliff\u2019s edge, but
              we haven\u2019t left the mountain.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* The Unsettled Science */}
      <section className="ss-section">
        <div className="ss-container ss-narrow">
          <RevealSection>
            <h2 className="ss-headline ss-headline-md" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              The Unsettled Science
            </h2>
          </RevealSection>

          <RevealSection>
            <p className="ss-body">
              In May 2023, the World Health Organization issued a guideline that stunned
              the sweetener industry: \u201CWHO suggests that non-sugar sweeteners not be used
              as a means of achieving weight control.\u201D
            </p>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="ss-body">
              Two months later, the International Agency for Research on Cancer classified
              aspartame as \u201Cpossibly carcinogenic to humans\u201D (Group 2B)—the same category
              as aloe vera and pickled vegetables.
            </p>
          </RevealSection>
          <RevealSection delay={2}>
            <p className="ss-body">
              But the same day, the Joint FAO/WHO Expert Committee on Food Additives
              reaffirmed aspartame\u2019s acceptable daily intake at 40 mg/kg body weight—
              unchanged since the 1980s.
            </p>
          </RevealSection>
          <RevealSection delay={3}>
            <p className="ss-body">
              The message was contradictory. \u201CPossibly carcinogenic\u201D but also \u201Csafe at
              current levels\u201D? The science is genuinely unsettled. The regulatory pendulum
              keeps swinging.
            </p>
          </RevealSection>
          <RevealSection>
            <QuoteBlock
              quote="The evidence does not support the WHO recommendation to avoid non-sugar sweeteners for weight management."
              author="UK SACN"
              title="Scientific Advisory Committee on Nutrition"
              year="April 2025"
            />
          </RevealSection>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Closing */}
      <section className="ss-section">
        <div className="ss-container ss-narrow">
          <RevealSection>
            <p className="ss-body" style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: '2rem' }}>
              After 145 years, we still don\u2019t have consensus on whether artificial
              sweeteners help us, harm us, or simply provide sweetness without clear
              consequence.
            </p>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="ss-body" style={{ textAlign: 'center', color: 'var(--ss-text-secondary)' }}>
              The quest for sweetness without sugar continues.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="ss-section ss-section-elevated" style={{ paddingBottom: '4rem' }}>
        <div className="ss-container ss-narrow" style={{ textAlign: 'center' }}>
          <p className="ss-caption" style={{ marginBottom: '1rem' }}>
            Research and writing by Esy
          </p>
          <p className="ss-caption">
            Sources include FDA Federal Register, USDA ERS, WHO, JECFA, Science History Institute,
            Library of Congress, and 50+ peer-reviewed publications.
          </p>
          <p className="ss-caption" style={{ marginTop: '1rem' }}>
            See full citations in the research package.
          </p>
        </div>
      </footer>
    </article>
  );
}
