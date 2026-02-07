/**
 * Color scheme presets for templates
 */

export const COLOR_SCHEMES = {
  vibrant: {
    name: "Vibrant",
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    description: "Bold reds and teals - energetic and modern",
  },
  pastel: {
    name: "Pastel",
    primary: "#FFB3BA",
    secondary: "#FFDFBA",
    description: "Soft pinks and peaches - calm and friendly",
  },
  ocean: {
    name: "Ocean",
    primary: "#0066CC",
    secondary: "#00CCFF",
    description: "Deep blues and cyans - professional and cool",
  },
  sunset: {
    name: "Sunset",
    primary: "#FF6B35",
    secondary: "#FFA500",
    description: "Warm oranges and reds - energetic glow",
  },
  forest: {
    name: "Forest",
    primary: "#2D6A4F",
    secondary: "#40916C",
    description: "Green tones - natural and organic",
  },
  purple: {
    name: "Purple",
    primary: "#7209B7",
    secondary: "#B5179E",
    description: "Deep purples - elegant and premium",
  },
  minimal: {
    name: "Minimal",
    primary: "#1A1A1A",
    secondary: "#666666",
    description: "Grays and blacks - clean and simple",
  },
  coral: {
    name: "Coral",
    primary: "#FF6B9D",
    secondary: "#FFA07A",
    description: "Coral pinks and salmon - warm and playful",
  },
  teal: {
    name: "Teal",
    primary: "#008B8B",
    secondary: "#20B2AA",
    description: "Teal hues - balanced and professional",
  },
  neon: {
    name: "Neon",
    primary: "#FF006E",
    secondary: "#00D9FF",
    description: "Bright neon colors - bold and futuristic",
  },
};

/**
 * Get color scheme by preset name
 * @param {string} schemeName - Name of the color scheme
 * @returns {Object|null} Color scheme object or null if not found
 */
export function getColorScheme(schemeName) {
  if (COLOR_SCHEMES[schemeName]) {
    return COLOR_SCHEMES[schemeName];
  }
  return null;
}
