"use client"
import React, { useState, useEffect } from 'react';
import { Settings, X, Shield, ChevronUp, ExternalLink } from 'lucide-react';

const EsyCookieNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    functional: false,
    personalization: false
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const colors = {
    background: '#0A2540',
    surface: '#0F3460',
    accent: '#00A896',
    accentHover: '#00D4AA',
    textPrimary: 'rgba(255, 255, 255, 1)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
    textQuaternary: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.12)'
  };

  const cookieCategories = [
    {
      key: 'necessary',
      title: 'Essential',
      description: 'Required for platform functionality and security',
      required: true
    },
    {
      key: 'analytics',
      title: 'Analytics',
      description: 'Help us understand usage patterns to improve the platform',
      required: false
    },
    {
      key: 'functional',
      title: 'Functional',
      description: 'Remember your preferences and enhance user experience',
      required: false
    },
    {
      key: 'personalization',
      title: 'Personalization',
      description: 'Tailor content and recommendations to your research needs',
      required: false
    }
  ];

  useEffect(() => {
    // A page embedded in another (a prototype's window) never asks: the page
    // around it does.
    if (window.self !== window.top) return;
    const hasConsent = localStorage.getItem('esy-cookie-consent');
    if (!hasConsent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = Object.keys(preferences).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    savePreferences(allAccepted);
    closeNotice();
  };

  const handleAcceptSelected = () => {
    savePreferences(preferences);
    closeNotice();
  };

  const handleAcceptEssential = () => {
    const essentialOnly = Object.keys(preferences).reduce((acc, key) => {
      acc[key] = key === 'necessary';
      return acc;
    }, {});
    savePreferences(essentialOnly);
    closeNotice();
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('esy-cookie-consent', JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }));

    // Analytics integration
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        functionality_storage: prefs.functional ? 'granted' : 'denied',
        personalization_storage: prefs.personalization ? 'granted' : 'denied'
      });
    }

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: prefs }));

    console.log('Cookie preferences saved:', prefs);
  };

  const closeNotice = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      setShowSettings(false);
      setIsAnimating(false);
    }, 300);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getAcceptedCount = () => {
    return Object.values(preferences).filter(Boolean).length;
  };

  const Button = ({ variant, children, onClick, disabled = false, icon: Icon, size = 'default' }) => {
    const [isHovered, setIsHovered] = useState(false);

    const sizeStyles = {
      small: { padding: '0.5rem 1rem', fontSize: '0.8rem' },
      default: { padding: '0.75rem 1.5rem', fontSize: '0.875rem' },
      compact: { padding: '0.5rem 1.25rem', fontSize: '0.85rem' }
    };

    const baseStyle = {
      ...sizeStyles[size],
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: '500',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      opacity: disabled ? 0.5 : 1,
      borderRadius: '6px',
      textDecoration: 'none'
    };

    const variants = {
      primary: {
        ...baseStyle,
        backgroundColor: colors.accent,
        color: colors.background,
      },
      secondary: {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: colors.textPrimary,
        border: `1px solid ${colors.border}`,
      },
      ghost: {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: colors.textSecondary,
        padding: variant === 'ghost' ? '0.5rem' : baseStyle.padding
      }
    };

    const hoverStyles = {
      primary: { 
        opacity: 0.9,
        transform: 'translateY(-1px)'
      },
      secondary: { 
        borderColor: colors.borderHover, 
        backgroundColor: colors.surface
      },
      ghost: { 
        color: colors.textPrimary 
      }
    };

    return (
      <button
        style={{
          ...variants[variant],
          ...(isHovered && !disabled ? hoverStyles[variant] : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        disabled={disabled}
      >
        {Icon && <Icon size={size === 'small' ? 14 : 16} />}
        {children}
      </button>
    );
  };

  const Toggle = ({ checked, onChange, disabled = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        onClick={onChange}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '44px',
          height: '24px',
          backgroundColor: checked ? colors.accent : 'rgba(255,255,255,0.1)',
          border: `1px solid ${checked ? colors.accent : (isHovered ? colors.borderHover : colors.border)}`,
          borderRadius: '12px',
          position: 'relative',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: disabled ? 0.5 : 1
        }}
      >
        <div
          style={{
            width: '18px',
            height: '18px',
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        />
      </button>
    );
  };

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slideDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(100%); opacity: 0; }
          }
        `}
      </style>

      {/* Backdrop overlay when settings are open */}
      {showSettings && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 998,
            opacity: showSettings ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Main Cookie Footer */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: colors.surface,
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${colors.border}`,
          transform: isAnimating ? 'translateY(100%)' : 'translateY(0)',
          opacity: isAnimating ? 0 : 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: !isAnimating ? 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : undefined,
          boxShadow: '0 -10px 25px rgba(0,0,0,0.1)'
        }}
      >
        {/* Settings Panel */}
        {showSettings && (
          <div
            style={{
              padding: '2rem',
              borderBottom: `1px solid ${colors.border}`,
              backgroundColor: colors.background,
              maxHeight: '50vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '2rem' 
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '400',
                    color: colors.textPrimary,
                    margin: 0,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '-0.01em'
                  }}>
                    Cookie Preferences
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: colors.textTertiary,
                    margin: '0.5rem 0 0 0',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {getAcceptedCount()} of {cookieCategories.length} categories enabled
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setShowSettings(false)} icon={X} size="small" />
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {cookieCategories.map((category) => (
                  <div key={category.key} style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '500',
                          color: colors.textPrimary,
                          margin: 0,
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}>
                          {category.title}
                        </h4>
                        {category.required && (
                          <span style={{
                            fontSize: '0.7rem',
                            color: colors.textQuaternary,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Required
                          </span>
                        )}
                      </div>
                      <Toggle 
                        checked={preferences[category.key]}
                        onChange={() => togglePreference(category.key)}
                        disabled={category.required}
                      />
                    </div>
                    <p style={{
                      fontSize: '0.9rem',
                      color: colors.textSecondary,
                      margin: 0,
                      lineHeight: '1.5',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${colors.border}`,
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button variant="primary" onClick={handleAcceptSelected}>
                    Save My Preferences
                  </Button>
                  <Button variant="secondary" onClick={handleAcceptAll}>
                    Accept All (Recommended)
                  </Button>
                </div>
                <button
                  onClick={handleAcceptEssential}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: colors.textQuaternary,
                    fontSize: '0.8rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    textDecoration: 'underline',
                    opacity: 0.5,
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.7'}
                  onMouseOut={(e) => e.target.style.opacity = '0.5'}
                >
                  Essential cookies only
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Banner Content */}
        <div style={{ 
          padding: showSettings ? '1.5rem 2rem' : '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* Content */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: colors.accent,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Shield size={16} color={colors.background} />
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: colors.textPrimary,
                  margin: 0,
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  We respect your privacy
                </h3>
              </div>
              
              <p style={{
                fontSize: '0.95rem',
                color: colors.textSecondary,
                lineHeight: '1.6',
                margin: 0,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                We use cookies to enhance your academic research experience with personalized insights, 
                improved writing assistance, and seamless platform functionality. 
                Accepting all cookies helps us provide the best possible service.{' '}
                <a 
                  href="/privacy/" 
                  style={{ 
                    color: colors.accent, 
                    textDecoration: 'none',
                    borderBottom: `1px solid rgba(0, 168, 150, 0.3)`,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.borderBottomColor = colors.accentHover;
                    e.target.style.opacity = '0.8';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderBottomColor = 'rgba(0, 168, 150, 0.3)';
                    e.target.style.opacity = '1';
                  }}
                >
                  Learn more
                </a>
              </p>
            </div>

            {/* Actions */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              flexShrink: 0,
              flexWrap: 'wrap'
            }}>
              <Button 
                variant="ghost" 
                onClick={() => setShowSettings(!showSettings)} 
                icon={Settings}
                size="compact"
              >
                {showSettings ? 'Hide Settings' : 'Customize'}
              </Button>
              <Button variant="primary" onClick={handleAcceptAll} size="default">
                Accept All & Continue
              </Button>
              <button
                onClick={handleAcceptEssential}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: colors.textQuaternary,
                  fontSize: '0.8rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  textDecoration: 'underline',
                  opacity: 0.6,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.8'}
                onMouseOut={(e) => e.target.style.opacity = '0.6'}
              >
                Essential only
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EsyCookieNotice; 