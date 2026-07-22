import { transformAsync } from "@babel/core";
import { readFile } from "node:fs/promises";

/**
 * Runs the React Compiler on `.tsx` source files during the esbuild load
 * phase. The compiler automatically memoizes components and hooks, replacing
 * the need for manual `useMemo`, `useCallback`, and `React.memo`.
 *
 * Uses Babel with only the parser plugins needed for TypeScript + JSX — no
 * presets, no type-stripping (esbuild handles that downstream). Files the
 * compiler cannot analyze are silently skipped (`panicThreshold: "none"`).
 *
 * Targets React 18 for compatibility with both React 18 and 19 consumers.
 * Requires `react-compiler-runtime` as a runtime dependency of the library.
 *
 * @type {import("esbuild").Plugin}
 */
const reactCompiler = {
  name: "react-compiler",
  setup(build) {
    build.onLoad({ filter: /\.tsx$/ }, async (args) => {
      if (args.path.includes("node_modules")) return;

      const source = await readFile(args.path, "utf8");

      try {
        const result = await transformAsync(source, {
          filename: args.path,
          parserOpts: { plugins: ["typescript", "jsx"] },
          plugins: [
            [
              "babel-plugin-react-compiler",
              { target: "18", panicThreshold: "none" },
            ],
          ],
          sourceMaps: false,
          configFile: false,
          babelrc: false,
        });

        return { contents: result.code, loader: "tsx" };
      } catch (e) {
        console.error(`[react-compiler] Skipped ${args.path}: ${e.message}`);
        // Return undefined → fall through to esbuild’s default loader
      }
    });
  },
};

export default reactCompiler;
