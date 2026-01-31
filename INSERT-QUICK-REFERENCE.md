# Insert Feature - Quick Reference Guide v1.6.1

## Overview
The insert feature allows you to add pre-built components to existing HTML files with automatic folder organization.

## Basic Usage

### Interactive Mode (No Flags)
```bash
npm run insert
# Follow prompts to select file, component, and options
```

### Non-Interactive Mode (With Flags)

#### Insert with Separate CSS and JS Files
```bash
node bin/cli.js insert -f index.html -c button -s separate --backup
```

#### Insert with Inline JS, External CSS
```bash
node bin/cli.js insert -f index.html -c card -s inline --backup
```

#### Insert with Everything Inline
```bash
node bin/cli.js insert -f index.html -c modal -s inline --style inline --backup
```

## Folder Organization

### What Gets Created
When using separate files mode (`-s separate`), the tool creates an organized structure:

```
your-project/
├── index.html
├── css/
│   ├── button-component.css
│   └── card-component.css
└── js/
    ├── button-component.js
    └── card-component.js
```

### HTML Links
The tool automatically updates your HTML to reference these files:

```html
<head>
    <link rel="stylesheet" href="css/button-component.css">
    <link rel="stylesheet" href="css/card-component.css">
</head>
<body>
    <!-- Your content with button component -->
    <script src="js/button-component.js"></script>
    
    <!-- Your content with card component -->
    <script src="js/card-component.js"></script>
</body>
```

## Command Flags

### File Selection
- `-f, --file <file>` - Target HTML file to insert component into (required)

### Component Selection
- `-c, --component <name>` - Component name (button, card, modal, etc.)

### Script Handling
- `-s, --script <mode>` - How to handle JavaScript
  - `inline` - Embed script in HTML
  - `separate` - Create separate JS file (default)
  - `skip` - Don't include JavaScript

### Style Handling
- `--style <mode>` - How to handle CSS
  - `external` - Create separate CSS file (default)
  - `inline` - Embed styles in HTML

### Backup & Safety
- `-b, --backup` - Create timestamped backup before modifying file
  - Backup format: `filename.html.backup.1234567890`

### Debugging
- `-v, --verbose` - Show detailed operation logs

## Examples

### Add Button Component with Everything Separate
```bash
node bin/cli.js insert -f index.html -c button -s separate --backup -v
```
Creates: `css/button-component.css`, `js/button-component.js`, `index.html.backup.*`

### Add Multiple Components
```bash
node bin/cli.js insert -f index.html -c button -s separate --backup
node bin/cli.js insert -f index.html -c card -s separate --backup
```
Results in one HTML file with multiple components

### Minimal Inline Setup
```bash
node bin/cli.js insert -f index.html -c modal -s inline --style inline
```
All CSS and JS embedded directly in HTML, no additional files created

## Features

✅ **HTML Validation** - Ensures proper HTML structure before insertion
✅ **Backup Creation** - Protects original files with timestamped backups
✅ **Organized Structure** - CSS and JS automatically placed in folders
✅ **Multiple Components** - Insert unlimited components into one file
✅ **Flexible Options** - Choose inline vs separate files per component
✅ **Clean Output** - Properly formatted HTML without duplicates
✅ **Error Handling** - Detailed messages for common issues
✅ **Backward Compatible** - Works with inline mode without folders

## Available Components

- animated-card, button, card, dashboard-grid
- fade-gallery, flex-cards, flex-dashboard, flex-layout
- footer, form, grid-layout, hero
- masonry-grid, modal, navigation, slider
- spinner, table, typing-effect

Total: 18 components

## Troubleshooting

### Issue: "Component already exists in file"
**Solution**: Each component should only be inserted once per file

### Issue: "Invalid HTML structure"
**Solution**: Ensure your HTML has proper DOCTYPE, html, head, and body tags

### Issue: Files not created
**Solution**: Use `--verbose` flag to see detailed error messages

## Tips
- Always use `--backup` when modifying important files
- Use `--verbose` to debug issues
- Test with a copy of your file first
- Check output HTML with browser DevTools
