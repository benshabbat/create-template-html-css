# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - v2.1.0

### 🏗️ Major Refactoring

#### Changed - Code Deduplication
- **Centralized Components Registry** - Eliminated duplicate component lists
  - Created `src/components-registry.js` as single source of truth
  - Contains `VALID_COMPONENTS` array (46 components, alphabetically sorted)
  - Contains `COMPONENT_CHOICES` with categorized prompts
  - Removed duplicates from:
    - `src/generators/validation.js` - Now imports from registry
    - `src/inserters/validation-utils.js` - Now imports from registry
    - `src/component-choices.js` - Now re-exports from registry (deprecated)
  - Reduced code duplication by ~130 lines
  - Single maintenance point for component additions

#### Changed - Inserter Module Architecture
- **Modular Inserter Structure** - Split 327-line inserter.js into organized modules
  - Main inserter.js reduced from 327 to 206 lines (37% reduction)
  - New `src/inserters/` directory with specialized modules:
    - `validation-utils.js` (93 lines) - Component validation, HTML structure validation
    - `html-utils.js` (31 lines) - HTML indentation detection and manipulation
    - `backup-utils.js` (19 lines) - File backup creation utilities
    - `component-loader.js` (95 lines) - Template loading for HTML, CSS, and JS files
  - Better separation of concerns and maintainability
  - Security validation maintained throughout refactor

#### Changed - Generator Module Architecture
- **Modular Generator Structure** - Split massive 661-line generator.js into organized modules
  - Main generator.js reduced from 661 to 166 lines (75% reduction!)
  - New `src/generators/` directory with specialized modules:
    - `color-schemes.js` (76 lines) - All color presets and scheme management
    - `color-utils.js` (93 lines) - Color manipulation utilities and dark mode
    - `component-filters.js` (135 lines) - Button, card, spinner variations filtering
    - `html-generators.js` (171 lines) - Navigation and form field generation
    - `validation.js` (61 lines) - Component validation and security utilities
  - Better separation of concerns and maintainability
  - Improved code organization and testability

#### Changed - CLI Module Architecture
- **ES Modules Migration** - Converted entire codebase from CommonJS to ES Modules
  - All `require()` statements replaced with `import`
  - All `module.exports` replaced with `export`
  - Added `"type": "module"` to package.json
  - Updated dynamic imports for optional dependencies (Prettier)
  - Proper `__dirname` support using `fileURLToPath` and `dirname`

- **Modular CLI Architecture** - Refactored CLI from single 618-line file to organized structure
  - Main CLI file reduced from 618 to 85 lines (86% reduction!)
  - Commands split into separate modules in `bin/commands/` directory
  - `create.js` - 174 lines (handles template creation with prompts)
  - `insert.js` - 123 lines (handles component insertion into HTML)
  - `list.js` - 73 lines (displays all 46 available components)
  - `gallery.js` - 42 lines (opens interactive component gallery)
  - Total reduction: 618 lines → 497 lines across 5 files

