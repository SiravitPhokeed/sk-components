/**
 * PostCSS plugin that wraps all root-level CSS content in a named `@layer`.
 *
 * This allows consumers (especially Tailwind CSS users) to position the
 * component library’s styles in the cascade layer order so their utility
 * classes can override component styles without `!important`.
 *
 * @param {object} options
 * @param {string} [options.layer='skc'] - Layer name to wrap in
 */
export default function postcssWrapLayer(options = {}) {
  const { layer = "skc" } = options;

  return {
    postcssPlugin: "postcss-wrap-layer",

    OnceExit(root, { AtRule }) {
      // Snapshot current root children before we mutate
      const nodes = root.nodes.slice();
      if (nodes.length === 0) return;

      // Create @layer rule and move all children into it
      const layerRule = new AtRule({ name: "layer", params: layer });
      nodes.forEach((node) => layerRule.append(node));

      root.append(layerRule);
    },
  };
}

// Required for PostCSS 8 plugin detection
postcssWrapLayer.postcss = true;
