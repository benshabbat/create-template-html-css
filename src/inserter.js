const fs = require("fs").promises;
const path = require("path");

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

/**
 * Extracts indentation from a line
 */
function getIndentation(line) {
  const match = line.match(/^(\s*)/);
  return match ? match[1] : "";
}

/**
 * Checks if a component is already inserted in the HTML
 */
function isComponentAlreadyInserted(htmlContent, component) {
  const commentPattern = new RegExp(
    `<!-- ${component.toUpperCase()} Component -->`,
    "i",
  );
  return commentPattern.test(htmlContent);
}

/**
 * Formats HTML content with prettier (optional - falls back to original if not available)
 */
async function formatHtml(htmlContent) {
  try {
    const prettier = require("prettier");
    return await prettier.format(htmlContent, { parser: "html" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return htmlContent;
  }
}

/**
 * Formats CSS content with prettier (optional - falls back to original if not available)
 */
async function formatCss(cssContent) {
  try {
    const prettier = require("prettier");
    return await prettier.format(cssContent, { parser: "css" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return cssContent;
  }
}

/**
 * Formats JavaScript content with prettier (optional - falls back to original if not available)
 */
async function formatJs(jsContent) {
  try {
    const prettier = require("prettier");
    return await prettier.format(jsContent, { parser: "babel" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return jsContent;
  }
}

/**
 * Gets the indentation level used in an HTML file
 */
function getHtmlIndentation(htmlContent) {
  // Look for any indented line to determine the standard indentation
  const match = htmlContent.match(/\n(\s+)\S/);
  return match ? match[1] : "    "; // default to 4 spaces
}

/**
 * Validates that HTML file has proper structure
 * @param {string} htmlContent - The HTML content to validate
 * @returns {Object} Object with valid property and any errors
 */
function validateHtmlStructure(htmlContent) {
  const errors = [];

  if (!htmlContent.includes("<!DOCTYPE")) {
    errors.push("Missing DOCTYPE declaration");
  }

  if (!htmlContent.includes("<html")) {
    errors.push("Missing <html> tag");
  }

  if (!htmlContent.includes("<head>") && !htmlContent.includes("<head ")) {
    errors.push("Missing <head> tag");
  }

  if (!htmlContent.includes("</head>")) {
    errors.push("Missing closing </head> tag");
  }

  if (!htmlContent.includes("<body>") && !htmlContent.includes("<body ")) {
    errors.push("Missing <body> tag");
  }

  if (!htmlContent.includes("</body>")) {
    errors.push("Missing closing </body> tag");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Creates a backup of the original file before insertion
 * @param {string} targetPath - Path to the original file
 * @returns {Promise<string>} Path to the backup file
 */
async function createBackup(targetPath) {
  const backupPath = `${targetPath}.backup`;
  const content = await fs.readFile(targetPath, "utf-8");
  await fs.writeFile(backupPath, content, "utf-8");
  return backupPath;
}

async function insertComponent(options) {
  const {
    component,
    targetFile,
    styleMode,
    scriptMode,
    createBackup: shouldBackup = false,
  } = options;

  // Security: Validate component name
  if (!VALID_COMPONENTS.includes(component)) {
    throw new Error(
      `Invalid component: ${component}. Must be one of: ${VALID_COMPONENTS.join(", ")}`,
    );
  }

  // Check if target file exists
  const targetPath = path.resolve(process.cwd(), targetFile);
  try {
    await fs.access(targetPath);
  } catch {
    throw new Error(`Target file not found: ${targetFile}`);
  }

  // Read target HTML file
  let htmlContent = await fs.readFile(targetPath, "utf-8");

  // Validate HTML structure
  const validation = validateHtmlStructure(htmlContent);
  if (!validation.valid) {
    throw new Error(
      `Invalid HTML structure:\n  - ${validation.errors.join("\n  - ")}`,
    );
  }

  // Check if component is already inserted
  if (isComponentAlreadyInserted(htmlContent, component)) {
    throw new Error(
      `Component "${component}" is already inserted in this file`,
    );
  }

  // Create backup if requested
  let backupPath = null;
  if (shouldBackup) {
    backupPath = await createBackup(targetPath);
  }

  if (!htmlContent.includes("</head>")) {
    throw new Error("Target HTML file does not have a </head> tag");
  }

  // Get component templates
  const templateDir = path.join(__dirname, "..", "templates", component);
  const componentHtml = await fs.readFile(
    path.join(templateDir, "index.html"),
    "utf-8",
  );

  // Try to read CSS from css/ subfolder, fall back to root
  let componentCss;
  try {
    componentCss = await fs.readFile(
      path.join(templateDir, "css", "style.css"),
      "utf-8",
    );
  } catch {
    componentCss = await fs.readFile(
      path.join(templateDir, "style.css"),
      "utf-8",
    );
  }

  // Extract component body content (only the inner content, not the body tags)
  const bodyMatch = componentHtml.match(/<body[^>]*>\s*([\s\S]*?)\s*<\/body>/i);
  if (!bodyMatch) {
    throw new Error("Invalid component template structure");
  }

  let componentBody = bodyMatch[1].trim();

  // Remove any script and style tags that might be in the body
  componentBody = componentBody
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .trim();

  // Get indentation used in the HTML file
  const baseIndent = getHtmlIndentation(htmlContent);

  // Normalize component body indentation
  const lines = componentBody
    .split("\n")
    .map((line) => {
      if (line.trim() === "") return "";
      return baseIndent + line.trim();
    })
    .join("\n");
  componentBody = lines;

  // Insert component HTML before closing </body> tag
  htmlContent = htmlContent.replace(
    "</body>",
    `${baseIndent}<!-- ${component.toUpperCase()} Component -->\n${componentBody}\n\n</body>`,
  );

  // Handle CSS
  if (styleMode === "inline") {
    // Normalize CSS indentation
    const normalizedCss = componentCss
      .split("\n")
      .map((line) => {
        if (line.trim() === "") return "";
        return baseIndent + "    " + line.trim();
      })
      .join("\n");

    htmlContent = htmlContent.replace(
      "</head>",
      `${baseIndent}<style id="${component}-styles">\n${baseIndent}    /* ${component.toUpperCase()} Component Styles */\n${normalizedCss}\n${baseIndent}</style>\n</head>`,
    );
  } else if (styleMode === "separate") {
    // Create css directory if needed
    const cssDir = path.join(path.dirname(targetPath), "css");
    await fs.mkdir(cssDir, { recursive: true });

    // Create separate CSS file in css/ folder
    const cssFileName = `${component}-component.css`;
    const cssPath = path.join(cssDir, cssFileName);
    const formattedCss = await formatCss(
      `/* ${component.toUpperCase()} Component Styles */\n\n${componentCss}`,
    );
    await fs.writeFile(cssPath, formattedCss);

    // Add link to CSS file
    htmlContent = htmlContent.replace(
      "</head>",
      `${baseIndent}<link rel="stylesheet" href="css/${cssFileName}">\n</head>`,
    );
  }

  // Handle JavaScript
  try {
    // Try to read JS from js/ subfolder, fall back to root
    let componentJs;
    try {
      componentJs = await fs.readFile(
        path.join(templateDir, "js", "script.js"),
        "utf-8",
      );
    } catch {
      componentJs = await fs.readFile(
        path.join(templateDir, "script.js"),
        "utf-8",
      );
    }

    if (scriptMode === "inline") {
      // Normalize JS indentation
      const normalizedJs = componentJs
        .split("\n")
        .map((line) => {
          if (line.trim() === "") return "";
          return baseIndent + "    " + line.trim();
        })
        .join("\n");

      htmlContent = htmlContent.replace(
        "</body>",
        `${baseIndent}<script id="${component}-script">\n${baseIndent}    // ${component.toUpperCase()} Component Script\n${normalizedJs}\n${baseIndent}</script>\n</body>`,
      );
    } else if (scriptMode === "separate") {
      // Create js directory if needed
      const jsDir = path.join(path.dirname(targetPath), "js");
      await fs.mkdir(jsDir, { recursive: true });

      // Create separate JS file in js/ folder
      const jsFileName = `${component}-component.js`;
      const jsPath = path.join(jsDir, jsFileName);
      const formattedJs = await formatJs(
        `// ${component.toUpperCase()} Component Script\n\n${componentJs}`,
      );
      await fs.writeFile(jsPath, formattedJs);

      // Add script tag
      htmlContent = htmlContent.replace(
        "</body>",
        `${baseIndent}<script src="js/${jsFileName}" id="${component}-script"></script>\n</body>`,
      );
    }
  } catch (error) {
    // No JavaScript file for this component, skip
  }

  // Write updated HTML with prettier formatting
  const formattedHtml = await formatHtml(htmlContent);
  await fs.writeFile(targetPath, formattedHtml);

  return {
    targetFile: targetPath,
    component,
    styleMode,
    scriptMode,
    backupPath: backupPath || null,
    success: true,
  };
}

module.exports = { insertComponent, validateHtmlStructure, createBackup };
