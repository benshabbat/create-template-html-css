#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { COLOR_SCHEMES } from "../src/generator.js";
import { createCommand } from "./commands/create.js";
import { insertCommand } from "./commands/insert.js";
import { listCommand } from "./commands/list.js";
import { galleryCommand } from "./commands/gallery.js";

program
  .name("create-template")
  .description(chalk.cyan("🎨 Create HTML/CSS/React UI component templates in seconds"))
  .version("2.0.4");

// Help message
program.on("--help", () => {
  console.log("\n" + chalk.cyan("Examples:"));
  console.log("  $ create-template create                    # Interactive mode");
  console.log("  $ create-template create -c button -n my-btn # With flags");
  console.log("  $ create-template create --react -c button -n my-btn # React component");
  console.log("  $ create-template create -c card --dark-mode --color-scheme vibrant");
  console.log("  $ create-template insert                     # Interactive mode");
  console.log("  $ create-template insert -f index.html -c card -s separate");
  console.log("  $ create-template list                       # List all templates");
  console.log("  $ create-template gallery                    # Open gallery\n");
  
  console.log(chalk.yellow("Available Color Schemes:"));
  Object.entries(COLOR_SCHEMES).forEach(([key, scheme]) => {
    console.log(`  ${key.padEnd(12)} - ${scheme.description}`);
  });
  console.log("");
});

// Create command
program
  .command("create")
  .description(chalk.green("Create a new HTML/CSS template component"))
  .option("-c, --component <type>", "Component type (button, card, form, etc.)")
  .option("-n, --name <name>", "Component name/project name")
  .option("-r, --react", "Create React component instead of HTML")
  .option("--component-only", "Create only component folder (React only, no full project)")
  .option("--include-js", "Include JavaScript file", true)
  .option("--no-include-js", "Exclude JavaScript file")
  .option("--dark-mode", "Add dark mode support")
  .option("--lazy-load", "Enable lazy loading with React.lazy() and Suspense (React only)")
  .option("--optimize-build", "Enable build optimizations and code splitting (React only)")
  .option("--primary-color <color>", "Primary color (hex: #667eea)")
  .option("--secondary-color <color>", "Secondary color (hex: #764ba2)")
  .option("--color-scheme <scheme>", "Color scheme preset")
  .option("-v, --verbose", "Verbose output")
  .action(createCommand);

// Insert command
program
  .command("insert")
  .description(chalk.green("Insert a component into an existing HTML page"))
  .option("-f, --file <path>", "Path to the HTML file")
  .option("-c, --component <type>", "Component type to insert")
  .option("-s, --script <mode>", "Script mode (inline, separate, skip)")
  .option("--style <mode>", "Style mode (inline, separate, skip)")
  .option("-b, --backup", "Create backup of original file")
  .option("-v, --verbose", "Verbose output")
  .action(insertCommand);

// List command
program
  .command("list")
  .description(chalk.green("List all available templates"))
  .action(listCommand);

// Gallery command
program
  .command("gallery")
  .description(chalk.magenta("🎨 Open interactive component gallery"))
  .action(galleryCommand);

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log("\n" + chalk.cyan("🎨 Create HTML/CSS/React UI Templates\n"));
  console.log(chalk.white("Usage: create-template [command] [options]") + "\n");
  console.log(chalk.yellow("Commands:"));
  console.log("  create    Create a new template component (HTML or React)");
  console.log("  insert    Insert component into existing HTML file");
  console.log("  list      Show all available templates");
  console.log("  gallery   Open interactive component gallery");
  console.log("  help      Display help information\n");
  console.log(chalk.gray("Interactive Examples:"));
  console.log("  $ create-template create        # Create with prompts");
  console.log("  $ create-template insert        # Insert with prompts");
  console.log("  $ create-template gallery       # View all components");
  console.log("  $ create-template list          # View all 46 templates\n");
  console.log(chalk.gray("Flag Examples:"));
  console.log("  $ create-template create -c button -n my-btn");
  console.log("  $ create-template create --react -c counter -n my-counter");
  console.log("  $ create-template insert -f index.html -c card -s separate");
  console.log("  $ create-template --help        # Show full help\n");
}
