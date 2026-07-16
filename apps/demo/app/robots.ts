import { BASE_URL } from "@/lib/constants";
import type { MetadataRoute } from "next";

/**
 * Allows search engine crawlers to access every page on this site and points
 * them to the sitemap, served at `/robots.txt`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
