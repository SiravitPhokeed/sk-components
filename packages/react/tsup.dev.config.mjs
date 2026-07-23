import externalizeCss from "./esbuild-plugins/externalize-css.mjs";
import reactCompiler from "./esbuild-plugins/react-compiler.mjs";

/** @type {import("tsup").Options} */
export default {
  entry: ["src/index.ts", "src/helpers/index.ts", "src/hooks/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
  esbuildPlugins: [externalizeCss, reactCompiler],
};
