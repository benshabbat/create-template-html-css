# 🚀 יצירת תבניות דרך CLI

## יצירה מהירה של Login, Register, ו-Navigation

### דרך 1: שימוש בעלמים (Flags)

הדרך המהירה ביותר ליצור תבניות בשורת פקודה:

```bash
# יצירת תבנית Login
npm run create -- -c login -n my-login

# יצירת תבנית Register
npm run create -- -c register -n my-register

# יצירת תבנית Navigation עם Login Modal
npm run create -- -c navigation -n my-navigation
```

#### תוצאה:
כל פקודה תיצור תיקייה עם המבנה הבא:
```
my-login/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

---

### דרך 2: שימוש במצב אינטראקטיבי

לחוויה יותר מובחרת:

```bash
npm run create
```

אחר כך בחר:
1. **Login Form** מתחת ל-"Authentication Forms"
2. הכנס שם לפרויקט (למשל: `my-login`)
3. הטמפלט ייווצר אוטומטית

---

## 📋 רשימת התבניות הזמינות

```bash
npm run list
```

התוצאה תראה (בין היתר):

```
Authentication Forms
  ✓ Login Form      - התחברות עם ולידציה
  ✓ Register Form   - רישום עם דרישות סיסמה
```

---

## ✨ תכונות התבניות

### 🔐 Login Template
- ✅ טופס התחברות מלא
- ✅ אימות דוא"ל וסיסמה
- ✅ כפתור "זכור אותי"
- ✅ קישור "שכחת סיסמה"
- ✅ כפתורי כניסה חברתית (Google, GitHub)
- ✅ responsive design

### 📝 Register Template
- ✅ טופס רישום מלא
- ✅ דרישות סיסמה בזמן אמת
- ✅ אימות תאמת סיסמה
- ✅ אימות שם משתמש
- ✅ הסכמה לתנאים וגם לניוזלטר
- ✅ disable/enable של כפתור ה-submit

### 🧭 Navigation Template + Login Modal
- ✅ navigation bar responsive
- ✅ כפתור Login שפותח modal
- ✅ login form בתוך modal
- ✅ סגירה עם X, ESC או click על overlay
- ✅ scroll חלק לסעיפי הניווט
- ✅ mobile-friendly hamburger menu

---

## 🎯 דוגמה שלמה

```bash
# יצור את כל שלוש התבניות
npm run create -- -c login -n auth-login
npm run create -- -c register -n auth-register
npm run create -- -c navigation -n site-navigation
```

**תוצאה:**
```
auth-login/          ← תבנית התחברות
auth-register/       ← תבנית רישום
site-navigation/     ← תבנית ניווט עם modal login
```

---

## 🔄 עדכון קבצים

אם רוצים להוסיף קומפוננט login לקובץ HTML קיים:

```bash
npm run insert
```

ואחר כך בחר:
- `login` כקומפוננט
- קובץ HTML להוסיף אליו

---

## 📚 מידע נוסף

### מבנה הקבצים
- `index.html` - קוד HTML עם {{name}} placeholder
- `css/style.css` - סגנונות CSS
- `js/script.js` - לוגיקה JavaScript

### אפשרויות נוספות
```bash
npm run create -- -c login -n my-login --verbose
```

הוסף `--verbose` לראות פרטים על הפעולה

---

## ✅ בדיקה מהירה

לאחר יצירת התבניות:

1. **פתח את קובץ ה-HTML:**
   ```bash
   cd auth-login
   # פתח את index.html בדפדפן
   ```

2. **נסה את הטפסים:**
   - הכנס דוא"ל וסיסמה
   - לחץ על כפתור ה-submit
   - בדוק validation

3. **בדוק responsive:**
   - פתח את DevTools (F12)
   - הקטן את גודל החלון
   - בדוק טלפון (Mobile)

---

## 🎨 התאמה

כל קובץ שנוצר ניתן להתאמה מלאה:
- `{{name}}` - משתנה placeholder שניתן להחליף
- Colors - שנה את ה-gradient colors ב-CSS
- Fields - הסר/הוסף שדות בטופס
- Scripts - התאם את ה-validation logic

---

**סיכום:**
```bash
# יצור ותשתמש ב-3 שורות בלבד! 🚀
npm run create -- -c login -n login
npm run create -- -c register -n register
npm run create -- -c navigation -n navigation
```
