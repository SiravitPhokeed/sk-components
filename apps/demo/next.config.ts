import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
  allowedDevOrigins: ["192.168.1.133"],
  transpilePackages: [
    "@suankularb-components/react",
    "@suankularb-components/css",
  ],
};

export default nextConfig;
