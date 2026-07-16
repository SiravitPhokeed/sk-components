import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["md", "mdx", "tsx"],
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
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
    rehypePlugins: [["rehype-pretty-code", { theme: "github-dark" }]],
  },
});

export default withMDX(nextConfig);
