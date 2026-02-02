#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer").default || require("inquirer");
const path = require("path");
const fs = require("fs").promises;
const { exec } = require("child_process");
const { generateTemplate, COLOR_SCHEMES } = require("../src/generator");
const { insertComponent } = require("../src/inserter");
const chalk = require("chalk");

program
  .name("create-template")
  .description(
    chalk.cyan("🎨 Create HTML/CSS UI component templates in seconds"),
  )
  .version("1.8.0");

// Add intro message
program.on("--help", () => {
  console.log("\n" + chalk.cyan("Examples:"));
  console.log(
    "  $ create-template create                    # Interactive mode",
  );
  console.log("  $ create-template create -c button -n my-btn # With flags");
  console.log(
    "  $ create-template create -c card --dark-mode --color-scheme vibrant # With preset colors",
  );
  console.log(
    "  $ create-template create -c card --primary-color #FF5733 # With custom colors",
  );
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
  console.log(
    "  $ create-template gallery                    # Open interactive gallery",
  );
  console.log("");
  console.log(chalk.yellow("Available Color Schemes:"));
  Object.entries(COLOR_SCHEMES).forEach(([key, scheme]) => {
    console.log(`  ${key.padEnd(12)} - ${scheme.description}`);
  });
  console.log("");
  console.log(chalk.yellow("Create Command Flags:"));
  console.log(
    "  -c, --component <type>     Component type (button, card, form, etc.)",
  );
  console.log("  -n, --name <name>          Project/component name");
  console.log(
    "  --include-js               Include JavaScript file (default: true)",
  );
  console.log(
    "  --dark-mode                Add dark mode support (prefers-color-scheme)",
  );
  console.log(
    "  --primary-color <hex>      Primary color (e.g., #667eea)",
  );
  console.log(
    "  --secondary-color <hex>    Secondary color (e.g., #764ba2)",
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
  .option("--dark-mode", "Add dark mode support (prefers-color-scheme)")
  .option("--primary-color <color>", "Primary color (hex format: #667eea)")
  .option("--secondary-color <color>", "Secondary color (hex format: #764ba2)")
  .option("--color-scheme <scheme>", "Use a color scheme preset (vibrant, pastel, ocean, sunset, forest, purple, minimal, coral, teal, neon)")
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
          darkMode: options.darkMode,
          colorScheme: options.colorScheme,
          primaryColor: options.primaryColor,
          secondaryColor: options.secondaryColor,
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
            new inquirer.Separator(chalk.gray("─ Authentication Forms")),
            { name: "Login Form", value: "login" },
            { name: "Register Form", value: "register" },
            new inquirer.Separator(chalk.gray("─ Loading Placeholders")),
            { name: "Skeleton (Loading Placeholders)", value: "skeleton" },
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
          type: "list",
          name: "buttonVariations",
          message: "Which button variations do you want?",
          choices: [
            { name: "All Buttons (6 variations)", value: "all" },
            { name: "Select Specific Buttons", value: "select" },
          ],
          when: (answers) => answers.component === "button",
        },
        {
          type: "checkbox",
          name: "selectedButtons",
          message: "Select button variations:",
          choices: [
            { name: "Primary Button", value: "primary", checked: true },
            { name: "Secondary Button", value: "secondary", checked: true },
            { name: "Success Button", value: "success", checked: true },
            { name: "Danger Button", value: "danger", checked: true },
            { name: "Outlined Button", value: "outlined", checked: true },
            { name: "Disabled Button", value: "disabled", checked: true },
          ],
          when: (answers) => answers.component === "button" && answers.buttonVariations === "select",
          validate: (input) => {
            if (input.length === 0) {
              return "Please select at least one button variation";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "cardVariations",
          message: "Which card variations do you want?",
          choices: [
            { name: "All Cards (6 variations)", value: "all" },
            { name: "Select Specific Cards", value: "select" },
          ],
          when: (answers) => answers.component === "card",
        },
        {
          type: "checkbox",
          name: "selectedCards",
          message: "Select card variations:",
          choices: [
            { name: "Modern Card (Featured)", value: "modern", checked: true },
            { name: "Premium Card (Price)", value: "premium", checked: true },
            { name: "Blog Card (Tags)", value: "blog", checked: true },
            { name: "Minimal Card", value: "minimal", checked: true },
            { name: "User Profile Card", value: "user", checked: true },
            { name: "Interactive Card", value: "interactive", checked: true },
          ],
          when: (answers) => answers.component === "card" && answers.cardVariations === "select",
          validate: (input) => {
            if (input.length === 0) {
              return "Please select at least one card variation";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "spinnerVariations",
          message: "Which spinner variations do you want?",
          choices: [
            { name: "All Spinners (5 types)", value: "all" },
            { name: "Select Specific Spinners", value: "select" },
          ],
          when: (answers) => answers.component === "spinner",
        },
        {
          type: "checkbox",
          name: "selectedSpinners",
          message: "Select spinner types:",
          choices: [
            { name: "Circle Spinner", value: "circle", checked: true },
            { name: "Bouncing Dots", value: "dots", checked: true },
            { name: "Pulse Loader", value: "pulse", checked: true },
            { name: "Bar Loader", value: "bars", checked: true },
            { name: "Gradient Ring", value: "gradient", checked: true },
          ],
          when: (answers) => answers.component === "spinner" && answers.spinnerVariations === "select",
          validate: (input) => {
            if (input.length === 0) {
              return "Please select at least one spinner type";
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
        {
          type: "confirm",
          name: "darkMode",
          message: "Add dark mode support (prefers-color-scheme)?",
          default: false,
        },
        {
          type: "list",
          name: "colorOption",
          message: "How would you like to choose colors?",
          choices: [
            { name: "Use a preset color scheme", value: "preset" },
            { name: "Enter custom hex colors", value: "custom" },
            { name: "Skip color customization", value: "skip" },
          ],
        },
        {
          type: "list",
          name: "colorScheme",
          message: "Choose a color scheme:",
          choices: Object.entries(COLOR_SCHEMES).map(([key, scheme]) => ({
            name: `${scheme.name} - ${scheme.description}`,
            value: key,
          })),
          when: (answers) => answers.colorOption === "preset",
        },
        {
          type: "input",
          name: "primaryColor",
          message: "Primary color (hex format, e.g., #667eea) [skip for default]:",
          default: "",
          when: (answers) => answers.colorOption === "custom",
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return true; // Optional field
            }
            // Basic hex color validation
            const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (!hexRegex.test(input.trim())) {
              return "Please enter a valid hex color (e.g., #667eea)";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "secondaryColor",
          message: "Secondary color (hex format, e.g., #764ba2) [skip for default]:",
          default: "",
          when: (answers) => answers.colorOption === "custom",
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return true; // Optional field
            }
            // Basic hex color validation
            const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (!hexRegex.test(input.trim())) {
              return "Please enter a valid hex color (e.g., #764ba2)";
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
            new inquirer.Separator(chalk.gray("─ Authentication Forms")),
            { name: "Login Form", value: "login" },
            { name: "Register Form", value: "register" },
            new inquirer.Separator(chalk.gray("─ Loading Placeholders")),
            { name: "Skeleton (Loading Placeholders)", value: "skeleton" },
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
    console.log("\n" + chalk.blue("📦 Available Components (26 total)\n"));

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

    console.log("\n" + chalk.green("━ Authentication Forms (2)"));
    console.log("  login           Login form with validation");
    console.log("  register        Register form with password requirements");

    console.log("\n" + chalk.cyan("━ Loading Placeholders (1)"));
    console.log("  skeleton        Skeleton loading placeholder with shimmer animation");

    console.log("\n" + chalk.magenta("━ Animation Templates (4)"));
    console.log("  spinner         5 loading spinner variations");
    console.log("  animated-card   6 interactive card animations");
    console.log("  typing-effect   Text typing animations");
    console.log("  fade-gallery    Image gallery with fade effects");

    console.log("\n" + chalk.cyan("━ Grid Layouts (3)"));
    console.log("  grid-layout     CSS Grid patterns and examples");
    console.log("  masonry-grid    Pinterest-style masonry layout");
    console.log("  dashboard-grid  Complete admin dashboard (Grid)");

    console.log("\n" + chalk.blue("━ Flexbox Layouts (3)"));
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

program
  .command("gallery")
  .description(chalk.magenta("🎨 Open interactive component gallery in browser"))
  .action(async () => {
    try {
      const galleryPath = path.join(__dirname, "..", "COMPONENTS-GALLERY.html");
      const fileUrl = `file:///${galleryPath.replace(/\\/g, "/")}`;
      
      console.log(chalk.cyan("\n🎨 Opening Component Gallery...\n"));
      
      // Cross-platform: open file in default browser
      let command;
      if (process.platform === "win32") {
        command = `start "" "${galleryPath}"`;
      } else if (process.platform === "darwin") {
        command = `open "${galleryPath}"`;
      } else {
        // Linux and others
        command = `xdg-open "${galleryPath}"`;
      }
      
      exec(command, (error) => {
        if (error) {
          console.error(chalk.red("✗ Could not open gallery:"), error.message);
          console.log(chalk.gray(`Try opening manually: ${galleryPath}`));
        } else {
          console.log(chalk.green("✓ Gallery opened in your browser!"));
          console.log(chalk.gray(`Location: ${galleryPath}\n`));
        }
      });
    } catch (error) {
      console.error(chalk.red("✗ Error:"), error.message);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log("\n" + chalk.cyan("🎨 Create HTML/CSS UI Templates\n"));
  console.log(chalk.white("Usage: create-template [command] [options]") + "\n");
  console.log(chalk.yellow("Commands:"));
  console.log("  create    Create a new template component");
  console.log("  insert    Insert component into existing HTML file");
  console.log("  list      Show all available templates");
  console.log("  gallery   Open interactive component gallery");
  console.log("  help      Display help information\n");
  console.log(chalk.gray("Interactive Examples:"));
  console.log("  $ create-template create        # Create with prompts");
  console.log("  $ create-template insert        # Insert with prompts");
  console.log("  $ create-template gallery       # View all components in gallery");
  console.log("  $ create-template list          # View all 26 templates\n");
  console.log(chalk.gray("Flag Examples (Non-interactive):"));
  console.log("  $ create-template create -c button -n my-btn");
  console.log("  $ create-template insert -f index.html -c card -s separate");
  console.log("  $ create-template --help        # Show full help\n");
}
