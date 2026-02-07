# Template Code Patterns

This document catalogs common code patterns found across templates. These patterns are intentionally duplicated in each template to maintain independence.

## JavaScript Patterns

### DOM Selection Patterns

**querySelector/querySelectorAll** - Used in 40+ templates
```javascript
const element = document.querySelector('.class-name');
const elements = document.querySelectorAll('.multiple-items');
```

**getElementById** - Used in 35+ templates (especially games and interactive components)
```javascript
const button = document.getElementById('myButton');
```

### Event Listener Patterns

**Click Handlers** - Found in all interactive templates
```javascript
button.addEventListener('click', handleClick);

// Or inline
button.addEventListener('click', () => {
    // Handle click
});
```

**Common Event Setup**
```javascript
// Multiple elements
buttons.forEach(button => {
    button.addEventListener('click', handler);
});

// Delegation pattern
document.addEventListener('click', function(e) {
    if (e.target.matches('.selector')) {
        // Handle
    }
});
```

### Game Control Patterns

Found in 12 game templates (snake, tetris, pong, etc.):
```javascript
let gameActive = false;
let score = 0;

function startGame() {
    gameActive = true;
    score = 0;
    // Initialize game
}

function pauseGame() {
    gameActive = false;
    // Pause logic
}

function resetGame() {
    gameActive = false;
    score = 0;
    // Reset logic
}

// Button bindings
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resetBtn.addEventListener('click', resetGame);
```

### Update Display Pattern

Common in counters, scores, and dynamic content:
```javascript
function updateDisplay() {
    element.textContent = value;
    // Update other UI elements
}
```

## CSS Patterns

### Layout Patterns

**Centered Container** (30+ templates)
```css
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

**Grid Layout** (15+ templates)
```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

**Flexbox Layout** (20+ templates)
```css
.flex-container {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}
```

### Animation Patterns

**Hover Transitions** (35+ templates)
```css
.element {
    transition: all 0.3s ease;
}

.element:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
```

**Fade Animations**
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.animated {
    animation: fadeIn 0.5s ease-in-out;
}
```

### Button Patterns

Found in 40+ templates:
```css
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
    transform: translateY(0);
}
```

## HTML Patterns

### Semantic Structure

**Container → Card → Content** (25+ templates)
```html
<div class="container">
    <div class="card">
        <h1>Title</h1>
        <p>Content</p>
    </div>
</div>
```

**Form Structure** (form, login, register templates)
```html
<form class="form">
    <h1 class="form-title">Title</h1>
    <div class="form-group">
        <label for="input">Label</label>
        <input type="text" id="input" name="input">
    </div>
    <button type="submit">Submit</button>
</form>
```

### Canvas for Games (10 game templates)
```html
<canvas id="gameCanvas" width="400" height="400"></canvas>
<div class="game-controls">
    <button id="startBtn">Start</button>
    <button id="pauseBtn">Pause</button>
    <button id="resetBtn">Reset</button>
</div>
```

## Why These Patterns Repeat

1. **Consistency**: Users recognize familiar patterns across templates
2. **Learning**: Patterns reinforce best practices
3. **Copy-Paste Ready**: Each template works standalone
4. **No Dependencies**: No shared libraries to break

## Best Practices for New Templates

When creating new templates, follow these patterns:

✅ **DO**:
- Use semantic HTML5 elements
- Include comprehensive comments
- Follow existing naming conventions
- Keep JavaScript vanilla (no frameworks)
- Make it work without any build process

❌ **DON'T**:
- Import from other templates
- Require external libraries (unless clearly documented)
- Use complex build tools
- Break the self-contained principle

## Statistics

- **Total Templates**: 42
- **JavaScript Files**: 42
- **CSS Files**: 42
- **HTML Files**: 42
- **Average File Size**: ~150 lines per file
- **Common Patterns**: 15+ recurring patterns across templates

---

*These patterns ensure consistency while maintaining template independence.*
