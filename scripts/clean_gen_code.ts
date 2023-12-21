import * as fs from "fs";
import * as path from "path";

const file_path = path.join(__dirname, "../src/prompt_parser.js");
if (!fs.existsSync(file_path)) {
  throw new Error("File not found: " + file_path);
}

const replace_items = [
  {
    from: `typeof require !== "undefined" && require("util")`,
    to: "null",
  },
  {
    from: `"ordered_sets": true,`,
    to: "",
  },
  {
    from: `"strict": false,`,
    to: "",
  },
];

let file_content = fs.readFileSync(file_path, "utf-8");

for (const item of replace_items) {
  if (!file_content.includes(item.from)) {
    throw new Error(`File does not contain: ${item.from}`);
  }
  file_content = file_content.replace(item.from, item.to);
}

fs.writeFileSync(file_path, file_content);

console.log(`Cleaned: ${file_path}`);
