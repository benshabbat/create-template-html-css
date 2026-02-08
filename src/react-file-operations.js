import { promises as fs } from "fs";
import path from "path";
import { getDirname } from "./utils/path-utils.js";
import { COLOR_SCHEMES } from "./generators/color-schemes.js";
import { applyCustomColors } from "./generators/color-utils.js";

const __dirname = getDirname(import.meta.url);

// ============================================================================
// CONSTANTS
// ============================================================================

// Default colors
const DEFAULT_PRIMARY_COLOR = "#667eea";
const DEFAULT_SECONDARY_COLOR = "#764ba2";

// ============================================================================
// PATH UTILITIES
// ============================================================================

/**
 * Get template path for React components
 * @param {string} component - Component name
 * @returns {string} Absolute path to template
 */
function getReactTemplatePath(component) {
  return path.join(__dirname, "..", "templates-react", component);
}

// ============================================================================
// FILE READING
// ============================================================================

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

// ============================================================================
// FILE WRITING
// ============================================================================

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

// ============================================================================
// PROJECT STRUCTURE
// ============================================================================

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

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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
  
  let finalPrimaryColor = primaryColor || DEFAULT_PRIMARY_COLOR;
  let finalSecondaryColor = secondaryColor || DEFAULT_SECONDARY_COLOR;

  if (colorScheme && COLOR_SCHEMES[colorScheme]) {
    const scheme = COLOR_SCHEMES[colorScheme];
    finalPrimaryColor = scheme.primary;
    finalSecondaryColor = scheme.secondary;
  }

  return { finalPrimaryColor, finalSecondaryColor };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  readComponentFiles,
  writeComponentFiles,
  createReactProjectStructure,
  toPascalCase,
  resolveColors,
};
