/**
 * React Component choices for interactive CLI prompts
 */

export const REACT_COMPONENT_CHOICES = [
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
    name: "🔢 Counter - Interactive counter with increment/decrement",
    value: "counter",
    short: "Counter",
  },
  {
    name: "📝 Form - Flexible form with validation",
    value: "form",
    short: "Form",
  },
  {
    name: "🪟 Modal - Dialog modal component",
    value: "modal",
    short: "Modal",
  },
  {
    name: "✅ Todo List - Complete todo list with CRUD operations",
    value: "todo-list",
    short: "Todo List",
  },
];

export const REACT_COMPONENT_DESCRIPTIONS = {
  button: "A customizable button component with multiple variants (primary, secondary, success, danger) and sizes (small, medium, large)",
  card: "A versatile card component for displaying content with image, title, description, and footer support",
  counter: "A simple counter component with increment, decrement, and reset functionality. Supports min/max limits and custom steps",
  form: "A flexible form component with built-in validation, supporting multiple field types (text, email, textarea, select)",
  modal: "A modal dialog component with overlay, customizable sizes, and close handlers",
  "todo-list": "A complete todo list component with add, toggle, and delete functionality. Includes task statistics",
};
