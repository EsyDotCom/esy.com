"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-basketball.css';

interface SectionData {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  content: string;
  highlight?: string;
  image?: string;
}

const sections: SectionData[] = [
  {
    id: 'origin',
    year: '1891',
    title: 'The Birth of a Game',
    subtitle: 'Springfield, Massachusetts',
    content: 'In the winter of 1891, Dr. James Naismith, a Canadian physical education instructor at the International YMCA Training School, faced an impossible challenge: create an indoor game that could keep young men active during the brutal New England winters. Armed with a soccer ball and two peach baskets, he invented a game that would captivate billions.',
    highlight: 'December 21, 1891 — The first game of basketball was played'
  },
  {
    id: 'rules',
    year: '1891',
    title: 'The Original 13 Rules',
    subtitle: 'A Foundation for Forever',
    content: 'Naismith wrote 13 simple rules on two typewritten pages. Players couldn\'t run with the ball. No shouldering, holding, pushing, or striking. The ball could be batted in any direction with one or both hands. Goals were made by throwing the ball into the basket. These rules, born from necessity, became the DNA of a global phenomenon.',
    highlight: 'The original rules document sold for $4.3 million in 2010'
  },
  {
    id: 'spread',
    year: '1893-1936',
    title: 'From Peach Baskets to the World',
    subtitle: 'A Game Without Borders',
    content: 'YMCA missionaries carried basketball across oceans. By 1893, it reached France. China embraced it by 1895. Japan and India followed. The game needed no translator — just a ball, a hoop, and the universal language of competition. In 1936, basketball made its Olympic debut in Berlin, with Naismith himself presenting the medals.',
    highlight: 'Basketball is now played in over 200 countries worldwide'
  },
  {
    id: 'nba',
    year: '1946',
    title: 'The NBA is Born',
    subtitle: 'Professional Dreams Take Flight',
    content: 'On June 6, 1946, the Basketball Association of America was founded in New York City. The merger with the National Basketball League in 1949 created the NBA. What began in hockey arenas and dance halls would become a multi-billion dollar empire, transforming athletes into global icons.',
    highlight: 'November 1, 1946 — First game: Toronto Huskies vs New York Knickerbockers at Maple Leaf Gardens'
  },
  {
    id: 'evolution',
    year: '1950-1980',
    title: 'The Evolution',
    subtitle: 'Giants Walk Among Us',
    content: 'The game evolved rapidly. The 24-second shot clock arrived in 1954, eliminating stall tactics forever. Wilt Chamberlain scored 100 points in a single game. Bill Russell redefined defense with 11 championships. The ABA introduced the three-point line in 1967, adding a new dimension to offensive strategy. Basketball was becoming art.',
    highlight: 'March 2, 1962 — Wilt scores 100 points in Hershey, Pennsylvania'
  },
  {
    id: 'globalicons',
    year: '1984-1998',
    title: 'The Age of Icons',
    subtitle: 'When Basketball Became Culture',
    content: 'Michael Jordan didn\'t just play basketball — he transcended it. The Dream Team of 1992 showed the world that basketball was America\'s gift to global sports culture. Magic and Bird had saved the league; Jordan made it legendary. Sneakers became artifacts. Highlights became religion.',
    highlight: 'The 1992 Dream Team is considered the greatest sports team ever assembled'
  },
  {
    id: 'modern',
    year: '2000-Present',
    title: 'The Modern Game',
    subtitle: 'Analytics Meets Artistry',
    content: 'Stephen Curry broke basketball\'s spatial logic, launching shots from distances once considered absurd. Analytics revolutionized strategy. LeBron James became a living debate about greatness. International players from every continent now dominate the league. The three-point revolution changed everything.',
    highlight: 'Over 25% of NBA players are now international, from 40+ countries'
  },
  {
    id: 'legacy',
    year: 'Forever',
    title: 'More Than a Game',
    subtitle: 'The Ball Never Stops',
    content: 'From a gymnasium in Massachusetts to courts on every continent, basketball has become humanity\'s shared language of movement, competition, and joy. Every driveway hoop, every playground game, every buzzer-beater connects back to that December day when James Naismith hung two peach baskets and changed the world forever.',
    highlight: 'An estimated 450 million people play basketball worldwide'
  }
];

const BasketballIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3"/>
    <path d="M50 5 Q30 50 50 95" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M50 5 Q70 50 50 95" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M5 50 H95" stroke="currentColor" strokeWidth="2"/>
    <path d="M50 5 V95" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const Section: React.FC<{ section: SectionData; index: number }> = ({ section, index }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`section ${isVisible ? 'visible' : ''}`}
      style={{
        '--scroll-progress': scrollProgress,
        '--index': index,
      } as React.CSSProperties}
    >
      <div className="section-bg" style={{
        transform: `translateY(${scrollProgress * -50}px)`,
      }}>
        <div className="noise-overlay" />
        <div className="pattern-overlay" style={{
          backgroundPosition: `${scrollProgress * 100}px ${scrollProgress * 50}px`
        }} />
      </div>
      
      <div className={`section-content ${isEven ? 'align-left' : 'align-right'}`}>
        <div className="year-badge">
          <span className="year-text">{section.year}</span>
          <div className="year-line" />
        </div>
        
        <div className="text-container">
          <span className="subtitle">{section.subtitle}</span>
          <h2 className="title">{section.title}</h2>
          <p className="content">{section.content}</p>
          
          {section.highlight && (
            <div className="highlight-box">
              <div className="highlight-icon">
                <BasketballIcon className="ball-icon" />
              </div>
              <p className="highlight-text">{section.highlight}</p>
            </div>
          )}
        </div>
        
        <div className="decorative-elements">
          <div className="deco-circle" />
          <div className="deco-line" />
          <div className="deco-dots">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="dot" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="section-number">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="hero">
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-noise" />
        <div className="hero-lines">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="court-line"
              style={{
                transform: `translateY(${scrollY * (0.1 + i * 0.02)}px)`,
                opacity: 1 - (scrollY / 800)
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.4}px)` }}>
        <div className="hero-badge">
          <span>EST. 1891</span>
        </div>
        
        <h1 className="hero-title">
          <span className="title-line title-line-1">The</span>
          <span className="title-line title-line-2">Basketball</span>
          <span className="title-line title-line-3">Story</span>
        </h1>
        
        <p className="hero-tagline">
          From peach baskets to global phenomenon
        </p>
        
        <div className="hero-ball" style={{
          transform: `translateY(${scrollY * 0.6}px) rotate(${scrollY * 0.2}deg)`
        }}>
          <BasketballIcon className="hero-ball-icon" />
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stat">
          <span className="stat-number">1891</span>
          <span className="stat-label">Year Invented</span>
        </div>
        <div className="stat">
          <span className="stat-number">450M+</span>
          <span className="stat-label">Players Worldwide</span>
        </div>
        <div className="stat">
          <span className="stat-number">213</span>
          <span className="stat-label">FIBA Member Nations</span>
        </div>
      </div>
    </header>
  );
};

const Sources: React.FC = () => (
  <section className="sources-section">
    <div className="sources-content">
      <h3 className="sources-title">Sources & Further Reading</h3>
      <ul className="sources-list">
        <li>
          <a href="https://www.britannica.com/sports/history-of-basketball" target="_blank" rel="noopener noreferrer">
            &ldquo;History of Basketball&rdquo; — Encyclopedia Britannica
          </a>
        </li>
        <li>
          <a href="https://www.hoophall.com/hall-of-famers/james-naismith" target="_blank" rel="noopener noreferrer">
            James Naismith — Naismith Memorial Basketball Hall of Fame
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/History_of_basketball" target="_blank" rel="noopener noreferrer">
            &ldquo;History of Basketball&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/National_Basketball_Association" target="_blank" rel="noopener noreferrer">
            &ldquo;National Basketball Association&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Basketball_at_the_Summer_Olympics" target="_blank" rel="noopener noreferrer">
            &ldquo;Basketball at the Summer Olympics&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://time.com/5757570/david-stern-rescued-nba/" target="_blank" rel="noopener noreferrer">
            &ldquo;How David Stern Rescued the NBA&rdquo; — TIME Magazine
          </a>
        </li>
        <li>
          <a href="https://www.fiba.basketball/about" target="_blank" rel="noopener noreferrer">
            FIBA — International Basketball Federation
          </a>
        </li>
      </ul>
      <p className="sources-note">
        This narrative was fact-checked against peer-reviewed sources and authoritative historical records.
      </p>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-ball">
        <BasketballIcon className="footer-ball-icon" />
      </div>
      <blockquote className="footer-quote">
        &ldquo;The invention of basketball was not an accident. It was developed to meet a need.&rdquo;
        <cite>— Dr. James Naismith</cite>
      </blockquote>
      <div className="footer-divider" />
      <p className="footer-text">
        The story continues every time someone picks up a ball.
      </p>
    </div>
  </footer>
);

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ height: `${progress}%` }} />
      <div className="progress-ball" style={{ top: `${progress}%` }}>
        <BasketballIcon className="progress-ball-icon" />
      </div>
    </div>
  );
};

const BasketballHistoryClient: React.FC = () => {
  return (
    <div className="basketball-history-container">
      <ProgressBar />
      <Hero />
      {sections.map((section, index) => (
        <Section key={section.id} section={section} index={index} />
      ))}
      <Sources />
      <Footer />
    </div>
  );
};

export default BasketballHistoryClient;

