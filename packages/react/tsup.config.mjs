import { readdirSync } from "node:fs";
import externalizeCrossComponentImports from "./esbuild-plugins/externalize-cross-component-imports.mjs";
import externalizeCss from "./esbuild-plugins/externalize-css.mjs";
import reactCompiler from "./esbuild-plugins/react-compiler.mjs";

const components = readdirSync("src/components")
  .filter((file) => file.endsWith(".tsx") && file !== "index.ts")
  .map((file) => `src/components/${file}`);

const contexts = readdirSync("src/contexts")
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => `src/contexts/${file}`);

/** @type {import("tsup").Options} */
export default {
  entry: [
    ...components,
    ...contexts,
    "src/helpers/index.ts",
    "src/hooks/index.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  external: ["react", "react-dom", "@tanstack/react-table"],
  esbuildPlugins: [
    externalizeCss,
    externalizeCrossComponentImports,
    reactCompiler,
  ],
};
