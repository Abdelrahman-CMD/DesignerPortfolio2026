import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://abdelrahman.nl/sitemap.xml",
    host: "https://abdelrahman.nl",
  };
}
