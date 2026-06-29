import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/helpers/index.ts", "src/hooks/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
  esbuildPlugins: [
    {
      name: "externalize-css",
      setup(build) {
        build.onResolve({ filter: /\.css$/ }, () => ({ external: true }));
      },
    },
  ],
});
