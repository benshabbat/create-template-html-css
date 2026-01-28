# Create Template HTML/CSS 🎨

A powerful CLI library to create HTML+CSS element templates. Generate styled UI components in seconds!

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Create New Project](#create-a-new-project)
  - [Insert into Existing Page](#insert-component-into-existing-html-page)
- [Available Templates](#available-templates)
- [Examples](#examples)
- [Project Structure](#project-structure)
- [Use Cases](#use-cases)
- [Technologies](#technologies)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🚀 **Fast Creation** - Create UI components in seconds
- 🎨 **Modern Design** - All templates are designed with high standards
- 📱 **Responsive** - All components adapt to mobile devices
- 🌈 **Stunning Gradients** - Colorful and attractive designs
- ⚡ **Animations** - Smooth and professional effects
- 🔧 **Customizable** - Easy to edit and modify the code
- 📦 **19 Templates** - Button, Card, Form, Navigation, Modal, Footer, Hero, Slider, Table, Spinner, Animated Cards, Typing Effect, Fade Gallery, Grid Layouts, Masonry Grid, Dashboard, Flexbox Layouts
- 🎯 **Two Modes** - Create new projects or insert into existing HTML pages
- 🔒 **Secure** - Input validation and path protection
- 📚 **Well Documented** - Comprehensive guides and examples

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g create-template-html-css
```

Then use the CLI anywhere:

```bash
create-template create
create-template insert
create-template list
```

### Local Installation

```bash
# Clone the repository
git clone https://github.com/benshabbat/create-template-html-css.git
cd create-template-html-css

# Install dependencies
npm install

# Link globally (optional)
npm link
```

## 🚀 Usage

### Mode 1: Create a New Project

Generate a standalone project with HTML, CSS, and JavaScript files:

```bash
create-template create
```

Follow the interactive prompts:
1. **Select Component Type** - Choose from Button, Card, Form, Navigation, Modal, Footer, or Hero
2. **Enter Component Name** - Give your component a meaningful name
3. **Include JavaScript** - Decide if you want to include the script file

**Example:**

```bash
$ create-template create
? Choose a component type: Button
? Enter a name for your component: my-awesome-button
? Include JavaScript file? (Y/n) Yes
✓ Template created successfully!
  Location: ./my-awesome-button/
```

**Result:**
```
my-awesome-button/
├── index.html
├── style.css
└── script.js
```

### Mode 2: Insert Component into Existing HTML Page

Add components directly to your existing HTML files without creating new projects:

```bash
create-template insert
```

Follow the interactive prompts:
1. **Enter HTML File Path** - Specify the target HTML file
2. **Select Component** - Choose which component to insert
3. **Choose CSS Integration** - Inline, separate file, or skip
4. **Choose JS Integration** - Inline, separate file, or skip

**Example:**

```bash
$ create-template insert
? Enter the path to your HTML file: index.html
? Which component would you like to insert? Button
? How should the CSS be added? Inline (inside <style> tag)
? How should the JavaScript be added? Inline (inside <script> tag)
✓ Component inserted successfully!
  File: index.html
  Component: button
  CSS: inline
  JS: inline
```

**CSS/JS Integration Options:**
- **Inline** - Embed directly in the HTML file
- **Separate File** - Create `component-name.css` and `component-name.js` files
- **Skip** - Don't add CSS/JS (you'll add it manually)

### List All Available Templates

```bash
create-template list
```

### Get Help

```bash
create-template --help
```

## 🎨 Available Templates

### 1. Button

A collection of styled button components with multiple variations:

**Variations:**
- Primary Button (main action)
- Secondary Button (alternative action)
- Success Button (positive action)
- Danger Button (destructive action)
- Outlined Button (secondary style)
- Disabled State

**Features:**
- Smooth hover effects
- Animated transitions
- Beautiful gradients
- Click animations

### 2. Card

Responsive card component for displaying content:

**Includes:**
- Image container
- Title and description
- Action button
- Metadata section

**Features:**
- Hover image zoom effect
- Advanced shadow effects
- Responsive grid layout
- Flexible content

### 3. Form

Complete contact form with validation:

**Fields:**
- Text input
- Email input
- Phone input
- Select dropdown
- Textarea
- Checkboxes

**Features:**
- Real-time validation
- Focus effects
- Error messages
- Modern styling

### 4. Navigation

Responsive navigation bar for all devices:

**Components:**
- Logo section
- Navigation menu
- Mobile hamburger menu
- Smooth scrolling

**Features:**
- Fixed header option
- Hamburger animation
- Active page highlighting
- Mobile-friendly

### 5. Modal

Dialog boxes for various purposes:

**Types:**
- Basic modal
- Modal with form
- Alert/warning modal

**Features:**
- Click-outside to close
- ESC key to close
- Smooth animations
- Backdrop blur effect

### 6. Footer

Professional footer section:

**Includes:**
- Multiple columns
- Navigation links
- Contact information
- Social media links

**Features:**
- Responsive grid
- Scroll animations
- Dark gradient
- Flexible layout

### 7. Hero

Hero section for landing pages:

**Types:**
- Gradient background
- Image background
- Centered with form

**Features:**
- Text animations
- Parallax effect
- Animated statistics
- Call-to-action buttons

### 8. Slider

Responsive image carousel component:

**Features:**
- Auto-play functionality
- Previous/next buttons
- Dot indicators
- Smooth fade animations
- Touch-friendly controls
- Responsive design
- Image captions
- Keyboard navigation (ESC to close)

**Includes:**
- 5 sample slides
- Navigation arrows
- Indicator dots
- Auto-advance timer

### 9. Table

Professional data table with advanced features:

**Features:**
- Search functionality
- Status filtering
- Sortable columns
- Pagination support
- Action buttons (Edit/Delete)
- Status badges
- Responsive design
- Row selection

**Includes:**
- 6 sample employees
- Multiple columns (ID, Name, Email, Department, Status, Date)
- Search and filter controls
- Page navigation
- Color-coded status indicators

### 10. Spinner 🔄

Animated loading spinners for various use cases:

**Variations:**
- Circle Spinner - Classic rotating circle
- Bouncing Dots - Three animated dots
- Pulse Loader - Pulsing effect
- Bar Loader - Dancing vertical bars
- Gradient Ring - Colorful rotating ring

**Features:**
- Pure CSS animations
- Smooth performance
- Multiple styles
- Easy customization

### 11. Animated Card ✨

Interactive card components with stunning animations:

**Variations:**
- Flip Card - 3D flip effect
- Glow Card - Animated glowing border
- Slide Card - Content slide animation
- Scale Card - Zoom with shadow
- Tilt Card - 3D tilt on hover
- Gradient Card - Animated background

**Features:**
- Advanced hover effects
- 3D transformations
- Interactive JavaScript
- Modern design patterns

### 12. Typing Effect ⌨️

Text animation components with typing effects:

**Variations:**
- Simple typing animation
- Multi-line typing
- Rotating text display
- Code typing effect

**Features:**
- Customizable speed
- Blinking cursor
- Multiple phrases
- Pause/restart controls

### 13. Fade Gallery 🖼️

Animated image gallery with scroll effects:

**Features:**
- Fade-in animations
- Hover overlays
- Horizontal scroll
- Parallax effect
- Intersection observer
- Responsive masonry layout

### 14. Grid Layout 📐

Comprehensive CSS Grid layouts:

**Includes:**
- Basic responsive grid
- Feature grid with hero item
- Auto-fit flexible grid
- Complex dashboard layout

**Features:**
- Modern CSS Grid
- Multiple grid patterns
- Animated items
- Fully responsive

### 15. Masonry Grid 🧱

Pinterest-style masonry layout:

**Features:**
- Column-based layout
- Category filtering
- Variable item heights
- Staggered animations
- Interactive likes
- 12 sample items

### 16. Dashboard Grid 📊

Complete admin dashboard template:

**Components:**
- Sidebar navigation
- Statistics cards
- Revenue chart
- Activity feed
- Product list
- Quick actions

**Features:**
- Full grid layout
- Real-time animations
- Mobile responsive
- Professional design

### 17. Flex Layout 📏

Comprehensive Flexbox patterns and examples:

**Includes:**
- Row and column layouts
- Space distribution patterns
- Alignment variations
- Flex-grow examples
- Nested flex containers
- Holy Grail layout

**Features:**
- Interactive examples
- Visual demonstrations
- Responsive design
- Modern Flexbox techniques

### 18. Flex Cards 🃏

Equal-height card layouts with Flexbox:

**Variations:**
- Basic equal-height cards
- Pricing cards
- Product cards
- Team member cards
- Testimonial cards

**Features:**
- Automatic equal heights
- Hover animations
- Gradient backgrounds
- Fully responsive

### 19. Flex Dashboard 🎛️

Admin dashboard built entirely with Flexbox:

**Components:**
- Collapsible sidebar
- Top search bar
- Stats cards
- Bar chart visualization
- Activity feed
- Top products list
- Quick actions

**Features:**
- Pure Flexbox layout
- Mobile responsive
- Interactive animations
- Professional design


## 💡 Examples

### Example 1: Create a Button Component

```bash
$ create-template create
? Choose a component type: Button
? Enter a name for your component: primary-button
? Include JavaScript file? (Y/n) Yes
✓ Template created successfully!
  Location: ./primary-button/
```

Open `primary-button/index.html` in your browser to see the component!

### Example 2: Insert a Card into Your Website

You have an existing `products.html` file:

```bash
$ create-template insert
? Enter the path to your HTML file: products.html
? Which component would you like to insert? Card
? How should the CSS be added? Separate file
? How should the JavaScript be added? Separate file
✓ Component inserted successfully!
  File: products.html
  Component: card
  CSS: separate
  JS: separate
```

This creates:
- Updated `products.html` with card HTML
- New `card-component.css` file
- New `card-component.js` file

### Example 3: Quick Navigation Setup

```bash
$ create-template create
? Choose a component type: Navigation
? Enter a name for your component: main-nav
? Include JavaScript file? (Y/n) Yes
```

## 📁 Project Structure

```
create-template-html-css/
├── bin/
│   └── cli.js                 # CLI entry point
├── src/
│   ├── generator.js           # Template generation logic
│   ├── inserter.js            # Component insertion logic
│   └── index.js              # Main module export
├── templates/
│   ├── button/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── card/
│   ├── form/
│   ├── navigation/
│   ├── modal/
│   ├── footer/
│   └── hero/
├── package.json
├── README.md
├── QUICKSTART.md
├── INSERT-DEMO.md
├── SECURITY.md
├── CONTRIBUTING.md
├── LICENSE
└── SHOWCASE.html
```

## 🎯 Use Cases

- **🎬 Quick Prototyping** - Create examples for presentations
- **📚 Learning** - Learn HTML, CSS, and JavaScript best practices
- **🚀 Project Kickstart** - Start projects with a solid foundation
- **📖 Documentation** - Generate examples for your documentation
- **🧪 Experimentation** - Try different designs and layouts
- **🎨 UI Library** - Build your own component library
- **🏗️ Scaffolding** - Quick project scaffolding for teams

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Commander.js** - CLI framework for building command-line interfaces
- **Inquirer.js** - Interactive command-line prompts
- **Chalk** - Terminal string styling
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactive component functionality

## 📁 File Size

- Package: ~23.5 KB
- Unpacked: ~97.1 KB
- Includes all templates, documentation, and source code

## 🔒 Security

- Input validation for file paths
- Component whitelist validation
- Path traversal protection
- Safe file operations

See [SECURITY.md](SECURITY.md) for more details.

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get started in minutes
- **[Insert Feature Demo](INSERT-DEMO.md)** - Detailed insert examples
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Security Policy](SECURITY.md)** - Security guidelines
- **[Component Showcase](SHOWCASE.html)** - View all components in action

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository** - Click the fork button
2. **Create a feature branch** - `git checkout -b feature/AmazingFeature`
3. **Make your changes** - Add your improvements
4. **Commit your changes** - `git commit -m 'Add some AmazingFeature'`
5. **Push to the branch** - `git push origin feature/AmazingFeature`
6. **Open a Pull Request** - Describe your changes

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive open-source license that allows you to:
- ✅ Use commercially
- ✅ Modify the source code
- ✅ Distribute the software
- ✅ Use privately

The only requirement is to include a copy of the license and copyright notice.

## 👨‍💻 Author

**DavidChen Benshabbat**
- GitHub: [@benshabbat](https://github.com/benshabbat)
- Email: benshabbat27@gmail.com

## 🔗 Links

- **npm Package**: https://www.npmjs.com/package/create-template-html-css
- **GitHub Repository**: https://github.com/benshabbat/create-template-html-css
- **Issue Tracker**: https://github.com/benshabbat/create-template-html-css/issues

## 🙏 Acknowledgments

- Inspired by [Create React App](https://create-react-app.dev/)
- Design inspiration from [Tailwind CSS](https://tailwindcss.com/) and [Bootstrap](https://getbootstrap.com/)
- Icons from [Unicode Emojis](https://unicode.org/emoji/)

## ⭐ Support

If you find this project helpful, please consider:
- ⭐ Starring the repository on GitHub
- 📣 Sharing it with others
- 🐛 Reporting issues and suggesting improvements
- 🤝 Contributing to the project

---

Made with ❤️ by  DavidChen Benshabbat

**Happy coding! 🚀**
