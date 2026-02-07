/**
 * Component validation and security utilities
 */

import { VALID_COMPONENTS } from "../components-registry.js";
import { sanitizeForFilename } from "../utils/string-utils.js";

export { VALID_COMPONENTS };

/**
 * Sanitize filename to prevent path traversal
 * @param {string} filename - The filename to sanitize
 * @returns {string|null} Sanitized filename or null if invalid
 */
export function sanitizeFilename(filename) {
  // Check for path traversal attempts
  if (
    filename.includes("/") ||
    filename.includes("\\") ||
    filename === ".." ||
    filename.startsWith("../") ||
    filename.startsWith("..\\") ||
    filename.includes("/../") ||
    filename.includes("\\..\\")
  ) {
    return null;
  }

  // Additional validation: ensure name contains at least one alphanumeric character
  if (!filename || !/[a-zA-Z0-9]/.test(filename)) {
    return null;
  }

  // Remove any remaining dangerous characters
  const sanitized = filename.replace(/[<>:"|?*]/g, "").trim();

  // Final check: ensure not empty after sanitization
  if (!sanitized || sanitized.length === 0) {
    return null;
  }

  return sanitized;
}
