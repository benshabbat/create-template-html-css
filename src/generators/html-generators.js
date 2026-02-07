/**
 * HTML content generators for navigation and forms
 */

import { textToId, parseCommaSeparated, parseKeyValuePairs } from "../utils/string-utils.js";

/**
 * Generate custom navigation items based on user input
 * @param {string} htmlContent - Original HTML content
 * @param {string} navItems - Comma-separated list of navigation items
 * @returns {string} HTML with custom navigation
 */
export function generateNavigationItems(htmlContent, navItems) {
  // Parse the comma-separated navigation items
  const items = parseCommaSeparated(navItems);

  // Generate navigation HTML
  let navHtml = "";
  items.forEach((item, index) => {
    const itemId = textToId(item);
    const activeClass = index === 0 ? " active" : "";
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
  let sectionsHtml = "";
  items.forEach((item) => {
    const itemId = textToId(item);
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
 * @param {string} htmlContent - Original HTML content
 * @param {Array<string>} formFields - Array of standard field types
 * @param {string} customFormFields - Custom fields in format "type:label"
 * @returns {string} HTML with custom form fields
 */
export function generateFormFields(htmlContent, formFields, customFormFields) {
  let fieldsHtml = "";

  // Add standard fields
  formFields.forEach((field) => {
    switch (field) {
      case "name":
        fieldsHtml += `            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            
`;
        break;
      case "email":
        fieldsHtml += `            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            
`;
        break;
      case "phone":
        fieldsHtml += `            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone">
            </div>
            
`;
        break;
      case "subject":
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
      case "message":
        fieldsHtml += `            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
`;
        break;
      case "terms":
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
    const customFields = parseKeyValuePairs(customFormFields);

    customFields.forEach(({ key: type, value: label }) => {
      const fieldId = textToId(label);

      if (type === "textarea") {
        fieldsHtml += `            <div class="form-group">
                <label for="${fieldId}">${label}</label>
                <textarea id="${fieldId}" name="${fieldId}" rows="5"></textarea>
            </div>
            
`;
      } else if (type === "checkbox") {
        fieldsHtml += `            <div class="form-group checkbox-group">
                <input type="checkbox" id="${fieldId}" name="${fieldId}">
                <label for="${fieldId}">${label}</label>
            </div>
            
`;
      } else if (type === "select") {
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
