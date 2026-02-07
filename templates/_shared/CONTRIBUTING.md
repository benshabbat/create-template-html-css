# Template Development Guide

## Overview

The `templates/` directory contains 42 standalone HTML/CSS/JS component templates. Each template is designed to be completely self-contained and copy-paste ready.

## Directory Structure

```
templates/
├── _shared/              # Documentation and reference files
│   ├── base.css         # Reference CSS patterns
│   ├── README.md        # Philosophy and usage
│   ├── PATTERNS.md      # Code pattern catalog
│   └── CONTRIBUTING.md  # This file
│
├── button/              # Example template structure
│   ├── index.html      # Component HTML
│   ├── style.css       # Component styles
│   └── script.js       # Component behavior
│
└── [41 other templates...]
```

## Template Categories

### UI Components (15 templates)
Basic reusable interface elements:
- `button` - Various button styles and states
- `card` - Card layouts and variations
- `form` - Form inputs and validation
- `modal` - Modal dialogs and overlays
- `accordion` - Collapsible content sections
- `tabs` - Tabbed interfaces
- `table` - Data tables with sorting/filtering
- `navigation` - Navigation bars
- `footer` - Footer layouts
- `hero` - Hero sections
- `skeleton` - Loading skeletons
- `spinner` - Loading spinners
- `slider` - Image carousels
- `animated-card` - Cards with animations
- `typing-effect` - Typing animations

### Layout Templates (5 templates)
Page structure components:
- `flex-layout` - Flexbox layouts
- `flex-cards` - Flex-based card grids
- `flex-dashboard` - Dashboard using flexbox
- `grid-layout` - CSS Grid layouts
- `dashboard-grid` - Grid-based dashboard
- `masonry-grid` - Pinterest-style grid
- `fade-gallery` - Image gallery with transitions

### Form Templates (2 templates)
User input forms:
- `login` - Login form with validation
- `register` - Registration form

### Interactive Components (2 templates)
User interaction elements:
- `counter` - Interactive counter with history
- `todo-list` - Task management

### Games (12 templates)
Interactive game templates:
- `snake-game` - Classic snake game
- `tetris` - Falling blocks game
- `pong` - Two-player paddle game
- `breakout` - Brick breaking game
- `flappy-bird` - Side-scrolling game
- `tic-tac-toe` - Classic X/O game
- `connect-four` - Four-in-a-row game
- `memory-game` - Card matching game
- `simon-says` - Pattern memory game
- `rock-paper-scissors` - Hand game
- `guess-number` - Number guessing game
- `dice-game` - Dice rolling game
- `blackjack` - Card game (21)
- `slot-machine` - Slot machine simulator
- `whack-a-mole` - Reaction speed game
- `game-2048` - Sliding tile puzzle

## Creating a New Template

### 1. Create Directory Structure

```bash
templates/
└── your-component/
    ├── index.html
    ├── style.css
    └── script.js
```

### 2. HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{name}} - Your Component</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Your component HTML -->
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

**Important**: Use `{{name}}` placeholder - it gets replaced by the generator.

### 3. CSS Template

Start with the standard reset and base:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    /* Your specific layout */
}

/* Your component styles */
```

### 4. JavaScript Template (if needed)

```javascript
// Component Description

// DOM Elements
const element = document.querySelector('.selector');

// Functions
function init() {
    // Setup code
}

// Event Listeners
element.addEventListener('click', handleClick);

// Initialize
init();
```

### 5. Register the Component

Add your component to:
- `src/components-registry.js` - Add to VALID_COMPONENTS array
- `COMPONENTS-GALLERY.html` - Add a showcase entry

### 6. Test the Component

```bash
# Create test instance
node bin/cli.js create --component=your-component --name=test

# Insert into existing file
node bin/cli.js insert --file test/index.html --component=your-component
```

## Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include helpful comments
- Use meaningful class names (BEM-style preferred)
- Keep structure simple and flat

### CSS
- Include full CSS reset
- Use CSS custom properties for theming
- Mobile-first responsive design
- Smooth transitions (0.3s ease standard)
- Follow existing naming conventions

### JavaScript
- Write vanilla JavaScript (no frameworks)
- Include comprehensive comments
- Use modern ES6+ features
- Handle errors gracefully
- Make it work without build tools

## File Organization

### Use Subdirectories When Needed

Some components use `css/` and `js/` subdirectories:

```
your-component/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

The generator handles both flat and nested structures automatically.

## Common Pitfalls

❌ **Don't**:
- Import or reference other templates
- Use external CDN dependencies (document if necessary)
- Require build process
- Use complex tooling
- Break self-contained principle

✅ **Do**:
- Keep everything in one folder
- Test in isolation
- Comment thoroughly
- Follow existing patterns
- Make it beginner-friendly

## Code Quality

### Required
- ✅ Valid HTML5
- ✅ Valid CSS3
- ✅ Working JavaScript (no errors)
- ✅ Responsive design
- ✅ Cross-browser compatible

### Recommended
- ✅ Accessibility (ARIA labels, semantic HTML)
- ✅ Performance (efficient selectors, debouncing)
- ✅ Comments explaining complex logic
- ✅ Consistent code style

## Testing Checklist

Before submitting a new template:

- [ ] Works standalone (copy folder, open in browser)
- [ ] `{{name}}` placeholder properly placed
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] All interactive features work
- [ ] Commented and documented
- [ ] Added to components-registry.js
- [ ] Create command works
- [ ] Insert command works
- [ ] CSS properly formatted
- [ ] JavaScript follows patterns

## Color Schemes

Templates should work with color customization. Use CSS variables when possible:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
}
```

The generator can apply custom colors via `--primaryColor` and `--secondaryColor` flags.

## Documentation

Each template should be self-explanatory:
- Clear comments in code
- Descriptive class names
- Logical structure
- Examples in comments if complex

## Resources

- See `PATTERNS.md` for common code patterns
- See `README.md` for philosophy and guidelines
- See existing templates for examples
- Check `base.css` for reference styles

## Questions?

Review existing templates for guidance. All 42 templates follow these patterns consistently.

---

**Remember**: The goal is to create copy-paste ready components that work immediately with zero configuration. Keep it simple, keep it self-contained!
