/**
 * Create command implementation
 */
import inquirer from "inquirer";
import chalk from "chalk";
import { generateTemplate, COLOR_SCHEMES } from "../../src/generator.js";
import { generateReactTemplate, addReactComponentOnly } from "../../src/react-generator.js";
import { COMPONENT_CHOICES } from "../../src/component-choices.js";
import { REACT_COMPONENT_CHOICES } from "../../src/react-component-choices.js";

async function createCommand(options) {
  try {
    if (options.verbose) {
      console.log(chalk.gray("[DEBUG] Options:"), options);
    }

    // Determine if React mode is requested
    const isReactMode = options.react || false;

    // If flags are provided, use them directly
    // For component-only mode, name is not required
    if (options.component && (options.name || options.componentOnly)) {
      if (options.verbose) {
        console.log(chalk.gray("[INFO] Using provided options..."));
      }

      // Validate name for security (skip for component-only mode)
      if (!options.componentOnly) {
        if (
          options.name.includes("/") ||
          options.name.includes("\\") ||
          options.name === ".." ||
          options.name.startsWith("../") ||
          options.name.startsWith("..\\") ||
          options.name.includes("/../") ||
          options.name.includes("\\..\\")
        ) {
          console.error(
            chalk.red("✗ Error:"),
            "Name cannot contain path separators or parent directory references"
          );
          process.exit(1);
        }

        if (options.name.length > 100) {
          console.error(chalk.red("✗ Error:"), "Name is too long (max 100 characters)");
          process.exit(1);
        }
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

      if (isReactMode) {
        // Check if component-only mode is enabled (React only)
        if (options.componentOnly) {
          await addReactComponentOnly({
            component: options.component,
            outputDir: process.cwd(),
            colorScheme: options.colorScheme,
            primaryColor: options.primaryColor,
            secondaryColor: options.secondaryColor,
          });
          console.log("\n" + chalk.green("✓ React component added successfully!"));
        } else {
          await generateReactTemplate(createOptions);
          console.log("\n" + chalk.green("✓ React component created successfully!"));
          console.log(chalk.gray(`  Location: ./${options.name}/`));
        }
      } else {
        if (options.componentOnly) {
          console.error(
            chalk.red("✗ Error:"),
            "--component-only flag is only supported for React components (use --react)"
          );
          process.exit(1);
        }
        await generateTemplate(createOptions);
        console.log("\n" + chalk.green("✓ Template created successfully!"));
        console.log(chalk.gray(`  Location: ./${options.name}/`));
      }

      console.log(chalk.gray(`  Component: ${chalk.bold(options.component)}`));
      return;
    }

    // Interactive mode
    console.log(chalk.cyan("\n✨ Creating a new template component...\n"));

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "framework",
        message: "What framework would you like to use?",
        choices: [
          { name: "HTML + CSS + JavaScript (Vanilla)", value: "html" },
          { name: "React (JSX + CSS)", value: "react" },
        ],
        default: "html",
      },
      {
        type: "list",
        name: "projectType",
        message: "What would you like to create?",
        choices: [
          { name: "Full React project (with Vite, package.json, etc.)", value: "full" },
          { name: "Component only (just JSX + CSS files)", value: "component-only" },
        ],
        default: "full",
        when: (answers) => answers.framework === "react",
      },
      {
        type: "list",
        name: "component",
        message: "What component would you like to create?",
        choices: (answers) => 
          answers.framework === "react" ? REACT_COMPONENT_CHOICES : COMPONENT_CHOICES,
      },
      {
        type: "input",
        name: "name",
        message: (answers) => 
          answers.projectType === "component-only" 
            ? "This will create a component folder in the current directory. Continue?"
            : "Enter a name for your component:",
        default: (answers) => 
          answers.projectType === "component-only" ? "yes" : answers.component,
        validate: (input, answers) => {
          if (answers.projectType === "component-only") {
            return true; // Skip validation for component-only
          }
          if (!input || input.trim().length === 0) {
            return "Please enter a valid name";
          }
          if (
            input.includes("/") ||
            input.includes("\\") ||
            input === ".." ||
            input.startsWith("../") ||
            input.startsWith("..\\") ||
            input.includes("/../") ||
            input.includes("\\..\\")
          ) {
            return "Name cannot contain path separators or parent directory references";
          }
          if (input.length > 100) {
            return "Name is too long (max 100 characters)";
          }
          return true;
        },
        when: (answers) => answers.projectType !== "component-only",
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
          if (!input) return true;
          if (!/^#[0-9A-Fa-f]{6}$/.test(input)) {
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
          if (!input) return true;
          if (!/^#[0-9A-Fa-f]{6}$/.test(input)) {
            return "Please enter a valid hex color (e.g., #764ba2)";
          }
          return true;
        },
      },
    ]);

    answers.includeJs = true;

    // Generate template based on framework choice
    if (answers.framework === "react") {
      if (answers.projectType === "component-only") {
        // Add component only (no full project)
        await addReactComponentOnly({
          component: answers.component,
          outputDir: process.cwd(),
          colorScheme: answers.colorScheme,
          primaryColor: answers.primaryColor || undefined,
          secondaryColor: answers.secondaryColor || undefined,
        });

        console.log("\n" + chalk.green("✓ React component added successfully!"));
        console.log(chalk.gray(`  Component created in current directory`));
      } else {
        // Create full React project
        await generateReactTemplate(answers);

        console.log("\n" + chalk.green("✓ React component created successfully!"));
        console.log(chalk.gray(`  Location: ./${answers.name}/`));
        console.log(chalk.gray(`  Structure:`));
        console.log(chalk.gray(`    src/`));
        console.log(chalk.gray(`      ├── components/`));
        console.log(chalk.gray(`      ├── App.jsx`));
        console.log(chalk.gray(`      └── index.jsx`));
        console.log(chalk.gray(`    index.html`));
        console.log(chalk.gray(`    package.json`));
        console.log("");
        console.log(chalk.cyan("📦 Next steps:"));
        console.log(chalk.gray(`  cd ${answers.name}`));
        console.log(chalk.gray(`  npm install`));
        console.log(chalk.gray(`  npm run dev`));
      }
    } else {
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
    }
    console.log("");
  } catch (error) {
    console.error(chalk.red("✗ Error:"), error.message);
    process.exit(1);
  }
}

export { createCommand };
