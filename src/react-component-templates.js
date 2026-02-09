/**
 * React Component Templates Module
 * 
 * Central registry for all React component templates organized by category.
 * This module aggregates templates from specialized sub-modules and provides
 * a unified API for accessing component templates and their metadata.
 * 
 * @module react-component-templates
 * @author create-template-html-css
 * @version 2.0.0
 */

import { BASIC_TEMPLATES } from './templates/basic-components-templates.js';
import { FORM_TEMPLATES } from './templates/form-components-templates.js';
import { INTERACTIVE_TEMPLATES } from './templates/interactive-components-templates.js';

// ============================================================================
// COMPONENT TEMPLATES REGISTRY
// ============================================================================

/**
 * Unified component template registry
 * 
 * Aggregates all component templates from different categories into a single
 * accessible object. Templates are organized by component name (kebab-case).
 * 
 * Categories:
 * - Basic components: alert, badge, button, card, counter
 * - Form components: form, input, checkbox, dropdown, switch
 * - Interactive components: modal, navbar, tooltip, progress, todo-list
 * 
 * @constant {Object.<string, string>}
 */
export const COMPONENT_TEMPLATES = {
  ...BASIC_TEMPLATES,
  ...FORM_TEMPLATES,
  ...INTERACTIVE_TEMPLATES,
};

// ============================================================================
// REACT IMPORTS MAPPING
// ============================================================================

/**
 * React hooks import requirements for components
 * 
 * Maps component names (kebab-case) to the React hooks they require.
 * Components not listed here don't need any React hooks.
 * 
 * @constant {Object.<string, string>}
 * @property {string} modal - Requires useState for open/close state
 * @property {string} input - Requires useState for controlled inputs
 * @property {string} checkbox - Requires useState for checked state
 * @property {string} dropdown - Requires useState for selection state
 * @property {string} switch - Requires useState for toggle state
 * @property {string} progress - Requires useState and useEffect for animations
 * 
 * @example
 * // Get imports for a component
 * const imports = COMPONENT_IMPORTS['modal']; // Returns 'useState'
 */
export const COMPONENT_IMPORTS = {
  modal: 'useState',
  input: 'useState',
  checkbox: 'useState',
  dropdown: 'useState',
  switch: 'useState',
  progress: 'useState, useEffect',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get template content for a component with placeholders replaced
 * 
 * Retrieves the JSX template for the specified component and replaces
 * placeholder tokens with the actual component name.
 * 
 * @param {string} componentKebab - Component name in kebab-case (e.g., 'my-button')
 * @param {string} componentName - Component name in PascalCase (e.g., 'MyButton')
 * @returns {string|null} Template content with placeholders replaced, or null if not found
 * 
 * @example
 * const template = getComponentTemplate('button', 'Button');
 * // Returns JSX string with <Button> tags instead of {ComponentName}
 */
export function getComponentTemplate(componentKebab, componentName) {
  const template = COMPONENT_TEMPLATES[componentKebab];
  if (!template) {
    return null;
  }
  
  // Replace {ComponentName} placeholder with actual component name
  return template.replace(/\{ComponentName\}/g, componentName);
}

/**
 * Get required React imports for a component
 * 
 * Returns a comma-separated string of React hooks that the component needs.
 * If the component doesn't require any hooks, returns an empty string.
 * 
 * @param {string} componentKebab - Component name in kebab-case
 * @returns {string} Comma-separated imports (e.g., 'useState, useEffect') or empty string
 * 
 * @example
 * const imports = getComponentImports('progress');
 * // Returns 'useState, useEffect'
 * 
 * const imports2 = getComponentImports('button');
 * // Returns '' (no hooks needed)
 */
export function getComponentImports(componentKebab) {
  return COMPONENT_IMPORTS[componentKebab] || '';
}

/**
 * Get all available component names
 * 
 * Returns an array of all component names (in kebab-case) that have templates available.
 * Useful for validation, CLI autocomplete, or displaying available options.
 * 
 * @returns {string[]} Array of component names in kebab-case
 * 
 * @example
 * const components = getAllComponentNames();
 * // Returns ['alert', 'badge', 'button', 'card', ...]
 */
export function getAllComponentNames() {
  return Object.keys(COMPONENT_TEMPLATES);
}

/**
 * Check if a component template exists
 * 
 * Validates whether a template is available for the specified component name.
 * Case-sensitive - expects kebab-case.
 * 
 * @param {string} componentKebab - Component name in kebab-case
 * @returns {boolean} True if template exists, false otherwise
 * 
 * @example
 * if (hasComponent('button')) {
 *   console.log('Button template is available');
 * }
 */
export function hasComponent(componentKebab) {
  return componentKebab in COMPONENT_TEMPLATES;
}

/**
 * Get all components that require React imports
 * 
 * Returns an array of component names that need React hooks.
 * Useful for documenting which components have state management.
 * 
 * @returns {string[]} Array of component names that require React imports
 * 
 * @example
 * const statefulComponents = getComponentsWithImports();
 * // Returns ['modal', 'input', 'checkbox', 'dropdown', 'switch', 'progress']
 */
export function getComponentsWithImports() {
  return Object.keys(COMPONENT_IMPORTS);
}

/**
 * Get component count
 * 
 * Returns the total number of available component templates.
 * 
 * @returns {number} Total number of components
 * 
 * @example
 * console.log(`${getComponentCount()} components available`);
 * // Output: "15 components available"
 */
export function getComponentCount() {
  return Object.keys(COMPONENT_TEMPLATES).length;
}
