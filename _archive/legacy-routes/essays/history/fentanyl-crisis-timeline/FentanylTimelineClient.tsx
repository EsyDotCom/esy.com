"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import "./fentanyl-crisis-timeline.css";

// ============================================================================
// TYPES
// ============================================================================

interface Source {
  title: string;
  url: string;
  type: "government" | "journal" | "research";
}

interface Era {
  id: string;
  years: string;
  title: string;
  shortTitle: string;
}

// ============================================================================
// DATA
// ============================================================================

const ERAS: Era[] = [
  { id: "laboratory", years: "1959–1970", title: "Laboratory Success", shortTitle: "1959–70" },
  { id: "expansion", years: "1980s–1990s", title: "Pain Management Expansion", shortTitle: "1980s–90s" },
  { id: "reckoning", years: "2000–2010", title: "Prescription Opioid Reckoning", shortTitle: "2000–10" },
  { id: "illicit", years: "2013–2016", title: "Illicit Manufacturing", shortTitle: "2013–16" },
  { id: "inflection", years: "2017–2019", title: "Statistical Inflection Point", shortTitle: "2017–19" },
  { id: "pandemic", years: "2020–2022", title: "Pandemic Acceleration", shortTitle: "2020–22" },
  { id: "present", years: "2023–Present", title: "Structural Entrenchment", shortTitle: "2023–" },
];

