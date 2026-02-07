/**
 * Insert command implementation
 */
import inquirer from "inquirer";
import path from "path";
import { promises as fs } from "fs";
import chalk from "chalk";
import { insertComponent } from "../../src/inserter.js";
import { COMPONENT_CHOICES } from "../../src/component-choices.js";

async function insertCommand(options) {
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
      console.log(chalk.gray(`    Component: ${chalk.bold(result.component)}`));
      console.log(chalk.gray(`    CSS: ${chalk.yellow("external file")}`));
      console.log(chalk.gray(`    JS: ${chalk.yellow(result.scriptMode)}`));
      console.log(
        chalk.gray(
          `\n    Component IDs: ${result.component}-styles, ${result.component}-script`,
        ),
      );
      console.log("");
      return;
    }

    // Interactive mode
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
        choices: COMPONENT_CHOICES,
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
}

export { insertCommand };
