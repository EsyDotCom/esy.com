"use client"
import React from 'react';
import { X } from 'lucide-react';
import styles from './TableOfContents.module.css';

const TableOfContents = ({
  sections,
  activeSection,
  showTOC,
  setShowTOC,
  theme,
  currentTheme
}) => {
  const sidebarClass = `${styles.sidebar} ${theme === 'dark' ? styles.sidebarDark : styles.sidebarLight}`;
  const titleClass = `${styles.title} ${theme === 'dark' ? styles.titleDark : styles.titleLight}`;
  const closeButtonClass = `${styles.closeButton} ${theme === 'dark' ? styles.closeButtonDark : styles.closeButtonLight}`;

  return (
    <div 
      className={sidebarClass}
      id="table-of-contents"
      role="navigation"
      aria-label="Table of contents"
    >
      <div className={styles.header}>
        <h3 className={titleClass}>Contents</h3>
        <button
          className={closeButtonClass}
          onClick={() => setShowTOC(false)}
          aria-label="Close table of contents"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      
      <nav className={styles.nav} role="navigation" aria-label="Essay sections">
        {sections.map(section => {
          const isActive = activeSection === section.id;
          const navLinkClass = `${styles.navLink} ${theme === 'dark' ? styles.navLinkDark : styles.navLinkLight} ${isActive ? styles.navLinkActive : ''} ${isActive ? (theme === 'dark' ? styles.navLinkActiveDark : styles.navLinkActiveLight) : ''} ${theme === 'dark' ? styles.navLinkHoverDark : styles.navLinkHoverLight}`;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setShowTOC(false)}
              className={navLinkClass}
              aria-current={isActive ? 'location' : undefined}
              aria-label={`Go to ${section.title} section`}
            >
              <span>{section.title}</span>
              <span className={styles.readTime} aria-label={`${section.readTime} minutes to read`}>
                {section.readTime} min
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents; 