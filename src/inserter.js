const fs = require('fs').promises;
const path = require('path');

// Security: Validate component name against whitelist
const VALID_COMPONENTS = ['button', 'card', 'form', 'navigation', 'modal', 'footer', 'hero', 'slider', 'table', 'spinner', 'animated-card', 'typing-effect', 'fade-gallery', 'grid-layout', 'masonry-grid', 'dashboard-grid', 'flex-layout', 'flex-cards', 'flex-dashboard'];

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
 * Removes all whitespace while preserving indentation of content
 */
function normalizeIndentation(text, baseIndent = '') {
  const lines = text.split('\n');
  return lines.map(line => {
    if (line.trim() === '') return '';
    return baseIndent + line.trim();
  }).join('\n');
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
  
  // Get indentation from existing body content
  const bodyIndentMatch = htmlContent.match(/\n(\s*)<\/body>/);
  const bodyIndent = bodyIndentMatch ? bodyIndentMatch[1] : '    ';
  
  // Normalize component body indentation
  componentBody = normalizeIndentation(componentBody, bodyIndent);
  
  // Insert component HTML before closing </body> tag
  const componentComment = `\n${bodyIndent}<!-- ${component.toUpperCase()} Component -->`;
  const insertHtml = `${componentComment}\n${componentBody}\n${bodyIndent}`;
  
  htmlContent = htmlContent.replace('</body>', `${insertHtml}</body>`);
  
  // Handle CSS
  if (styleMode === 'inline') {
    // Get indentation from head
    const headIndentMatch = htmlContent.match(/\n(\s*)<\/head>/);
    const headIndent = headIndentMatch ? headIndentMatch[1] : '    ';
    
    // Normalize CSS indentation
    const normalizedCss = normalizeIndentation(componentCss, headIndent + '    ');
    
    const styleTag = `\n${headIndent}<style id="${component}-styles">\n${headIndent}    /* ${component.toUpperCase()} Component Styles */\n${normalizedCss}\n${headIndent}</style>`;
    htmlContent = htmlContent.replace('</head>', `${styleTag}\n${headIndent}</head>`);
  } else if (styleMode === 'separate') {
    // Create separate CSS file
    const cssFileName = `${component}-component.css`;
    const cssPath = path.join(path.dirname(targetPath), cssFileName);
    await fs.writeFile(cssPath, `/* ${component.toUpperCase()} Component Styles */\n\n${componentCss}`);
    
    // Get indentation from head
    const headIndentMatch = htmlContent.match(/\n(\s*)<\/head>/);
    const headIndent = headIndentMatch ? headIndentMatch[1] : '    ';
    
    // Add link to CSS file
    const linkTag = `\n${headIndent}<link rel="stylesheet" href="${cssFileName}">`;
    htmlContent = htmlContent.replace('</head>', `${linkTag}\n${headIndent}</head>`);
  }
  
  // Handle JavaScript
  try {
    const componentJs = await fs.readFile(path.join(templateDir, 'script.js'), 'utf-8');
    
    if (scriptMode === 'inline') {
      // Get indentation from body
      const bodyIndentMatch = htmlContent.match(/\n(\s*)<\/body>/);
      const bodyIndent = bodyIndentMatch ? bodyIndentMatch[1] : '    ';
      
      // Normalize JS indentation
      const normalizedJs = normalizeIndentation(componentJs, bodyIndent + '    ');
      
      const scriptTag = `\n${bodyIndent}<script id="${component}-script">\n${bodyIndent}    // ${component.toUpperCase()} Component Script\n${normalizedJs}\n${bodyIndent}</script>\n${bodyIndent}`;
      htmlContent = htmlContent.replace('</body>', `${scriptTag}</body>`);
    } else if (scriptMode === 'separate') {
      // Create separate JS file
      const jsFileName = `${component}-component.js`;
      const jsPath = path.join(path.dirname(targetPath), jsFileName);
      await fs.writeFile(jsPath, `// ${component.toUpperCase()} Component Script\n\n${componentJs}`);
      
      // Get indentation from body
      const bodyIndentMatch = htmlContent.match(/\n(\s*)<\/body>/);
      const bodyIndent = bodyIndentMatch ? bodyIndentMatch[1] : '    ';
      
      // Add script tag
      const scriptTag = `\n${bodyIndent}<script src="${jsFileName}" id="${component}-script"></script>\n${bodyIndent}`;
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
