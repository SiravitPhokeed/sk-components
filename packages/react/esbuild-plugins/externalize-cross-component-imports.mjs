/**
 * Keeps cross-component imports as external (relative) imports instead of
 * inlining them, which preserves `"use client"` boundaries so that a Server
 * Component can safely import a Client Component without inlining its hooks.
 *
 * Also externalizes shared context modules so all consumers reference the same
 * context object — without this, esbuild inlines `createContext()` into each
 * consumer, producing separate context identities.
 *
 * @type {import("esbuild").Plugin}
 */
const externalizeCrossComponentImports = {
  name: "externalize-cross-component-imports",
  setup(build) {
    build.onResolve({ filter: /^@\/components\// }, ({ path, importer }) => {
      const componentName = path.replace(/^@\/components\//, "");
      let relativePrefix = "./";
      if (importer.includes("/helpers/") || importer.includes("/hooks/")) {
        relativePrefix = "../components/";
      }
      return {
        path: `${relativePrefix}${componentName}.js`,
        external: true,
      };
    });

    build.onResolve({ filter: /^@\/contexts\// }, ({ path }) => {
      const contextName = path.replace(/^@\/contexts\//, "");
      return {
        path: `../contexts/${contextName}.js`,
        external: true,
      };
    });
  },
};

export default externalizeCrossComponentImports;
