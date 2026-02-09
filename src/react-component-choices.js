/**
 * React Component choices for interactive CLI prompts
 */

export const REACT_COMPONENT_CHOICES = [
  {
    name: "� Alert - Alert/notification component with variants",
    value: "alert",
    short: "Alert",
  },
  {
    name: "🔘 Button - Customizable button with variants and sizes",
    value: "button",
    short: "Button",
  },
  {
    name: "🎴 Card - Display content in an elegant card",
    value: "card",
    short: "Card",
  },
  {
    name: "☑️ Checkbox - Checkbox with sizes, colors, and states",
    value: "checkbox",
    short: "Checkbox",
  },
  {
    name: "🔢 Counter - Interactive counter with increment/decrement",
    value: "counter",
    short: "Counter",
  },
  {
    name: "📋 Dropdown - Select dropdown with search and multi-select",
    value: "dropdown",
    short: "Dropdown",
  },
  {
    name: "📝 Form - Flexible form with validation",
    value: "form",
    short: "Form",
  },
  {
    name: "📄 Input - Text input with validation and states",
    value: "input",
    short: "Input",
  },
  {
    name: "🪟 Modal - Dialog modal component",
    value: "modal",
    short: "Modal",
  },
  {
    name: "🧭 Navbar - Navigation bar with mobile menu",
    value: "navbar",
    short: "Navbar",
  },
  {
    name: "✅ Todo List - Complete todo list with CRUD operations",
    value: "todo-list",
    short: "Todo List",
  },
  {
    name: "💬 Tooltip - Contextual tooltip with positions and triggers",
    value: "tooltip",
    short: "Tooltip",
  },
];

export const REACT_COMPONENT_DESCRIPTIONS = {
  alert: "An alert component for displaying notifications with different types (success, error, warning, info). Supports dismissible and custom icons",
  button: "A customizable button component with multiple variants (primary, secondary, success, danger) and sizes (small, medium, large)",
  card: "A versatile card component for displaying content with image, title, description, and footer support",
  checkbox: "A checkbox component with different sizes, colors (primary, secondary, success, error), indeterminate state, and validation support",
  counter: "A simple counter component with increment, decrement, and reset functionality. Supports min/max limits and custom steps",
  dropdown: "A dropdown select component with searchable options, multi-select support, custom positioning, and keyboard navigation",
  form: "A flexible form component with built-in validation, supporting multiple field types (text, email, textarea, select)",
  input: "A text input component with validation, error messages, icons, and different states (focused, error, disabled)",
  modal: "A modal dialog component with overlay, customizable sizes, and close handlers",
  navbar: "A responsive navigation bar with logo, menu items, and mobile hamburger menu. Supports sticky positioning",
  "todo-list": "A complete todo list component with add, toggle, and delete functionality. Includes task statistics",
  tooltip: "A contextual tooltip component with multiple positions (top, bottom, left, right), triggers (hover, click, focus), and customizable delays",
};
