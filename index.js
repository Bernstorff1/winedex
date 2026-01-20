const fs = require("fs");

const args = process.argv.slice(2);
const nameIndex = args.indexOf("--name");
const name = nameIndex !== -1 && args[nameIndex + 1] ? args[nameIndex + 1] : null;

if (!name) {
  console.log("Usage: node index.js --name <name>");
  process.exit(1);
}

const template = fs.readFileSync("message.txt", "utf8").trim();
const message = template.replace("{name}", name);
console.log(message);
