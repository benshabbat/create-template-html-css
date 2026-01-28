# Quick Start Guide - מדריך מהיר 🚀

## התקנה מהירה

```bash
# Clone the repository
git clone https://github.com/benshabbat/create-template-html-css.git
cd create-template-html-css

# Install dependencies
npm install

# Link globally (optional)
npm link
```

## דוגמאות שימוש

### 1. צור כפתור מעוצב

```bash
create-template create
# בחר: Button
# שם: my-awesome-button
# JavaScript: Yes
```

**תוצאה:**
```
my-awesome-button/
├── index.html
├── style.css
└── script.js
```

### 2. צור כרטיס מוצר

```bash
create-template create
# בחר: Card
# שם: product-card
# JavaScript: No
```

### 3. צור טופס יצירת קשר

```bash
create-template create
# בחר: Form
# שם: contact-form
# JavaScript: Yes
```

### 4. צור תפריט ניווט

```bash
create-template create
# בחר: Navigation
# שם: main-nav
# JavaScript: Yes
```

### 5. צור חלון מודלי

```bash
create-template create
# בחר: Modal
# שם: popup-modal
# JavaScript: Yes
```

### 6. צור Footer

```bash
create-template create
# בחר: Footer
# שם: site-footer
# JavaScript: Yes
```

### 7. צור Hero Section

```bash
create-template create
# בחר: Hero
# שם: landing-hero
# JavaScript: Yes
```

## טיפים

### פתח בדפדפן
```bash
cd my-awesome-button
start index.html  # Windows
open index.html   # Mac
xdg-open index.html  # Linux
```

### התאמה אישית
פשוט ערוך את הקבצים שנוצרו:
- `index.html` - שנה את התוכן
- `style.css` - שנה את העיצוב
- `script.js` - שנה את הפונקציונליות

### שלב בפרויקט קיים
העתק את הקבצים שנוצרו לפרויקט שלך:
```bash
cp -r my-awesome-button/* ../my-project/
```

## פקודות CLI

```bash
# צור טמפלייט חדש
create-template create

# הצג רשימת טמפלייטים
create-template list

# עזרה
create-template --help

# גרסה
create-template --version
```

## צריך עזרה?

- 📖 קרא את [README.md](README.md)
- 🐛 פתח [Issue](https://github.com/benshabbat/create-template-html-css/issues)
- 💬 שאל שאלות ב-GitHub Discussions

---

**Happy Coding!** 🎨✨
