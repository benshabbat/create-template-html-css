const fs = require("fs").promises;
const path = require("path");

/**
 * Formats HTML content with prettier (optional - falls back to original if not available)
 */
async function formatHtml(htmlContent) {
  try {
    const prettier = require("prettier");
    return await prettier.format(htmlContent, { parser: "html" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return htmlContent;
  }
}

/**
 * Formats CSS content with prettier (optional - falls back to original if not available)
 */
async function formatCss(cssContent) {
  try {
    const prettier = require("prettier");
    return await prettier.format(cssContent, { parser: "css" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return cssContent;
  }
}

/**
 * Formats JavaScript content with prettier (optional - falls back to original if not available)
 */
async function formatJs(jsContent) {
  try {
    const prettier = require("prettier");
    return await prettier.format(jsContent, { parser: "babel" });
  } catch (error) {
    // Prettier not installed or error formatting - return original content
    return jsContent;
  }
}

/**
 * Color scheme presets
 */
const COLOR_SCHEMES = {
  vibrant: {
    name: "Vibrant",
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    description: "Bold reds and teals - energetic and modern"
  },
  pastel: {
    name: "Pastel",
    primary: "#FFB3BA",
    secondary: "#FFDFBA",
    description: "Soft pinks and peaches - calm and friendly"
  },
  ocean: {
    name: "Ocean",
    primary: "#0066CC",
    secondary: "#00CCFF",
    description: "Deep blues and cyans - professional and cool"
  },
  sunset: {
    name: "Sunset",
    primary: "#FF6B35",
    secondary: "#FFA500",
    description: "Warm oranges and reds - energetic glow"
  },
  forest: {
    name: "Forest",
    primary: "#2D6A4F",
    secondary: "#40916C",
    description: "Green tones - natural and organic"
  },
  purple: {
    name: "Purple",
    primary: "#7209B7",
    secondary: "#B5179E",
    description: "Deep purples - elegant and premium"
  },
  minimal: {
    name: "Minimal",
    primary: "#1A1A1A",
    secondary: "#666666",
    description: "Grays and blacks - clean and simple"
  },
  coral: {
    name: "Coral",
    primary: "#FF6B9D",
    secondary: "#FFA07A",
    description: "Coral pinks and salmon - warm and playful"
  },
  teal: {
    name: "Teal",
    primary: "#008B8B",
    secondary: "#20B2AA",
    description: "Teal hues - balanced and professional"
  },
  neon: {
    name: "Neon",
    primary: "#FF006E",
    secondary: "#00D9FF",
    description: "Bright neon colors - bold and futuristic"
  }
};

/**
 * Get color scheme by preset name
 */
function getColorScheme(schemeName) {
  if (COLOR_SCHEMES[schemeName]) {
    return COLOR_SCHEMES[schemeName];
  }
  return null;
}

/**
 * Apply custom colors to CSS content using CSS variables
 */
function applyCustomColors(cssContent, primaryColor, secondaryColor) {
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
 * Convert hex color to RGB values
 */
function hexToRgb(hex) {
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
 * Add dark mode styles to CSS
 */
function addDarkModeStyles(cssContent) {
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

// Security: Validate component name against whitelist
const VALID_COMPONENTS = [
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

// Security: Sanitize filename to prevent path traversal
function sanitizeFilename(filename) {
  // Remove any path separators and parent directory references
  const sanitized = filename.replace(/[\/\\]/g, "").replace(/\.\.+/g, ".");

  // Additional validation: ensure name contains at least one alphanumeric character
  if (!sanitized || !/[a-zA-Z0-9]/.test(sanitized)) {
    return null;
  }

  // Remove any remaining dangerous characters
  return sanitized.replace(/[<>:"|?*]/g, "").trim();
}

/**
 * Filter button variations based on user selection
 */
function filterButtonVariations(htmlContent, buttonVariations, selectedButtons) {
  if (buttonVariations === "all" || !selectedButtons || selectedButtons.length === 0) {
    return htmlContent; // Return all buttons
  }

  // Map selection to button classes
  const buttonMap = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    outlined: "btn-outlined",
    disabled: "disabled"
  };

  let filteredHtml = htmlContent;
  
  // Remove buttons that weren't selected
  for (const [key, className] of Object.entries(buttonMap)) {
    if (!selectedButtons.includes(key)) {
      // Remove button and its comment
      const patterns = [
        new RegExp(`\\s*<!-- ${key.charAt(0).toUpperCase() + key.slice(1)} Button -->\\s*\\n\\s*<button[^>]*${className}[^>]*>.*?<\\/button>\\s*\\n`, 'gis'),
        new RegExp(`\\s*<button[^>]*${className}[^>]*>.*?<\\/button>\\s*\\n`, 'gis')
      ];
      
      patterns.forEach(pattern => {
        filteredHtml = filteredHtml.replace(pattern, '\n        ');
      });
    }
  }
  
  return filteredHtml;
}

/**
 * Filter card variations based on user selection
 */
function filterCardVariations(htmlContent, cardVariations, selectedCards) {
  if (cardVariations === "all" || !selectedCards || selectedCards.length === 0) {
    return htmlContent; // Return all cards
  }

  const cardComments = {
    modern: "Card 1 - Basic",
    premium: "Card 2 - With Price",
    blog: "Card 3 - With Tags",
    minimal: "Card 4 - Minimal",
    user: "Card 5 - With Avatar",
    interactive: "Card 6 - Interactive"
  };

  let filteredHtml = htmlContent;

  // Remove cards that weren't selected
  for (const [key, comment] of Object.entries(cardComments)) {
    if (!selectedCards.includes(key)) {
      // Remove entire card div including comment
      const pattern = new RegExp(`\\s*<!-- ${comment.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')} -->\\s*\\n\\s*<div class="card[^>]*>.*?<\\/div>\\s*\\n\\s*<\\/div>\\s*\\n`, 'gis');
      filteredHtml = filteredHtml.replace(pattern, '\n            ');
    }
  }

  return filteredHtml;
}

/**
 * Filter spinner variations based on user selection
 */
function filterSpinnerVariations(htmlContent, spinnerVariations, selectedSpinners) {
  if (spinnerVariations === "all" || !selectedSpinners || selectedSpinners.length === 0) {
    return htmlContent; // Return all spinners
  }

  const spinnerTypes = {
    circle: "Circle Spinner",
    dots: "Bouncing Dots",
    pulse: "Pulse Loader",
    bars: "Bar Loader",
    gradient: "Gradient Ring"
  };

  let filteredHtml = htmlContent;

  // Remove spinners that weren't selected
  for (const [key, title] of Object.entries(spinnerTypes)) {
    if (!selectedSpinners.includes(key)) {
      // Remove entire spinner-group div
      const pattern = new RegExp(`\\s*<!-- ${title} Spinner -->\\s*\\n\\s*<div class="spinner-group">.*?<\\/div>\\s*\\n\\s*<\\/div>\\s*\\n`, 'gis');
      filteredHtml = filteredHtml.replace(pattern, '\n        ');
    }
  }

  return filteredHtml;
}

/**
 * Generate custom navigation items based on user input
 */
function generateNavigationItems(htmlContent, navItems) {
  // Parse the comma-separated navigation items
  const items = navItems.split(',').map(item => item.trim()).filter(item => item.length > 0);
  
  // Generate navigation HTML
  let navHtml = '';
  items.forEach((item, index) => {
    const itemId = item.toLowerCase().replace(/\s+/g, '-');
    const activeClass = index === 0 ? ' active' : '';
    navHtml += `                <li class="nav-item">
                    <a href="#${itemId}" class="nav-link${activeClass}">${item}</a>
                </li>\n`;
  });
  
  // Replace the navigation items in the HTML
  const navMenuRegex = /<ul class="nav-menu"[^>]*>[\s\S]*?<\/ul>/;
  const replacement = `<ul class="nav-menu" id="navMenu">
${navHtml}            </ul>`;
  
  htmlContent = htmlContent.replace(navMenuRegex, replacement);
  
  // Generate sections for each navigation item
  let sectionsHtml = '';
  items.forEach(item => {
    const itemId = item.toLowerCase().replace(/\s+/g, '-');
    sectionsHtml += `        <section id="${itemId}" class="section">
            <h1>${item}</h1>
            <p>Content for ${item} section</p>
        </section>
        
`;
  });
  
  // Replace the sections in the HTML
  const mainContentRegex = /<main class="main-content">[\s\S]*?<\/main>/;
  const sectionsReplacement = `<main class="main-content">
${sectionsHtml}    </main>`;
  
  htmlContent = htmlContent.replace(mainContentRegex, sectionsReplacement);
  
  return htmlContent;
}

/**
 * Generate custom form fields based on user selection
 */
function generateFormFields(htmlContent, formFields, customFormFields) {
  let fieldsHtml = '';
  
  // Add standard fields
  formFields.forEach(field => {
    switch(field) {
      case 'name':
        fieldsHtml += `            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            
`;
        break;
      case 'email':
        fieldsHtml += `            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            
`;
        break;
      case 'phone':
        fieldsHtml += `            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone">
            </div>
            
`;
        break;
      case 'subject':
        fieldsHtml += `            <div class="form-group">
                <label for="subject">Subject</label>
                <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales</option>
                    <option value="general">General</option>
                </select>
            </div>
            
`;
        break;
      case 'message':
        fieldsHtml += `            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
`;
        break;
      case 'terms':
        fieldsHtml += `            <div class="form-group checkbox-group">
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms">I agree to the terms of service</label>
            </div>
            
`;
        break;
    }
  });
  
  // Add custom fields if provided
  if (customFormFields && customFormFields.trim().length > 0) {
    const customFields = customFormFields.split(',').map(f => f.trim()).filter(f => f.length > 0);
    
    customFields.forEach(field => {
      const [type, label] = field.split(':').map(s => s.trim());
      if (type && label) {
        const fieldId = label.toLowerCase().replace(/\s+/g, '-');
        
        if (type === 'textarea') {
          fieldsHtml += `            <div class="form-group">
                <label for="${fieldId}">${label}</label>
                <textarea id="${fieldId}" name="${fieldId}" rows="5"></textarea>
            </div>
            
`;
        } else if (type === 'checkbox') {
          fieldsHtml += `            <div class="form-group checkbox-group">
                <input type="checkbox" id="${fieldId}" name="${fieldId}">
                <label for="${fieldId}">${label}</label>
            </div>
            
`;
        } else if (type === 'select') {
          fieldsHtml += `            <div class="form-group">
                <label for="${fieldId}">${label}</label>
                <select id="${fieldId}" name="${fieldId}">
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
            </div>
            
`;
        } else {
          // Default to input with specified type
          fieldsHtml += `            <div class="form-group">
                <label for="${fieldId}">${label}</label>
                <input type="${type}" id="${fieldId}" name="${fieldId}">
            </div>
            
`;
        }
      }
    });
  }
  
  // Replace the form fields in the HTML
  const formRegex = /<form class="form"[^>]*>[\s\S]*?<button type="submit"/;
  const replacement = `<form class="form" id="contactForm">
            <h1 class="form-title">Contact Us</h1>
            <p class="form-subtitle">Fill in the details and we'll get back to you soon</p>
            
${fieldsHtml}            <button type="submit"`;
  
  htmlContent = htmlContent.replace(formRegex, replacement);
  
  return htmlContent;
}

async function generateTemplate(options) {
  const { 
    component, 
    name, 
    includeJs, 
    navItems, 
    formFields, 
    customFormFields,
    buttonVariations,
    selectedButtons,
    cardVariations,
    selectedCards,
    spinnerVariations,
    selectedSpinners,
    colorScheme,
    primaryColor,
    secondaryColor,
    darkMode
  } = options;

  // If colorScheme is provided, use those colors
  let finalPrimaryColor = primaryColor;
  let finalSecondaryColor = secondaryColor;
  
  if (colorScheme && COLOR_SCHEMES[colorScheme]) {
    const scheme = COLOR_SCHEMES[colorScheme];
    finalPrimaryColor = scheme.primary;
    finalSecondaryColor = scheme.secondary;
  }

  // Security: Validate component name
  if (!VALID_COMPONENTS.includes(component)) {
    throw new Error(
      `Invalid component: ${component}. Must be one of: ${VALID_COMPONENTS.join(", ")}`,
    );
  }

  // Security: Sanitize name to prevent path traversal
  const safeName = sanitizeFilename(name);
  if (!safeName || safeName.length === 0) {
    throw new Error("Invalid name provided");
  }

  // Create output directory structure
  const outputDir = path.join(process.cwd(), safeName);
  const cssDir = path.join(outputDir, "css");
  const jsDir = path.join(outputDir, "js");

  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(cssDir, { recursive: true });
  await fs.mkdir(jsDir, { recursive: true });

  // Get template content
  const templateDir = path.join(__dirname, "..", "templates", component);

  // Copy HTML file
  let htmlContent = await fs.readFile(
    path.join(templateDir, "index.html"),
    "utf-8",
  );

  // Replace placeholder name
  htmlContent = htmlContent.replace(/{{name}}/g, safeName);
  
  // Filter button variations
  if (component === "button") {
    htmlContent = filterButtonVariations(htmlContent, buttonVariations, selectedButtons);
  }
  
  // Filter card variations
  if (component === "card") {
    htmlContent = filterCardVariations(htmlContent, cardVariations, selectedCards);
  }
  
  // Filter spinner variations
  if (component === "spinner") {
    htmlContent = filterSpinnerVariations(htmlContent, spinnerVariations, selectedSpinners);
  }
  
  // Custom navigation items
  if (component === "navigation" && navItems) {
    htmlContent = generateNavigationItems(htmlContent, navItems);
  }
  
  // Custom form fields
  if (component === "form" && formFields) {
    htmlContent = generateFormFields(htmlContent, formFields, customFormFields);
  }

  // Add script tag if JavaScript is included (pointing to js/ folder)
  if (includeJs) {
    // Insert script tag before closing </body> tag
    htmlContent = htmlContent.replace(
      "</body>",
      '    <script src="js/script.js"></script>\n</body>',
    );
  }

  // Update CSS link to point to css/ folder
  htmlContent = htmlContent.replace(
    /<link[^>]*href="style\.css"[^>]*>/g,
    '    <link rel="stylesheet" href="css/style.css">',
  );

  // Format HTML before writing
  htmlContent = await formatHtml(htmlContent);

  await fs.writeFile(path.join(outputDir, "index.html"), htmlContent);

  // Copy CSS file to css/ folder
  let cssContent = await fs.readFile(
    path.join(templateDir, "style.css"),
    "utf-8",
  );

  // Apply custom colors if provided (either from colorScheme or direct colors)
  if (finalPrimaryColor || finalSecondaryColor) {
    cssContent = applyCustomColors(cssContent, finalPrimaryColor, finalSecondaryColor);
  }

  // Add dark mode support if requested
  if (darkMode) {
    cssContent = addDarkModeStyles(cssContent);
  }

  const formattedCss = await formatCss(cssContent);
  await fs.writeFile(path.join(cssDir, "style.css"), formattedCss);

  // Copy JS file to js/ folder if requested
  if (includeJs) {
    try {
      const jsContent = await fs.readFile(
        path.join(templateDir, "script.js"),
        "utf-8",
      );
      const formattedJs = await formatJs(jsContent);
      await fs.writeFile(path.join(jsDir, "script.js"), formattedJs);
    } catch (error) {
      // If no JS template exists, create a basic one
      const basicJs = await formatJs("// Add your JavaScript here\n");
      await fs.writeFile(path.join(jsDir, "script.js"), basicJs);
    }
  }

  return outputDir;
}

module.exports = { generateTemplate, COLOR_SCHEMES, getColorScheme };
