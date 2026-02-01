#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer").default || require("inquirer");
const path = require("path");
const fs = require("fs").promises;
const { generateTemplate } = require("../src/generator");
const { insertComponent } = require("../src/inserter");
const chalk = require("chalk");

program
  .name("create-template")
  .description(
    chalk.cyan("🎨 Create HTML/CSS UI component templates in seconds"),
  )
  .version("1.7.0");

// Add intro message
program.on("--help", () => {
  console.log("\n" + chalk.cyan("Examples:"));
  console.log(
    "  $ create-template create                    # Interactive mode",
  );
  console.log("  $ create-template create -c button -n my-btn # With flags");
  console.log(
    "  $ create-template insert                     # Interactive mode",
  );
  console.log(
    "  $ create-template insert -f index.html -c card -s separate # With flags",
  );
  console.log(
    "  $ create-template insert -f page.html -c button --backup # With backup",
  );
  console.log(
    "  $ create-template list                       # List all templates",
  );
  console.log("");
  console.log(chalk.yellow("Create Command Flags:"));
  console.log(
    "  -c, --component <type>     Component type (button, card, form, etc.)",
  );
  console.log("  -n, --name <name>          Project/component name");
  console.log(
    "  --include-js               Include JavaScript file (default: true)",
  );
  console.log("  --no-include-js            Exclude JavaScript file");
  console.log("  -v, --verbose              Show detailed output");
  console.log("");
  console.log(chalk.yellow("Insert Command Flags:"));
  console.log("  -f, --file <path>          Path to HTML file");
  console.log("  -c, --component <type>     Component type to insert");
  console.log(
    "  -s, --script <mode>        Script mode (inline, separate, skip)",
  );
  console.log(
    "  --style <mode>             Style mode (inline, separate, skip)",
  );
  console.log("  -b, --backup               Create backup before insertion");
  console.log("  -v, --verbose              Show detailed output");
  console.log("");
});

