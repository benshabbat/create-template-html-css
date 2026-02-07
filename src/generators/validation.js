/**
 * Component validation and security utilities
 */

// Security: Validate component name against whitelist
export const VALID_COMPONENTS = [
  "button",
  "card",
  "form",
  "navigation",
  "modal",
  "footer",
  "hero",
  "slider",
  "table",
  "spinner",
  "animated-card",
  "typing-effect",
  "fade-gallery",
  "grid-layout",
  "masonry-grid",
  "dashboard-grid",
  "flex-layout",
  "flex-cards",
  "flex-dashboard",
  "todo-list",
  "counter",
  "accordion",
  "tabs",
  "login",
  "register",
  "skeleton",
  "tic-tac-toe",
  "memory-game",
  "snake-game",
  "guess-number",
  "game-2048",
  "whack-a-mole",
  "simon-says",
  "rock-paper-scissors",
  "breakout",
  "tetris",
  "flappy-bird",
  "connect-four",
  "blackjack",
  "slot-machine",
  "dice-game",
  "pong",
];

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
