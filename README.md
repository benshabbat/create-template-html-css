# Create Template HTML/CSS 🎨⚛️

A powerful CLI library to create HTML+CSS and React component templates. Generate styled UI components in seconds!

[![npm version](https://img.shields.io/npm/v/create-template-html-css.svg)](https://www.npmjs.com/package/create-template-html-css)
[![npm downloads](https://img.shields.io/npm/dm/create-template-html-css.svg)](https://www.npmjs.com/package/create-template-html-css)

```bash
npm install -g create-template-html-css
```

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Create New Project](#create-a-new-project)
  - [Insert into Existing Page](#insert-component-into-existing-html-page)
- [Available Templates](#available-templates)
- [Examples](#examples)
- [Project Structure](#project-structure)
- [Use Cases](#use-cases)
- [Technologies](#technologies)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🚀 **Fast Creation** - Create UI components in seconds
- ⚛️ **React Support** - Generate React components with JSX (v2.1.0+)
- 🎨 **Modern Design** - All templates are designed with high standards
- 📱 **Responsive** - All components adapt to mobile devices
- 🌈 **Stunning Gradients** - Colorful and attractive designs
- ⚡ **Animations** - Smooth and professional effects
- 🔧 **Customizable** - Easy to edit and modify the code
- 📦 **46 HTML Templates + 6 React Components** - Button, Card, Form, Navigation, Modal, Footer, Hero, Slider, Table, Login, Register, Skeleton, Spinner, Animated Cards, Typing Effect, Fade Gallery, Grid Layouts, Masonry Grid, Dashboard, Flexbox Layouts, Todo List, Counter, Accordion, Tabs, 16 Interactive Games
- 🎯 **Two Modes** - Create new projects or insert into existing HTML pages
- 🔒 **Secure** - Input validation and path protection
- 📚 **Well Documented** - Comprehensive guides and examples
- 🎪 **DOM Manipulation Examples** - Interactive components demonstrating JavaScript DOM manipulation techniques
- ✨ **Prettier Formatting** - All generated code is automatically formatted with Prettier (v1.6.2+)
- 📂 **Organized Structure** - CSS and JS files automatically organized in folders (v1.6.2+)
- 💾 **Simple Backups** - Clean backup naming without timestamps (v1.6.2+)
- 🎯 **Customizable Components** - Choose navigation items and form fields during creation (v1.7.0+)
- 🏗️ **Modern Architecture** - ES Modules for better performance and tree-shaking (v2.1.0+)
- 🧩 **Modular CLI** - Refactored command structure for better maintainability (v2.1.0+)
- ⚡ **Vite Integration** - React projects use Vite for fast development (v2.1.0+)

## 🆕 What's New in v2.1.0

### ⚛️ **React Support**
- **React Components** - Generate React components with JSX
- **6 React Components** - Button, Card, Counter, Form, Modal, Todo List
- **Two Modes**:
  - **Full Project** - Complete React + Vite project with all dependencies
  - **Component Only** - Just JSX + CSS files for existing projects
- **Vite Integration** - Fast development with Vite build tool
- **Modern Hooks** - All components use React Hooks (useState, useEffect, etc.)
- **TypeScript Ready** - Easy to convert to TypeScript
- **Full Project Setup** - Includes package.json, vite.config.js, and project structure

**Create Full React Project:**
```bash
# Interactive mode
create-template create --react

# With flags
create-template create --react -c button -n my-button
create-template create --react -c counter -n my-counter
create-template create --react -c todo-list -n my-todos

# With custom colors
create-template create --react -c card -n my-card --color-scheme ocean
```

**Add Component to Existing Project (Component Only Mode):**
```bash
# Interactive mode (choose "Component only")
create-template create --react

# With flags - adds component to current directory
create-template create --react --component-only -c button --color-scheme sunset
create-template create --react --component-only -c card --color-scheme ocean

# Navigate to your project's components folder first
cd my-app/src/components
create-template create --react --component-only -c modal --color-scheme vibrant
```

**Component Only Mode:**
- Creates just `ComponentName/ComponentName.jsx` and `ComponentName/ComponentName.css`
- Perfect for adding to existing React projects
- No package.json, no Vite config, no extra files
- Validates that component doesn't already exist
- Works with all color schemes
- Usage instructions displayed after creation

**Available React Components:**
- 🔘 **Button** - Customizable button with variants (primary, secondary, success, danger) and sizes
- 🎴 **Card** - Display content in an elegant card with image support
- 🔢 **Counter** - Interactive counter with increment/decrement and limits
- 📝 **Form** - Flexible form with validation and multiple field types
- 🪟 **Modal** - Dialog modal component with overlay
- ✅ **Todo List** - Complete todo list with CRUD operations

## 🆕 What's New in v2.0.0

### 🎮 12 Additional Game Templates
Massive expansion with 12 new fully-functional games:

**Puzzle & Strategy Games:**
- **2048** - Addictive tile-merging puzzle with touch & keyboard controls, undo feature, and best score tracking
- **Connect Four** - Classic 4-in-a-row strategy game with AI opponent (3 difficulty levels), drop animations
- **Simon Says** - Memory pattern game with increasing difficulty, sound effects, and high score tracking

**Arcade Classics:**
- **Breakout** - Brick breaker with lives system, level progression, paddle/ball physics, mouse & keyboard controls
- **Tetris** - Full Tetris implementation with all 7 pieces, ghost preview, next piece display, level progression
- **Flappy Bird** - Tap-to-flap obstacle game with animated background, realistic physics, increasing difficulty
- **Pong** - Classic paddle game with AI opponent (4 difficulty levels), 2-player mode, realistic ball physics
- **Whack-a-Mole** - Fast-paced arcade game with difficulty levels, combo system, and high score tracking

**Card & Casino Games:**
- **Blackjack** - Full 21 card game with betting system, dealer AI, Hit/Stand/Double actions, 3:2 payout
- **Slot Machine** - 3-reel slots with 8 symbols, weighted payouts, jackpot x100, confetti celebration
- **Dice Game** - Race to 100 dice strategy game with AI opponent, roll/hold mechanics, animated dice

**Skill Games:**
- **Rock-Paper-Scissors** - Classic hand game vs AI with best-of series, winning streak tracking

**All Games Feature:**
- Complete game logic and state management
- Score/progress tracking with localStorage
- Responsive designs for mobile and desktop
- Smooth animations and visual feedback
- Professional UI with modern styling
- Touch and keyboard controls
- AI opponents with multiple difficulty levels

**Usage:**
```bash
create-template create -c game-2048 -n 2048-game
create-template create -c breakout -n brick-breaker
create-template create -c tetris -n tetris-game
create-template create -c flappy-bird -n flappy
create-template create -c connect-four -n connect4
create-template create -c blackjack -n blackjack-game
create-template create -c slot-machine -n slots
create-template create -c dice-game -n dice
create-template create -c pong -n pong-game
create-template create -c whack-a-mole -n whack
create-template create -c simon-says -n simon
create-template create -c rock-paper-scissors -n rps
```

## 🆕 What's New in v1.9.0

### 🎮 Interactive Game Templates
4 new fully-functional game templates with complete gameplay mechanics:

- **Tic-Tac-Toe** - Classic X and O game with score tracking, win detection, and auto-reset
- **Memory Game** - Card matching game with 3 difficulty levels (4×4, 4×5, 4×6), timer, and move counter
- **Snake Game** - Classic snake with keyboard/touch controls, increasing speed, and high score tracking
- **Guess the Number** - Number guessing game with hot/cold hints, multiple difficulty levels, and best score tracking

**Features:**
- Complete game logic and state management
- Score tracking with localStorage persistence
- Responsive designs for mobile and desktop
- Smooth animations and visual feedback
- Professional UI with gradients and modern styling
- Touch and keyboard controls

**Usage:**
```bash
create-template create -c tic-tac-toe -n my-game
create-template create -c memory-game -n memory
create-template create -c snake-game -n snake
create-template create -c guess-number -n guess
```

## 🆕 What's New in v1.8.0

### 🌙 Dark Mode Support
Every component now supports automatic dark mode detection:
- Add `--dark-mode` flag to enable dark mode styles
- Uses `prefers-color-scheme: dark` media query
- Automatic color inversion in dark theme
- Perfect for modern user preferences

**Example:**
```bash
create-template create -c button -n my-button --dark-mode
```

### 🎨 Color Customizer
Create components with custom colors instantly:
- Use `--primary-color <hex>` flag for primary gradient color
- Use `--secondary-color <hex>` flag for secondary color
- Automatic CSS variables generation
- RGB values automatically calculated

**Custom Colors:**
```bash
create-template create -c button --primary-color "#FF5733"
create-template create -c card --primary-color "#667eea" --secondary-color "#764ba2"
```

### 🎨 Preset Color Schemes
10 beautiful color schemes ready to use instantly:

| Scheme | Primary | Secondary | Use Case |
|--------|---------|-----------|----------|
| **Vibrant** | #FF6B6B | #4ECDC4 | Bold, energetic designs |
| **Pastel** | #FFB3BA | #FFDFBA | Soft, friendly interfaces |
| **Ocean** | #0066CC | #00CCFF | Professional, tech-focused |
| **Sunset** | #FF6B35 | #FFA500 | Warm, engaging UIs |
| **Forest** | #2D6A4F | #40916C | Natural, organic themes |
| **Purple** | #7209B7 | #B5179E | Elegant, premium feel |
| **Minimal** | #1A1A1A | #666666 | Clean, modern look |
| **Coral** | #FF6B9D | #FFA07A | Playful, warm designs |
| **Teal** | #008B8B | #20B2AA | Balanced, professional |
| **Neon** | #FF006E | #00D9FF | Bold, futuristic style |

**Usage:**
```bash
# Using the vibrant color scheme
create-template create -c button -n vibrant-button --color-scheme vibrant

# Using the ocean color scheme
create-template create -c card -n ocean-card --color-scheme ocean

# Interactive mode - select from presets
create-template create -c modal
# Then choose "Use preset color schemes" option
```

**View All Schemes:** Run `create-template gallery` to see live previews of all color schemes with swatches.

### 📊 Interactive Component Gallery
New **COMPONENTS-GALLERY.html** showcase page:
- Browse all 30 components with descriptions
- Search and filter by category
- View all 10 color scheme presets with color swatches
- Copy CLI commands (both npx and local) with one click
- Dark mode support
- Print-friendly layout
- Mobile responsive design

**Open gallery:**
```bash
# After global install
create-template gallery

# Or run directly with npx (first install package)
npx create-template-html-css
# Then run:
create-template gallery
```

### 📚 Enhanced Documentation
- Updated README with all new features
- Improved CLI help text with examples
- Detailed component showcase with features

## 🆕 What's New in v1.7.0

### 🎯 Customizable Navigation
When creating a navigation component, you can now specify exactly which menu items you want:
- Enter comma-separated items: "Home, Blog, Shop, Contact"
- Automatically generates matching navigation links and page sections
- Default: "Home, About, Services, Portfolio, Contact"

### 📝 Customizable Form Fields
Create forms with exactly the fields you need:
- **Standard Fields**: Select from Name, Email, Phone, Subject, Message, Terms
- **Custom Fields**: Add any field with format `type:label`
  - Examples: `text:Age`, `url:Website`, `date:Birth Date`, `number:Quantity`
  - Supports all HTML5 input types: text, email, url, date, number, tel, password, color, etc.
  - Also supports: textarea, checkbox, select

### 🎨 Component Variation Selection
Choose exactly which variations you want for multi-style components:
- **Button**: Select from 6 button types (Primary, Secondary, Success, Danger, Outlined, Disabled)
- **Card**: Choose from 6 card variations (Modern, Premium, Blog, Minimal, User Profile, Interactive)
- **Spinner**: Pick from 5 spinner types (Circle, Dots, Pulse, Bars, Gradient)
- Option to select "All Variations" or choose specific ones

### 🚀 Interactive CLI Experience
Enhanced prompts guide you through component customization with clear instructions and validation.

## 🎨 What Was Added in v1.6.2

### ✨ Prettier Code Formatting
All generated and inserted files are automatically formatted with [Prettier](https://prettier.io/) for beautiful, professional-looking code.

### 📂 Organized Folder Structure
Components are automatically organized with CSS in `css/` folders and JavaScript in `js/` folders for better project organization.

### 💾 Simplified Backup Naming
Backup files now use clean naming without timestamps: `file.html.backup`

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g create-template-html-css
```

Then use the CLI anywhere:

```bash
create-template create
create-template insert
create-template list
```

### Local Installation

```bash
# Clone the repository
git clone https://github.com/benshabbat/create-template-html-css.git
cd create-template-html-css

# Install dependencies
npm install

# Link globally (optional)
npm link
```

## 🚀 Usage

### Mode 1: Create a New Project

Generate a standalone project with HTML, CSS, and JavaScript files:

```bash
create-template create
```

Follow the interactive prompts:
1. **Select Component Type** - Choose from Button, Card, Form, Navigation, Modal, Footer, or Hero
2. **Enter Component Name** - Give your component a meaningful name
3. **Customize Component** (v1.7.0+):
   - **Navigation**: Choose menu items (e.g., "Home, Blog, Shop, Contact")
   - **Form**: Select standard fields and add custom fields (e.g., "text:Age, url:Website")
4. **Include JavaScript** - Decide if you want to include the script file

**Example (Basic):**

```bash
$ create-template create
? Choose a component type: Button
? Enter a name for your component: my-awesome-button
? Include JavaScript file? (Y/n) Yes
✓ Template created successfully!
  Location: ./my-awesome-button/
```

**Example (Navigation with Custom Items):**

```bash
$ create-template create
? Choose a component type: Navigation
? Enter a name for your component: my-nav
? Enter navigation items (comma-separated): Home, Blog, Shop, About Us, Contact
✓ Template created successfully!
  Location: ./my-nav/
```

**Example (Form with Custom Fields):**

```bash
$ create-template create
? Choose a component type: Form
? Enter a name for your component: contact-form
? Select form fields to include: Name, Email, Message
? Add custom fields: text:Age, url:Website, date:Birth Date
✓ Template created successfully!
  Location: ./contact-form/
```

**Result:**
```
my-awesome-button/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

### Mode 1b: Create a React Component Project ⚛️

Generate a complete React project with Vite:

```bash
create-template create --react
```

Follow the interactive prompts:
1. **Select Framework** - Choose React
2. **Select Component Type** - Choose from Button, Card, Counter, Form, Modal, Todo List
3. **Enter Component Name** - Give your project a meaningful name
4. **Choose Color Scheme** (optional) - Select from preset schemes or enter custom colors

**Example (Basic):**

```bash
$ create-template create --react
? What framework would you like to use? React (JSX + CSS)
? Choose a component type: Counter
? Enter a name for your component: my-counter
? Choose a color scheme: (Use arrow keys)
  ❯ Ocean - Professional blue gradient
    Sunset - Warm orange to yellow gradient
    Forest - Natural green gradient
✓ React component created successfully!
  Location: ./my-counter/
```

**Example (With Flags):**

```bash
# Create React button with custom colors
create-template create --react -c button -n my-button --primary-color "#FF5733"

# Create React todo list with ocean color scheme
create-template create --react -c todo-list -n my-todos --color-scheme ocean

# Create React modal
create-template create --react -c modal -n my-modal
```

**Result:**
```
my-counter/
├── src/
│   ├── components/
│   │   └── Counter/
│   │       ├── Counter.jsx
│   │       └── Counter.css
│   ├── App.jsx
│   └── index.js
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

**Running the React Project:**

```bash
cd my-counter
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Available React Components:**
- 🔘 **Button** - Variants: primary, secondary, success, danger | Sizes: small, medium, large
- 🎴 **Card** - Image, title, description, footer support with hover effects
- 🔢 **Counter** - Increment/decrement with limits, step customization, reset button
- 📝 **Form** - Multiple field types, built-in validation, error messages
- 🪟 **Modal** - Customizable sizes (small, medium, large), overlay, close handlers
- ✅ **Todo List** - Add, toggle complete, delete tasks with statistics

### Mode 2: Insert Component into Existing HTML Page

Add components directly to your existing HTML files without creating new projects:

```bash
create-template insert
```

Follow the interactive prompts:
1. **Enter HTML File Path** - Specify the target HTML file
2. **Select Component** - Choose which component to insert
3. **Choose CSS Integration** - Inline, separate file, or skip
4. **Choose JS Integration** - Inline, separate file, or skip

**Example:**

```bash
$ create-template insert
? Enter the path to your HTML file: index.html
? Which component would you like to insert? Button
? How should the CSS be added? Inline (inside <style> tag)
? How should the JavaScript be added? Inline (inside <script> tag)
✓ Component inserted successfully!
  File: index.html
  Component: button
  CSS: inline
  JS: inline
```

**CSS/JS Integration Options:**
- **Inline** - Embed directly in the HTML file
- **Separate File** - Create `component-name.css` and `component-name.js` files
- **Skip** - Don't add CSS/JS (you'll add it manually)

### List All Available Templates

```bash
create-template list
```

### Get Help

```bash
create-template --help
```

## 🎨 Available Templates

### 1. Button

A collection of styled button components with multiple variations:

**Variations:**
- Primary Button (main action)
- Secondary Button (alternative action)
- Success Button (positive action)
- Danger Button (destructive action)
- Outlined Button (secondary style)
- Disabled State

**Features:**
- Smooth hover effects
- Animated transitions
- Beautiful gradients
- Click animations

### 2. Card ✨

Responsive card component with 6 professional variations:

**Variations:**
- **Modern Card** - Featured item with badge, category, rating, and date metadata
- **Premium Card** - Pricing card with feature list and gradient styling
- **Blog Card** - Content card with tags, author info, and comment counts
- **Minimal Card** - Clean, simplified design for minimal content
- **User Profile Card** - Avatar-based card with social media links
- **Interactive Card** - Action buttons for like, share, and save functionality

**Features:**
- Rich metadata displays (ratings, dates, comments, authors)
- Animated action buttons with state management
- Tag-based filtering system
- Toast notifications
- Professional gradients and animations
- Hover image zoom effect
- Advanced shadow effects
- Fully responsive grid layout

### 3. Form

Complete contact form with validation and customizable fields (v1.7.0+):

**Customization Options:**
- **Standard Fields**: Name, Email, Phone, Subject, Message, Terms Checkbox
- **Custom Fields**: Add any field with `type:label` format
  - Supported types: text, email, url, date, number, tel, password, color, textarea, checkbox, select
  - Examples: `text:Age`, `url:Website`, `date:Birth Date`, `number:Quantity`

**Features:**
- Real-time validation
- Focus effects
- Error messages
- Modern styling
- Fully customizable field selection

### 4. Navigation

Responsive navigation bar with customizable menu items (v1.7.0+):

**Customization:**
- Choose exactly which menu items to include
- Enter comma-separated items: "Home, Blog, Shop, Contact"
- Automatically generates matching page sections
- Default items: "Home, About, Services, Portfolio, Contact"

**Components:**
- Logo section
- Customizable navigation menu
- Mobile hamburger menu
- Smooth scrolling
- Section highlighting on scroll

**Features:**
- Fully customizable menu structure
- Mobile-responsive design
- Sticky navigation
- Active link highlighting
- Animated hamburger menu
- Smooth scroll to sections

**Features:**
- Fixed header option
- Hamburger animation
- Active page highlighting
- Mobile-friendly

### 5. Modal

Dialog boxes for various purposes:

**Types:**
- Basic modal
- Modal with form
- Alert/warning modal

**Features:**
- Click-outside to close
- ESC key to close
- Smooth animations
- Backdrop blur effect

### 6. Login (NEW in v1.8.0)

Complete authentication login form with validation and social login:

**Features:**
- Email validation
- Password validation (minimum 6 characters)
- "Remember me" checkbox
- "Forgot password" link
- Social login buttons (Google, GitHub)
- Real-time form validation
- Focus states and animations
- Responsive design
- Modal integration with navigation

**Includes:**
- Login form with email/password fields
- Remember me functionality
- Forgot password handler
- Social authentication placeholders
- Professional gradient styling
- Mobile-optimized layout

### 7. Register (NEW in v1.8.0)

Advanced user registration form with real-time password validation:

**Features:**
- Full name, email, username fields
- Real-time password strength validation
- Password requirements display:
  - Minimum 8 characters
  - Uppercase letter required
  - Number required
  - Special character required (@, #, $, %)
- Password matching validation
- Username validation (3-20 characters, alphanumeric + underscore)
- Terms of Service checkbox
- Newsletter subscription option
- Dynamic submit button (enabled only when all requirements met)
- Social registration buttons (Google, GitHub)
- Real-time visual feedback

**Includes:**
- Registration form with custom fields
- Live password strength checker
- Visual requirement indicators (✓/✗)
- Matching password validator
- Professional styling
- Mobile-responsive layout

### 8. Skeleton (NEW in v1.8.0)

Loading placeholders with smooth shimmer animation - perfect for displaying while content loads:

**Features:**
- Multiple skeleton variations (card, article, list, profile, grid)
- Smooth shimmer animation effect
- Fade-in animations for loaded content
- Toggle between skeleton and actual content
- Professional gray gradient styling
- Responsive grid layout
- ESC key support for controls

**Includes:**
- Card skeleton with image and content blocks
- Article skeleton with avatar and text
- List skeleton with multiple items
- Profile skeleton with cover and info sections
- Grid skeleton for gallery-like layouts
- Toggle button to switch between skeleton and demo content
- Demo content section with real images and text
- Mobile-responsive design

**Perfect For:**
- Loading states in applications
- API response delays
- Perceived performance optimization
- Professional user experience

### 6. Footer

Professional footer section:

**Includes:**
- Multiple columns
- Navigation links
- Contact information
- Social media links

**Features:**
- Responsive grid
- Scroll animations
- Dark gradient
- Flexible layout

### 7. Hero

Hero section for landing pages:

**Types:**
- Gradient background
- Image background
- Centered with form

**Features:**
- Text animations
- Parallax effect
- Animated statistics
- Call-to-action buttons

### 8. Slider

Responsive image carousel component:

**Features:**
- Auto-play functionality
- Previous/next buttons
- Dot indicators
- Smooth fade animations
- Touch-friendly controls
- Responsive design
- Image captions
- Keyboard navigation (ESC to close)

**Includes:**
- 5 sample slides
- Navigation arrows
- Indicator dots
- Auto-advance timer

### 9. Table

Professional data table with advanced features:

**Features:**
- Search functionality
- Status filtering
- Sortable columns
- Pagination support
- Action buttons (Edit/Delete)
- Status badges
- Responsive design
- Row selection

**Includes:**
- 6 sample employees
- Multiple columns (ID, Name, Email, Department, Status, Date)
- Search and filter controls
- Page navigation
- Color-coded status indicators

### 10. Spinner 🔄

Animated loading spinners for various use cases:

**Variations:**
- Circle Spinner - Classic rotating circle
- Bouncing Dots - Three animated dots
- Pulse Loader - Pulsing effect
- Bar Loader - Dancing vertical bars
- Gradient Ring - Colorful rotating ring

**Features:**
- Pure CSS animations
- Smooth performance
- Multiple styles
- Easy customization

### 11. Animated Card ✨

Interactive card components with stunning animations:

**Variations:**
- Flip Card - 3D flip effect
- Glow Card - Animated glowing border
- Slide Card - Content slide animation
- Scale Card - Zoom with shadow
- Tilt Card - 3D tilt on hover
- Gradient Card - Animated background

**Features:**
- Advanced hover effects
- 3D transformations
- Interactive JavaScript
- Modern design patterns

### 12. Typing Effect ⌨️

Text animation components with typing effects:

**Variations:**
- Simple typing animation
- Multi-line typing
- Rotating text display
- Code typing effect

**Features:**
- Customizable speed
- Blinking cursor
- Multiple phrases
- Pause/restart controls

### 13. Fade Gallery 🖼️

Animated image gallery with scroll effects:

**Features:**
- Fade-in animations
- Hover overlays
- Horizontal scroll
- Parallax effect
- Intersection observer
- Responsive masonry layout

### 14. Grid Layout 📐

Comprehensive CSS Grid layouts:

**Includes:**
- Basic responsive grid
- Feature grid with hero item
- Auto-fit flexible grid
- Complex dashboard layout

**Features:**
- Modern CSS Grid
- Multiple grid patterns
- Animated items
- Fully responsive

### 15. Masonry Grid 🧱

Pinterest-style masonry layout:

**Features:**
- Column-based layout
- Category filtering
- Variable item heights
- Staggered animations
- Interactive likes
- 12 sample items

### 16. Dashboard Grid 📊

Complete admin dashboard template:

**Components:**
- Sidebar navigation
- Statistics cards
- Revenue chart
- Activity feed
- Product list
- Quick actions

**Features:**
- Full grid layout
- Real-time animations
- Mobile responsive
- Professional design

### 17. Flex Layout 📏

Comprehensive Flexbox patterns and examples:

**Includes:**
- Row and column layouts
- Space distribution patterns
- Alignment variations
- Flex-grow examples
- Nested flex containers
- Holy Grail layout

**Features:**
- Interactive examples
- Visual demonstrations
- Responsive design
- Modern Flexbox techniques

### 18. Flex Cards 🃏

Equal-height card layouts with Flexbox:

**Variations:**
- Basic equal-height cards
- Pricing cards
- Product cards
- Team member cards
- Testimonial cards

**Features:**
- Automatic equal heights
- Hover animations
- Gradient backgrounds
- Fully responsive

### 19. Flex Dashboard 🎛️

Admin dashboard built entirely with Flexbox:

**Components:**
- Collapsible sidebar
- Top search bar
- Stats cards
- Bar chart visualization
- Activity feed
- Top products list
- Quick actions

**Features:**
- Pure Flexbox layout
- Mobile responsive
- Interactive animations
- Professional design

### 20. Todo List ✅

Interactive todo list with add/remove functionality:

**Features:**
- Add new tasks
- Mark tasks as complete
- Delete tasks
- Task counter
- LocalStorage persistence
- Animated interactions

### 21. Counter 🔢

Click counter with history tracking:

**Features:**
- Increment/decrement buttons
- Custom step size
- Reset functionality
- History log
- Color-coded display
- Animated transitions

### 22. Accordion 📑

Collapsible accordion component:

**Features:**
- Multiple sections
- Smooth expand/collapse
- Only one section open at a time
- Icon rotation
- Responsive design

### 23. Tabs 📑

Tabbed content switcher:

**Features:**
- Multiple tab panels
- Smooth transitions
- Active state highlighting
- Responsive layout
- Keyboard navigation

### 24. Tic-Tac-Toe 🎯

Classic X and O game:

**Features:**
- Two-player gameplay
- Win detection (rows, columns, diagonals)
- Score tracking for X, O, and draws
- Auto-reset after game ends
- Winning cell highlighting
- Responsive design
- Score persistence

### 25. Memory Game 🧠

Card matching memory game:

**Features:**
- 3 difficulty levels (4×4, 4×5, 4×6)
- Move counter
- Timer
- Match tracking
- Card flip animations
- Emoji-based cards
- Win detection
- Responsive grid

### 26. Snake Game 🐍

Classic snake game:

**Features:**
- Keyboard controls (Arrow keys, WASD)
- Touch swipe controls for mobile
- On-screen button controls
- Increasing speed as you score
- High score tracking (localStorage)
- Collision detection
- Smooth canvas rendering
- Pause/resume functionality

### 27. Guess the Number 🎲

Number guessing game with hints:

**Features:**
- 3 difficulty levels (1-100, 1-500, 1-1000)
- Hot/cold hint system
- Guess history
- Attempt counter
- Best score tracking per difficulty
- Visual feedback animations
- Duplicate guess detection
- Give up option


## 💡 Examples

### Example 1: Create a Button Component

```bash
$ create-template create
? Choose a component type: Button
? Enter a name for your component: primary-button
? Include JavaScript file? (Y/n) Yes
✓ Template created successfully!
  Location: ./primary-button/
```

Open `primary-button/index.html` in your browser to see the component!

### Example 2: Insert a Card into Your Website

You have an existing `products.html` file:

```bash
$ create-template insert
? Enter the path to your HTML file: products.html
? Which component would you like to insert? Card
? How should the CSS be added? Separate file
? How should the JavaScript be added? Separate file
✓ Component inserted successfully!
  File: products.html
  Component: card
  CSS: separate
  JS: separate
```

This creates:
- Updated `products.html` with card HTML
- New `card-component.css` file
- New `card-component.js` file

### Example 3: Quick Navigation Setup

```bash
$ create-template create
? Choose a component type: Navigation
? Enter a name for your component: main-nav
? Include JavaScript file? (Y/n) Yes
```

## 📁 Project Structure

```
create-template-html-css/
├── bin/
│   └── cli.js                 # CLI entry point
├── src/
│   ├── generator.js           # Template generation logic
│   ├── inserter.js            # Component insertion logic
│   └── index.js              # Main module export
├── templates/
│   ├── button/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── card/
│   ├── form/
│   ├── navigation/
│   ├── modal/
│   ├── footer/
│   └── hero/
├── package.json
├── README.md
├── QUICKSTART.md
├── INSERT-DEMO.md
├── SECURITY.md
├── CONTRIBUTING.md
├── LICENSE
└── SHOWCASE.html
```

## 🎯 Use Cases

- **🎬 Quick Prototyping** - Create examples for presentations
- **📚 Learning** - Learn HTML, CSS, and JavaScript best practices
- **🚀 Project Kickstart** - Start projects with a solid foundation
- **📖 Documentation** - Generate examples for your documentation
- **🧪 Experimentation** - Try different designs and layouts
- **🎨 UI Library** - Build your own component library
- **🏗️ Scaffolding** - Quick project scaffolding for teams

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Commander.js** - CLI framework for building command-line interfaces
- **Inquirer.js** - Interactive command-line prompts
- **Chalk** - Terminal string styling
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactive component functionality

## 📁 File Size

- Package: ~23.5 KB
- Unpacked: ~97.1 KB
- Includes all templates, documentation, and source code

## 🔒 Security

- Input validation for file paths
- Component whitelist validation
- Path traversal protection
- Safe file operations

See [SECURITY.md](SECURITY.md) for more details.

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get started in minutes
- **[Insert Feature Demo](INSERT-DEMO.md)** - Detailed insert examples
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Security Policy](SECURITY.md)** - Security guidelines
- **[Component Showcase](SHOWCASE.html)** - View all components in action

## 🔒 Security

This project includes comprehensive security features to protect your files and data:

### Input Validation & Sanitization
- **Component Whitelist** - Only validated components can be created/inserted
  - HTML templates: 46 components validated against `VALID_COMPONENTS`
  - React components: 6 components validated against `VALID_REACT_COMPONENTS`
- **Project Name Sanitization** - All user-provided names are sanitized
  - Path traversal protection (blocks `../`, `..\`, `/../`, etc.)
  - Length validation (max 100 characters)
  - Alphanumeric character requirement
  - Dangerous character removal (`<>:"|?*`)
  - Empty/null input rejection
- **Color Validation** - Hex color codes validated with regex pattern
- **HTML Structure Validation** - Ensures proper HTML structure before insertion

### Path Security
- **Path Traversal Protection** - Prevents access outside working directory
  - All file operations use `path.join()` for safe path construction
  - Output directories restricted to `process.cwd()` subdirectories
  - No arbitrary file system access allowed
- **Safe File Operations** - All file system operations are protected
  - Directory creation uses `recursive: true` safely
  - File writes validated before execution
  - Backup creation before file modifications

### Code Security
- **Zero External Dependencies for Security** - Uses only Node.js built-in modules for security checks
- **ES Modules** - Modern module system prevents prototype pollution
- **Strict Mode** - All code runs in JavaScript strict mode
- **No eval()** - No dynamic code execution

### Security Best Practices
- **Input Validation**: All user inputs validated before processing
- **Whitelist Approach**: Component selection validated against predefined lists
  - HTML: 46 validated components
  - React: 6 validated components (`VALID_REACT_COMPONENTS`)
- **Path Sanitization**: All file paths sanitized using `sanitizeFilename()`
  - Prevents path traversal attacks (../, ../../, etc.)
  - Blocks dangerous characters and patterns
  - Validates alphanumeric names only
- **Component-Only Mode Security**:
  - Validates component doesn't already exist
  - Checks for directory conflicts
  - Safe output directory handling
- **File System Protection**: Safe file operations with error handling
- **No Code Injection**: Template-based generation prevents code injection
- **Clear Error Messages**: Informative errors without exposing system details
- **Regular Security Audits**: Dependencies updated and audited regularly

For security concerns or to report vulnerabilities, see [SECURITY.md](SECURITY.md)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository** - Click the fork button
2. **Create a feature branch** - `git checkout -b feature/AmazingFeature`
3. **Make your changes** - Add your improvements
4. **Commit your changes** - `git commit -m 'Add some AmazingFeature'`
5. **Push to the branch** - `git push origin feature/AmazingFeature`
6. **Open a Pull Request** - Describe your changes

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive open-source license that allows you to:
- ✅ Use commercially
- ✅ Modify the source code
- ✅ Distribute the software
- ✅ Use privately

The only requirement is to include a copy of the license and copyright notice.

## 👨‍💻 Author

**DavidChen Benshabbat**
- GitHub: [@benshabbat](https://github.com/benshabbat)
- Email: benshabbat27@gmail.com

## 🔗 Links

- **npm Package**: https://www.npmjs.com/package/create-template-html-css
- **GitHub Repository**: https://github.com/benshabbat/create-template-html-css
- **Issue Tracker**: https://github.com/benshabbat/create-template-html-css/issues

## 🙏 Acknowledgments

- Inspired by [Create React App](https://create-react-app.dev/)
- Design inspiration from [Tailwind CSS](https://tailwindcss.com/) and [Bootstrap](https://getbootstrap.com/)
- Icons from [Unicode Emojis](https://unicode.org/emoji/)

## 🛣️ Roadmap & Future Features

We have exciting plans for future versions! Check out [IMPROVEMENT_SUGGESTIONS.md](IMPROVEMENT_SUGGESTIONS.md) for:

- Unit Testing Framework (Jest)
- CLI Flags for Automation
- Configuration File Support
- Web-based Preview Mode
- Additional Templates (Breadcrumb, Toast, Rating, etc.)
- Template Customization Options
- Export to Different Formats (JSX, Vue, etc.)
- Interactive Template Builder
- Analytics and Usage Statistics

Want to contribute to the roadmap? [See Contributing Guidelines](CONTRIBUTING.md)

## ⭐ Support

If you find this project helpful, please consider:
- ⭐ Starring the repository on GitHub
- 📣 Sharing it with others
- 🐛 Reporting issues and suggesting improvements
- 🤝 Contributing to the project

---

Made with ❤️ by David Chen Benshabbat

**Happy coding! 🚀**
