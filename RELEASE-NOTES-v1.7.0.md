# Release Notes - v1.7.0 🎯

**Release Date:** February 1, 2026

## Overview

Version 1.7.0 introduces **component customization** features that give developers complete control over Navigation, Form, Button, Card, and Spinner components during creation. This release focuses on enhancing the CLI experience with interactive prompts for tailored component generation.

---

## 🎯 New Features

### 1. Customizable Navigation Items

Create navigation bars with exactly the menu items you need:

**How it works:**
- Interactive prompt asks for comma-separated menu items
- Automatically generates navigation links and matching page sections
- Default: "Home, About, Services, Portfolio, Contact"

**Example Usage:**
```bash
$ create-template create
? Choose a component type: Navigation
? Enter navigation items: Home, Blog, Shop, About Us, Contact
```

**Generated Output:**
- Navigation bar with 5 custom menu items
- 5 matching page sections with proper IDs and anchor links
- Responsive mobile menu with hamburger toggle
- Smooth scroll functionality

**Use Cases:**
- Personal portfolio sites
- Business websites
- Blogs and content sites
- E-commerce navigation
- Documentation sites

---

### 2. Customizable Form Fields

Build forms with standard and custom fields:

**Standard Fields (Checkbox Selection):**
- ✅ Name (Full Name)
- ✅ Email
- ⬜ Phone
- ⬜ Subject (dropdown)
- ✅ Message (textarea)
- ⬜ Terms Checkbox

**Custom Fields (Type:Label Format):**
Add unlimited custom fields using the format `type:label`:

| Type | Example | Result |
|------|---------|--------|
| `text` | `text:Age` | Text input for age |
| `email` | `email:Work Email` | Email input |
| `url` | `url:Website` | URL input with validation |
| `date` | `date:Birth Date` | Date picker |
| `number` | `number:Quantity` | Number input |
| `tel` | `tel:Mobile` | Phone number input |
| `password` | `password:Password` | Password field |
| `color` | `color:Favorite Color` | Color picker |
| `textarea` | `textarea:Comments` | Multi-line text area |
| `checkbox` | `checkbox:Subscribe` | Checkbox field |
| `select` | `select:Country` | Dropdown menu |

**Example Usage:**
```bash
$ create-template create
? Choose a component type: Form
? Select form fields to include: Name, Email, Message
? Add custom fields: text:Age, url:Website, date:Birth Date
```

**Generated Output:**
- Form with 3 standard fields (Name, Email, Message)
- 3 custom fields (Age, Website, Birth Date)
- All fields properly labeled and structured
- Validation-ready HTML5 input types

**Use Cases:**
- Contact forms
- Registration forms
- Survey forms
- Order forms
- Application forms
- Feedback forms

---

### 3. Component Variation Selection

Choose exactly which variations you want for components with multiple styles:

**Button Component:**
- **All Buttons Option**: Get all 6 button types at once
- **Select Specific**: Choose from Primary, Secondary, Success, Danger, Outlined, Disabled
- Great for projects that only need specific button styles

**Example Usage:**
```bash
$ create-template create
? Choose a component type: Button
? Which button variations do you want? Select Specific Buttons
? Select button variations: Primary Button, Success Button, Danger Button
```

**Generated Output:**
- Only the selected 3 button types in the HTML
- Cleaner code without unused variations
- All matching CSS styles included

**Card Component:**
- **All Cards Option**: Get all 6 card variations
- **Select Specific**: Choose from:
  - Modern Card (Featured with badge and rating)
  - Premium Card (Price card with features)
  - Blog Card (With tags and author info)
  - Minimal Card (Clean, simple design)
  - User Profile Card (Avatar-based)
  - Interactive Card (Action buttons)

**Example Usage:**
```bash
$ create-template create
? Choose a component type: Card
? Which card variations do you want? Select Specific Cards
? Select card variations: Modern Card, Premium Card, Blog Card
```

**Spinner Component:**
- **All Spinners Option**: Get all 5 spinner types
- **Select Specific**: Choose from:
  - Circle Spinner
  - Bouncing Dots
  - Pulse Loader
  - Bar Loader
  - Gradient Ring

**Example Usage:**
```bash
$ create-template create
? Choose a component type: Spinner
? Which spinner variations do you want? Select Specific Spinners
? Select spinner types: Circle Spinner, Gradient Ring
```

**Benefits:**
- **Cleaner Code**: Only get what you need
- **Faster Development**: Less code to review and modify
- **Better Performance**: Smaller HTML files
- **Easy to Customize**: Fewer variations to manage

---

## 🔧 Technical Details

### New CLI Prompts

**Navigation Component:**
```javascript
{
  type: "input",
  name: "navItems",
  message: "Enter navigation items (comma-separated):",
  default: "Home, About, Services, Portfolio, Contact",
  when: (answers) => answers.component === "navigation"
}
```

