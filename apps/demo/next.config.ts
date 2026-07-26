import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
    // Next.js unconditionally includes polyfill-module.js (~14 KiB of ES2019+
    // polyfills) regardless of browserslist. Every browser in our support tiers
    // already has these APIs natively, so we replace it with an empty stub.
    // Remove this alias when Next.js supports browserslist-aware polyfills.
    resolveAlias: {
      // Both paths are needed — Next.js uses the relative path internally
      "../build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
      "next/dist/build/polyfills/polyfill-module":
        "./lib/modern-polyfill.js",
    },
  },
  async redirects() {
    return [
      {
        source: "/example",
        destination: "/examples",
        permanent: true,
      },
      {
        source: "/example/lookup",
        destination: "/examples/search",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/docs/guides/getting-started",
        permanent: false,
      },
    ];
  },
  transpilePackages: [
    "@suankularb-components/react",
    "@suankularb-components/css",
  ],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: {
            dark: "github-dark",
            "dark-high-contrast": "github-dark-high-contrast",
            light: "github-light",
            "light-high-contrast": "github-light-high-contrast",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
