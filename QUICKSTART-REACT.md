# React Quick Start Guide ⚛️

Get started with React component generation in seconds!

## Installation

```bash
npm install -g create-template-html-css
```

## Create Your First React Component

### Interactive Mode (Recommended)

```bash
create-template create
```

1. Select **React (JSX + CSS)** as your framework
2. Choose a component type (Button, Card, Counter, Form, Modal, or Todo List)
3. Enter a name for your project
4. Choose a color scheme (optional)

### Quick Commands

```bash
# Create a React button
create-template create --react -c button -n my-button

# Create a React counter
create-template create --react -c counter -n my-counter

# Create a React todo list with ocean colors
create-template create --react -c todo-list -n my-todos --color-scheme ocean

# Create a React form with custom colors
create-template create --react -c form -n contact-form --primary-color "#FF5733"
```

## Run Your React Project

```bash
cd my-counter
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available React Components

### 🔘 Button
A customizable button component with variants and sizes.

**Features:**
- Variants: primary, secondary, success, danger
- Sizes: small, medium, large
- Disabled state support
- Click handlers

**Usage:**
```jsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

### 🎴 Card
Display content in an elegant card with image support.

**Features:**
- Optional image header
- Title and description
- Custom footer content
- Hover effects
- Dark mode support

**Usage:**
```jsx
<Card
  title="Beautiful Card"
  description="This is a card description"
  image="https://via.placeholder.com/400x200"
  footer={<button>Learn More</button>}
/>
```

### 🔢 Counter
Interactive counter with increment/decrement functionality.

**Features:**
- Customizable initial value
- Min/max limits
- Custom step size
- Reset button
- Change callback

**Usage:**
```jsx
<Counter 
  initialValue={0}
  min={0}
  max={100}
  step={1}
  onChange={(value) => console.log(value)}
/>
```

### 📝 Form
Flexible form component with built-in validation.

**Features:**
- Multiple field types (text, email, textarea, select)
- Required field validation
- Pattern matching
- Custom error messages
- Min length validation

**Usage:**
```jsx
<Form
  title="Contact Form"
  fields={[
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true }
  ]}
  onSubmit={(data) => console.log(data)}
/>
```

### 🪟 Modal
Dialog modal component with overlay.

**Features:**
- Customizable sizes (small, medium, large)
- Close on overlay click
- Optional close button
- Custom footer
- Smooth animations

**Usage:**
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="medium"
>
  <p>Modal content goes here</p>
</Modal>
```

### ✅ Todo List
Complete todo list with CRUD operations.

**Features:**
- Add new tasks
- Toggle complete status
- Delete tasks
- Task statistics (active/completed)
- Smooth animations

**Usage:**
```jsx
<TodoList />
```

## Project Structure

When you create a React component, you'll get:

```
my-counter/
├── src/
│   ├── components/
│   │   └── Counter/
│   │       ├── Counter.jsx    # Component logic
│   │       └── Counter.css    # Component styles
│   ├── App.jsx               # Main app component
│   └── index.js              # Entry point
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

## Customization

### Colors

All components support color customization:

```bash
# Use preset color schemes
create-template create --react -c button --color-scheme ocean
create-template create --react -c card --color-scheme sunset

# Use custom colors
create-template create --react -c counter --primary-color "#667eea" --secondary-color "#764ba2"
```

**Available color schemes:**
- ocean, sunset, forest, purple, minimal, coral, teal, neon, vibrant, pastel

### Modify Components

All generated components are fully editable:

1. Navigate to `src/components/[ComponentName]/`
2. Edit `ComponentName.jsx` for logic
3. Edit `ComponentName.css` for styles
4. Update `App.jsx` to use your component

### Add Dependencies

```bash
# Add any npm package
npm install axios
npm install react-router-dom
npm install styled-components
```

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

## Preview Production Build

```bash
npm run preview
```

## Tips

1. **Hot Module Replacement**: Vite provides instant updates when you edit files
2. **Component Isolation**: Each component is self-contained with its own CSS
3. **Easy Integration**: Copy components to existing React projects
4. **TypeScript**: Add TypeScript support by renaming `.jsx` to `.tsx` and installing types
5. **State Management**: Add Redux, Zustand, or other state libraries as needed

## Examples

### Create Multiple Components

```bash
# Create a button project
create-template create --react -c button -n awesome-button

# Create a form project
create-template create --react -c form -n contact-form

# Create a todo app
create-template create --react -c todo-list -n my-todos
```

### Integrate into Existing Project

1. Generate component:
   ```bash
   create-template create --react -c card -n temp-card
   ```

2. Copy component files:
   ```bash
   cp -r temp-card/src/components/Card ./src/components/
   ```

3. Import in your app:
   ```jsx
   import Card from './components/Card/Card';
   import './components/Card/Card.css';
   ```

## Need Help?

- 📚 [Full Documentation](https://github.com/benshabbat/create-template-html-css)
- 🐛 [Report Issues](https://github.com/benshabbat/create-template-html-css/issues)
- 💡 [Request Features](https://github.com/benshabbat/create-template-html-css/issues/new)

## Next Steps

- Explore all 6 React components
- Try different color schemes
- Customize components to your needs
- Build your React app!

Happy coding! 🚀
