const fs = require('fs').promises;
const path = require('path');

// Security: Validate component name against whitelist
const VALID_COMPONENTS = ['button', 'card', 'form', 'navigation', 'modal', 'footer', 'hero', 'slider', 'table', 'spinner', 'animated-card', 'typing-effect', 'fade-gallery', 'grid-layout', 'masonry-grid', 'dashboard-grid', 'flex-layout', 'flex-cards', 'flex-dashboard', 'todo-list', 'counter', 'accordion', 'tabs'];

/**
 * Extracts indentation from a line
 */
function getIndentation(line) {
  const match = line.match(/^(\s*)/);
  return match ? match[1] : '';
}

/**
 * Checks if a component is already inserted in the HTML
 */
function isComponentAlreadyInserted(htmlContent, component) {
  const commentPattern = new RegExp(`<!-- ${component.toUpperCase()} Component -->`, 'i');
  return commentPattern.test(htmlContent);
}

/**
 * Gets the indentation level used in an HTML file
 */
function getHtmlIndentation(htmlContent) {
  // Look for any indented line to determine the standard indentation
  const match = htmlContent.match(/\n(\s+)\S/);
  return match ? match[1] : '    '; // default to 4 spaces
}

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
  
  // Check if component is already inserted
  if (isComponentAlreadyInserted(htmlContent, component)) {
    throw new Error(`Component "${component}" is already inserted in this file`);
  }
  
  // Validate HTML structure
  if (!htmlContent.includes('</body>')) {
    throw new Error('Target HTML file does not have a closing </body> tag');
  }
  
  if (!htmlContent.includes('</head>')) {
    throw new Error('Target HTML file does not have a </head> tag');
  }
  
  // Get component templates
  const templateDir = path.join(__dirname, '..', 'templates', component);
  const componentHtml = await fs.readFile(path.join(templateDir, 'index.html'), 'utf-8');
  const componentCss = await fs.readFile(path.join(templateDir, 'style.css'), 'utf-8');
  
  // Extract component body content
  const bodyMatch = componentHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) {
    throw new Error('Invalid component template structure');
  }
  
  let componentBody = bodyMatch[1].trim();
  
  // Get indentation used in the HTML file
  const baseIndent = getHtmlIndentation(htmlContent);
  
  // Normalize component body indentation
  const lines = componentBody.split('\n').map(line => {
    if (line.trim() === '') return '';
    return baseIndent + line.trim();
  }).join('\n');
  componentBody = lines;
  
  // Insert component HTML before closing </body> tag
  htmlContent = htmlContent.replace('</body>', `${baseIndent}<!-- ${component.toUpperCase()} Component -->\n${componentBody}\n\n</body>`);
  
  // Handle CSS
  if (styleMode === 'inline') {
    // Normalize CSS indentation
    const normalizedCss = componentCss.split('\n').map(line => {
      if (line.trim() === '') return '';
      return baseIndent + '    ' + line.trim();
    }).join('\n');
    
    htmlContent = htmlContent.replace('</head>', `${baseIndent}<style id="${component}-styles">\n${baseIndent}    /* ${component.toUpperCase()} Component Styles */\n${normalizedCss}\n${baseIndent}</style>\n</head>`);
  } else if (styleMode === 'separate') {
    // Create separate CSS file
    const cssFileName = `${component}-component.css`;
    const cssPath = path.join(path.dirname(targetPath), cssFileName);
    await fs.writeFile(cssPath, `/* ${component.toUpperCase()} Component Styles */\n\n${componentCss}`);
    
    // Add link to CSS file
    htmlContent = htmlContent.replace('</head>', `${baseIndent}<link rel="stylesheet" href="${cssFileName}">\n</head>`);
  }
  
  // Handle JavaScript
  try {
    const componentJs = await fs.readFile(path.join(templateDir, 'script.js'), 'utf-8');
    
    if (scriptMode === 'inline') {
      // Normalize JS indentation
      const normalizedJs = componentJs.split('\n').map(line => {
        if (line.trim() === '') return '';
        return baseIndent + '    ' + line.trim();
      }).join('\n');
      
      htmlContent = htmlContent.replace('</body>', `${baseIndent}<script id="${component}-script">\n${baseIndent}    // ${component.toUpperCase()} Component Script\n${normalizedJs}\n${baseIndent}</script>\n</body>`);
    } else if (scriptMode === 'separate') {
      // Create separate JS file
      const jsFileName = `${component}-component.js`;
      const jsPath = path.join(path.dirname(targetPath), jsFileName);
      await fs.writeFile(jsPath, `// ${component.toUpperCase()} Component Script\n\n${componentJs}`);
      
      // Add script tag
      htmlContent = htmlContent.replace('</body>', `${baseIndent}<script src="${jsFileName}" id="${component}-script"></script>\n</body>`);
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
