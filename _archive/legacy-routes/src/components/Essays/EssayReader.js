"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import EssayHeader from './EssayHeader';
import TableOfContents from './TableOfContents';
import EssayContent from './EssayContent';
import EssayMetadata from './EssayMetadata';
import { getThemeConfig, extractSectionsFromContent, handleShare as shareHandler } from './essayUtils';
import styles from './EssayReader.module.css';

const EssayReader = ({ 
  essay, 
  essayContent, 
  sections: propSections,
  onBackToEssays 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [fontSize, setFontSize] = useState('default');
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('introduction');
  
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for TOC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showTOC) {
        setShowTOC(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showTOC]);

  const handleShare = async (platform) => {
    await shareHandler(platform, essay, setLinkCopied);
    setShowShareMenu(false);
  };

  const currentTheme = getThemeConfig(theme);
  const sections = propSections || extractSectionsFromContent(essayContent);

  const containerClass = `${styles.container} ${theme === 'dark' ? styles.containerDark : styles.containerLight}`;
  const progressBarClass = `${styles.progressBar} ${theme === 'dark' ? styles.progressBarTrackDark : styles.progressBarTrackLight}`;

  return (
    <div className={containerClass} role="main" aria-label="Essay Reader">
      {/* Progress Bar */}
      <div 
        className={progressBarClass}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          className={styles.progressBarTrack}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <EssayHeader
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        showShareMenu={showShareMenu}
        setShowShareMenu={setShowShareMenu}
        linkCopied={linkCopied}
        handleShare={handleShare}
        showTOC={showTOC}
        setShowTOC={setShowTOC}
        onBackToEssays={onBackToEssays}
        currentTheme={currentTheme}
      />

      {/* Table of Contents Sidebar */}
      {showTOC && (
        <TableOfContents
          sections={sections}
          activeSection={activeSection}
          showTOC={showTOC}
          setShowTOC={setShowTOC}
          theme={theme}
          currentTheme={currentTheme}
        />
      )}

      {/* Main Content */}
      <article className={styles.mainContent} ref={contentRef}>
        <EssayContent
          essay={essay}
          essayContent={essayContent}
          fontSize={fontSize}
          theme={theme}
          currentTheme={currentTheme}
          contentRef={contentRef}
        />
        
        <EssayMetadata
          essay={essay}
          theme={theme}
          currentTheme={currentTheme}
        />
      </article>

      {/* Back to Top Button */}
      {scrollProgress > 20 && (
        <button
          className={styles.backToTopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUp size={20} color="white" />
        </button>
      )}
    </div>
  );
};

export default EssayReader; 