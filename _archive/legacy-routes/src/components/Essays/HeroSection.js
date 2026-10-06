"use client";
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useEssaySearch } from '@/hooks/useEssaySearch';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import { elevatedDarkTheme } from '@/lib/theme';

const HeroSection = ({ 
  searchFocused, 
  setSearchFocused, 
  activeFilter, 
  setActiveFilter, 
  filters,
  essays = [],
  pageTitle = "Academic",
  pageSubtitle = "Essays",
  pageDescription = "Expert-crafted essays to inspire your best writing.",
  searchPlaceholder = "Search essays..."
}) => {
  const router = useRouter();
  const searchBarRef = useRef(null);
  
  // Responsive breakpoints
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show header search when in-page search scrolls out of view
  useScrollHeaderSearch(searchBarRef);

  const { searchResults, isLoading, searchTerm, setSearchTerm, showDropdown } = useEssaySearch({
    essays,
    debounceMs: 300,
    maxResults: 6
  });

  const handleResultSelect = (result) => {
    router.push(result.slug);
  };

  const handleSearch = (query) => {
    // This can be expanded to navigate to a search results page
  };

  const styles = {
    heroSection: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '8rem 2rem 2rem 2rem',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center'
    },
    heroContent: {
      display: 'grid',
      gridTemplateColumns: isTablet ? '1fr' : '1.2fr 0.8fr',
      gap: isTablet ? '3rem' : '4rem',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: isTablet ? 'center' : 'left'
    },
    heroLeft: {
      maxWidth: '720px'
    },
    heroTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: 'clamp(3rem, 7vw, 6rem)',
      fontWeight: '300',
      lineHeight: '0.95',
      marginBottom: '2rem',
      opacity: '1',
      letterSpacing: '-0.02em'
    },
    heroTitleAccent: {
      display: 'block',
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: '400',
      marginTop: '0.5rem',
      color: elevatedDarkTheme.accent
    },
    heroSubtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      fontWeight: '400',
      opacity: '0.8',
      lineHeight: '1.6',
      marginBottom: '2rem',
      maxWidth: '500px'
    },
    heroSearchSection: {
      marginTop: '2rem',
      maxWidth: '500px'
    },
    heroRight: {
      position: 'relative',
      display: isTablet ? 'none' : 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    featureCard: {
      backgroundColor: 'rgba(22, 22, 31, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '10px',
      padding: '1rem',
      backdropFilter: 'blur(10px)'
    },
    featureTitle: {
      fontFamily: 'var(--font-literata)',
      fontSize: '1rem',
      fontWeight: '400',
      marginBottom: '0.5rem',
      opacity: '0.9'
    },
    featureDescription: {
      fontSize: '0.8rem',
      opacity: '0.6',
      lineHeight: '1.5'
    },
    searchSection: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 2rem 2rem 2rem',
      textAlign: 'center'
    },
    categoryTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '2rem',
      marginBottom: '4rem',
      flexWrap: 'wrap'
    },
    categoryTab: {
      padding: '0.625rem 1.5rem',
      backgroundColor: 'rgba(22, 22, 31, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: 'Inter, sans-serif'
    },
    categoryTabActive: {
      backgroundColor: elevatedDarkTheme.accent,
      color: 'white',
      borderColor: elevatedDarkTheme.accent
    }
  };

  return (
    <>
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>
              {pageTitle}
              {pageSubtitle && <span style={styles.heroTitleAccent}>{pageSubtitle}</span>}
            </h1>
            <p style={styles.heroSubtitle}>
              {pageDescription}
            </p>
            
            {/* Search Bar in Hero */}
            <div ref={searchBarRef} style={styles.heroSearchSection}>
              <SearchBar
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleSearch}
                context="general"
                inputFontSize="0.9rem"
                style={{ marginBottom: '0' }}
                autoFocus={true}
                showDropdown={showDropdown}
                searchResults={searchResults}
                onResultSelect={handleResultSelect}
                loadingResults={isLoading}
                maxResults={8}
              />
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Expert Examples</h3>
              <p style={styles.featureDescription}>
                Access high-quality academic essays across various topics, each demonstrating proper structure and argumentation.
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Learn by Example</h3>
              <p style={styles.featureDescription}>
                Study real essays to understand thesis development, evidence integration, and effective conclusion strategies.
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Improve Your Writing</h3>
              <p style={styles.featureDescription}>
                Use these essays as inspiration and guidance to elevate your own academic writing to the next level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters Section - Commented out for now */}
      {/* <section style={styles.searchSection}>
        <div style={styles.categoryTabs}>
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                ...styles.categoryTab,
                ...(activeFilter === filter.id ? styles.categoryTabActive : {})
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(22, 22, 31, 0.6)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }
              }}
            >
              {filter.label}
              {filter.count > 0 && (
                <span style={{ 
                  marginLeft: '0.5rem', 
                  opacity: 0.5,
                  fontSize: '0.75rem'
                }}>
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </section> */}
    </>
  );
};

export default HeroSection;