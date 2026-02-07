/**
 * Format utilities for HTML, CSS, and JavaScript files
 * Uses Prettier if available, falls back to original content
 */

/**
 * Formats HTML content with prettier (optional - falls back to original if not available)
 * @param {string} htmlContent - The HTML content to format
 * @returns {Promise<string>} Formatted HTML content
 */
export async function formatHtml(htmlContent) {
  try {
    const prettier = await import("prettier");
    return await prettier.format(htmlContent, { parser: "html" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return htmlContent;
  }
}

/**
 * Formats CSS content with prettier (optional - falls back to original if not available)
 * @param {string} cssContent - The CSS content to format
 * @returns {Promise<string>} Formatted CSS content
 */
export async function formatCss(cssContent) {
  try {
    const prettier = await import("prettier");
    return await prettier.format(cssContent, { parser: "css" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return cssContent;
  }
}

/**
 * Formats JavaScript content with prettier (optional - falls back to original if not available)
 * @param {string} jsContent - The JavaScript content to format
 * @returns {Promise<string>} Formatted JavaScript content
 */
export async function formatJs(jsContent) {
  try {
    const prettier = await import("prettier");
    return await prettier.format(jsContent, { parser: "babel" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return jsContent;
  }
}
