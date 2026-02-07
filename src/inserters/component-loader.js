/**
 * Component template loader
 * Loads HTML, CSS, and JavaScript files from template directories
 */

import {
  readTemplateHtml,
  readTemplateCss,
  readTemplateJs,
} from "../utils/template-loader.js";

/**
 * Loads component HTML template
 * @param {string} component - Component name
 * @returns {Promise<string>} HTML content
 */
async function loadComponentHtml(component) {
  return await readTemplateHtml(component);
}

/**
 * Loads component CSS template
 * Tries css/ subfolder first, falls back to root
 * @param {string} component - Component name
 * @returns {Promise<string>} CSS content
 */
async function loadComponentCss(component) {
  return await readTemplateCss(component);
}

/**
 * Loads component JavaScript template
 * Tries js/ subfolder first, falls back to root
 * @param {string} component - Component name
 * @returns {Promise<string|null>} JavaScript content or null if not found
 */
async function loadComponentJs(component) {
  return await readTemplateJs(component);
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
