"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./the-word-robot.css";

// ==================== TYPES ====================

interface Figure {
  id: string;
  name: string;
  role: string;
  years: string;
  contributions: string[];
  quote?: string;
  era: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

// ==================== DATA ====================

const keyFigures: Figure[] = [
  {
    id: "karel-capek",
    name: "Karel Čapek",
    role: "Father of the Robot",
    years: "1890–1938",
    contributions: [
      "Wrote R.U.R. (Rossum's Universal Robots), 1920",
      "Introduced 'robot' to the world through theatre",
      "Died just before Nazi occupation of Czechoslovakia"
    ],
    quote: "I did not invent the word 'robot,' my brother Josef did.",
    era: "1920s"
  },
  {
    id: "josef-capek",
    name: "Josef Čapek",
    role: "The True Inventor",
    years: "1887–1945",
    contributions: [
      "Coined 'robot' from Czech 'robota' (forced labor)",
      "Cubist painter who gave the word its slavic roots",
      "Died in Bergen-Belsen concentration camp"
    ],
    era: "1920s"
  },
  {
    id: "fritz-lang",
    name: "Fritz Lang",
    role: "The Visualizer",
    years: "1890–1976",
    contributions: [
      "Directed Metropolis (1927)",
      "Created cinema's first iconic robot: the Maschinenmensch",
      "Established visual template: metallic, feminine, dangerous"
    ],
    era: "1920s"
  },
  {
    id: "isaac-asimov",
    name: "Isaac Asimov",
    role: "The Lawgiver",
    years: "1920–1992",
    contributions: [
      "Created Three Laws of Robotics (1942)",
      "Coined the term 'robotics'",
      "Wrote 500+ books reshaping robot imagination"
    ],
    quote: "A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
    era: "1940s"
  },
  {
    id: "joseph-engelberger",
    name: "Joseph Engelberger",
    role: "Father of Robotics",
    years: "1925–2015",
    contributions: [
      "Created Unimate, first industrial robot (1961)",
      "Deployed robots at General Motors",
      "Made robots practical, not fantastical"
    ],
    quote: "The key is to keep making robots more capable and less expensive.",
    era: "1960s"
  },
  {
    id: "masahiro-mori",
    name: "Masahiro Mori",
    role: "The Psychologist of Robots",
    years: "1927–present",
    contributions: [
      "Proposed 'uncanny valley' concept (1970)",
      "Explained why near-human robots disturb us",
      "Influenced robot design for decades"
    ],
    quote: "As robots appear more humanlike, our familiarity increases until we reach a point where the slightest deviation makes them seem eerie.",
    era: "1960s"
  },
  {
    id: "james-cameron",
    name: "James Cameron",
    role: "The Fear-Maker",
    years: "1954–present",
    contributions: [
      "Created the T-800 in The Terminator (1984)",
      "Crystallized robot-as-existential-threat",
      "'I'll be back' became shorthand for robotic menace"
    ],
    era: "1980s"
  },
  {
    id: "rodney-brooks",
    name: "Rodney Brooks",
    role: "The Domesticator",
    years: "1954–present",
    contributions: [
      "Co-founded iRobot, created Roomba (2002)",
      "Pioneered embodied AI and behavior-based robotics",
      "Changed 'robot' from threat to household appliance"
    ],
    quote: "The Roomba is not a robot that looks like a person. It's a robot that acts like a vacuum cleaner.",
    era: "2000s"
  },
  {
    id: "cynthia-breazeal",
    name: "Cynthia Breazeal",
    role: "The Relationship Builder",
    years: "1967–present",
    contributions: [
      "Created Kismet (1990s) and Jibo (2010s)",
      "Pioneered social robotics and emotional connection",
      "Leads MIT Media Lab's Personal Robots Group"
    ],
    quote: "The robots of the future will not be our slaves. They will be our partners.",
    era: "2000s"
  },
  {
    id: "hiroshi-ishiguro",
    name: "Hiroshi Ishiguro",
    role: "The Uncanny Pusher",
    years: "1963–present",
    contributions: [
      "Creates hyper-realistic humanoids (Geminoids)",
      "Made robot copy of himself",
      "Tests limits of human acceptance"
    ],
    quote: "I want to understand what it means to be human.",
    era: "2020s"
  },
  {
    id: "sherry-turkle",
    name: "Sherry Turkle",
    role: "The Critical Voice",
    years: "1948–present",
    contributions: [
      "Wrote 'Alone Together' (2011)",
      "Warns about preferring robots to humans",
      "Studies human-technology relationships at MIT"
    ],
    quote: "I worry about what happens when we care for robots more than we care for people.",
    era: "2020s"
  },
  {
    id: "david-levy",
    name: "David Levy",
    role: "The Prophet",
    years: "1945–present",
    contributions: [
      "Wrote 'Love and Sex with Robots' (2007)",
      "Predicted human-robot marriage by 2050",
      "Chess master turned AI researcher"
    ],
    era: "2020s"
  }
];

const timelineEvents: TimelineEvent[] = [
  { year: "1920", title: "R.U.R. Written", description: "Karel Čapek creates the word 'robot'" },
  { year: "1921", title: "R.U.R. Premieres", description: "Prague National Theatre, January 25" },
  { year: "1927", title: "Metropolis", description: "Fritz Lang's Maschinenmensch defines robot visuals" },
  { year: "1942", title: "Three Laws", description: "Asimov introduces robotics ethics" },
  { year: "1961", title: "Unimate", description: "First industrial robot at General Motors" },
  { year: "1970", title: "Uncanny Valley", description: "Mori explains our unease with humanoids" },
  { year: "1984", title: "The Terminator", description: "Robot-as-threat crystallizes in chrome" },
  { year: "2002", title: "Roomba", description: "Robot enters millions of homes" },
  { year: "2022", title: "ChatGPT", description: "AI called 'robot' despite no body" },
  { year: "2025", title: "105 Years", description: "The word continues to evolve" }
];

// ==================== HOOKS ====================

const useIntersectionReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// ==================== COMPONENTS ====================

// Assembly Line Progress Bar
const AssemblyProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const letters = ["R", "O", "B", "O", "T"];
  const eras = ["1920s", "1940s", "1960s", "1980s", "2020s"];
  
