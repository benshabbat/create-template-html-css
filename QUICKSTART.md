# Quick Start Guide 🚀

## Quick Installation

```bash
# Clone the repository
git clone https://github.com/benshabbat/create-template-html-css.git
cd create-template-html-css

# Install dependencies
npm install

# Link globally (optional)
npm link
```

## Usage Examples

### Mode 1: Create New Project

Create a standalone project with HTML, CSS, and JavaScript files.

#### 1. Create Styled Button

```bash
create-template create
# or
npm run create
# Choose: Button
# Name: my-awesome-button
# JavaScript: Yes
```

**Result:**
```
my-awesome-button/
├── index.html
├── style.css
└── script.js
```

#### 2. Create Product Card

```bash
npm run create
# Choose: Card
# Name: product-card
# JavaScript: No
```

#### 3. Create Contact Form

```bash
npm run create
# Choose: Form
# Name: contact-form
# JavaScript: Yes
```

### Mode 2: Insert into Existing Page

Add components to your existing HTML files without creating new projects.

#### 1. Add Button to Existing Page

```bash
create-template insert
# or
npm run insert
# Enter path: index.html
# Choose: Button
# CSS: Inline (inside <style> tag)
# JS: Inline (inside <script> tag)
```

**What happens:**
- Button HTML is inserted before `</body>`
- CSS is added in a `<style>` tag in the `<head>`
- JavaScript is added in a `<script>` tag before `</body>`

#### 2. Add Card with Separate Files

```bash
npm run insert
# Enter path: products.html
# Choose: Card
# CSS: Separate file
# JS: Separate file
```

**Result:**
- Card HTML inserted into products.html
- card-component.css created and linked
- card-component.js created and linked

#### 3. Add Navigation (Skip JS)

```bash
npm run insert
# Enter path: about.html
# Choose: Navigation
# CSS: Inline
# JS: Skip (I'll add it manually)
```

**Result:**
- Navigation HTML inserted
- CSS added inline
- No JavaScript added (you can add later)

### More Examples

#### 4. Create Navigation Bar

```bash
create-template create
# Choose: Navigation
# Name: main-nav
# JavaScript: Yes
```

#### 5. Create Modal Dialog

```bash
create-template create
# Choose: Modal
# Name: popup-modal
# JavaScript: Yes
```

#### 6. Create Footer

```bash
create-template create
# Choose: Footer
# Name: site-footer
# JavaScript: Yes
```

#### 7. Create Hero Section

```bash
create-template create
# Choose: Hero
# Name: landing-hero
# JavaScript: Yes
```

## Tips

### Open in Browser
```bash
cd my-awesome-button
start index.html  # Windows
open index.html   # Mac
xdg-open index.html  # Linux
```

### Customization
Simply edit the generated files:
- `index.html` - Change the content
- `style.css` - Change the styling
- `script.js` - Change the functionality

### Integrate into Existing Project
Copy the generated files to your project:
```bash
cp -r my-awesome-button/* ../my-project/
```

## CLI Commands

```bash
# Create a new template
create-template create

# Show list of templates
create-template list

# Help
create-template --help

# Version
create-template --version
```

## Need Help?

- 📖 Read [README.md](README.md)
- 🐛 Open an [Issue](https://github.com/benshabbat/create-template-html-css/issues)
- 💬 Ask questions in GitHub Discussions

---

**Happy Coding!** 🎨✨
