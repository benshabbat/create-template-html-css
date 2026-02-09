import { promises as fs } from "fs";
import path from "path";
import { sanitizeFilename } from "./generators/validation.js";
import {
  readComponentFiles,
  writeComponentFiles,
  createReactProjectStructure,
  toPascalCase,
  resolveColors,
} from "./react-file-operations.js";
import {
  generateAppJsx,
  generateIndexJs,
  generateIndexHtml,
  generatePackageJson,
  generateGitignore,
  generateViteConfig,
  generateReadme,
} from "./react-templates.js";

// ============================================================================
// CONSTANTS
// ============================================================================

// Valid React components
export const VALID_REACT_COMPONENTS = [
  "alert",
  "button",
  "card",
  "checkbox",
  "counter",
  "dropdown",
  "form",
  "input",
  "modal",
  "navbar",
  "todo-list",
  "tooltip",
];

// ============================================================================
// VALIDATORS
// ============================================================================

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

// ============================================================================
// MAIN EXPORT FUNCTIONS
// ============================================================================

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

// ============================================================================
// EXPORTS
// ============================================================================

export { generateReactTemplate, addReactComponentOnly };
