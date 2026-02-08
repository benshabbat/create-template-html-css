import { promises as fs } from "fs";
import path from "path";
import { getDirname } from "./utils/path-utils.js";
import { COLOR_SCHEMES } from "./generators/color-schemes.js";
import { applyCustomColors } from "./generators/color-utils.js";
import { sanitizeFilename } from "./generators/validation.js";

const __dirname = getDirname(import.meta.url);

// Valid React components
export const VALID_REACT_COMPONENTS = [
  "button",
  "card",
  "counter",
  "form",
  "modal",
  "todo-list",
];

/**
 * Get template path for React components
 * @param {string} component - Component name
 * @returns {string} Absolute path to template
 */
function getReactTemplatePath(component) {
  return path.join(__dirname, "..", "templates-react", component);
}

/**
 * Read React component file (.jsx)
 * @param {string} component - Component name
 * @param {string} filename - File name
 * @returns {Promise<string>} File content
 */
async function readReactFile(component, filename) {
  const templatePath = getReactTemplatePath(component);
  const filePath = path.join(templatePath, filename);
  
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

/**
 * Convert component name to PascalCase
 * @param {string} name - Component name (kebab-case)
 * @returns {string} PascalCase name
 */
function toPascalCase(name) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Resolve color scheme to actual colors
 * @param {Object} options - Color options
 * @returns {Object} Resolved colors
 */
function resolveColors(options) {
  const { colorScheme, primaryColor, secondaryColor } = options;
  
  let finalPrimaryColor = primaryColor || "#667eea";
  let finalSecondaryColor = secondaryColor || "#764ba2";

  if (colorScheme && COLOR_SCHEMES[colorScheme]) {
    const scheme = COLOR_SCHEMES[colorScheme];
    finalPrimaryColor = scheme.primary;
    finalSecondaryColor = scheme.secondary;
  }

  return { finalPrimaryColor, finalSecondaryColor };
}

/**
 * Validate React component name
 * @param {string} component - Component name to validate
 * @throws {Error} If component is invalid
 */
function validateComponent(component) {
  if (!VALID_REACT_COMPONENTS.includes(component)) {
    throw new Error(
      `Invalid React component: ${component}. Must be one of: ${VALID_REACT_COMPONENTS.join(", ")}`
    );
  }
}

/**
 * Read and process component template files
 * @param {string} component - Component name (kebab-case)
 * @param {string} componentName - Component name (PascalCase)
 * @param {string} primaryColor - Primary color
 * @param {string} secondaryColor - Secondary color
 * @returns {Promise<Object>} Processed JSX and CSS content
 */
async function readComponentFiles(component, componentName, primaryColor, secondaryColor) {
  const jsxContent = await readReactFile(component, `${componentName}.jsx`);
  let cssContent = await readReactFile(component, `${componentName}.css`);

  if (!jsxContent) {
    throw new Error(`React template not found for component: ${component}`);
  }

  // Apply custom colors to CSS
  if (cssContent && (primaryColor || secondaryColor)) {
    cssContent = applyCustomColors(cssContent, primaryColor, secondaryColor);
  }

  return { jsxContent, cssContent };
}

/**
 * Write component files to directory
 * @param {string} componentDir - Component directory path
 * @param {string} componentName - Component name (PascalCase)
 * @param {string} jsxContent - JSX file content
 * @param {string} cssContent - CSS file content
 */
async function writeComponentFiles(componentDir, componentName, jsxContent, cssContent) {
  await fs.writeFile(
    path.join(componentDir, `${componentName}.jsx`),
    jsxContent,
    "utf-8"
  );

  if (cssContent) {
    await fs.writeFile(
      path.join(componentDir, `${componentName}.css`),
      cssContent,
      "utf-8"
    );
  }
}

/**
 * Create React project structure
 * @param {string} outputDir - Output directory path
 * @returns {Promise<Object>} Directory paths
 */
async function createReactProjectStructure(outputDir) {
  await fs.mkdir(outputDir, { recursive: true });
  
  const srcDir = path.join(outputDir, "src");
  await fs.mkdir(srcDir, { recursive: true });
  
  const componentsDir = path.join(srcDir, "components");
  await fs.mkdir(componentsDir, { recursive: true });

  return { outputDir, srcDir, componentsDir };
}

/**
 * Generate React component files
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Path to generated directory
 */
async function generateReactTemplate(options) {
  const {
    component,
    name,
    colorScheme,
    primaryColor,
    secondaryColor,
    darkMode,
  } = options;

  // Resolve colors
  const { finalPrimaryColor, finalSecondaryColor } = resolveColors({
    colorScheme,
    primaryColor,
    secondaryColor,
  });

  // Security: Validate component name
  validateComponent(component);

  // Security: Sanitize name to prevent path traversal
  const safeName = sanitizeFilename(name);
  if (!safeName || safeName.length === 0) {
    throw new Error("Invalid name provided");
  }

  // Create project structure
  const outputDir = path.join(process.cwd(), safeName);
  const { srcDir, componentsDir } = await createReactProjectStructure(outputDir);

  // Get component name in PascalCase
  const componentName = toPascalCase(component);
  const componentDir = path.join(componentsDir, componentName);
  await fs.mkdir(componentDir, { recursive: true });

  // Read and process component files
  const { jsxContent, cssContent } = await readComponentFiles(
    component,
    componentName,
    finalPrimaryColor,
    finalSecondaryColor
  );

  // Write component files
  await writeComponentFiles(componentDir, componentName, jsxContent, cssContent);

  // Create App.jsx
  const appContent = generateAppJsx(componentName, component);
  await fs.writeFile(path.join(srcDir, "App.jsx"), appContent, "utf-8");

  // Create index.jsx
  const indexContent = generateIndexJs();
  await fs.writeFile(path.join(srcDir, "index.jsx"), indexContent, "utf-8");

  // Create index.html
  const htmlContent = generateIndexHtml(safeName);
  await fs.writeFile(path.join(outputDir, "index.html"), htmlContent, "utf-8");

  // Create package.json
  const packageJson = generatePackageJson(safeName);
  await fs.writeFile(
    path.join(outputDir, "package.json"),
    JSON.stringify(packageJson, null, 2),
    "utf-8"
  );

  // Create .gitignore
  const gitignoreContent = generateGitignore();
  await fs.writeFile(path.join(outputDir, ".gitignore"), gitignoreContent, "utf-8");

  // Create vite.config.js
  const viteConfig = generateViteConfig();
  await fs.writeFile(path.join(outputDir, "vite.config.js"), viteConfig, "utf-8");

  // Create README.md
  const readmeContent = generateReadme(safeName, componentName);
  await fs.writeFile(path.join(outputDir, "README.md"), readmeContent, "utf-8");

  return outputDir;
}

/**
 * Add React component only (without full project structure)
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Path to generated component directory
 */
async function addReactComponentOnly(options) {
  const {
    component,
    outputDir = process.cwd(),
    colorScheme,
    primaryColor,
    secondaryColor,
  } = options;

  // Resolve colors
  const { finalPrimaryColor, finalSecondaryColor } = resolveColors({
    colorScheme,
    primaryColor,
    secondaryColor,
  });

  // Security: Validate component name
  validateComponent(component);

  // Get component name in PascalCase
  const componentName = toPascalCase(component);
  const componentDir = path.join(outputDir, componentName);
  
  // Check if component already exists
  try {
    await fs.access(componentDir);
    throw new Error(`Component directory already exists: ${componentDir}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await fs.mkdir(componentDir, { recursive: true });

  // Read and process component files
  const { jsxContent, cssContent } = await readComponentFiles(
    component,
    componentName,
    finalPrimaryColor,
    finalSecondaryColor
  );

  // Write component files
  await writeComponentFiles(componentDir, componentName, jsxContent, cssContent);

  console.log(`✓ Created ${componentName} component in ${componentDir}`);
  console.log(`\nFiles created:`);
  console.log(`  - ${componentName}.jsx`);
  console.log(`  - ${componentName}.css`);
  console.log(`\nUsage example:`);
  console.log(`  import ${componentName} from './${componentName}/${componentName}';`);
  console.log(`  import './${componentName}/${componentName}.css';`);

  return componentDir;
}

/**
 * Generate App.jsx content
 */
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

/**
 * Generate App.jsx content
 */
function generateAppJsx(componentName, componentKebab) {
  // Component-specific content (inside App function)
  const componentContent = {
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
    
    "todo-list": `  return (
    <div className="App" style={{ padding: '40px' }}>
      <h1>Todo List</h1>
      <${componentName} />
    </div>
  );`,
  };

  // Modal needs useState import
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

  // Use component-specific content if available
  const content = componentContent[componentKebab] || `  return (
    <div className="App">
      <${componentName} />
    </div>
  );`;

  return createAppTemplate(componentName, '', content);
}

/**
 * Generate index.js content
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
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    },
    devDependencies: {
      "@vitejs/plugin-react": "^4.2.0",
      vite: "^5.0.0",
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

export { generateReactTemplate, addReactComponentOnly };
