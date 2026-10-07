# Essays Components

A comprehensive set of React components for displaying academic essays with advanced reading features, accessibility, and responsive design.

## Components Overview

### Core Components

- **EssayReader** - Main container component with progress tracking and theme management
- **EssayHeader** - Navigation header with controls for font size, theme, bookmarks, and sharing
- **EssayContent** - Main content area with typography and section management
- **EssayMetadata** - Author information and related essays section
- **TableOfContents** - Interactive sidebar navigation for essay sections

## Features

### 🎨 **Enhanced Styling**
- **Typography Hierarchy**: Refined font sizes, weights, and spacing
- **Visual Polish**: Gradient backgrounds, hover effects, and smooth animations
- **Blockquotes**: Enhanced styling with decorative quotes and better spacing
- **Interactive Elements**: Hover states, focus indicators, and micro-interactions

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes (320px - 1200px+)
- **Adaptive Layout**: Flexible components that adapt to different viewports
- **Touch-Friendly**: Appropriate touch targets for mobile devices
- **Breakpoint System**: 
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px

### ♿ **Accessibility (WCAG 2.1 AA)**
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility with focus management
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **Color Contrast**: High contrast ratios for text and interactive elements
- **Reduced Motion**: Respects user's motion preferences
- **Focus Indicators**: Clear focus states for all interactive elements

### 🎯 **Interactive Features**
- **Progress Tracking**: Real-time reading progress indicator
- **Theme Switching**: Dark/light theme with smooth transitions
- **Font Size Controls**: Three size options with visual feedback
- **Table of Contents**: Interactive navigation with active section highlighting
- **Bookmarking**: Save essays for later reading
- **Social Sharing**: Share on Twitter, LinkedIn, or copy link
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior

### 🔧 **Technical Improvements**
- **CSS Modules**: Scoped styling with theme variants
- **Performance**: Optimized animations and transitions
- **Cross-Browser**: Compatible with modern browsers
- **Print Styles**: Optimized for printing
- **Custom Scrollbars**: Themed scrollbars for better UX

## Usage

### Basic Implementation

```jsx
import EssayReader from '@/components/Essays/EssayReader';

const MyEssayPage = () => {
  const essay = {
    title: "Essay Title",
    authors: ["Author Name"],
    institution: "Institution",
    publishDate: "Date",
    readTime: 15,
    abstract: "Essay abstract..."
  };

  return (
    <EssayReader
      essay={essay}
      essayContent="<p>Essay content...</p>"
      onBackToEssays={() => router.push('/essays')}
    />
  );
};
```

### Custom Styling

All components use CSS modules with theme variants:

```css
/* Dark theme */
.componentDark {
  background: #0a0a0f;
  color: #ffffff;
}

/* Light theme */
.componentLight {
  background: #ffffff;
  color: #000000;
}
```

## Component Architecture

### State Management
- **Local State**: Component-specific state (scroll progress, theme, etc.)
- **Props**: Data flow from parent components
- **CSS Variables**: Theme-based styling with CSS custom properties

### Event Handling
- **Scroll Events**: Progress tracking and section highlighting
- **Keyboard Events**: Accessibility and navigation shortcuts
- **Click Events**: Interactive controls and navigation
- **Resize Events**: Responsive behavior

### Performance Optimizations
- **useCallback**: Memoized event handlers
- **useEffect**: Efficient side effects with proper cleanup
- **CSS Transitions**: Hardware-accelerated animations
- **Lazy Loading**: Components load only when needed

## Accessibility Features

### Screen Reader Support
- `aria-label` attributes for all interactive elements
- `aria-expanded` for collapsible sections
- `aria-current` for active navigation items
- `aria-pressed` for toggle buttons
- `role` attributes for semantic structure

### Keyboard Navigation
- **Tab Order**: Logical tab sequence
- **Escape Key**: Close modals and overlays
- **Arrow Keys**: Navigate through lists and menus
- **Enter/Space**: Activate buttons and links

### Visual Accessibility
- **High Contrast**: Meets WCAG AA standards
- **Focus Indicators**: Clear focus states
- **Reduced Motion**: Respects user preferences
- **Color Independence**: Information not conveyed by color alone

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Development

### File Structure
```
src/components/Essays/
├── EssayReader.js              # Main container
├── EssayReader.module.css      # Container styles
├── EssayHeader.js              # Navigation header
├── EssayHeader.module.css      # Header styles
├── EssayContent.js             # Content display
├── EssayContent.module.css     # Content styles
├── EssayMetadata.js            # Metadata section
├── EssayMetadata.module.css    # Metadata styles
├── TableOfContents.js          # Navigation sidebar
├── TableOfContents.module.css  # TOC styles
├── essayUtils.js               # Utility functions
└── README.md                   # Documentation
```

### Styling Guidelines
- Use CSS modules for component-scoped styles
- Implement theme variants for dark/light modes
- Include responsive breakpoints for all components
- Add focus states for all interactive elements
- Use semantic color names and CSS custom properties

### Testing
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard navigation
- Check color contrast ratios
- Test responsive behavior across devices
- Validate ARIA attributes

## Recent Improvements

### Version 2.0 Enhancements
- ✅ Enhanced visual design with gradients and animations
- ✅ Improved responsive design for all screen sizes
- ✅ Comprehensive accessibility features
- ✅ Better typography and spacing
- ✅ Interactive hover states and micro-animations
- ✅ Custom scrollbar styling
- ✅ Print-optimized styles
- ✅ Performance optimizations
- ✅ Cross-browser compatibility
- ✅ Semantic HTML structure

### Future Enhancements
- [ ] Reading time estimation
- [ ] Offline support with service workers
- [ ] Advanced search and filtering
- [ ] Citation management
- [ ] Collaborative annotations
- [ ] Export to PDF/EPUB
- [ ] Reading analytics
- [ ] Multi-language support 