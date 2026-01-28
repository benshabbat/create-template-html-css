# Insert Feature Demo

## How to Use the Insert Command

The `insert` command allows you to add pre-styled components to your existing HTML pages without creating new projects. Components are smartly integrated with proper indentation and ID attributes for easy customization.

## How It Works

When inserting a component:
1. ✅ Detects existing indentation in your HTML file
2. ✅ Respects your code formatting style
3. ✅ Adds unique IDs to styles and scripts (e.g., `button-styles`, `button-script`)
4. ✅ Prevents duplicate insertions (warns if component already exists)
5. ✅ Validates HTML structure (checks for `<head>` and `<body>` tags)

## Example Usage

### 1. Basic Usage

```bash
npm run insert
```

Follow the interactive prompts:
1. **Enter path to your HTML file**: `index.html`
2. **Choose component**: Button, Card, Form, Navigation, Modal, Footer, or Hero
3. **CSS mode**: Inline, Separate file, or Skip
4. **JS mode**: Inline, Separate file, or Skip

### 2. Real Example

Let's say you have this HTML file:

**index.html (before):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Site</h1>
    <p>This is my existing content.</p>
</body>
</html>
```

Run the command:
```bash
npm run insert
# Path: index.html
# Component: Button
# CSS: Inline
# JS: Inline
```

**index.html (after):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
    <style>
        /* BUTTON Component Styles */
        .btn {
            padding: 12px 30px;
            /* ... full button styles ... */
        }
    </style>
</head>
<body>
    <h1>Welcome to My Site</h1>
    <p>This is my existing content.</p>
    
    <!-- BUTTON Component -->
    <div class="container">
        <button class="btn btn-primary">Click Here</button>
        <!-- ... all button variations ... -->
    </div>
    
    <script>
        // BUTTON Component Script
        document.querySelectorAll('.btn').forEach(button => {
            // ... button functionality ...
        });
    </script>
</body>
</html>
```

### 3. Separate Files Example

If you choose "Separate file" for CSS and JS:

```bash
npm run insert
# Path: products.html
# Component: Card
# CSS: Separate file
# JS: Separate file
```

**Result:**
- `products.html` - Updated with card HTML and links
- `card-component.css` - Created with all card styles
- `card-component.js` - Created with card functionality

**products.html:**
```html
<head>
    <!-- ... existing head content ... -->
    <link rel="stylesheet" href="card-component.css">
</head>
<body>
    <!-- ... existing content ... -->
    
    <!-- CARD Component -->
    <div class="cards-grid">
        <!-- ... card HTML ... -->
    </div>
    
    <script src="card-component.js"></script>
</body>
```

## Benefits

✅ **No manual copy-paste** - Components are automatically inserted  
✅ **Flexible integration** - Choose inline or separate files  
✅ **Safe insertion** - HTML structure is preserved  
✅ **Clean organization** - Components are clearly marked  
✅ **Quick prototyping** - Add components in seconds

## Tips

1. **Inline mode** - Best for quick prototyping or single-use components
2. **Separate files** - Best for reusable styles across multiple pages
3. **Skip mode** - Use when you already have custom CSS/JS

## Available Components

All 19 templates are available for insertion:

### Basic Components
- Button - Styled button variations
- Card - Product/content cards
- Form - Contact/input forms
- Navigation - Responsive navbar
- Modal - Dialog popups
- Footer - Page footer
- Hero - Hero sections with CTA
- Slider - Image carousel
- Table - Data tables with features

### Animation Templates
- Spinner - Loading animations
- Animated Card - Interactive card effects
- Typing Effect - Text animations
- Fade Gallery - Image gallery with effects

### Grid Layouts (CSS Grid)
- Grid Layout - CSS Grid examples
- Masonry Grid - Pinterest-style layout
- Dashboard Grid - Admin dashboard

### Flexbox Layouts
- Flex Layout - Flexbox patterns
- Flex Cards - Equal-height cards
- Flex Dashboard - Admin dashboard with Flexbox
