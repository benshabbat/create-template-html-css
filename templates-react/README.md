# React Components Templates 🎨⚛️

This directory contains React component templates that can be generated using the `create-template` CLI tool with React support.

## Available Components

### 🔘 Button
A customizable button component with various styles and states:
- **Variants**: primary, secondary, success, danger
- **Sizes**: small, medium, large
- **States**: enabled, disabled
- **Props**: variant, size, disabled, onClick, type, className

### 🎴 Card
A versatile card component for displaying content:
- **Features**: image support, title, description, footer
- **Responsive design**
- **Hover effects**
- **Dark mode support**
- **Props**: title, description, image, imageAlt, footer, onClick, className

### 🔢 Counter
A simple counter with increment and decrement functionality:
- **Features**: customizable initial value, min/max limits, custom step
- **Animations**: smooth transitions
- **Controls**: increment, decrement, reset buttons
- **Props**: initialValue, min, max, step, onChange

### 📝 Form
A flexible form component with validation:
- **Features**: multiple field types (text, email, textarea, select)
- **Validation**: required fields, patterns, min length
- **Error messages**
- **Dark mode support**
- **Props**: title, fields, onSubmit, submitButtonText

### 🪟 Modal
A flexible modal dialog component:
- **Features**: overlay click to close, customizable size
- **Sizes**: small, medium, large
- **Animations**: fade in, slide up
- **Dark mode support**
- **Props**: isOpen, onClose, title, children, footer, showCloseButton, closeOnOverlayClick, size

### ✅ Todo List
A complete todo list with add, toggle, and delete functionality:
- **Features**: add tasks, mark as complete, delete tasks
- **Statistics**: active and completed count
- **Animations**: smooth transitions
- **Dark mode support**
- **Local state management**

## Usage

### Creating a React Component

```bash
# Interactive mode
npx create-template-html-css create --react

# With flags
npx create-template-html-css create --react --component button --name my-button
```

### Importing in Your Project

```jsx
import Button from './components/Button/Button';
import './components/Button/Button.css';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  );
}
```

## Component Structure

Each component follows this structure:
```
component-name/
├── ComponentName.jsx      # Main component
├── ComponentName.css      # Styles
└── ComponentName.example.jsx  # Usage examples
```

## Styling

All components support:
- ✨ Gradient backgrounds with customizable colors
- 🌙 Dark mode (prefers-color-scheme)
- 📱 Responsive design
- 🎭 Smooth animations and transitions
- 🎨 CSS color placeholders ({{primaryColor}}, {{secondaryColor}})

## Color Customization

Colors can be customized during generation:
- `--primary-color`: Main brand color
- `--secondary-color`: Accent color
- `--color-scheme`: Predefined schemes (ocean, sunset, forest, etc.)

## Requirements

These components are designed for use with:
- React 16.8+ (Hooks support)
- Modern browsers (ES6+)
- CSS3 support

## Contributing

To add a new React component template:
1. Create a new directory in `templates-react/`
2. Add `ComponentName.jsx`, `ComponentName.css`, and `ComponentName.example.jsx`
3. Follow the existing component structure
4. Update this README

## Notes

- All components use functional components with hooks
- PropTypes or TypeScript types can be added as needed
- Components are fully self-contained with their own styles
- CSS uses placeholders for color customization during generation
