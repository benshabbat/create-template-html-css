# Shared Template Resources

This directory contains shared resources and documentation for templates.

## Philosophy: Self-Contained Templates

**Each template is intentionally self-contained and standalone.** This means:
- ✅ Every template includes its own complete HTML, CSS, and JS
- ✅ No external dependencies between templates
- ✅ Users can copy a single template folder and it "just works"
- ✅ Perfect for learning, prototyping, and quick integration

## Why Not Use Shared CSS?

While we have `base.css` with common styles, **we deliberately duplicate** them in each template because:

1. **Portability**: Users can grab one folder and go
2. **Independence**: No broken links if files are moved
3. **Customization**: Users can modify without affecting others
4. **Simplicity**: No build process or import management needed

## Common Patterns (For Reference)

### CSS Reset (42/42 templates)
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

### Gradient Body (37/42 templates)
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}
```

### Common Container Pattern
```css
.container {
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

## Files

### base.css
Reference implementation of common CSS patterns. Use this as a template when creating new components.

## Creating New Templates

When adding new templates:
1. Copy the full CSS reset and base styles (don't import)
2. Follow existing naming conventions
3. Keep it self-contained
4. Test that the folder works in isolation

## Statistics

- **Total Templates**: 42
- **Templates with CSS Reset**: 42 (100%)
- **Templates with Gradient Background**: 37 (88%)
- **Duplication is intentional** for better user experience

---

*Note: This duplication is a feature, not a bug. It optimizes for end-user experience over DRY principles.*
