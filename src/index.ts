import fs from "fs/promises";
import path from "path";

import { compiler, interpreter } from "./compiler";

async function main() {
  let args = process.argv.slice(2);
  let run = false;

  if (args.includes("--run")) {
    run = true;
    args = args.filter((arg) => arg !== "--run");
  }

  if (!args.length) {
    throw new Error("No input file provided");
  }

  const fileName = args[0]!;
  let input = "";

  try {
    input = await fs.readFile(fileName, "utf-8");
  } catch (error) {
    console.error(`Unable to access file: ${fileName}`);
    throw error;
  }

  const output = compiler(input);

  if (run) {
    console.log("🪄 Executing the code..");
    interpreter(output);
  } else {
    const srcFile = path.parse(fileName);
    const destDir = path.join(__dirname, "..", "dist");

    try {
      await fs.mkdir(destDir);
      console.log(`🚨 Created a new directory "${destDir}".`);
    } catch (error) {
      console.log(`🚨 The directory "${destDir}" already exists.`);
    }

    const destFile = path.join(destDir, `${srcFile.name}.js`);

    await fs.writeFile(destFile, output);
  }
}

main();