program
  .command("create")
  .description(chalk.green("Create a new HTML/CSS template component"))
  .option("-c, --component <type>", "Component type (button, card, form, etc.)")
  .option("-n, --name <name>", "Component name/project name")
  .option("--include-js", "Include JavaScript file", true)
  .option("--no-include-js", "Exclude JavaScript file")
  .option("-v, --verbose", "Verbose output")
  .action(async (options) => {
    try {
      if (options.verbose) {
        console.log(chalk.gray("[DEBUG] Options:"), options);
      }

      // If flags are provided, use them directly
      if (options.component && options.name) {
        if (options.verbose) {
          console.log(chalk.gray("[INFO] Using provided options..."));
        }

        const createOptions = {
          component: options.component,
          name: options.name,
          includeJs: options.includeJs,
        };

        await generateTemplate(createOptions);

        console.log("\n" + chalk.green("✓ Template created successfully!"));
        console.log(chalk.gray(`  Location: ./${options.name}/`));
        console.log(chalk.gray(`  Structure:`));
        console.log(chalk.gray(`    index.html`));
        console.log(chalk.gray(`    css/`));
        console.log(chalk.gray(`      └── style.css`));
        if (options.includeJs) {
          console.log(chalk.gray(`    js/`));
          console.log(chalk.gray(`      └── script.js`));
        }
        console.log("");
        return;
      }

      // Otherwise, use interactive mode
      console.log(chalk.cyan("\n✨ Creating a new template component...\n"));

      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "component",
          message: "What component would you like to create?",
          choices: [
            new inquirer.Separator(chalk.gray("─ Basic Components")),
            { name: "Button", value: "button" },
            { name: "Card", value: "card" },
            { name: "Form", value: "form" },
            { name: "Navigation", value: "navigation" },
            { name: "Modal", value: "modal" },
            { name: "Footer", value: "footer" },
            { name: "Hero Section", value: "hero" },
            { name: "Slider", value: "slider" },
            { name: "Table", value: "table" },
            new inquirer.Separator(chalk.gray("─ Animation Templates")),
            { name: "Spinner (Loading Animations)", value: "spinner" },
            {
              name: "Animated Card (Interactive Cards)",
              value: "animated-card",
            },
            { name: "Typing Effect (Text Animations)", value: "typing-effect" },
            { name: "Fade Gallery (Image Gallery)", value: "fade-gallery" },
            new inquirer.Separator(chalk.gray("─ Grid Layouts (CSS Grid)")),
            { name: "Grid Layout", value: "grid-layout" },
            { name: "Masonry Grid (Pinterest-style)", value: "masonry-grid" },
            { name: "Dashboard Grid (Admin Panel)", value: "dashboard-grid" },
            new inquirer.Separator(chalk.gray("─ Flexbox Layouts")),
            { name: "Flex Layout (Flexbox Patterns)", value: "flex-layout" },
            { name: "Flex Cards (Equal-height cards)", value: "flex-cards" },
            { name: "Flex Dashboard (Flexbox Admin)", value: "flex-dashboard" },
            new inquirer.Separator(chalk.gray("─ DOM Manipulation Examples")),
            { name: "Todo List (Add/Remove Items)", value: "todo-list" },
            { name: "Counter (Click Handlers)", value: "counter" },
            { name: "Accordion (Toggle Content)", value: "accordion" },
            { name: "Tabs (Switch Sections)", value: "tabs" },
          ],
        },
        {
          type: "input",
          name: "name",
          message: "Enter a name for your component:",
          default: (answers) => answers.component,
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return "Please enter a valid name";
            }
            if (
              input.includes("..") ||
              input.includes("/") ||
              input.includes("\\")
            ) {
              return "Name cannot contain path separators or parent directory references";
            }
            if (input.length > 100) {
              return "Name is too long (max 100 characters)";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "navItems",
          message: "Enter navigation items (comma-separated):",
          default: "Home, About, Services, Portfolio, Contact",
          when: (answers) => answers.component === "navigation",
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return "Please enter at least one navigation item";
            }
            return true;
          },
        },
        {
          type: "checkbox",
          name: "formFields",
          message: "Select form fields to include:",
          choices: [
            { name: "Name", value: "name", checked: true },
            { name: "Email", value: "email", checked: true },
            { name: "Phone", value: "phone", checked: false },
            { name: "Subject", value: "subject", checked: false },
            { name: "Message", value: "message", checked: true },
            { name: "Terms Checkbox", value: "terms", checked: false },
          ],
          when: (answers) => answers.component === "form",
          validate: (input) => {
            if (input.length === 0) {
              return "Please select at least one form field";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "customFormFields",
          message: "Add custom fields (format: type:label, e.g., 'text:Age, url:Website'):",
          when: (answers) => answers.component === "form",
          default: "",
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return true; // Optional field
            }
            // Basic validation for format
            const fields = input.split(',');
            for (const field of fields) {
              const trimmed = field.trim();
              if (trimmed && !trimmed.includes(':')) {
                return "Invalid format. Use 'type:label' (e.g., 'text:Age, url:Website')";
              }
            }
            return true;
          },
        },
      ]);

      // Always include JavaScript file
      answers.includeJs = true;

      await generateTemplate(answers);

      console.log("\n" + chalk.green("✓ Template created successfully!"));
      console.log(chalk.gray(`  Location: ./${answers.name}/`));
      console.log(chalk.gray(`  Structure:`));
      console.log(chalk.gray(`    index.html`));
      console.log(chalk.gray(`    css/`));
      console.log(chalk.gray(`      └── style.css`));
      if (answers.includeJs) {
        console.log(chalk.gray(`    js/`));
        console.log(chalk.gray(`      └── script.js`));
      }
      console.log("");
    } catch (error) {
      console.error(chalk.red("✗ Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("insert")
  .description(chalk.green("Insert a component into an existing HTML page"))
  .option("-f, --file <path>", "Path to the HTML file")
  .option("-c, --component <type>", "Component type to insert")
  .option("-s, --script <mode>", "Script mode (inline, separate, skip)")
  .option("--style <mode>", "Style mode (inline, separate, skip)")
  .option("-b, --backup", "Create backup of original file")
  .option("-v, --verbose", "Verbose output")
  .action(async (options) => {
    try {
      if (options.verbose) {
        console.log(chalk.gray("[DEBUG] Options:"), options);
      }

      // If flags are provided, use them directly
      if (options.file && options.component) {
        if (options.verbose) {
          console.log(chalk.gray("[INFO] Using provided options..."));
        }

        const insertOptions = {
          targetFile: options.file,
          component: options.component,
          scriptMode: options.script || "separate",
          styleMode: "separate",
          createBackup: options.backup || false,
        };

        const result = await insertComponent(insertOptions);

        console.log("\n" + chalk.green("✓ Component inserted successfully!"));
        console.log(chalk.cyan("  Summary:"));
        console.log(
          chalk.gray(
            `    File: ${path.relative(process.cwd(), result.targetFile)}`,
          ),
        );
        console.log(
          chalk.gray(`    Component: ${chalk.bold(result.component)}`),
        );
        console.log(chalk.gray(`    CSS: ${chalk.yellow("external file")}`));
        console.log(chalk.gray(`    JS: ${chalk.yellow(result.scriptMode)}`));
        console.log(
          chalk.gray(
            `\n    Component IDs: ${result.component}-styles, ${result.component}-script`,
          ),
        );
        if (result.backupPath) {
          console.log(
            chalk.gray(
              `    Backup: ${chalk.yellow(path.relative(process.cwd(), result.backupPath))}`,
            ),
          );
        }
        console.log("");
        return;
      }

      // Otherwise, use interactive mode
      console.log(chalk.cyan("\n🚀 Inserting component into HTML file...\n"));

      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "targetFile",
          message: "Enter the path to your HTML file:",
          default: "index.html",
          validate: async (input) => {
            if (!input || input.trim().length === 0) {
              return "Please enter a file path";
            }
            if (!input.toLowerCase().endsWith(".html")) {
              return "File must be an HTML file (.html)";
            }

            // Check if file exists
            try {
              await fs.access(path.resolve(process.cwd(), input));
              return true;
            } catch {
              return `File not found: ${input}`;
            }
          },
        },
        {
          type: "list",
          name: "component",
          message: "Which component would you like to insert?",
          choices: [
            new inquirer.Separator(chalk.gray("─ Basic Components")),
            { name: "Button", value: "button" },
            { name: "Card", value: "card" },
            { name: "Form", value: "form" },
            { name: "Navigation", value: "navigation" },
            { name: "Modal", value: "modal" },
            { name: "Footer", value: "footer" },
            { name: "Hero Section", value: "hero" },
            { name: "Slider", value: "slider" },
            { name: "Table", value: "table" },
            new inquirer.Separator(chalk.gray("─ Animation Templates")),
            { name: "Spinner", value: "spinner" },
            { name: "Animated Card", value: "animated-card" },
            { name: "Typing Effect", value: "typing-effect" },
            { name: "Fade Gallery", value: "fade-gallery" },
            new inquirer.Separator(chalk.gray("─ Grid Layouts")),
            { name: "Grid Layout", value: "grid-layout" },
            { name: "Masonry Grid", value: "masonry-grid" },
            { name: "Dashboard Grid", value: "dashboard-grid" },
            new inquirer.Separator(chalk.gray("─ Flexbox Layouts")),
            { name: "Flex Layout", value: "flex-layout" },
            { name: "Flex Cards", value: "flex-cards" },
            { name: "Flex Dashboard", value: "flex-dashboard" },
            new inquirer.Separator(chalk.gray("─ DOM Manipulation")),
            { name: "Todo List", value: "todo-list" },
            { name: "Counter", value: "counter" },
            { name: "Accordion", value: "accordion" },
            { name: "Tabs", value: "tabs" },
          ],
        },
        {
          type: "list",
          name: "scriptMode",
          message: "How should the JavaScript be added?",
          choices: [
            { name: "Separate file (recommended)", value: "separate" },
            { name: "Inline (inside <script> tag)", value: "inline" },
            { name: "Skip (I'll add it manually)", value: "skip" },
          ],
          default: "separate",
        },
      ]);

      // CSS is always separate (external)
      answers.styleMode = "separate";

      const result = await insertComponent(answers);

      console.log("\n" + chalk.green("✓ Component inserted successfully!"));
      console.log(chalk.cyan("  Summary:"));
      console.log(
        chalk.gray(
          `    File: ${path.relative(process.cwd(), result.targetFile)}`,
        ),
      );
      console.log(chalk.gray(`    Component: ${chalk.bold(result.component)}`));
      console.log(chalk.gray(`    CSS: ${chalk.yellow("external file")}`));
      console.log(chalk.gray(`    JS: ${chalk.yellow(result.scriptMode)}`));
      console.log(
        chalk.gray(
          `\n    Component IDs: ${result.component}-styles, ${result.component}-script`,
        ),
      );
      console.log("");
    } catch (error) {
      console.error("\n" + chalk.red("✗ Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("list")
  .description(chalk.green("List all available templates"))
  .action(() => {
    console.log("\n" + chalk.blue("📦 Available Components (23 total)\n"));

    console.log(chalk.yellow("━ Basic Components (9)"));
    console.log("  button          Styled button component");
    console.log("  card            Card component with image and content");
    console.log("  form            Form with input fields and validation");
    console.log("  navigation      Responsive navigation bar");
    console.log("  modal           Modal dialog component");
    console.log("  footer          Footer section");
    console.log("  hero            Hero section with CTA button");
    console.log("  slider          Image carousel with navigation");
    console.log("  table           Data table with search and filtering");

    console.log("\n" + chalk.magenta("━ Animation Templates (4)"));
    console.log("  spinner         5 loading spinner variations");
    console.log("  animated-card   6 interactive card animations");
    console.log("  typing-effect   Text typing animations");
    console.log("  fade-gallery    Image gallery with fade effects");

    console.log("\n" + chalk.cyan("━ Grid Layouts (3)"));
    console.log("  grid-layout     CSS Grid patterns and examples");
    console.log("  masonry-grid    Pinterest-style masonry layout");
    console.log("  dashboard-grid  Complete admin dashboard (Grid)");

    console.log("\n" + chalk.green("━ Flexbox Layouts (3)"));
    console.log("  flex-layout     Flexbox patterns and examples");
    console.log("  flex-cards      Equal-height card layouts");
    console.log("  flex-dashboard  Complete admin dashboard (Flexbox)");

    console.log("\n" + chalk.red("━ DOM Manipulation Examples (4)"));
    console.log("  todo-list       Interactive todo list with add/remove");
    console.log("  counter         Click counter with history tracking");
    console.log("  accordion       Collapsible accordion component");
    console.log("  tabs            Tabbed content switcher");

    console.log("\n" + chalk.gray("Usage:"));
    console.log("  create-template create              Create a new component");
    console.log("  create-template insert              Insert into HTML file");
    console.log("");
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log("\n" + chalk.cyan("🎨 Create HTML/CSS UI Templates\n"));
  console.log(chalk.white("Usage: create-template [command] [options]") + "\n");
  console.log(chalk.yellow("Commands:"));
  console.log("  create    Create a new template component");
  console.log("  insert    Insert component into existing HTML file");
  console.log("  list      Show all available templates");
  console.log("  help      Display help information\n");
  console.log(chalk.gray("Interactive Examples:"));
  console.log("  $ create-template create        # Create with prompts");
  console.log("  $ create-template insert        # Insert with prompts");
  console.log("  $ create-template list          # View all 23 templates\n");
  console.log(chalk.gray("Flag Examples (Non-interactive):"));
  console.log("  $ create-template create -c button -n my-btn");
  console.log("  $ create-template insert -f index.html -c card -s separate");
  console.log("  $ create-template --help        # Show full help\n");
}
