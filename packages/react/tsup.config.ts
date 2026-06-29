import { readdirSync } from "fs";
import { defineConfig } from "tsup";

const components = readdirSync("src/components")
  .filter((file) => file.endsWith(".tsx") && file !== "index.ts")
  .map((file) => `src/components/${file}`);

export default defineConfig({
  entry: [...components, "src/helpers/index.ts", "src/hooks/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  external: ["react", "react-dom", "@tanstack/react-table"],
  esbuildPlugins: [
    {
      name: "externalize-css",
      setup(build) {
        build.onResolve({ filter: /\.css$/ }, () => ({ external: true }));
      },
    },
    {
      name: "externalize-cross-component-imports",
      setup(build) {
        // Keep imports of other components as external (relative) imports
        // instead of inlining them. This preserves "use client" boundaries
        // so that a Server Component can safely import a Client Component.
        build.onResolve(
          { filter: /^@\/components\// },
          ({ path, importer }) => {
            const componentName = path.replace(/^@\/components\//, "");
            // Compute relative path from the importer's output directory
            // to dist/components/ where all built components live.
            let relativePrefix = "./";
            if (importer.includes("/helpers/") || importer.includes("/hooks/")) {
              relativePrefix = "../components/";
            }
            return {
              path: `${relativePrefix}${componentName}.js`,
              external: true,
            };
          },
        );
      },
    },
  ],
});
