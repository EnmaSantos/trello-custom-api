import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const inputArg = process.argv[2];
const inputPath = inputArg
  ? path.isAbsolute(inputArg)
    ? inputArg
    : path.join(projectRoot, inputArg)
  : path.join(projectRoot, "Testing API Library.json");
const inputLabel = path.basename(inputPath);

const raw = fs.readFileSync(inputPath, "utf8");
const data = JSON.parse(raw);

if (!data.files || !Array.isArray(data.files)) {
  throw new Error('Expected top-level "files" array');
}

for (const f of data.files) {
  let outName = f.name;
  if (f.type === "json" && outName === "appsscript") {
    outName = "appsscript.json";
  } else if (f.type === "server_js") {
    if (!outName.endsWith(".gs") && !outName.endsWith(".js")) {
      outName += ".js";
    }
  } else if (f.type === "json" && !outName.endsWith(".json")) {
    outName += ".json";
  }

  const outPath = path.join(projectRoot, outName);
  fs.writeFileSync(outPath, f.source ?? "", "utf8");
  console.log("Wrote", outName);
}

fs.unlinkSync(inputPath);
console.log("Deleted", inputLabel);
