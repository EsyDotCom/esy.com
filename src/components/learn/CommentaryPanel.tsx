"use client";

import React from 'react';
import {
  ExternalLink, Download, Github, FileText, Clock
} from 'lucide-react';
import type { LessonCommentary, LessonResource, TimestampRef } from '@/lib/learn/types';
import { relFor } from '@/lib/outbound';

interface CommentaryPanelProps {
  commentary: LessonCommentary;
  onSeek: (ms: number) => void;
  isDark: boolean;
}

function formatMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

const resourceIcons: Record<string, React.ReactNode> = {
  link: <ExternalLink size={14} />,
  download: <Download size={14} />,
  github: <Github size={14} />,
  paper: <FileText size={14} />,
};

export default function CommentaryPanel({ commentary, onSeek, isDark }: CommentaryPanelProps) {
  const accent = isDark ? '#00D4AA' : '#00A896';
  const text = isDark ? '#FFFFFF' : '#1A1A2E';
  const muted = isDark ? 'rgba(255,255,255,0.55)' : '#6C757D';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const codeBg = isDark ? 'rgba(15, 52, 96, 0.4)' : '#F5F6F8';
  const blockquoteBorder = isDark ? accent : '#00A896';
  const blockquoteBg = isDark ? 'rgba(0,212,170,0.05)' : 'rgba(0,168,150,0.03)';

  // Simple markdown renderer (handles headers, bold, code blocks, blockquotes, lists, tables)
  const renderMarkdown = (md: string) => {
    const lines = md.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code block
      if (line.trim().startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        elements.push(
          <pre key={key++} style={{
            backgroundColor: codeBg, border: `1px solid ${border}`,
            borderRadius: '8px', padding: '1rem', margin: '1rem 0',
            overflowX: 'auto', fontSize: '0.813rem', lineHeight: 1.6,
            color: text, fontFamily: 'var(--font-geist-mono), monospace',
          }}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        continue;
      }

      // Table
      if (line.includes('|') && line.trim().startsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        // Parse table
        const rows = tableLines.filter(l => !l.match(/^\|[\s-:|]+\|$/)).map(l =>
          l.split('|').filter(c => c.trim()).map(c => c.trim())
        );
        if (rows.length > 0) {
          const header = rows[0];
          const body = rows.slice(1);
          elements.push(
            <div key={key++} style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{
                width: '100%', borderCollapse: 'collapse',
                fontSize: '0.813rem',
              }}>
                <thead>
                  <tr>
                    {header.map((h, hi) => (
                      <th key={hi} style={{
                        padding: '0.5rem 0.75rem', textAlign: 'left',
                        borderBottom: `2px solid ${border}`,
                        color: text, fontWeight: 600,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{
                          padding: '0.5rem 0.75rem',
                          borderBottom: `1px solid ${border}`,
                          color: isDark ? 'rgba(255,255,255,0.8)' : '#555',
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      // Heading
      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={key++} style={{
            fontSize: '0.938rem', fontWeight: 600, color: text,
            margin: '1.5rem 0 0.5rem',
          }}>{line.slice(4)}</h4>
        );
        i++; continue;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={key++} style={{
            fontSize: '1.063rem', fontWeight: 700, color: text,
            margin: '1.75rem 0 0.625rem',
          }}>{line.slice(3)}</h3>
        );
        i++; continue;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('> ')) {
          quoteLines.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <blockquote key={key++} style={{
            borderLeft: `3px solid ${blockquoteBorder}`,
            backgroundColor: blockquoteBg,
            padding: '0.75rem 1rem', margin: '1rem 0',
            borderRadius: '0 6px 6px 0',
          }}>
            {quoteLines.map((ql, qi) => (
              <p key={qi} style={{
                fontSize: '0.813rem', color: isDark ? 'rgba(255,255,255,0.85)' : '#444',
                lineHeight: 1.6, margin: qi > 0 ? '0.5rem 0 0' : 0,
              }}>
                {renderInline(ql)}
              </p>
            ))}
          </blockquote>
        );
        continue;
      }

      // Unordered list
      if (line.match(/^- /)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].match(/^- /)) {
          listItems.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={key++} style={{
            margin: '0.75rem 0', paddingLeft: '1.25rem',
            listStyleType: 'none',
          }}>
            {listItems.map((item, li) => (
              <li key={li} style={{
                fontSize: '0.813rem', color: isDark ? 'rgba(255,255,255,0.8)' : '#555',
                lineHeight: 1.7, marginBottom: '0.375rem',
                paddingLeft: '0.5rem',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', left: '-0.75rem', top: '0.5em',
                  width: '4px', height: '4px', borderRadius: '50%',
                  backgroundColor: accent,
                }} />
                {renderInline(item)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered list
      if (line.match(/^\d+\. /)) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].match(/^\d+\. /)) {
          listItems.push(lines[i].replace(/^\d+\. /, ''));
          i++;
        }
        elements.push(
          <ol key={key++} style={{
            margin: '0.75rem 0', paddingLeft: '1.25rem',
          }}>
            {listItems.map((item, li) => (
              <li key={li} style={{
                fontSize: '0.813rem', color: isDark ? 'rgba(255,255,255,0.8)' : '#555',
                lineHeight: 1.7, marginBottom: '0.375rem',
              }}>
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Empty line
      if (!line.trim()) { i++; continue; }

      // Paragraph
      elements.push(
        <p key={key++} style={{
          fontSize: '0.813rem', color: isDark ? 'rgba(255,255,255,0.8)' : '#555',
          lineHeight: 1.7, margin: '0.625rem 0',
        }}>
          {renderInline(line)}
        </p>
      );
      i++;
    }

    return elements;
  };

  // Inline formatting: bold, inline code, links
  const renderInline = (text: string): React.ReactNode => {
    // Bold
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ fontWeight: 600, color: isDark ? '#FFFFFF' : '#333' }}>{part.slice(2, -2)}</strong>;
      }
      // Inline code
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cp, ci) => {
        if (cp.startsWith('`') && cp.endsWith('`')) {
          return (
            <code key={`${i}-${ci}`} style={{
              backgroundColor: codeBg, padding: '1px 4px',
              borderRadius: '3px', fontSize: '0.75rem',
              fontFamily: 'var(--font-geist-mono), monospace',
            }}>
              {cp.slice(1, -1)}
            </code>
          );
        }
        return cp;
      });
    });
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '1rem 0.75rem' }}>
      {/* Timestamp references */}
      {commentary.timestampRefs.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{
            fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.05em', color: muted, marginBottom: '0.5rem',
          }}>
            Jump to Timestamp
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {commentary.timestampRefs.map((ref, i) => (
              <button
                key={i}
                onClick={() => onSeek(ref.timeMs)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.25rem 0.625rem',
                  backgroundColor: isDark ? 'rgba(0,212,170,0.08)' : 'rgba(0,168,150,0.06)',
                  border: `1px solid ${isDark ? 'rgba(0,212,170,0.15)' : 'rgba(0,168,150,0.12)'}`,
                  borderRadius: '6px', cursor: 'pointer',
                  fontSize: '0.75rem', color: accent,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,212,170,0.15)' : 'rgba(0,168,150,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,212,170,0.08)' : 'rgba(0,168,150,0.06)';
                }}
                aria-label={`Jump to ${ref.label} at ${formatMs(ref.timeMs)}`}
              >
                <Clock size={10} />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatMs(ref.timeMs)}</span>
                <span style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#666' }}>{ref.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Commentary content */}
      <div>{renderMarkdown(commentary.markdown)}</div>

      {/* Resources */}
      {commentary.resources.length > 0 && (
        <div style={{
          marginTop: '1.5rem', paddingTop: '1.25rem',
          borderTop: `1px solid ${border}`,
        }}>
          <h4 style={{
            fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.05em', color: muted, marginBottom: '0.75rem',
          }}>
            Resources
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {commentary.resources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel={relFor(res.url, { newTab: true })}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  padding: '0.625rem 0.75rem',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFC',
                  border: `1px solid ${border}`,
                  borderRadius: '8px', textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(0,212,170,0.05)' : 'rgba(0,168,150,0.03)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFC';
                }}
              >
                <div style={{ color: accent, marginTop: '2px' }}>
                  {resourceIcons[res.type] || <ExternalLink size={14} />}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.813rem', fontWeight: 500, color: text,
                  }}>{res.title}</div>
                  {res.description && (
                    <div style={{
                      fontSize: '0.75rem', color: muted, marginTop: '0.125rem',
                    }}>{res.description}</div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
