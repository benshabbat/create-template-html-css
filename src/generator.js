const fs = require("fs").promises;
const path = require("path");

/**
 * Formats HTML content with prettier
 */
async function formatHtml(htmlContent) {
  const prettier = require("prettier");
  try {
    return await prettier.format(htmlContent, { parser: "html" });
  } catch (error) {
    return htmlContent;
  }
}

/**
 * Formats CSS content with prettier
 */
async function formatCss(cssContent) {
  const prettier = require("prettier");
  try {
    return await prettier.format(cssContent, { parser: "css" });
  } catch (error) {
    return cssContent;
  }
}

/**
 * Formats JavaScript content with prettier
 */
async function formatJs(jsContent) {
  const prettier = require("prettier");
  try {
    return await prettier.format(jsContent, { parser: "babel" });
  } catch (error) {
    return jsContent;
  }
}

// Security: Validate component name against whitelist
const VALID_COMPONENTS = [
  "button",
  "card",
  "form",
  "navigation",
  "modal",
  "footer",
  "hero",
  "slider",
  "table",
  "spinner",
  "animated-card",
  "typing-effect",
  "fade-gallery",
  "grid-layout",
  "masonry-grid",
  "dashboard-grid",
  "flex-layout",
  "flex-cards",
  "flex-dashboard",
  "todo-list",
  "counter",
  "accordion",
  "tabs",
];

// Security: Sanitize filename to prevent path traversal
function sanitizeFilename(filename) {
  // Remove any path separators and parent directory references
  const sanitized = filename.replace(/[\/\\]/g, "").replace(/\.\.+/g, ".");

  // Additional validation: ensure name contains at least one alphanumeric character
  if (!sanitized || !/[a-zA-Z0-9]/.test(sanitized)) {
    return null;
  }

  // Remove any remaining dangerous characters
  return sanitized.replace(/[<>:"|?*]/g, "").trim();
}

async function generateTemplate(options) {
  const { component, name, includeJs } = options;

  // Security: Validate component name
  if (!VALID_COMPONENTS.includes(component)) {
    throw new Error(
      `Invalid component: ${component}. Must be one of: ${VALID_COMPONENTS.join(", ")}`,
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
    "utf-8",
  );

  // Replace placeholder name
  htmlContent = htmlContent.replace(/{{name}}/g, safeName);

  // Add script tag if JavaScript is included (pointing to js/ folder)
  if (includeJs) {
    // Insert script tag before closing </body> tag
    htmlContent = htmlContent.replace(
      "</body>",
      '    <script src="js/script.js"></script>\n</body>',
    );
  }

  // Update CSS link to point to css/ folder
  htmlContent = htmlContent.replace(
    /<link[^>]*href="style\.css"[^>]*>/g,
    '    <link rel="stylesheet" href="css/style.css">',
  );

  // Format HTML before writing
  htmlContent = await formatHtml(htmlContent);

  await fs.writeFile(path.join(outputDir, "index.html"), htmlContent);

  // Copy CSS file to css/ folder
  const cssContent = await fs.readFile(
    path.join(templateDir, "style.css"),
    "utf-8",
  );
  const formattedCss = await formatCss(cssContent);
  await fs.writeFile(path.join(cssDir, "style.css"), formattedCss);

  // Copy JS file to js/ folder if requested
  if (includeJs) {
    try {
      const jsContent = await fs.readFile(
        path.join(templateDir, "script.js"),
        "utf-8",
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

module.exports = { generateTemplate };