  const getLetterState = (index: number) => {
    const letterProgress = (index + 1) * 20;
    if (progress >= letterProgress) return "forged";
    if (progress >= letterProgress - 10) return "forging";
    return "";
  };

  return (
    <div className="assembly-progress-bar">
      <div className="assembly-conveyor">
        {letters.map((letter, i) => (
          <span 
            key={i} 
            className={`assembly-letter ${getLetterState(i)}`}
            data-era={eras[i]}
          >
            {letter}
          </span>
        ))}
      </div>
      <span className="assembly-percentage">{Math.round(progress)}%</span>
    </div>
  );
};

// Section wrapper with reveal
const Section: React.FC<{
  id: string;
  era?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, era, className = "", children }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <section 
      ref={ref}
      id={id}
      data-era={era}
      className={`${className} ${isVisible ? "visible" : ""}`}
    >
      {children}
    </section>
  );
};

// Figure Card
const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => (
  <div className="figure-card">
    <h4 className="figure-name">{figure.name}</h4>
    <p className="figure-role">{figure.role}</p>
    <p className="figure-years">{figure.years}</p>
    <ul className="figure-contributions">
      {figure.contributions.map((contrib, i) => (
        <li key={i}>{contrib}</li>
      ))}
    </ul>
    {figure.quote && (
      <p className="figure-quote">&ldquo;{figure.quote}&rdquo;</p>
    )}
  </div>
);

// Quote Monument
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
}> = ({ quote, attribution }) => (
  <div className="quote-monument">
    <blockquote>
      <p>&ldquo;{quote}&rdquo;</p>
      <cite>— {attribution}</cite>
    </blockquote>
  </div>
);

// Data Stat
const DataStat: React.FC<{
  value: string;
  label: string;
  source?: string;
}> = ({ value, label, source }) => (
  <div className="data-stat">
    <span className="data-value">{value}</span>
    <span className="data-label">{label}</span>
    {source && <span className="data-source">{source}</span>}
  </div>
);

// ==================== MAIN COMPONENT ====================

