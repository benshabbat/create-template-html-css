/**
 * Create command implementation
 */
import inquirer from "inquirer";
import chalk from "chalk";
import { generateTemplate, COLOR_SCHEMES } from "../../src/generator.js";
import { COMPONENT_CHOICES } from "../../src/component-choices.js";

async function createCommand(options) {
  try {
    if (options.verbose) {
      console.log(chalk.gray("[DEBUG] Options:"), options);
    }

    // If flags are provided, use them directly
    if (options.component && options.name) {
      if (options.verbose) {
        console.log(chalk.gray("[INFO] Using provided options..."));
      }

      // Validate name for security
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
      console.log(chalk.gray(`  Component: ${chalk.bold(options.component)}`));
      return;
    }

    // Interactive mode
    console.log(chalk.cyan("\n✨ Creating a new template component...\n"));

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "component",
        message: "What component would you like to create?",
        choices: COMPONENT_CHOICES,
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
}

export { createCommand };
