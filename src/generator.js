const fs = require('fs').promises;
const path = require('path');

// Security: Validate component name against whitelist
const VALID_COMPONENTS = ['button', 'card', 'form', 'navigation', 'modal', 'footer', 'hero', 'slider'];

// Security: Sanitize filename to prevent path traversal
function sanitizeFilename(filename) {
  // Remove any path separators and parent directory references
  const sanitized = filename.replace(/[\/\\]/g, '').replace(/\.\.+/g, '.');
  
  // Additional validation: ensure name contains at least one alphanumeric character
  if (!sanitized || !/[a-zA-Z0-9]/.test(sanitized)) {
    return null;
  }
  
  // Remove any remaining dangerous characters
  return sanitized.replace(/[<>:"|?*]/g, '').trim();
}

async function generateTemplate(options) {
  const { component, name, includeJs } = options;
  
  // Security: Validate component name
  if (!VALID_COMPONENTS.includes(component)) {
    throw new Error(`Invalid component: ${component}. Must be one of: ${VALID_COMPONENTS.join(', ')}`);
  }
  
  // Security: Sanitize name to prevent path traversal
  const safeName = sanitizeFilename(name);
  if (!safeName || safeName.length === 0) {
    throw new Error('Invalid name provided');
  }
  
  // Create output directory
  const outputDir = path.join(process.cwd(), safeName);
  await fs.mkdir(outputDir, { recursive: true });

  // Get template content
  const templateDir = path.join(__dirname, '..', 'templates', component);
  
  // Copy HTML file
  const htmlContent = await fs.readFile(path.join(templateDir, 'index.html'), 'utf-8');
  await fs.writeFile(path.join(outputDir, 'index.html'), htmlContent.replace(/{{name}}/g, safeName));

  // Copy CSS file
  const cssContent = await fs.readFile(path.join(templateDir, 'style.css'), 'utf-8');
  await fs.writeFile(path.join(outputDir, 'style.css'), cssContent);

  // Copy JS file if requested
  if (includeJs) {
    try {
      const jsContent = await fs.readFile(path.join(templateDir, 'script.js'), 'utf-8');
      await fs.writeFile(path.join(outputDir, 'script.js'), jsContent);
    } catch (error) {
      // If no JS template exists, create a basic one
      await fs.writeFile(path.join(outputDir, 'script.js'), '// Add your JavaScript here\n');
    }
  }

  return outputDir;
}

module.exports = { generateTemplate };