// Pre-computed spark positions to avoid hydration mismatch
const SPARK_POSITIONS = [
  { left: 15, top: 25, delay: 0.5, duration: 2.5 },
  { left: 35, top: 45, delay: 1.2, duration: 3.2 },
  { left: 55, top: 30, delay: 0.8, duration: 2.8 },
  { left: 75, top: 50, delay: 2.1, duration: 3.5 },
  { left: 25, top: 55, delay: 1.5, duration: 2.2 },
  { left: 65, top: 35, delay: 0.3, duration: 3.0 },
  { left: 45, top: 25, delay: 2.5, duration: 2.7 },
  { left: 85, top: 40, delay: 1.8, duration: 3.3 },
  { left: 20, top: 48, delay: 0.9, duration: 2.4 },
  { left: 70, top: 28, delay: 2.0, duration: 3.1 },
  { left: 40, top: 52, delay: 1.1, duration: 2.6 },
  { left: 60, top: 38, delay: 0.6, duration: 2.9 },
];

const TheWordRobotClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Figures by era
  const figuresByEra = useCallback((era: string) => 
    keyFigures.filter(f => f.era === era), 
  []);

  return (
    <div className="robot-essay">
      {/* Progress Bar */}
      <AssemblyProgressBar progress={scrollProgress} />

      {/* ==================== HERO SECTION ==================== */}
      <section className="robot-hero">
        <div className="robot-hero-bg">
          <div className="robot-hero-gradient" />
          <div className="robot-hero-sparks">
            {SPARK_POSITIONS.map((spark, i) => (
              <span 
                key={i} 
                className="spark" 
                style={{
                  left: `${spark.left}%`,
                  top: `${spark.top}%`,
                  animationDelay: `${spark.delay}s`,
                  animationDuration: `${spark.duration}s`
                }}
              />
            ))}
          </div>
        </div>
        <div className="robot-hero-content">
          <div className="robot-forging-text">
            <span>Forged in Fiction • Built in Reality</span>
          </div>
          <h1 className="robot-main-title">
            <span className="robot-title-main">ROBOT</span>
            <span className="robot-title-sub">Grand Machina</span>
          </h1>
          <p className="robot-tagline">
            The Word That Built Our Future, and Now Shares Our Bed
          </p>
          <div className="robot-meta">
            <DataStat value="105" label="Years Since R.U.R." />
            <DataStat value="14" label="Key Figures" />
            <DataStat value="6" label="Cultural Eras" />
          </div>
          <div className="robot-scroll-cue">
            <span>Scroll to begin the journey</span>
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>

      {/* ==================== CHAPTER 1: THE BIRTH ==================== */}
      <Section id="chapter-1" era="1920s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter One</span>
          <h2 className="chapter-title">ROBOTA → ROBOT</h2>
          <span className="chapter-temporal">Prague, 1920</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            The word &ldquo;robot&rdquo; carries its origin story in its DNA. Derived from Czech <strong>&ldquo;robota&rdquo;</strong>—meaning forced labor, corvée, or serfdom—the term was deliberately chosen to evoke the condition of workers under feudal or industrial subjugation. The etymology is prophecy: every debate we&apos;re still having about worker displacement, machine rebellion, and artificial agency was encoded in those five letters from the beginning.
          </p>
        </div>

        <QuoteMonument
          quote="I did not invent the word 'robot,' my brother Josef did. I was hesitating whether to call these artificial workers 'laborers' or 'labori'... Josef suggested 'robots.'"
          attribution="Karel Čapek, letter to Oxford English Dictionary, 1933"
        />

        <div className="content-block">
          <h3>R.U.R.: The Play That Named Our Future</h3>
          <p>
            On January 25, 1921, Karel Čapek&apos;s play <em>R.U.R. (Rossum&apos;s Universal Robots)</em> premiered at the National Theatre in Prague. The story followed artificial workers—manufactured biological beings designed to perform labor—who eventually rebel against their human masters.
          </p>
          <p>
            Crucially, Čapek&apos;s robots were not the metal machines we imagine today. They were <em>assembled biological beings</em>, closer to what we might now call replicants or androids. The word&apos;s first use contained both the promise of artificial labor AND the fear of rebellion.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("1920s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>

        <div className="content-block">
          <h3>Metropolis: The Visual Template</h3>
          <p>
            Six years after R.U.R., Fritz Lang&apos;s <em>Metropolis</em> (1927) gave robots their cinematic form. The Maschinenmensch—Machine-Human—established the visual language that would define robots for a century: metallic, feminine, simultaneously beautiful and dangerous. Lang&apos;s robot was forged in expressionist shadows, a chrome goddess that would echo through every science fiction film to follow.
          </p>
        </div>
      </Section>

      <div className="era-transition" />

      {/* ==================== CHAPTER 2: THE IMAGINATION ==================== */}
      <Section id="chapter-2" era="1940s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Two</span>
          <h2 className="chapter-title">The Operating System</h2>
          <span className="chapter-temporal">1942–1959</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            Before real robots existed, writers programmed our expectations. Fiction became the operating system for our imagination—installing hopes, fears, and ethical frameworks for machines that wouldn&apos;t exist for decades. No one wrote more code for this mental operating system than Isaac Asimov.
          </p>
        </div>

        <QuoteMonument
          quote="A robot may not injure a human being or, through inaction, allow a human being to come to harm."
          attribution="First Law of Robotics, Isaac Asimov, 'Runaround' (1942)"
        />

        <div className="content-block">
          <h3>The Laws That Bound Imagination</h3>
          <p>
            In 1942, Asimov introduced the Three Laws of Robotics in his short story &ldquo;Runaround.&rdquo; These weren&apos;t just plot devices—they were a counter-narrative to the &ldquo;Frankenstein complex,&rdquo; the assumption that artificial beings would inevitably turn on their creators.
          </p>
          <p>
            Asimov also coined the word <strong>&ldquo;robotics&rdquo;</strong> itself—the first use appears in his 1941 story &ldquo;Liar!&rdquo; He thought the word already existed. It didn&apos;t. He invented both the ethics and the science of a field that barely existed.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("1940s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      <div className="era-transition" />

      {/* ==================== CHAPTER 3: THE INDUSTRY ==================== */}
      <Section id="chapter-3" era="1960s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Three</span>
          <h2 className="chapter-title">Metal Meets Factory Floor</h2>
          <span className="chapter-temporal">1961–1979</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            In 1961, the word finally met metal. Unimate—the first industrial robot—was installed at a General Motors plant in New Jersey, handling red-hot die castings. The dream of artificial workers became a reality on the factory floor, and anxiety followed close behind.
          </p>
        </div>

        <div className="stats-grid">
          <DataStat value="1961" label="First Industrial Robot" />
          <DataStat value="GM" label="First Customer" />
          <DataStat value="$25K" label="Unimate Cost" />
        </div>

        <div className="content-block">
          <h3>The Father of Practical Robotics</h3>
          <p>
            Joseph Engelberger took robots from science fiction to the factory floor. His Unimate didn&apos;t look like Metropolis&apos;s chrome goddess—it was an arm, a tool, a worker. It didn&apos;t need to look human because it wasn&apos;t meant to be human. It was meant to do the dangerous, repetitive, soul-crushing work that humans shouldn&apos;t have to do.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("1960s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>

        <QuoteMonument
          quote="As robots appear more humanlike, our sense of their familiarity increases until we reach a point where the slightest deviation makes them seem eerie."
          attribution="Masahiro Mori, 'The Uncanny Valley' (1970)"
        />

        <div className="content-block">
          <h3>The Valley We&apos;ve Never Escaped</h3>
          <p>
            In 1970, roboticist Masahiro Mori proposed the &ldquo;uncanny valley&rdquo;—the hypothesis that our affinity for robots increases as they become more human-like, until a threshold where they become eerily almost-human, triggering revulsion. Only when robots become indistinguishable from humans does affinity return. We&apos;ve been designing around this valley ever since.
          </p>
        </div>
      </Section>

      <div className="era-transition" />

      {/* ==================== CHAPTER 4: THE FEAR PEAK ==================== */}
      <Section id="chapter-4" era="1980s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Four</span>
          <h2 className="chapter-title">The Rise of the Machines</h2>
          <span className="chapter-temporal">1984–1999</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            <em>&ldquo;I&apos;ll be back.&rdquo;</em> Three words that crystallized our deepest fears about artificial beings. The 1980s and 90s saw robot anxiety reach its cinematic peak—chrome nightmares that hunted us in the dark, that questioned what it meant to be human, that made us wonder if our creations would be our undoing.
          </p>
        </div>

        <QuoteMonument
          quote="I've seen things you people wouldn't believe... All those moments will be lost in time, like tears in rain."
          attribution="Roy Batty, Blade Runner (1982)"
        />

        <div className="content-block">
          <h3>The Terminator: Fear in Chrome</h3>
          <p>
            James Cameron&apos;s 1984 film gave our fears a face—or rather, a skull. The T-800 endoskeleton, with its red eyes glowing in the dark, became the definitive image of robot-as-threat. The machine that couldn&apos;t be reasoned with, couldn&apos;t be bargained with, that absolutely would not stop. Ever.
          </p>
          <p>
            But even as Terminator dominated nightmares, another robot was being born in Japanese labs. Sony&apos;s AIBO (1999) was a robot dog—cute, playful, explicitly not threatening. The same decade gave us both the apocalypse and the pet.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("1980s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      <div className="era-transition" />

      {/* ==================== CHAPTER 5: THE DOMESTICATION ==================== */}
      <Section id="chapter-5" era="2000s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Five</span>
          <h2 className="chapter-title">The Vacuum Cleaner Revolution</h2>
          <span className="chapter-temporal">2002–2015</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            In 2002, robots stopped threatening us and started cleaning our floors. The Roomba didn&apos;t look like a robot—no arms, no face, no chrome skeleton. It looked like a hockey puck. And it changed everything about how we imagine living with machines.
          </p>
        </div>

        <div className="stats-grid">
          <DataStat value="40M+" label="Roombas Sold" source="iRobot, 2023" />
          <DataStat value="2004" label="Spirit Lands on Mars" />
          <DataStat value="$3.7M" label="Jibo Crowdfunding" />
        </div>

        <QuoteMonument
          quote="The Roomba is not a robot that looks like a person. It's a robot that acts like a vacuum cleaner."
          attribution="Rodney Brooks, co-founder of iRobot"
        />

        <div className="content-block">
          <h3>Function Over Form</h3>
          <p>
            Rodney Brooks understood something crucial: the Roomba succeeded because it didn&apos;t try to be human. It was a tool that happened to be autonomous. You didn&apos;t anthropomorphize it... except that people did. They named their Roombas. They felt sad when their Roombas got stuck. They filmed their cats riding on Roombas.
          </p>
          <p>
            Meanwhile, on Mars, Spirit and Opportunity became robotic heroes. When Opportunity finally stopped transmitting in 2018, after 15 years, people genuinely mourned. We had formed relationships with machines 140 million miles away.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("2000s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      <div className="era-transition" />

      {/* ==================== CHAPTER 6: THE COEXISTENCE ==================== */}
      <Section id="chapter-6" era="2020s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Six</span>
          <h2 className="chapter-title">Living, Working, Loving Machines</h2>
          <span className="chapter-temporal">2016–2025</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            The word &ldquo;robot&rdquo; is unbound. It now covers Boston Dynamics&apos; backflipping Atlas AND ChatGPT&apos;s disembodied text. It names factory workers AND bedroom companions. We work alongside robots, trust them with surgery, form emotional bonds with them—and some of us want more. The question is no longer &ldquo;will we live with robots?&rdquo; but &ldquo;how do we live with them ethically?&rdquo;
          </p>
        </div>

        <div className="stats-grid">
          <DataStat value="72%" label="Americans Worried About Automation" source="Pew Research, 2017" />
          <DataStat value="93%" label="Tech Leaders Optimistic" source="Just Capital, 2025" />
        </div>

        <div className="content-block">
          <h3>The Intimacy Question</h3>
          <p>
            In 2007, researcher David Levy predicted that humans would marry robots by 2050. His book <em>Love and Sex with Robots</em> was controversial then—it&apos;s becoming less so now. Companion robots exist. Sex robots exist. The ethical frameworks are still catching up.
          </p>
          <p>
            Kate Devlin, author of <em>Turned On</em>, argues that the question isn&apos;t whether people will form intimate relationships with robots—they already are—but how we design these relationships ethically. What does consent mean when one party is artificial? What happens when lonely people prefer synthetic companions to human ones?
          </p>
        </div>

        <QuoteMonument
          quote="We are at a point where we are willing to accept a robot as a companion... I worry about what happens when we care for robots more than we care for people."
          attribution="Sherry Turkle, 'Alone Together' (2011)"
        />

        <div className="figures-grid">
          {figuresByEra("2020s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>

        <div className="content-block">
          <h3>The Humanoid Race</h3>
          <p>
            Boston Dynamics&apos; Atlas does backflips. Figure&apos;s humanoid robots are being tested in warehouses. Tesla&apos;s Optimus promises a robot in every home. After decades of avoiding the uncanny valley by making robots obviously robotic, we&apos;re now racing to cross it entirely. The question Ishiguro keeps asking—&ldquo;What does it mean to be human?&rdquo;—is becoming urgent.
          </p>
        </div>
      </Section>

      {/* ==================== CONCLUSION ==================== */}
      <Section id="conclusion" className="conclusion">
        <h2 className="conclusion-title">105 Years of Robot</h2>
        <p className="conclusion-text">
          A single Czech word, suggested by an artist to his playwright brother in 1920, became the framework through which humanity imagines its relationship with artificial beings. &ldquo;Robota&rdquo;—forced labor—encoded every debate we&apos;re still having: about work, about consciousness, about rights, about intimacy, about what it means to create beings in our image.
        </p>
        <p className="conclusion-text">
          The word &ldquo;robot&rdquo; is still evolving. It now covers things the Čapek brothers never imagined—disembodied AI, emotional companions, surgical assistants, potential lovers. The etymology remains prophetic: we created artificial workers, and now we must decide what kind of relationship we want with them.
        </p>
        <p className="conclusion-question">
          What will &ldquo;robot&rdquo; mean in 2120?
        </p>
      </Section>

      {/* ==================== TIMELINE ==================== */}
      <Section id="timeline" className="chapter">
        <div className="chapter-header">
          <h2 className="chapter-title" style={{ color: 'var(--color-brushed-chrome)' }}>Timeline: 105 Years</h2>
        </div>
        <div className="timeline">
          {timelineEvents.map((event, i) => (
            <div key={i} className="timeline-event">
              <span className="timeline-year">{event.year}</span>
              <span className="timeline-dot" />
              <div className="timeline-content">
                <p className="timeline-title">{event.title}</p>
                <p className="timeline-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <h2 className="sources-title">Sources & Further Reading</h2>
        <div className="sources-grid">
          <div className="source-category">
            <h3 className="source-category-title">Primary Texts</h3>
            <ul className="source-list">
              <li>Čapek, Karel. <em>R.U.R. (Rossum&apos;s Universal Robots)</em>, 1920</li>
              <li>Asimov, Isaac. <em>I, Robot</em>, 1950</li>
              <li>Mori, Masahiro. &ldquo;The Uncanny Valley,&rdquo; <em>Energy</em>, 1970</li>
            </ul>
          </div>
          <div className="source-category">
            <h3 className="source-category-title">Contemporary Research</h3>
            <ul className="source-list">
              <li>Levy, David. <em>Love and Sex with Robots</em>, 2007</li>
              <li>Turkle, Sherry. <em>Alone Together</em>, 2011</li>
              <li>Devlin, Kate. <em>Turned On: Science, Sex and Robots</em>, 2018</li>
            </ul>
          </div>
          <div className="source-category">
            <h3 className="source-category-title">Data Sources</h3>
            <ul className="source-list">
              <li>Pew Research Center — Americans and Automation (2017)</li>
              <li>IEEE Spectrum — History of Robotics</li>
              <li>Oxford English Dictionary — &ldquo;Robot&rdquo; etymology</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="robot-footer">
        <p className="footer-logo">ROBOT</p>
        <p className="footer-text">A Visual Essay by Esy.com</p>
      </footer>
    </div>
  );
};

export default TheWordRobotClient;
