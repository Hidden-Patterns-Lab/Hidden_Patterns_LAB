import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";

const routes = ["", "/articles", "/dashboard", "/data", "/premium", "/about", "/contact", "/privacy", "/terms", "/methodology", "/sources"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
