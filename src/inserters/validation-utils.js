/**
 * Component validation utilities for the insert command
 * Validates component names and HTML structure
 */

/**
 * List of all valid component names that can be inserted
 */
const VALID_COMPONENTS = [
  "accordion",
  "animated-card",
  "blackjack",
  "breakout",
  "button",
  "card",
  "connect-four",
  "counter",
  "dashboard-grid",
  "dice-game",
  "fade-gallery",
  "flappy-bird",
  "flex-cards",
  "flex-dashboard",
  "flex-layout",
  "footer",
  "form",
  "game-2048",
  "grid-layout",
  "guess-number",
  "hero",
  "login",
  "masonry-grid",
  "memory-game",
  "modal",
  "navigation",
  "pong",
  "register",
  "rock-paper-scissors",
  "simon-says",
  "skeleton",
  "slider",
  "slot-machine",
  "snake-game",
  "spinner",
  "table",
  "tabs",
  "tetris",
  "tic-tac-toe",
  "todo-list",
  "typing-effect",
  "whack-a-mole",
];

/**
 * Checks if a component has already been inserted in the HTML content
 * @param {string} htmlContent - HTML content to check
 * @param {string} component - Component name to look for
 * @returns {boolean} True if component is already inserted
 */
function isComponentAlreadyInserted(htmlContent, component) {
  const componentComment = `<!-- ${component.toUpperCase()} Component -->`;
  return htmlContent.includes(componentComment);
}

/**
 * Validates HTML file structure for required tags
 * @param {string} htmlContent - HTML content to validate
 * @returns {Object} Validation result with valid flag and errors array
 */
function validateHtmlStructure(htmlContent) {
  const errors = [];

  if (!htmlContent.includes("<head>") && !htmlContent.includes("<head ")) {
    errors.push("Missing <head> tag");
  }

  if (!htmlContent.includes("</head>")) {
    errors.push("Missing closing </head> tag");
  }

  if (!htmlContent.includes("<body>") && !htmlContent.includes("<body ")) {
    errors.push("Missing <body> tag");
  }

  if (!htmlContent.includes("</body>")) {
    errors.push("Missing closing </body> tag");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export { VALID_COMPONENTS, isComponentAlreadyInserted, validateHtmlStructure };
