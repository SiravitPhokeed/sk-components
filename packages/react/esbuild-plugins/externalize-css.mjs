/**
 * Externalizes CSS imports so esbuild doesn't try to bundle `.css` files.
 * The CSS is provided by `@suankularb-components/css` at runtime.
 *
 * @type {import("esbuild").Plugin}
 */
const externalizeCss = {
  name: "externalize-css",
  setup(build) {
    build.onResolve({ filter: /\.css$/ }, () => ({ external: true }));
  },
};

export default externalizeCss;
