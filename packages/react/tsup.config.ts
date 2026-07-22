import { readdirSync } from "fs";
import { defineConfig } from "tsup";

const components = readdirSync("src/components")
  .filter((file) => file.endsWith(".tsx") && file !== "index.ts")
  .map((file) => `src/components/${file}`);

const contexts = readdirSync("src/contexts")
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => `src/contexts/${file}`);

export default defineConfig({
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
        // instead of inlining them. This preserves "use client" boundaries so
        // that a Server Component can safely import a Client Component.
        build.onResolve(
          { filter: /^@\/components\// },
          ({ path, importer }) => {
            const componentName = path.replace(/^@\/components\//, "");
            let relativePrefix = "./";
            if (
              importer.includes("/helpers/") ||
              importer.includes("/hooks/")
            ) {
              relativePrefix = "../components/";
            }
            return {
              path: `${relativePrefix}${componentName}.js`,
              external: true,
            };
          },
        );

        // Contexts are shared modules — keep them external so all consumers
        // reference the same context object. dist/contexts/ is a sibling of
        // dist/components/ and dist/helpers/ etc.
        build.onResolve({ filter: /^@\/contexts\// }, ({ path }) => {
          const contextName = path.replace(/^@\/contexts\//, "");
          return {
            path: `../contexts/${contextName}.js`,
            external: true,
          };
        });
      },
    },
  ],
});
