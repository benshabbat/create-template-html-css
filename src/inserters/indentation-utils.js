/**
 * Content indentation utilities
 * Handles indentation normalization for HTML, CSS, and JS content
 */

/**
 * Normalizes content indentation with base indent
 * @param {string} content - Content to normalize
 * @param {string} baseIndent - Base indentation to apply
 * @param {string} extraIndent - Additional indentation (default: empty)
 * @returns {string} Normalized content with proper indentation
 */
export function normalizeIndentation(content, baseIndent, extraIndent = "") {
  return content
    .split("\n")
    .map((line) => {
      if (line.trim() === "") return "";
      return baseIndent + extraIndent + line.trim();
    })
    .join("\n");
}

/**
 * Creates inline style tag with normalized indentation
 * @param {string} component - Component name
 * @param {string} cssContent - CSS content
 * @param {string} baseIndent - Base indentation
 * @returns {string} Formatted style tag
 */
export function createInlineStyleTag(component, cssContent, baseIndent) {
  const normalizedCss = normalizeIndentation(cssContent, baseIndent, "    ");
  return `${baseIndent}<style id="${component}-styles">
${baseIndent}    /* ${component.toUpperCase()} Component Styles */
${normalizedCss}
${baseIndent}</style>
</head>`;
}

/**
 * Creates inline script tag with normalized indentation
 * @param {string} component - Component name
 * @param {string} jsContent - JavaScript content
 * @param {string} baseIndent - Base indentation
 * @returns {string} Formatted script tag
 */
export function createInlineScriptTag(component, jsContent, baseIndent) {
  const normalizedJs = normalizeIndentation(jsContent, baseIndent, "    ");
  return `${baseIndent}<script id="${component}-script">
${baseIndent}    // ${component.toUpperCase()} Component Script
${normalizedJs}
${baseIndent}</script>
</body>`;
}

/**
 * Creates external stylesheet link
 * @param {string} cssFileName - CSS file name
 * @param {string} baseIndent - Base indentation
 * @returns {string} Link tag
 */
export function createStyleLink(cssFileName, baseIndent) {
  return `${baseIndent}<link rel="stylesheet" href="css/${cssFileName}">
</head>`;
}

/**
 * Creates external script tag
 * @param {string} component - Component name
 * @param {string} jsFileName - JavaScript file name
 * @param {string} baseIndent - Base indentation
 * @returns {string} Script tag
 */
export function createScriptTag(component, jsFileName, baseIndent) {
  return `${baseIndent}<script src="js/${jsFileName}" id="${component}-script"></script>
</body>`;
}

/**
 * Creates component HTML insertion with comment
 * @param {string} component - Component name
 * @param {string} componentBody - Component HTML body
 * @param {string} baseIndent - Base indentation
 * @returns {string} Formatted HTML with component comment
 */
export function createComponentInsertion(component, componentBody, baseIndent) {
  return `${baseIndent}<!-- ${component.toUpperCase()} Component -->
${componentBody}

</body>`;
}
