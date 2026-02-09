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
 */
function generateAppJsx(componentName, componentKebab) {
  // Component-specific content (inside App function)
  const componentContent = {
    alert: `  return (
    <div className="App" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Alert Component Examples</h1>
      
      <${componentName} type="success" title="Success!">
        Your changes have been saved successfully.
      </${componentName}>
      
      <${componentName} type="error" title="Error">
        Something went wrong. Please try again.
      </${componentName}>
      
      <${componentName} type="warning" title="Warning">
        This action cannot be undone.
      </${componentName}>
      
      <${componentName} type="info" title="Information">
        Check out our new features!
      </${componentName}>
    </div>
  );`,

    button: `  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App" style={{ 
      padding: '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>${componentName} Component Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#666' }}>Variants:</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <${componentName} variant="primary" onClick={handleClick}>Primary</${componentName}>
          <${componentName} variant="secondary" onClick={handleClick}>Secondary</${componentName}>
          <${componentName} variant="success" onClick={handleClick}>Success</${componentName}>
          <${componentName} variant="danger" onClick={handleClick}>Danger</${componentName}>
          <${componentName} variant="outline" onClick={handleClick}>Outline</${componentName}>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#666' }}>Sizes:</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <${componentName} size="small" onClick={handleClick}>Small</${componentName}>
          <${componentName} size="medium" onClick={handleClick}>Medium</${componentName}>
          <${componentName} size="large" onClick={handleClick}>Large</${componentName}>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#666' }}>States:</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <${componentName} onClick={handleClick}>Normal</${componentName}>
          <${componentName} disabled>Disabled</${componentName}>
        </div>
      </div>
    </div>
  );`,
    
    card: `  return (
    <div className="App" style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '30px' }}>${componentName} Component</h1>
      <${componentName}
        title="Example Card"
        description="This is an example card component with a beautiful design"
        image="https://via.placeholder.com/400x200"
      />
    </div>
  );`,
    
    counter: `  return (
    <div className="App" style={{ padding: '40px' }}>
      <h1>Counter Component</h1>
      <${componentName} 
        initialValue={0}
        min={0}
        max={100}
        onChange={(value) => console.log('Count:', value)}
      />
    </div>
  );`,
    
    form: `  return (
    <div className="App" style={{ padding: '40px' }}>
      <${componentName}
        title="Contact Form"
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
        ]}
        onSubmit={(data) => console.log('Form data:', data)}
      />
    </div>
  );`,

    input: `  const [value, setValue] = useState('');

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Input Component Examples</h1>
      
      <${componentName}
        label="Name"
        placeholder="Enter your name"
        required
      />
      
      <${componentName}
        type="email"
        label="Email"
        placeholder="your@email.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      
      <${componentName}
        label="Search"
        placeholder="Search..."
        icon="🔍"
      />
    </div>
  );`,

    navbar: `  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div>
      <${componentName}
        logo="MyApp"
        links={links}
        onLinkClick={(link) => console.log('Clicked:', link.label)}
      />
      <div style={{ padding: '40px' }}>
        <h1>Scroll down to see sticky navbar</h1>
        <div style={{ height: '2000px' }}>
          <p>Content goes here...</p>
        </div>
      </div>
    </div>
  );`,
    
    "todo-list": `  return (
    <div className="App" style={{ padding: '40px' }}>
      <h1>Todo List</h1>
      <${componentName} />
    </div>
  );`,
  };

  // Components that need useState import
  if (componentKebab === 'modal') {
    const content = `  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App" style={{ padding: '40px' }}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <${componentName}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content</p>
      </${componentName}>
    </div>
  );`;
    return createAppTemplate(componentName, 'useState', content);
  }

  // Input component already has useState in its template
  if (componentKebab === 'input') {
    return createAppTemplate(componentName, 'useState', componentContent[componentKebab]);
  }

  // Use component-specific content if available
  const content = componentContent[componentKebab] || `  return (
    <div className="App">
      <${componentName} />
    </div>
  );`;

  return createAppTemplate(componentName, '', content);
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
