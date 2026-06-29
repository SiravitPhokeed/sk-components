import { readFileSync, readdirSync, writeFileSync } from "fs";
import { resolve } from "path";

const DIST_DIR = resolve("dist");
const COMPONENTS_DIR = resolve("dist/components");

/**
 * Parse `src/components/index.ts` to discover which types each component exports.
 *
 * @returns {Map<string, { name: string, types: string[] }>}
 */
function parseSourceBarrel() {
  const source = readFileSync(resolve("src/components/index.ts"), "utf-8");
  const map = new Map();

  // Match patterns like:
  //   export { Button, type ButtonProps } from "./Button";
  //   export { ThemeProvider } from "./ThemeProvider";
  const regex = /export\s*\{([^}]+)\}\s*from\s*["']\.\/(\w+)["']/g;

  let match;
  while ((match = regex.exec(source)) !== null) {
    const exportsStr = match[1];
    const moduleName = match[2];

    const types = [];
    let componentName = "";

    for (const part of exportsStr.split(",")) {
      const trimmed = part.trim();
      if (trimmed.startsWith("type ")) {
        types.push(trimmed.slice(5).trim());
      } else if (trimmed) {
        componentName = trimmed;
      }
    }

    if (componentName) {
      map.set(moduleName, { name: componentName, types });
    }
  }

  return map;
}

/**
 * Generate barrel files for the compiled components in `dist/components`.
 */
function generateBarrels() {
  const exportsMap = parseSourceBarrel();

  // Get all compiled component JS files
  const jsFiles = readdirSync(COMPONENTS_DIR).filter((f) => f.endsWith(".js"));

  // --- Generate dist/index.js ---
  const jsLines = [];
  for (const jsFile of jsFiles.sort()) {
    const moduleName = jsFile.replace(/\.js$/, "");
    const exp = exportsMap.get(moduleName);
    if (exp) {
      jsLines.push(
        `export { ${exp.name} } from "./components/${moduleName}.js";`,
      );
    }
  }
  writeFileSync(resolve(DIST_DIR, "index.js"), jsLines.join("\n") + "\n");

  // --- Generate dist/index.d.ts ---
  const dtsLines = [];
  for (const jsFile of jsFiles.sort()) {
    const moduleName = jsFile.replace(/\.js$/, "");
    const exp = exportsMap.get(moduleName);
    if (exp) {
      const names = [exp.name, ...exp.types.map((t) => `type ${t}`)].join(", ");
      dtsLines.push(
        `export { ${names} } from "./components/${moduleName}.js";`,
      );
    }
  }
  writeFileSync(resolve(DIST_DIR, "index.d.ts"), dtsLines.join("\n") + "\n");

  console.log(
    `Generated barrel: dist/index.js + dist/index.d.ts (${jsLines.length} components)`,
  );
}

generateBarrels();
