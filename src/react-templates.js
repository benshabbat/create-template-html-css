/**
 * React Templates Generator Module
 * 
 * Generates complete React project files including App.jsx, index files,
 * configuration files, and documentation for component-based projects.
 * 
 * @module react-templates
 * @requires react-component-templates
 */

import { 
  getComponentTemplate, 
  getComponentImports,
  hasComponent,
  getAllComponentNames
} from './react-component-templates.js';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * React and Vite version constants
 * Ensures consistent dependency versions across generated projects
 * 
 * @constant {string}
 */
const REACT_VERSION = "^18.2.0";
const VITE_VERSION = "^5.0.0";
const VITE_REACT_PLUGIN_VERSION = "^4.2.0";

// ============================================================================
// TEMPLATE HELPERS
// ============================================================================

/**
 * Create App.jsx template wrapper
 * 
 * Wraps component usage examples in a complete React App component structure,
 * including proper imports and export statements.
 * 
 * @param {string} componentName - Component name in PascalCase (e.g., 'Button')
 * @param {string} additionalImports - React hooks to import (e.g., 'useState, useEffect')
 * @param {string} content - JSX content for the App component body
 * @returns {string} Complete App.jsx file content
 * 
 * @example
 * createAppTemplate('Button', 'useState', 'return <div>...</div>');
 */
function createAppTemplate(componentName, additionalImports = '', content) {
  const reactImports = additionalImports 
    ? `import { ${additionalImports} } from 'react';`
    : '';
    
  const importsSection = reactImports ? `${reactImports}\n` : '';
  return `${importsSection}import ${componentName} from './components/${componentName}/${componentName}';
import './components/${componentName}/${componentName}.css';

function App() {
${content}
}

export default App;`;
}

/**
 * Create App.jsx template with Lazy Loading
 * 
 * Wraps component usage in React.lazy() and Suspense for code splitting.
 * Reduces initial bundle size by loading components on demand.
 * 
 * @param {string} componentName - Component name in PascalCase
 * @param {string} additionalImports - React hooks to import
 * @param {string} content - JSX content for the App component body
 * @returns {string} Complete App.jsx with lazy loading
 */
function createAppTemplateWithLazyLoading(componentName, additionalImports = '', content) {
  const reactImports = additionalImports 
    ? `import { lazy, Suspense, ${additionalImports} } from 'react';`
    : `import { lazy, Suspense } from 'react';`;
    
  return `${reactImports}
import './components/${componentName}/${componentName}.css';

// Lazy load component for code splitting
const ${componentName} = lazy(() => import('./components/${componentName}/${componentName}'));

function App() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
${content}
    </Suspense>
  );
}

export default App;`;
}

// ============================================================================
// APP.JSX GENERATOR
// ============================================================================

/**
 * Generate App.jsx content with component examples
 * 
 * Creates a complete App.jsx file that demonstrates the component's features.
 * Falls back to a basic example if the component template is not found.
 * 
 * @param {string} componentName - Component name in PascalCase (e.g., 'MyButton')
 * @param {string} componentKebab - Component name in kebab-case (e.g., 'my-button')
 * @param {object} options - Generation options
 * @param {boolean} options.lazyLoad - Enable lazy loading with Suspense
 * @returns {string} Complete App.jsx file content
 * 
 * @example
 * const appContent = generateAppJsx('Button', 'button', { lazyLoad: true });
 */
function generateAppJsx(componentName, componentKebab, options = {}) {
  const { lazyLoad = false } = options;
  
  // Validate component exists (optional - could add warning)
  if (!hasComponent(componentKebab)) {
    console.warn(`Warning: No template found for component '${componentKebab}'. Using default template.`);
  }
  
  // Get template content from separate file
  const templateContent = getComponentTemplate(componentKebab, componentName);
  
  // Get required React imports for this component
  const requiredImports = getComponentImports(componentKebab);
  
  // Use template content if available, otherwise use default
  const content = templateContent || `  return (
    <div className="App">
      <${componentName} />
    </div>
  );`;

  // Use lazy loading template if requested
  if (lazyLoad) {
    return createAppTemplateWithLazyLoading(componentName, requiredImports, content);
  }
  
  return createAppTemplate(componentName, requiredImports, content);
}

