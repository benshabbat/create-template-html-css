/**
 * File system utilities
 * Handles common file and directory operations with formatting
 */

import fs from "fs/promises";
import path from "path";
import { formatHtml, formatCss, formatJs } from "../format-utils.js";

/**
 * Creates a directory with all parent directories
 * @param {string} dirPath - Directory path to create
 * @returns {Promise<void>}
 */
export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

/**
 * Creates multiple directories
 * @param {string[]} dirPaths - Array of directory paths to create
 * @returns {Promise<void>}
 */
export async function ensureDirs(...dirPaths) {
  await Promise.all(dirPaths.map((dir) => ensureDir(dir)));
}

/**
 * Writes formatted HTML content to a file
 * @param {string} filePath - Path to the HTML file
 * @param {string} content - HTML content to write
 * @returns {Promise<void>}
 */
export async function writeHtmlFile(filePath, content) {
  const formatted = await formatHtml(content);
  await fs.writeFile(filePath, formatted);
}

/**
 * Writes formatted CSS content to a file
 * @param {string} filePath - Path to the CSS file
 * @param {string} content - CSS content to write
 * @returns {Promise<void>}
 */
export async function writeCssFile(filePath, content) {
  const formatted = await formatCss(content);
  await fs.writeFile(filePath, formatted);
}

/**
 * Writes formatted JavaScript content to a file
 * @param {string} filePath - Path to the JS file
 * @param {string} content - JavaScript content to write
 * @returns {Promise<void>}
 */
export async function writeJsFile(filePath, content) {
  const formatted = await formatJs(content);
  await fs.writeFile(filePath, formatted);
}

/**
 * Creates directory structure for component files
 * @param {string} basePath - Base output directory path
 * @returns {Promise<Object>} Object with outputDir, cssDir, jsDir paths
 */
export async function createComponentDirs(basePath) {
  const outputDir = basePath;
  const cssDir = path.join(basePath, "css");
  const jsDir = path.join(basePath, "js");

  await ensureDirs(outputDir, cssDir, jsDir);

  return { outputDir, cssDir, jsDir };
}

/**
 * Writes component files (HTML, CSS, JS) to their respective directories
 * @param {Object} options - File writing options
 * @param {string} options.outputDir - Output directory path
 * @param {string} options.cssDir - CSS directory path
 * @param {string} options.jsDir - JS directory path
 * @param {string} options.htmlContent - HTML content
 * @param {string} options.cssContent - CSS content
 * @param {string} [options.jsContent] - Optional JS content
 * @returns {Promise<void>}
 */
export async function writeComponentFiles(options) {
  const { outputDir, cssDir, jsDir, htmlContent, cssContent, jsContent } =
    options;

  await writeHtmlFile(path.join(outputDir, "index.html"), htmlContent);
  await writeCssFile(path.join(cssDir, "style.css"), cssContent);

  if (jsContent) {
    await writeJsFile(path.join(jsDir, "script.js"), jsContent);
  }
}
