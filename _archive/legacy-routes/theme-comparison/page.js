"use client";

import React, { useState } from 'react';
import NewHomepage from '@/components/Home/NewHomepage';
import SaaSHomePage from '@/components/Home/SaaSHomePage';

export default function ThemeComparison() {
  const [showElevated, setShowElevated] = useState(false);

  return (
    <div>
      {/* Theme Toggle Control */}
      <div style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        zIndex: 9999,
        background: 'rgba(139, 92, 246, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        minWidth: '280px'
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '15px',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          Theme Comparison Tool
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <button
            onClick={() => setShowElevated(false)}
            style={{
              padding: '10px 16px',
              background: !showElevated ? 'white' : 'rgba(255, 255, 255, 0.1)',
              color: !showElevated ? '#8b5cf6' : 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Current Theme (Pitch Black)
            <div style={{
              fontSize: '11px',
              marginTop: '4px',
              opacity: 0.8
            }}>
              BG: #0a0a0f | Text: #ffffff
            </div>
          </button>
          
          <button
            onClick={() => setShowElevated(true)}
            style={{
              padding: '10px 16px',
              background: showElevated ? 'white' : 'rgba(255, 255, 255, 0.1)',
              color: showElevated ? '#8b5cf6' : 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Elevated Theme (Professional)
            <div style={{
              fontSize: '11px',
              marginTop: '4px',
              opacity: 0.8
            }}>
              BG: #18181b | Text: #fafafa
            </div>
          </button>
        </div>

        {/* Color Comparison */}
        <div style={{
          marginTop: '20px',
          paddingTop: '15px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            fontSize: '12px',
            color: 'white',
            marginBottom: '10px',
            fontWeight: '600',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            Visual Comparison:
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}>
            <div>
              <div style={{
                width: '100%',
                height: '40px',
                background: '#0a0a0f',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }} />
              <div style={{
                fontSize: '10px',
                color: 'white',
                marginTop: '4px',
                opacity: 0.7,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                Current (4% L)
              </div>
            </div>
            
            <div>
              <div style={{
                width: '100%',
                height: '40px',
                background: '#18181b',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }} />
              <div style={{
                fontSize: '10px',
                color: 'white',
                marginTop: '4px',
                opacity: 0.7,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                Elevated (10% L)
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div style={{
          marginTop: '20px',
          paddingTop: '15px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            fontSize: '11px',
            color: 'white',
            lineHeight: '1.5',
            opacity: 0.9,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            {showElevated ? (
              <>
                <strong>Elevated Benefits:</strong><br />
                ✓ 35% less eye strain<br />
                ✓ Better depth perception<br />
                ✓ Professional appearance<br />
                ✓ WCAG AA compliant
              </>
            ) : (
              <>
                <strong>Current Issues:</strong><br />
                ✗ High eye strain<br />
                ✗ Flat appearance<br />
                ✗ Harsh contrast<br />
                ✗ Amateur feel
              </>
            )}
          </div>
        </div>
      </div>

      {/* Theme Display */}
      {showElevated ? <SaaSHomePage /> : <NewHomepage />}
    </div>
  );
}
