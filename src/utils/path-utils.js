/**
 * Path utilities for ES Modules
 * Provides __dirname functionality in ES Modules environment
 */

import { fileURLToPath } from "url";
import { dirname } from "path";

/**
 * Gets the directory name of a module (equivalent to __dirname in CommonJS)
 * @param {string} importMetaUrl - import.meta.url from the calling module
 * @returns {string} Directory path of the module
 * @example
 * import { getDirname } from './utils/path-utils.js';
 * const __dirname = getDirname(import.meta.url);
 */
export function getDirname(importMetaUrl) {
  const __filename = fileURLToPath(importMetaUrl);
  return dirname(__filename);
}

/**
 * Gets the file path of a module (equivalent to __filename in CommonJS)
 * @param {string} importMetaUrl - import.meta.url from the calling module
 * @returns {string} File path of the module
 * @example
 * import { getFilename } from './utils/path-utils.js';
 * const __filename = getFilename(import.meta.url);
 */
export function getFilename(importMetaUrl) {
  return fileURLToPath(importMetaUrl);
}
