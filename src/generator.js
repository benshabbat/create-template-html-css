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
  const { component, name, includeJs, navItems, formFields, customFormFields } = options;

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
  const cssContent = await fs.readFile(
    path.join(templateDir, "style.css"),
    "utf-8",
  );
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

module.exports = { generateTemplate };