#### Added
- **Enhanced Security** - Comprehensive input validation for component names
  - Blocks path traversal attacks (`../`, `..\`, `/../`, `\..\`)
  - Prevents path separator usage in component names (`/`, `\`)
  - Validates both interactive prompts and command-line flags
  - Maximum name length limit (100 characters)
  - Allows legitimate names with dots (e.g., "my-component-2.0")
  - Protects against directory traversal to parent/system directories

#### Technical Improvements
- Better code maintainability with modular architecture
- Improved performance with ES Modules tree-shaking
- Cleaner separation of concerns (each command in its own file)
- Enhanced error handling and validation
- All file imports include `.js` extension (ES Modules requirement)
- Cross-platform `__dirname` support in ES Modules environment

## [2.0.2] - 2026-02-05

### Fixed
- Added all 16 game templates to CLI interactive prompts (create and insert commands)
- Users can now select game templates from the interactive menu
- Previously only accessible via command flags

### Changed
- CLI now shows all 46 templates in interactive mode with 🎮 emoji for games

## [2.0.1] - 2026-02-05

### Added
- Interactive component gallery (COMPONENTS-GALLERY.html)
- Search functionality in gallery
- Copy-to-clipboard buttons for all commands
- Modern responsive design with animations
- Author credit updated

### Changed
- Updated .npmignore to exclude demo-games and .tgz files

## [2.0.0] - 2026-02-05

### Added
- **12 Additional Interactive Game Templates**: Major expansion with diverse game genres
  
  **Puzzle & Strategy Games**:
  - **2048**: Addictive tile-merging puzzle with touch & keyboard controls, undo feature, best score tracking
  - **Connect Four**: Classic 4-in-a-row with AI opponent (3 difficulty levels), drop animations, win detection
  - **Simon Says**: Memory pattern game with increasing difficulty, sound effects, high score tracking
  
  **Arcade Classics**:
  - **Breakout**: Brick breaker with lives system, level progression, paddle/ball physics, mouse & keyboard
  - **Tetris**: Full Tetris with all 7 pieces, ghost preview, next piece display, level/speed progression
  - **Flappy Bird**: Tap-to-flap obstacle game with animated background, realistic physics, increasing difficulty
  - **Pong**: Classic paddle game with AI opponent (4 difficulty levels), 2-player mode, realistic ball physics
  - **Whack-a-Mole**: Fast-paced arcade with difficulty levels, combo system, high score tracking
  
  **Card & Casino Games**:
  - **Blackjack**: Full 21 card game with betting system, dealer AI, Hit/Stand/Double, 3:2 blackjack payout
  - **Slot Machine**: 3-reel slots with 8 weighted symbols, jackpot x100, confetti celebration, paytable
  
  **Skill Games**:
  - **Dice Game**: Race to 100 strategy game with AI opponent, roll/hold mechanics, animated dice
  - **Rock-Paper-Scissors**: Classic hand game vs AI with best-of series, winning streak tracking

- **Enhanced Game Features**:
  - Multiple AI difficulty levels in strategy games
  - Advanced physics engines (Breakout, Pong, Flappy Bird)
  - Complex game state management (Tetris, Blackjack)
  - Canvas-based rendering for arcade games
  - Weighted random algorithms (Slot Machine)
  - localStorage for all game progress/scores
  - Touch and keyboard control support
  - Professional animations and visual feedback
  - Responsive designs for all screen sizes

### Changed
- Updated total template count from 30 to 46 components
- Expanded "Interactive Games" category from 4 to 16 games
- Updated CLI list command to display all 46 templates
- All game UI text translated to English
- Package version bumped to 2.0.0 (major release)

### Technical Details
- All games are fully self-contained and work offline
- No external dependencies required
- Compatible with all modern browsers
- Canvas API used for rendering in applicable games
- Complex AI implementations (minimax-style for Connect Four, strategic for Dice Game)
- Proper game loop implementations with requestAnimationFrame

## [1.9.0] - 2026-02-05

### Added
- **4 New Interactive Game Templates**: Complete, playable games with full functionality
  - **Tic-Tac-Toe**: Classic X and O game with score tracking, win detection, auto-reset, and winning cell highlighting
  - **Memory Game**: Card matching game with 3 difficulty levels (4×4, 4×5, 4×6), move counter, timer, and emoji cards
  - **Snake Game**: Classic snake with keyboard/touch controls, canvas rendering, increasing speed, and high score tracking
  - **Guess the Number**: Number guessing game with hot/cold hints, 3 difficulty levels (1-100, 1-500, 1-1000), and best score tracking

- **Game Features**:
  - Complete game logic and state management
  - Score persistence using localStorage
  - Responsive designs for mobile and desktop
  - Smooth animations and visual feedback
  - Touch and keyboard controls support
  - Professional UI with modern gradients
  - Win/lose detection and celebration animations

### Changed
- Updated CLI list command to show 30 total components (was 26)
- Added new "Interactive Games" category in component list
- Updated package version from 1.8.1 to 1.9.0

### Technical Details
- All games include HTML, CSS, and JavaScript files
- Games are fully self-contained and work offline
- No external dependencies required
- Compatible with all modern browsers

## [1.8.0] - 2026-02-02

### Added
- **Dark Mode Support**: Automatic dark mode detection and styling
  - `--dark-mode` CLI flag enables dark theme support
  - Uses `prefers-color-scheme: dark` media query
  - Automatic color inversion for readability
  - Fallback CSS variables for light theme
  - Works with all 26 templates

- **Color Customizer**: Create components with custom colors
  - `--primary-color <hex>` flag for primary gradient color
  - `--secondary-color <hex>` flag for secondary color  
  - Automatic CSS variables generation
  - RGB value calculation for rgba() support
  - Color validation with helpful error messages

- **Color Scheme Presets**: 10 beautiful pre-made color schemes
  - Vibrant, Pastel, Ocean, Sunset, Forest, Purple, Minimal, Coral, Teal, Neon
  - `--color-scheme <scheme>` flag for instant color selection
  - Interactive CLI prompts for scheme selection
  - Each scheme with complementary primary and secondary colors
  - Perfect for creating branded components quickly

- **Interactive Component Gallery** (COMPONENTS-GALLERY.html):
  - Browse all 26 components with descriptions
  - Search functionality for quick discovery
  - Filter by component category
  - Copy CLI commands with one-click button
  - Live color scheme preview section with hex values
  - Interactive color scheme cards with copy commands
  - Dark mode support built-in
  - Responsive mobile design
  - Print-friendly layout
  - Live component statistics

- **Enhanced CLI Features**:
  - Dark mode and color options in interactive mode
  - Color validation (hex format)
  - Updated help text with new examples
  - Better example commands showing customization

- **Login Form Template**: Professional authentication form with complete validation
  - Email and password validation
  - "Remember me" checkbox functionality
  - "Forgot password" link handler
  - Social login buttons (Google, GitHub placeholders)
  - Real-time form validation with error messages
  - Focus states and smooth animations
  - Mobile-responsive design
  - Integration with navigation modal

- **Register Form Template**: Advanced user registration form
  - Real-time password strength validator
  - Password requirements display (8+ chars, uppercase, number, special char)
  - Username validation (3-20 characters, alphanumeric + underscore)
  - Password matching validator with visual feedback
  - Full name, email, and username fields
  - Terms of Service and newsletter subscription checkboxes
  - Dynamic submit button (enabled only when all requirements met)
  - Social registration options (Google, GitHub)
  - Professional gradient styling
  - Mobile-optimized layout

- **Login Modal Integration**: Navigation component now includes built-in login modal
  - Login button in navigation bar
  - Modal window with complete login form
  - Multiple close options (X button, ESC key, overlay click)
  - Smooth animations and transitions
  - Prevents body scroll when modal is open
  - Fully responsive on mobile devices

- **CLI Support**: Added Login and Register templates to CLI
  - New "Authentication Forms" category in component selection
  - Full support for template creation with `create-template create -c login -n my-login`
  - Support for template insertion with `create-template insert`

- **Skeleton Loading Template**: Loading placeholders with shimmer animation
  - Multiple skeleton variations (card, article, list, profile, grid)
  - Smooth CSS-based shimmer animation effect
  - Fade-in animations for smooth transitions
  - Toggle button to switch between skeleton and actual content
  - Professional gray gradient styling
  - Responsive grid layout
  - Mobile-responsive design
  - Perfect for displaying while content loads or APIs respond

- **Documentation**: Added CLI-USAGE.md with Hebrew instructions for new features

### Improved
- Enhanced README with Login, Register, and Skeleton template documentation
- Updated template count to 26 templates in features section
- Improved navigation template with modal authentication example
- Better organized authentication-related components

### Technical Details
- All new templates follow project standards and conventions
- Prettier formatting applied to all new files
- Organized folder structure (css/, js/ folders)
- Comprehensive JavaScript validation and error handling
- Cross-browser compatibility ensured

## [1.7.0] - 2026-02-01

### Added
- **Customizable Navigation Items**: Choose exactly which menu items to include when creating navigation components
  - Interactive prompt: "Enter navigation items (comma-separated)"
  - Default: "Home, About, Services, Portfolio, Contact"
  - Automatically generates navigation links and matching page sections
  - Example: "Home, Blog, Shop, About Us, Contact" creates 5 custom navigation items

- **Customizable Form Fields**: Select and customize form fields during creation
  - **Standard Fields**: Choose from 6 predefined fields (Name, Email, Phone, Subject, Message, Terms)
  - **Custom Fields**: Add unlimited custom fields with format `type:label`
  - Supports all HTML5 input types: text, email, url, date, number, tel, password, color, etc.
  - Special field types: textarea, checkbox, select
  - Examples:
    - `text:Age` → text input for age
    - `url:Website` → URL input
    - `date:Birth Date` → date picker
    - `number:Quantity` → number input
    - `textarea:Comments` → text area
    - `checkbox:Subscribe` → checkbox field
    - `select:Country` → dropdown menu

- **Component Variation Selection**: Choose specific variations for components with multiple styles
  - **Button Component**: Select from 6 button types or choose specific ones
    - Primary, Secondary, Success, Danger, Outlined, Disabled
    - Option: "All Buttons (6 variations)" or "Select Specific Buttons"
  - **Card Component**: Select from 6 card variations or choose specific ones
    - Modern Card (Featured), Premium Card (Price), Blog Card (Tags)
    - Minimal Card, User Profile Card, Interactive Card
    - Option: "All Cards (6 variations)" or "Select Specific Cards"
  - **Spinner Component**: Select from 5 spinner types or choose specific ones
    - Circle Spinner, Bouncing Dots, Pulse Loader, Bar Loader, Gradient Ring
    - Option: "All Spinners (5 types)" or "Select Specific Spinners"

### Improved
- Enhanced CLI prompts with better validation and user guidance
- More interactive component creation experience
- Clear format instructions for custom fields
- Cleaner generated HTML when selecting specific variations

### Developer Notes
- Added `generateNavigationItems()` function to dynamically create nav menus
- Added `generateFormFields()` function to handle both standard and custom form fields
- Added `filterButtonVariations()` function to filter button HTML
- Added `filterCardVariations()` function to filter card HTML
- Added `filterSpinnerVariations()` function to filter spinner HTML
- Updated CLI to include conditional prompts based on component type
- Generator now accepts `navItems`, `formFields`, `customFormFields`, and variation parameters

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
