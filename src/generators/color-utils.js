/**
 * Color utility functions for CSS styling
 */

/**
 * Convert hex color to RGB values
 * @param {string} hex - Hex color code (e.g., "#FF6B6B")
 * @returns {string} RGB values as string (e.g., "255, 107, 107")
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  return "102, 126, 234"; // fallback to default primary
}

/**
 * Apply custom colors to CSS content using CSS variables
 * @param {string} cssContent - Original CSS content
 * @param {string} primaryColor - Primary color hex code
 * @param {string} secondaryColor - Secondary color hex code
 * @returns {string} Modified CSS with custom colors
 */
export function applyCustomColors(cssContent, primaryColor, secondaryColor) {
  if (!primaryColor && !secondaryColor) {
    return cssContent;
  }

  // Create CSS variable overrides
  let colorVariables = ":root {\n";

  if (primaryColor) {
    colorVariables += `  --primary-color: ${primaryColor};\n`;
    // Also add as root variable that can override gradients
    colorVariables += `  --primary-rgb: ${hexToRgb(primaryColor)};\n`;
  }

  if (secondaryColor) {
    colorVariables += `  --secondary-color: ${secondaryColor};\n`;
    colorVariables += `  --secondary-rgb: ${hexToRgb(secondaryColor)};\n`;
  }

  colorVariables += "}\n\n";

  // If CSS doesn't have :root, add it
  if (!cssContent.includes(":root")) {
    return colorVariables + cssContent;
  }

  // Replace existing :root with extended one
  return cssContent.replace(/:root\s*{/, colorVariables.trim() + "\n\n:root {");
}

/**
 * Add dark mode styles to CSS
 * @param {string} cssContent - Original CSS content
 * @returns {string} CSS with dark mode media query added
 */
export function addDarkModeStyles(cssContent) {
  if (cssContent.includes("prefers-color-scheme")) {
    return cssContent; // Already has dark mode
  }

  // Create dark mode media query
  const darkModeStyles = `
/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
  }

  body {
    background-color: var(--bg-primary, #1a1a1a);
    color: var(--text-primary, #ffffff);
  }

  .container,
  .card,
  .modal-content,
  .form-container {
    background-color: var(--bg-secondary, #2d2d2d);
    color: var(--text-primary, #ffffff);
    border-color: var(--border-color, #404040);
  }

  input,
  textarea,
  select {
    background-color: var(--bg-primary, #1a1a1a);
    color: var(--text-primary, #ffffff);
    border-color: var(--border-color, #404040);
  }

  input::placeholder {
    color: var(--text-secondary, #b0b0b0);
  }
}`;

  return cssContent + darkModeStyles;
}
