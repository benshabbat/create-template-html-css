/**
 * Component insertion utilities
 * Inserts components into existing HTML files
 */

import fs from "fs/promises";
import path from "path";
import { ensureDir, writeCssFile, writeJsFile, writeHtmlFile } from "./utils/file-utils.js";
import {
  VALID_COMPONENTS,
  isComponentAlreadyInserted,
  validateHtmlStructure,
} from "./inserters/validation-utils.js";
import { getHtmlIndentation } from "./inserters/html-utils.js";
import { createBackup } from "./inserters/backup-utils.js";
import {
  loadComponentHtml,
  loadComponentCss,
  loadComponentJs,
  extractBodyContent,
} from "./inserters/component-loader.js";
import {
  normalizeIndentation,
  createInlineStyleTag,
  createInlineScriptTag,
  createStyleLink,
  createScriptTag,
  createComponentInsertion,
} from "./inserters/indentation-utils.js";

/**
 * Inserts a component into an existing HTML file
 * @param {Object} options - Insertion options
 * @param {string} options.component - Component name to insert
 * @param {string} options.targetFile - Target HTML file path
 * @param {string} options.styleMode - Style insertion mode ('inline' or 'separate')
 * @param {string} options.scriptMode - Script insertion mode ('inline' or 'separate')
 * @param {boolean} options.createBackup - Whether to create a backup before insertion
 * @returns {Promise<Object>} Insertion result with success status and paths
 */
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

  // Security: Prevent path traversal attacks
  const targetPath = path.resolve(process.cwd(), targetFile);
  const cwd = process.cwd();
  if (!targetPath.startsWith(cwd)) {
    throw new Error(`Security error: Cannot access files outside current directory`);
  }

  // Check if target file exists
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

  // Load component templates
  const componentHtml = await loadComponentHtml(component);
  const componentCss = await loadComponentCss(component);

  // Extract component body content
  let componentBody = extractBodyContent(componentHtml);

  // Get indentation used in the HTML file
  const baseIndent = getHtmlIndentation(htmlContent);

  // Normalize component body indentation
  componentBody = normalizeIndentation(componentBody, baseIndent);

  // Insert component HTML before closing </body> tag
  htmlContent = htmlContent.replace(
    "</body>",
    createComponentInsertion(component, componentBody, baseIndent),
  );

  // Handle CSS
  if (styleMode === "inline") {
    htmlContent = htmlContent.replace(
      "</head>",
      createInlineStyleTag(component, componentCss, baseIndent),
    );
  } else if (styleMode === "separate") {
    // Create css directory if needed
    const cssDir = path.join(path.dirname(targetPath), "css");
    await ensureDir(cssDir);

    // Create separate CSS file in css/ folder
    const cssFileName = `${component}-component.css`;
    const cssPath = path.join(cssDir, cssFileName);
    const cssWithComment = `/* ${component.toUpperCase()} Component Styles */\n\n${componentCss}`;
    await writeCssFile(cssPath, cssWithComment);

    // Add link to CSS file
    htmlContent = htmlContent.replace(
      "</head>",
      createStyleLink(cssFileName, baseIndent),
    );
  }

  // Handle JavaScript
  const componentJs = await loadComponentJs(component);

  if (componentJs) {
    if (scriptMode === "inline") {
      htmlContent = htmlContent.replace(
        "</body>",
        createInlineScriptTag(component, componentJs, baseIndent),
      );
    } else if (scriptMode === "separate") {
      // Create js directory if needed
      const jsDir = path.join(path.dirname(targetPath), "js");
      await ensureDir(jsDir);

      // Create separate JS file in js/ folder
      const jsFileName = `${component}-component.js`;
      const jsPath = path.join(jsDir, jsFileName);
      const jsWithComment = `// ${component.toUpperCase()} Component Script\n\n${componentJs}`;
      await writeJsFile(jsPath, jsWithComment);

      // Add script tag
      htmlContent = htmlContent.replace(
        "</body>",
        createScriptTag(component, jsFileName, baseIndent),
      );
    }
  }

  // Write updated HTML with prettier formatting
  await writeHtmlFile(targetPath, htmlContent);

  return {
    targetFile: targetPath,
    component,
    styleMode,
    scriptMode,
    backupPath: backupPath || null,
    success: true,
  };
}

export { insertComponent, validateHtmlStructure, createBackup };
