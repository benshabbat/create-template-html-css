/**
 * Component filtering utilities
 * Filters variations for buttons, cards, and spinners
 */

/**
 * Filter button variations based on user selection
 * @param {string} htmlContent - Original HTML content
 * @param {string} buttonVariations - "all" or "select"
 * @param {Array<string>} selectedButtons - Array of selected button types
 * @returns {string} Filtered HTML content
 */
export function filterButtonVariations(
  htmlContent,
  buttonVariations,
  selectedButtons
) {
  if (
    buttonVariations === "all" ||
    !selectedButtons ||
    selectedButtons.length === 0
  ) {
    return htmlContent; // Return all buttons
  }

  // Map selection to button classes
  const buttonMap = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    outlined: "btn-outlined",
    disabled: "disabled",
  };

  let filteredHtml = htmlContent;

  // Remove buttons that weren't selected
  for (const [key, className] of Object.entries(buttonMap)) {
    if (!selectedButtons.includes(key)) {
      // Remove button and its comment
      const patterns = [
        new RegExp(
          `\\s*<!-- ${key.charAt(0).toUpperCase() + key.slice(1)} Button -->\\s*\\n\\s*<button[^>]*${className}[^>]*>.*?<\\/button>\\s*\\n`,
          "gis"
        ),
        new RegExp(
          `\\s*<button[^>]*${className}[^>]*>.*?<\\/button>\\s*\\n`,
          "gis"
        ),
      ];

      patterns.forEach((pattern) => {
        filteredHtml = filteredHtml.replace(pattern, "\n        ");
      });
    }
  }

  return filteredHtml;
}

/**
 * Filter card variations based on user selection
 * @param {string} htmlContent - Original HTML content
 * @param {string} cardVariations - "all" or "select"
 * @param {Array<string>} selectedCards - Array of selected card types
 * @returns {string} Filtered HTML content
 */
export function filterCardVariations(
  htmlContent,
  cardVariations,
  selectedCards
) {
  if (
    cardVariations === "all" ||
    !selectedCards ||
    selectedCards.length === 0
  ) {
    return htmlContent; // Return all cards
  }

  const cardComments = {
    modern: "Card 1 - Basic",
    premium: "Card 2 - With Price",
    blog: "Card 3 - With Tags",
    minimal: "Card 4 - Minimal",
    user: "Card 5 - With Avatar",
    interactive: "Card 6 - Interactive",
  };

  let filteredHtml = htmlContent;

  // Remove cards that weren't selected
  for (const [key, comment] of Object.entries(cardComments)) {
    if (!selectedCards.includes(key)) {
      // Remove entire card div including comment
      const pattern = new RegExp(
        `\\s*<!-- ${comment.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")} -->\\s*\\n\\s*<div class="card[^>]*>.*?<\\/div>\\s*\\n\\s*<\\/div>\\s*\\n`,
        "gis"
      );
      filteredHtml = filteredHtml.replace(pattern, "\n            ");
    }
  }

  return filteredHtml;
}

/**
 * Filter spinner variations based on user selection
 * @param {string} htmlContent - Original HTML content
 * @param {string} spinnerVariations - "all" or "select"
 * @param {Array<string>} selectedSpinners - Array of selected spinner types
 * @returns {string} Filtered HTML content
 */
export function filterSpinnerVariations(
  htmlContent,
  spinnerVariations,
  selectedSpinners
) {
  if (
    spinnerVariations === "all" ||
    !selectedSpinners ||
    selectedSpinners.length === 0
  ) {
    return htmlContent; // Return all spinners
  }

  const spinnerTypes = {
    circle: "Circle Spinner",
    dots: "Bouncing Dots",
    pulse: "Pulse Loader",
    bars: "Bar Loader",
    gradient: "Gradient Ring",
  };

  let filteredHtml = htmlContent;

  // Remove spinners that weren't selected
  for (const [key, title] of Object.entries(spinnerTypes)) {
    if (!selectedSpinners.includes(key)) {
      // Remove entire spinner-group div
      const pattern = new RegExp(
        `\\s*<!-- ${title} Spinner -->\\s*\\n\\s*<div class="spinner-group">.*?<\\/div>\\s*\\n\\s*<\\/div>\\s*\\n`,
        "gis"
      );
      filteredHtml = filteredHtml.replace(pattern, "\n        ");
    }
  }

  return filteredHtml;
}
