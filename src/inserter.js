const fs = require('fs').promises;
const path = require('path');

// Security: Validate component name against whitelist
const VALID_COMPONENTS = ['button', 'card', 'form', 'navigation', 'modal', 'footer', 'hero', 'slider', 'table'];

async function insertComponent(options) {
  const { component, targetFile, styleMode, scriptMode } = options;
  
  // Security: Validate component name
  if (!VALID_COMPONENTS.includes(component)) {
    throw new Error(`Invalid component: ${component}. Must be one of: ${VALID_COMPONENTS.join(', ')}`);
  }
  
  // Check if target file exists
  const targetPath = path.resolve(process.cwd(), targetFile);
  try {
    await fs.access(targetPath);
  } catch {
    throw new Error(`Target file not found: ${targetFile}`);
  }
  
  // Read target HTML file
  let htmlContent = await fs.readFile(targetPath, 'utf-8');
  
  // Get component templates
  const templateDir = path.join(__dirname, '..', 'templates', component);
  const componentHtml = await fs.readFile(path.join(templateDir, 'index.html'), 'utf-8');
  const componentCss = await fs.readFile(path.join(templateDir, 'style.css'), 'utf-8');
  
  // Extract component body content (between <body> tags, excluding container if needed)
  const bodyMatch = componentHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) {
    throw new Error('Invalid component template structure');
  }
  
  let componentBody = bodyMatch[1].trim();
  
  // Insert component HTML before closing </body> tag
  if (htmlContent.includes('</body>')) {
    htmlContent = htmlContent.replace('</body>', `\n    <!-- ${component.toUpperCase()} Component -->\n${componentBody}\n</body>`);
  } else {
    throw new Error('Target HTML file does not have a closing </body> tag');
  }
  
  // Handle CSS
  if (styleMode === 'inline') {
    // Add CSS in <style> tag before </head>
    const styleTag = `\n    <style>\n        /* ${component.toUpperCase()} Component Styles */\n${componentCss}\n    </style>`;
    if (htmlContent.includes('</head>')) {
      htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);
    }
  } else if (styleMode === 'separate') {
    // Create separate CSS file
    const cssFileName = `${component}-component.css`;
    const cssPath = path.join(path.dirname(targetPath), cssFileName);
    await fs.writeFile(cssPath, `/* ${component.toUpperCase()} Component Styles */\n${componentCss}`);
    
    // Add link to CSS file
    const linkTag = `\n    <link rel="stylesheet" href="${cssFileName}">`;
    if (htmlContent.includes('</head>')) {
      htmlContent = htmlContent.replace('</head>', `${linkTag}\n</head>`);
    }
  }
  
  // Handle JavaScript
  try {
    const componentJs = await fs.readFile(path.join(templateDir, 'script.js'), 'utf-8');
    
    if (scriptMode === 'inline') {
      // Add JS in <script> tag before </body>
      const scriptTag = `\n    <script>\n        // ${component.toUpperCase()} Component Script\n${componentJs}\n    </script>\n`;
      htmlContent = htmlContent.replace('</body>', `${scriptTag}</body>`);
    } else if (scriptMode === 'separate') {
      // Create separate JS file
      const jsFileName = `${component}-component.js`;
      const jsPath = path.join(path.dirname(targetPath), jsFileName);
      await fs.writeFile(jsPath, `// ${component.toUpperCase()} Component Script\n${componentJs}`);
      
      // Add script tag
      const scriptTag = `\n    <script src="${jsFileName}"></script>\n`;
      htmlContent = htmlContent.replace('</body>', `${scriptTag}</body>`);
    }
  } catch (error) {
    // No JavaScript file for this component, skip
  }
  
  // Write updated HTML
  await fs.writeFile(targetPath, htmlContent);
  
  return {
    targetFile: targetPath,
    component,
    styleMode,
    scriptMode
  };
}

module.exports = { insertComponent };
