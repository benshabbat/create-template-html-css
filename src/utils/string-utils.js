/**
 * String manipulation utilities
 * Helper functions for common string operations
 */

/**
 * Convert a string to a valid HTML/CSS ID
 * Converts to lowercase and replaces spaces with hyphens
 * @param {string} text - Text to convert
 * @returns {string} Valid ID string (e.g., "My Item" -> "my-item")
 */
export function textToId(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Sanitize a string for use as a filename
 * Removes invalid characters and trims whitespace
 * @param {string} filename - Filename to sanitize
 * @returns {string} Sanitized filename
 */
export function sanitizeForFilename(filename) {
  return filename.replace(/[<>:"|?*]/g, "").trim();
}

/**
 * Parse comma-separated list into array
 * Trims whitespace and filters empty items
 * @param {string} input - Comma-separated string
 * @returns {string[]} Array of trimmed non-empty strings
 */
export function parseCommaSeparated(input) {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

/**
 * Parse key:value pairs from comma-separated string
 * @param {string} input - Comma-separated "key:value" pairs
 * @returns {Array<{key: string, value: string}>} Array of parsed pairs
 */
export function parseKeyValuePairs(input) {
  return parseCommaSeparated(input)
    .map((pair) => {
      const [key, value] = pair.split(":").map((s) => s.trim());
      return key && value ? { key, value } : null;
    })
    .filter(Boolean);
}
