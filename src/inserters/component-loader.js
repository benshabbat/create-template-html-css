/**
 * Component template loader
 * Loads HTML, CSS, and JavaScript files from template directories
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads component HTML template
 * @param {string} component - Component name
 * @returns {Promise<string>} HTML content
 */
async function loadComponentHtml(component) {
  const templateDir = path.join(__dirname, "..", "..", "templates", component);
  return await fs.readFile(path.join(templateDir, "index.html"), "utf-8");
}

/**
 * Loads component CSS template
 * Tries css/ subfolder first, falls back to root
 * @param {string} component - Component name
 * @returns {Promise<string>} CSS content
 */
async function loadComponentCss(component) {
  const templateDir = path.join(__dirname, "..", "..", "templates", component);

  try {
    return await fs.readFile(
      path.join(templateDir, "css", "style.css"),
      "utf-8",
    );
  } catch {
    return await fs.readFile(path.join(templateDir, "style.css"), "utf-8");
  }
}

/**
 * Loads component JavaScript template
 * Tries js/ subfolder first, falls back to root
 * @param {string} component - Component name
 * @returns {Promise<string|null>} JavaScript content or null if not found
 */
async function loadComponentJs(component) {
  const templateDir = path.join(__dirname, "..", "..", "templates", component);

  try {
    return await fs.readFile(
      path.join(templateDir, "js", "script.js"),
      "utf-8",
    );
  } catch {
    try {
      return await fs.readFile(path.join(templateDir, "script.js"), "utf-8");
    } catch {
      return null; // No JavaScript file for this component
    }
  }
}

/**
 * Extracts body content from component HTML
 * Removes script and style tags
 * @param {string} componentHtml - Full component HTML
 * @returns {string} Extracted body content
 */
function extractBodyContent(componentHtml) {
  const bodyMatch = componentHtml.match(/<body[^>]*>\s*([\s\S]*?)\s*<\/body>/i);
  if (!bodyMatch) {
    throw new Error("Invalid component template structure");
  }

  let componentBody = bodyMatch[1].trim();

  // Remove any script and style tags that might be in the body
  componentBody = componentBody
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .trim();

  return componentBody;
}

export {
  loadComponentHtml,
  loadComponentCss,
  loadComponentJs,
  extractBodyContent,
};
