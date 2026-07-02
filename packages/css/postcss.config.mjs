import wrapLayer from "./postcss-plugins/wrap-layer.mjs";

const config = {
  plugins: [wrapLayer({ layer: "skc" })],
};

export default config;