**Form Component:**
```javascript
// Standard fields
{
  type: "checkbox",
  name: "formFields",
  message: "Select form fields to include:",
  choices: ["Name", "Email", "Phone", "Subject", "Message", "Terms Checkbox"]
}

// Custom fields
{
  type: "input",
  name: "customFormFields",
  message: "Add custom fields (format: type:label, e.g., 'text:Age, url:Website'):"
}
```

**Button Component:**
```javascript
{
  type: "list",
  name: "buttonVariations",
  message: "Which button variations do you want?",
  choices: [
    { name: "All Buttons (6 variations)", value: "all" },
    { name: "Select Specific Buttons", value: "select" }
  ]
}
```

**Card Component:**
```javascript
{
  type: "checkbox",
  name: "selectedCards",
  message: "Select card variations:",
  choices: ["Modern Card", "Premium Card", "Blog Card", "Minimal Card", "User Profile Card", "Interactive Card"]
}
```

**Spinner Component:**
```javascript
{
  type: "checkbox",
  name: "selectedSpinners",
  message: "Select spinner types:",
  choices: ["Circle Spinner", "Bouncing Dots", "Pulse Loader", "Bar Loader", "Gradient Ring"]
}
```

### Generator Functions

**New Functions Added:**
- `generateNavigationItems(htmlContent, navItems)` - Processes navigation items and generates HTML
- `generateFormFields(htmlContent, formFields, customFormFields)` - Handles both standard and custom form fields
- `filterButtonVariations(htmlContent, buttonVariations, selectedButtons)` - Filters button HTML based on selection
- `filterCardVariations(htmlContent, cardVariations, selectedCards)` - Filters card HTML based on selection
- `filterSpinnerVariations(htmlContent, spinnerVariations, selectedSpinners)` - Filters spinner HTML based on selection

**Updated Function:**
- `generateTemplate(options)` - Now accepts `navItems`, `formFields`, `customFormFields`, and variation selection parameters

---

## 📊 Supported Input Types

All HTML5 input types are supported for custom fields:

- text
- email
- url
- tel
- number
- date
- datetime-local
- time
- week
- month
- color
- range
- password
- search
- file
- hidden

Plus special elements:
- textarea
- select (dropdown)
- checkbox

---

## 🎨 Examples

### Example 1: E-commerce Navigation
```
Navigation items: Home, Shop, Products, Cart, Account, Contact
```

### Example 2: Blog Navigation
```
Navigation items: Home, Articles, Categories, About, Subscribe
```

### Example 3: Contact Form
```
Standard fields: Name, Email, Message
Custom fields: text:Company, url:Website, tel:Phone
```

### Example 4: Registration Form
```
Standard fields: Name, Email
Custom fields: password:Password, password:Confirm Password, date:Birth Date, checkbox:Terms
```

### Example 5: Feedback Form
```
Standard fields: Email, Message
Custom fields: number:Rating, select:Category, textarea:Suggestions
```

---

## 🚀 Migration Guide

### From v1.6.x to v1.7.0

**No Breaking Changes** - v1.7.0 is fully backward compatible!

**New Features (Optional):**
- When creating Navigation components, you'll see a new prompt for menu items
- When creating Form components, you'll see new prompts for field selection
- Simply press Enter to use defaults if you prefer the old behavior

**Example (Old Behavior):**
```bash
create-template create -c navigation -n my-nav
# Uses default navigation items
```

**Example (New Behavior):**
```bash
create-template create
# Interactive prompts guide you through customization
```

---

## 📦 Installation

### Update Existing Installation:
```bash
npm update -g create-template-html-css
```

### Fresh Installation:
```bash
npm install -g create-template-html-css
```

### Verify Version:
```bash
create-template --version
# Should show: 1.7.0
```

---

## 🐛 Bug Fixes

No bug fixes in this release - focus was on new features.

---

## 🔮 Coming Soon

We're planning these features for future releases:

- **v1.8.0**: More component customization options (Hero, Modal, Footer)
- **v1.9.0**: Theme selection (light/dark mode presets)
- **v2.0.0**: Component library with mix-and-match features
- **Future**: TypeScript template support
- **Future**: React/Vue component generation

---

## 📝 Feedback

We'd love to hear your thoughts on these new features!

- 🐛 **Report bugs**: [GitHub Issues](https://github.com/benshabbat/create-template-html-css/issues)
- 💡 **Suggest features**: [GitHub Discussions](https://github.com/benshabbat/create-template-html-css/discussions)
- ⭐ **Star the repo**: [GitHub](https://github.com/benshabbat/create-template-html-css)

---

## 👥 Contributors

Thank you to everyone who contributed to this release!

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Happy Coding! 🎨✨**
