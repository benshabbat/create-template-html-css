const fs = require('fs').promises;
const path = require('path');

async function generateTemplate(options) {
  const { component, name, includeJs } = options;
  
  // Create output directory
  const outputDir = path.join(process.cwd(), name);
  await fs.mkdir(outputDir, { recursive: true });

  // Get template content
  const templateDir = path.join(__dirname, '..', 'templates', component);
  
  // Copy HTML file
  const htmlContent = await fs.readFile(path.join(templateDir, 'index.html'), 'utf-8');
  await fs.writeFile(path.join(outputDir, 'index.html'), htmlContent.replace(/{{name}}/g, name));

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
