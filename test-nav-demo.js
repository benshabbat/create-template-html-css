const { generateTemplate } = require("./src/generator");

async function demo() {
  console.log("Creating navigation with custom items: Home, Reviews, Products, Contact\n");
  
  const options = {
    component: "navigation",
    name: "my-custom-nav",
    includeJs: true,
    navItems: "Home, Reviews, Products, Contact"
  };
  
  await generateTemplate(options);
  console.log("\n✓ Navigation created successfully!");
  console.log("  Check the folder: my-custom-nav/");
}

demo().catch(console.error);
