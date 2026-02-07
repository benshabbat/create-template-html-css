/**
 * Template loader utilities
 * Centralized functions for loading template files from the templates directory
 */

import fs from "fs/promises";
import path from "path";
import { getDirname } from "./path-utils.js";

const __dirname = getDirname(import.meta.url);

/**
 * Get the path to a template directory
 * @param {string} component - Component name
 * @returns {string} Absolute path to template directory
 */
export function getTemplatePath(component) {
  return path.join(__dirname, "..", "..", "templates", component);
}

/**
 * Read a template file from the templates directory
 * @param {string} component - Component name
 * @param {string} filename - File to read (e.g., "index.html", "style.css", "script.js")
 * @returns {Promise<string>} File content
 */
export async function readTemplateFile(component, filename) {
  const templatePath = getTemplatePath(component);
  return await fs.readFile(path.join(templatePath, filename), "utf-8");
}

/**
 * Read template HTML file
 * @param {string} component - Component name
 * @returns {Promise<string>} HTML content
 */
export async function readTemplateHtml(component) {
  return await readTemplateFile(component, "index.html");
}

/**
 * Read template CSS file
 * Tries css/style.css first, falls back to style.css
 * @param {string} component - Component name
 * @returns {Promise<string>} CSS content
 */
export async function readTemplateCss(component) {
  const templatePath = getTemplatePath(component);

  try {
    return await fs.readFile(
      path.join(templatePath, "css", "style.css"),
      "utf-8"
    );
  } catch {
    return await fs.readFile(path.join(templatePath, "style.css"), "utf-8");
  }
}

/**
 * Read template JavaScript file
 * Tries js/script.js first, falls back to script.js, returns null if not found
 * @param {string} component - Component name
 * @returns {Promise<string|null>} JavaScript content or null if not found
 */
export async function readTemplateJs(component) {
  const templatePath = getTemplatePath(component);

  try {
    return await fs.readFile(
      path.join(templatePath, "js", "script.js"),
      "utf-8"
    );
  } catch {
    try {
      return await fs.readFile(path.join(templatePath, "script.js"), "utf-8");
    } catch {
      return null; // No JavaScript file for this component
    }
  }
}

/**
 * Check if a template JavaScript file exists
 * @param {string} component - Component name
 * @returns {Promise<boolean>} True if JS file exists
 */
export async function hasTemplateJs(component) {
  const js = await readTemplateJs(component);
  return js !== null;
}
