/**
 * Gallery command implementation
 */
import path from "path";
import { exec } from "child_process";
import chalk from "chalk";
import { getDirname } from "../../src/utils/path-utils.js";

const __dirname = getDirname(import.meta.url);

function galleryCommand() {
  try {
    const galleryPath = path.join(__dirname, "..", "..", "COMPONENTS-GALLERY.html");
    const fileUrl = `file:///${galleryPath.replace(/\\/g, "/")}`;
    
    console.log(chalk.cyan("\n🎨 Opening Component Gallery...\n"));
    
    // Cross-platform: open file in default browser
    let command;
    if (process.platform === "win32") {
      command = `start "" "${galleryPath}"`;
    } else if (process.platform === "darwin") {
      command = `open "${galleryPath}"`;
    } else {
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
}

export { galleryCommand };
