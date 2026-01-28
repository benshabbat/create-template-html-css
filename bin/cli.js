#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer').default || require('inquirer');
const { generateTemplate } = require('../src/generator');
const { insertComponent } = require('../src/inserter');
const chalk = require('chalk');

program
  .name('create-template')
  .description('CLI tool to generate HTML and CSS templates')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new HTML/CSS template')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'component',
          message: 'What component would you like to create?',
          choices: [
            { name: 'Button', value: 'button' },
            { name: 'Card', value: 'card' },
            { name: 'Form', value: 'form' },
            { name: 'Navigation', value: 'navigation' },
            { name: 'Modal', value: 'modal' },
            { name: 'Footer', value: 'footer' },
            { name: 'Hero Section', value: 'hero' },
            { name: 'Slider', value: 'slider' },
            { name: 'Table', value: 'table' },
            { name: 'Spinner (Loading Animations)', value: 'spinner' },
            { name: 'Animated Card (Interactive Cards)', value: 'animated-card' },
            { name: 'Typing Effect (Text Animations)', value: 'typing-effect' },
            { name: 'Fade Gallery (Image Gallery)', value: 'fade-gallery' },
            { name: 'Grid Layout (CSS Grid)', value: 'grid-layout' },
            { name: 'Masonry Grid (Pinterest-style)', value: 'masonry-grid' },
            { name: 'Dashboard Grid (Admin Panel)', value: 'dashboard-grid' },
            { name: 'Flex Layout (Flexbox Patterns)', value: 'flex-layout' },
            { name: 'Flex Cards (Flexbox Cards)', value: 'flex-cards' },
            { name: 'Flex Dashboard (Flexbox Admin)', value: 'flex-dashboard' }
          ]
        },
        {
          type: 'input',
          name: 'name',
          message: 'Enter a name for your component:',
          default: (answers) => answers.component,
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return 'Please enter a valid name';
            }
            if (input.includes('..') || input.includes('/') || input.includes('\\')) {
              return 'Name cannot contain path separators or parent directory references';
            }
            if (input.length > 100) {
              return 'Name is too long (max 100 characters)';
            }
            return true;
          }
        },
        {
          type: 'confirm',
          name: 'includeJs',
          message: 'Include JavaScript file?',
          default: false
        }
      ]);

      await generateTemplate(answers);
      console.log(chalk.green('✓ Template created successfully!'));
    } catch (error) {
      console.error(chalk.red('Error creating template:'), error.message);
      process.exit(1);
    }
  });

program
  .command('insert')
  .description('Insert a component into an existing HTML page')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'targetFile',
          message: 'Enter the path to your HTML file:',
          default: 'index.html',
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return 'Please enter a file path';
            }
            if (!input.toLowerCase().endsWith('.html')) {
              return 'File must be an HTML file (.html)';
            }
            return true;
          }
        },
        {
          type: 'list',
          name: 'component',
          message: 'Which component would you like to insert?',
          choices: [
            { name: 'Button', value: 'button' },
            { name: 'Card', value: 'card' },
            { name: 'Form', value: 'form' },
            { name: 'Navigation', value: 'navigation' },
            { name: 'Modal', value: 'modal' },
            { name: 'Footer', value: 'footer' },
            { name: 'Hero Section', value: 'hero' },
            { name: 'Slider', value: 'slider' },
            { name: 'Table', value: 'table' }
          ]
        },
        {
          type: 'list',
          name: 'styleMode',
          message: 'How should the CSS be added?',
          choices: [
            { name: 'Inline (inside <style> tag)', value: 'inline' },
            { name: 'Separate file', value: 'separate' },
            { name: 'Skip (I\'ll add it manually)', value: 'skip' }
          ],
          default: 'inline'
        },
        {
          type: 'list',
          name: 'scriptMode',
          message: 'How should the JavaScript be added?',
          choices: [
            { name: 'Inline (inside <script> tag)', value: 'inline' },
            { name: 'Separate file', value: 'separate' },
            { name: 'Skip (I\'ll add it manually)', value: 'skip' }
          ],
          default: 'inline'
        }
      ]);

      const result = await insertComponent(answers);
      console.log(chalk.green('\n✓ Component inserted successfully!'));
      console.log(chalk.cyan(`  File: ${result.targetFile}`));
      console.log(chalk.cyan(`  Component: ${result.component}`));
      console.log(chalk.cyan(`  CSS: ${result.styleMode}`));
      console.log(chalk.cyan(`  JS: ${result.scriptMode}`));
    } catch (error) {
      console.error(chalk.red('Error inserting component:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available templates')
  .action(() => {
    console.log(chalk.blue('\n📦 Available templates (19):\n'));
    console.log(chalk.yellow('Basic Components:'));
    console.log('  • Button - Styled button component');
    console.log('  • Card - Card component with image and content');
    console.log('  • Form - Form with input fields');
    console.log('  • Navigation - Navigation bar');
    console.log('  • Modal - Modal dialog');
    console.log('  • Footer - Footer section');
    console.log('  • Hero - Hero section with CTA');
    console.log('  • Slider - Image carousel with navigation');
    console.log('  • Table - Data table with search and filtering');
    console.log(chalk.yellow('\nAnimation Templates:'));
    console.log('  • Spinner - 5 loading spinner variations');
    console.log('  • Animated Card - 6 interactive card animations');
    console.log('  • Typing Effect - Text typing animations');
    console.log('  • Fade Gallery - Image gallery with fade effects');
    console.log(chalk.yellow('\nGrid Layouts (CSS Grid):'));
    console.log('  • Grid Layout - CSS Grid examples');
    console.log('  • Masonry Grid - Pinterest-style layout');
    console.log('  • Dashboard Grid - Complete admin dashboard');
    console.log(chalk.yellow('\nFlexbox Layouts:'));
    console.log('  • Flex Layout - Flexbox patterns and examples');
    console.log('  • Flex Cards - Equal-height card layouts');
    console.log('  • Flex Dashboard - Admin dashboard with Flexbox');
    console.log('');
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
