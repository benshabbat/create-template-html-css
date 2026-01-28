# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-01-18

### Added
- **Flexbox Layout Templates**:
  - `flex-layout` - Comprehensive Flexbox patterns and examples (row, column, space-between, space-around, space-evenly, center, wrap, flex-grow, alignment variations, Holy Grail layout)
  - `flex-cards` - Equal-height card layouts with Flexbox (pricing cards, product cards, team cards, testimonial cards with automatic equal heights and gradient backgrounds)
  - `flex-dashboard` - Complete admin dashboard using Flexbox (collapsible sidebar, top bar with search, stats cards, bar chart, activity feed, top products, quick actions)

### Changed
- Updated template count from 16 to 19 templates
- Enhanced `generator.js` and `inserter.js` with 3 new Flexbox components
- Updated CLI choices in `bin/cli.js` with Flexbox templates
- Enhanced `list` command to show new Flexbox category
- Updated README.md with detailed Flexbox template documentation
- Added `flexbox`, `flex-layout`, and `flex-dashboard` keywords to package.json

### Technical Details
- All Flexbox templates include full HTML, CSS, and JavaScript implementations
- Interactive sidebar collapse functionality
- Responsive design using pure Flexbox (no CSS Grid)
- Modern animations and hover effects
- Equal-height card systems without hacks
- Professional dashboard layouts with Flexbox

## [1.3.0] - 2025-01-18

### Added
- **Animation Templates**: 
  - `spinner` - 5 loading spinner variations (circle, dots, pulse, bars, gradient)
  - `animated-card` - 6 animated card types with flip, glow, slide, scale, tilt, and gradient effects
  - `typing-effect` - Multiple text typing animations with rotating text and code typing
  - `fade-gallery` - Image gallery with fade-in animations, masonry layout, and parallax effects

- **Grid Layout Templates**:
  - `grid-layout` - 4 CSS Grid examples (basic, feature, auto-fit, complex)
  - `masonry-grid` - Pinterest-style layout with filtering and category tags
  - `dashboard-grid` - Complete admin dashboard with sidebar, widgets, and charts

### Changed
- Updated `generator.js` and `inserter.js` with new template components
- Enhanced README.md with detailed descriptions of all 16 templates
- Updated feature list from 9 to 16 templates

### Technical Details
- All new templates include full HTML, CSS, and JavaScript implementations
- Responsive design support across all new components
- Modern animations using CSS keyframes and transforms
- Interactive features with vanilla JavaScript
- Security validation maintained for all new components

## [1.2.2] - Previous Version

### Initial Release
- Button, Card, Form, Navigation, Modal, Footer, Hero, Slider, Table templates
- CLI tool with create, insert, and list commands
- Security features: input validation, filename sanitization, path traversal protection
