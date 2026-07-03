import wrapLayer from "./postcss-plugins/wrap-layer.mjs";
import cssnano from "cssnano";

const config = {
  plugins: [
    wrapLayer({ layer: "skc" }),
    cssnano({
      preset: [
        "default",
        {
          discardComments: { removeAll: true },
          normalizeWhitespace: false,
        },
      ],
    }),
  ],
};

export default config;
