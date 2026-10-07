"use client"
import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Share2, Bookmark, Menu, X,
  Sun, Moon, Type, Minus, Plus, Twitter, Linkedin, Link as LinkIcon, Check
} from 'lucide-react';
import { fontSizes } from './essayUtils';
import styles from './EssayHeader.module.css';

const EssayHeader = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  isBookmarked,
  setIsBookmarked,
  showShareMenu,
  setShowShareMenu,
  linkCopied,
  handleShare,
  showTOC,
  setShowTOC,
  onBackToEssays,
  currentTheme
}) => {
  const headerClass = `${styles.header} ${theme === 'dark' ? styles.headerDark : styles.headerLight}`;
  const backLinkClass = `${styles.backLink} ${theme === 'dark' ? styles.backLinkDark : styles.backLinkLight}`;
  const contentsButtonClass = `${styles.contentsButton} ${theme === 'dark' ? styles.contentsButtonDark : styles.contentsButtonLight}`;
  const fontSizeControlsClass = `${styles.fontSizeControls} ${theme === 'dark' ? styles.fontSizeControlsDark : styles.fontSizeControlsLight}`;
  const themeButtonClass = `${styles.themeButton} ${theme === 'dark' ? styles.themeButtonDark : styles.themeButtonLight}`;
  const actionButtonClass = `${styles.actionButton} ${theme === 'dark' ? styles.actionButtonDark : styles.actionButtonLight}`;
  const shareMenuClass = `${styles.shareMenu} ${theme === 'dark' ? styles.shareMenuDark : styles.shareMenuLight}`;
  const shareButtonClass = `${styles.shareButton} ${theme === 'dark' ? styles.shareButtonDark : styles.shareButtonLight}`;

  return (
    <header className={headerClass} role="banner">
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.leftSection}>
            <Link href="/essays/" className={backLinkClass} aria-label="Back to essays list">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Essays</span>
            </Link>
            
            <button
              className={contentsButtonClass}
              onClick={() => setShowTOC(!showTOC)}
              aria-label={showTOC ? "Hide table of contents" : "Show table of contents"}
              aria-expanded={showTOC}
              aria-controls="table-of-contents"
            >
              <Menu size={14} aria-hidden="true" />
              <span>Contents</span>
            </button>
          </div>

          <div className={styles.centerSection}>
            <Link href="/" className={styles.logoLink}>
              <span style={{
                fontFamily: 'var(--font-black-ops-one), sans-serif',
                fontSize: '1.75rem',
                letterSpacing: '0.03em',
                lineHeight: 1,
                userSelect: 'none',
              }}>
                <span style={{ color: '#00A896' }}>e</span>
                <span style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.88)' }}>sy</span>
              </span>
            </Link>
          </div>

          <div className={styles.rightSection}>
            {/* Font Size Controls */}
            <div 
              className={fontSizeControlsClass}
              role="group"
              aria-label="Font size controls"
            >
              <button
                className={`${styles.fontSizeButton} ${theme === 'dark' ? styles.fontSizeButtonDark : styles.fontSizeButtonLight} ${fontSize === 'small' ? (theme === 'dark' ? styles.fontSizeButtonDisabledDark : styles.fontSizeButtonDisabledLight) : ''}`}
                onClick={() => setFontSize('small')}
                disabled={fontSize === 'small'}
                aria-label="Decrease font size"
                aria-pressed={fontSize === 'small'}
              >
                <Minus size={14} aria-hidden="true" />
              </button>
              <Type size={14} style={{ color: currentTheme.muted }} aria-hidden="true" />
              <button
                className={`${styles.fontSizeButton} ${theme === 'dark' ? styles.fontSizeButtonDark : styles.fontSizeButtonLight} ${fontSize === 'large' ? (theme === 'dark' ? styles.fontSizeButtonDisabledDark : styles.fontSizeButtonDisabledLight) : ''}`}
                onClick={() => setFontSize('large')}
                disabled={fontSize === 'large'}
                aria-label="Increase font size"
                aria-pressed={fontSize === 'large'}
              >
                <Plus size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              className={themeButtonClass}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>

            {/* Actions */}
            <button
              className={`${actionButtonClass} ${isBookmarked ? styles.bookmarked : ''}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              aria-pressed={isBookmarked}
            >
              <Bookmark size={18} fill={isBookmarked ? '#8b5cf6' : 'none'} aria-hidden="true" />
            </button>

            <div className={styles.shareMenuContainer}>
              <button
                className={actionButtonClass}
                onClick={() => setShowShareMenu(!showShareMenu)}
                aria-label="Share essay"
                aria-expanded={showShareMenu}
                aria-haspopup="true"
              >
                <Share2 size={18} aria-hidden="true" />
              </button>

              {showShareMenu && (
                <div 
                  className={shareMenuClass}
                  role="menu"
                  aria-label="Share options"
                >
                  <button
                    className={shareButtonClass}
                    onClick={() => handleShare('twitter')}
                    role="menuitem"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={16} aria-hidden="true" />
                    <span>Twitter</span>
                  </button>
                  <button
                    className={shareButtonClass}
                    onClick={() => handleShare('linkedin')}
                    role="menuitem"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={16} aria-hidden="true" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    className={shareButtonClass}
                    onClick={() => handleShare('link')}
                    role="menuitem"
                    aria-label={linkCopied ? "Link copied" : "Copy link"}
                  >
                    {linkCopied ? <Check size={16} aria-hidden="true" /> : <LinkIcon size={16} aria-hidden="true" />}
                    <span>{linkCopied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EssayHeader; 