/**
 * HTML manipulation utilities
 * Handles indentation and HTML parsing operations
 */

/**
 * Extracts the indentation string from a line
 * @param {string} line - Line to extract indentation from
 * @returns {string} The indentation string (spaces or tabs)
 */
function getIndentation(line) {
  const match = line.match(/^(\s+)/);
  return match ? match[1] : "";
}

/**
 * Determines the standard indentation used in HTML content
 * @param {string} htmlContent - HTML content to analyze
 * @returns {string} The detected indentation string (defaults to 2 spaces)
 */
function getHtmlIndentation(htmlContent) {
  const lines = htmlContent.split("\n");
  for (const line of lines) {
    if (line.trim() && line.startsWith("  ")) {
      return getIndentation(line);
    }
  }
  return "  "; // Default to 2 spaces
}

export { getIndentation, getHtmlIndentation };
