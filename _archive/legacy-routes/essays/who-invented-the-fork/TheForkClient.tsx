"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import './who-invented-the-fork.css';

const TheForkClient = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Progress bar
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = (scrollTop / docHeight) * 100;
      setProgress(progressPercent);

      // Parallax for hero background
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${scrollTop * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Update nav dots
          const sectionId = entry.target.id;
          if (sectionId && sectionId.startsWith('section-')) {
            const sectionNum = parseInt(sectionId.split('-')[1]);
            setActiveSection(sectionNum);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-in, section[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initial animation trigger for hero
    setTimeout(() => {
      document.querySelectorAll('.hero-content .animate-in').forEach((el) => {
        el.classList.add('visible');
      });
    }, 100);
  }, []);

  const scrollToSection = (sectionNum: number) => {
    const section = document.getElementById(`section-${sectionNum}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="scrollytelling-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Navigation Dots */}
      <nav className="nav-dots">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className={`nav-dot ${activeSection === num ? 'active' : ''}`}
            onClick={() => scrollToSection(num)}
            aria-label={`Go to section ${num + 1}`}
          />
        ))}
      </nav>

      {/* Hero Section */}
      <section className="section-dark noise-overlay" id="section-0">
        <div className="hero-bg" ref={heroBgRef} />
        <div className="hero-content">
          <svg className="hero-fork animate-float" viewBox="0 0 100 400">
            <defs>
              <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8E8E8" />
                <stop offset="30%" stopColor="#B8B8B8" />
                <stop offset="50%" stopColor="#F5F5F5" />
                <stop offset="70%" stopColor="#A0A0A0" />
                <stop offset="100%" stopColor="#D0D0D0" />
              </linearGradient>
            </defs>
            <path
              d="M30 10 L30 100 Q30 120 35 140 L35 380 Q35 390 40 390 L60 390 Q65 390 65 380 L65 140 Q70 120 70 100 L70 10 M30 10 L30 100 M45 10 L45 100 M55 10 L55 100 M70 10 L70 100"
              fill="none"
              stroke="url(#silverGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <p className="chapter-label animate-in stagger-1" style={{ color: 'var(--color-bronze)' }}>A Journey Through Time</p>

          <h1 className="animate-in stagger-2" style={{ textShadow: '0 10px 60px rgba(139, 115, 85, 0.2)' }}>
            The <span className="italic text-gradient">Fork</span>
          </h1>

          <p className="lead-text max-w-2xl mx-auto animate-in stagger-3" style={{ color: 'rgba(201, 184, 150, 0.8)' }}>
            From ancient civilizations to modern tables, trace the remarkable multi-millennial journey of
            humanity&apos;s most revolutionary eating utensil.
          </p>

          <div className="scroll-indicator animate-in stagger-4">
            <span>Scroll to Explore</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* Origins - Ancient Mesopotamia */}
      <section className="section-dark animate-in" id="section-1">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">3000 BCE</div>
          <div className="timeline-line" />
        </div>

        <div className="content">
          <div className="grid-2">
            <div>
              <span className="chapter-label">Chapter I — Origins</span>
              <h2 className="text-light">
                The Cradle of
                <br />
                <span className="italic text-gradient">Civilization</span>
              </h2>
              <p className="lead-text mb-6">
                In the fertile crescent of ancient Mesopotamia, the earliest known fork-like implements emerged as tools
                of ritual and ceremony rather than dining. These multi-pronged bronze instruments appear in archaeological
                contexts associated with religious offerings and food preparation—designed to keep human hands from
                directly touching items meant for the gods.
              </p>
              <p className="lead-text">
                Excavations at ancient Mesopotamian sites, including the royal tombs of Ur (circa 2600-2450 BCE), have
                uncovered bronze implements with prong-like features, though their exact function remains debated among
                archaeologists. What&apos;s clear is that sophisticated metalworking existed far earlier than many assume.
              </p>
            </div>
            <div className="fork-illustration">
              <div className="fork-circle">
                <div className="fork-circle-ring" />
                <div className="fork-circle-ring-inner" />
                <svg viewBox="0 0 80 200" width="100" className="animate-float">
                  <defs>
                    <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#CD7F32" />
                      <stop offset="50%" stopColor="#8B4513" />
                      <stop offset="100%" stopColor="#654321" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M25 10 L25 60 Q25 80 30 90 L30 180 Q30 190 40 190 Q50 190 50 180 L50 90 Q55 80 55 60 L55 10"
                    fill="none"
                    stroke="url(#bronzeGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ancient Egypt & Greece */}
      <section className="section-light animate-in" id="section-2">
        <div className="timeline-marker">
          <div className="timeline-line-brown" />
          <div className="timeline-year text-brown">1000 BCE</div>
          <div className="timeline-line-brown" />
        </div>

        <div className="content">
          <div className="text-center mb-12">
            <span className="chapter-label">Chapter II — The Classical World</span>
            <h2 className="text-dark">
              Egypt, Greece &<br />
              <span className="italic">The Golden Age</span>
            </h2>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-corner card-corner-tl" />
              <div className="card-corner card-corner-br" />
              <h3 className="font-display text-dark card-title">Ancient Egypt</h3>
              <p className="font-serif card-text">
                Bronze cooking implements found in elite Egyptian contexts suggest food preparation tools existed, though
                clear evidence of fork-like utensils is limited. Egyptians overwhelmingly preferred to dine with their
                hands—a practice documented in tomb paintings and literary sources—where the tactile experience of food
                was central to the dining ritual.
              </p>
            </div>

            <div className="card">
              <div className="card-corner card-corner-tl" />
              <div className="card-corner card-corner-br" />
              <h3 className="font-display text-dark card-title">Classical Greece</h3>
              <p className="font-serif card-text">
                While evidence for fork use in Classical Greece is sparse, Greeks did employ various pointed implements
                for cooking and serving. Dining customs documented in symposium literature emphasize the use of hands,
                bread, and spoons, with knives for cutting. Any fork-like implements would have been rare kitchen tools
                rather than personal dining utensils.
              </p>
            </div>
          </div>

          <div className="info-box mt-12" style={{ maxWidth: '700px', margin: '3rem auto 0' }}>
            <h3>Roman Dining Culture</h3>
            <p>
              Romans ate primarily with their hands, using bread to scoop food and knives for cutting. While spoons
              existed for soups and sauces, the fork remained unknown in Roman dining culture. This hands-on approach
              persisted throughout the Empire and into the medieval period.
            </p>
          </div>
        </div>
      </section>

      {/* Byzantine Empire */}
      <section className="section-accent animate-in" id="section-3">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">400 CE</div>
          <div className="timeline-line" />
        </div>

        <div className="content">
          <div className="grid-2">
            <div className="image-container">
              <div className="image-container-content">
                <div className="image-container-blur" />
                <svg viewBox="0 0 100 400" width="80" style={{ position: 'relative', zIndex: 10 }}>
                  <path
                    d="M30 10 L30 100 Q30 120 35 140 L35 380 Q35 390 40 390 L60 390 Q65 390 65 380 L65 140 Q70 120 70 100 L70 10 M30 10 L30 100 M45 10 L45 100 M55 10 L55 100 M70 10 L70 100"
                    fill="none"
                    stroke="url(#silverGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="image-container-caption">
                <p>&quot;A golden fork from the Byzantine court&quot;</p>
                <span>Constantinople, 6th Century</span>
              </div>
            </div>

            <div>
              <span className="chapter-label">Chapter III — The Eastern Empire</span>
              <h2 className="text-light">
                Byzantine
                <br />
                <span className="italic text-gradient">Refinement</span>
              </h2>
              <p className="lead-text mb-6">
                It was in the glittering courts of Byzantium that the table fork first achieved true prominence. The
                Byzantine aristocracy embraced the fork as a symbol of refinement and civilization, distinguishing
                themselves from the &quot;barbaric&quot; customs of Western Europe.
              </p>
              <p className="lead-text">
                Golden forks with ornate handles became treasured possessions, passed down through generations of noble
                families. The fork had transformed from a mere tool into a statement of cultural superiority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Scandalous Princess */}
      <section className="section-dark animate-in" id="section-4">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">1075 CE</div>
          <div className="timeline-line" />
        </div>

        <div className="content text-center">
          <span className="chapter-label">Chapter IV — The Great Scandal</span>
          <h2 className="text-light mb-8">
            The Princess &<br />
            <span className="italic text-gradient">The Golden Fork</span>
          </h2>

          <div className="relative quote-section">
            <div className="divider" />
            <div className="quote-box max-w-2xl mx-auto">
              <p className="text-light">
                &quot;God in his wisdom has provided man with natural forks—his fingers. Therefore it is an insult to
                Him to substitute artificial metallic forks for them when eating.&quot;
              </p>
              <cite>— Saint Peter Damian</cite>
            </div>
          </div>

          <div className="max-w-3xl mx-auto scandal-text">
            <p className="lead-text mb-6">
              Around 1075 CE, when a Byzantine princess (known in sources as Maria or Theodora) married Venetian Doge
              Domenico Selvo, she brought with her an entourage, luxurious possessions, and—most controversially—a set
              of golden table forks. Her use of these utensils at wedding festivities shocked Venetian society.
            </p>
            <p className="lead-text mb-6">
              The Venetian clergy condemned her behavior as excessively proud and overly delicate. When she died of
              plague shortly after, moralist writers including Saint Peter Damian cited her fork use as evidence of
              sinful vanity, declaring her death divine punishment.
            </p>
            <p className="lead-text italic">
              This scandal poisoned the fork&apos;s reputation in Western Europe for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* Medieval Resistance */}
      <section className="section-light animate-in" id="section-5">
        <div className="timeline-marker">
          <div className="timeline-line-brown" />
          <div className="timeline-year text-brown">1100-1400</div>
          <div className="timeline-line-brown" />
        </div>

        <div className="content">
          <div className="grid-2">
            <div>
              <span className="chapter-label">Chapter V — The Dark Ages</span>
              <h2 className="text-dark">
                Medieval Europe&apos;s
                <br />
                <span className="italic">Stubborn Resistance</span>
              </h2>
              <p className="lead-text mb-6">
                Throughout the medieval period, Europeans remained steadfastly opposed to the fork. Knights and nobles
                alike ate with their hands, using thick slices of stale bread called &quot;trenchers&quot; as plates. To
                use a fork was considered effeminate, pretentious, and even ungodly.
              </p>
              <p className="lead-text">
                The few forks that existed in medieval courts were primarily used for serving, not personal dining. Even
                these were viewed with suspicion—their pointed tines too reminiscent of the devil&apos;s pitchfork for
                comfortable Christian sensibilities.
              </p>
            </div>

            <div>
              <div className="info-box">
                <h3>Did You Know?</h3>
                <p>
                  Medieval diners followed strict etiquette: use only three fingers, never lick them, and always wipe on
                  the tablecloth—never your clothes. The fork was seen as an unnecessary complication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Italian Renaissance */}
      <section className="section-accent animate-in" id="section-6">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">1500s</div>
          <div className="timeline-line" />
        </div>

        <div className="content">
          <div className="text-center mb-12">
            <span className="chapter-label">Chapter VI — Renaissance</span>
            <h2 className="text-light">
              Italy&apos;s Culinary
              <br />
              <span className="italic text-gradient">Revolution</span>
            </h2>
          </div>

          <div className="grid-2">
            <div>
              <p className="font-serif renaissance-intro">
                The fork&apos;s rehabilitation began in Renaissance Italy, where wealthy merchants and nobles sought to
                distinguish themselves through elaborate table manners and refined dining customs.
              </p>
              <p className="lead-text mb-6">
                Several factors drove fork adoption: concerns about hygiene, status display, and practical considerations.
                Long pasta varieties emerging from Naples certainly made forks convenient, but the shift was equally about
                social distinction and changing attitudes toward cleanliness and refinement.
              </p>
              <p className="lead-text">
                By the late 16th century, Italian courts had developed elaborate fork designs with multiple tines, and
                the practice of using personal forks had spread among the peninsula&apos;s aristocracy—though common
                people continued eating with their hands for generations longer.
              </p>
            </div>

            <div>
              <div className="fork-grid">
                {[0, 90, 180, 270].map((rotation, index) => (
                  <div key={index} className="fork-grid-item">
                    <svg
                      viewBox="0 0 100 400"
                      width="40"
                      style={{ opacity: 0.7 + index * 0.1, transform: `rotate(${rotation}deg)` }}
                    >
                      <path
                        d="M30 10 L30 100 Q30 120 35 140 L35 380 Q35 390 40 390 L60 390 Q65 390 65 380 L65 140 Q70 120 70 100 L70 10 M30 10 L30 100 M45 10 L45 100 M55 10 L55 100 M70 10 L70 100"
                        fill="none"
                        stroke="url(#silverGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <p className="chapter-label mt-4 text-center">Evolution of Italian Fork Designs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catherine de' Medici */}
      <section className="section-dark animate-in" id="section-7">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">1533</div>
          <div className="timeline-line" />
        </div>

        <div className="content max-w-3xl mx-auto">
          <div className="relative pl-8">
            <div className="vertical-line" />

            <span className="chapter-label">Chapter VII — The Queen&apos;s Dowry</span>

            <h2 className="text-light mb-8">
              Catherine
              <br />
              <span className="italic text-gradient">de&apos; Medici</span>
            </h2>

            <p className="font-serif catherine-intro">
              In 1533, fourteen-year-old Catherine de&apos; Medici traveled from Florence to marry the future King
              Henry II of France. While popular accounts credit her with single-handedly revolutionizing French cuisine
              and table manners, the historical reality is more nuanced—she likely popularized and elevated practices
              already emerging among French elites.
            </p>

            <div className="catherine-quote">
              <p className="font-display text-gold italic text-center">
                &quot;Italian refinement gradually transformed
                <br />
                French court culture over decades.&quot;
              </p>
            </div>

            <p className="lead-text mb-6">
              Catherine&apos;s Italian entourage and dining customs did face initial mockery but found increasing
              acceptance over time. Her sons—three of whom would become kings (Francis II, Charles IX, and Henry III)—were
              raised with Italian-influenced table customs, helping normalize fork use among French nobility.
            </p>

            <p className="lead-text">
              By the late 16th century, forks had gained a foothold in French court culture, though the practice spread
              slowly and unevenly. The French developed their own fork etiquette: smaller implements, wielded in the left
              hand while cutting with a knife in the right.
            </p>
          </div>
        </div>
      </section>

      {/* England & America */}
      <section className="section-light animate-in" id="section-8">
        <div className="timeline-marker">
          <div className="timeline-line-brown" />
          <div className="timeline-year text-brown">1600-1800</div>
          <div className="timeline-line-brown" />
        </div>

        <div className="content">
          <div className="grid-2">
            <div>
              <span className="chapter-label">Chapter VIII — Crossing Borders</span>
              <h2 className="text-dark">
                England&apos;s
                <br />
                <span className="italic">Reluctant Adoption</span>
              </h2>
              <p className="lead-text mb-6">
                The English proved even more resistant than the French. When traveler Thomas Coryate published accounts of
                Italian fork use in his 1611 travelogue *Crudities*, he faced mockery—contemporaries nicknamed him
                &quot;furcifer,&quot; a Latin pun meaning both &quot;fork-bearer&quot; and &quot;scoundrel.&quot;
              </p>
              <p className="lead-text">
                Yet by the 1660s, following the Restoration of Charles II (who had spent his exile at the French court),
                forks finally gained acceptance among English elites. The Great Fire of London in 1666 and subsequent
                rebuilding coincided with changing dining customs, as wealthy families furnished their new homes with
                updated table implements.
              </p>
            </div>

            <div>
              <h2 className="text-dark">
                The American
                <br />
                <span className="italic">Exception</span>
              </h2>
              <p className="lead-text mb-6">
                American colonists initially adopted the Continental style of fork use, but developed their own unique
                practice: cutting food with the knife in the right hand, then switching the fork from left to right to
                eat.
              </p>
              <p className="lead-text mb-6">
                This &quot;zigzag&quot; method, considered inefficient by Europeans, became a distinctly American
                tradition that persists to this day—a small culinary declaration of independence.
              </p>

              <div className="info-box mt-8">
                <p className="chapter-label mb-2">Timeline</p>
                <p className="font-display american-year">1820s-1870s</p>
                <p className="font-serif opacity-70 american-caption">
                  The gradual period when forks became common in middle-class American homes, spreading unevenly across
                  regions and social classes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Evolution & Conclusion */}
      <section className="section-accent animate-in" id="section-9">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">Today</div>
          <div className="timeline-line" />
        </div>

        <div className="content text-center">
          <span className="chapter-label">Chapter IX — The Modern Era</span>
          <h2 className="text-light mb-8">
            Four Thousand Years
            <br />
            <span className="italic text-gradient">In Your Hand</span>
          </h2>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="font-serif modern-intro">
              Today, we lift our forks without a second thought—unaware that we&apos;re participating in a practice
              refined over millennia.
            </p>
            <p className="lead-text">
              From ancient implement to modern necessity, the fork&apos;s journey reflects humanity&apos;s evolving
              relationship with food, status, and refinement. Across continents and centuries, this simple tool has
              carried stories of scandal, faith, cultural exchange, and the ever-changing meanings we attach to the
              rituals of the table.
            </p>
          </div>

          <div className="stats-grid mb-12">
            <div className="stat">
              <div className="stat-number">~2,500</div>
              <div className="stat-label">Years of Evidence</div>
            </div>
            <div className="stat">
              <div className="stat-number">3-4</div>
              <div className="stat-label">Common Tine Count</div>
            </div>
            <div className="stat">
              <div className="stat-number">200+</div>
              <div className="stat-label">Fork Types Today</div>
            </div>
            <div className="stat">
              <div className="stat-number">∞</div>
              <div className="stat-label">Meals Transformed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="section-dark final-section">
        <div className="final-bg" />

        <div className="content text-center relative z-10">
          <svg viewBox="0 0 100 400" width="60" className="final-fork">
            <path
              d="M30 10 L30 100 Q30 120 35 140 L35 380 Q35 390 40 390 L60 390 Q65 390 65 380 L65 140 Q70 120 70 100 L70 10 M30 10 L30 100 M45 10 L45 100 M55 10 L55 100 M70 10 L70 100"
              fill="none"
              stroke="url(#silverGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <h2 className="font-display text-light mb-8 final-title">
            Next time you pick up a fork,
            <br />
            <span className="italic text-gradient">remember its journey.</span>
          </h2>

          <p className="lead-text max-w-2xl mx-auto mb-12 final-text">
            You hold in your hand an object that has been condemned by saints, wielded by queens, scorned by nations,
            and ultimately embraced by billions. The humble fork is nothing less than a monument to human progress—one
            bite at a time.
          </p>

          <button className="btn" onClick={scrollToTop}>
            <span>Return to Beginning</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transform: 'rotate(180deg)' }}>
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="footer">
            <p>A Scrollytelling Experience</p>
            <Link href="/scrollytelling" className="footer-link">
              ← Back to Scrollytelling
            </Link>
          </div>
        </div>
      </section>

      {/* Sources & Further Reading */}
      <section className="section-dark" style={{ minHeight: 'auto', padding: '6rem 2rem' }}>
        <div className="content max-w-3xl mx-auto">
          <h2 className="text-light mb-8" style={{ 
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 300,
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Sources & Further Reading
          </h2>
          
          <div style={{
            background: 'var(--color-bg-accent)',
            border: '1px solid rgba(139, 115, 85, 0.2)',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontFamily: 'Libre Baskerville, serif',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: 'rgba(232, 224, 212, 0.8)',
              marginBottom: '1.5rem'
            }}>
              This narrative draws from historical scholarship and documented sources. While we strive for accuracy,
              some details of ancient and medieval dining practices remain debated among historians.
            </p>
            
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.125rem',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
              marginTop: '1.5rem'
            }}>
              Primary Academic Sources
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ 
                marginBottom: '0.75rem',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                Henisch, Bridget Ann. *Fast and Feast: Food in Medieval Society*. University Park: Pennsylvania State 
                University Press, 1976.
              </li>
              <li style={{ 
                marginBottom: '0.75rem',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                Wilson, C. Anne. *Food and Drink in Britain: From the Stone Age to the 19th Century*. Chicago: Academy 
                Chicago Publishers, 1991.
              </li>
              <li style={{ 
                marginBottom: '0.75rem',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                Brears, Peter. *Cooking and Dining in Medieval England*. Totnes, UK: Prospect Books, 2008.
              </li>
              <li style={{ 
                marginBottom: '0.75rem',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                Carlin, Martha, and Joel T. Rosenthal, eds. *Food and Eating in Medieval Europe*. London: Hambledon 
                Press, 1998.
              </li>
            </ul>

            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.125rem',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
              marginTop: '1.5rem'
            }}>
              Accessible Popular History
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ 
                marginBottom: '0.75rem',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                Wilson, Bee. *Consider the Fork: A History of How We Cook and Eat*. New York: Basic Books, 2012.
              </li>
              <li style={{ 
                marginBottom: '0.75rem',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                Petroski, Henry. *The Evolution of Useful Things*. New York: Vintage Books, 1992. (Chapter on table 
                implements)
              </li>
              <li style={{ 
                marginBottom: '0',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                Laudan, Rachel, and Jeffrey M. Pilcher. &quot;Chiles, Chocolate, and Race in New Spain: Glancing Backward to 
                Spain or Looking Forward to Mexico?&quot; *Eighteenth-Century Life* 23, no. 2 (1999): 59-70. (Comparative 
                dining customs)
              </li>
            </ul>

            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.125rem',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
              marginTop: '1.5rem'
            }}>
              Museum & Archive Collections
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ 
                marginBottom: '0.75rem',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                Victoria & Albert Museum, Metalwork Collection (Medieval and Renaissance cutlery)
              </li>
              <li style={{ 
                marginBottom: '0',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(232, 224, 212, 0.75)'
              }}>
                <span style={{ 
                  position: 'absolute' as const, 
                  left: 0, 
                  color: 'var(--color-bronze)' 
                }}>•</span>
                The Metropolitan Museum of Art, Medieval Dining Implements Collection
              </li>
            </ul>
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'rgba(232, 224, 212, 0.5)',
            fontStyle: 'italic',
            marginTop: '2rem'
          }}>
            Content reviewed for historical accuracy by scholarly sources. Last updated December 2025.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TheForkClient;

