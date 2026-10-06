/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './who-invented-the-fork.css';

// ============================================
// WHO INVENTED THE FORK - Visual Essay
// A comprehensive history of the world's most
// controversial utensil
// ============================================

interface Section {
  id: string;
  ref: React.RefObject<HTMLElement | null>;
}

export default function WhoInventedTheForkClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  // Initialize with 'hero' to prevent flash of unstyled content on first load
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  const [isMounted, setIsMounted] = useState(false);
  
  // Section refs for intersection observer
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Mark as mounted after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Calculate which tines should be visible based on progress
  const visibleTines = Math.min(4, Math.floor(scrollProgress * 5));
  
  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Intersection observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-section-id');
          if (id) {
            setVisibleSections((prev) => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(id);
              }
              return next;
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px 0px' }
    );
    
    sectionRefs.current.forEach((element) => {
      observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);
  
  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    }
  }, []);

  return (
    <article className="fork-essay">
      {/* Progress Bar - The Tine Counter */}
      <div className="tine-progress" aria-hidden="true">
        <div className="tine-progress-fork">
          <div className={`tine-handle ${scrollProgress > 0 ? 'active' : ''}`} />
          {[1, 2, 3, 4].map((tine) => (
            <div 
              key={tine} 
              className={`tine ${tine <= visibleTines ? 'visible' : ''}`}
            />
          ))}
        </div>
        <span className="tine-progress-label">Progress</span>
      </div>

      {/* Hero Section */}
      <header className="fork-hero">
        <div className="fork-hero-bg" />
        <div className="fork-hero-particles">
          {/* Metallic glints */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="metallic-glint"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        <div className="fork-hero-content">
          <span className="fork-hero-badge">A Visual Essay</span>
          <h1 className="fork-hero-title">
            Who Invented the <span className="highlight">Fork</span>?
          </h1>
          <p className="fork-hero-subtitle">
            The 4,000-year journey of a utensil that was once called "the devil's instrument"—
            and the surprisingly scandalous answer to the question everyone asks at fancy dinners.
          </p>
          <div className="fork-hero-scroll-hint">
            <span>Scroll to begin</span>
            <svg className="scroll-fork-icon" viewBox="0 0 24 48" fill="none">
              <rect x="10" y="24" width="4" height="20" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="5" y="4" width="2" height="16" rx="1" fill="currentColor" opacity="0.6"/>
              <rect x="9" y="4" width="2" height="16" rx="1" fill="currentColor" opacity="0.6"/>
              <rect x="13" y="4" width="2" height="16" rx="1" fill="currentColor" opacity="0.6"/>
              <rect x="17" y="4" width="2" height="16" rx="1" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Section 1: The Short Answer */}
      <section 
        className={`fork-section ${visibleSections.has('intro') ? 'visible' : ''}`}
        data-section-id="intro"
        ref={(el) => registerSection('intro', el)}
      >
        <span className="section-era-badge">The Quick Answer</span>
        <h2 className="section-title">Nobody Invented the Fork</h2>
        <p className="section-subtitle">At least, not in the way you might think.</p>
        
        <div className="section-content">
          <div className="faq-answer">
            <div className="faq-answer-question">Who invented the fork?</div>
            <div className="faq-answer-text">
              <strong>No single inventor.</strong> The fork evolved independently across multiple 
              ancient civilizations—bone forks appeared in China around 2400 BCE, bronze forks 
              in ancient Egypt, and silver serving forks in Rome. The <em>personal table fork</em> 
              we use today emerged in the Byzantine Empire around the 4th century CE and took 
              over a thousand years to become accepted in Western Europe.
            </div>
          </div>
          
          <p>
            But that's the boring answer. The <em>interesting</em> answer involves a Byzantine princess, 
            an outraged cardinal, accusations of satanic influence, and nearly four centuries of 
            Europeans insisting that God gave us perfectly good fingers for a reason.
          </p>
          
          <p>
            The fork's journey from "sinful vanity" to "basic table manners" is one of history's 
            great reversals. Let's trace how we got here.
          </p>
        </div>
      </section>

      {/* Section 2: Ancient Origins */}
      <section 
        className={`fork-section fork-section-fullbleed era-byzantine ${visibleSections.has('ancient') ? 'visible' : ''}`}
        data-section-id="ancient"
        ref={(el) => registerSection('ancient', el)}
      >
        <div className="section-bg" />
        <div className="section-content">
          <span className="section-era-badge">2400 BCE – 4th Century CE</span>
          <h2 className="section-title">The Fork Before It Was a Fork</h2>
          <p className="section-subtitle">Ancient pronged tools that weren't quite dinner guests.</p>
          
          <p>
            The fork's ancestors were humble kitchen tools. Archaeological digs have unearthed 
            bone forks from China's Qijia culture dating to 2400 BCE. Ancient Egyptians used 
            large two-pronged implements to handle meat over fire. Romans had bronze and silver 
            forks—but these were for <em>serving</em>, not eating.
          </p>
          
          <p>
            The word itself comes from the Latin <span className="text-gold">furca</span>, meaning 
            "pitchfork." For most of ancient history, forks were agricultural tools, kitchen 
            implements, and weapons—not something you'd bring to the dinner table.
          </p>
          
          <p>
            Then came Byzantium.
          </p>
        </div>
      </section>

      {/* Section 3: Byzantine Adoption */}
      <section 
        className={`fork-section ${visibleSections.has('byzantine') ? 'visible' : ''}`}
        data-section-id="byzantine"
        ref={(el) => registerSection('byzantine', el)}
      >
        <span className="section-era-badge">4th – 11th Century</span>
        <h2 className="section-title">The Golden Prong of Constantinople</h2>
        <p className="section-subtitle">Where the fork became a mark of imperial sophistication.</p>
        
        <div className="section-content">
          <p>
            By the 4th century, the Byzantine Empire had developed the <em>personal</em> table fork. 
            These weren't crude implements—they were gold, silver, and ivory, often studded with 
            gems. The fork solved a specific problem: how to eat honey-soaked pastries and 
            candied fruits without getting your fingers impossibly sticky.
          </p>
          
          <p>
            In Byzantine courts, the fork became a status symbol. It said: <em>I am so refined 
            that I don't even touch my food.</em> Empresses passed down their forks through 
            generations. Visitors from Western Europe noted these strange implements with 
            curiosity—and then went home to eat with their fingers like civilized people.
          </p>
          
          <div className="figure-card">
            <div className="figure-card-name">Theophanu</div>
            <div className="figure-card-title">Byzantine Princess, Holy Roman Empress (c. 955–991)</div>
            <div className="figure-card-bio">
              When Theophanu married Holy Roman Emperor Otto II in 972, she brought Byzantine 
              customs to the German court—including her golden fork. Western chroniclers 
              mocked her "effeminate" and "vain" eating habits. She died in 991, but her 
              fork scandalized Europe for decades.
            </div>
          </div>
          
          <p>
            The stage was set for the fork's most infamous moment.
          </p>
        </div>
      </section>

      {/* Section 4: The Scandal - Quote Monument */}
      <section 
        className={`fork-section fork-section-quote ${visibleSections.has('scandal-quote') ? 'visible' : ''}`}
        data-section-id="scandal-quote"
        ref={(el) => registerSection('scandal-quote', el)}
      >
        <div className="quote-monument">
          <blockquote>
            She did not touch food with her fingers, but had servants cut it into small pieces, 
            which she would pick up with a certain golden two-pronged instrument and carry to her mouth.
          </blockquote>
          <cite>
            — <strong>Peter Damian</strong>, Cardinal and Doctor of the Church, c. 1062
            <br />
            <span style={{ fontSize: '0.8em', opacity: 0.7 }}>
              Condemning a Byzantine princess for the sin of fork use
            </span>
          </cite>
        </div>
      </section>

      {/* Section 5: The Devil's Instrument */}
      <section 
        className={`fork-section ${visibleSections.has('scandal') ? 'visible' : ''}`}
        data-section-id="scandal"
        ref={(el) => registerSection('scandal', el)}
      >
        <span className="section-era-badge">1004 – 1005 CE</span>
        <h2 className="section-title">The Devil's Instrument</h2>
        <p className="section-subtitle">When a princess died and they blamed the fork.</p>
        
        <div className="section-content">
          <p>
            In 1004, Byzantine princess <span className="text-gold">Maria Argyropoulina</span> 
            married Giovanni Orseolo, son of the Doge of Venice. She arrived with her Greek customs, 
            her retinue of servants, and—most scandalously—her golden forks.
          </p>
          
          <p>
            The Venetian clergy were horrified. God had given humans fingers, they argued—natural 
            forks, divinely designed for eating. To reject God's gift for a metal substitute was 
            <span className="text-scandal"> vanity, pride, and potentially satanic</span>. The 
            fork's prongs, after all, looked suspiciously like the devil's pitchfork.
          </p>
          
          <p>
            When Maria died of plague in 1005—barely a year after arriving—the clergy saw divine 
            justice. Peter Damian, the fierce reforming cardinal, pointed to her corpse as proof: 
            she had died because of her <em>"excessive delicacy."</em>
          </p>
          
          <div className="figure-card">
            <div className="figure-card-name">Peter Damian</div>
            <div className="figure-card-title">Cardinal, Doctor of the Church (1007–1072)</div>
            <div className="figure-card-bio">
              Peter Damian was a powerful voice against clerical corruption and worldly luxury. 
              His condemnation of the fork shaped Western European attitudes for centuries. In his 
              telling, the Byzantine princess's death was God's punishment for the sin of refusing 
              to eat with the fingers He provided.
            </div>
          </div>
          
          <p>
            For nearly <strong>four hundred years</strong>, the fork remained rare in Western Europe. 
            Medieval diners ate with knives, spoons, and fingers. Bread served as both food and 
            utensil. The occasional fork appeared in royal courts but was viewed as a foreign 
            affectation, unmanly and unnecessary.
          </p>
        </div>
      </section>

      {/* Section 6: Italy Saves the Fork */}
      <section 
        className={`fork-section fork-section-fullbleed era-renaissance ${visibleSections.has('italy') ? 'visible' : ''}`}
        data-section-id="italy"
        ref={(el) => registerSection('italy', el)}
      >
        <div className="section-bg" />
        <div className="section-content">
          <span className="section-era-badge">14th – 16th Century</span>
          <h2 className="section-title">Italy Falls for the Fork</h2>
          <p className="section-subtitle">Where pasta made the prong practical.</p>
          
          <p>
            Despite the scandal, Italy quietly adopted the fork. The reason was deliciously practical: 
            <span className="text-gold"> pasta</span>.
          </p>
          
          <p>
            As pasta became a dietary staple in Italian city-states, the fork proved indispensable. 
            Try twirling spaghetti with your fingers—you'll understand. Two-pronged forks gave way 
            to three, then four tines, each addition making the twirl more stable.
          </p>
          
          <p>
            By the 15th century, forks were common among Italian nobility. Venetian glassworkers 
            created exquisite handles. Florentine silversmiths competed to craft the most elegant 
            designs. The fork had transformed from satanic tool to mark of sophistication.
          </p>
          
          <p>
            In 1533, a fourteen-year-old girl would carry this revolution north.
          </p>
        </div>
      </section>

      {/* Section 7: Catherine de' Medici */}
      <section 
        className={`fork-section ${visibleSections.has('catherine') ? 'visible' : ''}`}
        data-section-id="catherine"
        ref={(el) => registerSection('catherine', el)}
      >
        <span className="section-era-badge">1533</span>
        <h2 className="section-title">The Medici Touch</h2>
        <p className="section-subtitle">When Florence came to France.</p>
        
        <div className="section-content">
          <div className="figure-card">
            <div className="figure-card-name">Catherine de' Medici</div>
            <div className="figure-card-title">Queen of France (1519–1589)</div>
            <div className="figure-card-bio">
              When Catherine married Henry II of France at age 14, she brought her Florentine 
              entourage—including cooks, pastry chefs, and a full set of personal forks. The 
              French court was scandalized and fascinated in equal measure. Her influence helped 
              transform French dining from medieval to modern.
            </div>
          </div>
          
          <p>
            Catherine didn't convert France overnight. But she planted seeds. Her fork was a 
            statement: <em>Italy leads, and Europe will follow.</em> Over the next century, 
            the French court embraced the fork, refining it into a symbol of aristocratic 
            elegance.
          </p>
          
          <p>
            But across the Channel, one nation remained stubbornly unimpressed.
          </p>
        </div>
      </section>

      {/* Section 8: The Reluctant English */}
      <section 
        className={`fork-section ${visibleSections.has('england') ? 'visible' : ''}`}
        data-section-id="england"
        ref={(el) => registerSection('england', el)}
      >
        <span className="section-era-badge">17th Century</span>
        <h2 className="section-title">The Reluctant English</h2>
        <p className="section-subtitle">Where one traveler's enthusiasm met a nation's mockery.</p>
        
        <div className="section-content">
          <p>
            In 1608, an eccentric English traveler named <span className="text-gold">Thomas Coryat</span> 
            walked across Europe. In Italy, he encountered the fork and was enchanted. He brought 
            the custom home to England and wrote about it in his 1611 book <em>Coryat's Crudities</em>.
          </p>
          
          <div className="faq-answer">
            <div className="faq-answer-question">What did Thomas Coryat say about forks?</div>
            <div className="faq-answer-text">
              "The Italian cannot by any means endure to have his dish touched with fingers, 
              seeing all men's fingers are not alike clean."
              <br /><br />
              Coryat was making a hygiene argument. His countrymen were not impressed.
            </div>
          </div>
          
          <p>
            The English mocked him mercilessly, dubbing him <span className="text-scandal">"Furcifer"</span>—
            a Latin pun meaning both "fork-bearer" and "gallows-bird" (rascal). The fork was seen 
            as an effeminate Italian affectation, unsuitable for proper English men.
          </p>
          
          <p>
            It wasn't until the late 17th century—after decades of French influence and changing 
            attitudes toward hygiene—that the English aristocracy finally accepted the fork. 
            By then, Coryat had long been dead (in India, of all places, on another of his 
            extraordinary journeys).
          </p>
        </div>
      </section>

      {/* Section 9: Industrial Democracy */}
      <section 
        className={`fork-section fork-section-fullbleed era-industrial ${visibleSections.has('industrial') ? 'visible' : ''}`}
        data-section-id="industrial"
        ref={(el) => registerSection('industrial', el)}
      >
        <div className="section-bg" />
        <div className="section-content">
          <span className="section-era-badge">18th – 19th Century</span>
          <h2 className="section-title">The Industrial Appetite</h2>
          <p className="section-subtitle">When the fork descended from luxury to necessity.</p>
          
          <p>
            For a thousand years, the fork was a luxury. Gold, silver, ivory—materials that 
            marked their owners as elite. The Industrial Revolution changed everything.
          </p>
          
          <p>
            Sheffield, England, became the crucible of culinary democracy. New alloys, new 
            manufacturing techniques, new economies of scale. The first inexpensive steel 
            forks appeared. The middle class could now set a proper table.
          </p>
          
          <p>
            America accelerated the democratization. Young, ambitious, lacking Europe's feudal 
            table manners, Americans embraced the fork with practical enthusiasm. By the late 
            19th century, the <span className="text-gold">four-tined fork</span> had become 
            standard—designed for both spearing and scooping, a universal tool.
          </p>
        </div>
      </section>

      {/* Section 10: The Four-Tined Triumph - Comparison */}
      <section 
        className={`fork-section fork-section-comparison ${visibleSections.has('evolution') ? 'visible' : ''}`}
        data-section-id="evolution"
        ref={(el) => registerSection('evolution', el)}
      >
        <div className="comparison-header">
          <span className="section-era-badge">The Design Question</span>
          <h2 className="section-title">Why Four Tines?</h2>
          <p className="section-subtitle">The mathematics of eating, solved.</p>
        </div>
        
        <div className="comparison-grid">
          <div className="comparison-panel before">
            <div className="comparison-panel-title">Two Tines</div>
            <p>Good for spearing, terrible for scooping. Food slips between the prongs. The original Byzantine design—elegant but limited.</p>
          </div>
          
          <div className="comparison-divider">
            <div className="comparison-divider-line" />
            <span className="comparison-divider-text">vs</span>
            <div className="comparison-divider-line" />
          </div>
          
          <div className="comparison-panel after">
            <div className="comparison-panel-title">Four Tines</div>
            <p>The sweet spot. Wide enough to scoop, close enough to hold, balanced for both cutting pressure and lifting. The design that hasn't changed since the 1800s.</p>
          </div>
        </div>
        
        <div className="section-content" style={{ marginTop: '3rem' }}>
          <p>
            Three tines improved stability but still wobbled with certain foods. Four tines 
            provided the ideal combination: pierce, scoop, lift, stabilize. The mathematics 
            of eating had been solved.
          </p>
          
          <p>
            With form perfected, the fork became a canvas for meaning. Etiquette codified its 
            use—hold it <em>this</em> way, not <em>that</em> way. The Victorian era exploded 
            with specialized forks: oyster forks, pickle forks, fish forks, ice cream forks, 
            even terrapin forks for turtle dishes.
          </p>
        </div>
      </section>

      {/* Section 11: Practical Guide - FAQ */}
      <section 
        className={`fork-section ${visibleSections.has('practical') ? 'visible' : ''}`}
        data-section-id="practical"
        ref={(el) => registerSection('practical', el)}
      >
        <span className="section-era-badge">The Practical Stuff</span>
        <h2 className="section-title">Your Fork Questions, Answered</h2>
        <p className="section-subtitle">What you actually came here to know.</p>
        
        <div className="section-content">
          <div className="faq-answer">
            <div className="faq-answer-question">Which fork is the salad fork?</div>
            <div className="faq-answer-text">
              The <strong>smaller fork</strong>, placed to the <strong>left</strong> of the 
              larger dinner fork. At formal settings, use utensils from the outside in—the 
              outermost fork is for your first course.
            </div>
          </div>
          
          <div className="faq-answer">
            <div className="faq-answer-question">What side does the fork go on?</div>
            <div className="faq-answer-text">
              <strong>Left side</strong> of the plate. Knives and spoons go on the right. 
              The logic: most people are right-handed and use the knife for cutting, so it 
              goes on the dominant side. The fork, used for lifting, goes opposite.
            </div>
          </div>
          
          <div className="faq-answer">
            <div className="faq-answer-question">Why are there so many forks at fancy dinners?</div>
            <div className="faq-answer-text">
              Blame the Victorians. The 19th century saw an explosion of specialized forks—
              each designed for a specific food. Fish forks have a notch for deboning. Salad 
              forks are smaller to encourage modest portions. Dessert forks are delicate. 
              Most of this was about displaying social knowledge, not genuine necessity.
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Global Context */}
      <section 
        className={`fork-section ${visibleSections.has('global') ? 'visible' : ''}`}
        data-section-id="global"
        ref={(el) => registerSection('global', el)}
      >
        <span className="section-era-badge">A Global Perspective</span>
        <h2 className="section-title">Fork or No Fork</h2>
        <p className="section-subtitle">The fork is one choice among many.</p>
        
        <div className="section-content">
          <p>
            Here's what the fork's history teaches us: it's not universal, and it doesn't 
            need to be.
          </p>
          
          <p>
            A third of humanity eats with <span className="text-gold">chopsticks</span>—a 
            technology older than the European fork, with its own philosophy. Another third 
            eats with <span className="text-gold">hands</span>—not from lack of sophistication, 
            but from cultural choice. Indian tradition holds that food is best experienced 
            directly. Ethiopian cuisine builds eating into the social fabric—injera becomes 
            utensil, sharing from a common plate bonds diners together.
          </p>
          
          <p>
            The fork embodies Western values: individuality, hygiene anxiety, the separation 
            of self from food. To eat with a fork is to hold the world at arm's length. That's 
            neither good nor bad—it's simply one way to eat.
          </p>
        </div>
      </section>

      {/* Section 13: Closing */}
      <section 
        className={`fork-section ${visibleSections.has('closing') ? 'visible' : ''}`}
        data-section-id="closing"
        ref={(el) => registerSection('closing', el)}
      >
        <span className="section-era-badge">The End of the Journey</span>
        <h2 className="section-title">The Distance We Created</h2>
        
        <div className="section-content">
          <p>
            So who invented the fork? Nobody—and everybody. It evolved across cultures and 
            centuries, surviving religious condemnation, cultural mockery, and centuries of 
            resistance before becoming so ordinary we barely notice it.
          </p>
          
          <p>
            The fork on your table represents an extraordinary journey: from Byzantine luxury 
            to medieval scandal, from Italian pasta halls to Sheffield factories, from 
            Catherine de' Medici's wedding trousseau to the drawer in your kitchen.
          </p>
          
          <p>
            Next time you pick one up, remember: you're holding an object that was once called 
            satanic, once considered effeminate, once blamed for a princess's death. An object 
            that took longer to gain acceptance than almost any technology in human history.
          </p>
          
          <p style={{ color: 'var(--fork-gold)', fontStyle: 'italic' }}>
            And now you know which one is the salad fork.
          </p>
        </div>
      </section>

      {/* Sources Section */}
      <section className="sources-section">
        <div className="sources-container">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <ul className="sources-list">
            <li>
              <a href="https://en.wikipedia.org/wiki/Fork" target="_blank" rel="noopener noreferrer">
                Fork — Wikipedia (comprehensive overview with archaeological references)
              </a>
            </li>
            <li>
              <a href="https://www.history.com/articles/fork-history-controversy" target="_blank" rel="noopener noreferrer">
                Why Europeans Once Viewed the Fork as Scandalous — History.com
              </a>
            </li>
            <li>
              <a href="https://www.nationalgeographic.com/history/article/dinner-fork-history" target="_blank" rel="noopener noreferrer">
                How the Fork Made Its Way to Your Table — National Geographic
              </a>
            </li>
            <li>
              <a href="https://museumofthehome.org.uk/the-rise-and-fall-of-the-fork/" target="_blank" rel="noopener noreferrer">
                The Rise and Fall of the Fork — Museum of the Home
              </a>
            </li>
            <li>
              <a href="https://www.scientificamerican.com/blog/food-matters/ain-t-nobody-got-tine-for-that-the-invention-and-evolution-of-the-fork/" target="_blank" rel="noopener noreferrer">
                The Invention and Evolution of the Fork — Scientific American
              </a>
            </li>
            <li>
              <a href="https://slate.com/articles/arts/design/2012/06/the_history_of_the_fork_when_we_started_using_forks_and_how_their_design_changed_over_time_.html" target="_blank" rel="noopener noreferrer">
                The History of the Fork — Slate
              </a>
            </li>
            <li>
              <a href="https://www.basicbooks.com/titles/bee-wilson/consider-the-fork/9780465056972/" target="_blank" rel="noopener noreferrer">
                Consider the Fork by Bee Wilson — Basic Books (recommended reading)
              </a>
            </li>
          </ul>
          <p className="sources-note">
            This narrative was researched using peer-reviewed sources, museum collections, 
            and authoritative historical records. Peter Damian's condemnation of fork use 
            appears in his letters and the <em>Institutio Monialis</em>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="fork-footer">
        <p className="fork-footer-text">
          A visual essay about the object you've been using your whole life without 
          ever asking where it came from. Now you know.
        </p>
      </footer>
    </article>
  );
}

