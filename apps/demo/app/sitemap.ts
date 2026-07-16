import { BASE_URL } from "@/lib/constants";
import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * Lists every page in this app for search engine crawlers, served at
 * `/sitemap.xml`.
 *
 * Routes are discovered by scanning the `app` directory for `page.tsx` and
 * `page.mdx` files at build time, so new pages are included automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const appDirectory = path.join(process.cwd(), "app");
  return (
    readdirSync(appDirectory, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && /^page\.(tsx|mdx)$/.test(entry.name))
      .map((entry) =>
        path
          .relative(appDirectory, entry.parentPath)
          .split(path.sep)
          // Route groups like `(group)` do not appear in the URL.
          .filter((segment) => !/^\(.*\)$/.test(segment))
          .join("/"),
      )
      // Dynamic routes like `[slug]` have no single URL and cannot be listed.
      .filter((route) => !route.includes("["))
      .sort()
      .map((route) => ({ url: [BASE_URL, route].filter(Boolean).join("/") }))
  );
}
