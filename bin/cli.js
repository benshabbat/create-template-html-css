#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer').default || require('inquirer');
const path = require('path');
const fs = require('fs').promises;
const { generateTemplate } = require('../src/generator');
const { insertComponent } = require('../src/inserter');
const chalk = require('chalk');

program
  .name('create-template')
  .description(chalk.cyan('🎨 Create HTML/CSS UI component templates in seconds'))
  .version('1.5.0');

// Add intro message
program.on('--help', () => {
  console.log('\n' + chalk.cyan('Examples:'));
  console.log('  $ create-template create        # Create a new template');
  console.log('  $ create-template insert        # Insert into existing HTML');
  console.log('  $ create-template list          # List all templates');
  console.log('');
});

program
  .command('create')
  .description(chalk.green('Create a new HTML/CSS template component'))
  .action(async () => {
    try {
      console.log(chalk.cyan('\n✨ Creating a new template component...\n'));
      
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'component',
          message: 'What component would you like to create?',
          choices: [
            new inquirer.Separator(chalk.gray('─ Basic Components')),
            { name: 'Button', value: 'button' },
            { name: 'Card', value: 'card' },
            { name: 'Form', value: 'form' },
            { name: 'Navigation', value: 'navigation' },
            { name: 'Modal', value: 'modal' },
            { name: 'Footer', value: 'footer' },
            { name: 'Hero Section', value: 'hero' },
            { name: 'Slider', value: 'slider' },
            { name: 'Table', value: 'table' },
            new inquirer.Separator(chalk.gray('─ Animation Templates')),
            { name: 'Spinner (Loading Animations)', value: 'spinner' },
            { name: 'Animated Card (Interactive Cards)', value: 'animated-card' },
            { name: 'Typing Effect (Text Animations)', value: 'typing-effect' },
            { name: 'Fade Gallery (Image Gallery)', value: 'fade-gallery' },
            new inquirer.Separator(chalk.gray('─ Grid Layouts (CSS Grid)')),
            { name: 'Grid Layout', value: 'grid-layout' },
            { name: 'Masonry Grid (Pinterest-style)', value: 'masonry-grid' },
            { name: 'Dashboard Grid (Admin Panel)', value: 'dashboard-grid' },
            new inquirer.Separator(chalk.gray('─ Flexbox Layouts')),
            { name: 'Flex Layout (Flexbox Patterns)', value: 'flex-layout' },
            { name: 'Flex Cards (Equal-height cards)', value: 'flex-cards' },
            { name: 'Flex Dashboard (Flexbox Admin)', value: 'flex-dashboard' },
            new inquirer.Separator(chalk.gray('─ DOM Manipulation Examples')),
            { name: 'Todo List (Add/Remove Items)', value: 'todo-list' },
            { name: 'Counter (Click Handlers)', value: 'counter' },
            { name: 'Accordion (Toggle Content)', value: 'accordion' },
            { name: 'Tabs (Switch Sections)', value: 'tabs' }
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
      ]);

      // Always include JavaScript file
      answers.includeJs = true;

      await generateTemplate(answers);
      
      console.log('\n' + chalk.green('✓ Template created successfully!'));
      console.log(chalk.gray(`  Location: ./${answers.name}/`));
      console.log(chalk.gray(`  Files: index.html, style.css${answers.includeJs ? ', script.js' : ''}`));
      console.log('');
    } catch (error) {
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('insert')
  .description(chalk.green('Insert a component into an existing HTML page'))
  .action(async () => {
    try {
      console.log(chalk.cyan('\n🚀 Inserting component into HTML file...\n'));
      
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'targetFile',
          message: 'Enter the path to your HTML file:',
          default: 'index.html',
          validate: async (input) => {
            if (!input || input.trim().length === 0) {
              return 'Please enter a file path';
            }
            if (!input.toLowerCase().endsWith('.html')) {
              return 'File must be an HTML file (.html)';
            }
            
            // Check if file exists
            try {
              await fs.access(path.resolve(process.cwd(), input));
              return true;
            } catch {
              return `File not found: ${input}`;
            }
          }
        },
        {
          type: 'list',
          name: 'component',
          message: 'Which component would you like to insert?',
          choices: [
            new inquirer.Separator(chalk.gray('─ Basic Components')),
            { name: 'Button', value: 'button' },
            { name: 'Card', value: 'card' },
            { name: 'Form', value: 'form' },
            { name: 'Navigation', value: 'navigation' },
            { name: 'Modal', value: 'modal' },
            { name: 'Footer', value: 'footer' },
            { name: 'Hero Section', value: 'hero' },
            { name: 'Slider', value: 'slider' },
            { name: 'Table', value: 'table' },
            new inquirer.Separator(chalk.gray('─ Animation Templates')),
            { name: 'Spinner', value: 'spinner' },
            { name: 'Animated Card', value: 'animated-card' },
            { name: 'Typing Effect', value: 'typing-effect' },
            { name: 'Fade Gallery', value: 'fade-gallery' },
            new inquirer.Separator(chalk.gray('─ Grid Layouts')),
            { name: 'Grid Layout', value: 'grid-layout' },
            { name: 'Masonry Grid', value: 'masonry-grid' },
            { name: 'Dashboard Grid', value: 'dashboard-grid' },
            new inquirer.Separator(chalk.gray('─ Flexbox Layouts')),
            { name: 'Flex Layout', value: 'flex-layout' },
            { name: 'Flex Cards', value: 'flex-cards' },
            { name: 'Flex Dashboard', value: 'flex-dashboard' },
            new inquirer.Separator(chalk.gray('─ DOM Manipulation')),
            { name: 'Todo List', value: 'todo-list' },
            { name: 'Counter', value: 'counter' },
            { name: 'Accordion', value: 'accordion' },
            { name: 'Tabs', value: 'tabs' }
          ]
        },
        {
          type: 'list',
          name: 'scriptMode',
          message: 'How should the JavaScript be added?',
          choices: [
            { name: 'Separate file (recommended)', value: 'separate' },
            { name: 'Inline (inside <script> tag)', value: 'inline' },
            { name: 'Skip (I\'ll add it manually)', value: 'skip' }
          ],
          default: 'separate'
        }
      ]);

      // CSS is always separate (external)
      answers.styleMode = 'separate';

      const result = await insertComponent(answers);
      
      console.log('\n' + chalk.green('✓ Component inserted successfully!'));
      console.log(chalk.cyan('  Summary:'));
      console.log(chalk.gray(`    File: ${path.relative(process.cwd(), result.targetFile)}`));
      console.log(chalk.gray(`    Component: ${chalk.bold(result.component)}`));
      console.log(chalk.gray(`    CSS: ${chalk.yellow('external file')}`));
      console.log(chalk.gray(`    JS: ${chalk.yellow(result.scriptMode)}`));
      console.log(chalk.gray(`\n    Component IDs: ${result.component}-styles, ${result.component}-script`));
      console.log('');
    } catch (error) {
      console.error('\n' + chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description(chalk.green('List all available templates'))
  .action(() => {
    console.log('\n' + chalk.blue('📦 Available Components (23 total)\n'));
    
    console.log(chalk.yellow('━ Basic Components (9)'));
    console.log('  button          Styled button component');
    console.log('  card            Card component with image and content');
    console.log('  form            Form with input fields and validation');
    console.log('  navigation      Responsive navigation bar');
    console.log('  modal           Modal dialog component');
    console.log('  footer          Footer section');
    console.log('  hero            Hero section with CTA button');
    console.log('  slider          Image carousel with navigation');
    console.log('  table           Data table with search and filtering');
    
    console.log('\n' + chalk.magenta('━ Animation Templates (4)'));
    console.log('  spinner         5 loading spinner variations');
    console.log('  animated-card   6 interactive card animations');
    console.log('  typing-effect   Text typing animations');
    console.log('  fade-gallery    Image gallery with fade effects');
    
    console.log('\n' + chalk.cyan('━ Grid Layouts (3)'));
    console.log('  grid-layout     CSS Grid patterns and examples');
    console.log('  masonry-grid    Pinterest-style masonry layout');
    console.log('  dashboard-grid  Complete admin dashboard (Grid)');
    
    console.log('\n' + chalk.green('━ Flexbox Layouts (3)'));
    console.log('  flex-layout     Flexbox patterns and examples');
    console.log('  flex-cards      Equal-height card layouts');
    console.log('  flex-dashboard  Complete admin dashboard (Flexbox)');
    
    console.log('\n' + chalk.red('━ DOM Manipulation Examples (4)'));
    console.log('  todo-list       Interactive todo list with add/remove');
    console.log('  counter         Click counter with history tracking');
    console.log('  accordion       Collapsible accordion component');
    console.log('  tabs            Tabbed content switcher');
    
    console.log('\n' + chalk.gray('Usage:'));
    console.log('  create-template create              Create a new component');
    console.log('  create-template insert              Insert into HTML file');
    console.log('');
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log('\n' + chalk.cyan('🎨 Create HTML/CSS UI Templates\n'));
  console.log(chalk.white('Usage: create-template [command]') + '\n');
  console.log(chalk.yellow('Commands:'));
  console.log('  create    Create a new template component');
  console.log('  insert    Insert component into existing HTML file');
  console.log('  list      Show all available templates');
  console.log('  help      Display help information\n');
  console.log(chalk.gray('Examples:'));
  console.log('  $ create-template create        # Interactive template creation');
  console.log('  $ create-template insert        # Interactive component insertion');
  console.log('  $ create-template list          # View all 19 templates');
  console.log('  $ create-template --help        # Show full help\n');
}
