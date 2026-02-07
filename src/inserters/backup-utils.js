/**
 * Backup utilities for file operations
 * Handles creating backups before modifying files
 */

import fs from "fs/promises";

/**
 * Creates a backup of the original file before insertion
 * @param {string} targetPath - Path to the original file
 * @returns {Promise<string>} Path to the backup file
 */
async function createBackup(targetPath) {
  const backupPath = `${targetPath}.backup`;
  const content = await fs.readFile(targetPath, "utf-8");
  await fs.writeFile(backupPath, content, "utf-8");
  return backupPath;
}

export { createBackup };
