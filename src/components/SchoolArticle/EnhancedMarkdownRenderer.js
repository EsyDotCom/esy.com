'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import styles from './EnhancedMarkdownRenderer.module.css';
import { visit } from 'unist-util-visit';
import CardGroup from './CardGroup';
import Image from 'next/image';

// Custom components for rich content
const KeyInsightBox = ({ children }) => (
  <div className={styles.keyInsightBox}>
    <div className={styles.keyInsightIcon}>💡</div>
    <div className={styles.keyInsightContent}>
      <strong>Key Insight</strong>
      <div>{children}</div>
    </div>
  </div>
);

const StrategyCard = ({ title, description, example }) => (
  <div className={styles.strategyCard}>
    <h4 className={styles.strategyTitle}>{title}</h4>
    <p className={styles.strategyDescription}>{description}</p>
    {example && (
      <div className={styles.strategyExample}>
        <strong>Example:</strong> {example}
      </div>
    )}
  </div>
);

const VideoCard = ({ title, description, duration, thumbnail }) => (
  <div className={styles.videoCard}>
    <div className={styles.videoThumbnail}>
      {thumbnail && <Image src={thumbnail} alt={title} width={320} height={180} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />}
      <div className={styles.playButton}>▶</div>
    </div>
    <div className={styles.videoContent}>
      <h4 className={styles.videoTitle}>{title}</h4>
      <p className={styles.videoDescription}>{description}</p>
      <span className={styles.videoDuration}>{duration}</span>
    </div>
  </div>
);

const CallToAction = ({ title, description, buttonText, buttonLink }) => (
  <div className={styles.callToAction}>
    <h3 className={styles.ctaTitle}>{title}</h3>
    <p className={styles.ctaDescription}>{description}</p>
    <a href={buttonLink} className={styles.ctaButton}>
      {buttonText}
    </a>
  </div>
);

// Custom directive plugin for react-markdown
function directivePlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        node.data = node.data || {};
        if (
          typeof node.name === 'string' &&
          /^[a-zA-Z][a-zA-Z0-9-]*$/.test(node.name)
        ) {
          node.data.hName = node.name;
        } else {
          // Fallback to div and log a warning
          node.data.hName = 'div';
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `Invalid directive name '${node.name}' encountered in markdown. Falling back to <div>.`,
              node
            );
          }
        }
        node.data.hProperties = node.attributes || {};
      }
    });
  };
}

// True when a hast node contains, at any depth, an image with a non-empty
// title: one the img override below turns into a <figure>.
function hasCaptionedImg(node) {
  return Boolean(
    node?.children?.some(
      (child) =>
        (child.tagName === 'img' && String(child.properties?.title ?? '').trim()) ||
        hasCaptionedImg(child),
    ),
  );
}

const components = {
  // Handle blockquotes as key insights
  blockquote: ({ children }) => {
    const text = React.Children.toArray(children).join('');
    if (text.includes('💡') || text.includes('Key Insight')) {
      return <KeyInsightBox>{children}</KeyInsightBox>;
    }
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
  },
  
  // Handle code blocks with syntax highlighting
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <div className={styles.codeBlockWrapper}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLanguage}>{match[1]}</span>
          <button 
            className={styles.copyButton}
            onClick={() => {
              navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
            }}
          >
            Copy
          </button>
        </div>
        <pre className={styles.codeBlock}>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    ) : (
      <code className={styles.inlineCode} {...props}>
        {children}
      </code>
    );
  },
  
  // Handle headings with better styling
  h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
  h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
  h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
  h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
  
  // Handle lists with better styling
  ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
  ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
  li: ({ children }) => <li className={styles.li}>{children}</li>,
  
  // Handle links with better styling
  a: ({ href, children }) => (
    <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  
  // Handle images with Next.js Image for optimization. Compose exports an
  // image's caption as its markdown title (`![alt](src "caption")`), so a
  // titled image becomes a figure with a visible caption; an untitled one
  // renders exactly as it always has.
  img: ({ src, alt, title }) => {
    const image = (
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={450}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 660px"
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '12px',
          margin: '1.5rem 0',
          boxShadow: '0 2px 12px rgba(10, 37, 64, 0.08)',
        }}
      />
    );
    const caption = typeof title === 'string' ? title.trim() : '';
    if (!caption) return image;
    return (
      <figure className={styles.captionedFigure}>
        {image}
        <figcaption>{caption}</figcaption>
      </figure>
    );
  },

  // Handle paragraphs with better spacing. A paragraph holding an image is
  // unwrapped so the image (or its <figure>) never sits inside a <p>; a
  // captioned image nested in a link is unwrapped too, since a <figure>
  // inside a <p> is invalid HTML and breaks hydration.
  p: ({ children, node }) => {
    const hasImg = node?.children?.some(child => child.tagName === 'img');
    if (hasImg || hasCaptionedImg(node)) return <>{children}</>;
    return <p className={styles.paragraph}>{children}</p>;
  },
  
  // Handle tables with better styling
  table: ({ children }) => <table className={styles.table}>{children}</table>,
  thead: ({ children }) => <thead className={styles.thead}>{children}</thead>,
  tbody: ({ children }) => <tbody className={styles.tbody}>{children}</tbody>,
  tr: ({ children }) => <tr className={styles.tr}>{children}</tr>,
  th: ({ children }) => <th className={styles.th}>{children}</th>,
  td: ({ children }) => <td className={styles.td}>{children}</td>,
  keyinsight: ({ children }) => <KeyInsightBox>{children}</KeyInsightBox>,
  strategy: ({ title, description, example }) => <StrategyCard title={title} description={description} example={example} />,
  video: ({ title, description, duration, thumbnail }) => <VideoCard title={title} description={description} duration={duration} thumbnail={thumbnail} />,
  callToAction: ({ title, description, buttonText, buttonLink }) => <CallToAction title={title} description={description} buttonText={buttonText} buttonLink={buttonLink} />,
};

const EnhancedMarkdownRenderer = ({ content, light = false }) => {
  return (
    <div className={`${styles.markdownContainer} ${light ? styles.markdownContainerLight : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, directivePlugin]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Export custom components for MDX usage
export { KeyInsightBox, StrategyCard, VideoCard, CallToAction, CardGroup };

export default EnhancedMarkdownRenderer; 