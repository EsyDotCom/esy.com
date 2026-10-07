"use client"
import React from 'react';
import { User, Building, Calendar, Clock } from 'lucide-react';
import { fontSizes, defaultEssay } from './essayUtils';
import styles from './EssayContent.module.css';

const EssayContent = ({
  essay,
  essayContent,
  fontSize,
  theme,
  currentTheme,
  contentRef
}) => {
  const essayData = essay || defaultEssay;

  const titleClass = `${styles.title} ${styles[`title${fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}`]}`;
  const metadataClass = `${styles.metadata} ${theme === 'dark' ? styles.metadataDark : styles.metadataLight}`;
  const abstractClass = `${styles.abstract} ${theme === 'dark' ? styles.abstractDark : styles.abstractLight}`;
  const contentClass = `${styles.content} ${styles[`content${fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}`]} ${theme === 'dark' ? styles.contentDark : styles.contentLight}`;
  const sectionTitleClass = `${styles.sectionTitle} ${theme === 'dark' ? styles.sectionTitleDark : styles.sectionTitleLight}`;
  const sectionSubtitleClass = `${styles.sectionSubtitle} ${theme === 'dark' ? styles.sectionSubtitleDark : styles.sectionSubtitleLight}`;
  const blockquoteClass = `${styles.blockquote} ${theme === 'dark' ? styles.blockquoteDark : styles.blockquoteLight}`;
  const citeClass = `${styles.cite} ${theme === 'dark' ? styles.citeDark : styles.citeLight}`;

  return (
    <>
      {/* Essay Header */}
      <header className={styles.header}>
        <h1 className={titleClass}>
          {essayData.title}
        </h1>

        <div className={metadataClass}>
          <span className={styles.metadataItem}>
            <User size={14} />
            {essayData.authors.join(', ')}
          </span>
          <span className={styles.metadataItem}>
            <Building size={14} />
            {essayData.institution}
          </span>
          <span className={styles.metadataItem}>
            <Calendar size={14} />
            {essayData.publishDate}
          </span>
          <span className={styles.metadataItem}>
            <Clock size={14} />
            {essayData.readTime} min read
          </span>
        </div>
      </header>

      {/* Abstract */}
      <section className={abstractClass}>
        <h2 className={styles.abstractTitle}>
          Abstract
        </h2>
        <p className={contentClass}>
          {essayData.abstract}
        </p>
      </section>

      {/* Essay Content */}
      <div ref={contentRef} className={styles.content}>
        <div className={styles.essayContent}>
          {essayContent ? (
            <div 
              dangerouslySetInnerHTML={{ __html: essayContent }}
            />
          ) : (
            <>
              <section id="introduction" className={styles.section}>
                <h2 className={sectionTitleClass}>
                  Introduction
                </h2>
                <p className={styles.paragraph}>
                  The global energy landscape is undergoing a transformation unprecedented in both scale and speed. 
                  As nations race to decarbonize their economies, the traditional geopolitical order—built on fossil 
                  fuel dependencies—is being fundamentally challenged. This shift toward renewable energy is not merely 
                  a technological transition; it represents a profound reorganization of global power structures.
                </p>
                <p className={styles.paragraph}>
                  For decades, oil and natural gas have served as the primary currencies of international influence. 
                  Nations blessed with abundant fossil fuel reserves leveraged these resources to project power, 
                  forge alliances, and shape global affairs. However, the renewable energy revolution is disrupting 
                  these established patterns, creating new winners and losers in the international system.
                </p>
              </section>

              <section id="historical-context" className={styles.section}>
                <h2 className={sectionTitleClass}>
                  Historical Context
                </h2>
                <p className={styles.paragraph}>
                  To understand the magnitude of the current transition, we must first examine how fossil fuels 
                  shaped the 20th century&apos;s geopolitical landscape. The discovery of oil in the Middle East 
                  transformed desert kingdoms into global powers, while natural gas pipelines became tools of 
                  political leverage across Europe and Asia.
                </p>
                
                <blockquote className={blockquoteClass}>
                  <p className={styles.blockquoteText}>
                    &ldquo;Control oil and you control nations; control food and you control the people.&rdquo;
                  </p>
                  <cite className={citeClass}>
                    — Henry Kissinger
                  </cite>
                </blockquote>

                <p className={styles.paragraph}>
                  This paradigm, established in the post-World War II era, created a system where energy security 
                  became synonymous with national security. The oil crises of the 1970s demonstrated the vulnerability 
                  of industrialized nations to supply disruptions, leading to decades of foreign policy decisions 
                  aimed at securing stable access to fossil fuels.
                </p>
              </section>

              <section id="current-landscape" className={styles.section}>
                <h2 className={sectionTitleClass}>
                  Current Landscape
                </h2>
                <p className={styles.paragraph}>
                  Today&apos;s energy transition is characterized by several key factors that distinguish it from 
                  previous shifts in the global energy system. Unlike fossil fuels, which are geographically 
                  concentrated, renewable energy resources are more evenly distributed across the globe. 
                  This democratization of energy access has profound implications for international relations.
                </p>
                
                <h3 className={sectionSubtitleClass}>
                  The Technology Factor
                </h3>
                <p className={styles.paragraph}>
                  The rapid advancement of renewable energy technologies has fundamentally changed the economics 
                  of energy production. Solar and wind power are now cost-competitive with fossil fuels in many 
                  regions, making the transition not just environmentally necessary but economically attractive.
                </p>
              </section>

              <section id="emerging-dynamics" className={styles.section}>
                <h2 className={sectionTitleClass}>
                  Emerging Power Dynamics
                </h2>
                <p className={styles.paragraph}>
                  The shift toward renewable energy is creating new geopolitical dynamics that challenge traditional 
                  power structures. Nations that were once energy-dependent are now becoming energy-independent, 
                  while new energy powers are emerging based on their control of renewable technology and resources.
                </p>
              </section>

              <section id="case-studies" className={styles.section}>
                <h2 className={sectionTitleClass}>
                  Case Studies
                </h2>
                <p className={styles.paragraph}>
                  Several nations provide compelling examples of how renewable energy is reshaping geopolitical 
                  relationships. China&apos;s dominance in solar panel manufacturing, Germany&apos;s Energiewende 
                  policy, and Denmark&apos;s wind energy leadership all demonstrate different approaches to the 
                  renewable energy transition.
                </p>
              </section>

              <section id="conclusion" className={styles.section}>
                <h2 className={sectionTitleClass}>
                  Conclusion
                </h2>
                <p className={styles.paragraph}>
                  The geopolitics of renewable energy represents both an opportunity and a challenge for the 
                  international community. While the transition offers the promise of a more equitable distribution 
                  of energy resources, it also introduces new vulnerabilities and dependencies that must be carefully 
                  managed.
                </p>
                <p>
                  As we move forward, policymakers must recognize that the renewable energy transition is not just 
                  about replacing one energy source with another—it is about reimagining the fundamental structures 
                  of global power and cooperation. The nations that successfully navigate this transition will shape 
                  the geopolitical landscape of the 21st century.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EssayContent; 