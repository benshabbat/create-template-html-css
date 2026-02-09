import { 
  getComponentTemplate, 
  getComponentImports 
} from './react-component-templates.js';

// ============================================================================
// CONSTANTS
// ============================================================================

// Dependencies versions
const REACT_VERSION = "^18.2.0";
const VITE_VERSION = "^5.0.0";
const VITE_REACT_PLUGIN_VERSION = "^4.2.0";

// ============================================================================
// TEMPLATE HELPERS
// ============================================================================

/**
 * Create App.jsx template wrapper
 * @param {string} componentName - Component name (PascalCase)
 * @param {string} additionalImports - Additional imports from React (e.g., "useState, useEffect")
 * @param {string} content - JSX content inside App div
 * @returns {string} Complete App.jsx code
 */
function createAppTemplate(componentName, additionalImports = '', content) {
  const reactImports = additionalImports 
    ? `import React, { ${additionalImports} } from 'react';`
    : `import React from 'react';`;
    
  return `${reactImports}
import ${componentName} from './components/${componentName}/${componentName}';
import './components/${componentName}/${componentName}.css';

function App() {
${content}
}

export default App;`;
}

// ============================================================================
// APP.JSX GENERATOR
// ============================================================================

/**
 * Generate App.jsx content
 * @param {string} componentName - Component name in PascalCase
 * @param {string} componentKebab - Component name in kebab-case
 * @returns {string} Complete App.jsx file content
 */
function generateAppJsx(componentName, componentKebab) {
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

  return createAppTemplate(componentName, requiredImports, content);
}

// ============================================================================
// ENTRY POINT GENERATORS
// ============================================================================

/**
 * Generate index.jsx content
 */
function generateIndexJs() {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
}

/**
 * Generate index.html content
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
 */
function generateViteConfig() {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
`;
}

/**
 * Generate README.md content
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

export {
  generateAppJsx,
  generateIndexJs,
  generateIndexHtml,
  generatePackageJson,
  generateGitignore,
  generateViteConfig,
  generateReadme,
};
