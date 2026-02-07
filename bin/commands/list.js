/**
 * List command implementation
 */
import chalk from "chalk";

function listCommand() {
  console.log("\n" + chalk.blue("📦 Available Components (46 total)\n"));

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

  console.log("\n" + chalk.green("━ Interactive Games (16)"));
  console.log("  tic-tac-toe     Classic Tic-Tac-Toe game with score tracking");
  console.log("  memory-game     Memory card matching game with difficulty levels");
  console.log("  snake-game      Classic Snake game with keyboard controls");
  console.log("  guess-number    Number guessing game with hints and scoring");
  console.log("  game-2048       2048 puzzle game with touch & keyboard controls");
  console.log("  whack-a-mole    Whack-A-Mole arcade game with difficulty levels");
  console.log("  simon-says      Simon Says memory pattern game");
  console.log("  rock-paper-scissors  Rock Paper Scissors vs AI");
  console.log("  breakout        Brick breaker arcade game with levels");
  console.log("  tetris          Classic Tetris with piece preview");
  console.log("  flappy-bird     Flappy Bird obstacle avoidance game");
  console.log("  connect-four    Connect 4 strategy game vs AI");
  console.log("  blackjack       Blackjack card game with betting");
  console.log("  slot-machine    3-reel slot machine with jackpots");
  console.log("  dice-game       Dice race to 100 strategy game");
  console.log("  pong            Classic Pong paddle game vs AI");

  console.log("\n" + chalk.gray("Usage:"));
  console.log("  create-template create              Create a new component");
  console.log("  create-template insert              Insert into HTML file");
  console.log("");
}

export { listCommand };