const SOURCES: Source[] = [
  {
    title: "CDC WONDER Database - Drug Overdose Deaths",
    url: "https://wonder.cdc.gov/mcd.html",
    type: "government",
  },
  {
    title: "CDC Vital Signs: Fentanyl",
    url: "https://www.cdc.gov/vitalsigns/fentanyl/index.html",
    type: "government",
  },
  {
    title: "NIDA: Fentanyl DrugFacts",
    url: "https://nida.nih.gov/publications/drugfacts/fentanyl",
    type: "government",
  },
  {
    title: "NIDA: Overdose Death Rates",
    url: "https://nida.nih.gov/research-topics/trends-statistics/overdose-death-rates",
    type: "government",
  },
  {
    title: "DEA National Drug Threat Assessment 2024",
    url: "https://www.dea.gov/documents/2024/05/dea-national-drug-threat-assessment",
    type: "government",
  },
  {
    title: "DEA Facts About Fentanyl",
    url: "https://www.dea.gov/resources/facts-about-fentanyl",
    type: "government",
  },
  {
    title: "Gladden et al. Trends in Fentanyl Drug Seizures and Overdose Fatalities. JAMA, 2019.",
    url: "https://jamanetwork.com/journals/jama/fullarticle/2737326",
    type: "journal",
  },
  {
    title: "Ciccarone D. Fentanyl and the US Opioid Epidemic. NEJM, 2021.",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMp2101062",
    type: "journal",
  },
  {
    title: "Volkow ND, Blanco C. The Opioid Crisis—A Perspective. NEJM, 2021.",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMra2032722",
    type: "journal",
  },
  {
    title: "RAND Corporation: The Future of Fentanyl and Other Synthetic Opioids",
    url: "https://www.rand.org/pubs/research_reports/RR3117.html",
    type: "research",
  },
  {
    title: "Stanford-Lancet Commission on the North American Opioid Crisis",
    url: "https://www.thelancet.com/commissions/north-american-opioid-crisis",
    type: "research",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Progress Bar - Linear, understated
 */
const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ft-progress" aria-hidden="true">
      <div className="ft-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

/**
 * Timeline Navigation - Horizontal scrollable era selector
 */
const TimelineNav: React.FC<{ activeEra: string }> = ({ activeEra }) => {
  const scrollToEra = (eraId: string) => {
    const element = document.getElementById(`era-${eraId}`);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <nav className="ft-timeline-nav" aria-label="Timeline navigation">
      <div className="ft-timeline-nav-inner">
        {ERAS.map((era) => (
          <button
            key={era.id}
            className={`ft-timeline-nav-item ${activeEra === era.id ? "active" : ""}`}
            onClick={() => scrollToEra(era.id)}
            aria-current={activeEra === era.id ? "true" : undefined}
          >
            <span className="ft-timeline-nav-year">{era.shortTitle}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

/**
 * Era Section - Individual timeline period
 */
const EraSection: React.FC<{
  era: Era;
  children: React.ReactNode;
  causalLink?: string;
}> = ({ era, children, causalLink }) => {
  return (
    <section id={`era-${era.id}`} className="ft-era" data-era={era.id}>
      <div className="ft-era-marker" aria-hidden="true" />
      <header className="ft-era-header">
        <p className="ft-era-years">{era.years}</p>
        <h2 className="ft-era-title">{era.title}</h2>
      </header>
      <div className="ft-prose">{children}</div>
      {causalLink && (
        <div className="ft-causal">
          <p className="ft-causal-label">Transition</p>
          <p className="ft-causal-text">{causalLink}</p>
        </div>
      )}
    </section>
  );
};

/**
 * Data Table - For comparative information
 */
const DataTable: React.FC<{
  headers: string[];
  rows: (string | React.ReactNode)[][];
}> = ({ headers, rows }) => {
  return (
    <div className="ft-table-container">
      <table className="ft-table">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Stat Callout - Single statistic highlight
 */
const StatCallout: React.FC<{
  number: string;
  label: string;
  source: string;
}> = ({ number, label, source }) => {
  return (
    <div className="ft-stat">
      <span className="ft-stat-number">{number}</span>
      <span className="ft-stat-label">{label}</span>
      <span className="ft-stat-source">{source}</span>
    </div>
  );
};

/**
 * Sources Section
 */
const SourcesSection: React.FC<{ sources: Source[] }> = ({ sources }) => {
  const grouped = {
    government: sources.filter((s) => s.type === "government"),
    journal: sources.filter((s) => s.type === "journal"),
    research: sources.filter((s) => s.type === "research"),
  };

  return (
    <section className="ft-sources">
      <div className="ft-sources-inner">
        <h3 className="ft-sources-title">Sources & References</h3>

        {grouped.government.length > 0 && (
          <div className="ft-sources-group">
            <h4 className="ft-sources-group-title">Government Sources</h4>
            <ul className="ft-sources-list">
              {grouped.government.map((source, index) => (
                <li key={index}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {grouped.journal.length > 0 && (
          <div className="ft-sources-group">
            <h4 className="ft-sources-group-title">Peer-Reviewed Journals</h4>
            <ul className="ft-sources-list">
              {grouped.journal.map((source, index) => (
                <li key={index}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {grouped.research.length > 0 && (
          <div className="ft-sources-group">
            <h4 className="ft-sources-group-title">Research Institutions</h4>
            <ul className="ft-sources-list">
              {grouped.research.map((source, index) => (
                <li key={index}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="ft-sources-note">
          All statistical claims in this essay are sourced from CDC, NIH, DEA, or peer-reviewed
          publications. Mortality data reflects provisional counts as of the stated year.
        </p>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function FentanylTimelineClient() {
  const [activeEra, setActiveEra] = useState("laboratory");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eraId = entry.target.id.replace("era-", "");
            setActiveEra(eraId);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
    );

    ERAS.forEach((era) => {
      const element = document.getElementById(`era-${era.id}`);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <article className="fentanyl-timeline">
      {/* Header */}
      <header className="ft-header">
        <Link href="/essays" className="ft-header-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Essays
        </Link>
        <span className="ft-header-title">Timeline Essay</span>
        <span className="ft-header-meta">15 min read</span>
      </header>

      <ProgressBar />

      {/* Hero */}
      <section className="ft-hero">
        <p className="ft-hero-label">A Chronological Examination</p>
        <h1 className="ft-hero-title">Fentanyl: A Timeline of a Synthetic Drug</h1>
        <p className="ft-hero-subtitle">From Medical Innovation to Public Health Crisis</p>
        <p className="ft-hero-question">
          How did a hospital anesthetic become a leading cause of overdose deaths?
        </p>
        <div className="ft-scroll-indicator" aria-hidden="true">
          <span>Scroll</span>
          <div className="ft-scroll-line" />
        </div>
      </section>

      {/* Main Content */}
      <div className="ft-content">
        {/* Opening Context */}
        <section className="ft-opening">
          <p className="ft-opening-label">Context</p>
          <div className="ft-prose">
            <p className="ft-lede">
              Fentanyl is a synthetic opioid, meaning it is manufactured in laboratories rather than
              derived from the opium poppy. It is approximately 50 to 100 times more potent than
              morphine and roughly 50 times more potent than heroin.
            </p>
            <p>
              The drug was originally developed for a specific medical purpose: surgical anesthesia.
              Its potency and rapid onset made it valuable in controlled hospital settings, where
              precise dosing and immediate effect were advantages.
            </p>
            <p>
              Synthetic opioids behave differently than plant-based opioids in several consequential
              ways. They do not require agricultural land, seasonal cultivation, or extensive supply
              chains. They can be manufactured in small facilities with precursor chemicals. A
              kilogram of fentanyl has the pharmacological equivalent of roughly 50 kilograms of
              heroin. These characteristics—compactness, potency, and independence from
              agriculture—would later prove significant.
            </p>
            <p>
              This timeline traces how fentanyl moved through distinct phases: from a legitimate
              pharmaceutical achievement, through the expansion of pain management, into illicit
              markets, and finally to its current position as the dominant opioid in the American
              drug supply.
            </p>
          </div>
        </section>

        {/* Timeline Navigation */}
        <TimelineNav activeEra={activeEra} />

        {/* Era 1: Laboratory Success */}
        <EraSection
          era={ERAS[0]}
          causalLink="Fentanyl's success in surgical settings established it as a legitimate, powerful pain management tool. This reputation would later enable its expansion beyond operating rooms into chronic pain treatment."
        >
          <p>
            In 1960, Paul Janssen synthesized fentanyl at Janssen Pharmaceutica in Beerse, Belgium.
            Janssen was searching for more potent analgesics with better pharmacological profiles
            than existing options. Fentanyl emerged from this research as a compound with rapid
            onset, short duration, and exceptional potency.
          </p>
          <p>
            The medical rationale for potency was straightforward. In surgical anesthesia, a drug
            that works quickly and clears quickly allows for precise control. The patient can be
            brought to the required depth of anesthesia and returned to consciousness in a
            predictable window. Potency meant smaller doses, which meant less total drug in the
            system.
          </p>
          <p>
            The U.S. Food and Drug Administration approved fentanyl (marketed as Sublimaze) for
            intravenous use in 1968. Its adoption in surgical settings was rapid. Anesthesiologists
            valued its controllability. Hospitals integrated it into standard protocols.
          </p>
          <StatCallout number="50–100×" label="more potent than morphine" source="NIDA" />
          <p>
            At this stage, fentanyl existed almost exclusively in hospital settings under direct
            medical supervision. Diversion was minimal. The drug served its intended purpose well.
          </p>
        </EraSection>

        {/* Era 2: Pain Management Expansion */}
        <EraSection
          era={ERAS[1]}
          causalLink="The expansion of legitimate fentanyl products created familiarity with the drug. Meanwhile, the prescription opioid crisis was building with OxyContin, which would later create the demand conditions fentanyl would fill."
        >
          <p>
            The 1980s and 1990s saw a significant shift in medical attitudes toward pain. A growing
            body of advocacy argued that chronic pain was undertreated, that physicians were too
            hesitant to prescribe adequate pain relief, and that this represented a failure of care.
          </p>
          <p>
            In 1990, the American Pain Society launched its campaign to make pain the &quot;fifth
            vital sign.&quot; The Joint Commission subsequently incorporated pain assessment into its
            accreditation standards. Hospitals and physicians faced institutional pressure to treat
            pain more aggressively.
          </p>
          <p>
            Pharmaceutical companies responded. In 1991, the FDA approved Duragesic, the first
            transdermal fentanyl patch. This was a significant step: fentanyl could now be used
            outside hospital settings, prescribed for chronic pain management and administered at
            home.
          </p>
          <p>
            In 1998, Actiq—an oral fentanyl lozenge—received approval for breakthrough cancer pain.
            The drug was moving from surgical suites to medicine cabinets.
          </p>
          <p>
            Early warning signs appeared in this period. California saw deaths from &quot;China
            White,&quot; an illicit fentanyl analog, in the 1980s. Some diversion from medical
            settings was documented. But these incidents remained limited and contained. The larger
            crisis would come from a different direction.
          </p>
        </EraSection>

        {/* Era 3: Prescription Opioid Reckoning */}
        <EraSection
          era={ERAS[2]}
          causalLink="Regulatory tightening on prescription opioids, combined with OxyContin reformulation, displaced demand. Users dependent on prescription opioids increasingly turned to heroin—and soon, suppliers would discover that fentanyl was far more economical than heroin."
        >
          <p>
            The prescription opioid crisis that defined this era centered on OxyContin, not
            fentanyl. OxyContin, approved in 1995 and aggressively marketed, drove a dramatic
            expansion in opioid prescribing. By the mid-2000s, the consequences were becoming clear:
            widespread addiction, overdose deaths, and communities devastated by dependence.
          </p>
          <p>
            In 2007, Purdue Pharma pleaded guilty to misbranding OxyContin and paid a $600 million
            fine. This marked the beginning of regulatory reckoning. States tightened prescription
            monitoring. Physicians faced increased scrutiny.
          </p>
          <p>
            In 2010, Purdue reformulated OxyContin to make it harder to crush and abuse. The new
            formulation was difficult to snort or inject. This was a public health intervention with
            an unintended consequence: it created demand displacement. Users dependent on
            prescription opioids needed alternatives.
          </p>
          <p>
            Fentanyl was not the primary driver of this era. Prescription fentanyl patches saw some
            diversion, but illicitly manufactured fentanyl remained rare. The infrastructure did not
            yet exist.
          </p>
          <p>
            The prescription opioid crisis created a population of dependent users. When their
            supply was restricted, they did not stop using. They sought alternatives.
          </p>
        </EraSection>

        {/* Era 4: Illicit Manufacturing */}
        <EraSection
          era={ERAS[3]}
          causalLink="Once illicit fentanyl manufacturing was established, it was economically inevitable that it would displace heroin. The supply-side economics made heroin obsolete for traffickers."
        >
          <p>
            In 2013, the Drug Enforcement Administration detected a sharp increase in fentanyl
            seizures. This fentanyl was different: it was not diverted from pharmaceutical
            production. It was manufactured clandestinely.
          </p>
          <p>
            Investigation revealed the supply chain. Chemical suppliers in China were shipping
            fentanyl precursors—particularly NPP and ANPP—to Mexico. Mexican trafficking
            organizations, already controlling heroin distribution to the United States, began
            producing fentanyl.
          </p>
          <p>
            The economics were compelling:
          </p>
          <DataTable
            headers={["Factor", "Heroin", "Fentanyl"]}
            rows={[
              ["Source", "Poppy cultivation", "Chemical synthesis"],
              ["Geography required", "Agricultural land", "Small laboratory"],
              ["Volume needed for distribution", "Large", "Minimal"],
              ["Detection risk in transit", "Higher", "Lower"],
              ["Profit margin", "Lower", "Higher"],
            ]}
          />
          <p>
            A kilogram of fentanyl, synthesized from precursor chemicals, could generate profits
            equivalent to 50 kilograms of heroin. Shipments were smaller and harder to detect. No
            poppy fields needed to be cultivated, protected, or harvested.
          </p>
          <p>
            By 2016, fentanyl deaths had tripled from 2013 levels. The DEA issued a national alert.
            The transition from pharmaceutical diversion to clandestine synthesis represented a
            fundamental change in the market.
          </p>
          <StatCallout number="19,413" label="synthetic opioid deaths in 2016" source="CDC" />
        </EraSection>

        {/* Era 5: Statistical Inflection Point */}
        <EraSection
          era={ERAS[4]}
          causalLink="The mixing phenomenon and market saturation meant that by 2019, avoiding fentanyl had become nearly impossible for people using illicit drugs. Then the pandemic arrived."
        >
          <p>
            In 2017, for the first time, synthetic opioids killed more Americans than heroin.
            Fentanyl had become the dominant opioid in illicit markets.
          </p>
          <p>
            The mortality data accelerated. In 2017: 28,466 deaths. In 2018: 31,335. In 2019:
            36,359. Synthetic opioids now accounted for 48% of all overdose deaths.
          </p>
          <p>
            A new phenomenon emerged: mixing. Fentanyl began appearing in drugs sold as cocaine. It
            appeared in methamphetamine. Users were consuming fentanyl without knowing it, without
            tolerance to opioids, without understanding why they were overdosing.
          </p>
          <p>
            Four factors explain why fentanyl deaths scale faster than heroin deaths:
          </p>
          <p>
            <strong>Inconsistent dosing.</strong> Street drugs vary wildly in fentanyl
            concentration. A batch that is survivable one day may be lethal the next.
          </p>
          <p>
            <strong>No tolerance calibration.</strong> Users cannot gauge a safe dose. The margin
            between intoxication and overdose is narrow and unpredictable.
          </p>
          <p>
            <strong>The mixing phenomenon.</strong> Fentanyl contamination of non-opioid drugs
            exposes populations with no opioid tolerance.
          </p>
          <p>
            <strong>Rapid onset.</strong> Fentanyl acts quickly. There is less time to recognize an
            overdose and intervene.
          </p>
          <p>
            By the end of 2019, no region of the country was unaffected. Fentanyl had saturated the
            illicit drug supply.
          </p>
        </EraSection>

        {/* Era 6: Pandemic Acceleration */}
        <EraSection
          era={ERAS[5]}
          causalLink="By 2022, fentanyl was no longer displacing heroin—it had replaced it. The market had restructured around synthetic opioids. Recovery would require more than interdiction."
        >
          <p>
            In March 2020, COVID-19 lockdowns began. The pandemic would accelerate trends already in
            motion.
          </p>
          <p>
            Treatment facilities closed or reduced capacity. In-person support meetings—Narcotics
            Anonymous, SMART Recovery—were suspended. Individuals in recovery lost access to the
            social infrastructure that supported their sobriety.
          </p>
          <p>
            Isolation increased. Mental health stressors compounded. The pandemic created conditions
            that increased vulnerability among people who use drugs.
          </p>
          <p>
            Supply chains were disrupted, but not equally. Heroin supply, dependent on agricultural
            production and larger shipments, was more affected. Fentanyl, requiring smaller
            shipments of precursor chemicals and domestic processing, proved more resilient.
            Fentanyl&apos;s share of the illicit opioid market increased further.
          </p>
          <StatCallout number="70,601" label="synthetic opioid deaths in 2021" source="CDC" />
          <p>
            In 2021, the United States recorded more than 107,000 overdose deaths—the first time the
            annual count exceeded 100,000. Synthetic opioids were involved in approximately two-thirds
            of these deaths.
          </p>
          <p>
            The pandemic did not cause this crisis. It accelerated dynamics that were already
            established. The pandemic disrupted treatment access, increased isolation, and favored
            fentanyl&apos;s supply chain advantages.
          </p>
        </EraSection>

        {/* Era 7: Structural Entrenchment */}
        <EraSection era={ERAS[6]}>
          <p>
            By 2023, heroin had become rare in most American drug markets. Fentanyl was no longer
            displacing heroin; it had replaced it. Users seeking opioids now expected fentanyl, not
            heroin. The market had restructured.
          </p>
          <p>
            Mexican trafficking organizations control the primary supply. Following increased
            regulation of fentanyl precursors in China in 2019, production shifted to alternative
            precursor chemicals. Supply chains adapted. Decentralized pressing operations—where
            fentanyl powder is pressed into counterfeit pills—operate within the United States.
          </p>
          <p>
            Policy responses remain divided between two frameworks. Law enforcement emphasizes
            interdiction, border control, and precursor regulation. Public health emphasizes harm
            reduction, treatment access, and naloxone distribution. Resources and attention are
            distributed across both approaches.
          </p>
          <p>
            This phase differs from previous drug crises. Previous epidemics—crack cocaine,
            methamphetamine, heroin—eventually receded. Synthetic opioid markets may not follow this
            pattern.
          </p>
          <p>
            Five structural factors distinguish this crisis:
          </p>
          <p>
            <strong>No agricultural constraint.</strong> Production does not depend on crops,
            weather, or arable land.
          </p>
          <p>
            <strong>Established infrastructure.</strong> Supply chains are mature and adaptable.
          </p>
          <p>
            <strong>Economic lock-in.</strong> Fentanyl is more profitable than heroin for
            suppliers.
          </p>
          <p>
            <strong>Existing demand base.</strong> A population dependent on opioids exists and
            seeks supply.
          </p>
          <p>
            <strong>Harm reduction gaps.</strong> Naloxone access remains uneven. Treatment capacity
            is insufficient.
          </p>
          <DataTable
            headers={["Year", "Synthetic Opioid Deaths", "% of All Overdose Deaths"]}
            rows={[
              [<span key="y13" className="ft-table-emphasis">2013</span>, "3,105", "8%"],
              ["2016", "19,413", "29%"],
              ["2019", "36,359", "48%"],
              ["2021", "70,601", "66%"],
              [<span key="y22" className="ft-table-emphasis">2022</span>, "73,838", "68%"],
            ]}
          />
        </EraSection>

        {/* Closing */}
        <section className="ft-closing">
          <p className="ft-closing-label">Conclusion</p>
          <div className="ft-prose">
            <p>
              Fentanyl is not simply another drug epidemic. It represents a structural shift in how
              synthetic drugs can be produced, distributed, and entrenched in illicit markets.
            </p>
            <p>
              Synthetic opioids are uniquely difficult to contain for reasons that are now clear:
              they do not require agricultural production, they can be manufactured in small
              facilities, their potency means small shipments carry enormous value, and once
              established, the economic incentives favor their persistence over less potent
              alternatives.
            </p>
            <p>
              The timeline from hospital anesthetic to dominant street opioid spans six decades. It
              moved through legitimate medicine, through the expansion of pain treatment, through
              regulatory response to prescription opioids, through the economics of illicit supply,
              through a pandemic that disrupted treatment while favoring synthetic distribution.
            </p>
            <p>
              At each transition, the next phase followed from conditions established in the prior
              phase. The trajectory was not random. It was not inevitable in every detail. But the
              underlying logic—potency, compactness, independence from agriculture, profit
              margins—made fentanyl increasingly advantageous for suppliers as conditions evolved.
            </p>
          </div>
          <blockquote className="ft-closing-statement">
            Fentanyl&apos;s history suggests that once a synthetic drug becomes structurally
            embedded, the problem is no longer about supply alone—but about time, systems, and
            adaptation.
          </blockquote>
        </section>
      </div>

      {/* Sources */}
      <SourcesSection sources={SOURCES} />

      {/* Footer */}
      <footer className="ft-footer">
        <Link href="/essays" className="ft-footer-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Essays
        </Link>
      </footer>
    </article>
  );
}