// ============================================================================
// ENTRY POINT GENERATORS
// ============================================================================

/**
 * Generate index.jsx content
 * 
 * Creates the main entry point file that renders the React app.
 * Uses React 18's createRoot API for better performance.
 * 
 * @returns {string} Complete index.jsx file content
 */
function generateIndexJs() {
  return `import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
`;
}

/**
 * Generate index.html content
 * 
 * Creates the HTML entry point with proper meta tags and root div.
 * 
 * @param {string} title - Page title to display in browser tab
 * @returns {string} Complete index.html file content
 */
function generateIndexHtml(title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.jsx"></script>
</body>
</html>
`;
}

// ============================================================================
// CONFIG FILE GENERATORS
// ============================================================================

/**
 * Generate package.json content
 * 
 * Creates a package.json with React, Vite, and all necessary scripts.
 * Configured as ES module with dev, build, and preview scripts.
 * 
 * @param {string} name - Project name (used as package name)
 * @returns {Object} Package.json configuration object
 * 
 * @example
 * const pkg = generatePackageJson('my-react-app');
 * // Returns complete package.json object
 */
function generatePackageJson(name) {
  return {
    name: name,
    version: "0.1.0",
    type: "module",
    private: true,
    dependencies: {
      react: REACT_VERSION,
      "react-dom": REACT_VERSION,
    },
    devDependencies: {
      "@vitejs/plugin-react": VITE_REACT_PLUGIN_VERSION,
      vite: VITE_VERSION,
    },
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    },
  };
}

/**
 * Generate .gitignore content
 * 
 * Creates a comprehensive .gitignore file for React/Vite projects.
 * Includes patterns for dependencies, build outputs, environment files, and editors.
 * 
 * @returns {string} Complete .gitignore file content
 */
function generateGitignore() {
  return `# Dependencies
node_modules/

# Production
dist/
build/

# Development
.DS_Store
*.log
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Editor
.vscode/
.idea/
*.swp
*.swo
`;
}

/**
 * Generate vite.config.js content
 * 
 * Creates a minimal Vite configuration file with React plugin enabled.
 * 
 * @param {boolean} withOptimization - Include code splitting optimizations
 * @returns {string} Complete vite.config.js file content
 */
function generateViteConfig(withOptimization = false) {
  if (!withOptimization) {
    return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
`;
  }
  
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
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
    // Enable code splitting
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
  },
});
`;
}

/**
 * Generate README.md content
 * 
 * Creates a comprehensive README with installation instructions,
 * available scripts, project structure, and customization guidance.
 * 
 * @param {string} name - Project name
 * @param {string} componentName - Component name in PascalCase
 * @returns {string} Complete README.md file content in Markdown format
 * 
 * @example
 * const readme = generateReadme('my-app', 'Button');
 */
function generateReadme(name, componentName) {
  return `# ${name}

React component project generated with create-template-html-css.

## Component: ${componentName}

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build

\`\`\`bash
npm run build
\`\`\`

Builds the app for production to the \`dist\` folder.

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
${name}/
├── src/
│   ├── components/
│   │   └── ${componentName}/
│   │       ├── ${componentName}.jsx
│   │       └── ${componentName}.css
│   ├── App.jsx
│   └── index.jsx
├── index.html
├── package.json
└── README.md
\`\`\`

## Customization

Feel free to modify the component files in \`src/components/${componentName}/\` to suit your needs.

## License

MIT
`;
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Public API exports for React template generation
 * 
 * All generator functions for creating a complete React project structure.
 * These functions are used by the CLI to generate project files.
 * 
 * @exports generateAppJsx - Generate App.jsx with component examples
 * @exports generateIndexJs - Generate index.jsx entry point
 * @exports generateIndexHtml - Generate index.html
 * @exports generatePackageJson - Generate package.json with dependencies
 * @exports generateGitignore - Generate .gitignore file
 * @exports generateViteConfig - Generate vite.config.js
 * @exports generateReadme - Generate README.md documentation
 * @exports createAppTemplateWithLazyLoading - Create lazy loaded App component
 */
export {
  generateAppJsx,
  generateIndexJs,
  generateIndexHtml,
  generatePackageJson,
  generateGitignore,
  generateViteConfig,
  generateReadme,
  createAppTemplateWithLazyLoading,
};
