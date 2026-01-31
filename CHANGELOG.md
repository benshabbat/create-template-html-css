# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.2] - 2026-02-01

### Added
- **Prettier Code Formatting**: All generated and inserted code is automatically formatted
  - HTML files formatted with proper indentation and line breaks
  - CSS files formatted with consistent style
  - JavaScript files formatted with proper syntax

### Improved
- **Simplified Backup Naming**: Backup files no longer include timestamps
  - Old format: `file.html.backup.1769896716907`
  - New format: `file.html.backup` (simple and clean)
  - Easier to identify and manage backup files

### Fixed
- Code formatting issues in generated templates
- Better indentation consistency across all file types
- Cleaner output for inserted components

## [1.6.1] - 2026-01-31

### Added
- **Folder-Based Organization**: Components automatically organized in css/ and js/ subdirectories
  - Generator creates structured layout: `component-name/css/style.css` and `component-name/js/script.js`
  - Insert command places CSS in project's `css/` folder and JS in `js/` folder
  - Supports both separate files and inline modes with folder structure

### Improved
- **HTML Formatting**: Fixed regex patterns to ensure clean, properly-formatted HTML output
  - Non-greedy body extraction prevents duplicate closing tags
  - Automatic removal of script tags from component bodies
  - Clean indentation and tag hierarchy
  - Tested with multiple component insertions (button + card + modal)
- **Backward Compatibility**: Inline mode (`-s inline --style inline`) works without creating folders
- **Multiple Component Support**: Verified working with multiple components in same file

### Fixed
- HTML output no longer contains duplicate `</body>` or `</html>` tags
- Component body extraction now uses non-greedy regex matching
- Script tags embedded in templates are properly filtered out
- Proper folder structure creation before writing files

## [1.6.0] - 2026-01-31

### Added
- **CLI Flags for Power Users**: Non-interactive command-line interface
  - Create templates with flags: `create -c button -n my-btn`
  - Insert components with flags: `insert -f index.html -c card -s separate`
  - Verbose mode for debugging: `--verbose` or `-v`
  - JavaScript inclusion control: `--include-js` or `--no-include-js`
  - Script mode options: `inline`, `separate`, or `skip`
  - Full backwards compatibility with interactive prompts

- **Insert Feature Enhancements**:
  - HTML structure validation: Checks for DOCTYPE, html, head, body tags
  - Backup functionality: Creates timestamped backups before modification
  - Backup flag: `--backup` or `-b` to enable backup creation
  - Duplicate component detection: Prevents reinserting same component
  - Detailed error messages for common issues

### Improved
- Help messages now show both interactive and non-interactive examples
- Added comprehensive CLI documentation with flag descriptions
- Better error handling and validation for flag inputs
- Enhanced help output with usage patterns
- Insert command now displays backup file path in output when created
- Security improvements: Input validation and path traversal protection
- Better indentation handling in inserted components

### Features Enabled
- 🤖 Automation: Use in shell scripts and CI/CD pipelines
- 📋 Batch operations: Create multiple templates in succession
- 🔄 Backwards compatible: Interactive mode still works for regular users
- 📊 Better for scripts: Non-interactive mode perfect for automation
- 🛡️ Safety: Backup files protect against accidental data loss

## [1.5.0] - 2026-01-31

### Added
- **4 New DOM Manipulation Templates**:
  - **Todo List**: Interactive task management with add/remove items, checkboxes for completion status, and real-time statistics
  - **Counter**: Increment/decrement counter with adjustable step sizes, color-changing display, and change history
  - **Accordion**: Collapsible FAQ-style sections with smooth animations and toggle functionality
  - **Tabs**: Multi-section content switcher with keyboard navigation (arrow keys) and fade-in animations
- All new templates include automatic `<script src="script.js"></script>` tag in generated HTML
- Enhanced component selection in CLI with new DOM Manipulation Examples category

### Improved
- JavaScript file is now always automatically included when creating templates (no confirmation prompt)
- Better template organization in CLI with category separators
- Updated component list command to show all 23 available templates

## [1.4.3] - 2025-01-29

### Documentation
- Enhanced README with detailed card template variations
- Added comprehensive card features and interactions documentation
- Improved visual presentation of template capabilities

## [1.4.2] - 2025-01-29

### Enhanced
- **Card Template Improvements**:
  - 6 professional card variations: Modern (featured), Premium (pricing), Blog (tags), Minimal (clean), User Profile (avatar), Interactive (action buttons)
  - Rich interactions: like/save buttons, social links, tag filtering, toast notifications
  - Professional gradient styling and animations
  - Enhanced badges, metadata displays (ratings, dates, comments, authors)
  - Improved hover effects and button animations with ripple effect
  - Better mobile responsiveness

## [1.4.1] - 2025-01-29

### Improved
- **Enhanced Insert Feature**:
  - Better indentation handling - respects existing HTML file formatting
  - Improved duplicate detection - prevents inserting same component twice
  - Unique component IDs - all styles/scripts get unique identifiers
  - File validation - checks if HTML file exists before insertion
  - All 19 components now available in insert command (was only 9 basic ones)
  
- **Improved CLI**:
  - Better visual design with emojis and separators
  - Organized component lists with categories
  - File existence validation before insertion
  - Enhanced help text and examples
  - Better status messages with clear summaries
  - Separated files as default for CSS insertion

### Technical Details
- Simplified indentation detection using HTML file's existing format
- Added `path` and `fs` imports for better file handling
- Improved error messages for better debugging
- Extended insert command with all template categories

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
