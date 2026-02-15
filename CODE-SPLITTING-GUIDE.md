# Code Splitting Guide 🚀

This guide explains how to use code splitting features in your React projects to reduce bundle size and improve performance.

## What is Code Splitting?

Code splitting is a technique that splits your JavaScript bundle into smaller chunks that can be loaded on demand. This reduces the initial load time of your application by only loading the code that's needed for the current page.

## Features

### 1. Lazy Loading with React.lazy() and Suspense

When you enable `--lazy-load` flag, your components are loaded dynamically using React's built-in lazy loading:

```bash
create-template create --react -c button -n my-app --lazy-load
```

This generates an App.jsx like this:

```jsx
import { lazy, Suspense } from 'react';
import './components/Button/Button.css';

// Component is loaded only when needed
const Button = lazy(() => import('./components/Button/Button'));

function App() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      {/* Your component usage */}
    </Suspense>
  );
}

export default App;
```

**Benefits:**
- ✅ Smaller initial bundle size
- ✅ Faster page load time
- ✅ Better performance on slow networks
- ✅ Improved user experience with loading states

### 2. Build Optimizations

When you enable `--optimize-build` flag, your vite.config.js includes advanced optimizations:

```bash
create-template create --react -c button -n my-app --optimize-build
```

This generates:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunk
          vendor: ['react', 'react-dom'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
  },
});
```

**Benefits:**
- ✅ Vendor code (React, ReactDOM) in separate chunk
- ✅ Better caching (vendor chunk rarely changes)
- ✅ Smaller main bundle
- ✅ Console.log removal in production
- ✅ Better compression

### 3. Combine Both for Maximum Performance

```bash
create-template create --react -c counter -n my-app --lazy-load --optimize-build
```

This gives you:
- Dynamic component loading
- Optimized vendor chunking
- Production-ready configuration

## Interactive Mode

You can also enable these features interactively:

```bash
create-template create
```

Then answer:
- Framework: **React (JSX + CSS)**
- Project type: **Full React project**
- Component: *Choose your component*
- Name: *Your project name*
- Lazy loading: **Yes**
- Build optimizations: **Yes**

## Performance Impact

### Without Code Splitting
```
bundle.js    150 KB
├── React     45 KB
├── ReactDOM  40 KB
└── Your App  65 KB

Initial Load: 150 KB (slower)
```

### With Code Splitting
```
vendor.js     85 KB  (cached)
├── React     45 KB
└── ReactDOM  40 KB

main.js       35 KB  (loaded first)
└── Core App  35 KB

Button.js     30 KB  (lazy loaded)
└── Component 30 KB

Initial Load: 120 KB (faster!) ⚡
Subsequent loads: 35 KB only (vendor cached)
```

## Advanced Usage

### Route-Based Code Splitting

For multi-page apps, you can extend this pattern:

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Custom Loading Component

Replace the fallback with a custom loader:

```jsx
const Spinner = () => (
  <div className="spinner">
    <div className="spinner-circle"></div>
  </div>
);

<Suspense fallback={<Spinner />}>
  <Button />
</Suspense>
```

## Bundle Analysis

To analyze your bundle size:

```bash
npm install --save-dev rollup-plugin-visualizer
```

Update vite.config.js:

```js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: true,
    }),
  ],
  // ... rest of config
});
```

Then run:

```bash
npm run build
```

This opens a visual representation of your bundle!

## Best Practices

1. **Always lazy load routes** in multi-page apps
2. **Split vendor code** for better caching
3. **Add meaningful loading states** for better UX
4. **Analyze your bundle** to find optimization opportunities
5. **Use lazy loading wisely** - don't split too aggressively
6. **Test on slow networks** to verify improvements

## Migration Guide

### Existing Projects

To add code splitting to an existing project:

1. **Add lazy loading to App.jsx:**

```jsx
// Before
import Button from './components/Button/Button';

// After
import { lazy, Suspense } from 'react';
const Button = lazy(() => import('./components/Button/Button'));

// Wrap your component in Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Button />
</Suspense>
```

2. **Update vite.config.js:**

Add the build optimization section from this guide.

3. **Test thoroughly:**

```bash
npm run build
npm run preview
```

## Learn More

- [React Code Splitting](https://react.dev/reference/react/lazy)
- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
- [Web Performance](https://web.dev/performance/)

## Examples

See the `templates-react/` directory for examples of components that can benefit from code splitting.

---

**Happy optimizing! 🎉**
