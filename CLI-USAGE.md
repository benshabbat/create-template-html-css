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

או בקיצור:

```bash
node bin/cli.js create -c login -n my-login
node bin/cli.js create -c register -n my-register
node bin/cli.js create -c navigation -n my-navigation
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
# או
node bin/cli.js create
```

אחר כך בחר:
1. **Login Form** מתחת ל-"Authentication Forms"
2. הכנס שם לפרויקט (למשל: `my-login`)
3. הטמפלט ייווצר אוטומטית

---

## 📋 רשימת התבניות הזמינות

```bash
npm run list
# או
node bin/cli.js list
```

התוצאה תראה (בין היתר):

```
📦 Available Components (25 total)

━ Basic Components (9)
  button          Styled button component
  card            Card component with image and content
  form            Form with input fields and validation
  navigation      Responsive navigation bar
  modal           Modal dialog component
  footer          Footer section
  hero            Hero section with CTA button
  slider          Image carousel with navigation
  table           Data table with search and filtering

━ Authentication Forms (2)
  login           Login form with validation
  register        Register form with password requirements

━ Animation Templates (4)
  ...
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
- ✅ modern gradient design

### 📝 Register Template
- ✅ טופס רישום מלא
- ✅ דרישות סיסמה בזמן אמת
- ✅ אימות תאמת סיסמה
- ✅ אימות שם משתמש
- ✅ הסכמה לתנאים וגם לניוזלטר
- ✅ disable/enable של כפתור ה-submit
- ✅ בחזקת UX עם טעויות ברורות

### 🧭 Navigation Template + Login Modal
- ✅ navigation bar responsive
- ✅ כפתור Login שפותח modal
- ✅ login form בתוך modal
- ✅ סגירה עם X, ESC או click על overlay
- ✅ scroll חלק לסעיפי הניווט
- ✅ mobile-friendly hamburger menu
- ✅ animations וsmooth transitions

---

## 🎯 דוגמה שלמה - יצור מערכת אימות מלאה

```bash
# יצור את כל שלוש התבניות
npm run create -- -c login -n auth-login
npm run create -- -c register -n auth-register
npm run create -- -c navigation -n auth-navigation
```

**תוצאה:**
```
auth-login/             ← תבנית התחברות עם טופס וולידציה
  ├── index.html
  ├── css/
  │   └── style.css
  └── js/
      └── script.js

auth-register/          ← תבנית רישום עם דרישות סיסמה בזמן אמת
  ├── index.html
  ├── css/
  │   └── style.css
  └── js/
      └── script.js

auth-navigation/        ← תבנית ניווט עם modal login משולב
  ├── index.html
  ├── css/
  │   └── style.css
  └── js/
      └── script.js
```

---

## 🔄 הוסף קומפוננט ל-HTML קיים

אם רוצים להוסיף קומפוננט login לקובץ HTML קיים:

```bash
npm run insert
# או
node bin/cli.js insert
```

ואחר כך בחר:
- `login` כקומפוננט
- קובץ HTML להוסיף אליו
- איך להוסיף את ה-JavaScript (separate/inline/skip)

#### דוגמה עם flags:
```bash
node bin/cli.js insert -f index.html -c login -s separate
```

---

## 📚 מידע נוסף

### מבנה הקבצים
- `index.html` - קוד HTML עם {{name}} placeholder
- `css/style.css` - סגנונות CSS
- `js/script.js` - לוגיקה JavaScript

### אפשרויות נוספות

#### Create עם verbose mode:
```bash
npm run create -- -c login -n my-login -v
```

#### Insert עם backup:
```bash
npm run insert -- -f index.html -c login -b
```

---

## ✅ בדיקה מהירה - איך לפתוח את התבניות

### אופציה 1: פתח את קובץ ה-HTML במישרין
```bash
cd auth-login
# Windows:
start index.html
# Mac:
open index.html
# Linux:
xdg-open index.html
```

### אופציה 2: השתמש בפתחן קבצים
- נווט ל- `auth-login/` תיקייה
- לחץ כפול על `index.html`

### אופציה 3: השתמש בשרת מקומי (אם יש לך)
```bash
cd auth-login
python -m http.server 8000
# או
npx http-server
```
אחר כך פתח: `http://localhost:8000`

---

## 🧪 מה לבדוק בכל תבנית

### 🔐 Login:
- [ ] הכנס דוא"ל וסיסמה
- [ ] לחץ על כפתור ה-submit
- [ ] בדוק validation (דוא"ל לא תקין, סיסמה קצרה)
- [ ] לחץ על "שכחת סיסמה"
- [ ] לחץ על כפתורי Social Login
- [ ] בדוק responsive design

### 📝 Register:
- [ ] התחל להקליד סיסמה - ראה דרישות בזמן אמת
- [ ] כשיש מחסור - כפתור ה-submit חייב להיות disabled
- [ ] הכנס סיסמה שונה בשניים - ראה שגיאה
- [ ] בדוק שם משתמש (3-20 תווים, אותיות ומספרים בלבד)
- [ ] קבל את התנאים - עכשיו הכפתור צריך להיות enabled
- [ ] לחץ submit וראה הודעת הצלחה

### 🧭 Navigation:
- [ ] לחץ על "Login" - צריך להיפתח modal
- [ ] סגור עם X, ESC, או לחיצה על overlay
- [ ] לחץ על סעיפי הניווט - צריך scroll חלק
- [ ] בדוק menu בנייד - צריך hamburger menu
- [ ] נסה modal על טלפון - צריך להתאים כראוי

---

## 🎨 התאמה וקוסטומיזציה

כל קובץ שנוצר ניתן להתאמה מלאה:

### HTML:
- `{{name}}` - משתנה placeholder שניתן להחליף
- הסר/הוסף שדות בטופס
- שנה את רקע ה-hero section

### CSS:
- שנה את ה-gradient colors
- התאם את גודל הפונט
- בנה custom animations

### JavaScript:
- התאם את validation rules
- בנה API integration
- הוסף logging וanalytics

---

## 🚀 דוגמה מעשית - יצור מערכת אימות מלאה

```bash
# שלב 1: ניווט בעמוד הבית שלך
npm run create -- -c navigation -n my-site

# שלב 2: דף ההתחברות
npm run create -- -c login -n login-page

# שלב 3: דף ההרשמה
npm run create -- -c register -n register-page

# שלב 4: פתח בדפדפן וראה את התוצאה!
cd my-site && start index.html
```

---

## 📞 עזרה ותמיכה

### צפה בכל הקבצים הזמינים:
```bash
npm run list
```

### צור תבנית עם פרטים מלאים:
```bash
npm run create -- -c login -n my-login -v
```

### בדוק את הפורמט:
```bash
npm run insert -- -f myfile.html -c login
```

---

## 🎯 סיכום מהיר

```bash
# יצור ותשתמש ב-3 שורות בלבד! 🚀
npm run create -- -c login -n login
npm run create -- -c register -n register  
npm run create -- -c navigation -n navigation

# או בקיצור אפילו יותר:
node bin/cli.js create -c login -n login
node bin/cli.js create -c register -n register
node bin/cli.js create -c navigation -n navigation
```

✅ **מוכן! עכשיו יש לך מערכת אימות מלאה!**

