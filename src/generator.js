import { promises as fs } from "fs";
import path from "path";
import { formatHtml, formatCss, formatJs } from "./format-utils.js";
import { getDirname } from "./utils/path-utils.js";
import { COLOR_SCHEMES, getColorScheme } from "./generators/color-schemes.js";
import {
  applyCustomColors,
  addDarkModeStyles,
} from "./generators/color-utils.js";
import {
  filterButtonVariations,
  filterCardVariations,
  filterSpinnerVariations,
} from "./generators/component-filters.js";
import {
  generateNavigationItems,
  generateFormFields,
} from "./generators/html-generators.js";
import { VALID_COMPONENTS, sanitizeFilename } from "./generators/validation.js";

const __dirname = getDirname(import.meta.url);

/**
 * Generate a template component with all its files
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Path to generated directory
 */
async function generateTemplate(options) {
  const {
    component,
    name,
    includeJs,
    navItems,
    formFields,
    customFormFields,
    buttonVariations,
    selectedButtons,
    cardVariations,
    selectedCards,
    spinnerVariations,
    selectedSpinners,
    colorScheme,
    primaryColor,
    secondaryColor,
    darkMode,
  } = options;

  // If colorScheme is provided, use those colors
  let finalPrimaryColor = primaryColor;
  let finalSecondaryColor = secondaryColor;

  if (colorScheme && COLOR_SCHEMES[colorScheme]) {
    const scheme = COLOR_SCHEMES[colorScheme];
    finalPrimaryColor = scheme.primary;
    finalSecondaryColor = scheme.secondary;
  }

  // Security: Validate component name
  if (!VALID_COMPONENTS.includes(component)) {
    throw new Error(
      `Invalid component: ${component}. Must be one of: ${VALID_COMPONENTS.join(", ")}`
    );
  }

  // Security: Sanitize name to prevent path traversal
  const safeName = sanitizeFilename(name);
  if (!safeName || safeName.length === 0) {
    throw new Error("Invalid name provided");
  }

  // Create output directory structure
  const outputDir = path.join(process.cwd(), safeName);
  const cssDir = path.join(outputDir, "css");
  const jsDir = path.join(outputDir, "js");

  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(cssDir, { recursive: true });
  await fs.mkdir(jsDir, { recursive: true });

  // Get template content
  const templateDir = path.join(__dirname, "..", "templates", component);

  // Copy HTML file
  let htmlContent = await fs.readFile(
    path.join(templateDir, "index.html"),
    "utf-8"
  );

  // Replace placeholder name
  htmlContent = htmlContent.replace(/{{name}}/g, safeName);

  // Filter button variations
  if (component === "button") {
    htmlContent = filterButtonVariations(
      htmlContent,
      buttonVariations,
      selectedButtons
    );
  }

  // Filter card variations
  if (component === "card") {
    htmlContent = filterCardVariations(
      htmlContent,
      cardVariations,
      selectedCards
    );
  }

  // Filter spinner variations
  if (component === "spinner") {
    htmlContent = filterSpinnerVariations(
      htmlContent,
      spinnerVariations,
      selectedSpinners
    );
  }

  // Custom navigation items
  if (component === "navigation" && navItems) {
    htmlContent = generateNavigationItems(htmlContent, navItems);
  }

  // Custom form fields
  if (component === "form" && formFields) {
    htmlContent = generateFormFields(htmlContent, formFields, customFormFields);
  }

  // Add script tag if JavaScript is included (pointing to js/ folder)
  if (includeJs) {
    // Insert script tag before closing </body> tag
    htmlContent = htmlContent.replace(
      "</body>",
      '    <script src="js/script.js"></script>\n</body>'
    );
  }

  // Update CSS link to point to css/ folder
  htmlContent = htmlContent.replace(
    /<link[^>]*href="style\.css"[^>]*>/g,
    '    <link rel="stylesheet" href="css/style.css">'
  );

  // Format HTML before writing
  htmlContent = await formatHtml(htmlContent);

  await fs.writeFile(path.join(outputDir, "index.html"), htmlContent);

  // Copy CSS file to css/ folder
  let cssContent = await fs.readFile(
    path.join(templateDir, "style.css"),
    "utf-8"
  );

  // Apply custom colors if provided (either from colorScheme or direct colors)
  if (finalPrimaryColor || finalSecondaryColor) {
    cssContent = applyCustomColors(
      cssContent,
      finalPrimaryColor,
      finalSecondaryColor
    );
  }

  // Add dark mode support if requested
  if (darkMode) {
    cssContent = addDarkModeStyles(cssContent);
  }

  const formattedCss = await formatCss(cssContent);
  await fs.writeFile(path.join(cssDir, "style.css"), formattedCss);

  // Copy JS file to js/ folder if requested
  if (includeJs) {
    try {
      const jsContent = await fs.readFile(
        path.join(templateDir, "script.js"),
        "utf-8"
      );
      const formattedJs = await formatJs(jsContent);
      await fs.writeFile(path.join(jsDir, "script.js"), formattedJs);
    } catch (error) {
      // If no JS template exists, create a basic one
      const basicJs = await formatJs("// Add your JavaScript here\n");
      await fs.writeFile(path.join(jsDir, "script.js"), basicJs);
    }
  }

  return outputDir;
}

export { generateTemplate, COLOR_SCHEMES, getColorScheme };
